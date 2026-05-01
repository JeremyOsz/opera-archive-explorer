import { NextRequest, NextResponse } from 'next/server';
import { hasRohSearchCorpus, loadRohJsonIndex, searchCombinedRoh } from '@/app/lib/roh/database';
import { RohEntityType } from '@/app/lib/roh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function entityType(value: string | null): RohEntityType | 'all' | undefined {
  if (!value || value === 'all') return value === 'all' ? 'all' : undefined;
  if (['record', 'work', 'production', 'performance', 'asset'].includes(value)) {
    return value as RohEntityType;
  }
  return undefined;
}

export async function GET(request: NextRequest) {
  const index = loadRohJsonIndex();
  if (!hasRohSearchCorpus(index)) {
    return NextResponse.json(
      {
        error:
          'ROH search corpus is not available. Run pnpm roh:asset-store and/or pnpm roh:crawl then pnpm roh:index.',
        items: [],
        total: 0,
      },
      { status: 503 }
    );
  }

  const params = request.nextUrl.searchParams;
  const result = searchCombinedRoh(index, {
    query: params.get('q') || undefined,
    type: entityType(params.get('type')),
    collection: params.get('collection') || undefined,
    genre: params.get('genre') || undefined,
    creator: params.get('creator') || undefined,
    company: params.get('company') || undefined,
    dateFrom: params.get('dateFrom') || undefined,
    dateTo: params.get('dateTo') || undefined,
    limit: Number(params.get('limit') || 50),
    offset: Number(params.get('offset') || 0),
  });
  return NextResponse.json(result);
}
