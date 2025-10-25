# Library Files

This directory contains reusable utility functions and data structures for the opera archive explorer.

## Structure

### Core Functionality

- **`archive-api.ts`** - Main API for fetching and searching operas from Internet Archive, with fallback to local cache
- **`cache-loader.ts`** - Loads and searches the bundled archive cache

### Work Grouping & Lookup

- **`work-grouper.ts`** - Groups recordings by normalized work titles (on-the-fly grouping)
- **`work-lookup-generator.ts`** - Generates pre-computed work lookup table from cache
- **`work-lookup-loader.ts`** - Loads and searches the pre-generated work lookup table

### Musical Metadata

- **`musical-metadata.ts`** - Base library for generating musical metadata based on keywords
- **`musical-metadata-enhanced.ts`** - Enhanced library that uses actual mapped metadata when available
- **`work-musical-metadata.ts`** - Actual musical metadata mappings for specific works
- **`mock-musical-data.ts`** - Fallback data generator for works without mapped metadata

### Work Information

- **`work-about-data.ts`** - Work-level contextual information (description, history, themes, trivia)

### Documentation

- **`docs/`** - All README and documentation files

## Usage Patterns

### Searching for Operas
```typescript
import { ArchiveAPI } from '@/app/lib/archive-api';

const response = await ArchiveAPI.searchOperas({ query: 'Puccini' });
```

### Grouping Recordings by Work
```typescript
import { groupRecordingsByWork } from '@/app/lib/work-grouper';

const grouped = groupRecordingsByWork(recordings);
```

### Getting Musical Metadata
```typescript
import { EnhancedMusicalMetadataLibrary } from '@/app/lib/musical-metadata-enhanced';

const metadata = EnhancedMusicalMetadataLibrary.getMusicalMetadata(identifier);
```

### Getting Work Information
```typescript
import { getWorkAboutInfo } from '@/app/lib/work-about-data';

const about = getWorkAboutInfo('La Bohème');
```

## File Organization

Files are organized by their primary purpose:
- **API/Data access** - Archive API, cache loading
- **Work management** - Grouping, lookup, normalization
- **Musical data** - Metadata generation and mapping
- **Contextual info** - About sections, descriptions

## Data Flow

1. User searches → `archive-api.ts` → Cache or live API
2. Results grouped → `work-grouper.ts` → Normalized work titles
3. Work details → `musical-metadata-enhanced.ts` → Uses mapped data if available
4. Display → Components receive enriched data
