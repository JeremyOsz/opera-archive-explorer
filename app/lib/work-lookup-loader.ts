import { WorkLookupTable, WorkLookupEntry } from './work-lookup-generator';
import workLookupData from '@/app/data/work-lookup.json';

/**
 * Load the work lookup table
 */
let cachedLookup: WorkLookupTable | null = null;

export function loadWorkLookup(): WorkLookupTable {
  if (cachedLookup) {
    return cachedLookup;
  }

  // Convert the JSON data to our type
  cachedLookup = workLookupData as WorkLookupTable;
  return cachedLookup;
}

/**
 * Get all works from the lookup table
 */
export function getAllWorks(): WorkLookupEntry[] {
  const lookup = loadWorkLookup();
  return Object.values(lookup.works);
}

/**
 * Get a specific work by normalized title
 */
export function getWorkByTitle(normalizedTitle: string): WorkLookupEntry | undefined {
  const lookup = loadWorkLookup();
  return lookup.works[normalizedTitle.toLowerCase()];
}

/**
 * Search works in the lookup table
 * Optimized to search the lookup map directly for better performance
 */
export function searchWorks(query: string): WorkLookupEntry[] {
  const lookup = loadWorkLookup();
  
  if (!query.trim()) {
    return Object.values(lookup.works);
  }
  
  const searchTerm = query.toLowerCase();
  const results: WorkLookupEntry[] = [];
  
  // Iterate through values once and collect matches
  for (const work of Object.values(lookup.works)) {
    if (
      work.workTitle.toLowerCase().includes(searchTerm) ||
      work.composer.toLowerCase().includes(searchTerm)
    ) {
      results.push(work);
    }
  }
  
  return results;
}

/**
 * Get statistics about the lookup table
 */
export function getLookupStats() {
  const lookup = loadWorkLookup();
  
  return {
    totalWorks: lookup.totalWorks,
    totalRecordings: lookup.totalRecordings,
    generatedAt: lookup.generatedAt,
    version: lookup.version
  };
}
