import { useState, useEffect } from 'react';

interface ImageUrls {
  imageUrl: string;
  thumbnailUrl: string;
}

interface ImageCache {
  [identifier: string]: ImageUrls;
}

// Global cache for image URLs
const imageCache: ImageCache = {};

export function useOptimizedImages(identifiers: string[]) {
  const [images, setImages] = useState<ImageCache>({});
  const [loading, setLoading] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchImages = async () => {
      const uncachedIdentifiers = identifiers.filter(id => !imageCache[id] && !loading.has(id));
      
      if (uncachedIdentifiers.length === 0) {
        // All images are cached or loading
        setImages({ ...imageCache });
        return;
      }

      // Mark as loading
      setLoading(prev => new Set([...prev, ...uncachedIdentifiers]));

      try {
        // Fetch images in batches to avoid overwhelming the server
        const batchSize = 5;
        const batches = [];
        for (let i = 0; i < uncachedIdentifiers.length; i += batchSize) {
          batches.push(uncachedIdentifiers.slice(i, i + batchSize));
        }

        for (const batch of batches) {
          const promises = batch.map(async (identifier) => {
            try {
              const response = await fetch(`/api/images?id=${encodeURIComponent(identifier)}`);
              if (response.ok) {
                const imageUrls = await response.json();
                imageCache[identifier] = imageUrls;
                return { identifier, imageUrls };
              }
            } catch (error) {
              console.warn(`Failed to fetch image for ${identifier}:`, error);
            }
            return null;
          });

          const results = await Promise.all(promises);
          
          // Update state with new images
          setImages({ ...imageCache });
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        // Remove from loading set
        setLoading(prev => {
          const newSet = new Set(prev);
          uncachedIdentifiers.forEach(id => newSet.delete(id));
          return newSet;
        });
      }
    };

    fetchImages();
  }, [identifiers.join(',')]);

  return {
    images,
    loading: Array.from(loading),
    isLoading: loading.size > 0
  };
}
