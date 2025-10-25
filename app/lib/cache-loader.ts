import { OperaRecording } from '@/app/types/opera';
import archiveCache from '@/app/data/archive-cache.json';

export interface LightweightOpera {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  language?: string;
  subject?: string[];
  imageUrl?: string;
  thumbnailUrl?: string;
}

interface ArchiveCache {
  metadata: {
    generatedAt: string;
    totalWorks: number;
    lastUpdated: string;
    version: string;
  };
  works: LightweightOpera[];
}

// Memoized cache instance to avoid repeated processing
let memoizedCache: ArchiveCache | null = null;
let cacheLoaded = false;

/**
 * Load cached archive data from bundled JSON file
 * Memoized to avoid repeated processing for better performance
 */
export function loadArchiveCache(): ArchiveCache | null {
  // Return memoized cache if already loaded
  if (cacheLoaded && memoizedCache) {
    return memoizedCache;
  }

  try {
    if (!archiveCache || !archiveCache.works || archiveCache.works.length === 0) {
      console.log('📁 No cache data available');
      cacheLoaded = true;
      return null;
    }

    memoizedCache = archiveCache as ArchiveCache;
    cacheLoaded = true;
    
    console.log(`📁 Loaded cache with ${memoizedCache.works.length} works`);
    console.log(`📅 Cache generated: ${memoizedCache.metadata.generatedAt}`);
    
    return memoizedCache;
  } catch (error) {
    console.error('❌ Error loading cache:', error);
    cacheLoaded = true;
    return null;
  }
}

/**
 * Get cache metadata
 */
export function getCacheMetadata(): { exists: boolean; metadata?: any } {
  try {
    if (!archiveCache || !archiveCache.works || archiveCache.works.length === 0) {
      return { exists: false };
    }

    return {
      exists: true,
      metadata: archiveCache.metadata
    };
  } catch (error) {
    console.error('❌ Error reading cache metadata:', error);
    return { exists: false };
  }
}

/**
 * Search cached works for autocomplete
 * Optimized to use a single filter pass for better performance
 */
export function searchCachedWorks(query: string, filters?: {
  creator?: string;
  date?: string;
  language?: string;
}): LightweightOpera[] {
  const cache = loadArchiveCache();
  if (!cache) {
    return [];
  }

  // Prepare filter values once
  const queryTerm = query?.toLowerCase();
  const creatorFilter = filters?.creator?.toLowerCase();
  const dateFilter = filters?.date;
  const languageFilter = filters?.language?.toLowerCase();

  // Single pass filtering for better performance
  return cache.works.filter(work => {
    // Apply text search
    if (queryTerm) {
      const matchesQuery = 
        work.title.toLowerCase().includes(queryTerm) ||
        work.creator?.toLowerCase().includes(queryTerm);
      if (!matchesQuery) return false;
    }

    // Apply creator filter
    if (creatorFilter) {
      if (!work.creator?.toLowerCase().includes(creatorFilter)) return false;
    }

    // Apply date filter
    if (dateFilter) {
      if (!work.date?.includes(dateFilter)) return false;
    }

    // Apply language filter
    if (languageFilter) {
      if (!work.language?.toLowerCase().includes(languageFilter)) return false;
    }

    return true;
  });
}

/**
 * Get a specific work by identifier from cache
 */
export function getCachedWorkById(identifier: string): LightweightOpera | null {
  const cache = loadArchiveCache();
  if (!cache) {
    return null;
  }

  return cache.works.find(work => work.identifier === identifier) || null;
}
