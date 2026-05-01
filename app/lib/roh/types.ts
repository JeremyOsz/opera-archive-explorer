export const ROH_BASE_URL = 'https://www.rohcollections.org.uk/';

/** Four-way split for catalogue + streams + editorial UIs */
export const RohDataSources = {
  collections: 'RBO Collections',
  assetLibrary: 'RBO Asset Library',
  webContent: 'RBO Web Content',
  stream: 'RBO Stream',
} as const;

export type RohDataSourceLabel = (typeof RohDataSources)[keyof typeof RohDataSources];

export type RohEntityType =
  | 'record'
  | 'work'
  | 'production'
  | 'performance'
  | 'asset'
  | 'rbo_web'
  | 'rbo_stream';

export interface RohRelatedRecordCollection {
  collection: string;
  count?: number;
  url: string;
}

export interface RohRecordSeed {
  id: string;
  title: string;
  collection?: string;
  objectNumber?: string;
  thumbnailUrl?: string;
  sourceUrl: string;
}

export interface RohWorkSeed {
  id: string;
  title: string;
  genre?: string;
  creator?: string;
  sourceUrl: string;
}

export interface RohProductionSeed {
  id: string;
  title: string;
  company?: string;
  performanceCount?: number;
  sourceUrl: string;
}

export interface RohPerformanceSeed {
  id: string;
  date?: string;
  session?: string;
  venue?: string;
  sourceUrl: string;
}

export interface RohRecord {
  id: string;
  title: string;
  collection?: string;
  objectNumber?: string;
  date?: string;
  description?: string;
  creator?: string;
  dimensions?: string;
  condition?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  sourceUrl: string;
  metadata: Record<string, string>;
  relatedWorkId?: string;
}

export interface RohWork {
  id: string;
  title: string;
  genre?: string;
  composer?: string;
  librettist?: string;
  musicTitle?: string;
  language?: string;
  workDefinition?: string;
  titleNotes?: string;
  notes?: string;
  worldPremiere?: string;
  rohPremiere?: string;
  rohCompanyPremiere?: string;
  sourceUrl: string;
  metadata: Record<string, string>;
  relatedWorkId?: string;
  productions: RohProductionSeed[];
  relatedRecordCollections: RohRelatedRecordCollection[];
}

export interface RohProduction {
  id: string;
  workId?: string;
  title: string;
  company?: string;
  productionPremiere?: string;
  producer?: string;
  costumeDesigner?: string;
  notes?: string;
  sourceUrl: string;
  metadata: Record<string, string>;
  performances: RohPerformanceSeed[];
  relatedRecordCollections?: RohRelatedRecordCollection[];
}

export interface RohCastMember {
  performanceId: string;
  role: string;
  performer: string;
  notes?: string;
}

export interface RohPerformance {
  id: string;
  productionId?: string;
  title: string;
  date?: string;
  session?: string;
  venue?: string;
  company?: string;
  status?: string;
  conductor?: string;
  leader?: string;
  sourceUrl: string;
  metadata: Record<string, string>;
  cast: RohCastMember[];
}

export interface RohCollectionResults {
  records: RohRecordSeed[];
  total?: number;
  nextPageUrl?: string;
}

export interface RohDataset {
  records: RohRecord[];
  works: RohWork[];
  productions: RohProduction[];
  performances: RohPerformance[];
}

export interface RohSearchItem {
  type: RohEntityType;
  id: string;
  /** Where this row originated (collections crawl, Asset Library snapshot, etc.) */
  source: RohDataSourceLabel;
  title: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
  sourceUrl: string;
  metadata: Record<string, string>;
}

export interface RohFacetBucket {
  value: string;
  count: number;
}

export interface RohSearchFacets {
  sources: RohFacetBucket[];
  collections: RohFacetBucket[];
  genres: RohFacetBucket[];
  creators: RohFacetBucket[];
  companies: RohFacetBucket[];
  types: RohFacetBucket[];
}

export interface RohSearchParams {
  query?: string;
  type?: RohEntityType | 'all';
  /** One of `RohDataSources.*` labels */
  source?: string;
  collection?: string;
  genre?: string;
  creator?: string;
  company?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface RohSearchResult {
  items: RohSearchItem[];
  total: number;
  facets: RohSearchFacets;
}
