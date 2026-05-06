import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RohDataSources, type RohDataSourceLabel, type RohEntityType } from './types';

const RBO_ORIGIN = 'https://www.rbo.org.uk';

export const RBO_PUBLIC_CATALOGUE_JSON_PATH = join(process.cwd(), 'app', 'data', 'rbo-public-catalogue.json');

export interface JsonApiLikeResource {
  type?: string;
  id?: string;
  attributes?: Record<string, unknown>;
  relationships?: Record<string, unknown>;
}

export interface RboPublicCatalogueFileJson {
  /** Snapshot metadata from the fetch script */
  generatedAt?: string;
  source?: string;
  endpoints?: Record<string, string>;
  counts?: Record<string, number>;
  pagination?: Record<string, unknown>;
  events?: JsonApiLikeResource[];
  digitalEvents?: JsonApiLikeResource[];
  digitalEventVideos?: JsonApiLikeResource[];
  streamHomePage?: unknown;
}

/** Normalised catalog row merged into RohSearchDocument in database.ts */
export interface FlattenedRboCatalogueRecord {
  source: RohDataSourceLabel;
  type: RohEntityType;
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
  sourceUrl: string;
  metadata: Record<string, string>;
  searchPieces: string[];
}

let memo: RboPublicCatalogueFileJson | null | undefined;
let memoPath: string | undefined;

function resolvedPath(): string {
  return process.env.RBO_PUBLIC_CATALOGUE_PATH || RBO_PUBLIC_CATALOGUE_JSON_PATH;
}

export function clearRboPublicCatalogueMemo(): void {
  memo = undefined;
  memoPath = undefined;
}

export function loadRboPublicCatalogueFile(): RboPublicCatalogueFileJson | null {
  const path = resolvedPath();
  if (memo !== undefined && memoPath === path) return memo;

  memoPath = path;
  if (!existsSync(path)) {
    memo = null;
    return null;
  }
  memo = JSON.parse(readFileSync(path, 'utf8')) as RboPublicCatalogueFileJson;
  return memo;
}

