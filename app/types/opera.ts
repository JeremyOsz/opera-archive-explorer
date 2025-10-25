export interface OperaRecording {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  description?: string;
  language?: string;
  subject?: string[];
  mediatype: string;
  publicdate: string;
  addeddate: string;
  collection?: string[];
  format?: string[];
  files?: ArchiveFile[];
  metadata?: Record<string, any>;
  imageUrl?: string;
  thumbnailUrl?: string;
}

export interface ArchiveFile {
  name: string;
  size: string;
  format: string;
  md5: string;
  crc32: string;
  sha1: string;
  length?: string;
  source?: string;
  original?: string;
  mtime: string;
}

export interface ArchiveResponse {
  numFound: number;
  start: number;
  docs: OperaRecording[];
}

export interface SearchFilters {
  query: string;
  creator?: string;
  date?: string;
  language?: string;
  format?: string;
}

export interface OperaDetail extends OperaRecording {
  reviews?: Review[];
  downloadOptions?: DownloadOption[];
  relatedItems?: OperaRecording[];
}

export interface Review {
  id: string;
  title: string;
  reviewer: string;
  rating: number;
  content: string;
  date: string;
}

export interface DownloadOption {
  format: string;
  size: string;
  url: string;
  quality: string;
}
