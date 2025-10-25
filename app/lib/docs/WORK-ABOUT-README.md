# Work About Section

## Overview

The About section provides **work-level contextual information** for specific operas, including descriptions, historical context, themes, and interesting trivia. This information is about the work itself, not individual recordings.

## What's Included

Each work includes four types of information:

1. **Description**: Overview of the opera's story and significance
2. **History & Premiere**: Historical context, premiere details, and development
3. **Themes**: Major themes explored in the work
4. **Interesting Facts**: Trivia, notable details, and cultural impact

## Current Works

Currently, 5 operas have About information:

- **Madama Butterfly** - Puccini's tragic masterpiece
- **La Bohème** - Puccini's beloved story of bohemian artists
- **Rigoletto** - Verdi's dark tragedy
- **Manon Lescaut** - Puccini's first major success
- **Tosca** - Puccini's intense drama

## UI Integration

The About section appears in the `OperaDetail` dialog:

- **Collapsible**: Click to expand/collapse
- **Default state**: Collapsed
- **Only shows**: When information exists for that work
- **Position**: After Musical Information, before Movements

### Example Display

```
┌─────────────────────────────────────────┐
│ About the Work                    [▼]   │
├─────────────────────────────────────────┤
│ 📄 Description                          │
│ Puccini's beloved opera about a group...│
│                                         │
│ 📖 History & Premiere                   │
│ Premiered in Turin in 1896...          │
│                                         │
│ 💡 Themes                               │
│ [Youth and Idealism] [Poverty and Art] │
│                                         │
│ ✨ Interesting Facts                    │
│ • Puccini and Leoncavallo both wrote...│
│ • The famous aria "Che gelida manina"...│
└─────────────────────────────────────────┘
```

## Files

- `app/lib/work-about-data.ts` - Data structure and functions
- `app/components/OperaDetail.tsx` - UI integration

## Usage

### Get About Information

```typescript
import { getWorkAboutInfo } from '@/app/lib/work-about-data';

const aboutInfo = getWorkAboutInfo('La Bohème');

if (aboutInfo) {
  console.log(aboutInfo.description);
  console.log(aboutInfo.history);
  console.log(aboutInfo.themes); // Array of theme strings
  console.log(aboutInfo.trivia); // Array of trivia strings
}
```

### Check if Info Exists

```typescript
import { hasWorkAboutInfo } from '@/app/lib/work-about-data';

if (hasWorkAboutInfo('Madama Butterfly')) {
  // Display about section
}
```

### Get All Works with Info

```typescript
import { getWorksWithAboutInfo } from '@/app/lib/work-about-data';

const works = getWorksWithAboutInfo();
console.log(works); // ['madama butterfly', 'la bohème', ...]
```

## Data Structure

```typescript
interface WorkAboutInfo {
  description: string;    // Overview of the work
  history: string;        // Historical context and premiere info
  themes: string[];       // Array of major themes
  trivia: string[];       // Array of interesting facts
}
```

## Adding New Works

To add About information for a new work:

1. Open `app/lib/work-about-data.ts`
2. Add a new entry to `WORK_ABOUT_DATA`:

```typescript
'norma': {
  description: 'Bellini\'s masterpiece...',
  history: 'Premiered in...',
  themes: ['Love', 'Betrayal', 'Sacrifice'],
  trivia: [
    'Fact 1...',
    'Fact 2...'
  ]
}
```

3. Use lowercase, normalized title (e.g., 'norma' not 'Norma')

## Normalization

Work titles are normalized for lookup:

- Converted to lowercase
- Trimmed whitespace
- Matched against the data keys

So "La Bohème", "la bohème", "LA BOHÈME" all work.

## Benefits

✅ **Context**: Users learn about the work, not just recordings  
✅ **Education**: Historical and cultural information  
✅ **Engagement**: Trivia and interesting facts  
✅ **Themes**: Better understanding of the work's meaning  
✅ **Collapsible**: Doesn't clutter the UI when not needed  

## Future Enhancements

- Add more works (currently 5)
- Add character descriptions
- Include notable performances
- Add composer biography links
- Include bibliography/recommended readings
- Add timeline of the work's history
- Include cultural impact and adaptations

## Notes

- Only displays for works that have data
- Information is work-level, not recording-specific
- All text is in English
- Can be expanded to include images or links
- Works well with the musical metadata system
