import { NextRequest, NextResponse } from 'next/server';
import { ArchiveAPI } from '@/app/lib/archive-api';

// Cache for image URLs (in-memory, simple implementation)
const imageCache = new Map<string, { imageUrl: string; thumbnailUrl: string; timestamp: number }>();
const IMAGE_CACHE_TTL = 60 * 60 * 1000; // 1 hour

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

    // Check cache first
    const cached = imageCache.get(identifier);
    if (cached && Date.now() - cached.timestamp < IMAGE_CACHE_TTL) {
      console.log(`📁 Using cached image URLs for ${identifier}`);
      return NextResponse.json({
        imageUrl: cached.imageUrl,
        thumbnailUrl: cached.thumbnailUrl
      });
    }

    // Get image URLs (this will use the improved logic we just implemented)
    const imageUrls = await ArchiveAPI.getBestImageUrl(identifier);
    
    // Cache the result
    imageCache.set(identifier, {
      ...imageUrls,
      timestamp: Date.now()
    });

    return NextResponse.json(imageUrls);
  } catch (error) {
    console.error('Image API error:', error);
    return NextResponse.json(
      { error: 'Failed to get image URLs' },
      { status: 500 }
    );
  }
}
