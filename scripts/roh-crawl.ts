import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { load } from 'cheerio';
import { absoluteRohUrl } from '../app/lib/roh/parser';
import { ROH_BASE_URL } from '../app/lib/roh/types';

interface CachedPage {
  url: string;
  file: string;
  fetchedAt: string;
  status: number;
  /** Outbound crawl links saved at fetch time; used to rebuild the queue when queue.json is empty or stale. */
  links?: string[];
}

interface CrawlManifest {
  generatedAt: string;
  crawlDelayMs: number;
  /** Present when crawl used parallel workers (`--concurrency` / `ROH_CRAWL_CONCURRENCY`). */
  crawlConcurrency?: number;
  pages: Record<string, CachedPage>;
}

interface CrawlOptions {
  skipPerformances: boolean;
  /** When true, crawl only the archive object graph (collection hubs → search results → records), not works/productions/performance index. */
  recordsOnly: boolean;
}

type CrawlMode = 'discover' | 'fetch' | 'both';

/** Path prefixes on `www.rohcollections.org.uk` used to discover and fetch archive records. */
const RECORDS_ARCHIVE_PATH_PREFIXES = [
  '/collectionsroh.aspx',
  '/collectionsspecial.aspx',
  '/collectionscommissioned.aspx',
  '/collection',
  '/searchresults.aspx',
  '/record.aspx',
  /** Record pages link here for “related objects in this collection”; needed for records-only discovery. */
  '/relatedobjects.aspx',
] as const;

/** Opera performance / production graph (excluded in records-only mode). */
const OPERA_GRAPH_PATH_PREFIXES = [
  '/performanceindex.aspx',
  '/work.aspx',
  '/production.aspx',
  '/performance.aspx',
] as const;

/** Minimum time between successive fetch starts (global), spread across parallel workers. */
const DEFAULT_DELAY_MS = 750;
/** Max concurrent in-flight GETs toward the remote host (safe default for legacy IIS/ASP backends). */
const DEFAULT_CONCURRENCY = 3;
/** Default successful page commits per run (override with `--max-pages` / `ROH_CRAWL_MAX_PAGES`). */
const DEFAULT_MAX_PAGES_PER_RUN = 150;
/** Legacy robots-friendly interval; override with `--delay-ms=180000` if scraping a fragile public host slowly. */
const _PUBLIC_SLOW_DELAY_MS_REFERENCE = 180_000;

const FETCH_TIMEOUT_MS = 120_000;
const FETCH_RETRY_INITIAL_MS = 2_500;
const FETCH_RETRY_MAX_MS = 60_000;
const FETCH_RETRY_MAX_ATTEMPTS = 6;
const IDLE_RETRY_MS = 40;

void _PUBLIC_SLOW_DELAY_MS_REFERENCE;

const CACHE_DIR = process.env.ROH_CACHE_DIR || join(process.cwd(), '.roh-cache');
const PAGES_DIR = join(CACHE_DIR, 'pages');
const MANIFEST_PATH = join(CACHE_DIR, 'manifest.json');
const QUEUE_PATH = join(CACHE_DIR, 'queue.json');
const ENTITY_QUEUE_PATH = join(CACHE_DIR, 'entity-queue.json');
const letters = ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

