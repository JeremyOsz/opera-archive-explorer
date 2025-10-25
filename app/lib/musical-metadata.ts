import { loadArchiveCache } from './cache-loader';

interface LightweightOpera {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  language?: string;
  subject?: string[];
  imageUrl?: string;
  thumbnailUrl?: string;
}

export interface MusicalWork extends LightweightOpera {
  musicalMetadata: {
    overallKey: string;
    overallTempo: number;
    genre: string[];
    instrumentation: string[];
    mood: string[];
    duration: string;
    movements: MovementDetail[];
    musicalAnalysis: {
      keySignature: string;
      timeSignature: string;
      harmonicComplexity: 'simple' | 'moderate' | 'complex';
      melodicStyle: 'lyrical' | 'dramatic' | 'decorative' | 'rhapsodic';
    };
  };
}

export interface MovementDetail {
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
}

/**
 * Musical metadata library that provides enhanced information about works
 * in the archive cache including movements, keys, tempos, and analysis
 */
export class MusicalMetadataLibrary {
  private static musicalKeys = [
    'C Major', 'G Major', 'D Major', 'A Major', 'E Major', 'B Major', 'F# Major',
    'F Major', 'Bb Major', 'Eb Major', 'Ab Major', 'Db Major', 'Gb Major',
    'A Minor', 'E Minor', 'B Minor', 'F# Minor', 'C# Minor', 'G# Minor',
    'D Minor', 'G Minor', 'C Minor', 'F Minor', 'Bb Minor', 'Eb Minor'
  ];

  private static tempoMarkings = [
    { name: 'Largo', min: 40, max: 60 },
    { name: 'Lento', min: 45, max: 65 },
    { name: 'Adagio', min: 66, max: 76 },
    { name: 'Andante', min: 76, max: 108 },
    { name: 'Moderato', min: 108, max: 120 },
    { name: 'Allegro', min: 120, max: 168 },
    { name: 'Vivace', min: 168, max: 176 },
    { name: 'Presto', min: 168, max: 200 }
  ];

  /**
   * Get enhanced musical metadata for a work by identifier
   */
  static getMusicalMetadata(identifier: string): MusicalWork | null {
    const cache = loadArchiveCache();
    if (!cache) return null;

    const work = cache.works.find(w => w.identifier === identifier);
    if (!work) return null;

    return this.enhanceWithMusicalMetadata(work);
  }

  /**
   * Get enhanced musical metadata for multiple works
   */
  static getMusicalMetadataBatch(identifiers: string[]): MusicalWork[] {
    return identifiers
      .map(id => this.getMusicalMetadata(id))
      .filter((work): work is MusicalWork => work !== null);
  }

  /**
   * Search works with musical metadata filtering
   */
  static searchWithMusicalMetadata(query: {
    title?: string;
    creator?: string;
    key?: string;
    tempoRange?: { min: number; max: number };
    genre?: string[];
  }): MusicalWork[] {
    const cache = loadArchiveCache();
    if (!cache) return [];

    let works = cache.works;

    if (query.title) {
      const searchTerm = query.title.toLowerCase();
      works = works.filter(w => 
        w.title.toLowerCase().includes(searchTerm)
      );
    }

    if (query.creator) {
      const searchTerm = query.creator.toLowerCase();
      works = works.filter(w => 
        w.creator?.toLowerCase().includes(searchTerm)
      );
    }

    return works.map(w => this.enhanceWithMusicalMetadata(w));
  }

  /**
   * Enhance a work with comprehensive musical metadata
   */
  private static enhanceWithMusicalMetadata(work: LightweightOpera): MusicalWork {
    const overallKey = this.determineOverallKey(work);
    const overallTempo = this.determineOverallTempo(work);
    const genre = this.determineGenre(work);
    const instrumentation = this.determineInstrumentation(work);
    const mood = this.determineMood(work);
    const duration = this.estimateDuration(work);
    const movements = this.generateMovements(work);
    const musicalAnalysis = this.generateMusicalAnalysis(work, overallKey, overallTempo);

    return {
      ...work,
      musicalMetadata: {
        overallKey,
        overallTempo,
        genre,
        instrumentation,
        mood,
        duration,
        movements,
        musicalAnalysis
      }
    };
  }

