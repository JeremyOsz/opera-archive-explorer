/**
 * Mozart Works Musical Metadata
 * =============================
 * Musical metadata for Mozart operas and works in the collection
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

export const MOZART_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_manuel-ausensi-sings-mozart-and-cimaros_manuel-ausensi-wolfgang-amadeus-mozart': {
    identifier: 'lp_manuel-ausensi-sings-mozart-and-cimaros_manuel-ausensi-wolfgang-amadeus-mozart',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 120,
    genre: ['Opera', 'Classical', 'Baroque'],
    instrumentation: ['Orchestra', 'Baritone', 'Strings', 'Harpsichord'],
    mood: ['Elegant', 'Refined', 'Melodic'],
    duration: '45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Mozart Arias Collection',
        key: 'D Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Allegro',
        description: 'Collection of Mozart arias performed by Manuel Ausensi',
        sections: [
          {
            title: 'Mozart Arias',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Allegro',
            description: 'Collection of Mozart arias',
            musicalElements: {
              mood: ['Elegant', 'Refined', 'Melodic'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Manuel Ausensi performing Mozart arias with classical elegance and refined interpretation.'
  },

  'lp_12-songs-and-2-comic-ensembles_wolfgang-amadeus-mozart-margot-guilleau': {
    identifier: 'lp_12-songs-and-2-comic-ensembles_wolfgang-amadeus-mozart-margot-guilleau',
    metadataComplete: true,
    overallKey: 'G Major',
    overallTempo: 110,
    genre: ['Lieder', 'Classical', 'Vocal'],
    instrumentation: ['Piano', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Bass'],
    mood: ['Intimate', 'Charming', 'Witty'],
    duration: '50:00',
    acts: [
      {
        actNumber: 1,
        title: 'Songs and Ensembles',
        key: 'G Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Twelve songs and two comic ensembles by Mozart',
        sections: [
          {
            title: 'Songs and Ensembles',
            sectionNumber: 1,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Andante',
            description: 'Twelve songs and two comic ensembles',
            musicalElements: {
              mood: ['Intimate', 'Charming', 'Witty'],
              instrumentation: ['Piano', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Bass'],
              dynamics: 'Delicate'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'G Major',
      timeSignature: '4/4',
      harmonicComplexity: 'simple',
      melodicStyle: 'lyrical'
    },
    notes: 'Mozart\'s charming songs and comic ensembles showcasing his wit and melodic genius.'
  },

  'lp_maria-kurenko-sings-with-orchestra_maria-kurenko-wolfgang-amadeus-mozart': {
    identifier: 'lp_maria-kurenko-sings-with-orchestra_maria-kurenko-wolfgang-amadeus-mozart',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 115,
    genre: ['Opera', 'Classical', 'Vocal'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Strings', 'Woodwinds'],
    mood: ['Graceful', 'Expressive', 'Elegant'],
    duration: '40:00',
    acts: [
      {
        actNumber: 1,
        title: 'Mozart Arias with Orchestra',
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Maria Kurenko performing Mozart arias with orchestra',
        sections: [
          {
            title: 'Mozart Arias with Orchestra',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '40:00',
            tempoMarking: 'Allegro',
            description: 'Maria Kurenko performing Mozart arias with orchestra',
            musicalElements: {
              mood: ['Graceful', 'Expressive', 'Elegant'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Maria Kurenko\'s elegant interpretation of Mozart arias with full orchestral accompaniment.'
  },

  'lp_the-marriage-of-figaro_wolfgang-amadeus-mozart-fernando-previtali': {
    identifier: 'lp_the-marriage-of-figaro_wolfgang-amadeus-mozart-fernando-previtali',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 125,
    genre: ['Opera Buffa', 'Classical', 'Comedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Witty', 'Playful', 'Elegant', 'Humorous'],
    duration: '3:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Count\'s Palace',
        key: 'D Major',
        tempo: 130,
        timeSignature: '4/4',
        duration: '65:00',
        tempoMarking: 'Allegro',
        description: 'Opening act with Figaro and Susanna planning their wedding',
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 130,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Presto',
            description: 'Famous overture with its bubbling energy',
            musicalElements: {
              mood: ['Energetic', 'Playful', 'Witty'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Act I Scenes',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '61:00',
            tempoMarking: 'Allegro',
            description: 'Figaro and Susanna planning their wedding',
            musicalElements: {
              mood: ['Witty', 'Playful', 'Romantic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Countess\'s Chamber',
        key: 'F Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '65:00',
        tempoMarking: 'Andante',
        description: 'The Countess\'s chamber with "Porgi amor" and Cherubino\'s "Voi che sapete"',
        sections: [
          {
            title: 'Countess\'s Chamber Scenes',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '65:00',
            tempoMarking: 'Andante',
            description: 'The Countess\'s chamber with famous arias',
            musicalElements: {
              mood: ['Melancholic', 'Romantic', 'Tender'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Garden',
        key: 'G Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '65:00',
        tempoMarking: 'Allegro',
        description: 'Garden scene with the wedding and final reconciliation',
        sections: [
          {
            title: 'Garden Scene and Wedding',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'G Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '65:00',
            tempoMarking: 'Allegro',
            description: 'Garden scene with wedding and reconciliation',
            musicalElements: {
              mood: ['Joyful', 'Triumphant', 'Reconciled'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Crescendo to finale'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Mozart\'s masterpiece of opera buffa, featuring brilliant ensemble writing and witty characterization.'
  },

  'lp_don-giovanni_wolfgang-amadeus-mozart-wiener-symphoniker-rudolf-moralt': {
    identifier: 'lp_don-giovanni_wolfgang-amadeus-mozart-wiener-symphoniker-rudolf-moralt',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 120,
    genre: ['Opera', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Passionate', 'Tragic', 'Comic'],
    duration: '2:45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Don Giovanni\'s Seduction',
        key: 'D Minor',
        tempo: 125,
        timeSignature: '4/4',
        duration: '85:00',
        tempoMarking: 'Allegro',
        description: 'Don Giovanni\'s attempted seduction and the Commendatore\'s death',
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 125,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Allegro',
            description: 'Famous overture with its dramatic opening',
            musicalElements: {
              mood: ['Dramatic', 'Ominous', 'Powerful'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Don Giovanni\'s Seduction',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '79:00',
            tempoMarking: 'Allegro',
            description: 'Don Giovanni\'s attempted seduction and the Commendatore\'s death',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Stone Guest',
        key: 'D Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '80:00',
        tempoMarking: 'Allegro',
        description: 'The Stone Guest scene and Don Giovanni\'s damnation',
        sections: [
          {
            title: 'The Stone Guest',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '80:00',
            tempoMarking: 'Allegro',
            description: 'The Stone Guest scene and Don Giovanni\'s damnation',
            musicalElements: {
              mood: ['Dramatic', 'Supernatural', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From mysterious to overwhelming'
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
    notes: 'Mozart\'s dramatic masterpiece about the legendary seducer Don Giovanni, featuring some of his most powerful music.'
  }
};
