import { NextRequest, NextResponse } from 'next/server';
import { getCombinedRohItem, hasRohSearchCorpus, loadRohJsonIndex } from '@/app/lib/roh/database';
import { RohEntityType } from '@/app/lib/roh/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_TYPES: RohEntityType[] = ['record', 'work', 'production', 'performance', 'asset', 'rbo_web', 'rbo_stream'];

function isRohType(value: string): value is RohEntityType {
  return VALID_TYPES.includes(value as RohEntityType);
}

function parseTypedId(compoundId: string): { type?: RohEntityType; id: string } {
  const decoded = decodeURIComponent(compoundId);
  const separator = decoded.indexOf(':');
  if (separator <= 0) return { id: decoded };
  const maybeType = decoded.slice(0, separator);
  const remainder = decoded.slice(separator + 1);
  if (!isRohType(maybeType) || !remainder) return { id: decoded };
  return { type: maybeType, id: remainder };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  const params = await Promise.resolve(context.params);
  const parsed = parseTypedId(params.id);
  const queryType = request.nextUrl.searchParams.get('type');
  const resolvedType = parsed.type || (queryType && isRohType(queryType) ? queryType : undefined);

  if (!resolvedType) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid type. Use '/api/v1/items/{type}:{id}' or pass '?type=record|work|production|performance|asset|rbo_web|rbo_stream'.",
      },
      { status: 400 }
    );
  }

  const index = loadRohJsonIndex();
  if (!hasRohSearchCorpus(index)) {
    return NextResponse.json({ error: 'ROH search corpus is not available' }, { status: 503 });
  }

  const item = getCombinedRohItem(index, resolvedType, parsed.id);
  if (!item) {
    return NextResponse.json({ error: 'ROH item not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}
