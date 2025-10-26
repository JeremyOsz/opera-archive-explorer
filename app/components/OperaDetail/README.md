# OperaDetail Component Structure

This directory contains the refactored OperaDetail component, broken down into smaller, focused components for better separation of concerns and maintainability.

## File Structure

```
OperaDetail/
├── index.ts                    # Main export file
├── types.ts                    # TypeScript interfaces and types
├── utils.ts                    # Utility functions
├── useOperaData.ts             # Custom hook for data fetching
├── OperaImage.tsx              # Opera image display component
├── RecordingInfo.tsx           # Recording information component
├── AboutWork.tsx               # Work background information component
├── SheetMusicSection.tsx       # Sheet music display component
├── MusicalInformation.tsx      # Musical metadata component
├── MovementsSection.tsx       # Acts and movements component
└── AudioFilesSection.tsx       # Audio files and playback component
```

## Components Overview

### Core Components

- **OperaDetail.tsx** (main file) - Orchestrates all sub-components
- **useOperaData.ts** - Custom hook handling data fetching and state management
- **types.ts** - Shared TypeScript interfaces
- **utils.ts** - Utility functions for formatting and data processing

### UI Components

- **OperaImage.tsx** - Displays opera cover image with fallback
- **RecordingInfo.tsx** - Shows recording details, performers, conductor, etc.
- **AboutWork.tsx** - Displays work background, history, themes, and notable performances
- **SheetMusicSection.tsx** - Shows available sheet music from IMSLP
- **MusicalInformation.tsx** - Displays musical metadata (key, tempo, genre, etc.)
- **MovementsSection.tsx** - Shows acts and movements structure
- **AudioFilesSection.tsx** - Handles audio file display and playback controls

## Benefits of This Structure

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other parts of the application
3. **Maintainability** - Easier to locate and modify specific functionality
4. **Testability** - Individual components can be tested in isolation
5. **Performance** - Smaller components can be optimized independently
6. **Code Organization** - Clear file structure makes navigation easier

## Usage

```tsx
import OperaDetail from '@/app/components/OperaDetail';

// The main component automatically imports and uses all sub-components
<OperaDetail 
  opera={operaData} 
  isOpen={isOpen} 
  onClose={onClose} 
/>
```

## Custom Hook

The `useOperaData` hook handles all data fetching and state management:

```tsx
const {
  files,
  loading,
  enhancedOpera,
  musicalDataLoading,
  workMetadata
} = useOperaData(opera, isOpen);
```

## Type Safety

All components use proper TypeScript interfaces defined in `types.ts`, ensuring type safety across the entire component tree.
