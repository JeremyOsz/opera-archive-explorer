#!/usr/bin/env tsx

/**
 * Script to upgrade cached image URLs to higher resolution versions
 * This will fetch metadata for each work and update image URLs to use direct file access
 */

import fs from 'fs';
import path from 'path';

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

interface ArchiveCache {
  metadata: {
    generatedAt: string;
    totalWorks: number;
    lastUpdated: string;
    version: string;
  };
  works: LightweightOpera[];
}

/**
 * Get the best available image URL for an identifier
 */
async function getBestImageUrl(identifier: string): Promise<{ imageUrl: string; thumbnailUrl: string }> {
  try {
    console.log(`🔍 Fetching metadata for ${identifier}...`);
    
    const response = await fetch(`https://archive.org/metadata/${identifier}`, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      const files = data.files || [];
      
      // Find the largest image file
      const imageFiles = files
        .filter((file: any) => 
          file.format === 'JPEG' || 
          file.format === 'PNG' || 
          file.format === 'GIF' ||
          file.name?.toLowerCase().includes('cover') ||
          file.name?.toLowerCase().includes('front') ||
          file.name?.toLowerCase().includes('back') ||
          file.name?.toLowerCase().includes('jacket') ||
          file.name?.toLowerCase().includes('folder')
        )
        .map((file: any) => ({
          ...file,
          size: parseInt(file.size) || 0
        }))
        .sort((a: any, b: any) => b.size - a.size);
      
      if (imageFiles.length > 0) {
        const bestImage = imageFiles[0];
        const directUrl = `https://archive.org/download/${identifier}/${encodeURIComponent(bestImage.name)}`;
        
        console.log(`✅ Found higher res image: ${bestImage.name} (${bestImage.size} bytes)`);
        
        return {
          imageUrl: directUrl,
          thumbnailUrl: directUrl
        };
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not fetch metadata for ${identifier}:`, error);
  }
  
  // Fallback to image service
  const fallbackUrl = `https://archive.org/services/img/${identifier}`;
  return {
    imageUrl: fallbackUrl,
    thumbnailUrl: fallbackUrl
  };
}

/**
 * Upgrade cache with higher resolution images
 */
async function upgradeCacheImages() {
  console.log('🚀 Starting cache image upgrade...\n');
  
  // Load current cache
  const cachePath = path.join(__dirname, '../app/data/archive-cache.json');
  const cacheData: ArchiveCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  
  console.log(`📁 Found ${cacheData.works.length} works in cache`);
  console.log(`📅 Cache generated: ${cacheData.metadata.generatedAt}\n`);
  
  let updatedCount = 0;
  let errorCount = 0;
  
  // Process works in batches to avoid overwhelming the API
  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < cacheData.works.length; i += batchSize) {
    batches.push(cacheData.works.slice(i, i + batchSize));
  }
  
  console.log(`📦 Processing ${batches.length} batches of ${batchSize} works each\n`);
  
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`🔄 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} works)...`);
    
    const batchPromises = batch.map(async (work, workIndex) => {
      try {
        const imageUrls = await getBestImageUrl(work.identifier);
        
        // Only update if the URL has changed
        if (imageUrls.imageUrl !== work.imageUrl) {
          work.imageUrl = imageUrls.imageUrl;
          work.thumbnailUrl = imageUrls.thumbnailUrl;
          updatedCount++;
          console.log(`  ✅ Updated ${work.title.substring(0, 50)}...`);
        } else {
          console.log(`  ⏭️  No change for ${work.title.substring(0, 50)}...`);
        }
        
        // Add small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        errorCount++;
        console.error(`  ❌ Error processing ${work.identifier}:`, error);
      }
    });
    
    await Promise.all(batchPromises);
    
    // Add delay between batches
    if (batchIndex < batches.length - 1) {
      console.log(`⏳ Waiting 2 seconds before next batch...\n`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Update cache metadata
  cacheData.metadata.lastUpdated = new Date().toISOString();
  cacheData.metadata.version = '1.1.0';
  
  // Save updated cache
  const backupPath = cachePath.replace('.json', '.backup.json');
  fs.copyFileSync(cachePath, backupPath);
  console.log(`💾 Created backup: ${backupPath}`);
  
  fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
  console.log(`💾 Updated cache saved: ${cachePath}`);
  
  console.log('\n🎉 Cache upgrade completed!');
  console.log(`📊 Results:`);
  console.log(`  ✅ Updated: ${updatedCount} works`);
  console.log(`  ❌ Errors: ${errorCount} works`);
  console.log(`  📁 Total: ${cacheData.works.length} works`);
}

// Run the upgrade
upgradeCacheImages().catch(console.error);
