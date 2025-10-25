/**
 * Russian Composers Musical Metadata
 * ===================================
 * Musical metadata for Russian composers' works in the collection
 */

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

export const RUSSIAN_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_persephone_igor-stravinsky-orchestre-de-la-societe-des-concerts-du-conservatoire': {
    identifier: 'lp_persephone_igor-stravinsky-orchestre-de-la-societe-des-concerts-du-conservatoire',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 100,
    genre: ['Melodrama', 'Modern', 'Classical'],
    instrumentation: ['Full Orchestra', 'Narrator', 'Chorus'],
    mood: ['Mystical', 'Dramatic', 'Contemplative', 'Ancient'],
    duration: '50:00',
    acts: [
      {
        actNumber: 1,
        title: 'Persephone',
        key: 'C Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Moderato',
        description: 'Stravinsky\'s melodrama about the Greek goddess Persephone',
        sections: [
          {
            title: 'Persephone',
            sectionNumber: 1,
            sectionType: 'melodrama',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'C Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Moderato',
            description: 'Stravinsky\'s melodrama about the Greek goddess Persephone',
            musicalElements: {
              mood: ['Mystical', 'Dramatic', 'Contemplative'],
              instrumentation: ['Full Orchestra', 'Narrator', 'Chorus'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Stravinsky\'s melodrama Persephone, based on the Greek myth, featuring his neoclassical style and dramatic intensity.'
  },

  'lp_romeo-and-juliet-duet-the-prayer_pyotr-ilyich-tchaikovsky-mikhail-ivanovich-glinka': {
    identifier: 'lp_romeo-and-juliet-duet-the-prayer_pyotr-ilyich-tchaikovsky-mikhail-ivanovich-glinka',
    metadataComplete: true,
    overallKey: 'B-flat Major',
    overallTempo: 95,
    genre: ['Opera', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Chorus'],
    mood: ['Romantic', 'Dramatic', 'Passionate', 'Tragic'],
    duration: '35:00',
    acts: [
      {
        actNumber: 1,
        title: 'Romeo and Juliet Duet / The Prayer',
        key: 'B-flat Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Andante',
        description: 'Tchaikovsky\'s Romeo and Juliet duet and Glinka\'s prayer',
        sections: [
          {
            title: 'Romeo and Juliet Duet / The Prayer',
            sectionNumber: 1,
            sectionType: 'duet',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'B-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '35:00',
            tempoMarking: 'Andante',
            description: 'Tchaikovsky\'s Romeo and Juliet duet and Glinka\'s prayer',
            musicalElements: {
              mood: ['Romantic', 'Dramatic', 'Passionate'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Chorus'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'B-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Tchaikovsky\'s Romeo and Juliet duet and Glinka\'s prayer, showcasing Russian romantic opera at its finest.'
  },

  'lp_romances-op-54-60-63-65-and-73-volume-ii_pyotr-ilyich-tchaikovsky-sergey-lemeshev': {
    identifier: 'lp_romances-op-54-60-63-65-and-73-volume-ii_pyotr-ilyich-tchaikovsky-sergey-lemeshev',
    metadataComplete: true,
    overallKey: 'G Major',
    overallTempo: 90,
    genre: ['Romances', 'Classical', 'Vocal'],
    instrumentation: ['Piano', 'Tenor'],
    mood: ['Romantic', 'Melancholic', 'Intimate', 'Passionate'],
    duration: '40:00',
    acts: [
      {
        actNumber: 1,
        title: 'Tchaikovsky Romances',
        key: 'G Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Andante',
        description: 'Collection of Tchaikovsky romances performed by Sergey Lemeshev',
        sections: [
          {
            title: 'Tchaikovsky Romances',
            sectionNumber: 1,
            sectionType: 'romances',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '40:00',
            tempoMarking: 'Andante',
            description: 'Collection of Tchaikovsky romances performed by Sergey Lemeshev',
            musicalElements: {
              mood: ['Romantic', 'Melancholic', 'Intimate'],
              instrumentation: ['Piano', 'Tenor'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'G Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Sergey Lemeshev performing Tchaikovsky romances, showcasing the intimate art of Russian song.'
  },

  'lp_lhistoire-du-soldat_igor-stravinsky-igor-markevitch': {
    identifier: 'lp_lhistoire-du-soldat_igor-stravinsky-igor-markevitch',
    metadataComplete: true,
    overallKey: 'A Minor',
    overallTempo: 110,
    genre: ['Theater Piece', 'Modern', 'Classical'],
    instrumentation: ['Chamber Ensemble', 'Narrator', 'Dancer'],
    mood: ['Dramatic', 'Satirical', 'Modern', 'Theatrical'],
    duration: '30:00',
    acts: [
      {
        actNumber: 1,
        title: 'L\'Histoire du Soldat',
        key: 'A Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Allegro',
        description: 'Stravinsky\'s theater piece about a soldier and the devil',
        sections: [
          {
            title: 'L\'Histoire du Soldat',
            sectionNumber: 1,
            sectionType: 'theater piece',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '30:00',
            tempoMarking: 'Allegro',
            description: 'Stravinsky\'s theater piece about a soldier and the devil',
            musicalElements: {
              mood: ['Dramatic', 'Satirical', 'Modern'],
              instrumentation: ['Chamber Ensemble', 'Narrator', 'Dancer'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Stravinsky\'s theater piece L\'Histoire du Soldat, a modern retelling of the Faust legend with chamber ensemble.'
  },

  'lp_das-grosse-abend_sergei-vasilyevich-rachmaninoff': {
    identifier: 'lp_das-grosse-abend_sergei-vasilyevich-rachmaninoff',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 85,
    genre: ['Symphony', 'Classical', 'Romantic'],
    instrumentation: ['Full Orchestra'],
    mood: ['Dramatic', 'Romantic', 'Melancholic', 'Triumphant'],
    duration: '45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Symphony No. 2',
        key: 'D Minor',
        tempo: 85,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Andante',
        description: 'Rachmaninoff\'s Symphony No. 2 in D Minor',
        sections: [
          {
            title: 'Symphony No. 2',
            sectionNumber: 1,
            sectionType: 'symphony',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Andante',
            description: 'Rachmaninoff\'s Symphony No. 2 in D Minor',
            musicalElements: {
              mood: ['Dramatic', 'Romantic', 'Melancholic'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Rachmaninoff\'s Symphony No. 2, a work of great emotional depth and romantic intensity.'
  }
};
