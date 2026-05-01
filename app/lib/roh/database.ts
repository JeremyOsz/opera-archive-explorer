import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  countRohAssetsInFile,
  loadRohAssetStoreFile,
  type RohAssetStoreAssetJson,
  type RohAssetStoreCollectionJson,
  type RohAssetStoreFileJson,
} from './asset-store';
import {
  RohDataset,
  RohEntityType,
  RohFacetBucket,
  RohSearchItem,
  RohSearchParams,
  RohSearchResult,
} from './types';

export const ROH_INDEX_DIR = join(process.cwd(), 'app', 'data', 'roh');

/** When `assetData` is `null`, combined search skips the digital-library corpus (used in tests). */
export type CombinedRohSearchOptions = {
  assetData?: RohAssetStoreFileJson | null;
};

interface RohSearchDocument extends RohSearchItem {
  searchText: string;
  collection?: string;
  genre?: string;
  creator?: string;
  company?: string;
}

export interface RohJsonIndex {
  metadata: {
    generatedAt: string;
    version: string;
    counts: Record<string, number>;
  };
  dataset: RohDataset;
  searchDocuments: RohSearchDocument[];
  facets: RohSearchResult['facets'];
}

let memoizedIndex: RohJsonIndex | null | undefined;

function normalizeLimit(limit: number | undefined): number {
  return Math.min(Math.max(limit ?? 50, 1), 100);
}

