export type Era = 'baroque' | 'classical' | 'romantic' | 'modern' | 'contemporary' | 'unknown';

export type RecordingType = 'complete' | 'highlights' | 'excerpts' | 'unknown';

export type RarityBand = 'rare' | 'uncommon' | 'well-known';

export type DiscoverySort = 'discovery' | 'recent' | 'recordings' | 'alpha';

export type DiscoveryJourney =
  | 'all'
  | 'hidden-gems'
  | 'language-routes'
  | 'time-travel'
  | 'composer-constellations';

export interface DiscoveryFilters {
  journey: DiscoveryJourney;
  era: Era | 'all';
  rarityBand: RarityBand | 'all';
  composer: string;
  language: string;
  query: string;
  sortBy: DiscoverySort;
}

export const ERA_OPTIONS: Era[] = ['baroque', 'classical', 'romantic', 'modern', 'contemporary', 'unknown'];

export const RARITY_OPTIONS: RarityBand[] = ['rare', 'uncommon', 'well-known'];

export const SORT_OPTIONS: DiscoverySort[] = ['discovery', 'recent', 'recordings', 'alpha'];

export const JOURNEY_OPTIONS: DiscoveryJourney[] = [
  'all',
  'hidden-gems',
  'language-routes',
  'time-travel',
  'composer-constellations'
];

export const DEFAULT_DISCOVERY_FILTERS: DiscoveryFilters = {
  journey: 'all',
  era: 'all',
  rarityBand: 'all',
  composer: '',
  language: '',
  query: '',
  sortBy: 'discovery'
};
