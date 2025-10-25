import { loadArchiveCache, LightweightOpera } from './cache-loader';
import { GroupedWork } from './work-grouper';

export interface WorkLookupTable {
  version: string;
  generatedAt: string;
  totalWorks: number;
  totalRecordings: number;
  works: Record<string, WorkLookupEntry>;
}

export interface WorkLookupEntry {
  workTitle: string;
  composer: string;
  recordingIdentifiers: string[];
  totalRecordings: number;
  years: string[];
  languages: string[];
  mostRecentIdentifier?: string;
}

/**
 * Generate a lookup table from the cache
 */
export function generateWorkLookupTable(): WorkLookupTable {
  const cache = loadArchiveCache();
  
  if (!cache) {
    throw new Error('No cache available');
  }

  const works = groupRecordingsInCache(cache.works);
  const totalRecordings = cache.works.length;

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalWorks: Object.keys(works).length,
    totalRecordings,
    works
  };
}

/**
 * Group recordings by work from the cache
 */
function groupRecordingsInCache(recordings: LightweightOpera[]): Record<string, WorkLookupEntry> {
  const groups = new Map<string, {
    workTitle: string;
    composer: string;
    recordingIdentifiers: string[];
    years: string[];
    languages: string[];
    mostRecentIdentifier?: string;
  }>();

  for (const recording of recordings) {
    const normalizedTitle = normalizeWorkTitle(recording.title);
    
    if (!groups.has(normalizedTitle)) {
      groups.set(normalizedTitle, {
        workTitle: normalizedTitle,
        composer: recording.creator || 'Unknown',
        recordingIdentifiers: [],
        years: [],
        languages: [],
        mostRecentIdentifier: undefined
      });
    }

    const group = groups.get(normalizedTitle)!;
    group.recordingIdentifiers.push(recording.identifier);

    // Collect years
    if (recording.date) {
      const year = extractYear(recording.date);
      if (year && !group.years.includes(year)) {
        group.years.push(year);
        group.years.sort().reverse();
      }
    }

    // Collect languages
    if (recording.language) {
      const langs = recording.language.split(',').map((l: string) => l.trim());
      langs.forEach((lang: string) => {
        if (!group.languages.includes(lang)) {
          group.languages.push(lang);
        }
      });
    }

    // Track most recent
    if (!group.mostRecentIdentifier || 
        isMoreRecent(recording, group.mostRecentIdentifier, recordings)) {
      group.mostRecentIdentifier = recording.identifier;
    }
  }

  // Convert to the lookup entry format
  const result: Record<string, WorkLookupEntry> = {};
  
  for (const [normalizedTitle, group] of groups.entries()) {
    result[normalizedTitle] = {
      workTitle: normalizedTitle,
      composer: group.composer,
      recordingIdentifiers: group.recordingIdentifiers,
      totalRecordings: group.recordingIdentifiers.length,
      years: group.years,
      languages: group.languages,
      mostRecentIdentifier: group.mostRecentIdentifier
    };
  }

  return result;
}

/**
 * Normalize work title for grouping
 */
function normalizeWorkTitle(title: string): string {
  let normalized = title
    .toLowerCase()
    // Remove common prefixes
    .replace(/^(highlights from|excerpts from|excerpts of|selections from|music from)\s+/i, '')
    // Remove volume indicators
    .replace(/\s*\(?(volume|vol\.?)\s*\d+\)?/gi, '')
    // Remove recording year ranges (e.g., "(1959)", "(1958-1960)")
    .replace(/\s*\(\d{4}[-\d]*\)/g, '')
    // Remove performer-specific suffixes (e.g., ": Renata Tebaldi As Mimi")
    .replace(/\s*:\s*.+$/i, '')
    // Remove "complete", "full recording", etc
    .replace(/\s*\(?\s*(complete|full recording|excerpts)\)?/gi, '')
    // Remove year-based suffixes (e.g., " - 1938 Recording")
    .replace(/\s*[-–—]\s*\d{4}.*$/i, '')
    // Remove standalone year patterns
    .replace(/\s+\(\d{4}\)$/, '')
    // Trim
    .trim();

  // Additional cleanup: remove trailing modifiers
  // This catches cases like "La Bohème: Something" -> "La Bohème"
  normalized = normalized.split(/[:\-–—]/)[0].trim();
  
  return normalized;
}

/**
 * Extract year from date string
 */
function extractYear(date: string): string | null {
  const match = date.match(/\d{4}/);
  return match ? match[0] : null;
}

/**
 * Check if recording is more recent than another
 */
function isMoreRecent(
  recording: LightweightOpera, 
  otherIdentifier: string,
  allRecordings: LightweightOpera[]
): boolean {
  const other = allRecordings.find(r => r.identifier === otherIdentifier);
  if (!other) return true;

  const yearA = extractYear(recording.date || '');
  const yearB = extractYear(other.date || '');
  
  if (!yearA) return false;
  if (!yearB) return true;
  
  return parseInt(yearA) > parseInt(yearB);
}

/**
 * Search the lookup table
 */
export function searchWorkLookup(
  lookup: WorkLookupTable,
  query: string
): WorkLookupEntry[] {
  if (!query.trim()) {
    return Object.values(lookup.works);
  }
  
  const searchTerm = query.toLowerCase();
  
  return Object.values(lookup.works).filter(work => {
    return (
      work.workTitle.toLowerCase().includes(searchTerm) ||
      work.composer.toLowerCase().includes(searchTerm) ||
      work.recordingIdentifiers.some(id => id.toLowerCase().includes(searchTerm))
    );
  });
}

/**
 * Get all recordings for a specific work
 */
export function getRecordingsForWork(
  lookup: WorkLookupTable,
  normalizedWorkTitle: string
): string[] {
  const work = lookup.works[normalizedWorkTitle.toLowerCase()];
  return work ? work.recordingIdentifiers : [];
}
