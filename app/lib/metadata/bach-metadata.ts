/**
 * Bach Works Musical Metadata
 * ============================
 * Musical metadata for Bach works in the collection
 */

import { WorkMusicalMetadata } from './types';

export const BACH_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_matthaus_johann-sebastian-bach-elly-ameling-marga-hoffgen': {
    identifier: 'lp_matthaus_johann-sebastian-bach-elly-ameling-marga-hoffgen',
    metadataComplete: true,
    overallKey: 'E Minor',
    overallTempo: 80,
    genre: ['Oratorio', 'Baroque', 'Sacred'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus', 'Organ'],
    mood: ['Sacred', 'Contemplative', 'Dramatic', 'Solemn'],
    duration: '2:45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Part I - The Last Supper',
        key: 'E Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '85:00',
        tempoMarking: 'Andante',
        description: 'The Last Supper and Jesus\' arrest',
        sections: [
          {
            title: 'Opening Chorus',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'E Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Famous opening chorus "Kommt, ihr Töchter"',
            musicalElements: {
              mood: ['Sacred', 'Contemplative', 'Solemn'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'From piano to forte'
            }
          },
          {
            title: 'The Last Supper',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'E Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '77:00',
            tempoMarking: 'Andante',
            description: 'The Last Supper and Jesus\' arrest',
            musicalElements: {
              mood: ['Sacred', 'Dramatic', 'Contemplative'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Part II - The Crucifixion',
        key: 'G Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '80:00',
        tempoMarking: 'Largo',
        description: 'The crucifixion and death of Jesus',
        sections: [
          {
            title: 'The Crucifixion',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '80:00',
            tempoMarking: 'Largo',
            description: 'The crucifixion and death of Jesus',
            musicalElements: {
              mood: ['Tragic', 'Sacred', 'Solemn'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From quiet to overwhelming'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'E Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Bach\'s greatest oratorio, the St. Matthew Passion, telling the story of Christ\'s crucifixion with profound musical depth.'
  },

  'lp_cantata-profana_bela-bartok-walter-susskind-the-new-symphony-orchestra-of-london': {
    identifier: 'lp_cantata-profana_bela-bartok-walter-susskind-the-new-symphony-orchestra-of-london',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 100,
    genre: ['Cantata', 'Modern', 'Folk'],
    instrumentation: ['Full Orchestra', 'Baritone', 'Tenor', 'Chorus'],
    mood: ['Folk', 'Dramatic', 'Ritualistic'],
    duration: '25:00',
    acts: [
      {
        actNumber: 1,
        title: 'Cantata Profana',
        key: 'C Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Moderato',
        description: 'Bartók\'s secular cantata based on Romanian folk tales',
        sections: [
          {
            title: 'Cantata Profana',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'C Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Moderato',
            description: 'Bartók\'s secular cantata based on Romanian folk tales',
            musicalElements: {
              mood: ['Folk', 'Dramatic', 'Ritualistic'],
              instrumentation: ['Full Orchestra', 'Baritone', 'Tenor', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'decorative'
    },
    notes: 'Bartók\'s secular cantata based on Romanian folk tales, showcasing his unique blend of folk elements and modern composition.'
  },

  'lp_lœuvre-pour-orgue_johann-sebastian-bach-marie-claire-alain': {
    identifier: 'lp_lœuvre-pour-orgue_johann-sebastian-bach-marie-claire-alain',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 90,
    genre: ['Organ', 'Baroque', 'Sacred'],
    instrumentation: ['Organ'],
    mood: ['Sacred', 'Contemplative', 'Solemn', 'Transcendent'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Organ Works Collection',
        key: 'D Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '150:00',
        tempoMarking: 'Andante',
        description: 'Collection of Bach\'s organ works',
        sections: [
          {
            title: 'Organ Works',
            sectionNumber: 1,
            sectionType: 'interlude',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '150:00',
            tempoMarking: 'Andante',
            description: 'Collection of Bach\'s organ works',
            musicalElements: {
              mood: ['Sacred', 'Contemplative', 'Solemn'],
              instrumentation: ['Organ'],
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
      melodicStyle: 'decorative'
    },
    notes: 'Marie-Claire Alain\'s interpretation of Bach\'s organ works, showcasing the composer\'s mastery of counterpoint and sacred music.'
  },

  'lp_piccolo-magnificat-le-rossignol-cantata_magda-laszlo-johann-sebastian-bach': {
    identifier: 'lp_piccolo-magnificat-le-rossignol-cantata_magda-laszlo-johann-sebastian-bach',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 110,
    genre: ['Cantata', 'Baroque', 'Sacred'],
    instrumentation: ['Orchestra', 'Soprano', 'Strings', 'Harpsichord'],
    mood: ['Sacred', 'Joyful', 'Celebratory'],
    duration: '35:00',
    acts: [
      {
        actNumber: 1,
        title: 'Magnificat and Cantata',
        key: 'D Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: 'Bach\'s Magnificat and cantata works',
        sections: [
          {
            title: 'Magnificat and Cantata',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '35:00',
            tempoMarking: 'Allegro',
            description: 'Bach\'s Magnificat and cantata works',
            musicalElements: {
              mood: ['Sacred', 'Joyful', 'Celebratory'],
              instrumentation: ['Orchestra', 'Soprano', 'Strings', 'Harpsichord'],
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
    notes: 'Magda Laszlo performing Bach\'s Magnificat and cantata works with baroque elegance and sacred devotion.'
  }
};
