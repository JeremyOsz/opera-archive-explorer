/**
 * Brahms Works Musical Metadata
 * ==============================
 * Musical metadata for Brahms works in the collection
 */

// Define the interface locally to avoid circular imports
interface WorkMusicalMetadata {
  identifier: string;
  metadataComplete: boolean;
  overallKey: string;
  overallTempo: number;
  genre: string[];
  instrumentation: string[];
  mood: string[];
  duration: string;
  acts: Array<{
    actNumber: number;
    title: string;
    key: string;
    tempo: number;
    timeSignature: string;
    duration: string;
    tempoMarking: string;
    description?: string;
    sections: Array<{
      title: string;
      sectionNumber: number;
      sectionType: 'overture' | 'scene' | 'aria' | 'duet' | 'trio' | 'quartet' | 'chorus' | 'recitative' | 'interlude' | 'finale' | 'ensemble';
      musicalFunction: 'exposition' | 'development' | 'climax' | 'resolution' | 'transition' | 'character_introduction' | 'plot_progression' | 'dramatic_peak' | 'conclusion';
      complexity: 'simple' | 'moderate' | 'complex';
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
  }>;
  musicalAnalysis: {
    keySignature: string;
    timeSignature: string;
    harmonicComplexity: 'simple' | 'moderate' | 'complex';
    melodicStyle: 'lyrical' | 'dramatic' | 'decorative' | 'rhapsodic';
  };
  notes?: string;
}

export const BRAHMS_METADATA: Record<string, WorkMusicalMetadata> = {
  'lp_a-german-requiem_johannes-brahms-elisabeth-schwarzkopf-dietrich-fischer-dieskau': {
    identifier: 'lp_a-german-requiem_johannes-brahms-elisabeth-schwarzkopf-dietrich-fischer-dieskau',
    metadataComplete: true,
    overallKey: 'F Major',
    overallTempo: 80,
    genre: ['Requiem', 'Classical', 'Sacred'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Baritone', 'Chorus'],
    mood: ['Sacred', 'Contemplative', 'Comforting', 'Solemn'],
    duration: '1:15:00',
    acts: [
      {
        actNumber: 1,
        title: 'A German Requiem',
        key: 'F Major',
        tempo: 80,
        timeSignature: '4/4',
        duration: '75:00',
        tempoMarking: 'Andante',
        description: 'Brahms\' monumental requiem setting German texts',
        sections: [
          {
            title: 'A German Requiem',
            sectionNumber: 1,
            sectionType: 'requiem',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'F Major',
            tempo: 80,
            timeSignature: '4/4',
            duration: '75:00',
            tempoMarking: 'Andante',
            description: 'Brahms\' monumental requiem setting German texts',
            musicalElements: {
              mood: ['Sacred', 'Contemplative', 'Comforting'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Baritone', 'Chorus'],
              dynamics: 'From piano to fortissimo'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'F Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'lyrical'
    },
    notes: 'Brahms\' monumental requiem, setting German texts instead of Latin, offering comfort to the living rather than prayers for the dead.'
  },

  'lp_brahms_dietrich-fischer-dieskau-jorg-demus-johannes-brahms': {
    identifier: 'lp_brahms_dietrich-fischer-dieskau-jorg-demus-johannes-brahms',
    metadataComplete: true,
    overallKey: 'D Major',
    overallTempo: 100,
    genre: ['Lieder', 'Classical', 'Vocal'],
    instrumentation: ['Piano', 'Baritone'],
    mood: ['Intimate', 'Romantic', 'Melancholic', 'Passionate'],
    duration: '45:00',
    acts: [
      {
        actNumber: 1,
        title: 'Brahms Lieder Collection',
        key: 'D Major',
        tempo: 100,
        timeSignature: '4/4',
        duration: '45:00',
        tempoMarking: 'Andante',
        description: 'Collection of Brahms lieder performed by Dietrich Fischer-Dieskau',
        sections: [
          {
            title: 'Brahms Lieder Collection',
            sectionNumber: 1,
            sectionType: 'lieder',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'D Major',
            tempo: 100,
            timeSignature: '4/4',
            duration: '45:00',
            tempoMarking: 'Andante',
            description: 'Collection of Brahms lieder performed by Dietrich Fischer-Dieskau',
            musicalElements: {
              mood: ['Intimate', 'Romantic', 'Melancholic'],
              instrumentation: ['Piano', 'Baritone'],
              dynamics: 'From piano to forte'
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
    notes: 'Dietrich Fischer-Dieskau performing Brahms lieder with Jörg Demus, showcasing the intimate art of German song.'
  },

  'lp_the-liebeslieder-waltses-op-52-and-op-65_johannes-brahms-the-robert-shaw-chorale': {
    identifier: 'lp_the-liebeslieder-waltses-op-52-and-op-65_johannes-brahms-the-robert-shaw-chorale',
    metadataComplete: true,
    overallKey: 'A Major',
    overallTempo: 120,
    genre: ['Choral', 'Classical', 'Waltz'],
    instrumentation: ['Piano Four Hands', 'Chorus'],
    mood: ['Romantic', 'Joyful', 'Elegant', 'Charming'],
    duration: '35:00',
    acts: [
      {
        actNumber: 1,
        title: 'Liebeslieder Waltzes',
        key: 'A Major',
        tempo: 120,
        timeSignature: '3/4',
        duration: '35:00',
        tempoMarking: 'Allegro',
        description: 'Brahms\' charming waltzes for chorus and piano four hands',
        sections: [
          {
            title: 'Liebeslieder Waltzes',
            sectionNumber: 1,
            sectionType: 'waltz',
            musicalFunction: 'exposition',
            complexity: 'moderate',
            key: 'A Major',
            tempo: 120,
            timeSignature: '3/4',
            duration: '35:00',
            tempoMarking: 'Allegro',
            description: 'Brahms\' charming waltzes for chorus and piano four hands',
            musicalElements: {
              mood: ['Romantic', 'Joyful', 'Elegant'],
              instrumentation: ['Piano Four Hands', 'Chorus'],
              dynamics: 'Varied'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'A Major',
      timeSignature: '3/4',
      harmonicComplexity: 'moderate',
      melodicStyle: 'lyrical'
    },
    notes: 'Brahms\' charming waltzes for chorus and piano four hands, combining the elegance of the waltz with choral writing.'
  },

  'lp_a-german-requiem-kindertotenlieder_johannes-brahms-gustav-mahler-rudolf-kempe': {
    identifier: 'lp_a-german-requiem-kindertotenlieder_johannes-brahms-gustav-mahler-rudolf-kempe',
    metadataComplete: true,
    overallKey: 'D Minor',
    overallTempo: 85,
    genre: ['Requiem', 'Lieder', 'Classical', 'Sacred'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Baritone', 'Chorus'],
    mood: ['Sacred', 'Contemplative', 'Melancholic', 'Comforting'],
    duration: '1:20:00',
    acts: [
      {
        actNumber: 1,
        title: 'A German Requiem / Kindertotenlieder',
        key: 'D Minor',
        tempo: 85,
        timeSignature: '4/4',
        duration: '80:00',
        tempoMarking: 'Andante',
        description: 'Brahms\' German Requiem paired with Mahler\'s Kindertotenlieder',
        sections: [
          {
            title: 'A German Requiem / Kindertotenlieder',
            sectionNumber: 1,
            sectionType: 'requiem',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'D Minor',
            tempo: 85,
            timeSignature: '4/4',
            duration: '80:00',
            tempoMarking: 'Andante',
            description: 'Brahms\' German Requiem paired with Mahler\'s Kindertotenlieder',
            musicalElements: {
              mood: ['Sacred', 'Contemplative', 'Melancholic'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Baritone', 'Chorus'],
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
      melodicStyle: 'dramatic'
    },
    notes: 'Brahms\' German Requiem paired with Mahler\'s Kindertotenlieder, both works dealing with death and consolation.'
  },

  'lp_requiem-for-mignon-op-98b-wesendonk-lieder_johannes-brahms-richard-wagner-gustav-mahler': {
    identifier: 'lp_requiem-for-mignon-op-98b-wesendonk-lieder_johannes-brahms-richard-wagner-gustav-mahler',
    metadataComplete: true,
    overallKey: 'E-flat Major',
    overallTempo: 90,
    genre: ['Requiem', 'Lieder', 'Classical', 'Vocal'],
    instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus'],
    mood: ['Sacred', 'Contemplative', 'Romantic', 'Melancholic'],
    duration: '50:00',
    acts: [
      {
        actNumber: 1,
        title: 'Requiem for Mignon / Wesendonk Lieder',
        key: 'E-flat Major',
        tempo: 90,
        timeSignature: '4/4',
        duration: '50:00',
        tempoMarking: 'Andante',
        description: 'Brahms\' Requiem for Mignon paired with Wagner\'s Wesendonk Lieder',
        sections: [
          {
            title: 'Requiem for Mignon / Wesendonk Lieder',
            sectionNumber: 1,
            sectionType: 'requiem',
            musicalFunction: 'exposition',
            complexity: 'complex',
            key: 'E-flat Major',
            tempo: 90,
            timeSignature: '4/4',
            duration: '50:00',
            tempoMarking: 'Andante',
            description: 'Brahms\' Requiem for Mignon paired with Wagner\'s Wesendonk Lieder',
            musicalElements: {
              mood: ['Sacred', 'Contemplative', 'Romantic'],
              instrumentation: ['Full Orchestra', 'Soprano', 'Alto', 'Tenor', 'Bass', 'Chorus'],
              dynamics: 'From piano to forte'
            }
          }
        ]
      }
    ],
    musicalAnalysis: {
      keySignature: 'E-flat Major',
      timeSignature: '4/4',
      harmonicComplexity: 'complex',
      melodicStyle: 'lyrical'
    },
    notes: 'Brahms\' Requiem for Mignon paired with Wagner\'s Wesendonk Lieder, showcasing different approaches to sacred and romantic music.'
  }
};
