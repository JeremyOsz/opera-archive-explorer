# Metadata Integration in Info Dialogs

## Overview

The opera detail dialogs now display rich musical metadata from the work-specific mapping system. The dialogs automatically use actual mapped metadata when available, falling back to generated data for unmapped works.

## What's New

### 1. Metadata Badge System
- **✓ Mapped Metadata** (green badge): Shows when actual mapped metadata is available
- **Generated** (gray badge): Shows when using fallback/generated data

### 2. Enhanced Movements Section
For works with mapped metadata, the movements section displays:
- **Act/Movement titles** with detailed descriptions
- **Individual keys** for each movement
- **Per-movement tempos** with BPM values
- **Durations** for each movement
- **Badges** for better visual organization

### 3. Musical Analysis Section
When mapped metadata is available, the dialog shows:
- **Harmonic Complexity**: simple, moderate, or complex
- **Melodic Style**: lyrical, dramatic, decorative, or rhapsodic  
- **Time Signatures**: Standard musical notation

### 4. Source Indication
The dialog clearly indicates whether the musical information is:
- From actual mapped metadata (verified musicological data)
- Generated based on composer/keyword patterns

## Example: Puccini's Manon Lescaut

When viewing this opera, you'll see:

```
Musical Information [✓ Mapped Metadata]

Key: D Major
Tempo: 115 BPM
Duration: 2:15:00

Genre: Opera, Romantic, Classical
Instrumentation: Full Orchestra, Soprano, Tenor, Baritone, Chorus
Mood: Passionate, Romantic, Dramatic, Tragic

Musical Analysis
- Harmonic Complexity: Moderate
- Melodic Style: Dramatic  
- Time Signature: 4/4

Movements & Tracks [• Actual work structure]
1. Act I - Opening act introducing Des Grieux and Manon
   ♫ D Major | ♪ 120 BPM | ⏱ 35:00

2. Act II - Manon in luxury, reunion with Des Grieux
   ♫ A Major | ♪ 100 BPM | ⏱ 40:00

3. Act III - Gambling scene and arrest
   ♫ G Minor | ♪ 110 BPM | ⏱ 30:00

4. Act IV - Tragic ending - Manon dying in Des Grieux arms
   ♫ D Minor | ♪ 90 BPM | ⏱ 30:00
```

## Technical Implementation

### Data Flow

1. **Component Load**: `OperaDetail` component receives an opera
2. **Metadata Lookup**: Calls `EnhancedMusicalMetadataLibrary.getMusicalMetadata()`
3. **Smart Fallback**: 
   - If mapped metadata exists → uses actual data
   - If not → falls back to generated metadata
4. **UI Enhancement**: Displays data with appropriate badges and formatting

### Key Files

- `app/components/OperaDetail.tsx` - Main dialog component
- `app/lib/musical-metadata-enhanced.ts` - Enhanced metadata library
- `app/lib/work-musical-metadata.ts` - Work-specific mappings
- `app/lib/musical-metadata.ts` - Fallback generation

## User Experience

### Mapped Works (4 currently available)
Users see:
- ✅ Green "Mapped Metadata" badge
- Detailed movement breakdowns
- Contextual descriptions
- Musical analysis
- Historical accuracy

### Unmapped Works (842 remaining)
Users see:
- Gray "Generated" badge  
- Basic musical information
- Genre and instrumentation
- Fallback movement structure

## Current Status

**Completed Batches:**
- ✅ Batch 1: Puccini Operas (2 works)
- ✅ Batch 2: Verdi Operas (1 work)
- ✅ Batch 3: Baroque Works (1 work)

**Total Mapped:** 4 works out of 846

As more works are added to the mapping system, the info dialogs will automatically display richer metadata.

## Visual Enhancements

The dialogs now feature:
- **Color-coded badges** for data quality
- **Improved spacing** and layout
- **Hover effects** on movement cards
- **Badge-based** information display for better readability
- **Contextual indicators** showing data source

## Future Expansion

As additional batches are completed:
- More works will show "✓ Mapped Metadata" badges
- Movement descriptions will become available
- Historical context notes will be displayed
- Musicological analysis will be enriched

This creates a gradual improvement in data quality while maintaining a functional experience for all works in the collection.