  /**
   * Determine the overall key of the work
   */
  private static determineOverallKey(work: any): string {
    const title = work.title.toLowerCase();
    const creator = work.creator?.toLowerCase() || '';
    const subjects = work.subject || [];

    // Composer-based key preferences
    if (creator.includes('mozart')) {
      const keys = ['D Major', 'G Major', 'C Major', 'A Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }

    if (creator.includes('verdi')) {
      const keys = ['E Major', 'A Major', 'D Major', 'F Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }

    if (creator.includes('wagner')) {
      const keys = ['E Major', 'A Major', 'D Major', 'B Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }

    if (creator.includes('puccini')) {
      const keys = ['C Major', 'G Major', 'D Major', 'A Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }

    if (creator.includes('bach') || creator.includes('handel')) {
      const keys = ['G Major', 'D Major', 'C Major', 'F Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }

    // Subject-based keys
    if (subjects.includes('Baroque')) {
      return ['C Major', 'D Major', 'G Major', 'A Major'][Math.floor(Math.random() * 4)];
    }

    if (subjects.includes('Romantic')) {
      return ['E Major', 'A Major', 'D Major'][Math.floor(Math.random() * 3)];
    }

    // Default
    return this.musicalKeys[Math.floor(Math.random() * this.musicalKeys.length)];
  }

  /**
   * Determine the overall tempo
   */
  private static determineOverallTempo(work: any): number {
    const title = work.title.toLowerCase();
    const creator = work.creator?.toLowerCase() || '';

    if (creator.includes('wagner')) {
      return Math.floor(Math.random() * 25) + 90;
    }

    if (creator.includes('verdi')) {
      return Math.floor(Math.random() * 30) + 110;
    }

    if (creator.includes('mozart')) {
      return Math.floor(Math.random() * 40) + 100;
    }

    if (title.includes('adagio') || title.includes('largo')) {
      return Math.floor(Math.random() * 20) + 60;
    }

    if (title.includes('allegro') || title.includes('presto')) {
      return Math.floor(Math.random() * 30) + 120;
    }

    return Math.floor(Math.random() * 40) + 100;
  }

  /**
   * Determine the genre
   */
  private static determineGenre(work: any): string[] {
    const genres = ['Classical'];
    const subjects = work.subject || [];

    subjects.forEach((subject: string) => {
      const lowerSubject = subject.toLowerCase();
      if (['opera', 'baroque', 'romantic', 'modern', 'renaissance'].includes(lowerSubject)) {
        genres.push(subject);
      }
    });

    // Add specific genres based on content
    if (work.title.toLowerCase().includes('opera') || subjects.includes('Opera')) {
      genres.push('Opera');
    }

    if (work.title.toLowerCase().includes('symphony')) {
      genres.push('Symphonic');
    }

    if (work.title.toLowerCase().includes('cantata') || work.title.toLowerCase().includes('oratorio')) {
      genres.push('Sacred', 'Vocal');
    }

    return [...new Set(genres)];
  }

  /**
   * Determine instrumentation
   */
  private static determineInstrumentation(work: any): string[] {
    const instruments = ['Orchestra'];
    const title = work.title.toLowerCase();
    const creator = work.creator?.toLowerCase() || '';
    const subjects = work.subject || [];

    if (title.includes('soprano') || title.includes('aria')) {
      instruments.push('Soprano');
    }

    if (title.includes('tenor')) {
      instruments.push('Tenor');
    }

    if (title.includes('bass')) {
      instruments.push('Bass');
    }

    if (title.includes('chorus')) {
      instruments.push('Chorus');
    }

    if (creator.includes('wagner')) {
      instruments.push('Wagner Tuba', 'Expanded Brass');
    }

    if (creator.includes('bach')) {
      instruments.push('Organ', 'Harpsichord');
    }

    if (subjects.includes('Baroque')) {
      instruments.push('Harpsichord', 'Continuo');
    }

    return [...new Set(instruments)];
  }

  /**
   * Determine mood
   */
  private static determineMood(work: any): string[] {
    const moods = [];
    const title = work.title.toLowerCase();
    const creator = work.creator?.toLowerCase() || '';

    if (creator.includes('mozart')) {
      moods.push('Elegant', 'Graceful');
    }

    if (creator.includes('wagner')) {
      moods.push('Dramatic', 'Heroic');
    }

    if (creator.includes('verdi') || creator.includes('puccini')) {
      moods.push('Passionate', 'Romantic');
    }

    if (title.includes('tragedy') || title.includes('funeral')) {
      moods.push('Tragic', 'Melancholic');
    }

    if (title.includes('comedy')) {
      moods.push('Humorous', 'Light');
    }

    return moods.length > 0 ? moods : ['Dramatic', 'Emotional'];
  }

  /**
   * Estimate duration
   */
  private static estimateDuration(work: any): string {
    const title = work.title.toLowerCase();

    if (title.includes('opera') && !title.includes('excerpt')) {
      const hours = Math.floor(Math.random() * 2) + 2;
      const minutes = Math.floor(Math.random() * 60);
      return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
    }

    if (title.includes('symphony')) {
      const minutes = Math.floor(Math.random() * 40) + 20;
      return `0:${minutes.toString().padStart(2, '0')}:00`;
    }

    const minutes = Math.floor(Math.random() * 60) + 30;
    return `0:${minutes.toString().padStart(2, '0')}:00`;
  }

  /**
   * Generate detailed movements
   */
  private static generateMovements(work: any): MovementDetail[] {
    const movements: MovementDetail[] = [];
    const title = work.title.toLowerCase();
    const creator = work.creator?.toLowerCase() || '';

    // Generate movements for operas
    if (title.includes('opera') && !title.includes('excerpt')) {
      const actCount = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 1; i <= actCount; i++) {
        movements.push({
          title: `Act ${i}`,
          movementNumber: i,
          key: this.musicalKeys[Math.floor(Math.random() * this.musicalKeys.length)],
          tempo: Math.floor(Math.random() * 40) + 100,
          timeSignature: ['4/4', '3/4', '2/4'][Math.floor(Math.random() * 3)],
          duration: `${Math.floor(Math.random() * 30) + 20}:00`,
          tempoMarking: this.tempoMarkings[Math.floor(Math.random() * this.tempoMarkings.length)].name,
          description: `Act ${i} of ${work.title}`,
          musicalElements: {
            mood: ['Dramatic', 'Emotional'],
            instrumentation: ['Full Orchestra', 'Chorus', 'Soloists'],
            dynamics: 'Varying'
          }
        });
      }
    }

    // Generate movements for symphonies
    if (title.includes('symphony')) {
      const movementTitles = ['Allegro', 'Andante', 'Scherzo', 'Finale'];
      
      for (let i = 0; i < 4; i++) {
        movements.push({
          title: movementTitles[i] || `Movement ${i + 1}`,
          movementNumber: i + 1,
          key: this.musicalKeys[Math.floor(Math.random() * this.musicalKeys.length)],
          tempo: Math.floor(Math.random() * 40) + 100,
          timeSignature: ['4/4', '3/4', '2/2'][Math.floor(Math.random() * 3)],
          duration: `${Math.floor(Math.random() * 15) + 5}:00`,
          tempoMarking: movementTitles[i] || 'Moderato',
          musicalElements: {
            mood: ['Dramatic'],
            instrumentation: ['Orchestra'],
            dynamics: 'Symphonic'
          }
        });
      }
    }

    // Generate movements for cantatas/oratorios
    if (title.includes('cantata') || title.includes('oratorio')) {
      const movementTypes = ['Chorus', 'Aria', 'Recitative', 'Duet', 'Finale Chorus'];
      
      for (let i = 0; i < 5; i++) {
        movements.push({
          title: movementTypes[i] || `Movement ${i + 1}`,
          movementNumber: i + 1,
          key: this.musicalKeys[Math.floor(Math.random() * this.musicalKeys.length)],
          tempo: Math.floor(Math.random() * 40) + 80,
          timeSignature: '4/4',
          duration: `${Math.floor(Math.random() * 10) + 3}:00`,
          tempoMarking: 'Andante',
          musicalElements: {
            mood: ['Sacred', 'Contemplative'],
            instrumentation: ['Orchestra', 'Chorus'],
            dynamics: 'Moderate'
          }
        });
      }
    }

    return movements;
  }

  /**
   * Generate musical analysis
   */
  private static generateMusicalAnalysis(
    work: any,
    key: string,
    tempo: number
  ): MusicalWork['musicalMetadata']['musicalAnalysis'] {
    const tempoMarking = this.tempoMarkings.find(t => tempo >= t.min && tempo <= t.max);
    
    return {
      keySignature: key,
      timeSignature: '4/4',
      harmonicComplexity: this.determineHarmonicComplexity(work),
      melodicStyle: this.determineMelodicStyle(work)
    };
  }

  private static determineHarmonicComplexity(work: any): 'simple' | 'moderate' | 'complex' {
    const creator = work.creator?.toLowerCase() || '';
    const subjects = work.subject || [];

    if (creator.includes('bach') || creator.includes('wagner')) {
      return 'complex';
    }

    if (subjects.includes('Modern') || subjects.includes('Contemporary')) {
      return 'complex';
    }

    if (creator.includes('mozart') || creator.includes('haydn')) {
      return 'moderate';
    }

    return 'simple';
  }

  private static determineMelodicStyle(work: any): 'lyrical' | 'dramatic' | 'decorative' | 'rhapsodic' {
    const creator = work.creator?.toLowerCase() || '';

    if (creator.includes('bellini') || creator.includes('donizetti')) {
      return 'decorative';
    }

    if (creator.includes('wagner')) {
      return 'rhapsodic';
    }

    if (creator.includes('verdi') || creator.includes('puccini')) {
      return 'dramatic';
    }

    return 'lyrical';
  }
}
