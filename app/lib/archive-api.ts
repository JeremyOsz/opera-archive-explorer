import { OperaRecording, ArchiveResponse, SearchFilters } from '@/app/types/opera';

const ARCHIVE_API_BASE = 'https://archive.org/advancedsearch.php';

export class ArchiveAPI {
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
      const docs = (data.response?.docs || []).map((doc: any) => ({
        ...doc,
        imageUrl: `https://archive.org/services/img/${doc.identifier}`,
        thumbnailUrl: `https://archive.org/services/img/${doc.identifier}`,
        creator: Array.isArray(doc.creator) ? doc.creator.join(', ') : doc.creator,
        language: Array.isArray(doc.language) ? doc.language.join(', ') : doc.language,
        subject: Array.isArray(doc.subject) ? doc.subject : [],
        collection: Array.isArray(doc.collection) ? doc.collection : [],
        format: Array.isArray(doc.format) ? doc.format : []
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
    const query = this.buildQuery(filters);
    
    return this.fetchFromArchive({
      q: query,
      rows: rows.toString(),
      page: page.toString(),
      sort: 'publicdate desc'
    });
  }

  static async getOperaById(identifier: string): Promise<OperaRecording | null> {
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
        imageUrl: `https://archive.org/services/img/${data.metadata.identifier}`,
        thumbnailUrl: `https://archive.org/services/img/${data.metadata.identifier}`,
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
}
