import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { OperaRecording } from '@/app/types/opera';

// Server-side metadata fetching with caching
const getCachedMetadata = unstable_cache(
  async (identifier: string) => {
    console.log(`📋 Server-side metadata fetching for ${identifier}`);
    
    try {
      const response = await fetch(`https://archive.org/metadata/${identifier}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.metadata) {
        return null;
      }

      // Get higher resolution image URLs
      const imageUrls = await getBestImageUrl(data.metadata.identifier || identifier);
      
      const opera: OperaRecording = {
        identifier: data.metadata.identifier || identifier,
        title: data.metadata.title || 'Unknown Title',
        creator: Array.isArray(data.metadata.creator) ? data.metadata.creator.join(', ') : data.metadata.creator,
        date: data.metadata.date,
        description: data.metadata.description,
        language: Array.isArray(data.metadata.language) ? data.metadata.language.join(', ') : data.metadata.language,
        subject: Array.isArray(data.metadata.subject) ? data.metadata.subject : [],
        mediatype: data.metadata.mediatype || 'audio',
        publicdate: data.metadata.publicdate,
        addeddate: data.metadata.addeddate,
        collection: Array.isArray(data.metadata.collection) ? data.metadata.collection : [],
        format: Array.isArray(data.metadata.format) ? data.metadata.format : [],
        files: Array.isArray(data.files) ? data.files : [],
        imageUrl: imageUrls.imageUrl,
        thumbnailUrl: imageUrls.thumbnailUrl,
        metadata: data.metadata
      };

      return opera;
    } catch (error) {
      console.error('Error fetching opera metadata:', error);
      return null;
    }
  },
  ['archive-metadata'],
  {
    revalidate: 3600, // 1 hour
    tags: ['archive-metadata']
  }
);

// Server-side image URL optimization
async function getBestImageUrl(identifier: string): Promise<{ imageUrl: string; thumbnailUrl: string }> {
  try {
    // Try to get metadata to find the best image file
    const response = await fetch(`https://archive.org/metadata/${identifier}`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      const files = data.files || [];
      
      // Find the best image file - prioritize thumbnails and album artwork
      const imageFiles = files
        .filter((file: any) => {
          const name = file.name?.toLowerCase() || '';
          const format = file.format?.toLowerCase() || '';
          
          // Prioritize Archive.org thumbnails and album artwork
          return (
            // Archive.org generated thumbnails (highest priority)
            name.includes('__ia_thumb') ||
            name.includes('_thumb') ||
            name.includes('thumbnail') ||
            // Album artwork keywords
            name.includes('cover') ||
            name.includes('front') ||
            name.includes('back') ||
            name.includes('jacket') ||
            name.includes('folder') ||
            name.includes('artwork') ||
            name.includes('album') ||
            // Image formats
            format === 'jpeg' ||
            format === 'png' ||
            format === 'gif' ||
            format === 'item tile'
          );
        })
        .map((file: any) => ({
          ...file,
          size: parseInt(file.size) || 0,
          // Prioritize Archive.org thumbnails
          priority: file.name?.toLowerCase().includes('__ia_thumb') ? 0 : 
                   file.name?.toLowerCase().includes('_thumb') ? 1 : 2
        }))
        .sort((a: any, b: any) => {
          // First sort by priority (thumbnails first), then by size
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          return b.size - a.size;
        });
      
      if (imageFiles.length > 0) {
        const bestImage = imageFiles[0];
        const directUrl = `https://archive.org/download/${identifier}/${encodeURIComponent(bestImage.name)}`;
        
        console.log(`🎨 Using higher resolution image for ${identifier}: ${bestImage.name} (${bestImage.size} bytes)`);
        
        return {
          imageUrl: directUrl,
          thumbnailUrl: directUrl // Use same URL for both, or could create a smaller thumbnail
        };
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not fetch metadata for ${identifier}, falling back to image service:`, error);
  }
  
  // Fallback to image service
  const fallbackUrl = `https://archive.org/services/img/${identifier}`;
  return {
    imageUrl: fallbackUrl,
    thumbnailUrl: fallbackUrl
  };
}

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
    const opera = await getCachedMetadata(identifier);

    if (!opera) {
      return NextResponse.json(
        { error: 'Opera not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ opera });
  } catch (error) {
    console.error('Metadata API error:', error);
    return NextResponse.json(
      { error: 'Failed to get opera metadata' },
      { status: 500 }
    );
  }
}
