import { OperaRecording } from '@/app/types/opera';
import archiveCache from '@/app/data/archive-cache.json';

interface LightweightOpera {
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

/**
 * Load cached archive data from bundled JSON file
 */
export function loadArchiveCache(): ArchiveCache | null {
  try {
    if (!archiveCache || !archiveCache.works || archiveCache.works.length === 0) {
      console.log('📁 No cache data available');
      return null;
    }

    console.log(`📁 Loaded cache with ${archiveCache.works.length} works`);
    console.log(`📅 Cache generated: ${archiveCache.metadata.generatedAt}`);
    
    return archiveCache as ArchiveCache;
  } catch (error) {
    console.error('❌ Error loading cache:', error);
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

  let results = cache.works;

  // Apply text search
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(work => 
      work.title.toLowerCase().includes(searchTerm) ||
      work.creator?.toLowerCase().includes(searchTerm)
    );
  }

  // Apply filters
  if (filters?.creator) {
    results = results.filter(work => 
      work.creator?.toLowerCase().includes(filters.creator!.toLowerCase())
    );
  }

  if (filters?.date) {
    results = results.filter(work => 
      work.date?.includes(filters.date!)
    );
  }

  if (filters?.language) {
    results = results.filter(work => 
      work.language?.toLowerCase().includes(filters.language!.toLowerCase())
    );
  }

  return results;
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
