# Lightweight Archive Caching for Search Autocomplete

This approach generates a lightweight archive cache at build time and bundles it with your application, making it perfect for search autocomplete and serverless deployments.

## How It Works

1. **Build Time**: Lightweight cache is generated during `npm run build`
2. **Bundled**: Cache is included as a JSON file in your app bundle
3. **Serverless Ready**: No file system access needed at runtime
4. **Fast**: Instant access to search autocomplete data (436KB total)

## Usage

### Generate Cache at Build Time

The cache is automatically generated when you build your app:

```bash
npm run build
```

This runs:
1. `npm run build:cache` - Generates the cache
2. `next build` - Builds the Next.js app with bundled cache

### Manual Cache Generation

To generate lightweight cache manually:

```bash
npm run build:cache
# or
npm run cache-archive
```

### Cache Location

The cache is stored in:
- **Source**: `app/data/archive-cache.json` (generated at build time)
- **Bundled**: Included in your app bundle for serverless deployment

## Cache Structure

```json
{
  "metadata": {
    "generatedAt": "2024-01-01T00:00:00.000Z",
    "totalWorks": 846,
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0"
  },
  "works": [
    {
      "identifier": "work-123",
      "title": "Opera Title",
      "creator": "Composer Name",
      "date": "1961-01-01T00:00:00Z",
      "language": "eng",
      "subject": ["Classical", "Baroque"],
      "imageUrl": "https://archive.org/services/img/work-123",
      "thumbnailUrl": "https://archive.org/services/img/work-123"
    }
  ]
}
```

## Benefits for Search Autocomplete

✅ **Lightning Fast**: 436KB cache loads instantly  
✅ **Perfect for Autocomplete**: Title and creator search  
✅ **Visual**: Image URLs for thumbnails  
✅ **Filterable**: Date, language, subject for filtering  
✅ **Serverless Ready**: Tiny bundle size  
✅ **No API Calls**: Zero external dependencies at runtime  
✅ **Offline Ready**: Works without internet connection  

## API Integration

The `ArchiveAPI` automatically uses the bundled cache:

```typescript
// These methods now use bundled cache
const results = await ArchiveAPI.searchOperas(filters);
const work = await ArchiveAPI.getOperaById(identifier);
```

## Development Workflow

1. **Development**: Use `npm run dev` (cache optional)
2. **Build**: Use `npm run build` (generates fresh cache)
3. **Deploy**: Deploy with bundled cache included

## Cache Updates

To update the cache:

1. Run `npm run build:cache` to generate fresh data
2. Commit the updated `app/data/archive-cache.json`
3. Deploy with the new cache

## Files

- `scripts/build-lightweight-cache.ts` - Build-time lightweight cache generation script
- `app/data/archive-cache.json` - Generated lightweight cache file (bundled)
- `app/lib/cache-loader.ts` - Cache loading utilities
- `app/lib/archive-api.ts` - Updated to use bundled cache

## Deployment

Perfect for:
- Vercel
- Netlify
- AWS Lambda
- Any serverless platform

The cache is bundled with your app, so no external dependencies or file system access is required at runtime.
