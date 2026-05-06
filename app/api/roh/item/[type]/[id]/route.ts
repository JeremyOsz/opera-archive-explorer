import { NextRequest, NextResponse } from 'next/server';
import { getCombinedRohItem, hasRohSearchCorpus, loadRohJsonIndex } from '@/app/lib/roh/database';
import { RohEntityType } from '@/app/lib/roh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isRohType(value: string): value is RohEntityType {
  return ['record', 'work', 'production', 'performance', 'asset', 'rbo_web', 'rbo_stream'].includes(value);
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ type: string; id: string }> | { type: string; id: string } }
) {
  const params = await Promise.resolve(context.params);
  if (!isRohType(params.type)) {
    return NextResponse.json({ error: 'Invalid ROH item type' }, { status: 400 });
  }

  const index = loadRohJsonIndex();
  if (!hasRohSearchCorpus(index)) {
    return NextResponse.json({ error: 'ROH search corpus is not available' }, { status: 503 });
  }

  const item = getCombinedRohItem(index, params.type, decodeURIComponent(params.id));
  if (!item) {
    return NextResponse.json({ error: 'ROH item not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}
