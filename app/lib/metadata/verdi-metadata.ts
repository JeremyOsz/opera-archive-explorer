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
  },

  'lp_requiem_giuseppe-verdi-igor-markevitch-moscow-p': {
    identifier: 'lp_requiem_giuseppe-verdi-igor-markevitch-moscow-p',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 100,
    genre: ['Requiem', 'Sacred Music', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Bass', 'Chorus'],
    mood: ['Solemn', 'Dramatic', 'Tragic', 'Transcendent'],
    duration: '1:25:00',
    acts: [
      {
        actNumber: 1,
        title: 'I. Requiem aeternam',
        key: 'D Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '8:00',
        tempoMarking: 'Andante',
        description: 'Opening prayer for eternal rest',
        sections: [
          {
            title: 'Requiem aeternam',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Andante',
            description: 'Chorus prayer for eternal rest',
            musicalElements: {
              mood: ['Solemn', 'Prayerful', 'Contemplative'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Kyrie eleison',
            sectionNumber: 2,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Andante',
            description: 'Lord have mercy - fugal treatment',
            musicalElements: {
              mood: ['Supplicating', 'Contrapuntal', 'Solemn'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Mezzo-forte to Forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'II. Dies irae',
        key: 'D Minor',
        tempo: 120,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro Agitato',
        description: 'Day of wrath - the most dramatic section',
        sections: [
          {
            title: 'Dies irae',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro Agitato',
            description: 'The famous "Day of wrath" opening',
            musicalElements: {
              mood: ['Terrifying', 'Dramatic', 'Apocalyptic'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Tuba mirum',
            sectionNumber: 2,
            sectionType: 'chorus',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B-flat Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'The trumpet shall sound',
            musicalElements: {
              mood: ['Majestic', 'Triumphant', 'Overwhelming'],
              instrumentation: ['Brass', 'Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Liber scriptus',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Mezzo-soprano aria "The written book"',
            musicalElements: {
              mood: ['Dramatic', 'Solemn', 'Foreboding'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Quid sum miser',
            sectionNumber: 4,
            sectionType: 'trio',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Andante',
            description: 'Trio "What shall I, a wretch, say"',
            musicalElements: {
              mood: ['Supplicating', 'Tender', 'Melancholic'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Rex tremendae',
            sectionNumber: 5,
            sectionType: 'chorus',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Andante',
            description: 'Chorus "King of tremendous majesty"',
            musicalElements: {
              mood: ['Majestic', 'Awe-inspiring', 'Powerful'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Recordare',
            sectionNumber: 6,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'B-flat Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante',
            description: 'Duet "Remember, gentle Jesus"',
            musicalElements: {
              mood: ['Tender', 'Supplicating', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'III. Offertorium',
        key: 'B-flat Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '12:00',
        tempoMarking: 'Andante',
        description: 'Offertory - Domine Jesu Christe',
        sections: [
          {
            title: 'Domine Jesu Christe',
            sectionNumber: 1,
            sectionType: 'quartet',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Quartet "Lord Jesus Christ"',
            musicalElements: {
              mood: ['Supplicating', 'Beautiful', 'Contemplative'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Bass'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Hostias',
            sectionNumber: 2,
            sectionType: 'chorus',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Andante',
            description: 'Chorus "We offer you, Lord"',
            musicalElements: {
              mood: ['Prayerful', 'Solemn', 'Reverent'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'IV. Sanctus',
        key: 'D Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '5:00',
        tempoMarking: 'Allegro',
        description: 'Sanctus - double fugue',
        sections: [
          {
            title: 'Sanctus',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '3:00',
            tempoMarking: 'Allegro',
            description: 'Double fugue "Holy, holy, holy"',
            musicalElements: {
              mood: ['Triumphant', 'Joyful', 'Exultant'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Benedictus',
            sectionNumber: 2,
            sectionType: 'quartet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '2:00',
            tempoMarking: 'Andante',
            description: 'Quartet "Blessed is he"',
            musicalElements: {
              mood: ['Blessed', 'Tender', 'Peaceful'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano', 'Tenor', 'Bass'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 5,
        title: 'V. Agnus Dei',
        key: 'A Minor',
        tempo: 85,
        timeSignature: '4/4',
        duration: '8:00',
        tempoMarking: 'Andante',
        description: 'Lamb of God - canonic treatment',
        sections: [
          {
            title: 'Agnus Dei',
            sectionNumber: 1,
            sectionType: 'duet',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'A Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Duet "Lamb of God" in canon',
            musicalElements: {
              mood: ['Supplicating', 'Beautiful', 'Contemplative'],
              instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 6,
        title: 'VI. Lux aeterna',
        key: 'F Major',
        tempo: 80,
        timeSignature: '4/4',
        duration: '6:00',
        tempoMarking: 'Andante',
        description: 'Eternal light - trio',
        sections: [
          {
            title: 'Lux aeterna',
            sectionNumber: 1,
            sectionType: 'trio',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Trio "Eternal light shine upon them"',
            musicalElements: {
              mood: ['Serene', 'Peaceful', 'Transcendent'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano', 'Tenor', 'Bass'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 7,
        title: 'VII. Libera me',
        key: 'D Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '15:00',
        tempoMarking: 'Andante',
        description: 'Deliver me - soprano solo with chorus',
        sections: [
          {
            title: 'Libera me',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Soprano aria "Deliver me, Lord"',
            musicalElements: {
              mood: ['Supplicating', 'Dramatic', 'Solemn'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Dies irae (reprise)',
            sectionNumber: 2,
            sectionType: 'chorus',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro Agitato',
            description: 'Reprise of Dies irae theme',
            musicalElements: {
              mood: ['Terrifying', 'Dramatic', 'Apocalyptic'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Requiem aeternam (finale)',
            sectionNumber: 3,
            sectionType: 'chorus',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '3:00',
            tempoMarking: 'Andante',
            description: 'Final prayer for eternal rest',
            musicalElements: {
              mood: ['Solemn', 'Peaceful', 'Transcendent'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Piano to Mezzo-forte'
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
        year: 1874,
        conductor: 'Giuseppe Verdi',
        orchestra: 'Orchestra of La Scala',
        venue: 'San Marco, Milan',
        singers: [
          { name: 'Teresa Stolz', role: 'Soprano' },
          { name: 'Maria Waldmann', role: 'Mezzo-Soprano' },
          { name: 'Giuseppe Capponi', role: 'Tenor' },
          { name: 'Orlando Maini', role: 'Bass' }
        ],
        significance: 'World premiere of Verdi\'s Requiem',
        historicalContext: 'Composed in memory of Alessandro Manzoni, the great Italian poet and novelist.',
        notes: 'Verdi conducted the premiere himself. The work was immediately recognized as a masterpiece.'
      },
      {
        year: 1961,
        conductor: 'Igor Markevitch',
        orchestra: 'Moscow Philharmonic Orchestra',
        venue: 'Moscow',
        singers: [
          { name: 'Государственный Академический Русский Хор Им. А. В. Свешникова', role: 'Chorus' }
        ],
        significance: 'Soviet recording of Verdi\'s Requiem',
        historicalContext: 'This recording represents the Soviet approach to Western classical music during the Cold War era.',
        recordingLabel: 'Melodiya',
        notes: 'A powerful interpretation that emphasizes the dramatic and operatic qualities of the work.'
      }
    ],
    notes: 'Verdi\'s only major sacred work, written in memory of Alessandro Manzoni. Combines operatic drama with sacred solemnity. The Dies irae is one of the most dramatic moments in all music.'
  },

  'lp_otello_giuseppe-verdi-carlo-maria-guichandut-c': {
    identifier: 'lp_otello_giuseppe-verdi-carlo-maria-guichandut-c',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 110,
    genre: ['Opera', 'Romantic', 'Classical', 'Tragedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Passionate', 'Jealous'],
    duration: '2:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Storm Scene',
        key: 'D Minor',
        tempo: 120,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Allegro Agitato',
        description: 'Opening storm scene and Otello\'s arrival',
        sections: [
          {
            title: 'Storm Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro Agitato',
            description: 'The famous storm that opens the opera',
            musicalElements: {
              mood: ['Stormy', 'Dramatic', 'Turbulent'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Esultate!',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro',
            description: 'Otello\'s triumphant entrance "Rejoice!"',
            musicalElements: {
              mood: ['Triumphant', 'Heroic', 'Victorious'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Fuoco di gioia',
            sectionNumber: 3,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Allegro',
            description: 'Chorus "Fire of joy" celebrating victory',
            musicalElements: {
              mood: ['Joyful', 'Celebratory', 'Festive'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Otello and Desdemona Duet',
            sectionNumber: 4,
            sectionType: 'duet',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante',
            description: 'The famous love duet "Gia nella notte densa"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Iago\'s Poison',
        key: 'F Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Andante',
        description: 'Iago begins his manipulation and the Credo',
        sections: [
          {
            title: 'Iago\'s Credo',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Iago\'s famous "Credo in un Dio crudel"',
            musicalElements: {
              mood: ['Evil', 'Cynical', 'Malicious'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Iago and Cassio Scene',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'Iago manipulates Cassio and plants seeds of doubt',
            musicalElements: {
              mood: ['Suspicious', 'Manipulative', 'Deceitful'],
              instrumentation: ['Orchestra', 'Baritone', 'Tenor'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Desdemona\'s Intercession',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Desdemona pleads for Cassio',
            musicalElements: {
              mood: ['Innocent', 'Pleading', 'Tender'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Iago\'s Poison',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 105,
            timeSignature: '4/4',
            duration: '9:00',
            tempoMarking: 'Andante',
            description: 'Iago\'s "Era la notte" - planting the seed of jealousy',
            musicalElements: {
              mood: ['Malicious', 'Insidious', 'Manipulative'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Handkerchief',
        key: 'G Minor',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'The handkerchief scene and Otello\'s growing jealousy',
        sections: [
          {
            title: 'The Handkerchief Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 115,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'The crucial handkerchief scene',
            musicalElements: {
              mood: ['Suspicious', 'Jealous', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Dio! mi potevi scagliar',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Otello\'s aria "God, you could have struck me"',
            musicalElements: {
              mood: ['Anguished', 'Desperate', 'Tragic'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Iago and Otello Duet',
            sectionNumber: 3,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'Iago and Otello plan revenge',
            musicalElements: {
              mood: ['Malicious', 'Revengeful', 'Dramatic'],
              instrumentation: ['Orchestra', 'Baritone', 'Tenor'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Ensemble Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - The Murder',
        key: 'E Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Andante',
        description: 'Desdemona\'s Willow Song and the tragic finale',
        sections: [
          {
            title: 'Willow Song',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'E Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Desdemona\'s "Salce, salce" - the Willow Song',
            musicalElements: {
              mood: ['Melancholic', 'Foreboding', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Ave Maria',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Desdemona\'s prayer "Ave Maria"',
            musicalElements: {
              mood: ['Prayerful', 'Solemn', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'The Murder Scene',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'E Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Allegro',
            description: 'Otello murders Desdemona',
            musicalElements: {
              mood: ['Tragic', 'Violent', 'Devastating'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'E Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '9:00',
            tempoMarking: 'Andante',
            description: 'Otello\'s suicide and the tragic ending',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Final'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Piano to Fortissimo'
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
        year: 1887,
        conductor: 'Franco Faccio',
        orchestra: 'Orchestra of La Scala',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Francesco Tamagno', role: 'Otello' },
          { name: 'Romilda Pantaleoni', role: 'Desdemona' },
          { name: 'Victor Maurel', role: 'Iago' }
        ],
        significance: 'World premiere of Verdi\'s Otello',
        historicalContext: 'Verdi\'s return to opera after a 16-year hiatus. This was his first collaboration with librettist Arrigo Boito.',
        notes: 'The premiere was a triumph, establishing Otello as one of Verdi\'s greatest masterpieces.'
      },
      {
        year: 1957,
        conductor: 'Franco Capuana',
        orchestra: 'Orchestra Sinfonica Di Torino Della RAI',
        venue: 'Turin',
        singers: [
          { name: 'Carlo Maria Guichandut', role: 'Otello' },
          { name: 'Cesy Broggini', role: 'Desdemona' },
          { name: 'Giuseppe Taddei', role: 'Iago' }
        ],
        significance: 'RAI recording of Otello',
        historicalContext: 'This recording represents the Italian operatic tradition in the mid-20th century.',
        recordingLabel: 'RAI',
        notes: 'A powerful interpretation featuring Italian singers in their prime.'
      }
    ],
    notes: 'Verdi\'s penultimate opera, based on Shakespeare\'s Othello. Features some of his most sophisticated orchestration and psychological depth. The love duet and Iago\'s Credo are among the greatest moments in opera.'
  },

  'lp_la-forza-del-destino_dimitri-mitropoulos-giuseppe-verdi-rena': {
    identifier: 'lp_la-forza-del-destino_dimitri-mitropoulos-giuseppe-verdi-rena',
    metadataComplete: true,
    overallKey: 'F Minor',
    overallTempo: 105,
    genre: ['Opera', 'Romantic', 'Classical', 'Tragedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Mezzo-Soprano', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Fateful', 'Passionate'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Marquis\'s Palace',
        key: 'F Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante',
        description: 'Leonora and Alvaro\'s love, the fatal accident',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Leonora and Alvaro plan to elope',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Anxious'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'The Fatal Accident',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'F Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'Alvaro accidentally kills the Marquis',
            musicalElements: {
              mood: ['Dramatic', 'Tragic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Leonora\'s Soliloquy',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Andante',
            description: 'Leonora reflects on her fate',
            musicalElements: {
              mood: ['Melancholic', 'Reflective', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Monastery',
        key: 'C Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Andante',
        description: 'Leonora seeks refuge in a monastery',
        sections: [
          {
            title: 'Leonora\'s Arrival',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Leonora arrives at the monastery seeking refuge',
            musicalElements: {
              mood: ['Solemn', 'Prayerful', 'Contemplative'],
              instrumentation: ['Orchestra', 'Soprano', 'Bass'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Padre Guardiano\'s Aria',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The Father Guardian\'s aria about mercy',
            musicalElements: {
              mood: ['Solemn', 'Compassionate', 'Wise'],
              instrumentation: ['Orchestra', 'Bass'],
              dynamics: 'Mezzo-forte'
            }
          },
          {
            title: 'Leonora\'s Vow',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Leonora takes her vow of seclusion',
            musicalElements: {
              mood: ['Solemn', 'Committed', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Andante',
            description: 'The act finale with chorus',
            musicalElements: {
              mood: ['Solemn', 'Prayerful', 'Peaceful'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Mezzo-forte'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The War',
        key: 'D Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Alvaro and Carlo meet in war, Alvaro saves Carlo',
        sections: [
          {
            title: 'War Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Allegro',
            description: 'The battlefield scene',
            musicalElements: {
              mood: ['Heroic', 'Dramatic', 'Turbulent'],
              instrumentation: ['Full Orchestra', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Alvaro and Carlo Duet',
            sectionNumber: 2,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Andante',
            description: 'Alvaro and Carlo become friends',
            musicalElements: {
              mood: ['Brotherly', 'Heroic', 'Dramatic'],
              instrumentation: ['Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Alvaro\'s Aria',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Alvaro reflects on his fate',
            musicalElements: {
              mood: ['Melancholic', 'Reflective', 'Dramatic'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'The act finale',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - The Monastery Again',
        key: 'F Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Andante',
        description: 'The tragic finale at the monastery',
        sections: [
          {
            title: 'Leonora\'s Solitude',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Leonora in her solitude',
            musicalElements: {
              mood: ['Melancholic', 'Lonely', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'The Confrontation',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'F Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'Carlo finds Leonora and demands revenge',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          },
          {
            title: 'Leonora\'s Death',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'F Minor',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Leonora\'s tragic death',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Final'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'The tragic finale with all characters',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Final'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Piano to Fortissimo'
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
    notablePerformances: [
      {
        year: 1862,
        conductor: 'Giuseppe Verdi',
        orchestra: 'Orchestra of the Bolshoi Theatre',
        venue: 'Bolshoi Theatre, St. Petersburg',
        singers: [
          { name: 'Caroline Barbot', role: 'Leonora' },
          { name: 'Enrico Tamberlik', role: 'Alvaro' },
          { name: 'Francesco Graziani', role: 'Carlo' }
        ],
        significance: 'World premiere of La Forza del Destino',
        historicalContext: 'Commissioned by the Imperial Theatre in St. Petersburg, this was Verdi\'s first opera for the Russian market.',
        notes: 'The premiere was successful, though Verdi later revised the work for the Italian premiere in 1869.'
      },
      {
        year: 1953,
        conductor: 'Dimitri Mitropoulos',
        orchestra: 'Orchestra of La Scala',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Renata Tebaldi', role: 'Leonora' },
          { name: 'Mario del Monaco', role: 'Alvaro' },
          { name: 'Aldo Protti', role: 'Carlo' },
          { name: 'Cesare Siepi', role: 'Padre Guardiano' },
          { name: 'Fedora Barbieri', role: 'Preziosilla' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording features some of the greatest Italian singers of the mid-20th century.',
        recordingLabel: 'Decca',
        notes: 'Tebaldi\'s Leonora is considered definitive, combining vocal perfection with deep emotional understanding.'
      }
    ],
    notes: 'Verdi\'s opera about the power of fate and destiny. Features the famous "Pace, pace, mio Dio" aria and the dramatic overture. One of his most psychologically complex works.'
  },

  'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte': {
    identifier: 'lp_verdi-la-traviata_victoria-de-los-angeles-carlo-del-monte',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 100,
    genre: ['Opera', 'Romantic', 'Classical', 'Tragedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Romantic', 'Tragic', 'Passionate', 'Melancholic'],
    duration: '2:20:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Party',
        key: 'E-flat Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: 'Violetta\'s party and meeting with Alfredo',
        sections: [
          {
            title: 'Prelude',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '3:00',
            tempoMarking: 'Allegro',
            description: 'The famous prelude with the love theme',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Melancholic'],
              instrumentation: ['Orchestra'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Brindisi',
            sectionNumber: 2,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'B-flat Major',
            tempo: 120,
            timeSignature: '3/8',
            duration: '4:00',
            tempoMarking: 'Allegretto',
            description: 'The famous drinking song "Libiamo ne\' lieti calici"',
            musicalElements: {
              mood: ['Joyful', 'Celebratory', 'Festive'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Chorus'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Violetta and Alfredo Duet',
            sectionNumber: 3,
            sectionType: 'duet',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The love duet "Un dì, felice, eterea"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Violetta\'s Aria',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Andante',
            description: 'Violetta\'s "Ah, fors\'è lui" and "Sempre libera"',
            musicalElements: {
              mood: ['Romantic', 'Dramatic', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 5,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Festive', 'Joyful', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Mezzo-forte to Forte'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Country House',
        key: 'A Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Andante',
        description: 'Violetta and Alfredo\'s happiness, Germont\'s intervention',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Violetta and Alfredo in their country house',
            musicalElements: {
              mood: ['Romantic', 'Peaceful', 'Happy'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Germont\'s Aria',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Germont\'s "Di Provenza il mar"',
            musicalElements: {
              mood: ['Nostalgic', 'Tender', 'Melancholic'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Violetta and Germont Duet',
            sectionNumber: 3,
            sectionType: 'duet',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '12:00',
            tempoMarking: 'Andante',
            description: 'The crucial duet where Germont convinces Violetta to leave',
            musicalElements: {
              mood: ['Dramatic', 'Emotional', 'Tragic'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Violetta\'s Letter Scene',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Violetta writes her farewell letter',
            musicalElements: {
              mood: ['Melancholic', 'Tragic', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 5,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'A Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '7:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Death Scene',
        key: 'E-flat Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante',
        description: 'Violetta\'s death scene and reconciliation with Alfredo',
        sections: [
          {
            title: 'Violetta\'s Death Scene',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Violetta\'s "Addio del passato"',
            musicalElements: {
              mood: ['Melancholic', 'Tragic', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Alfredo\'s Return',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Alfredo returns and they reconcile',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Final Duet',
            sectionNumber: 3,
            sectionType: 'duet',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The final love duet "Parigi, o cara"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Tragic'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Violetta\'s Death',
            sectionNumber: 4,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Andante',
            description: 'Violetta\'s tragic death',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Final'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Forte'
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
    notablePerformances: [
      {
        year: 1853,
        conductor: 'Giuseppe Verdi',
        orchestra: 'Orchestra of La Fenice',
        venue: 'Teatro La Fenice, Venice',
        singers: [
          { name: 'Fanny Salvini-Donatelli', role: 'Violetta' },
          { name: 'Lodovico Graziani', role: 'Alfredo' },
          { name: 'Felice Varesi', role: 'Germont' }
        ],
        significance: 'World premiere of La Traviata',
        historicalContext: 'The premiere was a failure due to casting issues and the contemporary setting. Verdi revised the work for a successful revival in 1854.',
        notes: 'Despite the initial failure, La Traviata became one of Verdi\'s most popular operas.'
      },
      {
        year: 1960,
        conductor: 'Tullio Serafin',
        orchestra: 'Orchestra Del Teatro Dell\'Opera Di Roma',
        venue: 'Rome',
        singers: [
          { name: 'Victoria De Los Angeles', role: 'Violetta' },
          { name: 'Carlo Del Monte', role: 'Alfredo' },
          { name: 'Mario Sereni', role: 'Germont' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording features some of the greatest singers of the mid-20th century.',
        recordingLabel: 'EMI',
        notes: 'De Los Angeles\'s Violetta is considered definitive, combining vocal perfection with deep emotional understanding.'
      }
    ],
    notes: 'Verdi\'s masterpiece based on Dumas\'s "La Dame aux Camélias". Features the famous "Brindisi" drinking song and Violetta\'s coloratura aria. One of the most popular operas in the repertoire.'
  },

  'lp_il-trovatore_giuseppe-verdi-giacomo-lauri-volpi-cate': {
    identifier: 'lp_il-trovatore_giuseppe-verdi-giacomo-lauri-volpi-cate',
    metadataComplete: true,
    overallKey: 'C Minor',
    overallTempo: 110,
    genre: ['Opera', 'Romantic', 'Classical', 'Tragedy'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Mezzo-Soprano', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Passionate', 'Mysterious'],
    duration: '2:25:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - The Gypsy\'s Story',
        key: 'C Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante',
        description: 'The story of the gypsy and the curse',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The gypsy tells the story of the curse',
            musicalElements: {
              mood: ['Mysterious', 'Dramatic', 'Foreboding'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Di quella pira',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro',
            description: 'Manrico\'s famous aria "From that pyre"',
            musicalElements: {
              mood: ['Heroic', 'Dramatic', 'Passionate'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Tacea la notte placida',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Leonora\'s aria "The peaceful night was silent"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - The Gypsy Camp',
        key: 'F Major',
        tempo: 105,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: 'The gypsy camp and the anvil chorus',
        sections: [
          {
            title: 'Anvil Chorus',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 105,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Allegro',
            description: 'The famous "Vedi! le fosche notturne spoglie"',
            musicalElements: {
              mood: ['Joyful', 'Celebratory', 'Festive'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Stride la vampa',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Azucena\'s aria "The flame crackles"',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Mysterious'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Condotta ell\'era in ceppi',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Azucena\'s aria "She was led in chains"',
            musicalElements: {
              mood: ['Dramatic', 'Tragic', 'Passionate'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 110,
            timeSignature: '4/4',
            duration: '11:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - The Castle',
        key: 'G Minor',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'The castle scene and the famous quartet',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'G Minor',
            tempo: 115,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'The castle scene with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Orchestra', 'All Soloists'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Miserere',
            sectionNumber: 2,
            sectionType: 'quartet',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The famous quartet "Miserere"',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Mezzo-Soprano', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Di quella pira (reprise)',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro',
            description: 'Manrico\'s aria "From that pyre" (reprise)',
            musicalElements: {
              mood: ['Heroic', 'Dramatic', 'Passionate'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 120,
            timeSignature: '4/4',
            duration: '18:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Act IV - The Prison',
        key: 'C Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Andante',
        description: 'The prison scene and the tragic finale',
        sections: [
          {
            title: 'Opening Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'C Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'The prison scene with Leonora and Manrico',
            musicalElements: {
              mood: ['Melancholic', 'Dramatic', 'Tragic'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'D\'amor sull\'ali rosee',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Leonora\'s aria "On the rosy wings of love"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Miserere (reprise)',
            sectionNumber: 3,
            sectionType: 'quartet',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The famous quartet "Miserere" (reprise)',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Mezzo-Soprano', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 4,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '14:00',
            tempoMarking: 'Allegro',
            description: 'The tragic finale with all characters',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Final'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Piano to Fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1853,
        conductor: 'Giuseppe Verdi',
        orchestra: 'Orchestra of the Teatro Apollo',
        venue: 'Teatro Apollo, Rome',
        singers: [
          { name: 'Rosina Penco', role: 'Leonora' },
          { name: 'Carlo Baucardé', role: 'Manrico' },
          { name: 'Giovanni Guicciardi', role: 'Count di Luna' },
          { name: 'Emilia Goggi', role: 'Azucena' }
        ],
        significance: 'World premiere of Il Trovatore',
        historicalContext: 'This was Verdi\'s second opera in his famous "trilogy" with Rigoletto and La Traviata.',
        notes: 'The premiere was a great success, establishing Il Trovatore as one of Verdi\'s most popular operas.'
      },
      {
        year: 1951,
        conductor: 'Fernando Previtali',
        orchestra: 'Orchestra of La Scala',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Caterina Mancini', role: 'Leonora' },
          { name: 'Giacomo Lauri-Volpi', role: 'Manrico' },
          { name: 'Carlo Tagliabue', role: 'Count di Luna' },
          { name: 'Miriam Pirazzini', role: 'Azucena' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording features some of the greatest Italian singers of the mid-20th century.',
        recordingLabel: 'EMI',
        notes: 'Lauri-Volpi\'s Manrico is considered definitive, combining vocal perfection with deep emotional understanding.'
      }
    ],
    notes: 'Verdi\'s opera about love, revenge, and mistaken identity. Features the famous "Anvil Chorus" and "Miserere" quartet. One of his most popular and frequently performed operas.'
  },

  'lp_arias-and-duet-from-rigoletto_giuseppe-verdi-lina-pagliughi-sandor-sv': {
    identifier: 'lp_arias-and-duet-from-rigoletto_giuseppe-verdi-lina-pagliughi-sandor-sv',
    metadataComplete: true,
    overallKey: 'F Major',
    overallTempo: 110,
    genre: ['Opera', 'Romantic', 'Classical', 'Arias'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Baritone', 'Tenor'],
    mood: ['Dramatic', 'Romantic', 'Passionate', 'Melancholic'],
    duration: '45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Arias and Duets from Rigoletto',
        key: 'F Major',
        tempo: 110,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Various',
        description: 'Collection of famous arias and duets from Rigoletto',
        sections: [
          {
            title: 'Caro nome',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'exposition',
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
            title: 'La donna è mobile',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'exposition',
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
            musicalFunction: 'development',
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
            title: 'Pari siamo',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Rigoletto\'s aria "We are equal"',
            musicalElements: {
              mood: ['Dramatic', 'Melancholic', 'Reflective'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Cortigiani, vil razza dannata',
            sectionNumber: 5,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'Rigoletto\'s aria "Courtiers, vile damned race"',
            musicalElements: {
              mood: ['Angry', 'Dramatic', 'Passionate'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Tutte le feste al tempio',
            sectionNumber: 6,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Gilda\'s aria "All the festivals at the temple"',
            musicalElements: {
              mood: ['Melancholic', 'Tender', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Piangi, fanciulla',
            sectionNumber: 7,
            sectionType: 'duet',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Andante',
            description: 'Rigoletto and Gilda duet "Cry, little girl"',
            musicalElements: {
              mood: ['Tender', 'Melancholic', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'Piano to Mezzo-forte'
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
        year: 1950,
        conductor: 'Alfredo Simonetto',
        orchestra: 'Orchestra Sinfonica della Radiotelevisione Italiana',
        venue: 'Rome',
        singers: [
          { name: 'Lina Pagliughi', role: 'Gilda' },
          { name: 'Sándor Svéd', role: 'Rigoletto' }
        ],
        significance: 'Collection of famous Rigoletto arias and duets',
        historicalContext: 'This recording features some of the greatest Italian singers of the mid-20th century.',
        recordingLabel: 'EMI',
        notes: 'Pagliughi\'s Gilda is considered definitive, combining vocal perfection with deep emotional understanding.'
      }
    ],
    notes: 'Collection of the most famous arias and duets from Verdi\'s Rigoletto. Features the famous "Caro nome", "La donna è mobile", and the quartet "Bella figlia dell\'amore".'
  },

  'lp_il-trovatore-highlights_giuseppe-verdi-orchestra-del-teatro-del': {
    identifier: 'lp_il-trovatore-highlights_giuseppe-verdi-orchestra-del-teatro-del',
    metadataComplete: true,
    overallKey: 'C Minor',
    overallTempo: 110,
    genre: ['Opera', 'Romantic', 'Classical', 'Highlights'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Mezzo-Soprano', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Passionate', 'Mysterious'],
    duration: '60:00',
    acts: [
      {
        actNumber: 1,
        title: 'Highlights from Il Trovatore',
        key: 'C Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '60:00',
        tempoMarking: 'Various',
        description: 'Collection of the most famous highlights from Il Trovatore',
        sections: [
          {
            title: 'Anvil Chorus',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 105,
            timeSignature: '4/4',
            duration: '6:00',
            tempoMarking: 'Allegro',
            description: 'The famous "Vedi! le fosche notturne spoglie"',
            musicalElements: {
              mood: ['Joyful', 'Celebratory', 'Festive'],
              instrumentation: ['Orchestra', 'Chorus'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Stride la vampa',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Azucena\'s aria "The flame crackles"',
            musicalElements: {
              mood: ['Dramatic', 'Passionate', 'Mysterious'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'Tacea la notte placida',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Leonora\'s aria "The peaceful night was silent"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Di quella pira',
            sectionNumber: 4,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '4:00',
            tempoMarking: 'Allegro',
            description: 'Manrico\'s famous aria "From that pyre"',
            musicalElements: {
              mood: ['Heroic', 'Dramatic', 'Passionate'],
              instrumentation: ['Orchestra', 'Tenor'],
              dynamics: 'Fortissimo'
            }
          },
          {
            title: 'Miserere',
            sectionNumber: 5,
            sectionType: 'quartet',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'G Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'The famous quartet "Miserere"',
            musicalElements: {
              mood: ['Dramatic', 'Intense', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Mezzo-Soprano', 'Baritone'],
              dynamics: 'Mezzo-forte to Forte'
            }
          },
          {
            title: 'D\'amor sull\'ali rosee',
            sectionNumber: 6,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Andante',
            description: 'Leonora\'s aria "On the rosy wings of love"',
            musicalElements: {
              mood: ['Romantic', 'Tender', 'Beautiful'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Condotta ell\'era in ceppi',
            sectionNumber: 7,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'F Minor',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Andante',
            description: 'Azucena\'s aria "She was led in chains"',
            musicalElements: {
              mood: ['Dramatic', 'Tragic', 'Passionate'],
              instrumentation: ['Orchestra', 'Mezzo-Soprano'],
              dynamics: 'Piano to Forte'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 8,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '8:00',
            tempoMarking: 'Allegro',
            description: 'The tragic finale with all characters',
            musicalElements: {
              mood: ['Tragic', 'Devastating', 'Final'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'Piano to Fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1962,
        conductor: 'Arturo Basile',
        orchestra: 'Orchestra Del Teatro Dell\'Opera Di Roma',
        venue: 'Rome',
        singers: [
          { name: 'Coro Del Teatro Dell\'Opera Di Roma', role: 'Chorus' }
        ],
        significance: 'Collection of highlights from Il Trovatore',
        historicalContext: 'This recording features the most famous moments from Verdi\'s Il Trovatore.',
        recordingLabel: 'EMI',
        notes: 'A comprehensive collection of the most celebrated moments from one of Verdi\'s most popular operas.'
      }
    ],
    notes: 'Collection of the most famous highlights from Verdi\'s Il Trovatore. Features the "Anvil Chorus", "Stride la vampa", "Di quella pira", and the "Miserere" quartet.'
  }
};
