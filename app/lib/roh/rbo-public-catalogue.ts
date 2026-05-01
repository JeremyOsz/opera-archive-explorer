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

  for (const raw of json.events ?? []) {
    const id = typeof raw?.id === 'string' ? raw.id : '';
    if (!id || raw.type !== 'event') continue;
    const attrs = raw.attributes ?? {};
    const title = typeof attrs.title === 'string' ? attrs.title.trim() : '';
    if (!title) continue;
    const subtitle = typeof attrs.slug === 'string' ? attrs.slug : undefined;

    const searchPieces = [
      title,
      ...(subtitle ? [subtitle] : []),
      stripHtml(attrs.description),
      stripHtml(attrs.carouselDescription),
      stripHtml(attrs.sourceType),
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
      metadata: {
        catalogueKind: 'event',
        apiId: id,
        slug: typeof attrs.slug === 'string' ? attrs.slug : '',
      },
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

    const searchPieces = [
      title,
      slug,
      stripHtml(attrs.description),
      stripHtml(attrs.shortDescription),
      stripHtml(attrs.shortCreativesSummary),
      stripHtml(attrs.guidance),
      ...pickDatePieces(attrs),
    ];

    const linkedVideoId = linkedVideoIdFromDigitalEvent(raw);
    if (linkedVideoId && slug) {
      videoIdToSlug.set(linkedVideoId, slug);
    }

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
      metadata: {
        catalogueKind: 'digitalEvent',
        apiId: id,
        slug,
      },
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
      metadata: {
        catalogueKind: 'videoInfo',
        apiId: id,
        slug: linkedSlug || '',
      },
      searchPieces,
    });
  }

  return out.sort((a, b) => a.title.localeCompare(b.title));
}

function compactLabels(...parts: Array<string | undefined>): string | undefined {
  const s = parts.filter(Boolean).join(' · ');
  return s.trim() || undefined;
}
