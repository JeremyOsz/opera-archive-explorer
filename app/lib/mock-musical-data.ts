import { OperaRecording } from '@/app/types/opera';

export interface MockMusicalData {
  musicalKey: string;
  tempo: number;
  genre: string[];
  instrumentation: string[];
  mood: string[];
  duration: string;
  movements?: Array<{
    title: string;
    duration: string;
    musicalKey: string;
    tempo: number;
    trackNumber: number;
  }>;
}

/**
 * Mock musical data generator based on real opera collection analysis
 */
export class MockMusicalDataGenerator {
  
  /**
   * Generate musical data based on opera title, creator, and subjects
   */
  static generateMusicalData(opera: OperaRecording): MockMusicalData {
    const title = opera.title.toLowerCase();
    const creator = opera.creator?.toLowerCase() || '';
    const subjects = opera.subject || [];
    
    // Determine musical key based on composer and title patterns
    const musicalKey = this.determineMusicalKey(title, creator, subjects);
    
    // Determine tempo based on opera type and composer
    const tempo = this.determineTempo(title, creator, subjects);
    
    // Determine genre based on subjects and title
    const genre = this.determineGenre(title, creator, subjects);
    
    // Determine instrumentation based on opera type
    const instrumentation = this.determineInstrumentation(title, creator, subjects);
    
    // Determine mood based on opera type and composer
    const mood = this.determineMood(title, creator, subjects);
    
    // Determine duration based on opera type
    const duration = this.determineDuration(title, creator, subjects);
    
    // Generate movements for operas
    const movements = this.generateMovements(title, creator, subjects);
    
    return {
      musicalKey,
      tempo,
      genre,
      instrumentation,
      mood,
      duration,
      movements
    };
  }
  
