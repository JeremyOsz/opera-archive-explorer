import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROH_INDEX_DIR, writeRohJsonIndex } from '../app/lib/roh/database';
import {
  parsePerformancePage,
  parseProductionPage,
  parseRecordPage,
  parseWorkPage,
} from '../app/lib/roh/parser';
import { RohDataset, RohPerformance, RohProduction, RohRecord, RohWork } from '../app/lib/roh/types';

interface CachedPage {
  url: string;
  file: string;
  status: number;
}

interface CrawlManifest {
  pages: Record<string, CachedPage>;
}

const CACHE_DIR = process.env.ROH_CACHE_DIR || join(process.cwd(), '.roh-cache');
const PAGES_DIR = join(CACHE_DIR, 'pages');
const MANIFEST_PATH = join(CACHE_DIR, 'manifest.json');

function readManifest(): CrawlManifest {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(`ROH crawl manifest not found at ${MANIFEST_PATH}. Run pnpm roh:crawl first.`);
  }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as CrawlManifest;
}

function pageHtml(page: CachedPage): string {
  return readFileSync(join(PAGES_DIR, page.file), 'utf8');
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

function parseDataset(manifest: CrawlManifest): RohDataset {
  const records: RohRecord[] = [];
  const works: RohWork[] = [];
  const productions: RohProduction[] = [];
  const performances: RohPerformance[] = [];

  for (const page of Object.values(manifest.pages)) {
    if (page.status >= 400) continue;
    const html = pageHtml(page);
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
        performances.push(parsePerformancePage(html, page.url));
        break;
      case 'skip':
        break;
    }
  }

  return {
    records: dedupeById(records),
    works: dedupeById(works),
    productions: dedupeById(productions),
    performances: dedupeById(performances),
  };
}

function main(): void {
  const outputDir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR;
  const manifest = readManifest();
  const dataset = parseDataset(manifest);

  writeRohJsonIndex(dataset, outputDir);

  console.log(`Wrote ROH JSON index to ${outputDir}`);
  console.log(
    `Indexed ${dataset.records.length} records, ${dataset.works.length} works, ${dataset.productions.length} productions, ${dataset.performances.length} performances`
  );
}

main();
