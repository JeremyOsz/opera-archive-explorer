import { NextRequest, NextResponse } from 'next/server';
import { ArchiveAPI } from '@/app/lib/archive-api';
import { unstable_cache } from 'next/cache';

// Server-side image URL caching with Next.js
const getCachedImageUrls = unstable_cache(
  async (identifier: string) => {
    console.log(`🖼️ Server-side image optimization for ${identifier}`);
    
    try {
      // Get optimized image URLs using our improved logic
      const imageUrls = await ArchiveAPI.getBestImageUrl(identifier);
      
      // Return optimized URLs that can be processed by Next.js Image component
      return {
        imageUrl: imageUrls.imageUrl,
        thumbnailUrl: imageUrls.thumbnailUrl,
        // Add Next.js Image optimization hints
        optimized: true,
        serverOptimized: true
      };
    } catch (error) {
      console.warn(`Failed to get optimized images for ${identifier}:`, error);
      // Fallback to Archive.org image service
      return {
        imageUrl: `https://archive.org/services/img/${identifier}`,
        thumbnailUrl: `https://archive.org/services/img/${identifier}`,
        optimized: false,
        serverOptimized: false
      };
    }
  },
  ['image-urls'],
  {
    revalidate: 3600, // 1 hour
    tags: ['images']
  }
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get('id');
    
    if (!identifier) {
      return NextResponse.json(
        { error: 'Identifier is required' },
        { status: 400 }
      );
    }

    // Use Next.js server-side caching
    const result = await getCachedImageUrls(identifier);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Image API error:', error);
    return NextResponse.json(
      { error: 'Failed to get image URLs' },
      { status: 500 }
    );
  }
}
