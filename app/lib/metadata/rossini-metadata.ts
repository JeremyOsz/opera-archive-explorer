/**
 * Rossini Works Musical Metadata
 * ==============================
 * Musical metadata for Rossini operas and works in the collection
 */

import { WorkMusicalMetadata } from './types';

export const ROSSINI_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_stabat-mater_gioacchino-rossini-rias-symphonie-orchester-berlin': {
    identifier: 'lp_stabat-mater_gioacchino-rossini-rias-symphonie-orchester-berlin',
    metadataComplete: true,
    overallKey: 'C Minor',
    overallTempo: 85,
    genre: ['Sacred', 'Classical', 'Vocal'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus'],
    mood: ['Sacred', 'Solemn', 'Contemplative', 'Dramatic'],
    duration: '1:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Stabat Mater',
        key: 'C Minor',
        tempo: 85,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Andante',
        description: 'Rossini\'s sacred work for soloists, chorus and orchestra',
        sections: [
          {
            title: 'Stabat Mater',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'C Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Andante',
            description: 'Rossini\'s sacred work for soloists, chorus and orchestra',
            musicalElements: {
              mood: ['Sacred', 'Solemn', 'Contemplative'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Rossini\'s sacred masterpiece, the Stabat Mater, showcasing his mastery of both operatic and sacred music.'
  },

  'lp_elisabetta-regina-dinghilterra_gioacchino-rossini': {
    identifier: 'lp_elisabetta-regina-dinghilterra_gioacchino-rossini',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 120,
    genre: ['Opera Seria', 'Classical', 'Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Noble', 'Dramatic', 'Regal', 'Passionate'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Court Intrigue',
        key: 'D Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Allegro',
        description: 'Court intrigue and political drama',
        sections: [
          {
            title: 'Court Intrigue',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Allegro',
            description: 'Court intrigue and political drama',
            musicalElements: {
              mood: ['Noble', 'Dramatic', 'Regal'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Resolution',
        key: 'F Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Allegro',
        description: 'Resolution of the political drama',
        sections: [
          {
            title: 'Resolution',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Allegro',
            description: 'Resolution of the political drama',
            musicalElements: {
              mood: ['Triumphant', 'Noble', 'Dramatic'],
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
      melodicStyle: 'dramatic'
    },
    notes: 'Rossini\'s opera seria about Queen Elizabeth I, featuring his characteristic bel canto style and dramatic flair.'
  },

  'lp_la-cenerentola-cinderella_gioacchino-rossini-giulietta-simionato': {
    identifier: 'lp_la-cenerentola-cinderella_gioacchino-rossini-giulietta-simionato',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 130,
    genre: ['Opera Buffa', 'Classical', 'Comedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Witty', 'Charming', 'Humorous', 'Romantic'],
    duration: '2:45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Cinderella\'s Misfortune',
        key: 'C Major',
        tempo: 135,
        timeSignature: '4/4',
        duration: '85:00',
        tempoMarking: 'Allegro',
        description: 'Cinderella\'s life with her stepfamily',
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 135,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'Famous overture with its sparkling energy',
            musicalElements: {
              mood: ['Witty', 'Charming', 'Energetic'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Cinderella\'s Misfortune',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 130,
            timeSignature: '4/4',
            duration: '77:00',
            tempoMarking: 'Allegro',
            description: 'Cinderella\'s life with her stepfamily',
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
        title: 'Act II - The Ball and Transformation',
        key: 'G Major',
        tempo: 125,
        timeSignature: '4/4',
        duration: '80:00',
        tempoMarking: 'Allegro',
        description: 'The ball and Cinderella\'s transformation',
        sections: [
          {
            title: 'The Ball and Transformation',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'G Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '80:00',
            tempoMarking: 'Allegro',
            description: 'The ball and Cinderella\'s transformation',
            musicalElements: {
              mood: ['Magical', 'Romantic', 'Triumphant'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From piano to fortissimo'
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
    notes: 'Rossini\'s charming opera buffa based on the Cinderella story, featuring his signature wit and melodic invention.'
  },

  'lp_the-barber-of-seville_gioacchino-rossini-alceo-galliera-philharmonic-orchestra': {
    identifier: 'lp_the-barber-of-seville_gioacchino-rossini-alceo-galliera-philharmonic-orchestra',
    metadataComplete: true,
    overallKey: 'E Major',
    overallTempo: 140,
    genre: ['Opera Buffa', 'Classical', 'Comedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Witty', 'Energetic', 'Humorous', 'Romantic'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Figaro\'s Introduction',
        key: 'E Major',
        tempo: 145,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Allegro',
        description: 'Figaro\'s famous "Largo al factotum" and the plot to help Count Almaviva',
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E Major',
            tempo: 145,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'Famous overture with its bubbling energy',
            musicalElements: {
              mood: ['Energetic', 'Witty', 'Playful'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Figaro\'s Introduction',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'E Major',
            tempo: 140,
            timeSignature: '4/4',
            duration: '67:00',
            tempoMarking: 'Allegro',
            description: 'Figaro\'s famous "Largo al factotum" and the plot to help Count Almaviva',
            musicalElements: {
              mood: ['Witty', 'Energetic', 'Humorous'],
              instrumentation: ['Full Orchestra', 'Baritone', 'All Voices'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Disguise and Wedding',
        key: 'C Major',
        tempo: 135,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Allegro',
        description: 'The disguise plot and the wedding finale',
        sections: [
          {
            title: 'The Disguise and Wedding',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Major',
            tempo: 135,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Allegro',
            description: 'The disguise plot and the wedding finale',
            musicalElements: {
              mood: ['Triumphant', 'Joyful', 'Romantic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Crescendo to finale'
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
    notes: 'Rossini\'s masterpiece of opera buffa, featuring the famous "Largo al factotum" and brilliant ensemble writing.'
  }
};
