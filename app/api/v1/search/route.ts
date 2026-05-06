import { NextRequest, NextResponse } from 'next/server';
import { hasRohSearchCorpus, loadRohJsonIndex, searchCombinedRoh } from '@/app/lib/roh/database';
import { RohDataSources, type RohDataSourceLabel, RohEntityType } from '@/app/lib/roh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_TYPES: RohEntityType[] = ['record', 'work', 'production', 'performance', 'asset', 'rbo_web', 'rbo_stream'];
const VALID_SOURCES = new Set<RohDataSourceLabel>(Object.values(RohDataSources));

function toType(value: string | null): RohEntityType | 'all' | undefined {
  if (!value || value === 'all') return value === 'all' ? 'all' : undefined;
  return VALID_TYPES.includes(value as RohEntityType) ? (value as RohEntityType) : undefined;
}

function toSource(value: string | null): string | undefined {
  if (!value) return undefined;
  return VALID_SOURCES.has(value as RohDataSourceLabel) ? value : undefined;
}

function numberOrFallback(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function GET(request: NextRequest) {
  const index = loadRohJsonIndex();
  if (!hasRohSearchCorpus(index)) {
    return NextResponse.json(
      {
        error:
          'Search corpus unavailable. Generate data with pnpm rbo:fetch, pnpm roh:asset-store, and/or crawl + pnpm roh:index.',
        items: [],
        total: 0,
      },
      { status: 503 }
    );
  }

  const params = request.nextUrl.searchParams;
  const limit = numberOrFallback(params.get('limit') ?? params.get('per_page'), 50);
  const offset = numberOrFallback(params.get('offset'), 0);
  const page = numberOrFallback(params.get('page'), 1);
  const computedOffset = params.get('offset') ? offset : Math.max(page - 1, 0) * Math.max(limit, 1);

  const result = searchCombinedRoh(index, {
    query: params.get('q') || params.get('query') || undefined,
    type: toType(params.get('type')),
    source: toSource(params.get('source')),
    collection: params.get('collection') || undefined,
    genre: params.get('genre') || undefined,
    creator: params.get('creator') || undefined,
    company: params.get('company') || undefined,
    dateFrom: params.get('dateFrom') || undefined,
    dateTo: params.get('dateTo') || undefined,
    limit,
    offset: computedOffset,
  });

  return NextResponse.json({
    items: result.items,
    total: result.total,
    page: Math.floor(computedOffset / Math.max(limit, 1)) + 1,
    perPage: Math.max(limit, 1),
    facets: result.facets,
  });
}
