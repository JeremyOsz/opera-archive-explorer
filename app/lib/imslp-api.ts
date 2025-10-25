/**
 * IMSLP API Integration
 * =====================
 * Service for fetching sheet music links from IMSLP (International Music Score Library Project)
 * Now uses static lookup for better reliability
 */

import { IMSLPStaticLookup } from './imslp-static-lookup';

export interface IMSLPWork {
  id: string;
  type: string;
  parent: string;
  intvals: {
    composer: string;
    worktitle: string;
    icatno: string;
    pageid: string;
  };
  permlink: string;
}

export interface IMSLPResponse {
  [key: string]: IMSLPWork | {
    start: number;
    limit: number;
    sortby: string;
    sortdirection: string;
    moreresultsavailable: boolean;
    timestamp: number;
    apiversion: number;
  };
}

export interface SheetMusicLink {
  title: string;
  composer: string;
  catalogNumber?: string;
  imslpUrl: string;
  pageId: string;
  workType: string;
}

export interface SheetMusicSearchResult {
  works: SheetMusicLink[];
  totalResults: number;
  hasMoreResults: boolean;
}

export class IMSLPAPI {
  private static readonly BASE_URL = '/api/imslp'; // Use our server-side proxy
  private static readonly RATE_LIMIT_DELAY = 500; // 0.5 seconds between requests
  private static lastRequestTime = 0;

  /**
   * Search for works on IMSLP
   */
  static async searchWorks(
    query: string,
    options: {
      start?: number;
      limit?: number;
      sortBy?: 'id' | 'title' | 'composer';
      sortDirection?: 'ASC' | 'DESC';
    } = {}
  ): Promise<SheetMusicSearchResult> {
    await this.rateLimitDelay();

    const params = new URLSearchParams({
      q: query,
      start: (options.start || 0).toString(),
      limit: (options.limit || 100).toString(),
      sortBy: options.sortBy || 'id'
    });

    const url = `${this.BASE_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`IMSLP API error: ${response.status} ${response.statusText}`);
        if (response.status === 429) {
          throw new Error('IMSLP API rate limit exceeded');
        } else if (response.status === 404) {
          throw new Error('IMSLP API endpoint not found');
        } else {
          throw new Error(`IMSLP API error: ${response.status} ${response.statusText}`);
        }
      }

      const data: IMSLPResponse = await response.json();
      return this.parseIMSLPResponse(data);
    } catch (error) {
      console.error('Error searching IMSLP:', error);
      throw new Error('Failed to search IMSLP API');
    }
  }

  /**
   * Search for sheet music by composer and work title
   * Now uses static lookup for better reliability
   */
  static async findSheetMusic(
    workTitle: string,
    composer?: string
  ): Promise<SheetMusicLink[]> {
    try {
      console.log('🎼 Looking up sheet music for:', workTitle, composer);
      
      // Use static lookup
      const staticLinks = IMSLPStaticLookup.findSheetMusic(workTitle, composer);
      
      if (staticLinks.length > 0) {
        console.log('🎼 Found static sheet music links:', staticLinks.length);
        
        // Convert static links to our format
        return staticLinks.map(link => ({
          title: link.title,
          composer: link.composer,
          catalogNumber: link.catalogNumber,
          imslpUrl: link.imslpUrl,
          pageId: this.extractPageIdFromUrl(link.imslpUrl),
          workType: link.workType
        }));
      }
      
      console.log('🎼 No static sheet music links found');
      return [];
    } catch (error) {
      console.error('Error finding sheet music:', error);
      return [];
    }
  }

  /**
   * Search for sheet music by composer only
   * Now uses static lookup for better reliability
   */
  static async findSheetMusicByComposer(composer: string): Promise<SheetMusicLink[]> {
    try {
      console.log('🎼 Looking up sheet music by composer:', composer);
      
      // Use static lookup - search through all operas for this composer
      const allOperas = IMSLPStaticLookup.getAllOperas();
      const results: SheetMusicLink[] = [];
      
      for (const opera of allOperas) {
        const links = IMSLPStaticLookup.findSheetMusic(opera, composer);
        if (links.length > 0) {
          results.push(...links.map(link => ({
            title: link.title,
            composer: link.composer,
            catalogNumber: link.catalogNumber,
            imslpUrl: link.imslpUrl,
            pageId: this.extractPageIdFromUrl(link.imslpUrl),
            workType: link.workType
          })));
        }
      }
      
      console.log('🎼 Found static sheet music links by composer:', results.length);
      return results.slice(0, 20); // Return top 20 works by composer
    } catch (error) {
      console.error('Error finding sheet music by composer:', error);
      return [];
    }
  }

  /**
   * Parse IMSLP API response into our format
   */
  private static parseIMSLPResponse(data: IMSLPResponse): SheetMusicSearchResult {
    const works: SheetMusicLink[] = [];
    let metadata: any = null;
    
    // Extract works from the response (exclude metadata)
    for (const key in data) {
      const item = data[key];
      
      // Check if this is metadata
      if (key === 'metadata' || (typeof item === 'object' && item !== null && 'start' in item)) {
        metadata = item;
        continue;
      }
      
      // Check if this is a work
      if (item && typeof item === 'object' && 'type' in item && 'intvals' in item) {
        const work = item as IMSLPWork;
        if (work.type === '2' && work.intvals) {
          works.push({
            title: work.intvals.worktitle,
            composer: work.intvals.composer,
            catalogNumber: work.intvals.icatno || undefined,
            imslpUrl: work.permlink,
            pageId: work.intvals.pageid,
            workType: work.type
          });
        }
      }
    }

    return {
      works,
      totalResults: works.length,
      hasMoreResults: metadata?.moreresultsavailable || false
    };
  }

  /**
   * Check if a work is relevant to the search
   */
  private static isRelevantWork(
    work: SheetMusicLink, 
    workTitle: string, 
    composer?: string
  ): boolean {
    const title = work.title.toLowerCase();
    const searchTitle = workTitle.toLowerCase();
    const searchComposer = composer?.toLowerCase();

    // Check title match
    const titleWords = searchTitle.split(' ').filter(word => word.length > 2);
    const hasTitleMatch = titleWords.some(word => title.includes(word));

    // Check composer match if provided
    const hasComposerMatch = !searchComposer || 
      work.composer.toLowerCase().includes(searchComposer);

    return hasTitleMatch && hasComposerMatch;
  }

  /**
   * Rate limiting helper
   */
  private static async rateLimitDelay(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest));
    }
    
    this.lastRequestTime = Date.now();
  }

  /**
   * Get a direct link to a work's sheet music page
   */
  static getSheetMusicUrl(pageId: string): string {
    return `https://imslp.org/wiki/index.php?title=Special:IMSLP&pageid=${pageId}`;
  }

