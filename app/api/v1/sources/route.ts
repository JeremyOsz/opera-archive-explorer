import { NextResponse } from 'next/server';
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
  const sources = Object.values(RohDataSources).map((label) => ({
    label,
    types: SOURCE_TYPES[label] || [],
  }));

  return NextResponse.json({
    sources,
  });
}
