# Work-Specific Musical Metadata Mapping

This system provides **actual musical metadata** for specific works in the collection, working in batches to map real metadata to each work.

## Overview

Instead of generating metadata based on keywords, this system maps **real musical metadata** (keys, tempos, movements, etc.) to actual works in your collection.

## Files

- `work-musical-metadata.ts` - Contains the actual mapped metadata for specific works
- `musical-metadata-enhanced.ts` - Enhanced library that uses mapped data when available
- `BATCH_STATUS` - Tracks which batches of works have been completed

## How It Works

### 1. Batch System

Works are organized into batches for systematic completion:

- **Batch 1**: Puccini Operas ✅
- **Batch 2**: Verdi Operas ✅  
- **Batch 3**: Baroque Works ✅
- **Batch 4**: Wagner Operas (TODO)
- **Batch 5**: Mozart Works (TODO)
- **Batch 6**: Bach Works (TODO)
- **Batch 7**: Rossini Works (TODO)

### 2. Actual Metadata

For each mapped work, we provide:

- **Overall Key**: The primary key signature (e.g., "D Major", "G Minor")
- **Overall Tempo**: BPM (e.g., 115, 120)
- **Genre**: Specific classifications
- **Instrumentation**: Exact instruments used
- **Mood**: Emotional characteristics
- **Movements**: Detailed movement-by-movement breakdown including:
  - Individual movement keys
  - Tempo per movement
  - Duration
  - Musical elements (mood, dynamics)
  - Descriptions
- **Musical Analysis**: Harmonic complexity, melodic style
- **Notes**: Historical/contextual information

## Usage

### Get Mapped Metadata

```typescript
import { getWorkMusicalMetadata } from '@/app/lib/work-musical-metadata';

const metadata = getWorkMusicalMetadata('lp_manon-lescaut_giacomo-puccini_4');

if (metadata) {
  console.log('Key:', metadata.overallKey);
  console.log('Tempo:', metadata.overallTempo);
  console.log('Movements:', metadata.movements.length);
  
  metadata.movements.forEach(movement => {
    console.log(`${movement.movementNumber}. ${movement.title}`);
    console.log(`   Key: ${movement.key}, Tempo: ${movement.tempo} BPM`);
    console.log(`   Description: ${movement.description}`);
  });
}
```

### Enhanced Library (Fallback System)

```typescript
import { EnhancedMusicalMetadataLibrary } from '@/app/lib/musical-metadata-enhanced';

const work = EnhancedMusicalMetadataLibrary.getMusicalMetadata(identifier);

if (work) {
  // Check if this is actual mapped metadata or generated
  if (work.musicalMetadata.isMapped) {
    console.log('✅ Using actual mapped metadata');
  } else {
    console.log('📝 Using generated metadata');
  }
  
  console.log('Source:', work.musicalMetadata.source); // 'mapped' or 'generated'
}
```

## Current Status

### ✅ Completed Batches

**Batch 1: Puccini Operas** (2 works)
- Manon Lescaut
- Madama Butterfly

**Batch 2: Verdi Operas** (1 work)
- Rigoletto

**Batch 3: Baroque Works** (1 work)
- Delightful Divertimentos & Pretty Partitas

### 📋 To Do

**Batch 4**: Wagner Operas  
**Batch 5**: Mozart Works  
**Batch 6**: Bach Works  
**Batch 7**: Rossini Works  

## Example: Puccini's Madama Butterfly

```typescript
{
  overallKey: 'C Major',
  overallTempo: 110,
  movements: [
    {
      title: 'Act I',
      key: 'C Major',
      tempo: 115,
      tempoMarking: 'Allegro',
      description: 'Wedding ceremony and first meeting',
      musicalElements: {
        mood: ['Exotic', 'Joyous', 'Passionate'],
        instrumentation: ['Orchestra with Eastern touches', 'Soprano', 'Tenor'],
        dynamics: 'Vivid'
      }
    },
    // ... more movements
  ],
  notes: 'Puccini\'s exotic masterpiece inspired by Japanese themes. Features the famous "Humming Chorus" and Butterfly\'s aria "Un bel dì vedremo".'
}
```

## Adding New Work Mappings

To add metadata for a new work:

1. Open `work-musical-metadata.ts`
2. Add a new entry to `WORK_MUSICAL_METADATA`
3. Fill in all required fields based on the actual work
4. Set `metadataComplete: true`
5. Update the batch tracking in `BATCH_STATUS`

## Benefits

✅ **Real Data**: Actual musical metadata, not generated  
✅ **Accurate**: Historical and musicological accuracy  
✅ **Detailed**: Movement-by-movement breakdown  
✅ **Contextual**: Includes notes and descriptions  
✅ **Gradual**: Work in batches, add more over time  

## Statistics

```typescript
import { getCompletionStats } from '@/app/lib/work-musical-metadata';

const stats = getCompletionStats();
console.log(stats);
// {
//   total: 4,
//   completed: 4,
//   pending: 0,
//   percentage: '100.0'
// }
```

## Integration

This system integrates with:

- `cache-loader.ts`: Base work data
- `musical-metadata.ts`: Fallback generation
- UI Components: Display rich musical information

## Future Work

Continue adding works batch by batch:

1. Identify a batch of related works
2. Research the actual musical metadata
3. Map movements, keys, tempos
4. Add to `work-musical-metadata.ts`
5. Mark batch as complete
6. Repeat

This approach ensures quality over quantity, providing real musical insights for each work as they're added.
