import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { ROH_INDEX_DIR, writeRohJsonIndex } from '../app/lib/roh/database';
import {
  parseCollectionResultsPage,
  parsePerformanceIndexPage,
  parsePerformancePage,
  parseProductionPage,
  parseRecordPage,
  parseWorkPage,
} from '../app/lib/roh/parser';
import {
  RohDataset,
  RohPerformance,
  RohProduction,
  RohRecord,
  RohRecordSeed,
  RohWork,
  RohWorkSeed,
} from '../app/lib/roh/types';

interface CachedPage {
  url: string;
  file: string;
  status: number;
}

interface CrawlManifest {
  pages: Record<string, CachedPage>;
}

interface ParseChunkPayload {
  pages: CachedPage[];
  pagesDir: string;
  skipPerformances: boolean;
  /** Unused by chunk parsers; threaded for parity with parent `ParseOptions`. */
  recordsOnly?: boolean;
}

interface ParseOptions {
  skipPerformances: boolean;
  /** Mirrors crawl `--records-only`: do not warn about missing works/productions when indexing. */
  recordsOnly: boolean;
}

const CACHE_DIR = process.env.ROH_CACHE_DIR || join(process.cwd(), '.roh-cache');
const PAGES_DIR = join(CACHE_DIR, 'pages');
const MANIFEST_PATH = join(CACHE_DIR, 'manifest.json');

function argValue(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback;
  const n = Math.floor(Number(value));
  return Number.isFinite(n) && n >= 1 ? n : fallback;
}

function resolveSkipPerformances(): boolean {
  if (process.argv.includes('--include-performances')) return false;
  if (process.argv.includes('--skip-performances')) return true;
  const env = process.env.ROH_INDEX_SKIP_PERFORMANCES;
  if (env === '0' || env === 'false') return false;
  if (env === '1' || env === 'true') return true;
  return true;
}

function resolveRecordsOnly(): boolean {
  if (process.argv.includes('--records-only')) return true;
  if (process.argv.includes('--full-catalog')) return false;
  const env = process.env.ROH_INDEX_RECORDS_ONLY;
  if (env === '1' || env === 'true') return true;
  if (env === '0' || env === 'false') return false;
  return false;
}

function resolveIndexConcurrency(totalPages: number): number {
  const maxParallelism = Math.max(1, cpus().length - 1);
  const requested = parsePositiveInt(argValue('concurrency') || process.env.ROH_INDEX_CONCURRENCY, maxParallelism);
  return Math.min(Math.max(1, requested), Math.max(1, totalPages));
}

