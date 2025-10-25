import { NextRequest, NextResponse } from 'next/server';
import { loadArchiveCache, searchCachedWorks } from '@/app/lib/cache-loader';
import { groupRecordingsByWork } from '@/app/lib/work-grouper';
import { SearchFilters } from '@/app/types/opera';

// Server-side caching with Next.js cache
import { unstable_cache } from 'next/cache';

// Create a cached search function
const getCachedSearchResults = unstable_cache(
  async (query: string, creator: string, date: string, language: string, page: number, rows: number) => {
    console.log('🔍 Server-side search:', { query, creator, date, language, page, rows });
    
    // Use cached data for fast server-side search
    const cache = loadArchiveCache();
    if (!cache) {
      throw new Error('Cache not available');
    }

    // Perform search using cached data
    const cachedResults = searchCachedWorks(query, {
      creator: creator || undefined,
      date: date || undefined,
      language: language || undefined
    });
    
    // Apply pagination
    const start = (page - 1) * rows;
    const end = start + rows;
    const paginatedResults = cachedResults.slice(start, end);
    
    // Convert to OperaRecording format (server-side processing)
    const convertedResults = paginatedResults.map((work) => ({
      ...work,
      // Use cached image URLs, will be optimized by client
      imageUrl: work.imageUrl || `https://archive.org/services/img/${work.identifier}`,
      thumbnailUrl: work.thumbnailUrl || `https://archive.org/services/img/${work.identifier}`,
      mediatype: 'audio',
      publicdate: work.date || '',
      addeddate: work.date || '',
      collection: [],
      format: [],
      files: [],
      metadata: {}
    }));

    // Group recordings by work (server-side)
    const groupedWorks = groupRecordingsByWork(convertedResults);

    return {
      works: groupedWorks,
      pagination: {
        total: cachedResults.length,
        page,
        rows,
        totalPages: Math.ceil(cachedResults.length / rows)
      }
    };
  },
  ['search-results'],
  {
    revalidate: 300, // 5 minutes
    tags: ['search']
  }
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const creator = searchParams.get('creator') || '';
    const date = searchParams.get('date') || '';
    const language = searchParams.get('language') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const rows = parseInt(searchParams.get('rows') || '50');

    // Use Next.js caching for server-side performance
    const result = await getCachedSearchResults(query, creator, date, language, page, rows);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
