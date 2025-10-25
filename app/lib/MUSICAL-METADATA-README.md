# Musical Metadata Library

A comprehensive library that extends the archive cache with enhanced musical information including movements, keys, tempos, BPM, and detailed musical analysis.

## Overview

The Musical Metadata Library provides enriched musical data for works in the archive cache, including:

- **Musical Keys**: Overall keys and per-movement key signatures
- **Tempos**: BPM (Beats Per Minute) and tempo markings (Largo, Andante, Allegro, etc.)
- **Movements**: Detailed movement information with keys, tempos, and durations
- **Musical Analysis**: Harmonic complexity, melodic style, and time signatures
- **Genre & Mood**: Classification and emotional characteristics
- **Instrumentation**: Detailed instrument lists

## Features

### ✅ Comprehensive Movement Data
- Individual movement keys, tempos, and durations
- Time signatures per movement
- Tempo markings (Largo, Adagio, Andante, Allegro, etc.)
- Musical elements (mood, instrumentation, dynamics)

### ✅ Musical Analysis
- Harmonic complexity (simple, moderate, complex)
- Melodic style (lyrical, dramatic, decorative, rhapsodic)
- Key signatures and time signatures
- Genre classification

### ✅ Composer-Specific Logic
- Mozart: Elegant, moderate complexity, D/G/C major keys
- Verdi: Dramatic, passionate, E/A major keys
- Wagner: Complex harmonies, heroic, expanded brass
- Bach: Baroque instrumentation, complex, contemplative
- Puccini: Romantic, passionate, C/G major keys

### ✅ Smart Generation
- Movement structures based on work type (Opera, Symphony, Cantata)
- Key selection based on composer preferences
- Tempo calculation based on title and composer
- Genre detection from subjects and titles

## Installation

The library is part of the project and automatically available:

```typescript
import { MusicalMetadataLibrary } from '@/app/lib/musical-metadata';
```

## Usage

### Get Musical Metadata for a Single Work

```typescript
const work = MusicalMetadataLibrary.getMusicalMetadata('lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d');

if (work) {
  console.log('Title:', work.title);
  console.log('Key:', work.musicalMetadata.overallKey);
  console.log('Tempo:', work.musicalMetadata.overallTempo, 'BPM');
  console.log('Movements:', work.musicalMetadata.movements.length);
}
```

### Get Musical Metadata for Multiple Works

```typescript
const identifiers = [
  'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
  'lp_tosca_puccini',
  'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g'
];

const works = MusicalMetadataLibrary.getMusicalMetadataBatch(identifiers);

works.forEach(work => {
  console.log(`${work.title}: ${work.musicalMetadata.overallKey} (${work.musicalMetadata.overallTempo} BPM)`);
});
```

### Search with Musical Metadata

```typescript
// Search by title
const resultsByTitle = MusicalMetadataLibrary.searchWithMusicalMetadata({
  title: 'Tosca'
});

// Search by creator
const resultsByCreator = MusicalMetadataLibrary.searchWithMusicalMetadata({
  creator: 'Verdi'
});
```

### Access Movement Details

```typescript
const work = MusicalMetadataLibrary.getMusicalMetadata(identifier);

if (work) {
  work.musicalMetadata.movements.forEach(movement => {
    console.log(`${movement.movementNumber}. ${movement.title}`);
    console.log(`   Key: ${movement.key}`);
    console.log(`   Tempo: ${movement.tempo} BPM (${movement.tempoMarking})`);
    console.log(`   Duration: ${movement.duration}`);
    console.log(`   Time Signature: ${movement.timeSignature}`);
    console.log(`   Mood: ${movement.musicalElements.mood.join(', ')}`);
  });
}
```

### Musical Analysis

```typescript
const work = MusicalMetadataLibrary.getMusicalMetadata(identifier);

if (work) {
  const analysis = work.musicalMetadata.musicalAnalysis;
  
  console.log('Harmonic Complexity:', analysis.harmonicComplexity);
  console.log('Melodic Style:', analysis.melodicStyle);
  console.log('Key Signature:', analysis.keySignature);
  console.log('Time Signature:', analysis.timeSignature);
}
```

## Data Structure

### MusicalWork Interface

```typescript
interface MusicalWork {
  // Original work data
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  language?: string;
  subject?: string[];
  // ... other fields
  
  // Enhanced musical metadata
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
```

### MovementDetail Interface

```typescript
interface MovementDetail {
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
```

## Musical Keys

The library uses all major and minor keys:

**Major Keys**: C, G, D, A, E, B, F#, F, Bb, Eb, Ab, Db, Gb  
**Minor Keys**: A, E, B, F#, C#, G#, D, G, C, F, Bb, Eb

## Tempo Markings

Standard tempo markings with BPM ranges:

- **Largo**: 40-60 BPM
- **Lento**: 45-65 BPM
- **Adagio**: 66-76 BPM
- **Andante**: 76-108 BPM
- **Moderato**: 108-120 BPM
- **Allegro**: 120-168 BPM
- **Vivace**: 168-176 BPM
- **Presto**: 168-200 BPM

## Movement Generation Logic

### Operas
- Generates 2-4 acts
- Each act: 20-50 minutes
- Full orchestral instrumentation

### Symphonies
- Generates 4 movements: Allegro, Andante, Scherzo, Finale
- Each movement: 5-20 minutes
- Orchestral instrumentation

### Cantatas/Oratorios
- Generates 5 movements: Chorus, Aria, Recitative, Duet, Finale Chorus
- Each movement: 3-13 minutes
- Orchestral + Chorus instrumentation

## Composer Characteristics

### Mozart
- **Keys**: D Major, G Major, C Major, A Major
- **Tempo**: 100-140 BPM
- **Complexity**: Moderate
- **Style**: Lyrical
- **Mood**: Elegant, Graceful

### Verdi
- **Keys**: E Major, A Major, D Major
- **Tempo**: 110-140 BPM
- **Complexity**: Moderate-Complex
- **Style**: Dramatic
- **Mood**: Passionate, Romantic

### Wagner
- **Keys**: E Major, A Major, D Major, B Major
- **Tempo**: 90-115 BPM
- **Complexity**: Complex
- **Style**: Rhapsodic
- **Mood**: Dramatic, Heroic

### Bach
- **Keys**: G Major, D Major, C Major
- **Tempo**: 100-130 BPM
- **Complexity**: Complex
- **Style**: Lyrical
- **Mood**: Contemplative, Spiritual

## Examples

See `musical-metadata-example.ts` for comprehensive usage examples including:

1. Getting single work metadata
2. Batch processing multiple works
3. Searching with filters
4. Analyzing movements and tempos
5. Filtering by musical characteristics
6. Building analysis reports

## Integration

The library integrates seamlessly with:

- `cache-loader.ts`: Loads archive cache data
- `archive-api.ts`: Can enhance search results
- UI Components: Display rich musical information

## Performance

- All calculations are performed on cached data
- No external API calls
- Fast in-memory operations
- Suitable for real-time search and filtering

## Future Enhancements

Potential future improvements:

- [ ] Harmonic progression analysis
- [ ] Form analysis (Sonata, Rondo, etc.)
- [ ] Instrumentation details per movement
- [ ] Historical context and period characteristics
- [ ] Cross-work musical comparisons

## License

Part of the Opera Archive Explorer project.
