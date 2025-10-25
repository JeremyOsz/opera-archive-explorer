/**
 * Verdi Works Musical Metadata
 * ============================
 * Musical metadata for Verdi operas in the collection
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

export const VERDI_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g': {
    identifier: 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
    metadataComplete: true,
    overallKey: 'F Major',
    overallTempo: 118,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Passionate'],
    duration: '2:05:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Opening Party Scene',
        key: 'F Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro Vivace',
        description: 'Opening party scene, curse of Monterone',
        sections: [
          {
            title: 'Opening Party Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
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
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Rigoletto and Gilda',
        key: 'C Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Andante',
        description: 'Rigoletto and Gilda - "Caro nome"',
        sections: [
          {
            title: 'Rigoletto and Gilda',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
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
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Tragic Finale',
        key: 'G Minor',
        tempo: 115,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro Moderato',
        description: 'Duke serenades Maddalena, quartet, tragic ending',
        sections: [
          {
            title: 'Tragic Finale',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
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
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'F Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Verdi\'s masterpiece featuring the famous quartet "Bella figlia dell\'amore" and the curse theme. One of his most dramatic works.'
  }
};
