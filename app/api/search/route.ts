import { NextRequest, NextResponse } from 'next/server';
import { ArchiveAPI } from '@/app/lib/archive-api';
import { groupRecordingsByWork } from '@/app/lib/work-grouper';
import { SearchFilters } from '@/app/types/opera';

// Cache for search results (in-memory, simple implementation)
const searchCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const creator = searchParams.get('creator') || '';
    const date = searchParams.get('date') || '';
    const language = searchParams.get('language') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const rows = parseInt(searchParams.get('rows') || '50');

    // Create cache key
    const cacheKey = JSON.stringify({ query, creator, date, language, page, rows });
    
    // Check cache first
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('📁 Using cached search results');
      return NextResponse.json(cached.data);
    }

    // Build search filters
    const filters: SearchFilters = {
      query,
      creator: creator || undefined,
      date: date || undefined,
      language: language || undefined
    };

    // Perform search
    const response = await ArchiveAPI.searchOperas(filters, page, rows);
    
    // Group recordings by work
    const groupedWorks = groupRecordingsByWork(response.docs);

    const result = {
      works: groupedWorks,
      pagination: {
        total: response.numFound,
        page,
        rows,
        totalPages: Math.ceil(response.numFound / rows)
      }
    };

    // Cache the result
    searchCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
