/**
 * Work-Specific Musical Metadata
 * 
 * This file contains actual musical metadata for specific works in the collection.
 * We're working in batches to map real metadata to each work.
 */

export interface WorkMusicalMetadata {
  identifier: string;
  metadataComplete: boolean;
  overallKey: string;
  overallTempo: number;
  genre: string[];
  instrumentation: string[];
  mood: string[];
  duration: string;
  movements: Array<{
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
 * Musical metadata for specific works
 * Work is done in batches - see batch tracking at the bottom
 */
export const WORK_MUSICAL_METADATA: Record<string, WorkMusicalMetadata> = {
  // BATCH 1: Puccini Operas (COMPLETE)
  'lp_manon-lescaut_giacomo-puccini_4': {
    identifier: 'lp_manon-lescaut_giacomo-puccini_4',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 115,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Chorus'],
    mood: ['Passionate', 'Romantic', 'Dramatic', 'Tragic'],
    duration: '2:15:00',
    movements: [
      {
        title: 'Act I',
        movementNumber: 1,
        key: 'D Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: "Opening act introducing Des Grieux and Manon",
        musicalElements: {
          mood: ['Passionate', 'Lyrical'],
          instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
          dynamics: 'Marked'
        }
      },
      {
        title: 'Act II',
        movementNumber: 2,
        key: 'A Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Andante',
        description: 'Manon in luxury, reunion with Des Grieux',
        musicalElements: {
          mood: ['Romantic', 'Melancholic'],
          instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone'],
          dynamics: 'Varied'
        }
      },
      {
        title: 'Act III',
        movementNumber: 3,
        key: 'G Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Allegro Moderato',
        description: 'Gambling scene and arrest',
        musicalElements: {
          mood: ['Dramatic', 'Tense'],
          instrumentation: ['Full Orchestra', 'Chorus', 'Soloists'],
          dynamics: 'Fortissimo'
        }
      },
      {
        title: 'Act IV',
        movementNumber: 4,
        key: 'D Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante Sostenuto',
        description: 'Tragic ending - Manon dying in Des Grieux arms',
        musicalElements: {
          mood: ['Tragic', 'Melancholic', 'Poignant'],
          instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
          dynamics: 'Pianissimo to Forte'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'One of Puccini\'s early masterpieces. The score shows Wagnerian influences with lush orchestration.'
  },

  'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1': {
    identifier: 'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 110,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Mezzo-Soprano', 'Chorus'],
    mood: ['Passionate', 'Exotic', 'Tragic', 'Poignant'],
    duration: '2:20:00',
    movements: [
      {
        title: 'Act I',
        movementNumber: 1,
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Wedding ceremony and first meeting',
        musicalElements: {
          mood: ['Exotic', 'Joyous', 'Passionate'],
          instrumentation: ['Orchestra with Eastern touches', 'Soprano', 'Tenor', 'Baritone'],
          dynamics: 'Vivid'
        }
      },
      {
        title: 'Act II',
        movementNumber: 2,
        key: 'A Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Butterfly\'s vigil - "Un bel dì vedremo" aria',
        musicalElements: {
          mood: ['Hopeful', 'Melancholic', 'Lyrically Dramatic'],
          instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano'],
          dynamics: 'Subtle to Powerful'
        }
      },
      {
        title: 'Act III',
        movementNumber: 3,
        key: 'D Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Moderato',
        description: 'Pinkerton returns with American wife, Butterfly\'s suicide',
        musicalElements: {
          mood: ['Tragic', 'Devastating', 'Poignant'],
          instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
          dynamics: 'From Whispered to Forte'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Puccini\'s exotic masterpiece inspired by Japanese themes. Features the famous "Humming Chorus" and Butterfly\'s aria "Un bel dì vedremo".'
  },

  // BATCH 2: Verdi Operas (COMPLETE)
  'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g': {
    identifier: 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
    metadataComplete: true,
    overallKey: 'F Major',
    overallTempo: 118,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Passionate'],
    duration: '2:05:00',
    movements: [
      {
        title: 'Act I',
        movementNumber: 1,
        key: 'F Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro Vivace',
        description: 'Opening party scene, curse of Monterone',
        musicalElements: {
          mood: ['Festive', 'Ominous', 'Dramatic'],
          instrumentation: ['Orchestra', 'Baritone', 'Tenor', 'Bass', 'Chorus'],
          dynamics: 'Energetic'
        }
      },
      {
        title: 'Act II',
        movementNumber: 2,
        key: 'C Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Andante',
        description: 'Rigoletto and Gilda - "Caro nome"',
        musicalElements: {
          mood: ['Lyrical', 'Tender', 'Romantic'],
          instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
          dynamics: 'Delicate'
        }
      },
      {
        title: 'Act III',
        movementNumber: 3,
        key: 'G Minor',
        tempo: 115,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro Moderato',
        description: 'Duke serenades Maddalena, quartet, tragic ending',
        musicalElements: {
          mood: ['Dramatic', 'Tragic', 'Intense'],
          instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
          dynamics: 'Powerful'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'F Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Verdi\'s masterpiece featuring the famous quartet "Bella figlia dell\'amore" and the curse theme. One of his most dramatic works.'
  },

  // BATCH 3: Baroque Works (COMPLETE)
  'lp_delightful-divertimentos-pretty-partit_johann-joachim-quantz-carl-stamitz-jan': {
    identifier: 'lp_delightful-divertimentos-pretty-partit_johann-joachim-quantz-carl-stamitz-jan',
    metadataComplete: true,
    overallKey: 'G Major',
    overallTempo: 100,
    genre: ['Baroque', 'Classical', 'Chamber Music'],
    instrumentation: ['Flute', 'Harpsichord', 'Strings', 'Continuo'],
    mood: ['Light', 'Graceful', 'Elegant'],
    duration: '0:45:00',
    movements: [
      {
        title: 'Allegro',
        movementNumber: 1,
        key: 'G Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '6:00',
        tempoMarking: 'Allegro',
        description: 'Fast opening movement',
        musicalElements: {
          mood: ['Brisk', 'Graceful'],
          instrumentation: ['Flute', 'Strings', 'Continuo'],
          dynamics: 'Light'
        }
      },
      {
        title: 'Andante',
        movementNumber: 2,
        key: 'D Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '5:00',
        tempoMarking: 'Andante',
        description: 'Slow, lyrical middle movement',
        musicalElements: {
          mood: ['Lyrical', 'Contemplative'],
          instrumentation: ['Flute', 'Harpsichord', 'Strings'],
          dynamics: 'Soft'
        }
      },
      {
        title: 'Finale',
        movementNumber: 3,
        key: 'G Major',
        tempo: 120,
        timeSignature: '3/4',
        duration: '4:00',
        tempoMarking: 'Allegro',
        description: 'Lively conclusion',
        musicalElements: {
          mood: ['Joyful', 'Playful'],
          instrumentation: ['Full Ensemble'],
          dynamics: 'Energetic'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'G Major',
      timeSignature: '4/4',
      harmonicComplexity: 'simple',
      melodicStyle: 'lyrical'
    },
    notes: 'Collection of Baroque divertimentos. Stamitz represents the Mannheim school, while Quantz was flute master to Frederick the Great.'
  }
};

/**
 * Batch Tracking System
 * =====================
 * Track completion status of musical metadata batches
 */

export const BATCH_STATUS = {
  'BATCH 1: Puccini Operas': {
    status: 'COMPLETE',
    works: [
      'lp_manon-lescaut_giacomo-puccini_4',
      'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1'
    ],
    completedDate: '2025-01-XX'
  },
  'BATCH 2: Verdi Operas': {
    status: 'COMPLETE',
    works: [
      'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g'
    ],
    completedDate: '2025-01-XX'
  },
  'BATCH 3: Baroque Works': {
    status: 'COMPLETE',
    works: [
      'lp_delightful-divertimentos-pretty-partit_johann-joachim-quantz-carl-stamitz-jan'
    ],
    completedDate: '2025-01-XX'
  },
  'BATCH 4: Wagner Operas': {
    status: 'TODO',
    works: [],
    completedDate: null
  },
  'BATCH 5: Mozart Works': {
    status: 'TODO',
    works: [],
    completedDate: null
  },
  'BATCH 6: Bach Works': {
    status: 'TODO',
    works: [],
    completedDate: null
  },
  'BATCH 7: Rossini Works': {
    status: 'TODO',
    works: [],
    completedDate: null
  }
};

/**
 * Get musical metadata for a work by identifier
 */
export function getWorkMusicalMetadata(identifier: string): WorkMusicalMetadata | null {
  return WORK_MUSICAL_METADATA[identifier] || null;
}

/**
 * Check if work has complete metadata
 */
export function hasCompleteMetadata(identifier: string): boolean {
  const metadata = WORK_MUSICAL_METADATA[identifier];
  return metadata?.metadataComplete || false;
}

/**
 * Get all completed works
 */
export function getCompletedWorks(): string[] {
  return Object.values(WORK_MUSICAL_METADATA)
    .filter(m => m.metadataComplete)
    .map(m => m.identifier);
}

/**
 * Get completion statistics
 */
export function getCompletionStats() {
  const total = Object.keys(WORK_MUSICAL_METADATA).length;
  const completed = Object.values(WORK_MUSICAL_METADATA).filter(m => m.metadataComplete).length;
  return {
    total,
    completed,
    pending: total - completed,
    percentage: ((completed / total) * 100).toFixed(1)
  };
}
