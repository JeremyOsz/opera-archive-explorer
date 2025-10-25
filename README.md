# Opera Archive Explorer

A Next.js application for exploring opera recordings from the Internet Archive's vinyl collection. Features a lightweight caching system optimized for search autocomplete and serverless deployment.

## Features

- 🎵 **Opera Collection**: Browse 846+ opera recordings from Archive.org
- ⚡ **Lightning Fast Search**: Lightweight cache (436KB) for instant autocomplete
- 🖼️ **Rich Metadata**: Title, creator, date, language, and subject information
- 📦 **Serverless Ready**: Optimized for Vercel, Netlify, and other platforms
- 🎨 **Modern UI**: Built with Tailwind CSS and Shadcn components

## Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

```bash
# Generate cache and build
pnpm run build

# Start production server
pnpm start
```

## Caching System

The application uses a lightweight caching system that:

- **Generates at build time**: Cache is created during `pnpm run build`
- **Bundles with app**: No external dependencies at runtime
- **Optimized for search**: Only essential data (436KB total)
- **Serverless friendly**: Works on any platform without file system access

### Cache Structure

```typescript
interface LightweightOpera {
  identifier: string;      // Unique ID
  title: string;          // Opera title
  creator?: string;        // Composer
  date?: string;          // Recording date
  language?: string;      // Language
  subject?: string[];     // Genres/subjects
  imageUrl?: string;      // Thumbnail URL
  thumbnailUrl?: string;   // Preview image
}
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Generate cache and build for production
- `pnpm start` - Start production server
- `pnpm run build:cache` - Generate lightweight cache only
- `pnpm run cache-archive` - Alias for cache generation

## Architecture

- **Frontend**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with Shadcn components
- **Caching**: Build-time lightweight cache (436KB)
- **Data Source**: Internet Archive API
- **Deployment**: Serverless-ready

## Deployment

Perfect for serverless platforms:
- ✅ Vercel
- ✅ Netlify
- ✅ AWS Lambda
- ✅ Any serverless platform

The lightweight cache is bundled with your application, requiring no external dependencies or file system access at runtime.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Internet Archive API](https://archive.org/help/aboutsite.php)
