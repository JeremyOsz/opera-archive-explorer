/**
 * Discogs API Integration
 * ======================
 * Service for fetching recording metadata from Discogs API
 */

export interface DiscogsRelease {
  id: number;
  title: string;
  artists: Array<{
    name: string;
    anv?: string;
    join?: string;
    role?: string;
    tracks?: string;
    id: number;
    resource_url: string;
  }>;
  labels: Array<{
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    id: number;
    resource_url: string;
  }>;
  year: number;
  genres: string[];
  styles: string[];
  country: string;
  released: string;
  notes: string;
  data_quality: string;
  community: {
    want: number;
    have: number;
    rating: {
      count: number;
      average: number;
    };
  };
  format_quantity: number;
  formats: Array<{
    name: string;
    qty: string;
    descriptions: string[];
  }>;
  tracklist: Array<{
    position: string;
    type_: string;
    title: string;
    duration: string;
  }>;
  extraartists: Array<{
    name: string;
    anv?: string;
    join?: string;
    role: string;
    tracks?: string;
    id: number;
    resource_url: string;
  }>;
  images: Array<{
    type: string;
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
  }>;
  thumb: string;
  num_for_sale: number;
  lowest_price: number;
  master_id: number;
  master_url: string;
  estimated_weight: number;
  blocked_from_sale: boolean;
}

export interface DiscogsSearchResult {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      first: string;
      prev: string;
      next: string;
      last: string;
    };
  };
  results: Array<{
    id: number;
    type: string;
    title: string;
    thumb: string;
    cover_image: string;
    resource_url: string;
    master_id?: number;
    master_url?: string;
    uri: string;
    country: string;
    year: string;
    format: string[];
    label: string[];
    genre: string[];
    style: string[];
    barcode: string[];
    community: {
      want: number;
      have: number;
    };
    format_quantity: number;
    formats: Array<{
      name: string;
      qty: string;
      descriptions: string[];
    }>;
  }>;
}

export interface RecordingInfo {
  performers: Array<{
    name: string;
    role: string;
    instrument?: string;
  }>;
  conductor?: string;
  orchestra?: string;
  venue?: string;
  recordingDate?: string;
  releaseDate?: string;
  label?: string;
  catalogNumber?: string;
  country?: string;
  format?: string[];
  genres?: string[];
  styles?: string[];
  notes?: string;
  discogsUrl?: string;
  coverImage?: string;
}

export class DiscogsAPI {
  private static readonly BASE_URL = 'https://api.discogs.com';
  private static readonly USER_AGENT = 'OperaArchiveExplorer/1.0';
  private static readonly RATE_LIMIT_DELAY = 1000; // 1 second between requests
  private static lastRequestTime = 0;
  private static readonly API_TOKEN = process.env.DISCOGS_API_TOKEN;

