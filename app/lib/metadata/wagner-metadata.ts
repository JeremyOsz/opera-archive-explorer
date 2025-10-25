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
            duration: '65:00',
            tempoMarking: 'Langsam und schmachtend',
            description: 'The love potion scene - Tristan and Isolde fall in love',
            musicalElements: {
              mood: ['Passionate', 'Mystical', 'Tense'],
              instrumentation: ['Orchestra', 'Soprano', 'Tenor', 'Baritone'],
              dynamics: 'From pianissimo to fortissimo'
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
  }
};
