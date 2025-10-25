import { OperaRecording } from '@/app/types/opera';

export interface GroupedWork {
  workTitle: string;
  composer: string;
  recordings: OperaRecording[];
  totalRecordings: number;
  years: string[];
  languages: string[];
  subjects: string[];
  mostRecentRecording?: OperaRecording;
}

/**
 * Group recordings by work (normalized title)
 */
export function groupRecordingsByWork(recordings: OperaRecording[]): GroupedWork[] {
  const groups = new Map<string, GroupedWork>();

  for (const recording of recordings) {
    // Normalize work title for grouping
    const normalizedTitle = normalizeWorkTitle(recording.title);
    
    if (!groups.has(normalizedTitle)) {
      groups.set(normalizedTitle, {
        workTitle: normalizedTitle,
        composer: recording.creator || 'Unknown',
        recordings: [],
        totalRecordings: 0,
        years: [],
        languages: [],
        subjects: [],
        mostRecentRecording: undefined
      });
    }

    const group = groups.get(normalizedTitle)!;
    group.recordings.push(recording);
    group.totalRecordings = group.recordings.length;

    // Collect years
    if (recording.date) {
      const year = extractYear(recording.date);
      if (year && !group.years.includes(year)) {
        group.years.push(year);
        group.years.sort().reverse(); // Most recent first
      }
    }

    // Collect languages
    if (recording.language) {
      const langs = recording.language.split(',').map(l => l.trim());
      langs.forEach(lang => {
        if (!group.languages.includes(lang)) {
          group.languages.push(lang);
        }
      });
    }

    // Collect subjects
    if (recording.subject && Array.isArray(recording.subject)) {
      recording.subject.forEach(subject => {
        if (!group.subjects.includes(subject)) {
          group.subjects.push(subject);
        }
      });
    }

    // Track most recent recording
    if (!group.mostRecentRecording || isMoreRecent(recording, group.mostRecentRecording)) {
      group.mostRecentRecording = recording;
    }
  }

  // Convert to array and sort by total recordings (most popular first)
  return Array.from(groups.values())
    .sort((a, b) => b.totalRecordings - a.totalRecordings);
}

/**
 * Normalize work title for grouping
 * Remove variations like "Highlights From", "Excerpts", recordings, etc.
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
 * Check if recording A is more recent than recording B
 */
function isMoreRecent(a: OperaRecording, b: OperaRecording): boolean {
  const yearA = extractYear(a.date || '');
  const yearB = extractYear(b.date || '');
  
  if (!yearA) return false;
  if (!yearB) return true;
  
  return parseInt(yearA) > parseInt(yearB);
}

/**
 * Get canonical work title (best representation)
 * Use the most recent or most complete recording's title
 */
export function getCanonicalWorkTitle(group: GroupedWork): string {
  if (group.recordings.length === 0) return capitalizeFirst(group.workTitle);
  
  // Find the most complete title (prefer longer titles without "Highlights")
  const sorted = [...group.recordings].sort((a, b) => {
    const aLower = a.title.toLowerCase();
    const bLower = b.title.toLowerCase();
    
    // Prefer titles without "highlights"
    if (aLower.includes('highlight') && !bLower.includes('highlight')) return 1;
    if (!aLower.includes('highlight') && bLower.includes('highlight')) return -1;
    
    // Prefer titles without performer-specific suffixes
    if (aLower.includes(':') && !bLower.includes(':')) return 1;
    if (!aLower.includes(':') && bLower.includes(':')) return -1;
    
    // Prefer longer titles
    return b.title.length - a.title.length;
  });
  
  const bestTitle = sorted[0].title;
  
  // Clean up the best title
  let canonical = bestTitle
    .replace(/\s*\(?\d{4}[-\d]*\)?/g, '') // Remove years
    .replace(/\s*[-–—]\s*\d{4}.*$/i, '') // Remove year suffixes
    .replace(/\s*:\s*.+$/i, '') // Remove colons and everything after
    .replace(/\s*\(?\s*(complete|full recording|excerpts)\)?/gi, '')
    .trim();
  
  return canonical || bestTitle;
}

/**
 * Capitalize first letter of each word
 */
function capitalizeFirst(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Search grouped works
 */
export function searchGroupedWorks(groups: GroupedWork[], query: string): GroupedWork[] {
  if (!query.trim()) return groups;
  
  const searchTerm = query.toLowerCase();
  
  return groups.filter(group => {
    return (
      group.workTitle.toLowerCase().includes(searchTerm) ||
      group.composer.toLowerCase().includes(searchTerm) ||
      group.recordings.some(r => 
        r.title.toLowerCase().includes(searchTerm) ||
        r.creator?.toLowerCase().includes(searchTerm)
      )
    );
  });
}
