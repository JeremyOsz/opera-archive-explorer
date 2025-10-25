# Work Lookup Table System

## Overview

The work lookup table is a **pre-generated mapping** that groups all 846 recordings into 751 distinct works. Instead of grouping recordings on the fly during search, the lookup table provides instant access to works and their recordings.

## Files

- `app/lib/work-lookup-generator.ts` - Generates the lookup table
- `app/lib/work-lookup-loader.ts` - Loads and searches the lookup table
- `app/data/work-lookup.json` - Pre-generated lookup table (auto-generated)
- `scripts/generate-work-lookup.ts` - Script to regenerate the table
- `app/lib/work-grouper.ts` - On-the-fly grouping utility (used for search results)

## Current Status

```
Total Works: 751
Total Recordings: 846
Version: 1.0.0
Last Generated: 2025-10-25
```

This means that on average, each work has **1.13 recordings** (some works have multiple recordings).

## Why Use a Lookup Table?

### Performance Benefits
- **Instant Lookup**: No need to process all 846 recordings to find a work
- **Pre-computed**: Grouping logic runs once during generation, not on every search
- **Fast Search**: Direct hash map lookup vs. iterating through arrays
- **Cached**: Loaded once and cached in memory

### Use Cases

**Lookup Table** (Best for):
- Quick "get all recordings for Madama Butterfly"
- Browse all works without filtering
- Work statistics and analytics
- Stable, predictable lookups

**On-the-Fly Grouping** (Best for):
- Filtered search results (e.g., "works by Puccini from 1950s")
- Dynamic user queries with multiple filters
- Temporary grouping based on user interactions

## Usage

### Loading the Lookup Table

```typescript
import { loadWorkLookup, searchWorks, getAllWorks } from '@/app/lib/work-lookup-loader';

// Load the entire table
const lookup = loadWorkLookup();

// Get all works
const allWorks = getAllWorks();

// Search for works
const results = searchWorks('Madama Butterfly');
```

### Search Example

```typescript
import { searchWorks, getWorkByTitle } from '@/app/lib/work-lookup-loader';
import { loadArchiveCache } from '@/app/lib/cache-loader';

// Search for works
const works = searchWorks('Puccini');

// Get recordings for a specific work
const work = getWorkByTitle('madama butterfly');
const recordings = loadArchiveCache()?.works.filter(
  r => work.recordingIdentifiers.includes(r.identifier)
);
```

### Work Structure

```typescript
interface WorkLookupEntry {
  workTitle: string;                    // Normalized title (lowercase)
  composer: string;                     // Composer name
  recordingIdentifiers: string[];       // IDs of all recordings for this work
  totalRecordings: number;              // Count of recordings
  years: string[];                      // Years of recordings (sorted, newest first)
  languages: string[];                  // Languages available
  mostRecentIdentifier?: string;        // ID of most recent recording
}
```

## Regenerating the Lookup Table

When the cache is updated, regenerate the lookup table:

```bash
npm run generate-lookup
```

Or manually:

```bash
npx tsx scripts/generate-work-lookup.ts
```

This will:
1. Load the latest `archive-cache.json`
2. Group all 846 recordings into works
3. Save to `app/data/work-lookup.json`
4. Display statistics

## Title Normalization

The lookup table normalizes titles to group variations together:

**Input titles:**
- "Highlights From Madama Butterfly"
- "Madama Butterfly (1954)"
- "Madama Butterfly - Act II"

**Normalized to:**
- "madama butterfly"

This ensures all recordings of the same work are grouped together.

## Integration with Current System

### Current Flow (app/page.tsx)
1. User searches → `ArchiveAPI.searchOperas()`
2. Get search results (individual recordings)
3. Group on-the-fly with `groupRecordingsByWork()`
4. Display in `WorkGroupGrid`

### Potential Lookup Table Flow
1. User searches → Use lookup table to find works
2. Filter works by search criteria
3. Get recording IDs for each work
4. Load full recording details from cache
5. Display grouped works

## Performance Comparison

### On-the-Fly Grouping (Current)
- Time: ~5-10ms per search
- Memory: Low (processes results)
- Suitable for: Filtered search results

### Lookup Table (Alternative)
- Time: ~1-2ms per search
- Memory: ~500KB (pre-loaded)
- Suitable for: Instant browsing, unbound queries

## Future Enhancements

1. **Hybrid Approach**: Use lookup table for browsing, on-the-fly for filtered searches
2. **Incremental Updates**: Only regenerate changed works
3. **Caching**: Cache frequently accessed works in memory
4. **Indexing**: Add full-text search on work titles and composers
5. **Metadata**: Include musical metadata in the lookup table

## Statistics

Run this to see the current stats:

```typescript
import { getLookupStats } from '@/app/lib/work-lookup-loader';

const stats = getLookupStats();
console.log(stats);
// {
//   totalWorks: 751,
//   totalRecordings: 846,
//   generatedAt: "2025-10-25T...",
//   version: "1.0.0"
// }
```

## Files Size

- `work-lookup.json`: ~400-500KB
- Loading time: <100ms
- Memory footprint: ~500KB in memory

## Notes

- The lookup table is **optional** - the system works fine without it
- On-the-fly grouping still works for search results
- Regenerate whenever `archive-cache.json` is updated
- The lookup table is committed to git for instant loading
