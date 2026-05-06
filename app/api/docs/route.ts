import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const docs = {
  name: 'Opera Archive Explorer API',
  version: '1.0.0',
  docs: {
    markdown: '/docs/API.md',
  },
  endpoints: [
    {
      path: '/api/v1/search',
      method: 'GET',
      description: 'Primary versioned ROH search endpoint.',
      query: {
        q: 'string (optional)',
        query: 'string (optional alias for q)',
        type: 'record|work|production|performance|asset|rbo_web|rbo_stream|all (optional)',
        source: 'string (optional)',
        collection: 'string (optional)',
        genre: 'string (optional)',
        creator: 'string (optional)',
        company: 'string (optional)',
        dateFrom: 'string (optional)',
        dateTo: 'string (optional)',
        page: 'number (optional, default: 1)',
        limit: 'number (optional, default: 50)',
        per_page: 'number (optional alias for limit)',
        offset: 'number (optional)',
      },
      responses: {
        200: 'Search results with items, total, page, perPage, and facets',
        503: 'Search corpus unavailable',
      },
    },
    {
      path: '/api/v1/items/{type}:{id}',
      method: 'GET',
      description: 'Get a specific ROH item by typed ID.',
      responses: {
        200: 'Item payload',
        400: 'Missing or invalid type',
        404: 'Item not found',
        503: 'Search corpus unavailable',
      },
    },
    {
      path: '/api/v1/sources',
      method: 'GET',
      description: 'List available sources with counts and supported types.',
      responses: {
        200: 'Array of source descriptors',
      },
    },
    {
      path: '/api/roh/search',
      method: 'GET',
      description: 'Legacy ROH search response (items + total + facets).',
    },
    {
      path: '/api/roh/item/{type}/{id}',
      method: 'GET',
      description: 'Legacy typed ROH item lookup.',
    },
    {
      path: '/api/search',
      method: 'GET',
      description: 'Archive cache search (grouped works + pagination).',
      query: {
        q: 'string (optional)',
        creator: 'string (optional)',
        date: 'string (optional)',
        language: 'string (optional)',
        page: 'number (optional, default: 1)',
        rows: 'number (optional, default: 50)',
      },
    },
    {
      path: '/api/metadata',
      method: 'GET',
      description: 'Fetch enriched metadata by Archive.org identifier.',
      query: {
        id: 'string (required)',
      },
    },
    {
      path: '/api/images',
      method: 'GET',
      description: 'Return optimized image and thumbnail URLs.',
      query: {
        id: 'string (required)',
      },
    },
    {
      path: '/api/archive-files',
      method: 'GET',
      description: 'Return file list for an Archive.org identifier.',
      query: {
        id: 'string (required)',
      },
    },
    {
      path: '/api/enhance',
      method: 'GET',
      description: 'Enhance opera metadata with external data sources.',
      query: {
        id: 'string (required)',
        type: 'all|recording|sheet-music|musical-data (optional, default: all)',
      },
    },
    {
      path: '/api/external/imslp',
      method: 'GET',
      description: 'IMSLP proxy search endpoint.',
      query: {
        q: 'string (required)',
        start: 'number (optional, default: 0)',
        limit: 'number (optional, default: 50)',
        sortBy: 'string (optional, default: id)',
      },
    },
  ],
};

export async function GET() {
  return NextResponse.json(docs);
}
