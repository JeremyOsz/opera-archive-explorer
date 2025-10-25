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
