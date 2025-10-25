/**
 * Richard Strauss Works Musical Metadata
 * =====================================
 * Musical metadata for Richard Strauss works in the collection
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

export const STRAUSS_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_elektra_richard-strauss-elisabeth-hongen-walburga-wegner': {
    identifier: 'lp_elektra_richard-strauss-elisabeth-hongen-walburga-wegner',
    metadataComplete: true,
    overallKey: 'C Minor',
    overallTempo: 95,
    genre: ['Opera', 'Expressionist', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Intense', 'Tragic', 'Expressionist'],
    duration: '1:45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Elektra',
        key: 'C Minor',
        tempo: 95,
        timeSignature: '4/4',
        duration: '105:00',
        tempoMarking: 'Allegro',
        description: 'Strauss\' expressionist opera based on Sophocles\' tragedy',
        sections: [
          {
            title: 'Elektra',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'C Minor',
            tempo: 95,
            timeSignature: '4/4',
            duration: '105:00',
            tempoMarking: 'Allegro',
            description: 'Strauss\' expressionist opera based on Sophocles\' tragedy',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Strauss\' expressionist masterpiece, based on Sophocles\' tragedy, featuring some of his most intense and dramatic music.'
  },

  'lp_a-heros-life_richard-strauss-minneapolis-symphony-orchestra-antal-dorati': {
    identifier: 'lp_a-heros-life_richard-strauss-minneapolis-symphony-orchestra-antal-dorati',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 110,
    genre: ['Symphonic Poem', 'Classical', 'Orchestral'],
    instrumentation: ['Full Orchestra'],
    mood: ['Heroic', 'Triumphant', 'Dramatic', 'Noble'],
    duration: '45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Ein Heldenleben',
        key: 'E-flat Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Allegro',
        description: 'Strauss\' autobiographical symphonic poem',
        sections: [
          {
            title: 'Ein Heldenleben',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Allegro',
            description: 'Strauss\' autobiographical symphonic poem',
            musicalElements: {
              mood: ['Heroic', 'Triumphant', 'Dramatic'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'E-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Strauss\' autobiographical symphonic poem "A Hero\'s Life", depicting the life of an artist-hero with characteristic Strauss orchestration.'
  },

  'lp_tiefland_eugen-dalbert-isabel-strauss-angelika-fischer': {
    identifier: 'lp_tiefland_eugen-dalbert-isabel-strauss-angelika-fischer',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 100,
    genre: ['Opera', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Passionate', 'Romantic', 'Tragic'],
    duration: '2:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Tiefland',
        key: 'D Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '135:00',
        tempoMarking: 'Allegro',
        description: 'Eugen d\'Albert\'s opera about love and betrayal in the Pyrenees',
        sections: [
          {
            title: 'Tiefland',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '135:00',
            tempoMarking: 'Allegro',
            description: 'Eugen d\'Albert\'s opera about love and betrayal in the Pyrenees',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Romantic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
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
      melodicStyle: 'dramatic'
    },
    notes: 'Eugen d\'Albert\'s opera Tiefland, a dramatic work about love and betrayal set in the Pyrenees mountains.'
  },

  'lp_der-rosenkavalier_richard-strauss': {
    identifier: 'lp_der-rosenkavalier_richard-strauss',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 115,
    genre: ['Opera', 'Classical', 'Comedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Elegant', 'Witty', 'Romantic', 'Charming'],
    duration: '3:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Marschallin\'s Bedroom',
        key: 'D Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '65:00',
        tempoMarking: 'Allegro',
        description: 'The Marschallin and Octavian\'s love scene',
        sections: [
          {
            title: 'The Marschallin\'s Bedroom',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '65:00',
            tempoMarking: 'Allegro',
            description: 'The Marschallin and Octavian\'s love scene',
            musicalElements: {
              mood: ['Elegant', 'Romantic', 'Intimate'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Presentation of the Rose',
        key: 'F Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '65:00',
        tempoMarking: 'Allegro',
        description: 'Octavian presents the silver rose to Sophie',
        sections: [
          {
            title: 'The Presentation of the Rose',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '65:00',
            tempoMarking: 'Allegro',
            description: 'Octavian presents the silver rose to Sophie',
            musicalElements: {
              mood: ['Romantic', 'Elegant', 'Charming'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Final Trio',
        key: 'D Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '65:00',
        tempoMarking: 'Allegro',
        description: 'The famous final trio and resolution',
        sections: [
          {
            title: 'The Final Trio',
            sectionNumber: 1,
            sectionType: 'trio',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '65:00',
            tempoMarking: 'Allegro',
            description: 'The famous final trio and resolution',
            musicalElements: {
              mood: ['Triumphant', 'Elegant', 'Romantic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
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
    notes: 'Strauss\' elegant comedy Der Rosenkavalier, featuring the famous "Presentation of the Rose" and the final trio.'
  },

  'lp_arabella_richard-strauss-josef-metternich-elisabeth-schwarzkopf': {
    identifier: 'lp_arabella_richard-strauss-josef-metternich-elisabeth-schwarzkopf',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 105,
    genre: ['Opera', 'Classical', 'Comedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Elegant', 'Romantic', 'Witty', 'Charming'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Waldner Family',
        key: 'A Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Allegro',
        description: 'The Waldner family and Arabella\'s suitors',
        sections: [
          {
            title: 'The Waldner Family',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Allegro',
            description: 'The Waldner family and Arabella\'s suitors',
            musicalElements: {
              mood: ['Elegant', 'Witty', 'Charming'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Ball',
        key: 'C Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Allegro',
        description: 'The ball scene and Arabella\'s choice',
        sections: [
          {
            title: 'The Ball',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Allegro',
            description: 'The ball scene and Arabella\'s choice',
            musicalElements: {
              mood: ['Elegant', 'Romantic', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Strauss\' elegant comedy Arabella, set in 19th-century Vienna, featuring his characteristic wit and melodic invention.'
  }
};
