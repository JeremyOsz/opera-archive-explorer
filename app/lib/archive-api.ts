import { OperaRecording, ArchiveResponse, SearchFilters, RecordingInfo, SheetMusicLink } from '@/app/types/opera';
import { MockMusicalDataGenerator } from './mock-musical-data';
import { loadArchiveCache, searchCachedWorks, getCachedWorkById } from './cache-loader';
import { DiscogsAPI } from './discogs-api';
import { IMSLPAPI } from './imslp-api';

const ARCHIVE_API_BASE = 'https://archive.org/advancedsearch.php';

// Configuration for external API integrations
const ENABLE_DISCOGS_INTEGRATION = false; // Disabled by default to avoid API key requirements
const ENABLE_IMSLP_INTEGRATION = true; // Enabled by default - no API key required

export class ArchiveAPI {
  /**
   * Get the best available image URL for an identifier
   * Tries to find the largest image file, falls back to image service
   */
  static async getBestImageUrl(identifier: string): Promise<{ imageUrl: string; thumbnailUrl: string }> {
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

  private static async fetchFromArchive(params: Record<string, string>): Promise<ArchiveResponse> {
    const searchParams = new URLSearchParams({
      q: params.q || '',
      fl: 'identifier,title,creator,date,description,language,subject,mediatype,publicdate,addeddate,collection,format',
      rows: params.rows || '50',
      page: params.page || '1',
      output: 'json',
      sort: params.sort || 'publicdate desc',
      ...params
    });

    const url = `${ARCHIVE_API_BASE}?${searchParams.toString()}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Process docs and get higher resolution images
      const docs = await Promise.all((data.response?.docs || []).map(async (doc: any) => {
        const imageUrls = await this.getBestImageUrl(doc.identifier);
        return {
          ...doc,
          imageUrl: imageUrls.imageUrl,
          thumbnailUrl: imageUrls.thumbnailUrl,
          creator: Array.isArray(doc.creator) ? doc.creator.join(', ') : doc.creator,
          language: Array.isArray(doc.language) ? doc.language.join(', ') : doc.language,
          subject: Array.isArray(doc.subject) ? doc.subject : [],
          collection: Array.isArray(doc.collection) ? doc.collection : [],
          format: Array.isArray(doc.format) ? doc.format : []
        };
      }));
      
      return {
        numFound: data.response?.numFound || 0,
        start: data.response?.start || 0,
        docs
      };
    } catch (error) {
      console.error('Error fetching from Archive.org:', error);
      throw new Error('Failed to fetch opera recordings from Archive.org');
    }
  }

  static async searchOperas(filters: SearchFilters, page: number = 1, rows: number = 50): Promise<ArchiveResponse> {
    // Try to use cached data first
    const cache = loadArchiveCache();
    if (cache) {
      console.log('📁 Using bundled cache for search');
      const cachedResults = searchCachedWorks(filters.query, {
        creator: filters.creator,
        date: filters.date,
        language: filters.language
      });
      
      // Apply pagination to cached results
      const start = (page - 1) * rows;
      const end = start + rows;
      const paginatedResults = cachedResults.slice(start, end);
      
      // Convert lightweight results to OperaRecording format for compatibility
      // Note: Images are fetched separately via API to avoid blocking
      const convertedResults = paginatedResults.map((work) => ({
        ...work,
        // Use cached image URLs if available, otherwise use fallback
        imageUrl: work.imageUrl || `https://archive.org/services/img/${work.identifier}`,
        thumbnailUrl: work.thumbnailUrl || `https://archive.org/services/img/${work.identifier}`,
        mediatype: 'audio',
        publicdate: work.date || '',
        addeddate: work.date || '',
        collection: [],
        format: [],
        files: [],
        metadata: {}
      }));

      return {
        numFound: cachedResults.length,
        start: start,
        docs: convertedResults
      };
    }
    
    // Fallback to live API if no cache
    console.log('🌐 No cache found, fetching from live API');
    const query = this.buildQuery(filters);
    
    return this.fetchFromArchive({
      q: query,
      rows: rows.toString(),
      page: page.toString(),
      sort: 'publicdate desc'
    });
  }

  static async getOperaById(identifier: string): Promise<OperaRecording | null> {
    // Try to use cached data first
    const cachedWork = getCachedWorkById(identifier);
    if (cachedWork) {
      console.log('📁 Using bundled cache for opera:', identifier);
      
      // Always fetch higher resolution images for detail view
      const imageUrls = await this.getBestImageUrl(identifier);
      
      // Convert lightweight work to OperaRecording format
      return {
        ...cachedWork,
        imageUrl: imageUrls.imageUrl,
        thumbnailUrl: imageUrls.thumbnailUrl,
        mediatype: 'audio',
        publicdate: cachedWork.date || '',
        addeddate: cachedWork.date || '',
        collection: [],
        format: [],
        files: [],
        metadata: {}
      };
    }
    
    // Fallback to live API if not in cache
    console.log('🌐 Opera not in cache, fetching from live API:', identifier);
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
      const imageUrls = await this.getBestImageUrl(data.metadata.identifier || identifier);
      
      return {
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
    } catch (error) {
      console.error('Error fetching opera details:', error);
      return null;
    }
  }

  static async getOperaFiles(identifier: string): Promise<any[]> {
    try {
      // Try the main metadata endpoint first
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
  }

  private static buildQuery(filters: SearchFilters): string {
    let query = 'mediatype:audio';
    
    // Add collection filter for opera recordings
    query += ' AND collection:vinyl_frank-defreytas-memoria-opera';
    
    if (filters.query) {
      query += ` AND (title:(${filters.query}) OR creator:(${filters.query}) OR description:(${filters.query}))`;
    }
    
    if (filters.creator) {
      query += ` AND creator:(${filters.creator})`;
    }
    
    if (filters.date) {
      query += ` AND date:${filters.date}`;
    }
    
    if (filters.language) {
      query += ` AND language:(${filters.language})`;
    }
    
    if (filters.format) {
      query += ` AND format:${filters.format}`;
    }
    
    return query;
  }

  static getDownloadUrl(identifier: string, filename: string): string {
    return `https://archive.org/download/${identifier}/${filename}`;
  }

  static getStreamUrl(identifier: string, filename: string): string {
    return `https://archive.org/stream/${identifier}/${filename}`;
  }

  /**
   * Enhance opera recording with Discogs recording information
   */
  static async enhanceWithRecordingInfo(opera: OperaRecording): Promise<OperaRecording> {
    // Check if Discogs integration is enabled
    if (!ENABLE_DISCOGS_INTEGRATION) {
      console.log('🎵 Discogs integration disabled, using fallback recording info');
      return this.addFallbackRecordingInfo(opera);
    }

    try {
      console.log('🎵 Enhancing opera with recording information:', opera.title);
      
      // Try to find recording information from Discogs
      const recordingInfo = await DiscogsAPI.findOperaRecording(
        opera.title,
        opera.creator,
        opera.date ? parseInt(opera.date) : undefined
      );
      
      if (recordingInfo) {
        console.log('🎵 Found recording info from Discogs:', recordingInfo);
        
        return {
          ...opera,
          recordingInfo,
          metadata: {
            ...opera.metadata,
            discogsEnhanced: true,
            note: 'Recording information enhanced with Discogs data'
          }
        };
      } else {
        console.log('🎵 No Discogs recording info found, using fallback');
        return this.addFallbackRecordingInfo(opera);
      }
    } catch (error) {
      console.warn('Discogs API unavailable, using fallback recording info:', error instanceof Error ? error.message : 'Unknown error');
      // Return with basic fallback data even on error
      return this.addFallbackRecordingInfo(opera);
    }
  }

  /**
   * Enhance opera recording with sheet music links from IMSLP
   */
  static async enhanceWithSheetMusic(opera: OperaRecording): Promise<OperaRecording> {
    // Check if IMSLP integration is enabled
    if (!ENABLE_IMSLP_INTEGRATION) {
      console.log('🎼 IMSLP integration disabled, skipping sheet music lookup');
      return opera;
    }

    try {
      console.log('🎼 Enhancing opera with sheet music links:', opera.title);
      
      // Extract composer from creator field
      const composer = IMSLPAPI.extractComposerFromCreator(opera.creator || '');
      
      // Clean the work title for better matching
      const cleanTitle = IMSLPAPI.cleanWorkTitle(opera.title);
      
      // Search for sheet music
      const sheetMusicLinks = await IMSLPAPI.findSheetMusic(cleanTitle, composer);
      
      if (sheetMusicLinks.length > 0) {
        console.log('🎼 Found sheet music links:', sheetMusicLinks.length);
        
        return {
          ...opera,
          sheetMusicLinks,
          metadata: {
            ...opera.metadata,
            imslpEnhanced: true,
            note: `Found ${sheetMusicLinks.length} sheet music links from IMSLP`
          }
        };
      } else {
        console.log('🎼 No sheet music links found');
        return opera;
      }
    } catch (error) {
      console.warn('IMSLP API unavailable, skipping sheet music lookup:', error instanceof Error ? error.message : 'Unknown error');
      return opera;
    }
  }

  /**
   * Enhance opera recording with mock musical data
   */
  static async enhanceWithMusicDatabases(opera: OperaRecording): Promise<OperaRecording> {
    try {
      console.log('🎵 Enhancing opera with mock musical data:', opera.title);
      
      // Generate mock musical data based on the opera's characteristics
      const mockData = MockMusicalDataGenerator.generateMusicalData(opera);
      console.log('🎵 Generated mock data:', mockData);
      
      // Enhance the opera recording with mock data
      const enhanced = {
        ...opera,
        musicalKey: mockData.musicalKey,
        tempo: mockData.tempo,
        genre: mockData.genre,
        instrumentation: mockData.instrumentation,
        mood: mockData.mood,
        duration: mockData.duration,
        movements: mockData.movements,
        metadata: {
          ...opera.metadata,
          mockData: true,
          note: 'Musical data generated based on opera characteristics and composer patterns'
        }
      };
      
      console.log('🎵 Enhanced opera with mock data:', enhanced);
      return enhanced;
    } catch (error) {
      console.error('Error enhancing with mock data:', error);
      // Return with basic fallback data even on error
      return this.addFallbackMusicalData(opera);
    }
  }

  /**
   * Add fallback recording information when Discogs data is not available
   */
  private static addFallbackRecordingInfo(opera: OperaRecording): OperaRecording {
    // Generate basic recording info based on available data
    const recordingInfo: RecordingInfo = {
      performers: [],
      conductor: undefined,
      orchestra: undefined,
      venue: undefined,
      recordingDate: opera.date,
      releaseDate: opera.publicdate,
      label: 'Unknown Label',
      catalogNumber: opera.identifier,
      country: 'Unknown',
      format: opera.format || ['Vinyl'],
      genres: opera.genre || ['Classical'],
      styles: ['Opera'],
      notes: opera.description,
      discogsUrl: undefined,
      coverImage: opera.imageUrl
    };

    // Try to extract conductor/orchestra from creator field
    if (opera.creator) {
      const creator = opera.creator.toLowerCase();
      if (creator.includes('conducted by') || creator.includes('dirigent')) {
        recordingInfo.conductor = opera.creator;
      } else if (creator.includes('orchestra') || creator.includes('symphony')) {
        recordingInfo.orchestra = opera.creator;
      }
    }

    return {
      ...opera,
      recordingInfo,
      metadata: {
        ...opera.metadata,
        fallbackRecording: true,
        note: 'Recording information not available from external sources - showing basic data'
      }
    };
  }

  /**
   * Add fallback musical data for testing when external APIs don't return data
   */
  private static addFallbackMusicalData(opera: OperaRecording): OperaRecording {
    // Generate more realistic fallback data based on opera title
    const title = opera.title.toLowerCase();
    const creator = opera.creator?.toLowerCase() || '';
    
    // Determine key based on composer or title patterns
    let musicalKey = 'C Major';
    if (creator.includes('mozart') || creator.includes('beethoven')) {
      musicalKey = 'D Major';
    } else if (creator.includes('bach') || creator.includes('handel')) {
      musicalKey = 'G Major';
    } else if (creator.includes('wagner') || creator.includes('verdi')) {
      musicalKey = 'E Major';
    }
    
    // Determine tempo based on opera type
    let tempo = 120;
    if (title.includes('overture') || title.includes('prelude')) {
      tempo = 140;
    } else if (title.includes('aria') || title.includes('duet')) {
      tempo = 100;
    } else if (title.includes('finale') || title.includes('chorus')) {
      tempo = 110;
    }
    
    // Determine genre based on title
    const genres = ['Classical', 'Opera'];
    if (title.includes('symphony') || title.includes('concerto')) {
      genres.push('Symphonic');
    } else if (title.includes('chamber') || title.includes('quartet')) {
      genres.push('Chamber Music');
    }
    
    // Determine instrumentation
    const instrumentation = ['Orchestra'];
    if (title.includes('aria') || title.includes('soprano')) {
      instrumentation.push('Soprano');
    }
    if (title.includes('tenor') || title.includes('baritone')) {
      instrumentation.push('Tenor', 'Baritone');
    }
    if (title.includes('chorus') || title.includes('choir')) {
      instrumentation.push('Chorus');
    }
    
    return {
      ...opera,
      musicalKey,
      tempo,
      genre: genres,
      instrumentation,
      mood: ['Dramatic', 'Emotional'],
      duration: '2:30:00',
      metadata: {
        ...opera.metadata,
        fallback: true,
        note: 'Musical data not available from external sources - showing estimated data based on title and composer'
      }
    };
  }

}
