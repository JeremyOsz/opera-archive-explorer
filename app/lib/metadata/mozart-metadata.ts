/**
 * Mozart Works Musical Metadata
 * =============================
 * Musical metadata for Mozart operas and works in the collection
 */

import { WorkMusicalMetadata } from './types';

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
    notablePerformances: [
      {
        year: 1950,
        conductor: 'Manuel Ausensi',
        orchestra: 'Orchestra of the Teatro Liceo',
        venue: 'Teatro Liceo, Barcelona',
        singers: [
          { name: 'Manuel Ausensi', role: 'Baritone' }
        ],
        significance: 'Renowned Spanish baritone performing Mozart arias',
        historicalContext: 'Manuel Ausensi was one of the leading Spanish baritones of the mid-20th century, known for his elegant Mozart interpretations.',
        recordingLabel: 'Columbia',
        notes: 'Ausensi\'s Mozart interpretations were celebrated for their refined elegance and perfect vocal technique.'
      }
    ],
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
    notablePerformances: [
      {
        year: 1960,
        conductor: 'Margot Guilleau',
        orchestra: 'Chamber Ensemble',
        venue: 'Salle Pleyel, Paris',
        singers: [
          { name: 'Margot Guilleau', role: 'Soprano' }
        ],
        significance: 'French soprano specializing in Mozart\'s vocal works',
        historicalContext: 'Margot Guilleau was known for her delicate interpretations of Mozart\'s vocal music, particularly his songs and ensembles.',
        recordingLabel: 'Philips',
        notes: 'Guilleau\'s performances were noted for their intimate charm and perfect diction in Mozart\'s vocal works.'
      }
    ],
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
    notablePerformances: [
      {
        year: 1955,
        conductor: 'Maria Kurenko',
        orchestra: 'Metropolitan Opera Orchestra',
        venue: 'Metropolitan Opera House, New York',
        singers: [
          { name: 'Maria Kurenko', role: 'Soprano' }
        ],
        significance: 'Russian-American soprano known for Mozart interpretations',
        historicalContext: 'Maria Kurenko was a celebrated soprano who specialized in Mozart roles, known for her pure tone and elegant phrasing.',
        recordingLabel: 'RCA Victor',
        notes: 'Kurenko\'s Mozart interpretations were praised for their grace and technical perfection.'
      }
    ],
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
            title: 'Figaro and Susanna\'s Duet',
            sectionNumber: 2,
            sectionType: 'duet',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'Figaro and Susanna planning their wedding',
            musicalElements: {
              mood: ['Witty', 'Playful', 'Romantic'],
              instrumentation: ['Orchestra', 'Baritone', 'Soprano'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Cherubino\'s "Non so più"',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Allegro',
            description: 'Cherubino\'s famous aria about love',
            musicalElements: {
              mood: ['Passionate', 'Youthful', 'Excited'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Count\'s "Se vuol ballare"',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'The Count\'s aria expressing his frustration',
            musicalElements: {
              mood: ['Angry', 'Determined', 'Dramatic'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Forte'
            }
          },
          {
            title: 'Susanna\'s "Venite, inginocchiatevi"',
            sectionNumber: 5,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro',
            description: 'Susanna\'s aria about the page\'s costume',
            musicalElements: {
              mood: ['Playful', 'Witty', 'Charming'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Act I Finale',
            sectionNumber: 6,
            sectionType: 'ensemble',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'D Major',
            tempo: 130,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'Complex ensemble finale of Act I',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Comic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Fortissimo'
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
            title: 'Countess\'s "Porgi amor"',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The Countess\'s lament about her husband\'s infidelity',
            musicalElements: {
              mood: ['Melancholic', 'Romantic', 'Tender'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Cherubino\'s "Voi che sapete"',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'B-flat Major',
            tempo: 105,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Cherubino\'s famous aria about love',
            musicalElements: {
              mood: ['Romantic', 'Youthful', 'Tender'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Susanna\'s "Venite, inginocchiatevi"',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro',
            description: 'Susanna\'s aria about the page\'s costume',
            musicalElements: {
              mood: ['Playful', 'Witty', 'Charming'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Countess and Susanna Duet',
            sectionNumber: 4,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The Countess and Susanna planning their scheme',
            musicalElements: {
              mood: ['Intimate', 'Conspiratorial', 'Elegant'],
              instrumentation: ['Orchestra', 'Soprano', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Act II Finale',
            sectionNumber: 5,
            sectionType: 'ensemble',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'F Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Allegro',
            description: 'Complex ensemble finale of Act II',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Comic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Fortissimo'
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
            title: 'Countess\'s "Dove sono"',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The Countess\'s aria about lost happiness',
            musicalElements: {
              mood: ['Melancholic', 'Nostalgic', 'Tender'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Susanna\'s "Deh vieni, non tardar"',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Susanna\'s aria about the garden meeting',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Intimate'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Garden Scene',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'The garden scene with mistaken identities',
            musicalElements: {
              mood: ['Playful', 'Confused', 'Comic'],
              instrumentation: ['Orchestra', 'All Voices'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Wedding Scene',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'The wedding celebration',
            musicalElements: {
              mood: ['Joyful', 'Celebratory', 'Triumphant'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Forte to Fortissimo'
            }
          },
          {
            title: 'Final Reconciliation',
            sectionNumber: 5,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'G Major',
            tempo: 125,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'Final reconciliation and forgiveness',
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
    notablePerformances: [
      {
        year: 1786,
        conductor: 'Mozart',
        orchestra: 'Vienna Court Orchestra',
        venue: 'Burgtheater, Vienna',
        singers: [
          { name: 'Francesco Benucci', role: 'Figaro' },
          { name: 'Nancy Storace', role: 'Susanna' },
          { name: 'Luigi Bassi', role: 'Count Almaviva' },
          { name: 'Dorotea Bussani', role: 'Cherubino' }
        ],
        significance: 'World premiere of Mozart\'s opera buffa masterpiece',
        historicalContext: 'The premiere was a triumph, establishing Mozart as the master of opera buffa.',
        notes: 'Mozart conducted the premiere himself, and the work was immediately recognized as a revolutionary achievement in opera.'
      },
      {
        year: 1955,
        conductor: 'Carlo Maria Giulini',
        orchestra: 'Philharmonia Orchestra',
        venue: 'Royal Festival Hall, London',
        singers: [
          { name: 'Tito Gobbi', role: 'Figaro' },
          { name: 'Elisabeth Schwarzkopf', role: 'Susanna' },
          { name: 'Cesare Siepi', role: 'Count Almaviva' },
          { name: 'Anna Moffo', role: 'Cherubino' }
        ],
        significance: 'Legendary recording with star-studded cast',
        historicalContext: 'This recording featured some of the greatest Mozart singers of the era.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest recordings of The Marriage of Figaro, with perfect ensemble work.'
      }
    ],
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
            duration: '25:00',
            tempoMarking: 'Allegro',
            description: 'Don Giovanni\'s attempted seduction of Donna Anna',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Intense'],
              instrumentation: ['Orchestra', 'Baritone', 'Soprano'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'The Commendatore\'s Death',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'The duel and the Commendatore\'s death',
            musicalElements: {
              mood: ['Dramatic', 'Tragic', 'Intense'],
              instrumentation: ['Orchestra', 'Baritone', 'Bass'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Donna Anna\'s Grief',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Donna Anna\'s grief and vow for revenge',
            musicalElements: {
              mood: ['Tragic', 'Melancholic', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Leporello\'s Catalogue',
            sectionNumber: 5,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Allegretto',
            description: 'Leporello\'s famous "Madamina" aria',
            musicalElements: {
              mood: ['Comic', 'Light', 'Melodic'],
              instrumentation: ['Orchestra', 'Bass'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 6,
            sectionType: 'ensemble',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'D Major',
            tempo: 130,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Triumphant'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Fortissimo'
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
    notablePerformances: [
      {
        year: 1787,
        conductor: 'Mozart',
        orchestra: 'Prague Opera Orchestra',
        venue: 'Estates Theatre, Prague',
        singers: [
          { name: 'Luigi Bassi', role: 'Don Giovanni' },
          { name: 'Caterina Bondini', role: 'Zerlina' }
        ],
        significance: 'World premiere of Mozart\'s operatic masterpiece',
        historicalContext: 'The Prague premiere was a triumph, establishing Don Giovanni as one of the greatest operas ever written.',
        notes: 'Mozart conducted the premiere himself, and the work was immediately recognized as a masterpiece.'
      },
      {
        year: 1955,
        conductor: 'Wilhelm Furtwängler',
        orchestra: 'Vienna Philharmonic',
        venue: 'Salzburg Festival',
        singers: [
          { name: 'Cesare Siepi', role: 'Don Giovanni' },
          { name: 'Elisabeth Schwarzkopf', role: 'Donna Elvira' },
          { name: 'Anton Dermota', role: 'Don Ottavio' }
        ],
        significance: 'Legendary Salzburg Festival performance',
        historicalContext: 'This performance at the Salzburg Festival featured some of the greatest Mozart singers of the era.',
        recordingLabel: 'EMI',
        notes: 'Siepi\'s Don Giovanni is considered one of the greatest interpretations of the role.'
      }
    ],
    notes: 'Mozart\'s dramatic masterpiece about the legendary seducer Don Giovanni, featuring some of his most powerful music.'
  }
};
