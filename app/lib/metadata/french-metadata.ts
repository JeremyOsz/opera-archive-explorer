/**
 * French Composers Musical Metadata
 * ==================================
 * Musical metadata for French composers' works in the collection
 */

import { WorkMusicalMetadata } from './types';

export const FRENCH_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_carmen-preludes_artur-rother-orchester-der-stadtischen-oper-berlin-georges-bizet': {
    identifier: 'lp_carmen-preludes_artur-rother-orchester-der-stadtischen-oper-berlin-georges-bizet',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 125,
    genre: ['Opera', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra'],
    mood: ['Dramatic', 'Passionate', 'Exotic', 'Tragic'],
    duration: '15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Carmen Preludes',
        key: 'A Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '15:00',
        tempoMarking: 'Allegro',
        description: 'Orchestral preludes from Bizet\'s Carmen',
        sections: [
          {
            title: 'Carmen Preludes',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'Orchestral preludes from Bizet\'s Carmen',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Exotic'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Orchestral preludes from Bizet\'s Carmen, featuring the famous "Toreador Song" and other highlights.'
  },

  'lp_maria-kurenko-sings-with-orchestra_maria-kurenko-wolfgang-amadeus-mozart-georg-friedrich-handel': {
    identifier: 'lp_maria-kurenko-sings-with-orchestra_maria-kurenko-wolfgang-amadeus-mozart-georg-friedrich-handel',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 115,
    genre: ['Vocal', 'Classical', 'Baroque'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Strings', 'Harpsichord'],
    mood: ['Elegant', 'Graceful', 'Expressive', 'Refined'],
    duration: '40:00',
    acts: [
      {
        actNumber: 1,
        title: 'Maria Kurenko Sings with Orchestra',
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Maria Kurenko performing with orchestra',
        sections: [
          {
            title: 'Maria Kurenko Sings with Orchestra',
            sectionNumber: 1,
            sectionType: 'vocal',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '40:00',
            tempoMarking: 'Allegro',
            description: 'Maria Kurenko performing with orchestra',
            musicalElements: {
              mood: ['Elegant', 'Graceful', 'Expressive'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Strings', 'Harpsichord'],
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
    notes: 'Maria Kurenko performing with orchestra, showcasing her elegant interpretation of classical and baroque works.'
  },

  'lp_djamileh_georges-bizet-andrea-guiot-guy-fouche': {
    identifier: 'lp_djamileh_georges-bizet-andrea-guiot-guy-fouche',
    metadataComplete: true,
    overallKey: 'E Major',
    overallTempo: 110,
    genre: ['Opera', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Chorus'],
    mood: ['Exotic', 'Romantic', 'Dramatic', 'Passionate'],
    duration: '1:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Djamileh',
        key: 'E Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Allegro',
        description: 'Bizet\'s one-act opera about a slave girl and her master',
        sections: [
          {
            title: 'Djamileh',
            sectionNumber: 1,
            sectionType: 'opera',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '90:00',
            tempoMarking: 'Allegro',
            description: 'Bizet\'s one-act opera about a slave girl and her master',
            musicalElements: {
              mood: ['Exotic', 'Romantic', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'E Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Bizet\'s one-act opera Djamileh, set in the Middle East, featuring exotic melodies and dramatic intensity.'
  },

  'lp_carmen_georges-bizet-raoul-jobin-solange-michel-michel-dens': {
    identifier: 'lp_carmen_georges-bizet-raoul-jobin-solange-michel-michel-dens',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 120,
    genre: ['Opera', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Passionate', 'Exotic', 'Tragic'],
    duration: '2:45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Cigarette Factory',
        key: 'D Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '55:00',
        tempoMarking: 'Allegro',
        description: 'The cigarette factory and Carmen\'s first appearance',
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'Famous overture with its dramatic energy',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Exotic'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'The Cigarette Factory',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro',
            description: 'The cigarette factory and Carmen\'s first appearance',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Exotic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Lillas Pastia\'s Tavern',
        key: 'F Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '55:00',
        tempoMarking: 'Allegro',
        description: 'Lillas Pastia\'s tavern and the Toreador Song',
        sections: [
          {
            title: 'Lillas Pastia\'s Tavern',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '55:00',
            tempoMarking: 'Allegro',
            description: 'Lillas Pastia\'s tavern and the Toreador Song',
            musicalElements: {
              mood: ['Exotic', 'Passionate', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Mountain Pass',
        key: 'G Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '55:00',
        tempoMarking: 'Allegro',
        description: 'The mountain pass and the card scene',
        sections: [
          {
            title: 'The Mountain Pass',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '55:00',
            tempoMarking: 'Allegro',
            description: 'The mountain pass and the card scene',
            musicalElements: {
              mood: ['Dramatic', 'Tragic', 'Intense'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - The Bullring',
        key: 'D Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'The bullring and Carmen\'s death',
        sections: [
          {
            title: 'The Bullring',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '40:00',
            tempoMarking: 'Allegro',
            description: 'The bullring and Carmen\'s death',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Intense'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Crescendo to tragedy'
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
    notes: 'Bizet\'s masterpiece Carmen, the story of a gypsy woman and her tragic love, featuring some of the most famous melodies in opera.'
  },

  'lp_la-grande-duchesse-de-gerolstein_jacques-offenbach-eugenia-zareska-gisele-prevet': {
    identifier: 'lp_la-grande-duchesse-de-gerolstein_jacques-offenbach-eugenia-zareska-gisele-prevet',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 130,
    genre: ['Operetta', 'Classical', 'Comedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Witty', 'Charming', 'Humorous', 'Elegant'],
    duration: '2:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Duchess\'s Court',
        key: 'C Major',
        tempo: 135,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Allegro',
        description: 'The Duchess\'s court and her romantic entanglements',
        sections: [
          {
            title: 'The Duchess\'s Court',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 135,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Allegro',
            description: 'The Duchess\'s court and her romantic entanglements',
            musicalElements: {
              mood: ['Witty', 'Charming', 'Humorous'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Military Camp',
        key: 'F Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Allegro',
        description: 'The military camp and the Duchess\'s interference',
        sections: [
          {
            title: 'The Military Camp',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Allegro',
            description: 'The military camp and the Duchess\'s interference',
            musicalElements: {
              mood: ['Witty', 'Humorous', 'Elegant'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Wedding',
        key: 'G Major',
        tempo: 130,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Allegro',
        description: 'The wedding and the final resolution',
        sections: [
          {
            title: 'The Wedding',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 130,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Allegro',
            description: 'The wedding and the final resolution',
            musicalElements: {
              mood: ['Joyful', 'Triumphant', 'Elegant'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Crescendo to finale'
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
    notes: 'Offenbach\'s charming operetta La Grande Duchesse de Gérolstein, a witty comedy about a meddling duchess and her romantic entanglements.'
  }
};
