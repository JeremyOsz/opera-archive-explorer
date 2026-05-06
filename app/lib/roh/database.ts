import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  countRohAssetsInFile,
  loadRohAssetStoreFile,
  type RohAssetStoreAssetJson,
  type RohAssetStoreCollectionJson,
  type RohAssetStoreFileJson,
} from './asset-store';
import {
  countRboStreamItems,
  countRboWebItems,
  flattenRboPublicCatalogue,
  loadRboPublicCatalogueFile,
  type FlattenedRboCatalogueRecord,
  type RboPublicCatalogueFileJson,
} from './rbo-public-catalogue';
import {
  RohDataSources,
  RohDataset,
  type RohDataSourceLabel,
  RohEntityType,
  RohFacetBucket,
  RohSearchItem,
  RohSearchParams,
  RohSearchResult,
} from './types';

export const ROH_INDEX_DIR = join(process.cwd(), 'app', 'data', 'roh');

/** `null` on optional keys skips loading that corpus from disk (used in tests). */
export type CombinedRohSearchOptions = {
  assetData?: RohAssetStoreFileJson | null;
  rboCatalogue?: RboPublicCatalogueFileJson | null;
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

export interface LoadRohJsonIndexOptions {
  /** When true, eagerly read records/works/productions/performances JSON files into `index.dataset`. */
  hydrateDataset?: boolean;
}

let memoizedIndex: RohJsonIndex | null | undefined;
let memoizedIndexPath: string | null = null;
let memoizedIndexMtimeMs: number | null = null;

function normalizeLimit(limit: number | undefined): number {
  if (!Number.isFinite(limit)) return 50;
  return Math.min(Math.max(Math.trunc(limit as number), 1), 100);
}

function normalizeOffset(offset: number | undefined): number {
  if (!Number.isFinite(offset)) return 0;
  return Math.max(Math.trunc(offset as number), 0);
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

function setMetadataIfMissing(metadata: Record<string, string>, key: string, value: string | undefined): void {
  if (!value) return;
  if (metadata[key]) return;
  metadata[key] = value;
}

function enrichRecordMetadata(record: RohDataset['records'][number]): RohDataset['records'][number] {
  const metadata = { ...record.metadata };
  setMetadataIfMissing(metadata, 'Collection', record.collection);
  setMetadataIfMissing(metadata, 'Object number', record.objectNumber);
  setMetadataIfMissing(metadata, 'Date', record.date);
  setMetadataIfMissing(metadata, 'Description', record.description);
  setMetadataIfMissing(metadata, 'Creator', record.creator);
  setMetadataIfMissing(metadata, 'Dimensions', record.dimensions);
  setMetadataIfMissing(metadata, 'Condition', record.condition);
  setMetadataIfMissing(metadata, 'Related work ID', record.relatedWorkId);
  return { ...record, metadata };
}

function enrichWorkMetadata(work: RohDataset['works'][number]): RohDataset['works'][number] {
  const metadata = { ...work.metadata };
  setMetadataIfMissing(metadata, 'Genre', work.genre);
  setMetadataIfMissing(metadata, 'Composer', work.composer);
  setMetadataIfMissing(metadata, 'Librettist', work.librettist);
  setMetadataIfMissing(metadata, 'Music title', work.musicTitle);
  setMetadataIfMissing(metadata, 'Language', work.language);
  setMetadataIfMissing(metadata, 'Work definition', work.workDefinition);
  setMetadataIfMissing(metadata, 'Title notes', work.titleNotes);
  setMetadataIfMissing(metadata, 'Notes', work.notes);
  setMetadataIfMissing(metadata, 'World premiere', work.worldPremiere);
  setMetadataIfMissing(metadata, 'ROH premiere', work.rohPremiere);
  setMetadataIfMissing(metadata, 'ROH company premiere', work.rohCompanyPremiere);
  setMetadataIfMissing(metadata, 'Related work ID', work.relatedWorkId);
  return { ...work, metadata };
}

function enrichProductionMetadata(production: RohDataset['productions'][number]): RohDataset['productions'][number] {
  const metadata = { ...production.metadata };
  setMetadataIfMissing(metadata, 'Company', production.company);
  setMetadataIfMissing(metadata, 'Production premiere', production.productionPremiere);
  setMetadataIfMissing(metadata, 'Producer', production.producer);
  setMetadataIfMissing(metadata, 'Costume designer', production.costumeDesigner);
  setMetadataIfMissing(metadata, 'Notes', production.notes);
  setMetadataIfMissing(metadata, 'Work ID', production.workId);
  return { ...production, metadata };
}

function enrichPerformanceMetadata(performance: RohDataset['performances'][number]): RohDataset['performances'][number] {
  const metadata = { ...performance.metadata };
  setMetadataIfMissing(metadata, 'Date', performance.date);
  setMetadataIfMissing(metadata, 'Session', performance.session);
  setMetadataIfMissing(metadata, 'Venue', performance.venue);
  setMetadataIfMissing(metadata, 'Company', performance.company);
  setMetadataIfMissing(metadata, 'Performance status', performance.status);
  setMetadataIfMissing(metadata, 'Conductor', performance.conductor);
  setMetadataIfMissing(metadata, 'Leader', performance.leader);
  setMetadataIfMissing(metadata, 'Production ID', performance.productionId);
  return { ...performance, metadata };
}

function enrichRohDatasetMetadata(dataset: RohDataset): RohDataset {
  return {
    records: dataset.records.map(enrichRecordMetadata),
    works: dataset.works.map(enrichWorkMetadata),
    productions: dataset.productions.map(enrichProductionMetadata),
    performances: dataset.performances.map(enrichPerformanceMetadata),
  };
}

function bucket(values: Array<string | undefined>, limit = 30): RohFacetBucket[] {
  const counts = new Map<string, number>();
  values.filter(Boolean).forEach((value) => counts.set(value!, (counts.get(value!) || 0) + 1));
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    .slice(0, limit);
}

function documentSource(document: RohSearchDocument): RohDataSourceLabel {
  return document.source ?? RohDataSources.collections;
}

function mapFlattenedRboCatalogue(record: FlattenedRboCatalogueRecord): RohSearchDocument {
  const searchText = normalizeText(
    [record.searchPieces.filter(Boolean).join(' '), metadataText(record.metadata)].filter(Boolean).join(' ')
  );
  return {
    type: record.type,
    id: record.id,
    source: record.source,
    title: record.title,
    subtitle: record.subtitle,
    date: record.date,
    imageUrl: record.imageUrl,
    sourceUrl: record.sourceUrl,
    metadata: record.metadata,
    searchText,
  };
}

function formatFileSizeBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Envelope metadata from snapshot JSON (`roh-asset-store-collections.json`). */
function assetLibrarySnapshotEnvelope(data: RohAssetStoreFileJson): Record<string, string> {
  const out: Record<string, string> = {};
  if (data.source?.trim()) out.siteSource = data.source.trim();
  if (data.generatedAt?.trim()) out.siteSnapshotAt = data.generatedAt.trim();
  if (typeof data.collectionCount === 'number' && Number.isFinite(data.collectionCount)) {
    out.siteCollectionCount = String(data.collectionCount);
  }
  if (typeof data.assetCount === 'number' && Number.isFinite(data.assetCount)) {
    out.siteAssetCount = String(data.assetCount);
  }
  return out;
}

function assetJsonToSearchItem(
  asset: RohAssetStoreAssetJson,
  collection: RohAssetStoreCollectionJson,
  envelope: Record<string, string>,
): RohSearchItem {
  const descTrim = asset.description?.trim() || '';
  const collDescTrim = collection.description?.trim() || '';

  const metadata: Record<string, string> = {
    ...envelope,
    ...(collection.metadata ?? {}),
    ...(asset.metadata ?? {}),
    assetCollectionId: collection.id,
    assetCollectionTitle: collection.title,
    tags: (asset.tags ?? []).join(', '),
    description: descTrim,
    collectionDescription: collDescTrim,
    formats: asset.extension?.join(', ') || '',
    publicUrl: collection.publicUrl || '',
    sourceUrlCollection: collection.sourceUrl || '',
    appCodes: (asset.appCodes ?? []).join(', '),
    orientation: asset.orientation || '',
    fileSizeBytes: typeof asset.fileSize === 'number' && Number.isFinite(asset.fileSize) ? String(asset.fileSize) : '',
    fileSizeLabel:
      typeof asset.fileSize === 'number' && Number.isFinite(asset.fileSize) ? formatFileSizeBytes(asset.fileSize) : '',
    isArchived: typeof asset.isArchived === 'boolean' ? String(asset.isArchived) : '',
    isKeyVisual: typeof asset.isKeyVisual === 'boolean' ? String(asset.isKeyVisual) : '',
    isPrivate: typeof asset.isPrivate === 'boolean' ? String(asset.isPrivate) : '',
    hasAdditionalFiles: typeof asset.hasAdditionalFiles === 'boolean' ? String(asset.hasAdditionalFiles) : '',
    collectionExpectedFiles:
      typeof collection.expectedFileCount === 'number' ? String(collection.expectedFileCount) : '',
    collectionFetchedFiles:
      typeof collection.fetchedFileCount === 'number' ? String(collection.fetchedFileCount) : '',
    collectionReportedFiles:
      typeof collection.reportedFileCount === 'number' ? String(collection.reportedFileCount) : '',
    collectionIsReadonly: typeof collection.isReadonly === 'boolean' ? String(collection.isReadonly) : '',
  };

  Object.keys(metadata).forEach((key) => {
    const v = metadata[key];
    if (v === undefined || v === '') delete metadata[key];
  });

  return {
    type: 'asset',
    source: RohDataSources.assetLibrary,
    id: asset.id.trim(),
    title: (asset.name || '').trim() || 'Untitled asset',
    subtitle: compact([collection.title, asset.extension?.join(', ')]) || undefined,
    date: asset.dateCreated ? asset.dateCreated.slice(0, 10) : undefined,
    imageUrl: asset.thumbnailUrl,
    sourceUrl:
      (asset.webUrl || '').trim() || (collection.publicUrl || '').trim() || (collection.sourceUrl || '').trim(),
    metadata,
  };
}

export function buildAssetStoreSearchDocuments(data: RohAssetStoreFileJson): RohSearchDocument[] {
  const out: RohSearchDocument[] = [];
  const envelope = assetLibrarySnapshotEnvelope(data);
  for (const collection of data.collections) {
    for (const asset of collection.assets ?? []) {
      const id = asset.id?.trim();
      if (!id) continue;
      const item = assetJsonToSearchItem(asset, collection, envelope);
      const searchText = normalizeText(
        [
          item.title,
          item.subtitle,
          item.date,
          item.metadata.tags,
          item.metadata.description,
          item.metadata.collectionDescription,
          item.metadata.formats,
          item.metadata.assetCollectionTitle,
          item.metadata.appCodes,
          item.metadata.orientation,
          item.metadata.fileSizeLabel,
          metadataText(item.metadata),
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
    source: RohDataSources.collections,
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
    source: RohDataSources.collections,
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
    source: RohDataSources.collections,
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
    source: RohDataSources.collections,
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
    sources: bucket(searchDocuments.map((document) => documentSource(document)), 12),
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
    source: documentSource(document),
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
  const enrichedDataset = enrichRohDatasetMetadata(dataset);
  const searchDocuments = buildSearchDocuments(enrichedDataset);
  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      counts: getRohDatasetStats(enrichedDataset),
    },
    dataset: enrichedDataset,
    searchDocuments,
    facets: buildFacets(enrichedDataset, searchDocuments),
  };
}

export function writeRohJsonIndex(dataset: RohDataset, dir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR): RohJsonIndex {
  mkdirSync(dir, { recursive: true });
  const index = createRohJsonIndex(dataset);
  const slimIndex = {
    metadata: index.metadata,
    searchDocuments: index.searchDocuments,
    facets: index.facets,
  };
  writeFileSync(join(dir, 'records.json'), JSON.stringify(index.dataset.records, null, 2));
  writeFileSync(join(dir, 'works.json'), JSON.stringify(index.dataset.works, null, 2));
  writeFileSync(join(dir, 'productions.json'), JSON.stringify(index.dataset.productions, null, 2));
  writeFileSync(join(dir, 'performances.json'), JSON.stringify(index.dataset.performances, null, 2));
  writeFileSync(join(dir, 'index.json'), JSON.stringify(slimIndex, null, 2));
  writeFileSync(join(dir, 'index-lite.json'), JSON.stringify(slimIndex, null, 2));
  const indexPath = join(dir, 'index.json');
  memoizedIndex = index;
  memoizedIndexPath = indexPath;
  memoizedIndexMtimeMs = existsSync(indexPath) ? statSync(indexPath).mtimeMs : null;
  return index;
}

function emptyDataset(): RohDataset {
  return {
    records: [],
    works: [],
    productions: [],
    performances: [],
  };
}

function readRohDatasetFromFiles(dir: string): RohDataset {
  const recordsPath = join(dir, 'records.json');
  const worksPath = join(dir, 'works.json');
  const productionsPath = join(dir, 'productions.json');
  const performancesPath = join(dir, 'performances.json');
  const loadedDataset: RohDataset = {
    records: existsSync(recordsPath) ? JSON.parse(readFileSync(recordsPath, 'utf8')) : [],
    works: existsSync(worksPath) ? JSON.parse(readFileSync(worksPath, 'utf8')) : [],
    productions: existsSync(productionsPath) ? JSON.parse(readFileSync(productionsPath, 'utf8')) : [],
    performances: existsSync(performancesPath) ? JSON.parse(readFileSync(performancesPath, 'utf8')) : [],
  };
  return enrichRohDatasetMetadata(loadedDataset);
}

function queryTermsFromParams(params: RohSearchParams): string[] {
  return normalizeText(params.query || '')
    .split(/\s+/)
    .filter(Boolean);
}

function bucketFromCounts(counts: Map<string, number>, limit = 30): RohFacetBucket[] {
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    .slice(0, limit);
}

function addToCounts(counts: Map<string, number>, value: string | undefined): void {
  if (!value) return;
  counts.set(value, (counts.get(value) || 0) + 1);
}

function normalizeDateForRange(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const pad2 = (input: number): string => `${input}`.padStart(2, '0');
  if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;
  if (/^\d{4}-\d{2}$/.test(trimmed)) return `${trimmed}-01`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  const monthIndex: Record<string, number> = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  const dayMonthYear = trimmed.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dayMonthYear) {
    const day = Number.parseInt(dayMonthYear[1], 10);
    const month = monthIndex[dayMonthYear[2].toLowerCase()];
    const year = dayMonthYear[3];
    if (month && day >= 1 && day <= 31) return `${year}-${pad2(month)}-${pad2(day)}`;
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    const parsedDate = new Date(parsed);
    return `${parsedDate.getFullYear()}-${pad2(parsedDate.getMonth() + 1)}-${pad2(parsedDate.getDate())}`;
  }
  return null;
}

interface PreparedSearchParams {
  source?: string;
  type?: RohEntityType | 'all';
  collection?: string;
  genre?: string;
  creator?: string;
  company?: string;
  dateFrom: string | null;
  dateTo: string | null;
  queryTerms: string[];
}

function prepareSearchParams(params: RohSearchParams): PreparedSearchParams {
  return {
    source: params.source,
    type: params.type,
    collection: params.collection,
    genre: params.genre,
    creator: params.creator,
    company: params.company,
    dateFrom: normalizeDateForRange(params.dateFrom),
    dateTo: normalizeDateForRange(params.dateTo),
    queryTerms: queryTermsFromParams(params),
  };
}

function matchesDateRange(document: RohSearchDocument, prepared: PreparedSearchParams): boolean {
  if (!prepared.dateFrom && !prepared.dateTo) return true;
  if (!document.date) return false;
  const normalizedDocumentDate = normalizeDateForRange(document.date);
  // When a date filter is active, rows with non-normalizable dates are excluded to avoid misleading range matches.
  if (!normalizedDocumentDate) return false;
  if (prepared.dateFrom && normalizedDocumentDate < prepared.dateFrom) return false;
  if (prepared.dateTo && normalizedDocumentDate > prepared.dateTo) return false;
  return true;
}

function passesSearchFilters(document: RohSearchDocument, prepared: PreparedSearchParams): boolean {
  if (prepared.source && documentSource(document) !== prepared.source) return false;
  if (prepared.type && prepared.type !== 'all' && document.type !== prepared.type) return false;
  if (prepared.collection && document.collection !== prepared.collection) return false;
  if (prepared.genre && document.genre !== prepared.genre) return false;
  if (prepared.creator && document.creator !== prepared.creator) return false;
  if (prepared.company && document.company !== prepared.company) return false;
  if (!matchesDateRange(document, prepared)) return false;
  return prepared.queryTerms.every((term) => document.searchText.includes(term));
}

function reactiveFacets(searchDocuments: RohSearchDocument[], params: RohSearchParams): RohSearchResult['facets'] {
  const prepared = prepareSearchParams(params);
  const sourceCounts = new Map<string, number>();
  const collectionCounts = new Map<string, number>();
  const genreCounts = new Map<string, number>();
  const creatorCounts = new Map<string, number>();
  const companyCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();

  for (const document of searchDocuments) {
    if (!matchesDateRange(document, prepared)) continue;
    if (!prepared.queryTerms.every((term) => document.searchText.includes(term))) continue;

    const sourceMatch = !prepared.source || documentSource(document) === prepared.source;
    const typeMatch = !prepared.type || prepared.type === 'all' || document.type === prepared.type;
    const collectionMatch = !prepared.collection || document.collection === prepared.collection;
    const genreMatch = !prepared.genre || document.genre === prepared.genre;
    const creatorMatch = !prepared.creator || document.creator === prepared.creator;
    const companyMatch = !prepared.company || document.company === prepared.company;

    if (typeMatch && collectionMatch && genreMatch && creatorMatch && companyMatch) {
      addToCounts(sourceCounts, documentSource(document));
    }
    if (sourceMatch && typeMatch && genreMatch && creatorMatch && companyMatch) {
      addToCounts(collectionCounts, document.collection);
    }
    if (sourceMatch && typeMatch && collectionMatch && creatorMatch && companyMatch) {
      addToCounts(genreCounts, document.genre);
    }
    if (sourceMatch && typeMatch && collectionMatch && genreMatch && companyMatch) {
      addToCounts(creatorCounts, document.creator);
    }
    if (sourceMatch && typeMatch && collectionMatch && genreMatch && creatorMatch) {
      addToCounts(companyCounts, document.company);
    }
    if (sourceMatch && collectionMatch && genreMatch && creatorMatch && companyMatch) {
      addToCounts(typeCounts, document.type);
    }
  }

  return {
    sources: bucketFromCounts(sourceCounts, 12),
    collections: bucketFromCounts(collectionCounts),
    genres: bucketFromCounts(genreCounts),
    creators: bucketFromCounts(creatorCounts),
    companies: bucketFromCounts(companyCounts),
    types: bucketFromCounts(typeCounts, 32),
  };
}

export function loadRohJsonIndex(
  dir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR,
  options: LoadRohJsonIndexOptions = {},
): RohJsonIndex | null {
  const indexLitePath = join(dir, 'index-lite.json');
  const indexPath = existsSync(indexLitePath) ? indexLitePath : join(dir, 'index.json');
  const defaultDir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR;
  const shouldMemoize = dir === defaultDir;
  const indexExists = existsSync(indexPath);

  if (shouldMemoize && memoizedIndex !== undefined && memoizedIndexPath === indexPath) {
    const currentMtime = indexExists ? statSync(indexPath).mtimeMs : null;
    if (currentMtime === memoizedIndexMtimeMs) {
      return memoizedIndex;
    }
  }

  if (!existsSync(indexPath)) {
    if (shouldMemoize) {
      memoizedIndex = null;
      memoizedIndexPath = indexPath;
      memoizedIndexMtimeMs = null;
    }
    return null;
  }

  const partialIndex = JSON.parse(readFileSync(indexPath, 'utf8')) as Omit<RohJsonIndex, 'dataset'>;
  const dataset = options.hydrateDataset ? readRohDatasetFromFiles(dir) : emptyDataset();
  const index: RohJsonIndex = { ...partialIndex, dataset };
  if (shouldMemoize) {
    memoizedIndex = index;
    memoizedIndexPath = indexPath;
    memoizedIndexMtimeMs = statSync(indexPath).mtimeMs;
  }
  return index;
}

export function searchRohIndex(index: RohJsonIndex, params: RohSearchParams): RohSearchResult {
  const limit = normalizeLimit(params.limit);
  const offset = normalizeOffset(params.offset);
  const prepared = prepareSearchParams(params);
  const matches = index.searchDocuments.filter((document) => passesSearchFilters(document, prepared));

  const facets = reactiveFacets(index.searchDocuments, params);
  return {
    items: matches.slice(offset, offset + limit).map(toSearchItem),
    total: matches.length,
    facets,
  };
}

export function searchCombinedRoh(
  index: RohJsonIndex | null,
  params: RohSearchParams,
  opts?: CombinedRohSearchOptions,
): RohSearchResult {
  const limit = normalizeLimit(params.limit);
  const offset = normalizeOffset(params.offset);
  const prepared = prepareSearchParams(params);

  let resolvedAssetJson: RohAssetStoreFileJson | null;
  if (opts?.assetData === null) resolvedAssetJson = null;
  else if (opts?.assetData !== undefined) resolvedAssetJson = opts.assetData;
  else resolvedAssetJson = loadRohAssetStoreFile();

  const assetDocuments =
    resolvedAssetJson && resolvedAssetJson.collections?.length ? buildAssetStoreSearchDocuments(resolvedAssetJson) : [];

  let catalogue: RboPublicCatalogueFileJson | null;
  if (opts?.rboCatalogue === null) catalogue = null;
  else if (opts?.rboCatalogue !== undefined) catalogue = opts.rboCatalogue;
  else catalogue = loadRboPublicCatalogueFile();

  const rboFlattened =
    catalogue &&
    (catalogue.events?.length || catalogue.digitalEvents?.length || catalogue.digitalEventVideos?.length)
      ? flattenRboPublicCatalogue(catalogue)
      : [];

  const catalogueDocuments = rboFlattened.map(mapFlattenedRboCatalogue);

  const archiveDocuments = index?.searchDocuments ?? [];
  const mergedDocuments = [...archiveDocuments, ...assetDocuments, ...catalogueDocuments];
  const matches = mergedDocuments
    .filter((document) => passesSearchFilters(document, prepared))
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    items: matches.slice(offset, offset + limit).map(toSearchItem),
    total: matches.length,
    facets: reactiveFacets(mergedDocuments, params),
  };
}

export function hasRohSearchCorpus(index: RohJsonIndex | null): boolean {
  if (index?.searchDocuments.length) return true;
  if (countRohAssetsInFile(loadRohAssetStoreFile())) return true;
  const catalogue = loadRboPublicCatalogueFile();
  return countRboWebItems(catalogue) > 0 || countRboStreamItems(catalogue) > 0;
}

export function getCombinedRohSummary(index: RohJsonIndex | null): {
  records: number;
  works: number;
  productions: number;
  performances: number;
  assetLibraryAssets: number;
  webContentItems: number;
  streamItems: number;
} {
  const base = index?.metadata.counts;
  const assetFile = loadRohAssetStoreFile();
  const catalogue = loadRboPublicCatalogueFile();

  return {
    records: base?.records ?? 0,
    works: base?.works ?? 0,
    productions: base?.productions ?? 0,
    performances: base?.performances ?? 0,
    assetLibraryAssets: countRohAssetsInFile(assetFile),
    webContentItems: countRboWebItems(catalogue),
    streamItems: countRboStreamItems(catalogue),
  };
}

export function getCombinedRohItem(
  index: RohJsonIndex | null,
  type: RohEntityType,
  id: string,
  opts?: CombinedRohSearchOptions,
): RohSearchItem | null {
  if (type === 'rbo_web' || type === 'rbo_stream') {
    let catalogue: RboPublicCatalogueFileJson | null;
    if (opts?.rboCatalogue === null) catalogue = null;
    else if (opts?.rboCatalogue !== undefined) catalogue = opts.rboCatalogue;
    else catalogue = loadRboPublicCatalogueFile();
    const row = flattenRboPublicCatalogue(catalogue).find((entry) => entry.type === type && entry.id === id);
    if (!row) return null;
    return toSearchItem(mapFlattenedRboCatalogue(row));
  }

  if (type !== 'asset') {
    if (!index) return null;
    return getRohItem(index, type, id);
  }
  let resolved: RohAssetStoreFileJson | null;
  if (opts?.assetData === null) resolved = null;
  else if (opts?.assetData !== undefined) resolved = opts.assetData;
  else resolved = loadRohAssetStoreFile();

  if (!resolved?.collections?.length) return null;

  const envelope = assetLibrarySnapshotEnvelope(resolved);
  const key = id.trim().toLowerCase();
  for (const collection of resolved.collections) {
    const asset = collection.assets?.find((entry) => entry.id.trim().toLowerCase() === key);
    if (asset) return assetJsonToSearchItem(asset, collection, envelope);
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
