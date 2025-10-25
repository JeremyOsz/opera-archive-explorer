/**
 * Puccini Works Musical Metadata
 * ==============================
 * Musical metadata for Puccini operas in the collection
 */

import { WorkMusicalMetadata } from './types';

export const PUCCINI_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_manon-lescaut_giacomo-puccini_4': {
    identifier: 'lp_manon-lescaut_giacomo-puccini_4',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 115,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Chorus'],
    mood: ['Passionate', 'Romantic', 'Dramatic', 'Tragic'],
    duration: '2:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Des Grieux and Manon Meet',
        key: 'D Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: "Opening act introducing Des Grieux and Manon",
        sections: [
          {
            title: 'Overture',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: "Orchestral introduction setting the romantic tone",
            musicalElements: {
              mood: ['Passionate', 'Lyrical'],
              instrumentation: ['Orchestra'],
              dynamics: 'Marked'
            }
          },
          {
            title: 'Des Grieux and Manon Meet',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: "Opening scene introducing Des Grieux and Manon",
            musicalElements: {
              mood: ['Passionate', 'Lyrical'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Marked'
            }
          },
          {
            title: 'Des Grieux\'s "Donna non vidi mai"',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: "Des Grieux's famous aria 'I have never seen such a woman'",
            musicalElements: {
              mood: ['Romantic', 'Passionate', 'Lyrical'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Manon\'s "In quelle trine morbide"',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante',
            description: "Manon's aria about her luxurious surroundings",
            musicalElements: {
              mood: ['Melancholic', 'Nostalgic', 'Tender'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Manon in Luxury',
        key: 'A Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Andante',
        description: 'Manon in luxury, reunion with Des Grieux',
        sections: [
          {
            title: 'Manon in Luxury',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Andante',
            description: 'Manon in luxury, reunion with Des Grieux',
            musicalElements: {
              mood: ['Romantic', 'Melancholic'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone'],
              dynamics: 'Varied'
            }
          },
          {
            title: 'Des Grieux\'s "Ah, Manon, mi tradisce"',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: "Des Grieux's aria about Manon's betrayal",
            musicalElements: {
              mood: ['Angry', 'Passionate', 'Dramatic'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Forte to Fortissimo'
            }
          },
          {
            title: 'Manon\'s "Sola, perduta, abbandonata"',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'A Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Andante Sostenuto',
            description: "Manon's aria about being alone and abandoned",
            musicalElements: {
              mood: ['Tragic', 'Melancholic', 'Poignant'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Gambling Scene',
        key: 'G Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Allegro Moderato',
        description: 'Gambling scene and arrest',
        sections: [
          {
            title: 'Gambling Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro Moderato',
            description: 'Gambling scene and arrest',
            musicalElements: {
              mood: ['Dramatic', 'Tense'],
              instrumentation: ['Full Orchestra', 'Chorus', 'Soloists'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Manon\'s Arrest',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'Manon\'s arrest and Des Grieux\'s despair',
            musicalElements: {
              mood: ['Dramatic', 'Tragic', 'Intense'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Des Grieux\'s "No, pazzo son!"',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 115,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Allegro',
            description: "Des Grieux's aria of despair and madness",
            musicalElements: {
              mood: ['Desperate', 'Mad', 'Tragic'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Forte to Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - Manon\'s Death',
        key: 'D Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante Sostenuto',
        description: 'Tragic ending - Manon dying in Des Grieux arms',
        sections: [
          {
            title: 'Manon\'s Death Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Andante Sostenuto',
            description: 'Tragic ending - Manon dying in Des Grieux arms',
            musicalElements: {
              mood: ['Tragic', 'Melancholic', 'Poignant'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Pianissimo to Forte'
            }
          },
          {
            title: 'Manon\'s Final Aria',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante Sostenuto',
            description: "Manon's final aria before death",
            musicalElements: {
              mood: ['Tragic', 'Heartbreaking', 'Poignant'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Des Grieux\'s Final Lament',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante Sostenuto',
            description: "Des Grieux's final lament over Manon's death",
            musicalElements: {
              mood: ['Devastating', 'Tragic', 'Heartbreaking'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Pianissimo to Forte'
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
    notablePerformances: [
      {
        year: 1893,
        conductor: 'Alessandro Pomè',
        orchestra: 'Teatro Regio Orchestra',
        venue: 'Teatro Regio, Turin',
        singers: [
          { name: 'Cesira Ferrani', role: 'Manon Lescaut' },
          { name: 'Giuseppe Cremonini', role: 'Des Grieux' }
        ],
        significance: 'World premiere of Puccini\'s first major success',
        historicalContext: 'This was Puccini\'s breakthrough opera, establishing him as a major composer in the verismo tradition.',
        notes: 'The premiere was a triumph and marked Puccini\'s emergence as a leading Italian composer.'
      },
      {
        year: 1954,
        conductor: 'Tullio Serafin',
        orchestra: 'Orchestra of La Scala',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Maria Callas', role: 'Manon Lescaut' },
          { name: 'Giuseppe Di Stefano', role: 'Des Grieux' }
        ],
        significance: 'Legendary Callas performance that revived interest in the work',
        historicalContext: 'Callas\'s interpretation of Manon Lescaut became one of her most celebrated roles, showcasing her dramatic intensity.',
        recordingLabel: 'EMI',
        notes: 'This performance is considered one of the greatest recordings of the opera.'
      }
    ],
    notes: 'One of Puccini\'s early masterpieces. The score shows Wagnerian influences with lush orchestration.'
  },

  'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1': {
    identifier: 'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 110,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Mezzo-Soprano', 'Chorus'],
    mood: ['Passionate', 'Exotic', 'Tragic', 'Poignant'],
    duration: '2:20:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Wedding Ceremony',
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Wedding ceremony and first meeting',
        sections: [
          {
            title: 'Overture - Japanese Themes',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'Orchestral introduction with Japanese musical elements',
            musicalElements: {
              mood: ['Exotic', 'Mystical'],
              instrumentation: ['Orchestra with Eastern touches'],
              dynamics: 'Vivid'
            }
          },
          {
            title: 'Wedding Ceremony',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Allegro',
            description: 'Wedding ceremony and first meeting',
            musicalElements: {
              mood: ['Exotic', 'Joyous', 'Passionate'],
              instrumentation: ['Orchestra with Eastern touches', 'Soprano', 'Tenor', 'Baritone'],
              dynamics: 'Vivid'
            }
          },
          {
            title: 'Pinkerton\'s "Dovunque al mondo"',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: "Pinkerton's aria about his carefree attitude",
            musicalElements: {
              mood: ['Carefree', 'Confident', 'Romantic'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Butterfly\'s Entrance',
            sectionNumber: 4,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante',
            description: 'Butterfly\'s entrance and first meeting with Pinkerton',
            musicalElements: {
              mood: ['Exotic', 'Delicate', 'Romantic'],
              instrumentation: ['Orchestra with Eastern touches', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Butterfly\'s Vigil',
        key: 'A Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Butterfly\'s vigil - "Un bel dì vedremo" aria',
        sections: [
          {
            title: 'Butterfly\'s Vigil',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Andante',
            description: 'Butterfly\'s vigil and waiting for Pinkerton',
            musicalElements: {
              mood: ['Hopeful', 'Melancholic', 'Lyrically Dramatic'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano'],
              dynamics: 'Subtle to Powerful'
            }
          },
          {
            title: 'Un bel dì vedremo',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'A Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: "Butterfly's famous aria 'One fine day we shall see'",
            musicalElements: {
              mood: ['Hopeful', 'Romantic', 'Dreamy'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Humming Chorus',
            sectionNumber: 3,
            sectionType: 'chorus',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Andante Sostenuto',
            description: 'The famous humming chorus as Butterfly waits',
            musicalElements: {
              mood: ['Mystical', 'Ethereal', 'Melancholic'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Pianissimo to Mezzo-piano'
            }
          },
          {
            title: 'Butterfly\'s Despair',
            sectionNumber: 4,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Butterfly\'s growing despair and loneliness',
            musicalElements: {
              mood: ['Despairing', 'Lonely', 'Melancholic'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Tragic Finale',
        key: 'D Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Moderato',
        description: 'Pinkerton returns with American wife, Butterfly\'s suicide',
        sections: [
          {
            title: 'Pinkerton\'s Return',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Moderato',
            description: 'Pinkerton returns with his American wife',
            musicalElements: {
              mood: ['Dramatic', 'Tense', 'Foreboding'],
              instrumentation: ['Orchestra', 'Tenor', 'Soprano', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Butterfly\'s Discovery',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'Butterfly discovers Pinkerton\'s betrayal',
            musicalElements: {
              mood: ['Devastating', 'Tragic', 'Heartbreaking'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Mezzo-Soprano'],
              dynamics: 'Forte to Fortissimo'
            }
          },
          {
            title: 'Butterfly\'s Suicide',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante Sostenuto',
            description: 'Butterfly\'s tragic suicide',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Poignant'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'Pianissimo to Forte'
            }
          },
          {
            title: 'Final Lament',
            sectionNumber: 4,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante Sostenuto',
            description: 'The final lament and Pinkerton\'s grief',
            musicalElements: {
              mood: ['Devastating', 'Tragic', 'Heartbreaking'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From Whispered to Forte'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1904,
        conductor: 'Cleofonte Campanini',
        orchestra: 'La Scala Orchestra',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Rosina Storchio', role: 'Cio-Cio-San (Butterfly)' },
          { name: 'Giovanni Zenatello', role: 'Pinkerton' }
        ],
        significance: 'World premiere that initially failed but became a masterpiece',
        historicalContext: 'The premiere was a disaster due to poor preparation, but Puccini revised the work and it became one of his greatest successes.',
        notes: 'The original version was in two acts; Puccini later split it into three acts for better dramatic flow.'
      },
      {
        year: 1955,
        conductor: 'Dimitri Mitropoulos',
        orchestra: 'Metropolitan Opera Orchestra',
        venue: 'Metropolitan Opera, New York',
        singers: [
          { name: 'Dorothy Kirsten', role: 'Cio-Cio-San (Butterfly)' },
          { name: 'Richard Tucker', role: 'Pinkerton' }
        ],
        significance: 'Historic Metropolitan Opera performance',
        historicalContext: 'This performance showcased the work\'s popularity in America and featured one of the great Butterfly interpreters.',
        recordingLabel: 'Columbia',
        notes: 'Kirsten was renowned for her portrayal of Butterfly, bringing both vocal beauty and dramatic intensity to the role.'
      },
      {
        year: 1974,
        conductor: 'Herbert von Karajan',
        orchestra: 'Vienna Philharmonic',
        venue: 'Salzburg Festival',
        singers: [
          { name: 'Mirella Freni', role: 'Cio-Cio-San (Butterfly)' },
          { name: 'Luciano Pavarotti', role: 'Pinkerton' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording is considered one of the finest interpretations of the work, featuring two of the greatest voices of the era.',
        recordingLabel: 'Decca',
        notes: 'Freni\'s Butterfly is considered definitive, combining vocal perfection with deep emotional understanding of the character.'
      }
    ],
    notes: 'Puccini\'s exotic masterpiece inspired by Japanese themes. Features the famous "Humming Chorus" and Butterfly\'s aria "Un bel dì vedremo".'
  },

  'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d': {
    identifier: 'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 120,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Mezzo-Soprano', 'Bass'],
    mood: ['Romantic', 'Melancholic', 'Joyful', 'Tragic'],
    duration: '2:00:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Garret (Christmas Eve)',
        key: 'C Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Allegro',
        description: 'The bohemian artists in their cold garret on Christmas Eve',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'Rodolfo and Marcello working in the cold garret',
            musicalElements: {
              mood: ['Melancholic', 'Comic'],
              instrumentation: ['Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Che gelida manina',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Rodolfo\'s famous aria "Your tiny hand is frozen"',
            musicalElements: {
              mood: ['Romantic', 'Lyrical'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Sì, mi chiamano Mimì',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Mimì\'s aria "Yes, they call me Mimì"',
            musicalElements: {
              mood: ['Romantic', 'Delicate'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'O soave fanciulla',
            sectionNumber: 4,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 105,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Andante',
            description: 'Rodolfo and Mimì\'s love duet',
            musicalElements: {
              mood: ['Romantic', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Mezzo-forte to Forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Café Momus (Christmas Eve)',
        key: 'D Major',
        tempo: 130,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Allegro Vivace',
        description: 'The bustling Café Momus scene with Musetta\'s waltz',
        sections: [
          {
            title: 'Café Momus Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Major',
            tempo: 130,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro Vivace',
            description: 'The bustling street scene with vendors and crowds',
            musicalElements: {
              mood: ['Joyful', 'Energetic', 'Festive'],
              instrumentation: ['Full Orchestra', 'Chorus', 'All Soloists'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Quando m\'en vo',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 120,
            timeSignature: '3/4',
            duration: '5:00',
            tempoMarking: 'Moderato',
            description: 'Musetta\'s famous waltz "When I go along"',
            musicalElements: {
              mood: ['Coquettish', 'Charming'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 3,
            sectionType: 'ensemble',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'D Major',
            tempo: 140,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'The grand ensemble finale with all characters',
            musicalElements: {
              mood: ['Triumphant', 'Joyful'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Barrière d\'Enfer (February)',
        key: 'E Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Andante',
        description: 'The snow scene where Mimì and Rodolfo part',
        sections: [
          {
            title: 'Snow Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'E Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The atmospheric snow scene',
            musicalElements: {
              mood: ['Melancholic', 'Cold', 'Desolate'],
              instrumentation: ['Orchestra'],
              dynamics: 'Piano to Mezzo-piano'
            }
          },
          {
            title: 'Mimì and Rodolfo Duet',
            sectionNumber: 2,
            sectionType: 'duet',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'E Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Andante Sostenuto',
            description: 'The emotional parting scene between Mimì and Rodolfo',
            musicalElements: {
              mood: ['Tragic', 'Heartbreaking', 'Poignant'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Forte'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - The Garret (Spring)',
        key: 'C Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Allegro',
        description: 'Mimì\'s death scene in the garret',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'The bohemians in their garret, trying to be cheerful',
            musicalElements: {
              mood: ['Melancholic', 'Forced Cheer'],
              instrumentation: ['Orchestra', 'All Soloists'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Mimì\'s Return',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Mimì returns, dying, to the garret',
            musicalElements: {
              mood: ['Tragic', 'Heartbreaking'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Death Scene',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante Sostenuto',
            description: 'Mimì\'s death and the final farewell',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Poignant'],
              instrumentation: ['Orchestra', 'All Voices'],
              dynamics: 'Pianissimo to Forte'
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
        year: 1896,
        conductor: 'Arturo Toscanini',
        orchestra: 'Teatro Regio Orchestra',
        venue: 'Teatro Regio, Turin',
        singers: [
          { name: 'Evan Gorga', role: 'Rodolfo' },
          { name: 'Cesira Ferrani', role: 'Mimì' },
          { name: 'Antonio Pini-Corsi', role: 'Marcello' },
          { name: 'Camilla Pasini', role: 'Musetta' }
        ],
        significance: 'World premiere of Puccini\'s beloved opera',
        historicalContext: 'This premiere established La Bohème as one of the most popular operas ever written, despite initial mixed reviews.',
        notes: 'Toscanini was only 29 when he conducted this premiere, beginning his legendary career.'
      },
      {
        year: 1956,
        conductor: 'Thomas Beecham',
        orchestra: 'Royal Philharmonic Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Jussi Björling', role: 'Rodolfo' },
          { name: 'Victoria de los Ángeles', role: 'Mimì' },
          { name: 'Robert Merrill', role: 'Marcello' },
          { name: 'Lucine Amara', role: 'Musetta' }
        ],
        significance: 'Legendary recording considered definitive',
        historicalContext: 'This recording features some of the greatest voices of the era in their prime.',
        recordingLabel: 'EMI',
        notes: 'Björling\'s Rodolfo and de los Ángeles\' Mimì are considered among the finest interpretations ever recorded.'
      }
    ],
    notes: 'Puccini\'s beloved opera about bohemian artists in Paris. Features some of the most famous arias in opera, including "Che gelida manina" and "Sì, mi chiamano Mimì".'
  }
};