function normalizeOffset(offset: number | undefined): number {
  return Math.max(offset ?? 0, 0);
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function compact(values: Array<string | undefined>): string {
  return values.filter(Boolean).join(' | ');
}

function metadataText(metadata: Record<string, string>): string {
  return Object.entries(metadata)
    .map(([key, value]) => `${key} ${value}`)
    .join(' ');
}

function bucket(values: Array<string | undefined>, limit = 30): RohFacetBucket[] {
  const counts = new Map<string, number>();
  values.filter(Boolean).forEach((value) => counts.set(value!, (counts.get(value!) || 0) + 1));
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    .slice(0, limit);
}

function mergeBuckets(left: RohFacetBucket[], right: RohFacetBucket[], limit = 48): RohFacetBucket[] {
  const counts = new Map<string, number>();
  for (const { value, count } of left) counts.set(value, (counts.get(value) || 0) + count);
  for (const { value, count } of right) counts.set(value, (counts.get(value) || 0) + count);
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    .slice(0, limit);
}

function emptyFacets(): RohSearchResult['facets'] {
  return { collections: [], genres: [], creators: [], companies: [], types: [] };
}

function facetsWithAssetCorpus(
  archiveFacets: RohSearchResult['facets'] | null | undefined,
  assetDocuments: RohSearchDocument[],
): RohSearchResult['facets'] {
  const base = archiveFacets ?? emptyFacets();
  if (assetDocuments.length === 0) return base;

  const fromAssets = bucket(assetDocuments.map((document) => document.collection));
  const typeMerge = bucket(assetDocuments.map((document) => document.type));

  return {
    ...base,
    collections: mergeBuckets(base.collections, fromAssets),
    types: mergeBuckets(base.types, typeMerge, 24),
  };
}

function assetJsonToSearchItem(
  asset: RohAssetStoreAssetJson,
  collection: RohAssetStoreCollectionJson,
): RohSearchItem {
  return {
    type: 'asset',
    id: asset.id.trim(),
    title: (asset.name || '').trim() || 'Untitled asset',
    subtitle: compact([collection.title, asset.extension?.join(', ')]) || undefined,
    date: asset.dateCreated ? asset.dateCreated.slice(0, 10) : undefined,
    imageUrl: asset.thumbnailUrl,
    sourceUrl:
      (asset.webUrl || '').trim() || (collection.publicUrl || '').trim() || (collection.sourceUrl || '').trim(),
    metadata: {
      assetCollectionId: collection.id,
      assetCollectionTitle: collection.title,
      tags: (asset.tags ?? []).join(', '),
      description: asset.description?.trim() || '',
      formats: asset.extension?.join(', ') || '',
      publicUrl: collection.publicUrl || '',
      sourceUrlCollection: collection.sourceUrl || '',
    },
  };
}

export function buildAssetStoreSearchDocuments(data: RohAssetStoreFileJson): RohSearchDocument[] {
  const out: RohSearchDocument[] = [];
  for (const collection of data.collections) {
    for (const asset of collection.assets ?? []) {
      const id = asset.id?.trim();
      if (!id) continue;
      const item = assetJsonToSearchItem(asset, collection);
      const searchText = normalizeText(
        [
          item.title,
          item.subtitle,
          item.date,
          item.metadata.tags,
          item.metadata.description,
          item.metadata.formats,
          item.metadata.assetCollectionTitle,
          collection.description,
        ]
          .filter(Boolean)
          .join(' ')
      );
      out.push({
        ...item,
        collection: collection.title,
        searchText,
      });
    }
  }
  return out.sort((a, b) => a.title.localeCompare(b.title));
}

function buildSearchDocuments(dataset: RohDataset): RohSearchDocument[] {
  const records = dataset.records.map((record): RohSearchDocument => ({
    type: 'record',
    id: record.id,
    title: record.title,
    subtitle: compact([record.collection, record.objectNumber, record.date]) || undefined,
    date: record.date,
    imageUrl: record.thumbnailUrl || record.imageUrl,
    sourceUrl: record.sourceUrl,
    metadata: record.metadata,
    collection: record.collection,
    creator: record.creator,
    searchText: normalizeText(
      [
        record.title,
        record.collection,
        record.objectNumber,
        record.date,
        record.description,
        record.creator,
        record.dimensions,
        record.condition,
        metadataText(record.metadata),
      ]
        .filter(Boolean)
        .join(' ')
    ),
  }));

  const works = dataset.works.map((work): RohSearchDocument => ({
    type: 'work',
    id: work.id,
    title: work.title,
    subtitle: compact([work.genre, work.composer, work.language]) || undefined,
    sourceUrl: work.sourceUrl,
    metadata: work.metadata,
    genre: work.genre,
    creator: work.composer,
    searchText: normalizeText(
      [
        work.title,
        work.genre,
        work.composer,
        work.librettist,
        work.musicTitle,
        work.language,
        work.workDefinition,
        work.titleNotes,
        work.notes,
        work.worldPremiere,
        work.rohPremiere,
        work.rohCompanyPremiere,
        metadataText(work.metadata),
      ]
        .filter(Boolean)
        .join(' ')
    ),
  }));

  const productions = dataset.productions.map((production): RohSearchDocument => ({
    type: 'production',
    id: production.id,
    title: production.title,
    subtitle: compact([production.company, production.productionPremiere]) || undefined,
    date: production.productionPremiere,
    sourceUrl: production.sourceUrl,
    metadata: production.metadata,
    company: production.company,
    searchText: normalizeText(
      [
        production.title,
        production.company,
        production.productionPremiere,
        production.producer,
        production.costumeDesigner,
        production.notes,
        metadataText(production.metadata),
      ]
        .filter(Boolean)
        .join(' ')
    ),
  }));

  const performances = dataset.performances.map((performance): RohSearchDocument => ({
    type: 'performance',
    id: performance.id,
    title: performance.title,
    subtitle: compact([performance.venue, performance.conductor]) || undefined,
    date: performance.date,
    sourceUrl: performance.sourceUrl,
    metadata: performance.metadata,
    company: performance.company,
    searchText: normalizeText(
      [
        performance.title,
        performance.date,
        performance.session,
        performance.venue,
        performance.company,
        performance.status,
        performance.conductor,
        performance.leader,
        performance.cast.map((member) => `${member.role} ${member.performer} ${member.notes || ''}`).join(' '),
        metadataText(performance.metadata),
      ]
        .filter(Boolean)
        .join(' ')
    ),
  }));

  return [...records, ...works, ...productions, ...performances].sort((a, b) => a.title.localeCompare(b.title));
}

function buildFacets(dataset: RohDataset, searchDocuments: RohSearchDocument[]): RohSearchResult['facets'] {
  return {
    collections: bucket(dataset.records.map((record) => record.collection)),
    genres: bucket(dataset.works.map((work) => work.genre)),
    creators: bucket([
      ...dataset.records.map((record) => record.creator),
      ...dataset.works.map((work) => work.composer),
    ]),
    companies: bucket([
      ...dataset.productions.map((production) => production.company),
      ...dataset.performances.map((performance) => performance.company),
    ]),
    types: bucket(searchDocuments.map((document) => document.type)),
  };
}

function toSearchItem(document: RohSearchDocument): RohSearchItem {
  return {
    type: document.type,
    id: document.id,
    title: document.title,
    subtitle: document.subtitle,
    date: document.date,
    imageUrl: document.imageUrl,
    sourceUrl: document.sourceUrl,
    metadata: document.metadata,
  };
}

export function createRohJsonIndex(dataset: RohDataset): RohJsonIndex {
  const searchDocuments = buildSearchDocuments(dataset);
  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      counts: getRohDatasetStats(dataset),
    },
    dataset,
    searchDocuments,
    facets: buildFacets(dataset, searchDocuments),
  };
}

