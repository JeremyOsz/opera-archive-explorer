import { NextRequest, NextResponse } from 'next/server';
import { getRohItem, loadRohJsonIndex } from '@/app/lib/roh/database';
import { RohEntityType } from '@/app/lib/roh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isRohType(value: string): value is RohEntityType {
  return ['record', 'work', 'production', 'performance'].includes(value);
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
  if (!index) {
    return NextResponse.json({ error: 'ROH index is not available' }, { status: 503 });
  }

  const item = getRohItem(index, params.type, params.id);
  if (!item) {
    return NextResponse.json({ error: 'ROH item not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}