function argValue(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function parseNonNegativeNumber(value: string | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback;
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n >= 1 ? n : fallback;
}

function resolveSkipPerformances(): boolean {
  if (process.argv.includes('--include-performances')) return false;
  if (process.argv.includes('--skip-performances')) return true;
  const env = process.env.ROH_CRAWL_SKIP_PERFORMANCES;
  if (env === '0' || env === 'false') return false;
  if (env === '1' || env === 'true') return true;
  return true;
}

function resolveRecordsOnly(): boolean {
  if (process.argv.includes('--records-only')) return true;
  if (process.argv.includes('--full-catalog')) return false;
  const env = process.env.ROH_CRAWL_RECORDS_ONLY;
  if (env === '1' || env === 'true') return true;
  if (env === '0' || env === 'false') return false;
  return false;
}

function resolveCrawlMode(): CrawlMode {
  if (process.argv.includes('--discover-only')) return 'discover';
  if (process.argv.includes('--fetch-only')) return 'fetch';
  const mode = (argValue('mode') || process.env.ROH_CRAWL_MODE || '').toLowerCase();
  if (mode === 'discover' || mode === 'fetch' || mode === 'both') return mode;
  return 'both';
}

/** Why records-only mode is on (helps distinguish `--records-only` from `ROH_CRAWL_RECORDS_ONLY` in shell profile). */
function recordsOnlyExplanation(): string {
  if (process.argv.includes('--records-only')) return 'flag --records-only';
  if (process.env.ROH_CRAWL_RECORDS_ONLY === '1' || process.env.ROH_CRAWL_RECORDS_ONLY === 'true') {
    return 'env ROH_CRAWL_RECORDS_ONLY';
  }
  return 'unknown';
}

function pageKind(pathname: string): 'record' | 'work' | 'production' | 'performance' | 'other' {
  if (pathname.endsWith('/record.aspx')) return 'record';
  if (pathname.endsWith('/work.aspx')) return 'work';
  if (pathname.endsWith('/production.aspx')) return 'production';
  if (pathname.endsWith('/performance.aspx')) return 'performance';
  return 'other';
}

function isMeaningfulEntityUrl(url: string, options: CrawlOptions): boolean {
  if (!isAllowedCrawlUrl(url, options.recordsOnly)) return false;
  const pathname = new URL(url, ROH_BASE_URL).pathname.toLowerCase();
  const kind = pageKind(pathname);
  if (kind === 'other') return false;
  if (kind === 'performance' && options.skipPerformances) return false;
  return true;
}

function isDiscoveryUrl(url: string, options: CrawlOptions): boolean {
  if (!isAllowedCrawlUrl(url, options.recordsOnly)) return false;
  return !isMeaningfulEntityUrl(url, options);
}

/**
 * Re-enqueue URLs from saved `links` that are not yet in the manifest.
 */
export function rehydrateQueueFromManifestLinks(
  manifest: CrawlManifest,
  queued: Set<string>,
  entityQueued: Set<string>,
  options: CrawlOptions,
): { discoveryAdded: number; entityAdded: number } {
  let discoveryAdded = 0;
  let entityAdded = 0;
  for (const page of Object.values(manifest.pages)) {
    if (page.status >= 400) continue;
    for (const link of page.links ?? []) {
      if (manifest.pages[link]) continue;
      if (shouldSkipCrawlUrl(link, options)) continue;
      if (isMeaningfulEntityUrl(link, options)) {
        if (!entityQueued.has(link)) {
          entityQueued.add(link);
          entityAdded += 1;
        }
        continue;
      }
      if (!isDiscoveryUrl(link, options)) continue;
      if (!queued.has(link)) {
        queued.add(link);
        discoveryAdded += 1;
      }
    }
  }
  return { discoveryAdded, entityAdded };
}

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmpPath = `${path}.tmp`;
  writeFileSync(tmpPath, JSON.stringify(value, null, 2));
  renameSync(tmpPath, path);
}

function pageFileForUrl(url: string): string {
  return `${createHash('sha1').update(url).digest('hex')}.html`;
}

export function initialSeeds(recordsOnly: boolean): string[] {
  const collectionHubs = [
    absoluteRohUrl('CollectionsROH.aspx'),
    absoluteRohUrl('CollectionsSpecial.aspx'),
    absoluteRohUrl('CollectionsCommissioned.aspx'),
  ];
  if (recordsOnly) {
    return collectionHubs;
  }
  const performanceIndexes = letters.map((letter) =>
    absoluteRohUrl(`PerformanceIndex.aspx?genre=All&letter=${encodeURIComponent(letter)}`),
  );
  return [...performanceIndexes, ...collectionHubs];
}

/** Lower = fetch sooner (entity and search-listing pages before collection hub sprawl). */
function crawlUrlPriority(url: string): number {
  const path = new URL(url, ROH_BASE_URL).pathname.toLowerCase();
  if (
    path.endsWith('/record.aspx') ||
    path.endsWith('/work.aspx') ||
    path.endsWith('/production.aspx') ||
    path.endsWith('/performance.aspx')
  )
    return 0;
  if (path.endsWith('/searchresults.aspx')) return 1;
  if (path.endsWith('/performanceindex.aspx')) return 2;
  return 10;
}

function sortQueueUrls(urls: Iterable<string>): string[] {
  return [...urls].sort((a, b) => crawlUrlPriority(a) - crawlUrlPriority(b) || a.localeCompare(b));
}

export function dequeueNextUrl(queued: Set<string>): string | null {
  const [next] = sortQueueUrls(queued);
  if (!next) return null;
  queued.delete(next);
  return next;
}

/** Exported for URL tests — matches retry policy in fetchPageWithRetries. */
export function isRetryableHttpStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

export function isAllowedCrawlUrl(url: string, recordsOnly: boolean): boolean {
  const parsed = new URL(url, ROH_BASE_URL);
  if (parsed.hostname !== 'www.rohcollections.org.uk') return false;
  if (parsed.pathname.toLowerCase().startsWith('/search/autocomplete')) return false;
  const path = parsed.pathname.toLowerCase();
  const prefixes = recordsOnly
    ? RECORDS_ARCHIVE_PATH_PREFIXES
    : ([...RECORDS_ARCHIVE_PATH_PREFIXES, ...OPERA_GRAPH_PATH_PREFIXES] as readonly string[]);
  return prefixes.some((p) => path.startsWith(p));
}

