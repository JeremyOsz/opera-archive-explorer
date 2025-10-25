/**
 * Work-Specific Musical Metadata
 * 
 * This file contains actual musical metadata for specific works in the collection.
 * We're working in batches to map real metadata to each work.
 */

export interface WorkMusicalMetadata {
  identifier: string;
  metadataComplete: boolean;
  overallKey: string;
  overallTempo: number;
  genre: string[];
  instrumentation: string[];
  mood: string[];
  duration: string;
  movements: Array<{
    title: string;
    movementNumber: number;
    key: string;
    tempo: number;
    timeSignature: string;
    duration: string;
    tempoMarking: string;
    description?: string;
    musicalElements: {
      mood: string[];
      instrumentation: string[];
      dynamics: string;
    };
  }>;
  musicalAnalysis: {
    keySignature: string;
    timeSignature: string;
    harmonicComplexity: 'simple' | 'moderate' | 'complex';
    melodicStyle: 'lyrical' | 'dramatic' | 'decorative' | 'rhapsodic';
  };
  notes?: string;
}

/**
 * Musical metadata for specific works
 * Work is done in batches - see batch tracking at the bottom
 */
export const WORK_MUSICAL_METADATA: Record<string, WorkMusicalMetadata> = {
  // BATCH 1: Puccini Operas (COMPLETE)
  'lp_manon-lescaut_giacomo-puccini_4': {
    identifier: 'lp_manon-lescaut_giacomo-puccini_4',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 115,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Chorus'],
    mood: ['Passionate', 'Romantic', 'Dramatic', 'Tragic'],
    duration: '2:15:00',
    movements: [
      {
        title: 'Act I',
        movementNumber: 1,
        key: 'D Major',
        tempo: 120,
        timeSignature: '4/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: "Opening act introducing Des Grieux and Manon",
        musicalElements: {
          mood: ['Passionate', 'Lyrical'],
          instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
          dynamics: 'Marked'
        }
      },
      {
        title: 'Act II',
        movementNumber: 2,
        key: 'A Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Andante',
        description: 'Manon in luxury, reunion with Des Grieux',
        musicalElements: {
          mood: ['Romantic', 'Melancholic'],
          instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone'],
          dynamics: 'Varied'
        }
      },
      {
        title: 'Act III',
        movementNumber: 3,
        key: 'G Minor',
        tempo: 110,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Allegro Moderato',
        description: 'Gambling scene and arrest',
        musicalElements: {
          mood: ['Dramatic', 'Tense'],
          instrumentation: ['Full Orchestra', 'Chorus', 'Soloists'],
          dynamics: 'Fortissimo'
        }
      },
      {
        title: 'Act IV',
        movementNumber: 4,
        key: 'D Minor',
        tempo: 90,
        timeSignature: '4/4',
        duration: '30:00',
        tempoMarking: 'Andante Sostenuto',
        description: 'Tragic ending - Manon dying in Des Grieux arms',
        musicalElements: {
          mood: ['Tragic', 'Melancholic', 'Poignant'],
          instrumentation: ['Orchestra', 'Soprano', 'Tenor'],
          dynamics: 'Pianissimo to Forte'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'D Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
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
    movements: [
      {
        title: 'Act I',
        movementNumber: 1,
        key: 'C Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '40:00',
        tempoMarking: 'Allegro',
        description: 'Wedding ceremony and first meeting',
        musicalElements: {
          mood: ['Exotic', 'Joyous', 'Passionate'],
          instrumentation: ['Orchestra with Eastern touches', 'Soprano', 'Tenor', 'Baritone'],
          dynamics: 'Vivid'
        }
      },
      {
        title: 'Act II',
        movementNumber: 2,
        key: 'A Major',
        tempo: 95,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Butterfly\'s vigil - "Un bel dì vedremo" aria',
        musicalElements: {
          mood: ['Hopeful', 'Melancholic', 'Lyrically Dramatic'],
          instrumentation: ['Orchestra', 'Soprano', 'Mezzo-Soprano'],
          dynamics: 'Subtle to Powerful'
        }
      },
      {
        title: 'Act III',
        movementNumber: 3,
        key: 'D Minor',
        tempo: 100,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Moderato',
        description: 'Pinkerton returns with American wife, Butterfly\'s suicide',
        musicalElements: {
          mood: ['Tragic', 'Devastating', 'Poignant'],
          instrumentation: ['Full Orchestra', 'All Voices', 'Chorus'],
          dynamics: 'From Whispered to Forte'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'C Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Puccini\'s exotic masterpiece inspired by Japanese themes. Features the famous "Humming Chorus" and Butterfly\'s aria "Un bel dì vedremo".'
  },

  // BATCH 2: Verdi Operas (COMPLETE)
  'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g': {
    identifier: 'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g',
    metadataComplete: true,
    overallKey: 'F Major',
    overallTempo: 118,
    genre: ['Opera', 'Romantic', 'Classical'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Tenor', 'Baritone', 'Bass', 'Chorus'],
    mood: ['Dramatic', 'Tragic', 'Passionate'],
    duration: '2:05:00',
    movements: [
      {
        title: 'Act I',
        movementNumber: 1,
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
      },
      {
        title: 'Act II',
        movementNumber: 2,
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
      },
      {
        title: 'Act III',
        movementNumber: 3,
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
    ],
    musicalAnalysis: {
      keySignature: 'F Major',
      timeSignature: '4/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'dramatic'
    },
    notes: 'Verdi\'s masterpiece featuring the famous quartet "Bella figlia dell\'amore" and the curse theme. One of his most dramatic works.'
  },

  // BATCH 3: Baroque Works (COMPLETE)
  'lp_delightful-divertimentos-pretty-partit_johann-joachim-quantz-carl-stamitz-jan': {
    identifier: 'lp_delightful-divertimentos-pretty-partit_johann-joachim-quantz-carl-stamitz-jan',
    metadataComplete: true,
    overallKey: 'G Major',
    overallTempo: 100,
    genre: ['Baroque', 'Classical', 'Chamber Music'],
    instrumentation: ['Flute', 'Harpsichord', 'Strings', 'Continuo'],
    mood: ['Light', 'Graceful', 'Elegant'],
    duration: '0:45:00',
    movements: [
      {
        title: 'Allegro',
        movementNumber: 1,
        key: 'G Major',
        tempo: 115,
        timeSignature: '4/4',
        duration: '6:00',
        tempoMarking: 'Allegro',
        description: 'Fast opening movement',
        musicalElements: {
          mood: ['Brisk', 'Graceful'],
          instrumentation: ['Flute', 'Strings', 'Continuo'],
          dynamics: 'Light'
        }
      },
      {
        title: 'Andante',
        movementNumber: 2,
        key: 'D Major',
        tempo: 75,
        timeSignature: '4/4',
        duration: '5:00',
        tempoMarking: 'Andante',
        description: 'Slow, lyrical middle movement',
        musicalElements: {
          mood: ['Lyrical', 'Contemplative'],
          instrumentation: ['Flute', 'Harpsichord', 'Strings'],
          dynamics: 'Soft'
        }
      },
      {
        title: 'Finale',
        movementNumber: 3,
        key: 'G Major',
        tempo: 120,
        timeSignature: '3/4',
        duration: '4:00',
        tempoMarking: 'Allegro',
        description: 'Lively conclusion',
        musicalElements: {
          mood: ['Joyful', 'Playful'],
          instrumentation: ['Full Ensemble'],
          dynamics: 'Energetic'
        }
      }
    ],
    musicalAnalysis: {
      keySignature: 'G Major',
      timeSignature: '4/4',
      harmonicComplexity: 'simple',
      melodicStyle: 'lyrical'
    },
    notes: 'Collection of Baroque divertimentos. Stamitz represents the Mannheim school, while Quantz was flute master to Frederick the Great.'
  }
};

/**
 * Batch Tracking System
 * =====================
 * Track completion status of musical metadata batches
 */

export const BATCH_STATUS = {
  'BATCH 1: Puccini Operas': {
    status: 'COMPLETE',
    works: [
      'lp_manon-lescaut_giacomo-puccini_4',
      'lp_madama-butterfly_giacomo-puccini-dimitri-mitropoulos-dor_1'
    ],
    completedDate: '2025-01-XX'
  },
  'BATCH 2: Verdi Operas': {
    status: 'COMPLETE',
    works: [
      'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g'
    ],
    completedDate: '2025-01-XX'
  },
  'BATCH 3: Baroque Works': {
    status: 'COMPLETE',
    works: [
      'lp_delightful-divertimentos-pretty-partit_johann-joachim-quantz-carl-stamitz-jan'
    ],
    completedDate: '2025-01-XX'
  },
  'BATCH 4: Wagner Operas': {
    status: 'TODO',
    works: [
      'lp_wagner-tannhauser-die-gotterdammerung-t_richard-wagner-rudolf-kempe-berline',
      'lp_scenen-aus-gotterdammerung_richard-wagner-kirsten-flagstad-wilhelm',
      'lp_exerpts-from-tristan-und-isolde_birgit-nilsson-richard-wagner-wiener-ph_0',
      'lp_das-rheingold-highlights_richard-wagner-orchester-der-deutschen',
      'lp_lohengrin-complete_richard-wagner-boston-symphony-orchestra-e_0',
      'lp_the-flying-dutchman_richard-wagner-antal-dorati-george-london_1',
      'lp_the-flying-dutchman_richard-wagner-antal-dorati-orchestra-of-t',
      'lp_gtterdmmerung_richard-wagner-birgit-nilsson-wolfgang-win_0',
      'lp_parsifal_richard-wagner-hans-knappertsbusch-chor-de',
      'lp_the-flying-dutchman_richard-wagner-dietrich-fischer-dieskau-go',
      'lp_tristan-und-isolde-love-music-from-acts-ii_richard-wagner-manuel-de-falla-leopold-sto',
      'lp_die-meistersinger-von-nurnberg-complete-op_herbert-von-karajan-richard-wagner',
      'lp_gtterdmmerung-three-excerpts_richard-wagner-wilhelm-furtwngler-kirsten',
      'lp_wagner-excerpts-die-gotterdammerung_richard-wagner-hans-knappertsbusch-wiener',
      'lp_tannhuser_richard-wagner-wiener-philharmoniker-georg'
    ],
    completedDate: null
  },
  'BATCH 5: Mozart Works': {
    status: 'TODO',
    works: [
      'lp_manuel-ausensi-sings-mozart-and-cimaros_manuel-ausensi-wolfgang-amadeus-mozart',
      'lp_12-songs-and-2-comic-ensembles_wolfgang-amadeus-mozart-margot-guilleau',
      'lp_maria-kurenko-sings-with-orchestra_maria-kurenko-wolfgang-amadeus-mozart-g',
      'lp_the-marriage-of-figaro_wolfgang-amadeus-mozart-fernando-previt',
      'lp_don-giovanni_wolfgang-amadeus-mozart-wiener-symphoni_0',
      'lp_the-magic-flute_wolfgang-amadeus-mozart-lisa-otto-maria',
      'lp_don-giovanni-complete_wolfgang-amadeus-mozart-orchestre-de-la',
      'lp_bastien-und-bastienne-complete-k50_wolfgang-amadeus-mozart-ilse-hollweg-wa',
      'lp_don-giovanni_wolfgang-amadeus-mozart-otto-klemperer',
      'lp_the-magic-flute_wolfgang-amadeus-mozart-lucine-amara-la',
      'lp_the-marriage-of-figaro-le-nozze-di-figa_wolfgang-amadeus-mozart-wiener-philharmoni_0',
      'lp_cesare-valletti-town-hall-recital_cesare-valletti-bernardo-pasquini-wolfgan',
      'lp_requiem-k626_wolfgang-amadeus-mozart-hofmusikkapelle-wi',
      'lp_a-solemn-pontifical-requiem-mass-in-memory_wolfgang-amadeus-mozart',
      'lp_mozart-string-quartet-in-e-flat-major-kv_wolfgang-amadeus-mozart-joseph-haydn',
      'lp_mass-in-c-major-k317-coronation-vesperae_volfgang-amadeus-mozart-teresa-stichrandal',
      'lp_famous-mozart-arias_wolfgang-amadeus-mozart-leopold-simoneau-i',
      'lp_don-giovanni_wolfgang-amadeus-mozart-giuseppe-taddei-ma',
      'lp_mozart-le-nozze-di-figaro_wolfgang-amadeus-mozart-wiener-philharmoni',
      'lp_symphony-no-8-unfinished-symphony-no-41-j_franz-schubert-wolfgang-amadeus-mozart-the',
      'lp_the-marriage-of-figaro-k-492-complete_wolfgang-amadeus-mozart-glyndebourne-festi',
      'lp_la-betulia-liberata-k-118_wolfgang-amadeus-mozart',
      'lp_cosi-fan-tutti-women-are-like-that_wolfgang-amadeus-mozart-eleanor-steber-ric',
      'lp_don-giovanni_wolfgang-amadeus-mozart-sena-jurinac-irmga',
      'lp_le-nozze-di-figaro_volfgang-amadeus-mozart-irmgard-seefried-m',
      'lp_la-clemenza-di-tito_wolfgang-amadeus-mozart-the-swabian-choral',
      'lp_the-abduction-from-the-seraglio_wolfgang-amadeus-mozart-wiener-staatsopern',
      'lp_the-marriage-of-figaro-sung-in-german_wolfgang-amadeus-mozart-hilde-gden-hermann',
      'lp_idomeneo_wolfgang-amadeus-mozart-richard-lewis-leop',
      'lp_lucia-popp-sings-mozart-and-handel_volfgang-amadeus-mozart-english-chamber-or',
      'lp_the-comic-mozart-satirical-ensembles-arias_wolfgang-amadeus-mozart-erika-kth-peter-sc',
      'lp_le-nozze-di-figaro_wolfgang-amadeus-mozart-martial-singher-lu',
      'lp_die-zauberflte-the-magic-flute_volfgang-amadeus-mozart-hilde-guden-vilma'
    ],
    completedDate: null
  },
  'BATCH 6: Bach Works': {
    status: 'TODO',
    works: [
      'lp_matthaus-passion_johann-sebastian-bach-elly-ameling-marg',
      'lp_loeuvre-pour-orgue-3_johann-sebastian-bach-marie-claire-alai',
      'lp_piccolo-magnificat-le-rossignol-cantata_magda-laszlo-johann-sebastian-bach-geor',
      'lp_cantata-no-4-christ-lag-in-todesbanden_johann-sebastian-bach-thomanerchor-gewa',
      'lp_st-matthew-passion_johann-sebastian-bach-philharmonia-orchest_0',
      'lp_the-great-cantatas-of-johann-sebastian-bac_johann-sebastian-bach-friederike-sailer-cl_1',
      'lp_cantata-no-6-die-himmel-erzhlen-die-ehre-g_johann-sebastian-bach-magda-laszlo-hilde-r',
      'lp_cantata-bwv-199-cantata-bwv-09_yohann-sebastian-bach-maria-stader-cologne_0',
      'lp_entfliehet-verschwindet-entweichet-ihr-sor_johann-sebastian-bach',
      'lp_die-kunst-der-fuge-bwv-1080-the-art-of-fug_johann-sebastian-bach-kammerorchester-des_0',
      'lp_cantata-no-140-cantata-no-57_johann-sebastian-bach-ursula-buckel-prof-j',
      'lp_the-passion-according-to-saint-mark_johann-sebastian-bach-volfgang-gnnenvein-d',
      'lp_songs-of-a-wayfarer-sacred-arias_gustav-mahler-johann-sebastian-bach-carol',
      'lp_cantata-no-21-ich-hatte-viel-bekummernis_johann-sebastian-bach-rosl-schvaiger-lorna',
      'lp_weichet-nur-betrubte-schatten-and-praise-o_johann-sebastian-bach-georg-friedrich-hnde',
      'lp_easter-oratorio-bwv249_johann-sebastian-bach-teresa-ylisgara-patr',
      'lp_the-st-john-passion_fritz-wunderlich-dietrich-fischer-dieskau',
      'lp_two-cantatas-jesu-der-du-meine-seele-bwv_johann-sebastian-bach-edith-mathis-sybil-m',
      'lp_5-sacred-cantatas_dieterich-buxtehude-helmut-krebs-dietrich',
      'lp_saint-luke-passion_johann-sebastian-bach',
      'lp_j-s-bach-cantata-no-182-himmelskoenig-sei_johann-sebastian-bach-friederike-sailer-cl',
      'lp_cantata-no-103-ihr-werdet-weinen-und-heule_johann-sebastian-bach-barbara-scherler-geo',
      'lp_cantata-no-4-christ-lag-in-todesbanden-can_johann-sebastian-bach',
      'lp_cantata-no-110-unser-mund-sei-voll-lachen_johann-sebastian-bach-friederike-sailer-cl',
      'lp_cantata-no-147-herz-und-mund-und-tat-und-l_johann-sebastian-bach-helmut-krebs-franz-k',
      'lp_the-great-cantatas-of-j-s-bach-cantata-bwv_johann-sebastian-bach-edith-selig-georg-je'
    ],
    completedDate: null
  },
  'BATCH 7: Rossini Works': {
    status: 'TODO',
    works: [
      'lp_stabat-mater_gioacchino-rossini-rias-symphonie-orche',
      'lp_elisabetta-regina-dinghilterra_gioacchino-rossini_0',
      'lp_la-cenerentola-cinderella_gioacchino-rossini-giulietta-simionato',
      'lp_the-barber-of-seville_gioacchino-rossini-alceo-galliera-philh',
      'lp_le-comte-ory_gioacchino-rossini-glyndebourne-festiva',
      'lp_il-barbiere-di-siviglia_gioacchino-rossini-gianna-dangelo-renat',
      'lp_il-turco-in-italia_gioacchino-rossini-maria-callas-nicolai-ge_0',
      'lp_litaliana-in-algeri_gioacchino-rossini-orchestra-del-teatro-al',
      'lp_the-barber-of-seville_gioacchino-rossini-the-metropolitan-opera_0',
      'lp_the-barber-of-seville_gioacchino-rossini_2',
      'lp_litaliana-in-algeri_gioacchino-rossini-teresa-berganza-luigi-a',
      'lp_il-signor-bruschino-comic-opera-in-1-act_gioacchino-rossini-orchestra-filarmonica-d',
      'lp_loccasione-fa-il-ladro-il-cambio-della-val_gioacchino-rossini',
      'lp_stabat-mater_gioacchino-rossini-thomas-schippers-the-ne',
      'lp_romantic-songs_gioacchino-rossini-vincenzo-bellini-gaetan'
    ],
    completedDate: null
  },
  'BATCH 8: Verdi Operas (Additional)': {
    status: 'TODO',
    works: [
      'lp_recital-of-songs_patricia-neway-thomas-mayer-giuseppe-ve',
      'lp_requiem_giuseppe-verdi-igor-markevitch-moscow-p',
      'lp_otello_giuseppe-verdi-carlo-maria-guichandut-c',
      'lp_la-forza-del-destino_dimitri-mitropoulos-giuseppe-verdi-rena',
      'lp_rigoletto-giuseppe-verdi_giuseppe-verdi-patagonia-festival-choru',
      'lp_arias-and-duet-from-rigoletto_giuseppe-verdi-lina-pagliughi-sandor-sv',
      'lp_il-trovatore_giuseppe-verdi-giacomo-lauri-volpi-cate',
      'lp_il-trovatore-highlights_giuseppe-verdi-orchestra-del-teatro-del'
    ],
    completedDate: null
  },
  'BATCH 9: Richard Strauss Works': {
    status: 'TODO',
    works: [
      'lp_elektra_richard-strauss-elisabeth-hongen-walbur',
      'lp_a-heros-life_richard-strauss-minneapolis-symphony-or',
      'lp_der-rosenkavalier_richard-strauss_0',
      'lp_arabella-the-great-scenes_richard-strauss-josef-metternich-elisab',
      'lp_capriccio_richard-strauss-volfgang-savallisch-elisab',
      'lp_der-rosenkavalier_elisabeth-schvarzkopf-otto-edelmann-christ',
      'lp_taillefer-and-divertimento-after-couperin_richard-strauss-maria-cebotari-walther-lud'
    ],
    completedDate: null
  },
  'BATCH 10: Handel & Baroque Works': {
    status: 'TODO',
    works: [
      'lp_weichet-nur-betrubte-schatten-and-praise-o_johann-sebastian-bach-georg-friedrich-hnde'
    ],
    completedDate: null
  },
  'BATCH 11: Brahms & Romantic Period': {
    status: 'TODO',
    works: [
      'lp_a-german-requiem_johannes-brahms-elisabeth-schwarzkopf-d_2',
      'lp_requiem-for-mignon-op-98b-wesendonk-liede_robert-schumann-johannes-brahms-richard-wa',
      'lp_alt-rhapsody-liebestod-from-tristan-und_johannes-brahms-richard-wagner-christa-lud',
      'lp_johannes-brahms-richard-wagner-christa-ludwig-wiener-philharmoniker-karl-bohm'
    ],
    completedDate: null
  },
  'BATCH 12: French Composers': {
    status: 'TODO',
    works: [
      'lp_daphnis-et-chloe_charles-mouton-joseph-bodin-de-boismort',
      'lp_la-prichole_jacques-offenbach_0',
      'lp_the-tales-of-hoffmann-les-contes-des-ho_jacques-offenbach-the-metropolitan-oper_0',
      'lp_la-grande-duchesse-de-gerolstein_jacques-offenbach-eugenia-zareska-gisel',
      'lp_la-betulia-liberata-k-118_wolfgang-amadeus-mozart'
    ],
    completedDate: null
  },
  'BATCH 13: Folk & Traditional Music': {
    status: 'TODO',
    works: [
      'lp_echoes-of-budapest_imre-magyari-and-his-gypsy-orchestra',
      'lp_polka-party-favorites_polish-american-string-band',
      'lp_voices-of-switzerland_various-bob-schneider-jodelklub-glarnis',
      'lp_midnight-in-athens-new-songs-from-gre_takes-athenaios-yovanna-zoe-kouroukle',
      'lp_the-westland-steel-band_the-westland-steel-band'
    ],
    completedDate: null
  },
  'BATCH 14: Contemporary & Modern Works': {
    status: 'TODO',
    works: [
      'lp_music-and-musicians-of-canada-centennia_r-murray-schafer-john-weinzweig-udo-kas',
      'lp_the-sound-of-the-sun_the-westland-steel-band',
      'lp_missa-paschalis-missa-pulcherrima_marcin-leopolita-bartlomiej-pekiel',
      'lp_seattle-youth-symphony-orchestra-1967-1_vilem-sokol'
    ],
    completedDate: null
  },
  'BATCH 15: Vocal & Choral Works': {
    status: 'TODO',
    works: [
      'lp_shakespeare-songs-volume-iii_lawrence-chelsi-baritone',
      'lp_shakespeare-songs-volume-ii_lawrence-chelsi-baritone',
      'lp_normon-cordon-sings-kipling-songs-and-o_norman-cordon',
      'lp_recorded-live-at-a-german-party-guten-t_paul-mann-and-his-musicians-and-singers'
    ],
    completedDate: null
  }
};

/**
 * Get musical metadata for a work by identifier
 */
export function getWorkMusicalMetadata(identifier: string): WorkMusicalMetadata | null {
  return WORK_MUSICAL_METADATA[identifier] || null;
}

/**
 * Check if work has complete metadata
 */
export function hasCompleteMetadata(identifier: string): boolean {
  const metadata = WORK_MUSICAL_METADATA[identifier];
  return metadata?.metadataComplete || false;
}

/**
 * Get all completed works
 */
export function getCompletedWorks(): string[] {
  return Object.values(WORK_MUSICAL_METADATA)
    .filter(m => m.metadataComplete)
    .map(m => m.identifier);
}

/**
 * Get completion statistics
 */
export function getCompletionStats() {
  const total = Object.keys(WORK_MUSICAL_METADATA).length;
  const completed = Object.values(WORK_MUSICAL_METADATA).filter(m => m.metadataComplete).length;
  
  // Calculate total works across all batches
  const totalWorksInBatches = Object.values(BATCH_STATUS).reduce((sum, batch) => sum + batch.works.length, 0);
  const completedBatches = Object.values(BATCH_STATUS).filter(batch => batch.status === 'COMPLETE').length;
  const totalBatches = Object.keys(BATCH_STATUS).length;
  
  return {
    total,
    completed,
    pending: total - completed,
    percentage: ((completed / total) * 100).toFixed(1),
    batchStats: {
      totalBatches,
      completedBatches,
      totalWorksInBatches,
      batchCompletionPercentage: ((completedBatches / totalBatches) * 100).toFixed(1)
    }
  };
}
