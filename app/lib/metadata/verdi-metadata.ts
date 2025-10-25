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
