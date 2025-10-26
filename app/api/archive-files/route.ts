import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

// Server-side file fetching with caching
const getCachedFiles = unstable_cache(
  async (identifier: string) => {
    console.log(`📁 Server-side file fetching for ${identifier}`);
    
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
      console.log('Metadata response for', identifier, ':', data);
      
      // Return files from the main metadata response
      return Array.isArray(data.files) ? data.files : [];
    } catch (error) {
      console.error('Error fetching opera files:', error);
      return [];
    }
  },
  ['archive-files'],
  {
    revalidate: 3600, // 1 hour
    tags: ['archive-files']
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
    const files = await getCachedFiles(identifier);

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Archive files API error:', error);
    return NextResponse.json(
      { error: 'Failed to get archive files' },
      { status: 500 }
    );
  }
}