function readManifest(): CrawlManifest {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(`ROH crawl manifest not found at ${MANIFEST_PATH}. Run pnpm roh:crawl first.`);
  }
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as CrawlManifest;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to parse ROH crawl manifest at ${MANIFEST_PATH}: ${message}. The file may be truncated/corrupted. Delete it and rerun pnpm roh:crawl, then pnpm roh:index.`
    );
  }
}

function pageHtml(page: CachedPage, pagesDir: string): string {
  return readFileSync(join(pagesDir, page.file), 'utf8');
}

function pageKind(url: string): 'record' | 'work' | 'production' | 'performance' | 'skip' {
  const pathname = new URL(url).pathname.toLowerCase();
  if (pathname.endsWith('/record.aspx')) return 'record';
  if (pathname.endsWith('/work.aspx')) return 'work';
  if (pathname.endsWith('/production.aspx')) return 'production';
  if (pathname.endsWith('/performance.aspx')) return 'performance';
  return 'skip';
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  return [...new Map(items.filter((item) => item.id).map((item) => [item.id, item])).values()];
}

function recordFromListingSeed(seed: RohRecordSeed): RohRecord {
  return {
    id: seed.id,
    title: seed.title,
    collection: seed.collection,
    objectNumber: seed.objectNumber,
    thumbnailUrl: seed.thumbnailUrl,
    sourceUrl: seed.sourceUrl,
    metadata: {},
  };
}

function workFromListingSeed(seed: RohWorkSeed): RohWork {
  return {
    id: seed.id,
    title: seed.title,
    genre: seed.genre,
    composer: seed.creator,
    sourceUrl: seed.sourceUrl,
    metadata: {},
    productions: [],
    relatedRecordCollections: [],
  };
}

export function partialIndexWarning(dataset: RohDataset, options: Partial<ParseOptions> = {}): string | null {
  const skipPerformances = options.skipPerformances ?? false;
  const recordsOnly = options.recordsOnly ?? false;
  if (recordsOnly) return null;
  if (skipPerformances) {
    if (dataset.productions.length > 0) return null;
    return [
      'ROH crawl appears incomplete: missing production entities.',
      `Parsed counts: records=${dataset.records.length}, works=${dataset.works.length}, productions=${dataset.productions.length}, performances=${dataset.performances.length}.`,
      'Indexing will continue with partial data.',
      'Run additional crawl passes (for example: pnpm roh:crawl -- --max-pages=250) and re-index for fuller production coverage.',
    ].join(' ');
  }
  if (dataset.productions.length > 0 && dataset.performances.length > 0) return null;
  return [
    'ROH crawl appears incomplete: missing production/performance entities.',
    `Parsed counts: records=${dataset.records.length}, works=${dataset.works.length}, productions=${dataset.productions.length}, performances=${dataset.performances.length}.`,
    'Indexing will continue with partial data.',
    'Run additional crawl passes (for example: pnpm roh:crawl -- --max-pages=250) and re-index for full coverage.',
  ].join(' ');
}

function parsePagesChunk(pages: CachedPage[], pagesDir: string, options: ParseOptions): RohDataset {
  const records: RohRecord[] = [];
  const works: RohWork[] = [];
  const productions: RohProduction[] = [];
  const performances: RohPerformance[] = [];

  for (const page of pages) {
    if (page.status >= 400) continue;
    const html = pageHtml(page, pagesDir);
    switch (pageKind(page.url)) {
      case 'record':
        records.push(parseRecordPage(html, page.url));
        break;
      case 'work':
        works.push(parseWorkPage(html, page.url));
        break;
      case 'production':
        productions.push(parseProductionPage(html, page.url));
        break;
      case 'performance':
        if (!options.skipPerformances) {
          performances.push(parsePerformancePage(html, page.url));
        }
        break;
      case 'skip': {
        const pathname = new URL(page.url).pathname.toLowerCase();
        if (pathname.endsWith('/searchresults.aspx')) {
          for (const seed of parseCollectionResultsPage(html, page.url).records) {
            records.push(recordFromListingSeed(seed));
          }
          break;
        }
        if (pathname.endsWith('/performanceindex.aspx')) {
          for (const seed of parsePerformanceIndexPage(html, page.url)) {
            works.push(workFromListingSeed(seed));
          }
          break;
        }
        break;
      }
    }
  }

  return { records, works, productions, performances };
}

function chunkPages(pages: CachedPage[], parts: number): CachedPage[][] {
  const chunkSize = Math.ceil(pages.length / parts);
  const chunks: CachedPage[][] = [];
  for (let i = 0; i < pages.length; i += chunkSize) {
    chunks.push(pages.slice(i, i + chunkSize));
  }
  return chunks;
}

function parseChunkInChildProcess(payload: ParseChunkPayload): Promise<RohDataset> {
  return new Promise((resolve, reject) => {
    const dir = mkdtempSync(join(tmpdir(), 'roh-index-chunk-'));
    const inputPath = join(dir, 'input.json');
    const outputPath = join(dir, 'output.json');
    writeFileSync(inputPath, JSON.stringify(payload));

    const child = spawn(
      'pnpm',
      ['exec', 'tsx', 'scripts/roh-index.ts', `--parse-chunk-input=${inputPath}`, `--parse-chunk-output=${outputPath}`],
      {
        cwd: process.cwd(),
        stdio: ['ignore', 'pipe', 'pipe'],
      }
    );
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.once('error', (error) => {
      rmSync(dir, { recursive: true, force: true });
      reject(error);
    });
    child.once('close', (code) => {
      try {
        if (code !== 0) {
          throw new Error(`ROH index child exited with code ${code}: ${stderr.trim()}`.trim());
        }
        const dataset = JSON.parse(readFileSync(outputPath, 'utf8')) as RohDataset;
        resolve(dataset);
      } catch (error) {
        reject(error);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });
}

function runChunkModeIfRequested(): boolean {
  const inputPath = argValue('parse-chunk-input');
  if (!inputPath) return false;
  const outputPath = argValue('parse-chunk-output');
  if (!outputPath) {
    throw new Error('Missing required --parse-chunk-output when using --parse-chunk-input');
  }
  const payload = JSON.parse(readFileSync(inputPath, 'utf8')) as ParseChunkPayload;
  const dataset = parsePagesChunk(payload.pages, payload.pagesDir, {
    skipPerformances: payload.skipPerformances,
    recordsOnly: payload.recordsOnly ?? false,
  });
  writeFileSync(outputPath, JSON.stringify(dataset));
  return true;
}

export function mergeDatasets(chunks: RohDataset[]): RohDataset {
  const merged: RohDataset = { records: [], works: [], productions: [], performances: [] };
  for (const chunk of chunks) {
    merged.records.push(...chunk.records);
    merged.works.push(...chunk.works);
    merged.productions.push(...chunk.productions);
    merged.performances.push(...chunk.performances);
  }
  return {
    records: dedupeById(merged.records),
    works: dedupeById(merged.works),
    productions: dedupeById(merged.productions),
    performances: dedupeById(merged.performances),
  };
}

export async function parseDataset(manifest: CrawlManifest): Promise<RohDataset> {
  const options: ParseOptions = {
    skipPerformances: resolveSkipPerformances(),
    recordsOnly: resolveRecordsOnly(),
  };
  const pages = Object.values(manifest.pages);
  const concurrency = resolveIndexConcurrency(pages.length);
  const chunks = chunkPages(pages, concurrency);
  let datasets: RohDataset[];
  if (chunks.length <= 1) {
    datasets = [parsePagesChunk(chunks[0] || [], PAGES_DIR, options)];
  } else {
    try {
      datasets = await Promise.all(
        chunks.map((chunk) =>
          parseChunkInChildProcess({
            pages: chunk,
            pagesDir: PAGES_DIR,
            skipPerformances: options.skipPerformances,
            recordsOnly: options.recordsOnly,
          }),
        )
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Process parallel parse unavailable (${message}). Falling back to single-process chunk parsing.`);
      datasets = chunks.map((chunk) => parsePagesChunk(chunk, PAGES_DIR, options));
    }
  }

  const dataset = mergeDatasets(datasets);

  const warning = partialIndexWarning(dataset, options);
  const requireFullIndex = process.env.ROH_REQUIRE_FULL_INDEX === '1';
  if (warning && requireFullIndex) {
    throw new Error(`${warning} Set ROH_REQUIRE_FULL_INDEX=0 (or unset) to allow partial indexing.`);
  }
  if (warning) {
    console.warn(`WARNING: ${warning}`);
  }

  return dataset;
}

async function main(): Promise<void> {
  const outputDir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR;
  const manifest = readManifest();
  const dataset = await parseDataset(manifest);

  writeRohJsonIndex(dataset, outputDir);

  console.log(`Wrote ROH JSON index to ${outputDir}`);
  console.log(
    `Indexed ${dataset.records.length} records, ${dataset.works.length} works, ${dataset.productions.length} productions, ${dataset.performances.length} performances`
  );
}

const isDirectExecution = (process.argv[1] || '').endsWith('roh-index.ts');
if (runChunkModeIfRequested()) {
  process.exit(0);
}
if (isDirectExecution) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