export function writeRohJsonIndex(dataset: RohDataset, dir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR): RohJsonIndex {
  mkdirSync(dir, { recursive: true });
  const index = createRohJsonIndex(dataset);
  writeFileSync(join(dir, 'records.json'), JSON.stringify(dataset.records, null, 2));
  writeFileSync(join(dir, 'works.json'), JSON.stringify(dataset.works, null, 2));
  writeFileSync(join(dir, 'productions.json'), JSON.stringify(dataset.productions, null, 2));
  writeFileSync(join(dir, 'performances.json'), JSON.stringify(dataset.performances, null, 2));
  writeFileSync(
    join(dir, 'index.json'),
    JSON.stringify(
      {
        metadata: index.metadata,
        searchDocuments: index.searchDocuments,
        facets: index.facets,
      },
      null,
      2
    )
  );
  memoizedIndex = index;
  return index;
}

function queryTermsFromParams(params: RohSearchParams): string[] {
  return normalizeText(params.query || '')
    .split(/\s+/)
    .filter(Boolean);
}

function passesSearchFilters(document: RohSearchDocument, params: RohSearchParams, queryTerms: string[]): boolean {
  if (params.type && params.type !== 'all' && document.type !== params.type) return false;
  if (params.collection && document.collection !== params.collection) return false;
  if (params.genre && document.genre !== params.genre) return false;
  if (params.creator && document.creator !== params.creator) return false;
  if (params.company && document.company !== params.company) return false;
  if (params.dateFrom && (!document.date || document.date < params.dateFrom)) return false;
  if (params.dateTo && (!document.date || document.date > params.dateTo)) return false;
  return queryTerms.every((term) => document.searchText.includes(term));
}

export function loadRohJsonIndex(dir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR): RohJsonIndex | null {
  if (memoizedIndex !== undefined && dir === (process.env.ROH_INDEX_DIR || ROH_INDEX_DIR)) {
    return memoizedIndex;
  }

  const indexPath = join(dir, 'index.json');
  if (!existsSync(indexPath)) {
    memoizedIndex = null;
    return null;
  }

  const recordsPath = join(dir, 'records.json');
  const worksPath = join(dir, 'works.json');
  const productionsPath = join(dir, 'productions.json');
  const performancesPath = join(dir, 'performances.json');
  const partialIndex = JSON.parse(readFileSync(indexPath, 'utf8')) as Omit<RohJsonIndex, 'dataset'>;
  const dataset: RohDataset = {
    records: existsSync(recordsPath) ? JSON.parse(readFileSync(recordsPath, 'utf8')) : [],
    works: existsSync(worksPath) ? JSON.parse(readFileSync(worksPath, 'utf8')) : [],
    productions: existsSync(productionsPath) ? JSON.parse(readFileSync(productionsPath, 'utf8')) : [],
    performances: existsSync(performancesPath) ? JSON.parse(readFileSync(performancesPath, 'utf8')) : [],
  };

  const index = { ...partialIndex, dataset };
  if (dir === (process.env.ROH_INDEX_DIR || ROH_INDEX_DIR)) {
    memoizedIndex = index;
  }
  return index;
}