function stripHtml(html: unknown): string {
  if (typeof html !== 'string') return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const METADATA_MAX_LEN = 600;

function truncateMeta(value: string, max = METADATA_MAX_LEN): string {
  const t = value.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function putMeta(target: Record<string, string>, key: string, value: unknown): void {
  if (value === undefined || value === null) return;
  if (typeof value === 'boolean') {
    target[key] = value ? 'true' : 'false';
    return;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    target[key] = String(value);
    return;
  }
  if (typeof value === 'string') {
    const t = value.trim();
    if (t) target[key] = t;
  }
}

function generatedMetadata(attrs: Record<string, unknown>): Record<string, string> {
  const meta = attrs.generatedMetadata;
  if (!meta || typeof meta !== 'object') return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
    putMeta(out, key, value);
  }
  return out;
}

function catalogueSiteMetadata(root: RboPublicCatalogueFileJson): Record<string, string> {
  const out: Record<string, string> = {};
  putMeta(out, 'siteSource', root.source);
  putMeta(out, 'siteSnapshotAt', root.generatedAt);
  if (root.endpoints && typeof root.endpoints === 'object') {
    const parts = Object.entries(root.endpoints)
      .map(([k, v]) => (typeof v === 'string' && v.trim() ? `${k}=${v.trim()}` : ''))
      .filter(Boolean);
    if (parts.length) out.siteApiEndpoints = parts.join(' | ');
  }
  if (root.counts && typeof root.counts === 'object') {
    const parts = Object.entries(root.counts)
      .filter(([, n]) => typeof n === 'number' && Number.isFinite(n))
      .map(([k, n]) => `${k}:${n}`);
    if (parts.length) out.siteCatalogueCounts = parts.join(', ');
  }
  return out;
}

function relationshipResourceIds(raw: JsonApiLikeResource, relationshipKey: string): string {
  const rel = raw.relationships as Record<string, { data?: unknown }> | undefined;
  const node = rel?.[relationshipKey];
  const data = node?.data;
  if (!data) return '';
  const ids: string[] = [];
  if (Array.isArray(data)) {
    for (const row of data) {
      if (row && typeof row === 'object' && 'id' in row && typeof (row as { id: unknown }).id === 'string') {
        const id = (row as { id: string }).id.trim();
        if (id) ids.push(id);
      }
    }
  } else if (typeof data === 'object' && data !== null && 'id' in data && typeof (data as { id: unknown }).id === 'string') {
    const id = (data as { id: string }).id.trim();
    if (id) ids.push(id);
  }
  return [...new Set(ids)].join(', ');
}

function collectLinkedVideoInfoIds(raw: JsonApiLikeResource): string {
  const fromVideoInfo = relationshipResourceIds(raw, 'videoInfo');
  const fromPerformance = relationshipResourceIds(raw, 'performanceVideo');
  return [...new Set([fromVideoInfo, fromPerformance].flatMap((s) => s.split(', ').filter(Boolean)))].join(', ');
}

function performanceRollup(attrs: Record<string, unknown>): {
  types: string;
  count: string;
  firstIso: string;
  lastIso: string;
} {
  const perf = attrs.performances;
  const rows: Array<{ date?: string; performanceType?: string }> = [];
  if (Array.isArray(perf)) {
    for (const p of perf) {
      if (p && typeof p === 'object') rows.push(p as { date?: string; performanceType?: string });
    }
  } else if (typeof perf === 'string') {
    try {
      const parsed = JSON.parse(perf) as Array<{ date?: string; performanceType?: string }>;
      if (Array.isArray(parsed)) rows.push(...parsed);
    } catch {
      /* skip */
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

function assetWindowMeta(attrs: Record<string, unknown>, prefix: string, target: Record<string, string>): void {
  const win = attrs.assetAvailabilityWindow;
  if (!win || typeof win !== 'object') return;
  const w = win as Record<string, unknown>;
  putMeta(target, `${prefix}AvailabilityStart`, w.startDateTime);
  putMeta(target, `${prefix}AvailabilityEnd`, w.endDateTime);
}

function flattenVideoSourceMetadata(attrs: Record<string, unknown>, target: Record<string, string>): void {
  const src = attrs.source;
  if (!src || typeof src !== 'object') return;
  const s = src as Record<string, unknown>;
  putMeta(target, 'streamAssetType', s.assetType);
  putMeta(target, 'streamVideoType', s.videoType);
  putMeta(target, 'streamVideoKey', s.videoKey);
  putMeta(target, 'streamActivityId', s.activityId);
  putMeta(target, 'streamSourceId', s.id);
  if (typeof s.duration === 'number' && Number.isFinite(s.duration)) {
    target.streamSourceDurationSec = String(s.duration);
  }
  putMeta(target, 'streamResolution', s.resolution);
  const perf = s.performance;
  if (perf && typeof perf === 'object') {
    const p = perf as Record<string, unknown>;
    putMeta(target, 'streamPerformanceActivityTitle', p.activityTitle);
    putMeta(target, 'streamPerformanceId', p.id);
    putMeta(target, 'streamPerformanceArchived', p.archived);
  }
}

function pickImage(attrs: Record<string, unknown>): string | undefined {
  const trays = ['imageTray', 'imageResult', 'smallTrayImage', 'largeTrayImage', 'previewImage'] as const;
  for (const key of trays) {
    const tray = attrs[key] as Record<string, unknown> | undefined;
    const thumb =
      tray?.thumbPath || tray?.mobilePath || tray?.desktopPath;
    if (typeof thumb === 'string' && thumb.startsWith('http')) return thumb;
  }
  return undefined;
}

function eventHref(attrs: Record<string, unknown>): string {
  const page = attrs.productionPageUrl;
  if (typeof page === 'string' && /^https?:/i.test(page)) return page;
  if (typeof page === 'string' && page.startsWith('/')) return `${RBO_ORIGIN}${page}`;
  const slug = attrs.slug;
  if (typeof slug === 'string' && slug.trim()) return `${RBO_ORIGIN}/${slug.replace(/^\//, '')}`;
  return `${RBO_ORIGIN}/`;
}

function digitalEventHref(attrs: Record<string, unknown>): string {
  const slug = attrs.slug;
  if (typeof slug === 'string' && slug.trim()) return `${RBO_ORIGIN}/stream/${slug.replace(/^\//, '')}`;
  return `${RBO_ORIGIN}/stream`;
}

function linkedVideoIdFromDigitalEvent(raw: JsonApiLikeResource): string | undefined {
  const rel = raw.relationships;
  if (!rel || typeof rel !== 'object') return undefined;
  const performanceVideo = (rel as Record<string, unknown>).performanceVideo as
    | { data?: { id?: string } | null }
    | undefined;
  const videoId = performanceVideo?.data?.id;
  return typeof videoId === 'string' && videoId.trim() ? videoId : undefined;
}

function videoHref(videoSlug?: string): string {
  if (videoSlug) return `${RBO_ORIGIN}/stream/${videoSlug.replace(/^\//, '')}`;
  return `${RBO_ORIGIN}/stream`;
}

function pickDatePieces(attrs: Record<string, unknown>): string[] {
  const out: string[] = [];
  const published =
    attrs.publishedAt ??
    attrs.startTime ??
    attrs.endTime ??
    attrs.availabilityDate ??
    attrs.startDate;
  if (typeof published === 'string' && published) out.push(published.slice(0, 16));

  const perfMaybe = attrs.performances;
  if (typeof perfMaybe === 'string') {
    try {
      const perf = JSON.parse(perfMaybe) as Array<{ date?: string }>;
      perf.slice(0, 5).forEach((row) => {
        if (row.date) out.push(row.date.slice(0, 16));
      });
    } catch {
      /* skip */
    }
  }
  if (Array.isArray(perfMaybe)) {
    (perfMaybe as Array<{ date?: string }>).slice(0, 8).forEach((row) => {
      if (row.date) out.push(row.date.slice(0, 16));
    });
  }
  if (attrs.source && typeof attrs.source === 'object') {
    const src = attrs.source as Record<string, unknown>;
    if (typeof src.activityTitle === 'string') out.push(src.activityTitle);
    if (typeof src.videoKey === 'string') out.push(src.videoKey);
  }
  return [...new Set(out)].filter(Boolean);
}

export function countRboWebItems(json: RboPublicCatalogueFileJson | null): number {
  return json?.events?.length ?? 0;
}

export function countRboStreamItems(json: RboPublicCatalogueFileJson | null): number {
  if (!json) return 0;
  return (json.digitalEvents?.length ?? 0) + (json.digitalEventVideos?.length ?? 0);
}

export function flattenRboPublicCatalogue(json: RboPublicCatalogueFileJson | null): FlattenedRboCatalogueRecord[] {
  if (!json) return [];

  const out: FlattenedRboCatalogueRecord[] = [];
  const videoIdToSlug = new Map<string, string>();
  const siteMeta = catalogueSiteMetadata(json);

  for (const raw of json.events ?? []) {
    const id = typeof raw?.id === 'string' ? raw.id : '';
    if (!id || raw.type !== 'event') continue;
    const attrs = raw.attributes ?? {};
    const title = typeof attrs.title === 'string' ? attrs.title.trim() : '';
    if (!title) continue;
    const subtitle = typeof attrs.slug === 'string' ? attrs.slug : undefined;
    const descriptionPlain = stripHtml(attrs.description);
    const carouselPlain = stripHtml(attrs.carouselDescription);
    const roll = performanceRollup(attrs);
    const cinema = attrs.cinemaBroadcastLink;
    let cinemaUrl = '';
    if (cinema && typeof cinema === 'object' && 'url' in cinema && typeof (cinema as { url?: string }).url === 'string') {
      const u = (cinema as { url: string }).url.trim();
      if (u.startsWith('http')) cinemaUrl = u;
      else if (u.startsWith('/')) cinemaUrl = `${RBO_ORIGIN}${u}`;
    }

    const metadata: Record<string, string> = {
      ...siteMeta,
      ...generatedMetadata(attrs),
      catalogueKind: 'event',
      apiId: id,
      slug: typeof attrs.slug === 'string' ? attrs.slug : '',
    };
    putMeta(metadata, 'sourceType', attrs.sourceType);
    putMeta(metadata, 'productionPageUrl', attrs.productionPageUrl);
    if (descriptionPlain) metadata.description = truncateMeta(descriptionPlain);
    if (carouselPlain) metadata.carouselDescription = truncateMeta(carouselPlain);
    if (roll.types) metadata.performanceTypes = roll.types;
    if (roll.count) metadata.performanceCount = roll.count;
    if (roll.firstIso) metadata.firstPerformanceAt = roll.firstIso;
    if (roll.lastIso) metadata.lastPerformanceAt = roll.lastIso;
    putMeta(metadata, 'isCancelled', attrs.isCancelled);
    putMeta(metadata, 'isHiddenFromTicketsAndEvents', attrs.isHiddenFromTicketsAndEvents);
    const helpInfo = stripHtml(attrs.helpInformation);
    if (helpInfo) metadata.helpInformation = truncateMeta(helpInfo);
    if (cinemaUrl) metadata.cinemaBroadcastUrl = cinemaUrl;
    putMeta(metadata, 'tagIds', relationshipResourceIds(raw, 'tags'));
    putMeta(metadata, 'locationIds', relationshipResourceIds(raw, 'locations'));

    const searchPieces = [
      title,
      ...(subtitle ? [subtitle] : []),
      descriptionPlain,
      carouselPlain,
      stripHtml(attrs.sourceType),
      roll.types,
      cinemaUrl,
      relationshipResourceIds(raw, 'tags'),
      ...pickDatePieces(attrs),
    ];

    out.push({
      source: RohDataSources.webContent,
      type: 'rbo_web',
      id: `rbo-ev-${id}`,
      title,
      subtitle,
      date: typeof attrs.dateFieldOverride === 'string' ? attrs.dateFieldOverride : undefined,
      imageUrl: pickImage(attrs),
      sourceUrl: eventHref(attrs),
      metadata,
      searchPieces,
    });
  }

  for (const raw of json.digitalEvents ?? []) {
    const id = typeof raw?.id === 'string' ? raw.id : '';
    if (!id || raw.type !== 'digitalEvent') continue;
    const attrs = raw.attributes ?? {};
    const title = typeof attrs.title === 'string' ? attrs.title.trim() : '';
    if (!title) continue;

    const slug = typeof attrs.slug === 'string' && attrs.slug.trim() ? attrs.slug : '';
    const descPlain = stripHtml(attrs.description);
    const shortPlain = stripHtml(attrs.shortDescription);
    const creativesPlain = stripHtml(attrs.shortCreativesSummary);
    const guidancePlain = stripHtml(attrs.guidance);
    const guidanceDetailsPlain = stripHtml(attrs.guidanceDetails);

    const searchPieces = [
      title,
      slug,
      descPlain,
      shortPlain,
      creativesPlain,
      guidancePlain,
      guidanceDetailsPlain,
      ...pickDatePieces(attrs),
    ];

    const linkedVideoId = linkedVideoIdFromDigitalEvent(raw);
    if (linkedVideoId && slug) {
      videoIdToSlug.set(linkedVideoId, slug);
    }

    const metadata: Record<string, string> = {
      ...siteMeta,
      ...generatedMetadata(attrs),
      catalogueKind: 'digitalEvent',
      apiId: id,
      slug,
    };
    putMeta(metadata, 'mainVideoFeeId', attrs.mainVideoFeeId);
    putMeta(metadata, 'availabilityDate', attrs.availabilityDate);
    putMeta(metadata, 'availabilityDateFormat', attrs.availabilityDateFormat);
    putMeta(metadata, 'eventCardLabel', attrs.eventCardLabel);
    putMeta(metadata, 'publishedAt', attrs.publishedAt);
    putMeta(metadata, 'startTime', attrs.startTime);
    putMeta(metadata, 'endTime', attrs.endTime);
    if (descPlain) metadata.description = truncateMeta(descPlain);
    if (shortPlain) metadata.shortDescription = truncateMeta(shortPlain);
    if (creativesPlain) metadata.shortCreativesSummary = truncateMeta(creativesPlain);
    if (guidancePlain) metadata.guidance = truncateMeta(guidancePlain);
    if (guidanceDetailsPlain) metadata.guidanceDetails = truncateMeta(guidanceDetailsPlain);
    assetWindowMeta(attrs, 'asset', metadata);
    putMeta(metadata, 'subtagIds', relationshipResourceIds(raw, 'subtags'));
    putMeta(metadata, 'tagIds', relationshipResourceIds(raw, 'tags'));
    putMeta(metadata, 'labelIds', relationshipResourceIds(raw, 'labels'));
    const linkedVideos = collectLinkedVideoInfoIds(raw);
    if (linkedVideos) metadata.linkedVideoInfoIds = linkedVideos;

    out.push({
      source: RohDataSources.stream,
      type: 'rbo_stream',
      id: `rbo-de-${id}`,
      title,
      subtitle:
        compactLabels('Digital programme', slug ? slug.replace(/-/g, ' ') : undefined) ||
        undefined,
      date: typeof attrs.publishedAt === 'string' ? attrs.publishedAt.slice(0, 10) : undefined,
      imageUrl: pickImage(attrs),
      sourceUrl: digitalEventHref(attrs),
      metadata,
      searchPieces,
    });
  }

  for (const raw of json.digitalEventVideos ?? []) {
    const id = typeof raw?.id === 'string' ? raw.id : '';
    if (!id || raw.type !== 'videoInfo') continue;
    const attrs = raw.attributes ?? {};
    const title = typeof attrs.title === 'string' ? attrs.title.trim() : '';
    if (!title) continue;

    const shortDesc =
      typeof attrs.shortDescription === 'string' ? stripHtml(attrs.shortDescription) : '';
    const extras: string[] = [];
    const src = attrs.source;
    if (src && typeof src === 'object') {
      const s = src as Record<string, unknown>;
      if (typeof s.activityTitle === 'string') extras.push(s.activityTitle);
      if (typeof s.videoType === 'string') extras.push(s.videoType);
      if (typeof s.assetType === 'string') extras.push(s.assetType);
    }
    if (typeof attrs.extraVideoType === 'string') extras.push(attrs.extraVideoType);
    if (typeof attrs.participantDetails === 'string') extras.push(attrs.participantDetails);

    const searchPieces = [title, shortDesc, ...extras, ...pickDatePieces(attrs)];

    const linkedSlug = videoIdToSlug.get(id);
    const metadata: Record<string, string> = {
      ...siteMeta,
      ...generatedMetadata(attrs),
      catalogueKind: 'videoInfo',
      apiId: id,
      slug: linkedSlug || '',
    };
    putMeta(metadata, 'playerTitlePriority', attrs.playerTitlePriority);
    flattenVideoSourceMetadata(attrs, metadata);
    if (shortDesc) metadata.shortDescription = truncateMeta(shortDesc);
    putMeta(metadata, 'videoCardLabel', attrs.videoCardLabel);
    putMeta(metadata, 'extraVideoType', attrs.extraVideoType);
    const part = typeof attrs.participantDetails === 'string' ? stripHtml(attrs.participantDetails) : '';
    if (part) metadata.participantDetails = truncateMeta(part);
    putMeta(metadata, 'publishedAt', attrs.publishedAt);
    putMeta(metadata, 'ppvAvailabilityHours', attrs.ppvAvailabilityWindow);
    putMeta(metadata, 'startDate', attrs.startDate);
    putMeta(metadata, 'endDate', attrs.endDate);
    putMeta(metadata, 'durationTopLevel', attrs.duration);
    putMeta(metadata, 'tagIds', relationshipResourceIds(raw, 'tags'));

    out.push({
      source: RohDataSources.stream,
      type: 'rbo_stream',
      id: `rbo-vi-${id}`,
      title,
      subtitle:
        extras.length || shortDesc ? compactLabels('Stream video', shortDesc.slice(0, 80)) : 'Stream video',
      date: typeof attrs.publishedAt === 'string' ? attrs.publishedAt.slice(0, 10) : undefined,
      imageUrl: pickImage(attrs),
      sourceUrl: videoHref(linkedSlug),
      metadata,
      searchPieces,
    });
  }

  return out.sort((a, b) => a.title.localeCompare(b.title));
}

function compactLabels(...parts: Array<string | undefined>): string | undefined {
  const s = parts.filter(Boolean).join(' · ');
  return s.trim() || undefined;
}