export function shouldSkipCrawlUrl(url: string, options: CrawlOptions): boolean {
  if (!options.skipPerformances) return false;
  const pathname = new URL(url, ROH_BASE_URL).pathname.toLowerCase();
  return pathname.endsWith('/performance.aspx');
}

function extractLinks(html: string, sourceUrl: string, options: CrawlOptions): string[] {
  const $ = load(html);
  const links = new Set<string>();
  $('a[href]').each((_, link) => {
    const href = $(link).attr('href');
    if (!href || href.startsWith('#') || href.toLowerCase().startsWith('javascript:')) return;
    const url = absoluteRohUrl(href, sourceUrl);
    if (shouldSkipCrawlUrl(url, options)) return;
    if (isAllowedCrawlUrl(url, options.recordsOnly)) links.add(url);
  });
  return sortQueueUrls(links);
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

class AsyncMutex {
  private tail: Promise<unknown> = Promise.resolve();

  /** Runs `fn` strictly after prior exclusive work completes (FIFO). */
  runExclusive<T>(fn: () => T | Promise<T>): Promise<T> {
    const next = this.tail.then(() => Promise.resolve(fn()));
    this.tail = next.then(
      () => {},
      () => {},
    );
    return next;
  }
}

async function fetchPageOnce(url: string): Promise<{ status: number; html: string }> {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'opera-archive-explorer research crawler (respecting rohcollections.org.uk robots.txt)',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  const html = await response.text();
  return { status: response.status, html };
}

async function fetchPageWithRetries(url: string): Promise<{ status: number; html: string }> {
  let backoff = FETCH_RETRY_INITIAL_MS;
  for (let attempt = 0; attempt < FETCH_RETRY_MAX_ATTEMPTS; attempt += 1) {
    try {
      const result = await fetchPageOnce(url);
      if (!isRetryableHttpStatus(result.status) || attempt === FETCH_RETRY_MAX_ATTEMPTS - 1) {
        return result;
      }
      console.warn(`Retryable HTTP ${result.status} for ${url} — waiting ${Math.round(backoff)}ms (${attempt + 1}/${FETCH_RETRY_MAX_ATTEMPTS})`);
      await sleep(backoff);
      backoff = Math.min(backoff * 2, FETCH_RETRY_MAX_MS);
    } catch (error) {
      if (attempt === FETCH_RETRY_MAX_ATTEMPTS - 1) {
        throw error;
      }
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`Fetch error (${msg}) for ${url} — waiting ${Math.round(backoff)}ms (${attempt + 1}/${FETCH_RETRY_MAX_ATTEMPTS})`);
      await sleep(backoff);
      backoff = Math.min(backoff * 2, FETCH_RETRY_MAX_MS);
    }
  }
  return fetchPageOnce(url);
}

