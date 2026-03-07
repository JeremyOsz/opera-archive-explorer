import { Era, RarityBand, RecordingType } from './discovery-types';
import { inferOperaEra } from './era-utils';

export interface DiscoveryCompatibleWork {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  language?: string;
  subject?: string[];
  year?: number;
  era?: Era;
  primaryComposer?: string;
  languages?: string[];
  subjectsNormalized?: string[];
  recordingType?: RecordingType;
  rarityBand?: RarityBand;
  discoveryScore?: number;
  composerWorkCount?: number;
}

const PERFORMER_HINTS = [
  'orchestra',
  'baritone',
  'soprano',
  'tenor',
  'conductor',
  'company',
  'choir',
  'band',
  'ensemble',
  'philharmonic'
];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function extractYear(date?: string): number | undefined {
  if (!date) return undefined;
  const match = date.match(/\b(1[89]\d{2}|20\d{2})\b/);
  if (!match) return undefined;
  const year = parseInt(match[1], 10);
  return Number.isNaN(year) ? undefined : year;
}

export function normalizeLanguages(language?: string): string[] {
  if (!language) return [];
  return Array.from(
    new Set(
      language
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
    )
  );
}

export function normalizeSubjects(subject: string[] | undefined): string[] {
  if (!subject || subject.length === 0) return [];
  return Array.from(
    new Set(
      subject
        .map((entry) => entry.trim())
        .filter(Boolean)
    )
  );
}

export function detectRecordingType(title: string): RecordingType {
  const lowered = title.toLowerCase();
  if (lowered.includes('highlight')) return 'highlights';
  if (lowered.includes('excerpt')) return 'excerpts';
  if (lowered.includes('complete') || lowered.includes('full recording')) return 'complete';
  return 'unknown';
}

export function extractPrimaryComposer(creator?: string): string | undefined {
  if (!creator) return undefined;
  const first = creator.split(',')[0]?.trim();
  if (!first) return undefined;

  const lowered = first.toLowerCase();
  if (PERFORMER_HINTS.some((hint) => lowered.includes(hint))) {
    return undefined;
  }
  return first;
}

function normalizeWorkKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/^(highlights from|excerpts from|excerpts of|selections from|music from)\s+/i, '')
    .replace(/\s*\(?(volume|vol\.?)\s*\d+\)?/gi, '')
    .replace(/\s*\(\d{4}[-\d]*\)/g, '')
    .replace(/\s*:\s*.+$/i, '')
    .replace(/\s*\(?\s*(complete|full recording|excerpts)\)?/gi, '')
    .replace(/\s*[-–—]\s*\d{4}.*$/i, '')
    .replace(/\s+\(\d{4}\)$/, '')
    .trim()
    .split(/[:\-–—]/)[0]
    .trim();
}

function rarityFromCount(count: number): RarityBand {
  if (count <= 1) return 'rare';
  if (count <= 3) return 'uncommon';
  return 'well-known';
}

export function buildDiscoveryMetadata<T extends DiscoveryCompatibleWork>(works: T[]): T[] {
  if (works.length === 0) {
    return works;
  }

  const workCounts = new Map<string, number>();
  const composerCounts = new Map<string, number>();
  const eraCounts = new Map<Era, number>();

  works.forEach((work) => {
    const workKey = normalizeWorkKey(work.title);
    workCounts.set(workKey, (workCounts.get(workKey) || 0) + 1);

    const primaryComposer = extractPrimaryComposer(work.creator);
    if (primaryComposer) {
      composerCounts.set(primaryComposer, (composerCounts.get(primaryComposer) || 0) + 1);
    }

    const era = inferOperaEra({
      composer: extractPrimaryComposer(work.creator),
      title: work.title,
      subjects: work.subject,
      year: extractYear(work.date)
    });
    eraCounts.set(era, (eraCounts.get(era) || 0) + 1);
  });

  const knownEraCounts = Array.from(eraCounts.entries())
    .filter(([era]) => era !== 'unknown')
    .map(([, count]) => count);
  const maxEraCount = knownEraCounts.length > 0 ? Math.max(...knownEraCounts) : 1;
  const maxComposerCount = composerCounts.size > 0 ? Math.max(...composerCounts.values()) : 1;

  return works.map((work) => {
    const year = extractYear(work.date);
    const primaryComposer = extractPrimaryComposer(work.creator);
    const era = inferOperaEra({
      composer: primaryComposer,
      title: work.title,
      subjects: work.subject,
      year
    });
    const languages = normalizeLanguages(work.language);
    const subjectsNormalized = normalizeSubjects(work.subject);
    const recordingType = detectRecordingType(work.title);
    const workKey = normalizeWorkKey(work.title);
    const workCount = workCounts.get(workKey) || 1;
    const rarityBand = rarityFromCount(workCount);
    const composerWorkCount = primaryComposer ? composerCounts.get(primaryComposer) || 0 : 0;

    const rarityNoveltyScore = rarityBand === 'rare' ? 1 : rarityBand === 'uncommon' ? 0.65 : 0.3;
    const metadataRichnessScore = clamp((subjectsNormalized.length + languages.length) / 6, 0, 1);
    const eraDistinctivenessScore =
      era === 'unknown' ? 0.25 : 1 - clamp((eraCounts.get(era) || 0) / maxEraCount, 0, 1);
    const composerSaturationScore =
      primaryComposer && maxComposerCount > 0
        ? 1 - clamp(composerWorkCount / maxComposerCount, 0, 1)
        : 0.6;
    const titleTokenCount = work.title.split(/\s+/).filter(Boolean).length;
    const titleSpecificityScore = clamp(titleTokenCount / 10, 0, 1);

    const weightedScore =
      rarityNoveltyScore * 0.35 +
      metadataRichnessScore * 0.2 +
      eraDistinctivenessScore * 0.2 +
      composerSaturationScore * 0.15 +
      titleSpecificityScore * 0.1;
    const discoveryScore = Math.round(clamp(weightedScore * 100, 0, 100));

    return {
      ...work,
      year,
      era,
      primaryComposer,
      languages,
      subjectsNormalized,
      recordingType,
      rarityBand,
      discoveryScore,
      composerWorkCount
    };
  });
}
