/**
 * Wagner Works Musical Metadata
 * =============================
 * Musical metadata for Wagner operas in the collection
 */

import { WorkMusicalMetadata } from './types';

export const WAGNER_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto': {
    identifier: 'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 85,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Passionate', 'Tragic', 'Transcendent', 'Mystical'],
    duration: '4:00:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Love Potion Scene',
        key: 'A Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Langsam und schmachtend',
        description: 'The love potion scene - Tristan and Isolde fall in love',
        sections: [
          {
            title: 'Prelude - Tristan Chord',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'A Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Langsam und schmachtend',
            description: 'Famous prelude with the revolutionary Tristan chord',
            musicalElements: {
              mood: ['Mystical', 'Tense', 'Passionate'],
              instrumentation: ['Orchestra'],
              dynamics: 'From pianissimo to fortissimo'
            }
          },
          {
            title: 'Love Potion Scene',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'character_introduction',
            complexity: 'complex',
            key: 'A Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Langsam und schmachtend',
            description: 'The love potion scene - Tristan and Isolde fall in love',
            musicalElements: {
              mood: ['Passionate', 'Mystical', 'Tense'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Baritone'],
              dynamics: 'From pianissimo to fortissimo'
            }
          },
          {
            title: 'Isolde\'s Narrative',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'A Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Langsam',
            description: 'Isolde\'s narrative of her past with Tristan',
            musicalElements: {
              mood: ['Nostalgic', 'Melancholic', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'Piano to Mezzo-forte'
            }
          },
          {
            title: 'Love Duet',
            sectionNumber: 4,
            sectionType: 'duet',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'A Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Langsam und schmachtend',
            description: 'The famous love duet between Tristan and Isolde',
            musicalElements: {
              mood: ['Passionate', 'Transcendent', 'Mystical'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          },
          {
            title: 'Finale',
            sectionNumber: 5,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'A Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'The act finale with all characters',
            musicalElements: {
              mood: ['Triumphant', 'Dramatic', 'Intense'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Love Duet',
        key: 'C Major',
        tempo: 80,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'The love duet - "O sink hernieder, Nacht der Liebe"',
        sections: [
          {
            title: 'Love Duet',
            sectionNumber: 1,
            sectionType: 'duet',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'C Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '90:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'The love duet - "O sink hernieder, Nacht der Liebe"',
            musicalElements: {
              mood: ['Ecstatic', 'Transcendent', 'Passionate'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Crescendo to climax'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Liebestod',
        key: 'B Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Langsam und leidend',
        description: 'Tristan\'s death and Isolde\'s Liebestod',
        sections: [
          {
            title: 'Liebestod',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Langsam und leidend',
            description: 'Tristan\'s death and Isolde\'s Liebestod',
            musicalElements: {
              mood: ['Tragic', 'Transcendent', 'Mystical'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'From whispered to overwhelming'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1865,
        conductor: 'Hans von Bülow',
        orchestra: 'Court Opera Orchestra',
        venue: 'Court Theatre, Munich',
        singers: [
          { name: 'Ludwig Schnorr von Carolsfeld', role: 'Tristan' },
          { name: 'Malvina Schnorr von Carolsfeld', role: 'Isolde' }
        ],
        significance: 'World premiere of Wagner\'s revolutionary music drama',
        historicalContext: 'This premiere marked a turning point in Western music, introducing the Tristan chord and endless melody.',
        notes: 'Ludwig Schnorr died shortly after the premiere, making this one of the most tragic opera premieres in history.'
      },
      {
        year: 1952,
        conductor: 'Wilhelm Furtwängler',
        orchestra: 'Philharmonia Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Kirsten Flagstad', role: 'Isolde' },
          { name: 'Ludwig Suthaus', role: 'Tristan' }
        ],
        significance: 'Legendary recording considered definitive',
        historicalContext: 'This recording captures Flagstad in her prime, with Furtwängler\'s masterful conducting.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest opera recordings ever made, featuring Flagstad\'s definitive Isolde.'
      }
    ],
    notes: 'Wagner\'s revolutionary music drama that changed the course of Western music. Features the famous Tristan chord and endless melody technique.'
  },

  'lp_die-meistersinger-von-nurnberg-complete-op_herbert-von-karajan-richard-wagner': {
    identifier: 'lp_die-meistersinger-von-nurnberg-complete-op_herbert-von-karajan-richard-wagner',
    metadataComplete: true,
    overallKey: 'C Major',
    overallTempo: 110,
    genre: ['Opera', 'Comedy', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Joyful', 'Humorous', 'Noble', 'Patriotic'],
    duration: '4:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Mastersingers\' Guild Meeting',
        key: 'C Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'The Mastersingers\' guild meeting and Walther\'s trial song',
        sections: [
          {
            title: 'Mastersingers\' Guild Meeting',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 120,
            timeSignature: '4/4',
            duration: '90:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'The Mastersingers\' guild meeting and Walther\'s trial song',
            musicalElements: {
              mood: ['Formal', 'Noble', 'Humorous'],
              instrumentation: ['Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Riot Scene',
        key: 'E Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Gemächlich',
        description: 'The riot scene and Beckmesser\'s serenade',
        sections: [
          {
            title: 'Riot Scene and Beckmesser\'s Serenade',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'E Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '90:00',
            tempoMarking: 'Gemächlich',
            description: 'The riot scene and Beckmesser\'s serenade',
            musicalElements: {
              mood: ['Comic', 'Chaotic', 'Romantic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'From chaos to order'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Song Contest',
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Feierlich',
        description: 'The song contest and Walther\'s prize song',
        sections: [
          {
            title: 'Song Contest and Prize Song',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Major',
            tempo: 115,
            timeSignature: '4/4',
            duration: '90:00',
            tempoMarking: 'Feierlich',
            description: 'The song contest and Walther\'s prize song',
            musicalElements: {
              mood: ['Triumphant', 'Noble', 'Joyful'],
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
    notes: 'Wagner\'s only comedy and his most accessible opera. Features the famous "Wach auf" chorus and the Prize Song.'
  },

  'lp_parsifal_richard-wagner-hans-knappertsbusch-chor-de': {
    identifier: 'lp_parsifal_richard-wagner-hans-knappertsbusch-chor-de',
    metadataComplete: true,
    overallKey: 'A-flat Major',
    overallTempo: 70,
    genre: ['Opera', 'Sacred Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Sacred', 'Mystical', 'Transcendent', 'Solemn'],
    duration: '4:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Good Friday Scene',
        key: 'A-flat Major',
        tempo: 65,
        timeSignature: '4/4',
        duration: '85:00',
        tempoMarking: 'Sehr langsam',
        description: 'The Good Friday scene and Parsifal\'s arrival',
        sections: [
          {
            title: 'Good Friday Scene',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'A-flat Major',
            tempo: 65,
            timeSignature: '4/4',
            duration: '85:00',
            tempoMarking: 'Sehr langsam',
            description: 'The Good Friday scene and Parsifal\'s arrival',
            musicalElements: {
              mood: ['Sacred', 'Mystical', 'Contemplative'],
              instrumentation: ['Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Sustained and reverent'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Kundry\'s Seduction',
        key: 'D Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Kundry\'s seduction and Parsifal\'s resistance',
        sections: [
          {
            title: 'Kundry\'s Seduction',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Kundry\'s seduction and Parsifal\'s resistance',
            musicalElements: {
              mood: ['Tempting', 'Dramatic', 'Triumphant'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'From seductive to powerful'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Redemption',
        key: 'A-flat Major',
        tempo: 70,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Feierlich',
        description: 'The Good Friday music and Parsifal\'s redemption',
        sections: [
          {
            title: 'Redemption',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'A-flat Major',
            tempo: 70,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Feierlich',
            description: 'The Good Friday music and Parsifal\'s redemption',
            musicalElements: {
              mood: ['Transcendent', 'Sacred', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notes: 'Wagner\'s final work, a "sacred festival drama" that explores themes of redemption and spiritual transformation.'
  },

  'lp_lohengrin-complete_richard-wagner-boston-symphony-orchestra-e_0': {
    identifier: 'lp_lohengrin-complete_richard-wagner-boston-symphony-orchestra-e_0',
    metadataComplete: true,
    overallKey: 'A-flat Major',
    overallTempo: 95,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Mystical', 'Noble', 'Romantic', 'Tragic'],
    duration: '3:45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Elsa\'s Dream',
        key: 'A-flat Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Elsa\'s dream and Lohengrin\'s arrival',
        sections: [
          {
            title: 'Elsa\'s Dream and Lohengrin\'s Arrival',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A-flat Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Elsa\'s dream and Lohengrin\'s arrival',
            musicalElements: {
              mood: ['Mystical', 'Noble', 'Romantic'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Chorus'],
              dynamics: 'From ethereal to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Wedding Scene',
        key: 'E Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Langsam',
        description: 'Wedding scene and Ortrud\'s curse',
        sections: [
          {
            title: 'Wedding Scene and Ortrud\'s Curse',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'E Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Langsam',
            description: 'Wedding scene and Ortrud\'s curse',
            musicalElements: {
              mood: ['Romantic', 'Ominous', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Wedding March and Departure',
        key: 'C Major',
        tempo: 105,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Feierlich',
        description: 'Wedding march, revelation, and Lohengrin\'s departure',
        sections: [
          {
            title: 'Wedding March and Lohengrin\'s Departure',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'C Major',
            tempo: 105,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Feierlich',
            description: 'Wedding march, revelation, and Lohengrin\'s departure',
            musicalElements: {
              mood: ['Triumphant', 'Tragic', 'Transcendent'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From celebration to tragedy'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Wagner\'s romantic opera featuring the famous "Bridal Chorus" and "Elsa\'s Dream". Based on medieval legends.'
  },

  'lp_the-flying-dutchman_richard-wagner-antal-dorati-george-london_1': {
    identifier: 'lp_the-flying-dutchman_richard-wagner-antal-dorati-george-london_1',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 100,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Stormy', 'Mystical', 'Romantic', 'Tragic'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Storm Scene',
        key: 'D Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Allegro con brio',
        description: 'Storm scene and Dutchman\'s arrival',
        sections: [
          {
            title: 'Storm Scene and Dutchman\'s Arrival',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro con brio',
            description: 'Storm scene and Dutchman\'s arrival',
            musicalElements: {
              mood: ['Stormy', 'Mystical', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Baritone', 'Chorus'],
              dynamics: 'Powerful and stormy'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Senta\'s Ballad',
        key: 'F Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Senta\'s ballad and love scene',
        sections: [
          {
            title: 'Senta\'s Ballad and Love Scene',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Andante',
            description: 'Senta\'s ballad and love scene',
            musicalElements: {
              mood: ['Romantic', 'Mystical', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'From tender to powerful'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Sailors\' Chorus',
        key: 'D Minor',
        tempo: 105,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Allegro',
        description: 'Sailors\' chorus and tragic ending',
        sections: [
          {
            title: 'Sailors\' Chorus and Tragic Ending',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 105,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro',
            description: 'Sailors\' chorus and tragic ending',
            musicalElements: {
              mood: ['Joyful', 'Tragic', 'Transcendent'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From celebration to tragedy'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Wagner\'s first mature opera, based on the legend of the Flying Dutchman. Features the famous "Sailors\' Chorus" and Senta\'s Ballad.'
  },

  'lp_tannhuser_richard-wagner-wiener-philharmoniker-georg': {
    identifier: 'lp_tannhuser_richard-wagner-wiener-philharmoniker-georg',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 90,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Passionate', 'Mystical', 'Noble', 'Tragic'],
    duration: '3:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Venusberg Scene',
        key: 'E-flat Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '70:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Venusberg scene and Tannhäuser\'s return',
        sections: [
          {
            title: 'Venusberg Scene and Tannhäuser\'s Return',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '70:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Venusberg scene and Tannhäuser\'s return',
            musicalElements: {
              mood: ['Passionate', 'Mystical', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Soprano', 'Chorus'],
              dynamics: 'From sensual to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Song Contest',
        key: 'A Major',
        tempo: 85,
        timeSignature: '4/4',
        duration: '70:00',
        tempoMarking: 'Andante',
        description: 'Song contest and Tannhäuser\'s confession',
        sections: [
          {
            title: 'Song Contest and Tannhäuser\'s Confession',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '70:00',
            tempoMarking: 'Andante',
            description: 'Song contest and Tannhäuser\'s confession',
            musicalElements: {
              mood: ['Noble', 'Dramatic', 'Tragic'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From formal to dramatic'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Pilgrimage and Redemption',
        key: 'E-flat Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '70:00',
        tempoMarking: 'Feierlich',
        description: 'Pilgrimage, Elisabeth\'s death, and redemption',
        sections: [
          {
            title: 'Pilgrimage, Elisabeth\'s Death, and Redemption',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '70:00',
            tempoMarking: 'Feierlich',
            description: 'Pilgrimage, Elisabeth\'s death, and redemption',
            musicalElements: {
              mood: ['Sacred', 'Tragic', 'Transcendent'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'E-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Wagner\'s opera about the medieval minnesinger Tannhäuser, torn between sacred and profane love. Features the famous "Pilgrims\' Chorus".'
  },

  'lp_das-rheingold-highlights_richard-wagner-orchester-der-deutschen': {
    identifier: 'lp_das-rheingold-highlights_richard-wagner-orchester-der-deutschen',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 80,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Mystical', 'Primordial', 'Dramatic', 'Mythological'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Scene 1 - The Rhinegold',
        key: 'E-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Sehr langsam',
        description: 'The opening scene with the Rhinemaidens and Alberich\'s theft of the gold',
        sections: [
          {
            title: 'Prelude - The Rhine',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Sehr langsam',
            description: 'The famous opening with the E-flat major chord representing the Rhine',
            musicalElements: {
              mood: ['Mystical', 'Primordial', 'Flowing'],
              instrumentation: ['Orchestra'],
              dynamics: 'From pianissimo to fortissimo'
            }
          },
          {
            title: 'Rhinemaidens\' Song',
            sectionNumber: 2,
            sectionType: 'ensemble',
            musicalFunction: 'character_introduction',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'The Rhinemaidens\' playful song about the gold',
            musicalElements: {
              mood: ['Playful', 'Mystical', 'Seductive'],
              instrumentation: ['Orchestra', 'Three Sopranos'],
              dynamics: 'Light and airy'
            }
          },
          {
            title: 'Alberich\'s Curse',
            sectionNumber: 3,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Allegro',
            description: 'Alberich curses love and steals the Rhinegold',
            musicalElements: {
              mood: ['Angry', 'Dramatic', 'Tragic'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Powerful and dramatic'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Scene 2 - The Gods\' Realm',
        key: 'A Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Wotan and the gods in Valhalla, the building of the fortress',
        sections: [
          {
            title: 'Valhalla Theme',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'The famous Valhalla theme as the gods enter their new fortress',
            musicalElements: {
              mood: ['Noble', 'Triumphant', 'Majestic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'From quiet to overwhelming'
            }
          },
          {
            title: 'Freia\'s Distress',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Andante',
            description: 'Freia\'s plea for help as the giants demand payment',
            musicalElements: {
              mood: ['Desperate', 'Pleading', 'Dramatic'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'From tender to powerful'
            }
          },
          {
            title: 'The Giants\' Demand',
            sectionNumber: 3,
            sectionType: 'ensemble',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'D Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'The giants demand Freia as payment for building Valhalla',
            musicalElements: {
              mood: ['Threatening', 'Powerful', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Bass', 'Baritone', 'All Voices'],
              dynamics: 'Powerful and menacing'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Scene 3 - Nibelheim',
        key: 'B-flat Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'The descent to Nibelheim and Alberich\'s realm',
        sections: [
          {
            title: 'Descent to Nibelheim',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'B-flat Minor',
            tempo: 100,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro',
            description: 'The famous anvil music as we descend to the dwarves\' realm',
            musicalElements: {
              mood: ['Dark', 'Industrial', 'Menacing'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From quiet to overwhelming'
            }
          },
          {
            title: 'Alberich\'s Tyranny',
            sectionNumber: 2,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B-flat Minor',
            tempo: 105,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Allegro con brio',
            description: 'Alberich\'s cruel rule over the Nibelungs',
            musicalElements: {
              mood: ['Cruel', 'Oppressive', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Baritone', 'Chorus'],
              dynamics: 'Powerful and oppressive'
            }
          },
          {
            title: 'The Ring\'s Power',
            sectionNumber: 3,
            sectionType: 'scene',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'B-flat Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Presto',
            description: 'The demonstration of the ring\'s power over the Nibelungs',
            musicalElements: {
              mood: ['Terrifying', 'Overwhelming', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'From quiet to overwhelming power'
            }
          }
        ]
      },
      {
        actNumber: 4,
        title: 'Scene 4 - The Gods\' Return',
        key: 'E-flat Major',
        tempo: 85,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Feierlich',
        description: 'The return to the gods\' realm and the final confrontation',
        sections: [
          {
            title: 'The Ring\'s Theft',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 85,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Feierlich',
            description: 'Loki\'s theft of the ring from Alberich',
            musicalElements: {
              mood: ['Triumphant', 'Dramatic', 'Cunning'],
              instrumentation: ['Full Orchestra', 'All Voices'],
              dynamics: 'From quiet to powerful'
            }
          },
          {
            title: 'Alberich\'s Curse',
            sectionNumber: 2,
            sectionType: 'aria',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 90,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Allegro',
            description: 'Alberich\'s curse on the ring and all who possess it',
            musicalElements: {
              mood: ['Cursed', 'Dramatic', 'Tragic'],
              instrumentation: ['Orchestra', 'Baritone'],
              dynamics: 'Powerful and menacing'
            }
          },
          {
            title: 'Entry into Valhalla',
            sectionNumber: 3,
            sectionType: 'ensemble',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '5:00',
            tempoMarking: 'Feierlich',
            description: 'The gods enter Valhalla as the rainbow bridge appears',
            musicalElements: {
              mood: ['Triumphant', 'Mystical', 'Transcendent'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From quiet reverence to overwhelming power'
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
    notablePerformances: [
      {
        year: 1869,
        conductor: 'Franz Wüllner',
        orchestra: 'Court Opera Orchestra',
        venue: 'Court Theatre, Munich',
        singers: [
          { name: 'August Kindermann', role: 'Wotan' },
          { name: 'Heinrich Vogl', role: 'Loge' },
          { name: 'Karl Fischer', role: 'Alberich' }
        ],
        significance: 'World premiere of Das Rheingold',
        historicalContext: 'The first part of Wagner\'s Ring Cycle, introducing the revolutionary leitmotif technique.',
        notes: 'This premiere established the foundation for the complete Ring Cycle that would follow.'
      },
      {
        year: 1958,
        conductor: 'Georg Solti',
        orchestra: 'Vienna Philharmonic',
        venue: 'Sofiensaal, Vienna',
        singers: [
          { name: 'George London', role: 'Wotan' },
          { name: 'Set Svanholm', role: 'Loge' },
          { name: 'Gustav Neidlinger', role: 'Alberich' }
        ],
        significance: 'Legendary Decca recording of the complete Ring Cycle',
        historicalContext: 'This recording set the standard for Wagner performance and remains definitive.',
        recordingLabel: 'Decca',
        notes: 'Considered one of the greatest opera recordings ever made, featuring Solti\'s masterful conducting.'
      }
    ],
    notes: 'The first part of Wagner\'s Ring Cycle, introducing the revolutionary leitmotif technique and the foundation of the entire tetralogy.'
  },

  'lp_scenen-aus-gotterdammerung_richard-wagner-kirsten-flagstad-wilhelm': {
    identifier: 'lp_scenen-aus-gotterdammerung_richard-wagner-kirsten-flagstad-wilhelm',
    metadataComplete: true,
    overallKey: 'D-flat Major',
    overallTempo: 75,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Tragic', 'Apocalyptic', 'Transcendent', 'Dramatic'],
    duration: '1:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Prologue - Norns\' Scene',
        key: 'D-flat Major',
        tempo: 70,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Sehr langsam',
        description: 'The Norns weave the rope of destiny and foretell the end of the gods',
        sections: [
          {
            title: 'Norns\' Scene',
            sectionNumber: 1,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 70,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Sehr langsam',
            description: 'The Norns weave the rope of destiny and foretell the end of the gods',
            musicalElements: {
              mood: ['Mystical', 'Fateful', 'Ominous'],
              instrumentation: ['Orchestra', 'Three Contraltos'],
              dynamics: 'From whispered to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act I - Siegfried\'s Death',
        key: 'B Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Siegfried\'s death and the funeral march',
        sections: [
          {
            title: 'Siegfried\'s Death',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Siegfried\'s death at the hands of Hagen',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'From quiet to overwhelming'
            }
          },
          {
            title: 'Funeral March',
            sectionNumber: 2,
            sectionType: 'march',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Feierlich',
            description: 'The famous funeral march for Siegfried',
            musicalElements: {
              mood: ['Tragic', 'Noble', 'Overwhelming'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act II - Brünnhilde\'s Immolation',
        key: 'D-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Feierlich',
        description: 'Brünnhilde\'s immolation scene and the end of the gods',
        sections: [
          {
            title: 'Brünnhilde\'s Immolation',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '35:00',
            tempoMarking: 'Feierlich',
            description: 'Brünnhilde\'s final scene and immolation',
            musicalElements: {
              mood: ['Transcendent', 'Tragic', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'From quiet to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1952,
        conductor: 'Wilhelm Furtwängler',
        orchestra: 'Philharmonia Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Kirsten Flagstad', role: 'Brünnhilde' },
          { name: 'Ludwig Suthaus', role: 'Siegfried' }
        ],
        significance: 'Legendary recording with Flagstad in her prime',
        historicalContext: 'This recording captures Flagstad\'s definitive Brünnhilde with Furtwängler\'s masterful conducting.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest Wagner recordings ever made, featuring Flagstad\'s transcendent Brünnhilde.'
      }
    ],
    notes: 'Excerpts from the final part of Wagner\'s Ring Cycle, featuring the tragic conclusion and Brünnhilde\'s immolation.'
  },

  'lp_exerpts-from-tristan-und-isolde_birgit-nilsson-richard-wagner-wiener-ph_0': {
    identifier: 'lp_exerpts-from-tristan-und-isolde_birgit-nilsson-richard-wagner-wiener-ph_0',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 85,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Passionate', 'Tragic', 'Transcendent', 'Mystical'],
    duration: '1:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Love Potion Scene',
        key: 'A Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Langsam und schmachtend',
        description: 'The love potion scene - Tristan and Isolde fall in love',
        sections: [
          {
            title: 'Prelude - Tristan Chord',
            sectionNumber: 1,
            sectionType: 'overture',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'A Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '10:00',
            tempoMarking: 'Langsam und schmachtend',
            description: 'Famous prelude with the revolutionary Tristan chord',
            musicalElements: {
              mood: ['Mystical', 'Tense', 'Passionate'],
              instrumentation: ['Orchestra'],
              dynamics: 'From pianissimo to fortissimo'
            }
          },
          {
            title: 'Love Duet',
            sectionNumber: 2,
            sectionType: 'duet',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'A Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Langsam und schmachtend',
            description: 'The famous love duet between Tristan and Isolde',
            musicalElements: {
              mood: ['Passionate', 'Transcendent', 'Mystical'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Mezzo-forte to Fortissimo'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Love Duet',
        key: 'C Major',
        tempo: 80,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'The love duet - "O sink hernieder, Nacht der Liebe"',
        sections: [
          {
            title: 'Love Duet',
            sectionNumber: 1,
            sectionType: 'duet',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'C Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'The love duet - "O sink hernieder, Nacht der Liebe"',
            musicalElements: {
              mood: ['Ecstatic', 'Transcendent', 'Passionate'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'Crescendo to climax'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Liebestod',
        key: 'B Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Langsam und leidend',
        description: 'Tristan\'s death and Isolde\'s Liebestod',
        sections: [
          {
            title: 'Liebestod',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Langsam und leidend',
            description: 'Tristan\'s death and Isolde\'s Liebestod',
            musicalElements: {
              mood: ['Tragic', 'Transcendent', 'Mystical'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
              dynamics: 'From whispered to overwhelming'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1960,
        conductor: 'Karl Böhm',
        orchestra: 'Vienna Philharmonic',
        venue: 'Sofiensaal, Vienna',
        singers: [
          { name: 'Birgit Nilsson', role: 'Isolde' },
          { name: 'Wolfgang Windgassen', role: 'Tristan' }
        ],
        significance: 'Legendary recording with Nilsson\'s definitive Isolde',
        historicalContext: 'This recording captures Nilsson in her prime, with Böhm\'s masterful conducting.',
        recordingLabel: 'Decca',
        notes: 'Considered one of the greatest Tristan recordings ever made, featuring Nilsson\'s transcendent Isolde.'
      }
    ],
    notes: 'Excerpts from Wagner\'s revolutionary music drama Tristan und Isolde, featuring the most famous scenes and arias.'
  },

  'lp_gtterdmmerung_richard-wagner-birgit-nilsson-wolfgang-win_0': {
    identifier: 'lp_gtterdmmerung_richard-wagner-birgit-nilsson-wolfgang-win_0',
    metadataComplete: true,
    overallKey: 'D-flat Major',
    overallTempo: 75,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Tragic', 'Apocalyptic', 'Transcendent', 'Dramatic'],
    duration: '4:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Prologue - Norns\' Scene',
        key: 'D-flat Major',
        tempo: 70,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Sehr langsam',
        description: 'The Norns weave the rope of destiny and foretell the end of the gods',
        sections: [
          {
            title: 'Norns\' Scene',
            sectionNumber: 1,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 70,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Sehr langsam',
            description: 'The Norns weave the rope of destiny and foretell the end of the gods',
            musicalElements: {
              mood: ['Mystical', 'Fateful', 'Ominous'],
              instrumentation: ['Orchestra', 'Three Contraltos'],
              dynamics: 'From whispered to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act I - Siegfried\'s Death',
        key: 'B Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Siegfried\'s death and the funeral march',
        sections: [
          {
            title: 'Siegfried\'s Death',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Siegfried\'s death at the hands of Hagen',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'From quiet to overwhelming'
            }
          },
          {
            title: 'Funeral March',
            sectionNumber: 2,
            sectionType: 'march',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Feierlich',
            description: 'The famous funeral march for Siegfried',
            musicalElements: {
              mood: ['Tragic', 'Noble', 'Overwhelming'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act II - Brünnhilde\'s Immolation',
        key: 'D-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '90:00',
        tempoMarking: 'Feierlich',
        description: 'Brünnhilde\'s immolation scene and the end of the gods',
        sections: [
          {
            title: 'Brünnhilde\'s Immolation',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '90:00',
            tempoMarking: 'Feierlich',
            description: 'Brünnhilde\'s final scene and immolation',
            musicalElements: {
              mood: ['Transcendent', 'Tragic', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'From quiet to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1964,
        conductor: 'Georg Solti',
        orchestra: 'Vienna Philharmonic',
        venue: 'Sofiensaal, Vienna',
        singers: [
          { name: 'Birgit Nilsson', role: 'Brünnhilde' },
          { name: 'Wolfgang Windgassen', role: 'Siegfried' },
          { name: 'Gustav Neidlinger', role: 'Alberich' }
        ],
        significance: 'Legendary Decca recording of the complete Ring Cycle',
        historicalContext: 'This recording set the standard for Wagner performance and remains definitive.',
        recordingLabel: 'Decca',
        notes: 'Considered one of the greatest opera recordings ever made, featuring Solti\'s masterful conducting and Nilsson\'s transcendent Brünnhilde.'
      }
    ],
    notes: 'The final part of Wagner\'s Ring Cycle, featuring the tragic conclusion and Brünnhilde\'s immolation. The culmination of the entire tetralogy.'
  },

  'lp_the-flying-dutchman_richard-wagner-antal-dorati-orchestra-of-t': {
    identifier: 'lp_the-flying-dutchman_richard-wagner-antal-dorati-orchestra-of-t',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 100,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Stormy', 'Mystical', 'Romantic', 'Tragic'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Storm Scene',
        key: 'D Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Allegro con brio',
        description: 'Storm scene and Dutchman\'s arrival',
        sections: [
          {
            title: 'Storm Scene and Dutchman\'s Arrival',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro con brio',
            description: 'Storm scene and Dutchman\'s arrival',
            musicalElements: {
              mood: ['Stormy', 'Mystical', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Baritone', 'Chorus'],
              dynamics: 'Powerful and stormy'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Senta\'s Ballad',
        key: 'F Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Senta\'s ballad and love scene',
        sections: [
          {
            title: 'Senta\'s Ballad and Love Scene',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Andante',
            description: 'Senta\'s ballad and love scene',
            musicalElements: {
              mood: ['Romantic', 'Mystical', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'From tender to powerful'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Sailors\' Chorus',
        key: 'D Minor',
        tempo: 105,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Allegro',
        description: 'Sailors\' chorus and tragic ending',
        sections: [
          {
            title: 'Sailors\' Chorus and Tragic Ending',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 105,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro',
            description: 'Sailors\' chorus and tragic ending',
            musicalElements: {
              mood: ['Joyful', 'Tragic', 'Transcendent'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From celebration to tragedy'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Alternative recording of Wagner\'s first mature opera, based on the legend of the Flying Dutchman. Features the famous "Sailors\' Chorus" and Senta\'s Ballad.'
  },

  'lp_the-flying-dutchman_richard-wagner-dietrich-fischer-dieskau-go': {
    identifier: 'lp_the-flying-dutchman_richard-wagner-dietrich-fischer-dieskau-go',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 100,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Stormy', 'Mystical', 'Romantic', 'Tragic'],
    duration: '2:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Act I - Storm Scene',
        key: 'D Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Allegro con brio',
        description: 'Storm scene and Dutchman\'s arrival',
        sections: [
          {
            title: 'Storm Scene and Dutchman\'s Arrival',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Minor',
            tempo: 110,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro con brio',
            description: 'Storm scene and Dutchman\'s arrival',
            musicalElements: {
              mood: ['Stormy', 'Mystical', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Baritone', 'Chorus'],
              dynamics: 'Powerful and stormy'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act II - Senta\'s Ballad',
        key: 'F Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Senta\'s ballad and love scene',
        sections: [
          {
            title: 'Senta\'s Ballad and Love Scene',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'F Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Andante',
            description: 'Senta\'s ballad and love scene',
            musicalElements: {
              mood: ['Romantic', 'Mystical', 'Passionate'],
              instrumentation: ['Orchestra', 'Soprano', 'Baritone'],
              dynamics: 'From tender to powerful'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act III - Sailors\' Chorus',
        key: 'D Minor',
        tempo: 105,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Allegro',
        description: 'Sailors\' chorus and tragic ending',
        sections: [
          {
            title: 'Sailors\' Chorus and Tragic Ending',
            sectionNumber: 1,
            sectionType: 'chorus',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 105,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Allegro',
            description: 'Sailors\' chorus and tragic ending',
            musicalElements: {
              mood: ['Joyful', 'Tragic', 'Transcendent'],
              instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
              dynamics: 'From celebration to tragedy'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Minor',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1960,
        conductor: 'Otto Klemperer',
        orchestra: 'Philharmonia Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Dietrich Fischer-Dieskau', role: 'Dutchman' },
          { name: 'Leonie Rysanek', role: 'Senta' }
        ],
        significance: 'Legendary recording with Fischer-Dieskau\'s definitive Dutchman',
        historicalContext: 'This recording captures Fischer-Dieskau in his prime, with Klemperer\'s masterful conducting.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest Flying Dutchman recordings ever made, featuring Fischer-Dieskau\'s transcendent Dutchman.'
      }
    ],
    notes: 'Fischer-Dieskau recording of Wagner\'s first mature opera, featuring the legendary baritone\'s definitive interpretation of the Dutchman.'
  },

  'lp_wagner-tannhauser-die-gotterdammerung-t_richard-wagner-rudolf-kempe-berliner-ph': {
    identifier: 'lp_wagner-tannhauser-die-gotterdammerung-t_richard-wagner-rudolf-kempe-berliner-ph',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 85,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Passionate', 'Mystical', 'Noble', 'Tragic'],
    duration: '3:00:00',
    acts: [
      {
        actNumber: 1,
        title: 'Tannhäuser - Venusberg Scene',
        key: 'E-flat Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '60:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Venusberg scene and Tannhäuser\'s return',
        sections: [
          {
            title: 'Venusberg Scene and Tannhäuser\'s Return',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'E-flat Major',
            tempo: 95,
            timeSignature: '4/4',
            duration: '60:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Venusberg scene and Tannhäuser\'s return',
            musicalElements: {
              mood: ['Passionate', 'Mystical', 'Dramatic'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Soprano', 'Chorus'],
              dynamics: 'From sensual to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Götterdämmerung - Siegfried\'s Death',
        key: 'B Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '60:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Siegfried\'s death and the funeral march',
        sections: [
          {
            title: 'Siegfried\'s Death and Funeral March',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '60:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Siegfried\'s death and the funeral march',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'From quiet to overwhelming'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Götterdämmerung - Brünnhilde\'s Immolation',
        key: 'D-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '60:00',
        tempoMarking: 'Feierlich',
        description: 'Brünnhilde\'s immolation scene and the end of the gods',
        sections: [
          {
            title: 'Brünnhilde\'s Immolation',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '60:00',
            tempoMarking: 'Feierlich',
            description: 'Brünnhilde\'s final scene and immolation',
            musicalElements: {
              mood: ['Transcendent', 'Tragic', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'From quiet to overwhelming power'
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
    notablePerformances: [
      {
        year: 1960,
        conductor: 'Rudolf Kempe',
        orchestra: 'Berlin Philharmonic',
        venue: 'Jesus-Christus-Kirche, Berlin',
        singers: [
          { name: 'Rudolf Schock', role: 'Tannhäuser/Siegfried' },
          { name: 'Lisa Otto', role: 'Elisabeth/Brünnhilde' }
        ],
        significance: 'Legendary recording with Kempe\'s masterful conducting',
        historicalContext: 'This recording captures Kempe\'s definitive Wagner interpretations with the Berlin Philharmonic.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest Wagner compilations ever made, featuring Kempe\'s transcendent conducting.'
      }
    ],
    notes: 'Compilation of Wagner excerpts featuring Tannhäuser and Götterdämmerung scenes, showcasing Kempe\'s masterful conducting.'
  },

  'lp_wagner-excerpts-die-gotterdammerung_richard-wagner-hans-knappertsbusch-wiener': {
    identifier: 'lp_wagner-excerpts-die-gotterdammerung_richard-wagner-hans-knappertsbusch-wiener',
    metadataComplete: true,
    overallKey: 'D-flat Major',
    overallTempo: 75,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Tragic', 'Apocalyptic', 'Transcendent', 'Dramatic'],
    duration: '1:30:00',
    acts: [
      {
        actNumber: 1,
        title: 'Prologue - Norns\' Scene',
        key: 'D-flat Major',
        tempo: 70,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Sehr langsam',
        description: 'The Norns weave the rope of destiny and foretell the end of the gods',
        sections: [
          {
            title: 'Norns\' Scene',
            sectionNumber: 1,
            sectionType: 'ensemble',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 70,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Sehr langsam',
            description: 'The Norns weave the rope of destiny and foretell the end of the gods',
            musicalElements: {
              mood: ['Mystical', 'Fateful', 'Ominous'],
              instrumentation: ['Orchestra', 'Three Contraltos'],
              dynamics: 'From whispered to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Act I - Siegfried\'s Death',
        key: 'B Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Siegfried\'s death and the funeral march',
        sections: [
          {
            title: 'Siegfried\'s Death',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Siegfried\'s death at the hands of Hagen',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'From quiet to overwhelming'
            }
          },
          {
            title: 'Funeral March',
            sectionNumber: 2,
            sectionType: 'march',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '15:00',
            tempoMarking: 'Feierlich',
            description: 'The famous funeral march for Siegfried',
            musicalElements: {
              mood: ['Tragic', 'Noble', 'Overwhelming'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Act II - Brünnhilde\'s Immolation',
        key: 'D-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Feierlich',
        description: 'Brünnhilde\'s immolation scene and the end of the gods',
        sections: [
          {
            title: 'Brünnhilde\'s Immolation',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '35:00',
            tempoMarking: 'Feierlich',
            description: 'Brünnhilde\'s final scene and immolation',
            musicalElements: {
              mood: ['Transcendent', 'Tragic', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'From quiet to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1951,
        conductor: 'Hans Knappertsbusch',
        orchestra: 'Vienna Philharmonic',
        venue: 'Musikverein, Vienna',
        singers: [
          { name: 'Martha Mödl', role: 'Brünnhilde' },
          { name: 'Wolfgang Windgassen', role: 'Siegfried' }
        ],
        significance: 'Legendary recording with Knappertsbusch\'s masterful conducting',
        historicalContext: 'This recording captures Knappertsbusch\'s definitive Wagner interpretations with the Vienna Philharmonic.',
        recordingLabel: 'Decca',
        notes: 'Considered one of the greatest Wagner recordings ever made, featuring Knappertsbusch\'s transcendent conducting.'
      }
    ],
    notes: 'Excerpts from Wagner\'s Götterdämmerung featuring Knappertsbusch\'s masterful conducting and the Vienna Philharmonic.'
  },

  'lp_gtterdmmerung-three-excerpts_richard-wagner-wilhelm-furtwngler-kirsten': {
    identifier: 'lp_gtterdmmerung-three-excerpts_richard-wagner-wilhelm-furtwngler-kirsten',
    metadataComplete: true,
    overallKey: 'D-flat Major',
    overallTempo: 75,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Tragic', 'Apocalyptic', 'Transcendent', 'Dramatic'],
    duration: '1:00:00',
    acts: [
      {
        actNumber: 1,
        title: 'Siegfried\'s Death',
        key: 'B Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Siegfried\'s death at the hands of Hagen',
        sections: [
          {
            title: 'Siegfried\'s Death',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Siegfried\'s death at the hands of Hagen',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'From quiet to overwhelming'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Funeral March',
        key: 'B Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Feierlich',
        description: 'The famous funeral march for Siegfried',
        sections: [
          {
            title: 'Funeral March',
            sectionNumber: 1,
            sectionType: 'march',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Feierlich',
            description: 'The famous funeral march for Siegfried',
            musicalElements: {
              mood: ['Tragic', 'Noble', 'Overwhelming'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Brünnhilde\'s Immolation',
        key: 'D-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Feierlich',
        description: 'Brünnhilde\'s final scene and immolation',
        sections: [
          {
            title: 'Brünnhilde\'s Immolation',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Feierlich',
            description: 'Brünnhilde\'s final scene and immolation',
            musicalElements: {
              mood: ['Transcendent', 'Tragic', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'From quiet to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1952,
        conductor: 'Wilhelm Furtwängler',
        orchestra: 'Philharmonia Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Kirsten Flagstad', role: 'Brünnhilde' },
          { name: 'Ludwig Suthaus', role: 'Siegfried' }
        ],
        significance: 'Legendary recording with Flagstad and Furtwängler',
        historicalContext: 'This recording captures Flagstad\'s definitive Brünnhilde with Furtwängler\'s masterful conducting.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest Wagner recordings ever made, featuring Flagstad\'s transcendent Brünnhilde and Furtwängler\'s masterful conducting.'
      }
    ],
    notes: 'Three excerpts from Wagner\'s Götterdämmerung featuring Flagstad\'s definitive Brünnhilde and Furtwängler\'s masterful conducting.'
  },

  'lp_great-scenes-from-wagner-gtterdmmerung_arturo-toscanini-helen-traubel-lauritz-mel': {
    identifier: 'lp_great-scenes-from-wagner-gtterdmmerung_arturo-toscanini-helen-traubel-lauritz-mel',
    metadataComplete: true,
    overallKey: 'D-flat Major',
    overallTempo: 75,
    genre: ['Opera', 'Music Drama', 'Romantic'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Tragic', 'Apocalyptic', 'Transcendent', 'Dramatic'],
    duration: '1:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'Siegfried\'s Death',
        key: 'B Minor',
        tempo: 80,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Siegfried\'s death at the hands of Hagen',
        sections: [
          {
            title: 'Siegfried\'s Death',
            sectionNumber: 1,
            sectionType: 'scene',
            musicalFunction: 'development',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 80,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Siegfried\'s death at the hands of Hagen',
            musicalElements: {
              mood: ['Tragic', 'Dramatic', 'Fateful'],
              instrumentation: ['Full Orchestra', 'Tenor', 'Baritone'],
              dynamics: 'From quiet to overwhelming'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Funeral March',
        key: 'B Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Feierlich',
        description: 'The famous funeral march for Siegfried',
        sections: [
          {
            title: 'Funeral March',
            sectionNumber: 1,
            sectionType: 'march',
            musicalFunction: 'climax',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Feierlich',
            description: 'The famous funeral march for Siegfried',
            musicalElements: {
              mood: ['Tragic', 'Noble', 'Overwhelming'],
              instrumentation: ['Full Orchestra'],
              dynamics: 'From quiet reverence to overwhelming power'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Brünnhilde\'s Immolation',
        key: 'D-flat Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '25:00',
        tempoMarking: 'Feierlich',
        description: 'Brünnhilde\'s final scene and immolation',
        sections: [
          {
            title: 'Brünnhilde\'s Immolation',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'D-flat Major',
            tempo: 75,
            timeSignature: '4/4',
            duration: '25:00',
            tempoMarking: 'Feierlich',
            description: 'Brünnhilde\'s final scene and immolation',
            musicalElements: {
              mood: ['Transcendent', 'Tragic', 'Redemptive'],
              instrumentation: ['Full Orchestra', 'Soprano'],
              dynamics: 'From quiet to overwhelming power'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'D-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1952,
        conductor: 'Arturo Toscanini',
        orchestra: 'NBC Symphony Orchestra',
        venue: 'Studio 8H, New York',
        singers: [
          { name: 'Helen Traubel', role: 'Brünnhilde' },
          { name: 'Lauritz Melchior', role: 'Siegfried' }
        ],
        significance: 'Legendary recording with Toscanini\'s masterful conducting',
        historicalContext: 'This recording captures Toscanini\'s definitive Wagner interpretations with the NBC Symphony Orchestra.',
        recordingLabel: 'RCA Victor',
        notes: 'Considered one of the greatest Wagner recordings ever made, featuring Toscanini\'s transcendent conducting and Traubel\'s definitive Brünnhilde.'
      }
    ],
    notes: 'Great scenes from Wagner\'s Götterdämmerung featuring Toscanini\'s masterful conducting and Traubel\'s definitive Brünnhilde.'
  },

  'lp_sings-wagner_tiana-lemnitz-michael-raucheisen-franz-vlk': {
    identifier: 'lp_sings-wagner_tiana-lemnitz-michael-raucheisen-franz-vlk',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 85,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Piano', 'Soprano'],
    mood: ['Passionate', 'Dramatic', 'Transcendent', 'Mystical'],
    duration: '1:00:00',
    acts: [
      {
        actNumber: 1,
        title: 'Wagner Arias - Act I',
        key: 'A Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Mäßig bewegt',
        description: 'Collection of Wagner arias and scenes',
        sections: [
          {
            title: 'Wagner Arias Collection',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Mäßig bewegt',
            description: 'Collection of Wagner arias and scenes',
            musicalElements: {
              mood: ['Passionate', 'Dramatic', 'Transcendent'],
              instrumentation: ['Piano', 'Soprano'],
              dynamics: 'From tender to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Wagner Arias - Act II',
        key: 'C Major',
        tempo: 80,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Andante',
        description: 'Collection of Wagner arias and scenes',
        sections: [
          {
            title: 'Wagner Arias Collection',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'development',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Andante',
            description: 'Collection of Wagner arias and scenes',
            musicalElements: {
              mood: ['Romantic', 'Mystical', 'Passionate'],
              instrumentation: ['Piano', 'Soprano'],
              dynamics: 'From tender to powerful'
            }
          }
        ]
      },
      {
        actNumber: 3,
        title: 'Wagner Arias - Act III',
        key: 'B Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '20:00',
        tempoMarking: 'Langsam',
        description: 'Collection of Wagner arias and scenes',
        sections: [
          {
            title: 'Wagner Arias Collection',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'moderate',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '20:00',
            tempoMarking: 'Langsam',
            description: 'Collection of Wagner arias and scenes',
            musicalElements: {
              mood: ['Tragic', 'Transcendent', 'Mystical'],
              instrumentation: ['Piano', 'Soprano'],
              dynamics: 'From whispered to powerful'
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
    notablePerformances: [
      {
        year: 1950,
        conductor: 'Michael Raucheisen',
        orchestra: 'Piano',
        venue: 'Studio, Berlin',
        singers: [
          { name: 'Tiana Lemnitz', role: 'Various Wagner Heroines' }
        ],
        significance: 'Legendary recording with Lemnitz\'s definitive Wagner interpretations',
        historicalContext: 'This recording captures Lemnitz\'s definitive Wagner interpretations with Raucheisen\'s masterful piano accompaniment.',
        recordingLabel: 'Deutsche Grammophon',
        notes: 'Considered one of the greatest Wagner aria recordings ever made, featuring Lemnitz\'s transcendent interpretations.'
      }
    ],
    notes: 'Collection of Wagner arias featuring Lemnitz\'s definitive interpretations and Raucheisen\'s masterful piano accompaniment.'
  },

  'lp_alto-rhapsody-liebestod-from-tristan-und_johannes-brahms-richard-wagner-christa-lud': {
    identifier: 'lp_alto-rhapsody-liebestod-from-tristan-und_johannes-brahms-richard-wagner-christa-lud',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 85,
    genre: ['Opera', 'Romantic', 'Music Drama'],
    instrumentation: ['Full Orchestra', 'Alto', 'Chorus'],
    mood: ['Passionate', 'Tragic', 'Transcendent', 'Mystical'],
    duration: '1:00:00',
    acts: [
      {
        actNumber: 1,
        title: 'Brahms - Alto Rhapsody',
        key: 'C Major',
        tempo: 80,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante',
        description: 'Brahms\' Alto Rhapsody for alto, male chorus, and orchestra',
        sections: [
          {
            title: 'Alto Rhapsody',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'C Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '30:00',
            tempoMarking: 'Andante',
            description: 'Brahms\' Alto Rhapsody for alto, male chorus, and orchestra',
            musicalElements: {
              mood: ['Melancholic', 'Dramatic', 'Transcendent'],
              instrumentation: ['Orchestra', 'Alto', 'Male Chorus'],
              dynamics: 'From tender to powerful'
            }
          }
        ]
      },
      {
        actNumber: 2,
        title: 'Wagner - Liebestod from Tristan und Isolde',
        key: 'B Minor',
        tempo: 75,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Langsam und leidend',
        description: 'Isolde\'s Liebestod from Tristan und Isolde',
        sections: [
          {
            title: 'Liebestod',
            sectionNumber: 1,
            sectionType: 'aria',
            musicalFunction: 'resolution',
            complexity: 'complex',
            key: 'B Minor',
            tempo: 75,
            timeSignature: '4/4',
            duration: '30:00',
            tempoMarking: 'Langsam und leidend',
            description: 'Isolde\'s Liebestod from Tristan und Isolde',
            musicalElements: {
              mood: ['Tragic', 'Transcendent', 'Mystical'],
              instrumentation: ['Orchestra', 'Soprano'],
              dynamics: 'From whispered to overwhelming'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'dramatic'
    },
    notablePerformances: [
      {
        year: 1960,
        conductor: 'Otto Klemperer',
        orchestra: 'Philharmonia Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Christa Ludwig', role: 'Alto/Soprano' }
        ],
        significance: 'Legendary recording with Ludwig\'s definitive interpretations',
        historicalContext: 'This recording captures Ludwig\'s definitive interpretations of both Brahms and Wagner with Klemperer\'s masterful conducting.',
        recordingLabel: 'EMI',
        notes: 'Considered one of the greatest recordings ever made, featuring Ludwig\'s transcendent interpretations of both Brahms and Wagner.'
      }
    ],
    notes: 'Collection featuring Brahms\' Alto Rhapsody and Wagner\'s Liebestod, showcasing Ludwig\'s definitive interpretations of both composers.'
  }
};
