import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { load } from 'cheerio';
import { absoluteRohUrl } from '../app/lib/roh/parser';
import { ROH_BASE_URL } from '../app/lib/roh/types';

interface CachedPage {
  url: string;
  file: string;
  fetchedAt: string;
  status: number;
  links: string[];
}

interface CrawlManifest {
  generatedAt: string;
  crawlDelayMs: number;
  pages: Record<string, CachedPage>;
}

const DEFAULT_DELAY_MS = 180_000;
const CACHE_DIR = process.env.ROH_CACHE_DIR || join(process.cwd(), '.roh-cache');
const PAGES_DIR = join(CACHE_DIR, 'pages');
const MANIFEST_PATH = join(CACHE_DIR, 'manifest.json');
const QUEUE_PATH = join(CACHE_DIR, 'queue.json');
const letters = ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

function argValue(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2));
}

function pageFileForUrl(url: string): string {
  return `${createHash('sha1').update(url).digest('hex')}.html`;
}

function initialSeeds(): string[] {
  const performanceIndexes = letters.map((letter) =>
    absoluteRohUrl(`PerformanceIndex.aspx?genre=All&letter=${encodeURIComponent(letter)}`)
  );
  return [
    ...performanceIndexes,
    absoluteRohUrl('CollectionsROH.aspx'),
    absoluteRohUrl('CollectionsSpecial.aspx'),
    absoluteRohUrl('CollectionsCommissioned.aspx'),
  ];
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

function isAllowedCrawlUrl(url: string): boolean {
  const parsed = new URL(url, ROH_BASE_URL);
  if (parsed.hostname !== 'www.rohcollections.org.uk') return false;
  if (parsed.pathname.toLowerCase().startsWith('/search/autocomplete')) return false;
  return [
    '/collectionsroh.aspx',
    '/collectionsspecial.aspx',
    '/collectionscommissioned.aspx',
    '/collection',
    '/searchresults.aspx',
    '/record.aspx',
    '/performanceindex.aspx',
    '/work.aspx',
    '/production.aspx',
    '/performance.aspx',
    '/relatedobjects.aspx',
  ].some((path) => parsed.pathname.toLowerCase().startsWith(path));
}

function extractLinks(html: string, sourceUrl: string): string[] {
  const $ = load(html);
  const links = new Set<string>();
  $('a[href]').each((_, link) => {
    const href = $(link).attr('href');
    if (!href || href.startsWith('#') || href.toLowerCase().startsWith('javascript:')) return;
    const url = absoluteRohUrl(href, sourceUrl);
    if (isAllowedCrawlUrl(url)) links.add(url);
  });
  return sortQueueUrls(links);
}

async function sleep(ms: number): Promise<void> {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPage(url: string): Promise<{ status: number; html: string }> {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'opera-archive-explorer research crawler (respecting rohcollections.org.uk robots.txt)',
    },
  });
  return {
    status: response.status,
    html: await response.text(),
  };
}

async function main(): Promise<void> {
  mkdirSync(PAGES_DIR, { recursive: true });
  const delayMs = Number(argValue('delay-ms') || process.env.ROH_CRAWL_DELAY_MS || DEFAULT_DELAY_MS);
  const maxPages = Number(argValue('max-pages') || process.env.ROH_CRAWL_MAX_PAGES || 25);
  const seedOnly = process.argv.includes('--seed-only');
  const manifest = readJson<CrawlManifest>(MANIFEST_PATH, {
    generatedAt: new Date().toISOString(),
    crawlDelayMs: delayMs,
    pages: {},
  });
  const queued = new Set(readJson<string[]>(QUEUE_PATH, initialSeeds()));
  initialSeeds().forEach((seed) => queued.add(seed));

  if (seedOnly) {
    writeJson(QUEUE_PATH, sortQueueUrls(queued));
    writeJson(MANIFEST_PATH, { ...manifest, crawlDelayMs: delayMs });
    console.log(`Seeded ${queued.size} ROH URLs in ${QUEUE_PATH}`);
    return;
  }

  let fetched = 0;
  while (fetched < maxPages) {
    const url = dequeueNextUrl(queued);
    if (!url) break;
    if (manifest.pages[url]) {
      continue;
    }

    console.log(`Fetching ${url}`);
    const { status, html } = await fetchPage(url);
    const file = pageFileForUrl(url);
    writeFileSync(join(PAGES_DIR, file), html);
    const links = extractLinks(html, url);
    manifest.pages[url] = {
      url,
      file,
      fetchedAt: new Date().toISOString(),
      status,
      links,
    };
    for (const link of links) {
      if (!manifest.pages[link]) queued.add(link);
    }
    fetched += 1;

    writeJson(MANIFEST_PATH, { ...manifest, generatedAt: new Date().toISOString(), crawlDelayMs: delayMs });
    writeJson(QUEUE_PATH, sortQueueUrls(queued));

    if (fetched < maxPages) {
      console.log(`Waiting ${delayMs}ms to respect ROH crawl-delay`);
      await sleep(delayMs);
    }
  }

  console.log(`Fetched ${fetched} page(s). ${queued.size} URL(s) remain queued.`);
}

const isDirectExecution = (process.argv[1] || '').endsWith('roh-crawl.ts');

if (isDirectExecution) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
