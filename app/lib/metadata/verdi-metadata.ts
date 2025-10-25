/**
 * Verdi Works Musical Metadata
 * ============================
 * Musical metadata for Verdi operas in the collection
 */

import { WorkMusicalMetadata } from './types';

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
            duration: '15:00',
            tempoMarking: 'Allegro Vivace',
            description: 'The Duke\'s court revelry and party atmosphere',
            musicalElements: {
              mood: ['Festive', 'Energetic', 'Joyful'],
              instrumentation: ['Orchestra', 'Baritone', 'Tenor', 'Bass', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Monterone\'s Curse',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'The famous curse that drives the entire plot',
            musicalElements: {
              mood: ['Ominous', 'Dramatic', 'Foreboding'],
              instrumentation: ['Orchestra', 'Bass', 'Baritone'],
              dynamics: 'Powerful'
            }
          },
          {
            title: 'Rigoletto\'s Soliloquy',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Rigoletto reflects on the curse and his fate',
            musicalElements: {
              mood: ['Melancholic', 'Reflective', 'Dramatic'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
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
            title: 'Rigoletto and Gilda Duet',
            sectionNumber: 1,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Andante',
            description: 'Father and daughter\'s tender relationship',
            musicalElements: {
              mood: ['Tender', 'Lyrical', 'Romantic'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Caro nome',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Gilda\'s famous aria "Dear name"',
            musicalElements: {
              mood: ['Lyrical', 'Tender', 'Romantic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 3,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Mezzo-forte to Forte'
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
            title: 'The Inn Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Minor',
            tempo: 115,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro Moderato',
            description: 'The storm scene at Sparafucile\'s inn',
            musicalElements: {
              mood: ['Dramatic', 'Ominous', 'Stormy'],
              instrumentation: ['Orchestra', 'All Soloists'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'La donna è mobile',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'B Major',
            tempo: 120,
            timeSignature: '3/8',
            duration: '3:00',
            tempoMarking: 'Allegretto',
            description: 'The Duke\'s famous aria "Woman is fickle"',
            musicalElements: {
              mood: ['Cheerful', 'Light', 'Melodic'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Bella figlia dell\'amore',
            sectionNumber: 3,
            sectionType: 'quartet',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'G Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The famous quartet "Beautiful daughter of love"',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Mezzo-Soprano', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Tragic Finale',
            sectionNumber: 4,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '9:00',
            tempoMarking: 'Allegro',
            description: 'Gilda\'s death and Rigoletto\'s realization',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Heartbreaking'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Piano to Fortissimo'
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
    notablePerformances: [
      {
        year: 1851,
        conductor: 'Luigi Ricci',
        orchestra: 'Teatro La Fenice Orchestra',
        venue: 'Teatro La Fenice, Venice',
        singers: [
          { name: 'Raffaele Mirate', role: 'Duke of Mantua' },
          { name: 'Felice Varesi', role: 'Rigoletto' },
          { name: 'Teresa Brambilla', role: 'Gilda' }
        ],
        significance: 'World premiere of Verdi\'s revolutionary opera',
        historicalContext: 'This was Verdi\'s first major success after a period of struggle, establishing him as the leading Italian composer of his time.',
        notes: 'The premiere was a triumph, with the famous quartet becoming one of the most celebrated moments in opera.'
      },
      {
        year: 1955,
        conductor: 'Tullio Serafin',
        orchestra: 'Orchestra of La Scala',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Maria Callas', role: 'Gilda' },
          { name: 'Giuseppe Di Stefano', role: 'Duke of Mantua' },
          { name: 'Tito Gobbi', role: 'Rigoletto' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording features three of the greatest singers of the 20th century in their prime.',
        recordingLabel: 'EMI',
        notes: 'Callas\'s Gilda is considered definitive, combining vocal perfection with deep emotional understanding.'
      }
    ],
    notes: 'Verdi\'s masterpiece featuring the famous quartet "Bella figlia dell\'amore" and the curse theme. One of his most dramatic works.'
  }
};
