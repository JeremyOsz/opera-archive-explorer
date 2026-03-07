import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Sparkles, Search } from 'lucide-react';
import { LightweightOpera, loadArchiveCache } from '@/app/lib/cache-loader';
import { groupRecordingsByWork } from '@/app/lib/work-grouper';
import { OperaRecording } from '@/app/types/opera';
import DiscoverySandbox from '@/app/components/DiscoverySandbox';
import SiteHeader from '@/app/components/SiteHeader';
import {
  DEFAULT_DISCOVERY_FILTERS,
  DiscoveryFilters,
  JOURNEY_OPTIONS,
  SORT_OPTIONS,
  ERA_OPTIONS,
  RARITY_OPTIONS,
  type Era,
  type RarityBand
} from '@/app/lib/discovery-types';

function toOperaRecording(work: LightweightOpera): OperaRecording {
  return {
    ...work,
    imageUrl: work.imageUrl || `https://archive.org/services/img/${work.identifier}`,
    thumbnailUrl: work.thumbnailUrl || `https://archive.org/services/img/${work.identifier}`,
    mediatype: 'audio',
    publicdate: work.date || '',
    addeddate: work.date || '',
    collection: [],
    format: [],
    files: [],
    metadata: {}
  };
}

interface SandboxPageProps {
  searchParams: {
    journey?: string;
    era?: string;
    rarityBand?: string;
    composer?: string;
    language?: string;
    query?: string;
    sortBy?: string;
  };
}

function parseInitialFilters(searchParams: SandboxPageProps['searchParams']): DiscoveryFilters {
  const next: DiscoveryFilters = {
    ...DEFAULT_DISCOVERY_FILTERS
  };

  if (searchParams.journey && JOURNEY_OPTIONS.includes(searchParams.journey as DiscoveryFilters['journey'])) {
    next.journey = searchParams.journey as DiscoveryFilters['journey'];
  }
  if (searchParams.era && searchParams.era !== 'all' && ERA_OPTIONS.includes(searchParams.era as Era)) {
    next.era = searchParams.era as Era;
  }
  if (searchParams.rarityBand && searchParams.rarityBand !== 'all' && RARITY_OPTIONS.includes(searchParams.rarityBand as RarityBand)) {
    next.rarityBand = searchParams.rarityBand as RarityBand;
  }
  if (searchParams.sortBy && SORT_OPTIONS.includes(searchParams.sortBy as DiscoveryFilters['sortBy'])) {
    next.sortBy = searchParams.sortBy as DiscoveryFilters['sortBy'];
  }

  next.composer = searchParams.composer || '';
  next.language = searchParams.language || '';
  next.query = searchParams.query || '';

  return next;
}

export default function SandboxPage({ searchParams }: SandboxPageProps) {
  const cache = loadArchiveCache();

  if (!cache) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader
          tagline="Sandbox for archive discovery and deep exploration."
          links={[
            { href: '/', label: 'Search', icon: Search },
            { href: '/sandbox', label: 'Sandbox', icon: Sparkles, active: true },
            { href: '/explore', label: 'Explore', icon: BarChart3 },
          ]}
        />
        <div className="container mx-auto px-4 py-10">
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Data Unavailable</h3>
              <p className="text-muted-foreground">
                The archive cache is not available. Please try again later.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const groupedWorks = groupRecordingsByWork(cache.works.map(toOperaRecording));

  const initialFilters = parseInitialFilters(searchParams);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        tagline="Sandbox for archive discovery and deep exploration."
        links={[
          { href: '/', label: 'Search', icon: Search },
          { href: '/sandbox', label: 'Sandbox', icon: Sparkles, active: true },
          { href: '/explore', label: 'Explore', icon: BarChart3 },
        ]}
        meta={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Collection scope: {cache.metadata.totalWorks.toLocaleString()} cached items, generated on{' '}
            {new Date(cache.metadata.generatedAt).toLocaleDateString()}
          </span>
        }
      />

      <main className="container mx-auto px-4 py-10">
        <DiscoverySandbox works={groupedWorks} initialFilters={initialFilters} />
      </main>
    </div>
  );
}
