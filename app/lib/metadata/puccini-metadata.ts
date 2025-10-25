/**
 * Puccini Works Musical Metadata
 * ==============================
 * Musical metadata for Puccini operas in the collection
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

export const PUCCINI_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_manon-lescaut_giacomo-puccini_4': {
    identifier: 'lp_manon-lescaut_giacomo-puccini_4',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 115,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Chorus'],
    mood: ['Passionate', 'Romantic', 'Dramatic', 'Tragic'],
    duration: '2:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Des Grieux and Manon Meet',
        key: 'D Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: "Opening act introducing Des Grieux and Manon",
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: "Orchestral introduction setting the romantic tone",
            musicalElements: {
              mood: ['Passionate', 'Lyrical'],
              instrumentation: ['Orchestra'],
              dynamics: 'Marked'
            }
          },
          {
            title: 'Des Grieux and Manon Meet',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '30:00',
            tempoMarking: 'Allegro',
            description: "Opening scene introducing Des Grieux and Manon",
            musicalElements: {
              mood: ['Passionate', 'Lyrical'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Marked'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Manon in Luxury',
        key: 'A Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Andante',
        description: 'Manon in luxury, reunion with Des Grieux',
        sections: [
          {
            title: 'Manon in Luxury',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
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
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Gambling Scene',
        key: 'G Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Allegro Moderato',
        description: 'Gambling scene and arrest',
        sections: [
          {
            title: 'Gambling Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
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
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - Manon\'s Death',
        key: 'D Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante Sostenuto',
        description: 'Tragic ending - Manon dying in Des Grieux arms',
        sections: [
          {
            title: 'Manon\'s Death',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
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
        ]
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
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Wedding Ceremony',
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Wedding ceremony and first meeting',
        sections: [
          {
            title: 'Overture - Japanese Themes',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'Orchestral introduction with Japanese musical elements',
            musicalElements: {
              mood: ['Exotic', 'Mystical'],
              instrumentation: ['Orchestra with Eastern touches'],
              dynamics: 'Vivid'
            }
          },
          {
            title: 'Wedding Ceremony',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '35:00',
            tempoMarking: 'Allegro',
            description: 'Wedding ceremony and first meeting',
            musicalElements: {
              mood: ['Exotic', 'Joyous', 'Passionate'],
              instrumentation: ['Orchestra with Eastern touches', 'Soprano', 'Tenor', 'Baritone'],
              dynamics: 'Vivid'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Butterfly\'s Vigil',
        key: 'A Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Butterfly\'s vigil - "Un bel dì vedremo" aria',
        sections: [
          {
            title: 'Butterfly\'s Vigil',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'complex',
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
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Tragic Finale',
        key: 'D Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Moderato',
        description: 'Pinkerton returns with American wife, Butterfly\'s suicide',
        sections: [
          {
            title: 'Tragic Finale',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
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
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Puccini\'s exotic masterpiece inspired by Japanese themes. Features the famous "Humming Chorus" and Butterfly\'s aria "Un bel dì vedremo".'
  }
};
