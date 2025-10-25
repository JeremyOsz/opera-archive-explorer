export interface SheetMusicLink {
  title: string;
  composer: string;
  catalogNumber?: string;
  imslpUrl: string;
  pageId: string;
  workType: string;
}

export interface NotablePerformance {
  year: number;
  conductor?: string;
  orchestra?: string;
  venue?: string;
  singers?: Array<{
    name: string;
    role: string;
  }>;
  significance: string;
  historicalContext?: string;
  recordingLabel?: string;
  notes?: string;
}

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
  // Musical metadata
  musicalKey?: string;
  tempo?: number;
  movements?: Movement[];
  acts?: Act[];
  duration?: string;
  genre?: string[];
  instrumentation?: string[];
  mood?: string[];
  // Recording information
  recordingInfo?: RecordingInfo;
  // Notable performances
  notablePerformances?: NotablePerformance[];
  // Sheet music links
  sheetMusicLinks?: SheetMusicLink[];
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

export interface Movement {
  title: string;
  duration?: string;
  musicalKey?: string;
  tempo?: number;
  trackNumber?: number;
  description?: string;
}

export interface Act {
  actNumber: number;
  title: string;
  key: string;
  tempo: number;
  timeSignature: string;
  duration: string;
  tempoMarking: string;
  description?: string;
  sections: Section[];
}

export interface Section {
  title: string;
  sectionNumber: number;
  sectionType: string;
  musicalFunction: 'exposition' | 'development' | 'climax' | 'resolution' | 'transition' | 'character_introduction' | 'plot_progression' | 'dramatic_peak' | 'conclusion';
  complexity: 'simple' | 'moderate' | 'complex';
  key: string;
  tempo: number;
  timeSignature: string;
  duration: string;
  tempoMarking: string;
  description?: string;
  musicalElements: {
    mood: string[];
    instrumentation: string[];
    dynamics: string;
  };
}
