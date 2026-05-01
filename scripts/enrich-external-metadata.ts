import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const RBO_PATH = join(process.cwd(), 'app', 'data', 'rbo-public-catalogue.json');
const ASSET_PATH = join(process.cwd(), 'app', 'data', 'roh-asset-store-collections.json');
const RBO_ORIGIN = 'https://www.rbo.org.uk';

type JsonMap = Record<string, unknown>;

interface JsonApiLikeResource {
  type?: string;
  id?: string;
  attributes?: JsonMap;
  relationships?: JsonMap;
}

interface AssetRecord extends JsonMap {
  name?: string;
  id?: string;
  description?: string;
  dateCreated?: string;
  fileSize?: number;
  extension?: string[];
  orientation?: string;
  tags?: string[];
  appCodes?: string[];
  isPrivate?: boolean;
  isArchived?: boolean;
  isKeyVisual?: boolean;
  hasAdditionalFiles?: boolean;
}

interface AssetCollectionRecord extends JsonMap {
  id?: string;
  title?: string;
  description?: string;
  publicUrl?: string;
  sourceUrl?: string;
  expectedFileCount?: number;
  fetchedFileCount?: number;
  reportedFileCount?: number;
  isReadonly?: boolean;
  assets?: AssetRecord[];
}

function toCleanText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function put(meta: Record<string, string>, key: string, value: unknown): void {
  if (typeof value === 'string' && value.trim()) {
    meta[key] = value.trim();
    return;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    meta[key] = String(value);
    return;
  }
  if (typeof value === 'boolean') {
    meta[key] = value ? 'true' : 'false';
  }
}

function relationshipIds(resource: JsonApiLikeResource, key: string): string {
  const rel = resource.relationships?.[key] as { data?: unknown } | undefined;
  const data = rel?.data;
  const ids: string[] = [];
  if (Array.isArray(data)) {
    for (const row of data) {
      if (row && typeof row === 'object' && 'id' in row && typeof (row as { id?: unknown }).id === 'string') {
        ids.push(((row as { id: string }).id || '').trim());
      }
    }
  } else if (data && typeof data === 'object' && 'id' in data && typeof (data as { id?: unknown }).id === 'string') {
    ids.push(((data as { id: string }).id || '').trim());
  }
  return [...new Set(ids.filter(Boolean))].join(', ');
}

function performanceRollup(attrs: JsonMap): {
  types: string;
  count: string;
  firstIso: string;
  lastIso: string;
} {
  const perf = attrs.performances;
  const rows: Array<{ date?: string; performanceType?: string }> = [];
  if (Array.isArray(perf)) {
    for (const row of perf) {
      if (row && typeof row === 'object') rows.push(row as { date?: string; performanceType?: string });
    }
  } else if (typeof perf === 'string') {
    try {
      const parsed = JSON.parse(perf) as Array<{ date?: string; performanceType?: string }>;
      if (Array.isArray(parsed)) rows.push(...parsed);
    } catch {
      // ignore malformed payloads
    }
  }

  const types = new Set<string>();
  const dates: string[] = [];
  for (const row of rows) {
    if (row.performanceType?.trim()) types.add(row.performanceType.trim());
    if (row.date?.trim()) dates.push(row.date.trim());
  }
  dates.sort();
  return {
    types: [...types].sort().join(', '),
    count: rows.length ? String(rows.length) : '',
    firstIso: dates[0] || '',
    lastIso: dates.length ? dates[dates.length - 1]! : '',
  };
}