  /**
   * Extract composer name from opera creator field
   */
  static extractComposerFromCreator(creator: string): string | undefined {
    if (!creator) return undefined;

    // Common patterns for composer names in creator fields
    const patterns = [
      /^([^,]+),?\s*$/, // Simple name
      /^([^,]+),\s*[^,]+$/, // Last, First
      /^([^,]+),\s*[^,]+,\s*[^,]+$/, // Last, First, Middle
    ];

    for (const pattern of patterns) {
      const match = creator.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return creator.split(',')[0]?.trim();
  }

  /**
   * Clean work title for better matching
   */
  static cleanWorkTitle(title: string): string {
    return title
      .replace(/^(The|A|An|La|Le|Les|Der|Die|Das|Il|Lo|Gli|I|Gli|Le|L')\s+/i, '') // Remove articles
      .replace(/\s*\([^)]*\)\s*$/, '') // Remove parenthetical content at the end
      .replace(/\s*,\s*Op\.\s*\d+.*$/, '') // Remove opus numbers
      .replace(/\s*,\s*K\.\s*\d+.*$/, '') // Remove Köchel numbers
      .replace(/\s*,\s*BWV\s*\d+.*$/, '') // Remove BWV numbers
      .trim();
  }

  /**
   * Extract page ID from IMSLP URL
   */
  private static extractPageIdFromUrl(url: string): string {
    // Extract a simple identifier from the URL for the pageId field
    const match = url.match(/wiki\/([^%]+)/);
    return match ? match[1] : 'unknown';
  }
}
