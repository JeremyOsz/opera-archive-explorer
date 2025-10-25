import { ArchiveAPI } from '../app/lib/archive-api';
import { OperaRecording } from '../app/types/opera';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

interface LightweightOpera {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  language?: string;
  subject?: string[];
  imageUrl?: string;
  thumbnailUrl?: string;
}

interface LightweightCache {
  metadata: {
    generatedAt: string;
    totalWorks: number;
    lastUpdated: string;
    version: string;
  };
  works: LightweightOpera[];
}

const CACHE_VERSION = '1.0.0';
const CACHE_FILE_PATH = join(process.cwd(), 'app', 'data', 'archive-cache.json');

/**
 * Build-time lightweight cache generation for search autocomplete
 */
export async function buildLightweightCache(): Promise<void> {
  console.log('🎵 Starting lightweight archive cache generation...');
  
  try {
    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), 'app', 'data');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const allWorks: LightweightOpera[] = [];
    let page = 1;
    const rowsPerPage = 100;
    let hasMorePages = true;
    let totalFound = 0;

    console.log('📡 Fetching works from archive collection...');

    while (hasMorePages) {
      console.log(`📄 Fetching page ${page} (${rowsPerPage} items per page)...`);
      
      try {
        const response = await ArchiveAPI.searchOperas(
          { query: '' }, // Empty query to get all works
          page,
          rowsPerPage
        );

        if (response.docs && response.docs.length > 0) {
          console.log(`✅ Found ${response.docs.length} works on page ${page}`);
          
          // Convert to lightweight format - no enhancement needed
          const lightweightWorks = response.docs.map(work => ({
            identifier: work.identifier,
            title: work.title,
            creator: work.creator,
            date: work.date,
            language: work.language,
            subject: work.subject,
            imageUrl: work.imageUrl,
            thumbnailUrl: work.thumbnailUrl
          }));

          allWorks.push(...lightweightWorks);
          totalFound = response.numFound;
          
          // Check if we have more pages
          hasMorePages = response.docs.length === rowsPerPage && 
                        (page * rowsPerPage) < response.numFound;
          page++;
        } else {
          hasMorePages = false;
        }
      } catch (error) {
        console.error(`❌ Error fetching page ${page}:`, error);
        hasMorePages = false;
      }
    }

    console.log(`📊 Total works found: ${totalFound}`);
    console.log(`📊 Works processed: ${allWorks.length}`);

    // Create lightweight cache structure
    const cache: LightweightCache = {
      metadata: {
        generatedAt: new Date().toISOString(),
        totalWorks: allWorks.length,
        lastUpdated: new Date().toISOString(),
        version: CACHE_VERSION
      },
      works: allWorks
    };

    // Write cache to file
    console.log(`💾 Writing lightweight cache to ${CACHE_FILE_PATH}...`);
    writeFileSync(CACHE_FILE_PATH, JSON.stringify(cache, null, 2));
    
    console.log('✅ Lightweight archive cache completed!');
    console.log(`📁 Cache file: ${CACHE_FILE_PATH}`);
    console.log(`📊 Cached ${allWorks.length} works (lightweight format)`);
    console.log(`📦 Cache size: ${Math.round(JSON.stringify(cache).length / 1024)}KB`);
    
  } catch (error) {
    console.error('❌ Error caching archive data:', error);
    throw error;
  }
}

// Run the caching process if this script is executed directly
if (require.main === module) {
  buildLightweightCache()
    .then(() => {
      console.log('🎉 Lightweight cache generation completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Lightweight cache generation failed:', error);
      process.exit(1);
    });
}