  private static determineMusicalKey(title: string, creator: string, subjects: string[]): string {
    // Composer-based key preferences
    if (creator.includes('mozart')) {
      const keys = ['D Major', 'G Major', 'C Major', 'A Major', 'F Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }
    
    if (creator.includes('verdi')) {
      const keys = ['E Major', 'A Major', 'D Major', 'F Major', 'C Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }
    
    if (creator.includes('wagner')) {
      const keys = ['E Major', 'A Major', 'D Major', 'B Major', 'F# Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }
    
    if (creator.includes('puccini')) {
      const keys = ['C Major', 'G Major', 'D Major', 'A Major', 'F Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }
    
    if (creator.includes('bach')) {
      const keys = ['G Major', 'D Major', 'C Major', 'A Major', 'F Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }
    
    if (creator.includes('beethoven')) {
      const keys = ['D Major', 'C Major', 'E Major', 'A Major', 'F Major'];
      return keys[Math.floor(Math.random() * keys.length)];
    }
    
    // Title-based patterns
    if (title.includes('overture') || title.includes('prelude')) {
      return 'D Major';
    }
    
    if (title.includes('aria') || title.includes('duet')) {
      return 'G Major';
    }
    
    if (title.includes('finale') || title.includes('chorus')) {
      return 'C Major';
    }
    
    // Default keys
    const defaultKeys = ['C Major', 'G Major', 'D Major', 'A Major', 'F Major', 'E Major'];
    return defaultKeys[Math.floor(Math.random() * defaultKeys.length)];
  }
  
  private static determineTempo(title: string, creator: string, subjects: string[]): number {
    // Composer-based tempo preferences
    if (creator.includes('mozart')) {
      return Math.floor(Math.random() * 40) + 100; // 100-140 BPM
    }
    
    if (creator.includes('verdi')) {
      return Math.floor(Math.random() * 30) + 110; // 110-140 BPM
    }
    
    if (creator.includes('wagner')) {
      return Math.floor(Math.random() * 25) + 90; // 90-115 BPM
    }
    
    if (creator.includes('puccini')) {
      return Math.floor(Math.random() * 35) + 105; // 105-140 BPM
    }
    
    if (creator.includes('bach')) {
      return Math.floor(Math.random() * 30) + 100; // 100-130 BPM
    }
    
    // Title-based patterns
    if (title.includes('overture') || title.includes('prelude')) {
      return Math.floor(Math.random() * 20) + 120; // 120-140 BPM
    }
    
    if (title.includes('aria') || title.includes('duet')) {
      return Math.floor(Math.random() * 25) + 80; // 80-105 BPM
    }
    
    if (title.includes('finale') || title.includes('chorus')) {
      return Math.floor(Math.random() * 30) + 100; // 100-130 BPM
    }
    
    if (title.includes('adagio') || title.includes('largo')) {
      return Math.floor(Math.random() * 20) + 60; // 60-80 BPM
    }
    
    if (title.includes('allegro') || title.includes('presto')) {
      return Math.floor(Math.random() * 30) + 120; // 120-150 BPM
    }
    
    // Default tempo range
    return Math.floor(Math.random() * 40) + 100; // 100-140 BPM
  }
  
  private static determineGenre(title: string, creator: string, subjects: string[]): string[] {
    const genres = ['Classical'];
    
    // Add subjects as genres if they're musical
    subjects.forEach(subject => {
      const lowerSubject = subject.toLowerCase();
      if (['opera', 'baroque', 'romantic', 'modern', 'renaissance', 'medieval', 'contemporary'].includes(lowerSubject)) {
        genres.push(subject);
      }
    });
    
    // Composer-based genre preferences
    if (creator.includes('mozart') || creator.includes('beethoven') || creator.includes('haydn')) {
      genres.push('Classical Period');
    }
    
    if (creator.includes('verdi') || creator.includes('puccini') || creator.includes('wagner')) {
      genres.push('Romantic Opera');
    }
    
    if (creator.includes('bach') || creator.includes('handel') || creator.includes('vivaldi')) {
      genres.push('Baroque');
    }
    
    if (creator.includes('strauss') || creator.includes('stravinsky') || creator.includes('shostakovich')) {
      genres.push('Modern');
    }
    
    // Title-based genre detection
    if (title.includes('opera') || title.includes('aria') || title.includes('duet')) {
      genres.push('Opera');
    }
    
    if (title.includes('symphony') || title.includes('concerto')) {
      genres.push('Symphonic');
    }
    
    if (title.includes('cantata') || title.includes('oratorio')) {
      genres.push('Sacred');
    }
    
    if (title.includes('chamber') || title.includes('quartet')) {
      genres.push('Chamber Music');
    }
    
    return [...new Set(genres)]; // Remove duplicates
  }
  
  private static determineInstrumentation(title: string, creator: string, subjects: string[]): string[] {
    const instruments = ['Orchestra'];
    
    // Voice types based on opera content
    if (title.includes('soprano') || title.includes('aria')) {
      instruments.push('Soprano');
    }
    
    if (title.includes('tenor') || title.includes('baritone')) {
      instruments.push('Tenor', 'Baritone');
    }
    
    if (title.includes('bass') || title.includes('contralto')) {
      instruments.push('Bass', 'Contralto');
    }
    
    if (title.includes('chorus') || title.includes('choir')) {
      instruments.push('Chorus');
    }
    
    // Composer-specific instrumentation
    if (creator.includes('wagner')) {
      instruments.push('Wagner Tuba', 'Expanded Orchestra');
    }
    
    if (creator.includes('bach')) {
      instruments.push('Organ', 'Harpsichord', 'Continuo');
    }
    
    if (creator.includes('mozart')) {
      instruments.push('Clarinet', 'Horn', 'Flute');
    }
    
    if (creator.includes('verdi')) {
      instruments.push('Brass Section', 'Percussion');
    }
    
    // Period-specific instruments
    if (subjects.includes('Baroque')) {
      instruments.push('Harpsichord', 'Lute', 'Recorder');
    }
    
    if (subjects.includes('Renaissance')) {
      instruments.push('Lute', 'Viol', 'Shawm');
    }
    
    return [...new Set(instruments)]; // Remove duplicates
  }
  
  private static determineMood(title: string, creator: string, subjects: string[]): string[] {
    const moods = [];
    
    // Composer-based mood characteristics
    if (creator.includes('mozart')) {
      moods.push('Elegant', 'Graceful', 'Joyful');
    }
    
    if (creator.includes('wagner')) {
      moods.push('Dramatic', 'Heroic', 'Intense');
    }
    
    if (creator.includes('verdi')) {
      moods.push('Passionate', 'Dramatic', 'Emotional');
    }
    
    if (creator.includes('puccini')) {
      moods.push('Romantic', 'Melancholic', 'Passionate');
    }
    
    if (creator.includes('bach')) {
      moods.push('Contemplative', 'Spiritual', 'Complex');
    }
    
    // Title-based mood detection
    if (title.includes('tragedy') || title.includes('death') || title.includes('funeral')) {
      moods.push('Tragic', 'Melancholic');
    }
    
    if (title.includes('comedy') || title.includes('buffa') || title.includes('comic')) {
      moods.push('Humorous', 'Light');
    }
    
    if (title.includes('love') || title.includes('romance')) {
      moods.push('Romantic', 'Passionate');
    }
    
    if (title.includes('war') || title.includes('battle') || title.includes('heroic')) {
      moods.push('Heroic', 'Dramatic');
    }
    
    if (title.includes('sacred') || title.includes('mass') || title.includes('cantata')) {
      moods.push('Spiritual', 'Reverent');
    }
    
    // Default moods for operas
    if (moods.length === 0) {
      moods.push('Dramatic', 'Emotional');
    }
    
    return moods;
  }
  
  private static determineDuration(title: string, creator: string, subjects: string[]): string {
    // Opera duration based on type
    if (title.includes('opera') && !title.includes('excerpt')) {
      const hours = Math.floor(Math.random() * 2) + 2; // 2-3 hours
      const minutes = Math.floor(Math.random() * 60);
      return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
    }
    
    if (title.includes('cantata') || title.includes('oratorio')) {
      const minutes = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
      return `0:${minutes.toString().padStart(2, '0')}:00`;
    }
    
    if (title.includes('symphony')) {
      const minutes = Math.floor(Math.random() * 40) + 20; // 20-60 minutes
      return `0:${minutes.toString().padStart(2, '0')}:00`;
    }
    
    if (title.includes('aria') || title.includes('song')) {
      const minutes = Math.floor(Math.random() * 10) + 3; // 3-13 minutes
      return `0:${minutes.toString().padStart(2, '0')}:00`;
    }
    
    // Default duration
    const minutes = Math.floor(Math.random() * 60) + 30;
    return `0:${minutes.toString().padStart(2, '0')}:00`;
  }
  
  private static generateMovements(title: string, creator: string, subjects: string[]): Array<{
    title: string;
    duration: string;
    musicalKey: string;
    tempo: number;
    trackNumber: number;
  }> {
    const movements = [];
    
    // Generate movements for operas
    if (title.includes('opera') && !title.includes('excerpt')) {
      const actCount = Math.floor(Math.random() * 3) + 2; // 2-4 acts
      
      for (let i = 1; i <= actCount; i++) {
        movements.push({
          title: `Act ${i}`,
          duration: `${Math.floor(Math.random() * 30) + 20}:00`, // 20-50 minutes
          musicalKey: this.determineMusicalKey(title, creator, subjects),
          tempo: this.determineTempo(title, creator, subjects),
          trackNumber: i
        });
      }
    }
    
    // Generate movements for symphonies
    if (title.includes('symphony')) {
      const movementTitles = ['Allegro', 'Andante', 'Scherzo', 'Finale'];
      const movementCount = Math.min(movementTitles.length, Math.floor(Math.random() * 4) + 2);
      
      for (let i = 0; i < movementCount; i++) {
        movements.push({
          title: movementTitles[i] || `Movement ${i + 1}`,
          duration: `${Math.floor(Math.random() * 15) + 5}:00`, // 5-20 minutes
          musicalKey: this.determineMusicalKey(title, creator, subjects),
          tempo: this.determineTempo(title, creator, subjects),
          trackNumber: i + 1
        });
      }
    }
    
    // Generate movements for cantatas
    if (title.includes('cantata')) {
      const movementTitles = ['Chorus', 'Recitative', 'Aria', 'Duet', 'Finale'];
      const movementCount = Math.min(movementTitles.length, Math.floor(Math.random() * 5) + 3);
      
      for (let i = 0; i < movementCount; i++) {
        movements.push({
          title: movementTitles[i] || `Movement ${i + 1}`,
          duration: `${Math.floor(Math.random() * 10) + 3}:00`, // 3-13 minutes
          musicalKey: this.determineMusicalKey(title, creator, subjects),
          tempo: this.determineTempo(title, creator, subjects),
          trackNumber: i + 1
        });
      }
    }
    
    return movements;
  }
}