function enrichRboFile(): { events: number; digitalEvents: number; digitalEventVideos: number } {
  const json = JSON.parse(readFileSync(RBO_PATH, 'utf8')) as JsonMap;
  const siteSource = typeof json.source === 'string' ? json.source : RBO_ORIGIN;
  const siteSnapshotAt = typeof json.generatedAt === 'string' ? json.generatedAt : '';

  const enrich = (resource: JsonApiLikeResource): void => {
    const attrs = (resource.attributes ??= {});
    const metadata: Record<string, string> = {};
    put(metadata, 'siteSource', siteSource);
    put(metadata, 'siteSnapshotAt', siteSnapshotAt);
    put(metadata, 'catalogueType', resource.type);
    put(metadata, 'apiId', resource.id);
    put(metadata, 'slug', attrs.slug);
    put(metadata, 'title', attrs.title);
    put(metadata, 'publishedAt', attrs.publishedAt);
    put(metadata, 'startTime', attrs.startTime);
    put(metadata, 'endTime', attrs.endTime);
    put(metadata, 'eventCardLabel', attrs.eventCardLabel);
    put(metadata, 'availabilityDate', attrs.availabilityDate);
    put(metadata, 'availabilityDateFormat', attrs.availabilityDateFormat);
    put(metadata, 'sourceType', attrs.sourceType);
    put(metadata, 'description', toCleanText(attrs.description));
    put(metadata, 'shortDescription', toCleanText(attrs.shortDescription));
    put(metadata, 'carouselDescription', toCleanText(attrs.carouselDescription));
    put(metadata, 'guidance', toCleanText(attrs.guidance));
    put(metadata, 'guidanceDetails', toCleanText(attrs.guidanceDetails));
    put(metadata, 'shortCreativesSummary', toCleanText(attrs.shortCreativesSummary));
    put(metadata, 'participantDetails', toCleanText(attrs.participantDetails));
    put(metadata, 'extraVideoType', attrs.extraVideoType);
    put(metadata, 'isCancelled', attrs.isCancelled);
    put(metadata, 'isHiddenFromTicketsAndEvents', attrs.isHiddenFromTicketsAndEvents);
    put(metadata, 'tagIds', relationshipIds(resource, 'tags'));
    put(metadata, 'subtagIds', relationshipIds(resource, 'subtags'));
    put(metadata, 'labelIds', relationshipIds(resource, 'labels'));
    put(metadata, 'locationIds', relationshipIds(resource, 'locations'));

    const source = attrs.source;
    if (source && typeof source === 'object') {
      const src = source as JsonMap;
      put(metadata, 'streamAssetType', src.assetType);
      put(metadata, 'streamVideoType', src.videoType);
      put(metadata, 'streamVideoKey', src.videoKey);
      put(metadata, 'streamActivityId', src.activityId);
      put(metadata, 'streamResolution', src.resolution);
      put(metadata, 'streamSourceDurationSec', src.duration);
      const perf = src.performance;
      if (perf && typeof perf === 'object') {
        const performance = perf as JsonMap;
        put(metadata, 'streamPerformanceId', performance.id);
        put(metadata, 'streamPerformanceActivityTitle', performance.activityTitle);
        put(metadata, 'streamPerformanceArchived', performance.archived);
      }
    }

    const rollup = performanceRollup(attrs);
    put(metadata, 'performanceTypes', rollup.types);
    put(metadata, 'performanceCount', rollup.count);
    put(metadata, 'firstPerformanceAt', rollup.firstIso);
    put(metadata, 'lastPerformanceAt', rollup.lastIso);

    const cinema = attrs.cinemaBroadcastLink;
    if (cinema && typeof cinema === 'object') {
      const c = cinema as JsonMap;
      const url = typeof c.url === 'string' ? c.url.trim() : '';
      if (url.startsWith('http')) metadata.cinemaBroadcastUrl = url;
      else if (url.startsWith('/')) metadata.cinemaBroadcastUrl = `${RBO_ORIGIN}${url}`;
    }

    attrs.generatedMetadata = metadata;
  };

  const events = Array.isArray(json.events) ? (json.events as JsonApiLikeResource[]) : [];
  const digitalEvents = Array.isArray(json.digitalEvents) ? (json.digitalEvents as JsonApiLikeResource[]) : [];
  const digitalEventVideos = Array.isArray(json.digitalEventVideos)
    ? (json.digitalEventVideos as JsonApiLikeResource[])
    : [];

  events.forEach(enrich);
  digitalEvents.forEach(enrich);
  digitalEventVideos.forEach(enrich);

  writeFileSync(RBO_PATH, `${JSON.stringify(json, null, 2)}\n`);
  return { events: events.length, digitalEvents: digitalEvents.length, digitalEventVideos: digitalEventVideos.length };
}

