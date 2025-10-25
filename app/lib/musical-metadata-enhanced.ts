import { loadArchiveCache } from './cache-loader';

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
import { getWorkMusicalMetadata, getWorkMusicalMetadataByTitle } from './metadata';
import { WorkMusicalMetadata } from './metadata/types';

/**
 * Enhanced Musical Metadata Library
 * 
 * This version uses actual work-specific metadata when available,
 * falling back to generated metadata for works not yet mapped.
 */

export interface MusicalWork extends LightweightOpera {
  musicalMetadata: {
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
        sectionType: 'overture' | 'scene' | 'aria' | 'duet' | 'trio' | 'quartet' | 'chorus' | 'recitative' | 'interlude' | 'finale' | 'ensemble' | 'opera' | 'melodrama' | 'theater piece' | 'romances' | 'vocal' | 'orchestral' | 'march' | 'symphony' | 'requiem' | 'lieder' | 'waltz';
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
    isMapped: boolean; // True if from work-specific metadata, false if generated
    source?: string; // 'mapped' or 'generated'
  };
}

export interface MovementDetail {
  title: string;
  movementNumber: number;
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
}

export class EnhancedMusicalMetadataLibrary {
  /**
   * Get enhanced musical metadata for a work by identifier
   * Uses actual metadata if available, otherwise generates it
   */
  static getMusicalMetadata(identifier: string): MusicalWork | null {
    const cache = loadArchiveCache();
    if (!cache) return null;

    const work = cache.works.find(w => w.identifier === identifier);
    if (!work) return null;

    // First try to get metadata by specific identifier
    let mappedMetadata = getWorkMusicalMetadata(identifier);
    
    // If not found by identifier, try to get metadata by work title
    if (!mappedMetadata || !mappedMetadata.metadataComplete) {
      mappedMetadata = getWorkMusicalMetadataByTitle(work.title);
    }
    
    if (mappedMetadata && mappedMetadata.metadataComplete) {
      // Use the actual mapped metadata
      return this.useMappedMetadata(work, mappedMetadata);
    }

    // Fall back to generated metadata
    return this.generateMetadata(work);
  }

  /**
   * Use actual mapped metadata for a work
   */
  private static useMappedMetadata(work: LightweightOpera, mapped: WorkMusicalMetadata): MusicalWork {
    return {
      ...work,
      musicalMetadata: {
        overallKey: mapped.overallKey,
        overallTempo: mapped.overallTempo,
        genre: mapped.genre,
        instrumentation: mapped.instrumentation,
        mood: mapped.mood,
        duration: mapped.duration,
        acts: mapped.acts,
        musicalAnalysis: mapped.musicalAnalysis,
        isMapped: true,
        source: 'mapped'
      }
    };
  }

  /**
   * Generate metadata for a work (fallback)
   */
  private static generateMetadata(work: LightweightOpera): MusicalWork {
    // This would use the original generation logic
    // For now, return minimal structure
    return {
      ...work,
      musicalMetadata: {
        overallKey: 'C Major',
        overallTempo: 100,
        genre: ['Classical'],
        instrumentation: ['Orchestra'],
        mood: ['Dramatic'],
        duration: '0:00:00',
        acts: [],
        musicalAnalysis: {
          keySignature: 'C Major',
          timeSignature: '4/4',
          harmonicComplexity: 'simple',
          melodicStyle: 'lyrical'
        },
        isMapped: false,
        source: 'generated'
      }
    };
  }

  /**
   * Check if a work has actual mapped metadata
   */
  static hasMappedMetadata(identifier: string): boolean {
    const mapped = getWorkMusicalMetadata(identifier);
    return mapped?.metadataComplete || false;
  }

  /**
   * Get all works with mapped metadata
   */
  static getMappedWorks(): string[] {
    const cache = loadArchiveCache();
    if (!cache) return [];

    return cache.works
      .filter(w => this.hasMappedMetadata(w.identifier))
      .map(w => w.identifier);
  }
}