async function main(): Promise<void> {
  mkdirSync(PAGES_DIR, { recursive: true });
  const delayMs = parseNonNegativeNumber(
    argValue('delay-ms') || process.env.ROH_CRAWL_DELAY_MS,
    DEFAULT_DELAY_MS,
  );
  const concurrency = parsePositiveInt(
    argValue('concurrency') || process.env.ROH_CRAWL_CONCURRENCY,
    DEFAULT_CONCURRENCY,
  );
  const maxPages = parsePositiveInt(argValue('max-pages') || process.env.ROH_CRAWL_MAX_PAGES, DEFAULT_MAX_PAGES_PER_RUN);
  const mode = resolveCrawlMode();
  const seedOnly = process.argv.includes('--seed-only');
  const options: CrawlOptions = {
    skipPerformances: resolveSkipPerformances(),
    recordsOnly: resolveRecordsOnly(),
  };
  const manifest = readJson<CrawlManifest>(MANIFEST_PATH, {
    generatedAt: new Date().toISOString(),
    crawlDelayMs: delayMs,
    pages: {},
  });
  manifest.crawlDelayMs = delayMs;

  const queued = new Set(readJson<string[]>(QUEUE_PATH, initialSeeds(options.recordsOnly)));
  const entityQueued = new Set(readJson<string[]>(ENTITY_QUEUE_PATH, []));
  initialSeeds(options.recordsOnly).forEach((seed) => queued.add(seed));

  if (seedOnly) {
    writeJson(QUEUE_PATH, sortQueueUrls(queued));
    writeJson(ENTITY_QUEUE_PATH, sortQueueUrls(entityQueued));
    writeJson(MANIFEST_PATH, {
      ...manifest,
      crawlConcurrency: concurrency,
      crawlDelayMs: delayMs,
      generatedAt: new Date().toISOString(),
    });
    console.log(`Seeded ${queued.size} ROH URLs in ${QUEUE_PATH}`);
    return;
  }

  const mutex = new AsyncMutex();
  let pagesWrittenThisRun = 0;
  let inFlight = 0;
  let nextFetchSlotAt = Date.now();

  function persistState(): void {
    writeJson(MANIFEST_PATH, {
      ...manifest,
      generatedAt: new Date().toISOString(),
      crawlDelayMs: delayMs,
      crawlConcurrency: concurrency,
    });
    writeJson(QUEUE_PATH, sortQueueUrls(queued));
    writeJson(ENTITY_QUEUE_PATH, sortQueueUrls(entityQueued));
  }

  const rehydrated = rehydrateQueueFromManifestLinks(manifest, queued, entityQueued, options);
  if (rehydrated.discoveryAdded > 0 || rehydrated.entityAdded > 0) {
    console.log(
      `Re-queued ${rehydrated.discoveryAdded} discovery URL(s) and ${rehydrated.entityAdded} entity URL(s) from cached manifest links.`,
    );
    persistState();
  }

  console.log(
    `Crawl pacing: ${delayMs}ms minimum between fetch starts · ${concurrency} parallel worker(s) · soft cap ${maxPages} new page commit(s) this run (in-flight fetches may finish a few over)${
      options.recordsOnly ? ` · records-only (${recordsOnlyExplanation()}; no work/production crawl)` : ''
    } · mode=${mode}`,
  );

  async function spacedWaitFetchStart(): Promise<void> {
    let waitMs = 0;
    await mutex.runExclusive(async () => {
      const now = Date.now();
      const startAt = Math.max(now, nextFetchSlotAt);
      nextFetchSlotAt = startAt + delayMs;
      waitMs = startAt - now;
    });
    await sleep(waitMs);
  }

  async function worker(): Promise<void> {
    for (;;) {
      const pick = await mutex.runExclusive(
        (): { kind: 'work'; url: string } | { kind: 'wait' } | { kind: 'stop' } => {
        if (pagesWrittenThisRun >= maxPages) {
          return { kind: 'stop' };
        }
        while (true) {
          const url =
            mode === 'discover'
              ? dequeueNextUrl(queued)
              : mode === 'fetch'
                ? dequeueNextUrl(entityQueued)
                : dequeueNextUrl(queued) || dequeueNextUrl(entityQueued);
          if (!url) {
            if (inFlight > 0) {
              return { kind: 'wait' };
            }
            return { kind: 'stop' };
          }
          if (manifest.pages[url]) {
            continue;
          }
          if (shouldSkipCrawlUrl(url, options)) {
            continue;
          }
          const isEntity = isMeaningfulEntityUrl(url, options);
          if (mode === 'discover' && isEntity) {
            continue;
          }
          if (mode === 'fetch' && !isEntity) {
            continue;
          }
          if (!isAllowedCrawlUrl(url, options.recordsOnly) || (!isEntity && !isDiscoveryUrl(url, options))) {
            continue;
          }
          inFlight += 1;
          return { kind: 'work', url };
        }
      });

      if (pick.kind === 'stop') {
        return;
      }
      if (pick.kind === 'wait') {
        await sleep(IDLE_RETRY_MS);
        continue;
      }

      const { url } = pick;

      await spacedWaitFetchStart();

      try {
        const { status, html } = await fetchPageWithRetries(url);
        const file = pageFileForUrl(url);
        const links = extractLinks(html, url, options);

        await mutex.runExclusive(async () => {
          // Always persist finished fetches: discarding near the `--max-pages` cap used to orphan URLs under concurrency.
          writeFileSync(join(PAGES_DIR, file), html);
          manifest.pages[url] = {
            url,
            file,
            fetchedAt: new Date().toISOString(),
            status,
            links,
          };
          for (const link of links) {
            if (!manifest.pages[link]) {
              if (isMeaningfulEntityUrl(link, options)) {
                entityQueued.add(link);
              } else if (isDiscoveryUrl(link, options)) {
                queued.add(link);
              }
            }
          }
          pagesWrittenThisRun += 1;
          inFlight -= 1;
          persistState();
        });

        console.log(`[${status}] ${url}`);
      } catch (error) {
        await mutex.runExclusive(async () => {
          queued.add(url);
          inFlight -= 1;
          persistState();
        });
        console.error(`Failed after retries: ${url}`, error);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  console.log(
    `Committed ${pagesWrittenThisRun} page(s) this run (scheduled cap ${maxPages}). Discovery queue: ${queued.size} URL(s). Entity queue: ${entityQueued.size} URL(s).${
      queued.size + entityQueued.size > 0 ? ' Run pnpm roh:crawl again or raise --max-pages until queues are empty.' : ''
    }`,
  );
}

const isDirectExecution = (process.argv[1] || '').endsWith('roh-crawl.ts');

if (isDirectExecution) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