function inferAssetNameMetadata(name: string): Record<string, string> {
  const out: Record<string, string> = {};
  const performerMatch = name.match(/^(.+?)\s+as\s+(.+?)\s+in\s+(.+?)(?:,|\s+The Royal|\s+©|$)/i);
  if (performerMatch) {
    out.performer = performerMatch[1].trim();
    out.role = performerMatch[2].trim();
    out.productionContext = performerMatch[3].trim();
  }
  const copyrightYearMatch = name.match(/©\s*(\d{4})/);
  if (copyrightYearMatch) out.copyrightYear = copyrightYearMatch[1];
  const photographerMatch = name.match(/©\s*\d{4}\s+(.+)$/);
  if (photographerMatch) out.credit = photographerMatch[1].trim();
  return out;
}

function formatBytes(bytes: number | undefined): string {
  if (!Number.isFinite(bytes) || bytes === undefined || bytes < 0) return '';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function enrichAssetFile(): { collections: number; assets: number } {
  const json = JSON.parse(readFileSync(ASSET_PATH, 'utf8')) as JsonMap;
  const collections = Array.isArray(json.collections) ? (json.collections as AssetCollectionRecord[]) : [];
  const siteSource = typeof json.source === 'string' ? json.source : 'https://library.roh.org.uk';
  const siteSnapshotAt = typeof json.generatedAt === 'string' ? json.generatedAt : '';

  let assetCount = 0;
  for (const collection of collections) {
    const collectionMeta: Record<string, string> = {};
    put(collectionMeta, 'siteSource', siteSource);
    put(collectionMeta, 'siteSnapshotAt', siteSnapshotAt);
    put(collectionMeta, 'collectionId', collection.id);
    put(collectionMeta, 'collectionTitle', collection.title);
    put(collectionMeta, 'collectionDescription', collection.description);
    put(collectionMeta, 'publicUrl', collection.publicUrl);
    put(collectionMeta, 'sourceUrl', collection.sourceUrl);
    put(collectionMeta, 'expectedFileCount', collection.expectedFileCount);
    put(collectionMeta, 'fetchedFileCount', collection.fetchedFileCount);
    put(collectionMeta, 'reportedFileCount', collection.reportedFileCount);
    put(collectionMeta, 'isReadonly', collection.isReadonly);
    collection.metadata = collectionMeta;

    const assets = Array.isArray(collection.assets) ? collection.assets : [];
    for (const asset of assets) {
      assetCount += 1;
      const assetMeta: Record<string, string> = { ...collectionMeta };
      put(assetMeta, 'assetId', asset.id);
      put(assetMeta, 'assetName', asset.name);
      put(assetMeta, 'assetDescription', asset.description);
      put(assetMeta, 'dateCreated', asset.dateCreated);
      put(assetMeta, 'orientation', asset.orientation);
      put(assetMeta, 'extensions', Array.isArray(asset.extension) ? asset.extension.join(', ') : '');
      put(assetMeta, 'tags', Array.isArray(asset.tags) ? asset.tags.join(', ') : '');
      put(assetMeta, 'appCodes', Array.isArray(asset.appCodes) ? asset.appCodes.join(', ') : '');
      put(assetMeta, 'isPrivate', asset.isPrivate);
      put(assetMeta, 'isArchived', asset.isArchived);
      put(assetMeta, 'isKeyVisual', asset.isKeyVisual);
      put(assetMeta, 'hasAdditionalFiles', asset.hasAdditionalFiles);
      put(assetMeta, 'fileSizeBytes', asset.fileSize);
      put(assetMeta, 'fileSizeLabel', formatBytes(asset.fileSize));
      put(assetMeta, 'webUrl', asset.webUrl);
      put(assetMeta, 'thumbnailUrl', asset.thumbnailUrl);
      Object.assign(assetMeta, inferAssetNameMetadata(asset.name || ''));
      asset.metadata = assetMeta;
    }
  }

  writeFileSync(ASSET_PATH, `${JSON.stringify(json, null, 2)}\n`);
  return { collections: collections.length, assets: assetCount };
}

function main(): void {
  const rbo = enrichRboFile();
  const assets = enrichAssetFile();
  console.log(
    `Enriched metadata in rbo-public-catalogue.json (${rbo.events} events, ${rbo.digitalEvents} digitalEvents, ${rbo.digitalEventVideos} videos)`,
  );
  console.log(
    `Enriched metadata in roh-asset-store-collections.json (${assets.collections} collections, ${assets.assets} assets)`,
  );
}

main();
