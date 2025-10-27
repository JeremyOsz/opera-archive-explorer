/**
 * Musical Metadata Aggregator
 * ===========================
 * Central file that combines all musical metadata from separate composer files
 */

import { PUCCINI_METADATA } from './puccini-metadata';
import { VERDI_METADATA } from './verdi-metadata';
import { WAGNER_METADATA } from './wagner-metadata';
import { MOZART_METADATA } from './mozart-metadata';
import { BACH_METADATA } from './bach-metadata';
import { ROSSINI_METADATA } from './rossini-metadata';
import { BEETHOVEN_METADATA } from './beethoven-metadata';
import { BRAHMS_METADATA } from './brahms-metadata';
import { STRAUSS_METADATA } from './strauss-metadata';
import { FRENCH_METADATA } from './french-metadata';
import { RUSSIAN_METADATA } from './russian-metadata';
import { WorkMusicalMetadata } from './types';

/**
 * Combined musical metadata from all composers
 */
export const ALL_MUSICAL_METADATA: Record<string, WorkMusicalMetadata> = {
  ...PUCCINI_METADATA,
  ...VERDI_METADATA,
  ...WAGNER_METADATA,
  ...MOZART_METADATA,
  ...BACH_METADATA,
  ...ROSSINI_METADATA,
  ...BEETHOVEN_METADATA,
  ...BRAHMS_METADATA,
  ...STRAUSS_METADATA,
  ...FRENCH_METADATA,
  ...RUSSIAN_METADATA
};

/**
 * Get musical metadata for a work by identifier
 */
export function getWorkMusicalMetadata(identifier: string): WorkMusicalMetadata | null {
  return ALL_MUSICAL_METADATA[identifier] || null;
}

/**
 * Work-based metadata mapping
 * Maps normalized work titles to their musical metadata
 */
const WORK_METADATA_MAPPING: Record<string, string> = {
  // Madama Butterfly - all recordings map to the same metadata
  'madama butterfly': 'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1',
  'madama butterfly, sc 74': 'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1',
  'highlights from madama butterfly': 'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1',
  'Madama Butterfly': 'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1',
  
  // Manon Lescaut - all recordings map to the same metadata
  'manon lescaut': 'lp_manon-lescaut_giacomo-puccini_4',
  'Manon Lescaut': 'lp_manon-lescaut_giacomo-puccini_4',
  
  // La Bohème - all recordings map to the same metadata
  'la bohème': 'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
  'la boheme': 'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
  'La Bohème': 'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
  'La Boheme': 'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
  
  // Rigoletto - all recordings map to the same metadata
  'rigoletto': 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
  'Rigoletto': 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
  'rigoletto (giuseppe verdi)': 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
  'Rigoletto (Giuseppe Verdi)': 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
  
  // La Traviata - all recordings map to the same metadata
  'la traviata': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  'La Traviata': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  'verdi, la traviata': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  'Verdi, La Traviata': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  'la traviata highlights': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  'la traviata highlights, sung in german': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  'latraviata (complete opera)': 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
  
  // Requiem (Verdi) - all recordings map to the same metadata
  'requiem': 'lp_requiem_giuseppe-verdi-igor-markevitch-moscow-p',
  'Requiem': 'lp_requiem_giuseppe-verdi-igor-markevitch-moscow-p',
  
  // Otello - all recordings map to the same metadata
  'otello': 'lp_otello_giuseppe-verdi-carlo-maria-guichandut-c',
  'Otello': 'lp_otello_giuseppe-verdi-carlo-maria-guichandut-c',
  
  // Parsifal - all recordings map to the same metadata
  'parsifal': 'lp_parsifal_richard-wagner-hans-knappertsbusch-chor-de',
  'Parsifal': 'lp_parsifal_richard-wagner-hans-knappertsbusch-chor-de',
  
  // Tristan und Isolde - all recordings map to the same metadata
  'tristan und isolde': 'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto',
  'Tristan und Isolde': 'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto',
  'tristan and isolde': 'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto',
  'Tristan and Isolde': 'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto',
  
  // Add more work mappings as needed...
};

/**
 * Get musical metadata for a work by title
 * This allows multiple recordings of the same work to share metadata
 */
export function getWorkMusicalMetadataByTitle(title: string): WorkMusicalMetadata | null {
  const normalizedTitle = title.toLowerCase().trim();
  
  // First try exact match
  if (WORK_METADATA_MAPPING[normalizedTitle]) {
    const mappedIdentifier = WORK_METADATA_MAPPING[normalizedTitle];
    return ALL_MUSICAL_METADATA[mappedIdentifier] || null;
  }
  
  // Try partial matches for common variations
  for (const [workTitle, identifier] of Object.entries(WORK_METADATA_MAPPING)) {
    if (normalizedTitle.includes(workTitle) || workTitle.includes(normalizedTitle)) {
      return ALL_MUSICAL_METADATA[identifier] || null;
    }
  }
  
  return null;
}

/**
 * Check if work has complete metadata
 */
export function hasCompleteMetadata(identifier: string): boolean {
  const metadata = ALL_MUSICAL_METADATA[identifier];
  return metadata?.metadataComplete || false;
}

/**
 * Get all completed works
 */
export function getCompletedWorks(): string[] {
  return Object.values(ALL_MUSICAL_METADATA)
    .filter(m => m.metadataComplete)
    .map(m => m.identifier);
}

/**
 * Get completion statistics
 */
export function getCompletionStats() {
  const total = Object.keys(ALL_MUSICAL_METADATA).length;
  const completed = Object.values(ALL_MUSICAL_METADATA).filter(m => m.metadataComplete).length;
  
  return {
    total,
    completed,
    pending: total - completed,
    percentage: ((completed / total) * 100).toFixed(1)
  };
}

/**
 * Get metadata by composer
 */
export function getMetadataByComposer(composer: string): Record<string, WorkMusicalMetadata> {
  return Object.fromEntries(
    Object.entries(ALL_MUSICAL_METADATA).filter(([_, metadata]) => 
      metadata.notes?.toLowerCase().includes(composer.toLowerCase()) ||
      metadata.genre.some(g => g.toLowerCase().includes(composer.toLowerCase()))
    )
  );
}