export function searchRohIndex(index: RohJsonIndex, params: RohSearchParams): RohSearchResult {
  const limit = normalizeLimit(params.limit);
  const offset = normalizeOffset(params.offset);
  const queryTerms = queryTermsFromParams(params);
  const matches = index.searchDocuments.filter((document) => passesSearchFilters(document, params, queryTerms));

  return {
    items: matches.slice(offset, offset + limit).map(toSearchItem),
    total: matches.length,
    facets: index.facets,
  };
}

export function searchCombinedRoh(
  index: RohJsonIndex | null,
  params: RohSearchParams,
  opts?: CombinedRohSearchOptions,
): RohSearchResult {
  const limit = normalizeLimit(params.limit);
  const offset = normalizeOffset(params.offset);
  const queryTerms = queryTermsFromParams(params);

  let resolvedAssetJson: RohAssetStoreFileJson | null;
  if (opts?.assetData === null) resolvedAssetJson = null;
  else if (opts?.assetData !== undefined) resolvedAssetJson = opts.assetData;
  else resolvedAssetJson = loadRohAssetStoreFile();

  const assetDocuments =
    resolvedAssetJson && resolvedAssetJson.collections?.length ? buildAssetStoreSearchDocuments(resolvedAssetJson) : [];

  const archiveDocuments = index?.searchDocuments ?? [];
  const mergedDocuments = [...archiveDocuments, ...assetDocuments];
  const matches = mergedDocuments
    .filter((document) => passesSearchFilters(document, params, queryTerms))
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    items: matches.slice(offset, offset + limit).map(toSearchItem),
    total: matches.length,
    facets: facetsWithAssetCorpus(index?.facets ?? null, assetDocuments),
  };
}

export function hasRohSearchCorpus(index: RohJsonIndex | null): boolean {
  if (index?.searchDocuments.length) return true;
  return countRohAssetsInFile(loadRohAssetStoreFile()) > 0;
}

export function getCombinedRohSummary(index: RohJsonIndex | null): {
  records: number;
  works: number;
  productions: number;
  performances: number;
  digitalLibraryAssets: number;
} {
  const base = index?.metadata.counts;
  const assetFile = loadRohAssetStoreFile();
  return {
    records: base?.records ?? 0,
    works: base?.works ?? 0,
    productions: base?.productions ?? 0,
    performances: base?.performances ?? 0,
    digitalLibraryAssets: countRohAssetsInFile(assetFile),
  };
}

export function getCombinedRohItem(
  index: RohJsonIndex | null,
  type: RohEntityType,
  id: string,
  opts?: CombinedRohSearchOptions,
): RohSearchItem | null {
  if (type !== 'asset') {
    if (!index) return null;
    return getRohItem(index, type, id);
  }
  let resolved: RohAssetStoreFileJson | null;
  if (opts?.assetData === null) resolved = null;
  else if (opts?.assetData !== undefined) resolved = opts.assetData;
  else resolved = loadRohAssetStoreFile();

  if (!resolved?.collections?.length) return null;

  const key = id.trim().toLowerCase();
  for (const collection of resolved.collections) {
    const asset = collection.assets?.find((entry) => entry.id.trim().toLowerCase() === key);
    if (asset) return assetJsonToSearchItem(asset, collection);
  }
  return null;
}

export function getRohItem(index: RohJsonIndex, type: RohEntityType, id: string): RohSearchItem | null {
  const item = index.searchDocuments.find((document) => document.type === type && document.id === id);
  if (!item) return null;
  return toSearchItem(item);
}

export function getRohDatasetStats(dataset: RohDataset): Record<string, number> {
  return {
    records: dataset.records.length,
    works: dataset.works.length,
    productions: dataset.productions.length,
    performances: dataset.performances.length,
    cast: dataset.performances.reduce((total, performance) => total + performance.cast.length, 0),
  };
}

export function getRohStats(index: RohJsonIndex): Record<string, number> {
  return index.metadata.counts;
}
