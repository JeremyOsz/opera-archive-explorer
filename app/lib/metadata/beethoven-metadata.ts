/**
 * Beethoven Works Musical Metadata
 * ================================
 * Musical metadata for Beethoven works in the collection
 */

import { WorkMusicalMetadata } from './types';

export const BEETHOVEN_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_christ-on-the-mount-of-olives_ludwig-van-beethoven-orchester-der-wiener-staatsoper': {
    identifier: 'lp_christ-on-the-mount-of-olives_ludwig-van-beethoven-orchester-der-wiener-staatsoper',
    metadataComplete: true,
    overallKey: 'C Minor',
    overallTempo: 90,
    genre: ['Oratorio', 'Classical', 'Sacred'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Bass', 'Chorus'],
    mood: ['Sacred', 'Dramatic', 'Solemn', 'Triumphant'],
    duration: '1:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Christ on the Mount of Olives',
        key: 'C Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Andante',
        description: 'Beethoven\'s oratorio about Christ\'s agony in the garden',
        sections: [
          {
            title: 'Christ on the Mount of Olives',
            sectionNumber: 1,
            sectionType: 'oratorio',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'C Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Andante',
            description: 'Beethoven\'s oratorio about Christ\'s agony in the garden',
            musicalElements: {
              mood: ['Sacred', 'Dramatic', 'Solemn'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Bass', 'Chorus'],
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
    notes: 'Beethoven\'s oratorio about Christ\'s agony in the garden, showcasing his dramatic and sacred music writing.'
  },

  'lp_missa-solemnis_ludwig-van-beethoven-eugen-jochum-agnes-giebel': {
    identifier: 'lp_missa-solemnis_ludwig-van-beethoven-eugen-jochum-agnes-giebel',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 85,
    genre: ['Mass', 'Classical', 'Sacred'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus', 'Organ'],
    mood: ['Sacred', 'Solemn', 'Triumphant', 'Contemplative'],
    duration: '1:20:00',
    acts: [
      {
        actNumber: 1,
        title: 'Missa Solemnis',
        key: 'D Major',
        tempo: 85,
        timeSignature: '4/4',
        duration: '80:00',
        tempoMarking: 'Andante',
        description: 'Beethoven\'s monumental mass setting',
        sections: [
          {
            title: 'Missa Solemnis',
            sectionNumber: 1,
            sectionType: 'mass',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '80:00',
            tempoMarking: 'Andante',
            description: 'Beethoven\'s monumental mass setting',
            musicalElements: {
              mood: ['Sacred', 'Solemn', 'Triumphant'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus', 'Organ'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Beethoven\'s monumental mass setting, considered one of his greatest works and a masterpiece of sacred music.'
  },

  'lp_music-to-goethes-egmont-op-84_ludwig-van-beethoven-hermann-scherchen': {
    identifier: 'lp_music-to-goethes-egmont-op-84_ludwig-van-beethoven-hermann-scherchen',
    metadataComplete: true,
    overallKey: 'F Minor',
    overallTempo: 100,
    genre: ['Incidental Music', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Narrator'],
    mood: ['Dramatic', 'Heroic', 'Tragic', 'Triumphant'],
    duration: '45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Egmont Overture and Incidental Music',
        key: 'F Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Allegro',
        description: 'Beethoven\'s incidental music for Goethe\'s play Egmont',
        sections: [
          {
            title: 'Egmont Overture and Incidental Music',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Allegro',
            description: 'Beethoven\'s incidental music for Goethe\'s play Egmont',
            musicalElements: {
              mood: ['Dramatic', 'Heroic', 'Tragic'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Narrator'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'F Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Beethoven\'s incidental music for Goethe\'s play Egmont, featuring the famous overture and dramatic music.'
  },

  'lp_symphony-no-4-leonore-overture-no-3_robert-schumann-ludwig-van-beethoven-boston-symphony-orchestra': {
    identifier: 'lp_symphony-no-4-leonore-overture-no-3_robert-schumann-ludwig-van-beethoven-boston-symphony-orchestra',
    metadataComplete: true,
    overallKey: 'B-flat Major',
    overallTempo: 110,
    genre: ['Symphony', 'Classical', 'Orchestral'],
    instrumentation: ['Full Orchestra'],
    mood: ['Energetic', 'Joyful', 'Triumphant', 'Dramatic'],
    duration: '35:00',
    acts: [
      {
        actNumber: 1,
        title: 'Symphony No. 4',
        key: 'B-flat Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: 'Beethoven\'s Symphony No. 4 in B-flat Major',
        sections: [
          {
            title: 'Symphony No. 4',
            sectionNumber: 1,
            sectionType: 'symphony',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'B-flat Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '35:00',
            tempoMarking: 'Allegro',
            description: 'Beethoven\'s Symphony No. 4 in B-flat Major',
            musicalElements: {
              mood: ['Energetic', 'Joyful', 'Triumphant'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'B-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Beethoven\'s Symphony No. 4, a work of great energy and joy, often overshadowed by his more famous symphonies.'
  },

  'lp_an-die-ferne-geliebte-song-cycle-op-98_ludwig-van-beethoven-heinrich-schlusnus': {
    identifier: 'lp_an-die-ferne-geliebte-song-cycle-op-98_ludwig-van-beethoven-heinrich-schlusnus',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 95,
    genre: ['Lieder', 'Classical', 'Vocal'],
    instrumentation: ['Piano', 'Baritone'],
    mood: ['Romantic', 'Melancholic', 'Intimate', 'Passionate'],
    duration: '20:00',
    acts: [
      {
        actNumber: 1,
        title: 'An die ferne Geliebte',
        key: 'E-flat Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Andante',
        description: 'Beethoven\'s song cycle "To the Distant Beloved"',
        sections: [
          {
            title: 'An die ferne Geliebte',
            sectionNumber: 1,
            sectionType: 'song cycle',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Andante',
            description: 'Beethoven\'s song cycle "To the Distant Beloved"',
            musicalElements: {
              mood: ['Romantic', 'Melancholic', 'Intimate'],
              instrumentation: ['Piano', 'Baritone'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'E-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Beethoven\'s song cycle "To the Distant Beloved", considered the first true song cycle in the history of music.'
  }
};
