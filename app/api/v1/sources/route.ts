import { NextResponse } from 'next/server';
import { hasRohSearchCorpus, loadRohJsonIndex, searchCombinedRoh } from '@/app/lib/roh/database';
import { RohDataSources, RohEntityType } from '@/app/lib/roh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SOURCE_TYPES: Record<string, RohEntityType[]> = {
  [RohDataSources.collections]: ['record', 'work', 'production', 'performance'],
  [RohDataSources.assetLibrary]: ['asset'],
  [RohDataSources.webContent]: ['rbo_web'],
  [RohDataSources.stream]: ['rbo_stream'],
};

export async function GET() {
  const index = loadRohJsonIndex();
  const sourceCounts = hasRohSearchCorpus(index)
    ? new Map(searchCombinedRoh(index, { limit: 1 }).facets.sources.map((bucket) => [bucket.value, bucket.count]))
    : new Map<string, number>();

  const sources = Object.values(RohDataSources).map((label) => ({
    label,
    count: sourceCounts.get(label) || 0,
    types: SOURCE_TYPES[label] || [],
  }));

  return NextResponse.json({
    sources,
  });
}
