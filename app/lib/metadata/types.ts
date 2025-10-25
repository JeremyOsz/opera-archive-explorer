/**
 * Shared Types for Musical Metadata
 * ================================
 * Common interfaces used across all metadata files
 */

export interface NotablePerformance {
  year: number;
  conductor?: string;
  orchestra?: string;
  venue?: string;
  singers?: Array<{
    name: string;
    role: string;
  }>;
  significance: string;
  historicalContext?: string;
  recordingLabel?: string;
  notes?: string;
}

export interface WorkMusicalMetadata {
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
      sectionType: 'overture' | 'scene' | 'aria' | 'duet' | 'trio' | 'quartet' | 'chorus' | 'recitative' | 'interlude' | 'finale' | 'ensemble' | 'melodrama' | 'theater piece' | 'romances' | 'symphony' | 'requiem' | 'lieder' | 'waltz' | 'vocal' | 'opera' | 'march';
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
  notablePerformances?: NotablePerformance[];
  notes?: string;
}
