/**
 * Musical Metadata Aggregator
 * ===========================
 * Central file that combines all musical metadata from separate composer files
 */

import { PUCCINI_METADATA } from './puccini-metadata';
import { VERDI_METADATA } from './verdi-metadata';
import { WAGNER_METADATA } from './wagner-metadata';

// Define the interface locally to avoid circular imports
interface WorkMusicalMetadata {
  identifier: string;
  metadataComplete: boolean;
  overallKey: string;
  overallTempo: number;
  genre: string[];
  instrumentation: string[];
  mood: string[];
  duration: string;
  acts: Array<{
    actNumber: number;
    title: string;
    key: string;
    tempo: number;
    timeSignature: string;
    duration: string;
    tempoMarking: string;
    description?: string;
    sections: Array<{
      title: string;
      sectionNumber: number;
      sectionType: 'overture' | 'scene' | 'aria' | 'duet' | 'trio' | 'quartet' | 'chorus' | 'recitative' | 'interlude' | 'finale' | 'ensemble';
      musicalFunction: 'exposition' | 'development' | 'climax' | 'resolution' | 'transition' | 'character_introduction' | 'plot_progression' | 'dramatic_peak' | 'conclusion';
      complexity: 'simple' | 'moderate' | 'complex';
      key: string;
      tempo: number;
      timeSignature: string;
      duration: string;
      tempoMarking: string;
      description?: string;
      musicalElements: {
        mood: string[];
        instrumentation: string[];
        dynamics: string;
      };
    }>;
  }>;
  musicalAnalysis: {
    keySignature: string;
    timeSignature: string;
    harmonicComplexity: 'simple' | 'moderate' | 'complex';
    melodicStyle: 'lyrical' | 'dramatic' | 'decorative' | 'rhapsodic';
  };
  notes?: string;
}

/**
 * Combined musical metadata from all composers
 */
export const ALL_MUSICAL_METADATA: Record<string, WorkMusicalMetadata> = {
  ...PUCCINI_METADATA,
  ...VERDI_METADATA,
  ...WAGNER_METADATA
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
