import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { OperaRecording } from '@/app/types/opera';
import { ArchiveAPI } from '@/app/lib/archive-api';

// Server-side enhancement with caching
const getCachedEnhancement = unstable_cache(
  async (identifier: string, enhancementType: string) => {
    console.log(`🎵 Server-side enhancement for ${identifier} (${enhancementType})`);
    
    try {
      // First get the basic opera data
      const metadataResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/metadata?id=${identifier}`);
      if (!metadataResponse.ok) {
        throw new Error('Failed to fetch opera metadata');
      }
      
      const { opera } = await metadataResponse.json();
      if (!opera) {
        throw new Error('Opera not found');
      }

      let enhancedOpera: OperaRecording;

      switch (enhancementType) {
        case 'recording':
          enhancedOpera = await ArchiveAPI.enhanceWithRecordingInfo(opera);
          break;
        case 'sheet-music':
          enhancedOpera = await ArchiveAPI.enhanceWithSheetMusic(opera);
          break;
        case 'musical-data':
          enhancedOpera = await ArchiveAPI.enhanceWithMusicDatabases(opera);
          break;
        case 'all':
          // Apply all enhancements in sequence
          let tempOpera = await ArchiveAPI.enhanceWithMusicDatabases(opera);
          tempOpera = await ArchiveAPI.enhanceWithRecordingInfo(tempOpera);
          enhancedOpera = await ArchiveAPI.enhanceWithSheetMusic(tempOpera);
          break;
        default:
          throw new Error(`Unknown enhancement type: ${enhancementType}`);
      }

      return enhancedOpera;
    } catch (error) {
      console.error('Error enhancing opera:', error);
      throw error;
    }
  },
  ['opera-enhancement'],
  {
    revalidate: 3600, // 1 hour
    tags: ['opera-enhancement']
  }
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get('id');
    const enhancementType = searchParams.get('type') || 'all';
    
    if (!identifier) {
      return NextResponse.json(
        { error: 'Identifier is required' },
        { status: 400 }
      );
    }

    // Use Next.js server-side caching
    const enhancedOpera = await getCachedEnhancement(identifier, enhancementType);

    return NextResponse.json({ opera: enhancedOpera });
  } catch (error) {
    console.error('Enhancement API error:', error);
    return NextResponse.json(
      { error: 'Failed to enhance opera data' },
      { status: 500 }
    );
  }
}
