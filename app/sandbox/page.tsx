import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Home, Music, Sparkles } from 'lucide-react';
import { LightweightOpera, loadArchiveCache } from '@/app/lib/cache-loader';
import { groupRecordingsByWork } from '@/app/lib/work-grouper';
import { OperaRecording } from '@/app/types/opera';
import DiscoverySandbox from '@/app/components/DiscoverySandbox';
import {
  DEFAULT_DISCOVERY_FILTERS,
  DiscoveryFilters,
  JOURNEY_OPTIONS,
  SORT_OPTIONS,
  ERA_OPTIONS,
  RARITY_OPTIONS
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
  if (searchParams.era && ERA_OPTIONS.includes(searchParams.era as DiscoveryFilters['era'])) {
    next.era = searchParams.era as DiscoveryFilters['era'];
  }
  if (searchParams.rarityBand && RARITY_OPTIONS.includes(searchParams.rarityBand as DiscoveryFilters['rarityBand'])) {
    next.rarityBand = searchParams.rarityBand as DiscoveryFilters['rarityBand'];
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
        <div className="container mx-auto px-4 py-8">
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
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Opera Archive Explorer</h1>
                <p className="text-muted-foreground">
                  Sandbox for archive discovery and deep exploration
                </p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <Link
                href="/explore"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Explore</span>
              </Link>
              <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>
              Collection scope: {cache.metadata.totalWorks.toLocaleString()} cached items, generated on{' '}
              {new Date(cache.metadata.generatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <DiscoverySandbox works={groupedWorks} initialFilters={initialFilters} />
      </main>
    </div>
  );
}