  /**
   * Search for releases on Discogs
   */
  static async searchReleases(
    query: string,
    options: {
      type?: 'release' | 'master' | 'artist' | 'label';
      year?: number;
      country?: string;
      format?: string;
      genre?: string;
      page?: number;
      per_page?: number;
    } = {}
  ): Promise<DiscogsSearchResult> {
    await this.rateLimitDelay();

    const params = new URLSearchParams({
      q: query,
      type: options.type || 'release',
      ...(options.year && { year: options.year.toString() }),
      ...(options.country && { country: options.country }),
      ...(options.format && { format: options.format }),
      ...(options.genre && { genre: options.genre }),
      page: (options.page || 1).toString(),
      per_page: (options.per_page || 25).toString(),
    });

    const url = `${this.BASE_URL}/database/search?${params.toString()}`;
    
    try {
      const headers: Record<string, string> = {
        'User-Agent': this.USER_AGENT,
        'Accept': 'application/json',
      };
      
      if (this.API_TOKEN) {
        headers['Authorization'] = `Discogs token=${this.API_TOKEN}`;
      }
      
      const response = await fetch(url, { headers });

      if (!response.ok) {
        console.warn(`Discogs API error: ${response.status} ${response.statusText}`);
        if (response.status === 401) {
          throw new Error('Discogs API authentication required');
        } else if (response.status === 429) {
          throw new Error('Discogs API rate limit exceeded');
        } else if (response.status === 404) {
          throw new Error('Discogs release not found');
        } else {
          throw new Error(`Discogs API error: ${response.status} ${response.statusText}`);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching Discogs:', error);
      throw new Error('Failed to search Discogs API');
    }
  }

  /**
   * Get detailed release information
   */
  static async getRelease(releaseId: number): Promise<DiscogsRelease> {
    await this.rateLimitDelay();

    const url = `${this.BASE_URL}/releases/${releaseId}`;
    
    try {
      const headers: Record<string, string> = {
        'User-Agent': this.USER_AGENT,
        'Accept': 'application/json',
      };
      
      if (this.API_TOKEN) {
        headers['Authorization'] = `Discogs token=${this.API_TOKEN}`;
      }
      
      const response = await fetch(url, { headers });

      if (!response.ok) {
        console.warn(`Discogs API error: ${response.status} ${response.statusText}`);
        if (response.status === 401) {
          throw new Error('Discogs API authentication required');
        } else if (response.status === 429) {
          throw new Error('Discogs API rate limit exceeded');
        } else if (response.status === 404) {
          throw new Error('Discogs release not found');
        } else {
          throw new Error(`Discogs API error: ${response.status} ${response.statusText}`);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Discogs release:', error);
      throw new Error('Failed to fetch release from Discogs API');
    }
  }

  /**
   * Extract recording information from a Discogs release
   */
  static extractRecordingInfo(release: DiscogsRelease): RecordingInfo {
    const performers: Array<{ name: string; role: string; instrument?: string }> = [];
    let conductor: string | undefined;
    let orchestra: string | undefined;

    // Extract performers from artists and extraartists
    const allArtists = [...(release.artists || []), ...(release.extraartists || [])];
    
    for (const artist of allArtists) {
      const role = artist.role?.toLowerCase() || '';
      const name = artist.name;

      if (role.includes('conductor') || role.includes('dirigent')) {
        conductor = name;
      } else if (role.includes('orchestra') || role.includes('ensemble')) {
        orchestra = name;
      } else if (role.includes('vocals') || role.includes('singer') || role.includes('soprano') || 
                 role.includes('tenor') || role.includes('baritone') || role.includes('bass')) {
        performers.push({
          name,
          role: artist.role || 'Vocalist',
          instrument: this.extractInstrumentFromRole(role)
        });
      } else if (role.includes('piano') || role.includes('violin') || role.includes('cello') || 
                 role.includes('flute') || role.includes('oboe') || role.includes('clarinet') ||
                 role.includes('trumpet') || role.includes('horn') || role.includes('trombone')) {
        performers.push({
          name,
          role: artist.role || 'Musician',
          instrument: this.extractInstrumentFromRole(role)
        });
      }
    }

    return {
      performers,
      conductor,
      orchestra,
      venue: this.extractVenueFromNotes(release.notes),
      recordingDate: this.extractRecordingDate(release.notes, release.year),
      releaseDate: release.released || release.year?.toString(),
      label: release.labels?.[0]?.name,
      catalogNumber: release.labels?.[0]?.catno,
      country: release.country,
      format: release.formats?.map(f => f.name),
      genres: release.genres,
      styles: release.styles,
      notes: release.notes,
      discogsUrl: `https://www.discogs.com/release/${release.id}`,
      coverImage: release.images?.[0]?.uri || release.thumb
    };
  }

  /**
   * Search for a specific opera recording
   */
  static async findOperaRecording(
    operaTitle: string,
    composer?: string,
    year?: number
  ): Promise<RecordingInfo | null> {
    // Check if we have an API token - if not, skip Discogs integration
    if (!this.API_TOKEN) {
      console.log('🎵 No Discogs API token configured, skipping Discogs integration');
      return null;
    }

    try {
      // Build search query
      let query = operaTitle;
      if (composer) {
        query = `${composer} ${operaTitle}`;
      }

      // Search for releases
      const searchResults = await this.searchReleases(query, {
        type: 'release',
        format: 'Vinyl',
        genre: 'Classical',
        year,
        per_page: 10
      });

      if (searchResults.results.length === 0) {
        return null;
      }

      // Try to find the best match
      for (const result of searchResults.results) {
        const release = await this.getRelease(result.id);
        const recordingInfo = this.extractRecordingInfo(release);
        
        // Check if this looks like an opera recording
        if (this.isOperaRecording(release, operaTitle)) {
          return recordingInfo;
        }
      }

      // If no exact match, return the first result
      const firstRelease = await this.getRelease(searchResults.results[0].id);
      return this.extractRecordingInfo(firstRelease);
    } catch (error) {
      console.error('Error finding opera recording:', error);
      return null;
    }
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
   * Extract instrument from role string
   */
  private static extractInstrumentFromRole(role: string): string | undefined {
    const instruments = ['piano', 'violin', 'cello', 'flute', 'oboe', 'clarinet', 'trumpet', 'horn', 'trombone'];
    const lowerRole = role.toLowerCase();
    
    for (const instrument of instruments) {
      if (lowerRole.includes(instrument)) {
        return instrument.charAt(0).toUpperCase() + instrument.slice(1);
      }
    }
    
    return undefined;
  }

  /**
   * Extract venue from notes
   */
  private static extractVenueFromNotes(notes?: string): string | undefined {
    if (!notes) return undefined;
    
    // Look for common venue patterns
    const venuePatterns = [
      /recorded at (.+?)(?:\.|,|$)/i,
      /venue: (.+?)(?:\.|,|$)/i,
      /location: (.+?)(?:\.|,|$)/i,
      /studio: (.+?)(?:\.|,|$)/i
    ];
    
    for (const pattern of venuePatterns) {
      const match = notes.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return undefined;
  }

  /**
   * Extract recording date from notes or use release year
   */
  private static extractRecordingDate(notes?: string, releaseYear?: number): string | undefined {
    if (!notes) return releaseYear?.toString();
    
    // Look for recording date patterns
    const datePatterns = [
      /recorded (.+?)(?:\.|,|$)/i,
      /recording date: (.+?)(?:\.|,|$)/i,
      /recorded in (.+?)(?:\.|,|$)/i
    ];
    
    for (const pattern of datePatterns) {
      const match = notes.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return releaseYear?.toString();
  }

  /**
   * Check if a release appears to be an opera recording
   */
  private static isOperaRecording(release: DiscogsRelease, operaTitle: string): boolean {
    const title = release.title.toLowerCase();
    const searchTitle = operaTitle.toLowerCase();
    
    // Check if the opera title appears in the release title
    const titleWords = searchTitle.split(' ');
    const hasTitleMatch = titleWords.some(word => 
      word.length > 3 && title.includes(word)
    );
    
    // Check for opera-related keywords
    const operaKeywords = ['opera', 'aria', 'act', 'scene', 'overture', 'prelude'];
    const hasOperaKeywords = operaKeywords.some(keyword => title.includes(keyword));
    
    // Check genres
    const hasClassicalGenre = release.genres?.includes('Classical') || 
                             release.styles?.some(style => 
                               style.toLowerCase().includes('opera') || 
                               style.toLowerCase().includes('classical')
                             );
    
    return hasTitleMatch || (hasOperaKeywords && hasClassicalGenre);
  }
}
