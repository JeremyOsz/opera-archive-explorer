#!/usr/bin/env tsx

/**
 * Example script demonstrating how to use the archive caching system
 */

import { 
  buildLightweightCache 
} from './build-lightweight-cache';
import { 
  loadArchiveCache, 
  searchCachedWorks, 
  getCachedWorkById,
  getCacheMetadata 
} from '../app/lib/cache-loader';

async function demonstrateCaching() {
  console.log('🎵 Lightweight Archive Caching System Demo\n');

  // Check if cache exists
  const cacheStatus = getCacheMetadata();
  console.log('📊 Cache Status:', cacheStatus.exists ? '✅ Exists' : '❌ Not found');
  
  if (cacheStatus.exists) {
    console.log('📅 Generated:', cacheStatus.metadata?.generatedAt);
    console.log('📊 Total Works:', cacheStatus.metadata?.totalWorks);
    console.log('🔢 Version:', cacheStatus.metadata?.version);
  }

  // Load and search cache
  const cache = loadArchiveCache();
  if (cache) {
    console.log('\n🔍 Searching cached works...');
    
    // Search for Mozart works
    const mozartWorks = searchCachedWorks('mozart', { creator: 'Mozart' });
    console.log(`📚 Found ${mozartWorks.length} Mozart works in cache`);
    
    if (mozartWorks.length > 0) {
      const firstWork = mozartWorks[0];
      console.log('🎼 Example work:', {
        title: firstWork.title,
        creator: firstWork.creator,
        date: firstWork.date,
        language: firstWork.language,
        subject: firstWork.subject
      });
    }

    // Get a specific work by ID
    if (cache.works.length > 0) {
      const workId = cache.works[0].identifier;
      const specificWork = getCachedWorkById(workId);
      console.log(`\n🎯 Retrieved work by ID (${workId}):`, specificWork?.title);
    }
  } else {
    console.log('\n💡 No cache found. Run "pnpm run cache-archive" to generate one.');
  }

  console.log('\n✨ Demo completed!');
}

// Run the demo
demonstrateCaching().catch(console.error);
