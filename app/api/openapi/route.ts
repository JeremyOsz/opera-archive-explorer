import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const errorSchema = {
  type: 'object',
  properties: {
    error: {
      oneOf: [{ type: 'string' }, { type: 'object' }],
    },
  },
};

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;

  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'Opera Archive Explorer API',
      version: '1.0.0',
      description: 'API for searching and retrieving opera archive and ROH data.',
    },
    servers: [{ url: origin }],
    tags: [
      { name: 'Docs' },
      { name: 'ROH v1' },
      { name: 'ROH Legacy' },
      { name: 'Archive' },
      { name: 'External' },
    ],
    paths: {
      '/api/docs': {
        get: {
          tags: ['Docs'],
          summary: 'Get JSON docs index',
          responses: {
            '200': {
              description: 'Docs index',
              content: { 'application/json': { schema: { type: 'object' } } },
            },
          },
        },
      },
      '/api/v1/search': {
        get: {
          tags: ['ROH v1'],
          summary: 'Search ROH corpus',
          parameters: [
            { name: 'q', in: 'query', schema: { type: 'string' } },
            { name: 'query', in: 'query', schema: { type: 'string' } },
            {
              name: 'type',
              in: 'query',
              schema: {
                type: 'string',
                enum: ['record', 'work', 'production', 'performance', 'asset', 'rbo_web', 'rbo_stream', 'all'],
              },
            },
            { name: 'source', in: 'query', schema: { type: 'string' } },
            { name: 'collection', in: 'query', schema: { type: 'string' } },
            { name: 'genre', in: 'query', schema: { type: 'string' } },
            { name: 'creator', in: 'query', schema: { type: 'string' } },
            { name: 'company', in: 'query', schema: { type: 'string' } },
            { name: 'dateFrom', in: 'query', schema: { type: 'string' } },
            { name: 'dateTo', in: 'query', schema: { type: 'string' } },
            { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'per_page', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'offset', in: 'query', schema: { type: 'integer', minimum: 0 } },
          ],
          responses: {
            '200': {
              description: 'Search results',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      items: { type: 'array', items: { type: 'object' } },
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      perPage: { type: 'integer' },
                      facets: { type: 'object' },
                    },
                  },
                },
              },
            },
            '503': { description: 'Search corpus unavailable', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/v1/items/{id}': {
        get: {
          tags: ['ROH v1'],
          summary: 'Get ROH item by typed id',
          description: "Use path form `{type}:{id}` or pass `?type=` as query.",
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
            {
              name: 'type',
              in: 'query',
              schema: {
                type: 'string',
                enum: ['record', 'work', 'production', 'performance', 'asset', 'rbo_web', 'rbo_stream'],
              },
            },
          ],
          responses: {
            '200': { description: 'Item payload', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Invalid type', content: { 'application/json': { schema: errorSchema } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: errorSchema } } },
            '503': { description: 'Search corpus unavailable', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/v1/sources': {
        get: {
          tags: ['ROH v1'],
          summary: 'List ROH sources',
          responses: {
            '200': {
              description: 'Source list',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      sources: { type: 'array', items: { type: 'object' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/roh/search': {
        get: {
          tags: ['ROH Legacy'],
          summary: 'Legacy ROH search',
          responses: {
            '200': { description: 'Search results', content: { 'application/json': { schema: { type: 'object' } } } },
            '503': { description: 'Search corpus unavailable', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/roh/item/{type}/{id}': {
        get: {
          tags: ['ROH Legacy'],
          summary: 'Legacy ROH item lookup',
          parameters: [
            { name: 'type', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            '200': { description: 'Item payload', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Invalid type', content: { 'application/json': { schema: errorSchema } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: errorSchema } } },
            '503': { description: 'Search corpus unavailable', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/search': {
        get: {
          tags: ['Archive'],
          summary: 'Search archive cache',
          parameters: [
            { name: 'q', in: 'query', schema: { type: 'string' } },
            { name: 'creator', in: 'query', schema: { type: 'string' } },
            { name: 'date', in: 'query', schema: { type: 'string' } },
            { name: 'language', in: 'query', schema: { type: 'string' } },
            { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'rows', in: 'query', schema: { type: 'integer', minimum: 1 } },
          ],
          responses: {
            '200': { description: 'Grouped results with pagination', content: { 'application/json': { schema: { type: 'object' } } } },
            '500': { description: 'Search failed', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/metadata': {
        get: {
          tags: ['Archive'],
          summary: 'Get enriched metadata by identifier',
          parameters: [{ name: 'id', in: 'query', required: true, schema: { type: 'string' } }],
          responses: {
            '200': { description: 'Opera metadata', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Missing id', content: { 'application/json': { schema: errorSchema } } },
            '404': { description: 'Not found', content: { 'application/json': { schema: errorSchema } } },
            '500': { description: 'Metadata failure', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/images': {
        get: {
          tags: ['Archive'],
          summary: 'Get optimized image URLs by identifier',
          parameters: [{ name: 'id', in: 'query', required: true, schema: { type: 'string' } }],
          responses: {
            '200': { description: 'Image URLs', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Missing id', content: { 'application/json': { schema: errorSchema } } },
            '500': { description: 'Image lookup failure', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/archive-files': {
        get: {
          tags: ['Archive'],
          summary: 'Get Archive.org files by identifier',
          parameters: [{ name: 'id', in: 'query', required: true, schema: { type: 'string' } }],
          responses: {
            '200': { description: 'Files list', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Missing id', content: { 'application/json': { schema: errorSchema } } },
            '500': { description: 'Files lookup failure', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/enhance': {
        get: {
          tags: ['Archive'],
          summary: 'Enhance opera metadata',
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' } },
            {
              name: 'type',
              in: 'query',
              schema: { type: 'string', enum: ['all', 'recording', 'sheet-music', 'musical-data'], default: 'all' },
            },
          ],
          responses: {
            '200': { description: 'Enhanced opera payload', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Missing id', content: { 'application/json': { schema: errorSchema } } },
            '500': { description: 'Enhancement failure', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
      '/api/external/imslp': {
        get: {
          tags: ['External'],
          summary: 'Proxy IMSLP search',
          parameters: [
            { name: 'q', in: 'query', required: true, schema: { type: 'string' } },
            { name: 'start', in: 'query', schema: { type: 'integer', minimum: 0, default: 0 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, default: 50 } },
            { name: 'sortBy', in: 'query', schema: { type: 'string', default: 'id' } },
          ],
          responses: {
            '200': { description: 'IMSLP results', content: { 'application/json': { schema: { type: 'object' } } } },
            '400': { description: 'Missing query', content: { 'application/json': { schema: errorSchema } } },
            '500': { description: 'IMSLP request failed', content: { 'application/json': { schema: errorSchema } } },
          },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
