'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { GroupedWork, getCanonicalWorkTitle } from '@/app/lib/work-grouper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Calendar,
  Compass,
  Disc,
  Filter,
  Globe,
  RefreshCcw,
  Sparkles,
  User,
  WandSparkles
} from 'lucide-react';
import ClientWorkGroupGrid from './ClientWorkGroupGrid';
import { DiscoveryFilters, DiscoveryJourney, Era, RarityBand } from '@/app/lib/discovery-types';
import { OperaRecording } from '@/app/types/opera';

interface DiscoverySandboxProps {
  works: GroupedWork[];
  initialFilters: DiscoveryFilters;
}

interface EnrichedWork {
  work: GroupedWork;
  canonicalTitle: string;
  yearMin: number | null;
  yearMax: number | null;
  primaryEra: Era;
  rarityBand: RarityBand;
  averageDiscoveryScore: number;
  composerWorkCount: number;
}

interface JourneyCard {
  id: DiscoveryJourney;
  title: string;
  description: string;
}

const JOURNEY_CARDS: JourneyCard[] = [
  {
    id: 'hidden-gems',
    title: 'Hidden Gems',
    description: 'Rare and overlooked recordings with strong metadata richness.'
  },
  {
    id: 'language-routes',
    title: 'Language Routes',
    description: 'Traverse the archive through Italian, French, German, and Russian paths.'
  },
  {
    id: 'time-travel',
    title: 'Time Travel',
    description: 'Step across eras from early recordings to contemporary catalog entries.'
  },
  {
    id: 'composer-constellations',
    title: 'Composer Constellations',
    description: 'Start with major composer clusters and branch into related works.'
  }
];

const LANGUAGE_ROUTE_OPTIONS = ['Italian', 'French', 'German', 'Russian'];

function getYearBounds(years: string[]): { min: number | null; max: number | null } {
  const parsed = years.map((year) => parseInt(year, 10)).filter((year) => !Number.isNaN(year));
  if (parsed.length === 0) {
    return { min: null, max: null };
  }
  return { min: Math.min(...parsed), max: Math.max(...parsed) };
}

function getEraFromYear(year: number | null): Era {
  if (!year) return 'unknown';
  if (year <= 1939) return 'early';
  if (year <= 1969) return 'golden';
  if (year <= 1999) return 'modern';
  return 'contemporary';
}

function matchesLanguage(work: GroupedWork, language: string): boolean {
  if (!language) return true;
  return work.languages.some((entry) => entry.toLowerCase() === language.toLowerCase());
}

function getRecordingScore(recording: OperaRecording): number {
  return recording.discoveryScore ?? 0;
}

function eraLabel(era: Era): string {
  if (era === 'early') return 'Early';
  if (era === 'golden') return 'Golden';
  if (era === 'modern') return 'Modern';
  if (era === 'contemporary') return 'Contemporary';
  return 'Unknown';
}

export default function DiscoverySandbox({ works, initialFilters }: DiscoverySandboxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<DiscoveryFilters>(initialFilters);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const enrichedWorks = useMemo(() => {
    const composerCounts = new Map<string, number>();
    works.forEach((work) => {
      const composer = work.composer || 'Unknown';
      composerCounts.set(composer, (composerCounts.get(composer) || 0) + 1);
    });

    return works.map<EnrichedWork>((work) => {
      const bounds = getYearBounds(work.years);
      const canonicalTitle = getCanonicalWorkTitle(work);
      const primaryEra = getEraFromYear(bounds.max);
      const rarityBand: RarityBand =
        work.recordings.length <= 1 ? 'rare' : work.recordings.length <= 3 ? 'uncommon' : 'well-known';
      const averageDiscoveryScore =
        work.recordings.length > 0
          ? Math.round(work.recordings.reduce((sum, rec) => sum + getRecordingScore(rec), 0) / work.recordings.length)
          : 0;
      const composerWorkCount = composerCounts.get(work.composer || 'Unknown') || 0;

      return {
        work,
        canonicalTitle,
        yearMin: bounds.min,
        yearMax: bounds.max,
        primaryEra,
        rarityBand,
        averageDiscoveryScore,
        composerWorkCount
      };
    });
  }, [works]);

  const composerOptions = useMemo(() => {
    const counts = new Map<string, number>();
    enrichedWorks.forEach(({ work }) => {
      const name = work.composer || 'Unknown';
      counts.set(name, (counts.get(name) || 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
  }, [enrichedWorks]);

  const languageOptions = useMemo(() => {
    const languages = new Set<string>();
    enrichedWorks.forEach(({ work }) => {
      work.languages.forEach((entry) => {
        if (entry.trim()) languages.add(entry.trim());
      });
    });
    return Array.from(languages).sort((a, b) => a.localeCompare(b));
  }, [enrichedWorks]);

  const updateUrl = (next: DiscoveryFilters) => {
    const params = new URLSearchParams();
    if (next.journey !== 'all') params.set('journey', next.journey);
    if (next.era !== 'all') params.set('era', next.era);
    if (next.rarityBand !== 'all') params.set('rarityBand', next.rarityBand);
    if (next.composer) params.set('composer', next.composer);
    if (next.language) params.set('language', next.language);
    if (next.query) params.set('query', next.query);
    if (next.sortBy !== 'discovery') params.set('sortBy', next.sortBy);

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const applyFilters = (partial: Partial<DiscoveryFilters>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    updateUrl(next);
    setSpotlightIndex(0);
  };

  const filteredWorks = useMemo(() => {
    const lowered = filters.query.trim().toLowerCase();
    const topComposerThreshold = 4;

    let next = enrichedWorks.filter((entry) => {
      const title = entry.canonicalTitle.toLowerCase();
      const composer = (entry.work.composer || '').toLowerCase();
      const subjects = entry.work.subjects.join(' ').toLowerCase();

      if (lowered && !title.includes(lowered) && !composer.includes(lowered) && !subjects.includes(lowered)) {
        return false;
      }

      if (filters.composer && entry.work.composer !== filters.composer) {
        return false;
      }

      if (filters.language && !matchesLanguage(entry.work, filters.language)) {
        return false;
      }

      if (filters.era !== 'all' && entry.primaryEra !== filters.era) {
        return false;
      }

      if (filters.rarityBand !== 'all' && entry.rarityBand !== filters.rarityBand) {
        return false;
      }

      if (filters.journey === 'hidden-gems') {
        return entry.averageDiscoveryScore >= 60 && entry.rarityBand !== 'well-known';
      }

      if (filters.journey === 'language-routes') {
        return entry.work.languages.length > 0;
      }

      if (filters.journey === 'time-travel') {
        return entry.primaryEra !== 'unknown';
      }

      if (filters.journey === 'composer-constellations') {
        return entry.composerWorkCount >= topComposerThreshold;
      }

      return true;
    });

    if (filters.sortBy === 'alpha') {
      next = [...next].sort((a, b) => a.canonicalTitle.localeCompare(b.canonicalTitle));
    }

    if (filters.sortBy === 'recordings') {
      next = [...next].sort((a, b) => b.work.recordings.length - a.work.recordings.length);
    }

    if (filters.sortBy === 'recent') {
      next = [...next].sort((a, b) => (b.yearMax || 0) - (a.yearMax || 0));
    }

    if (filters.sortBy === 'discovery') {
      next = [...next].sort((a, b) => b.averageDiscoveryScore - a.averageDiscoveryScore);
    }

    return next;
  }, [enrichedWorks, filters]);

  const journeyCounts = useMemo(() => {
    const counts: Record<DiscoveryJourney, number> = {
      all: enrichedWorks.length,
      'hidden-gems': 0,
      'language-routes': 0,
      'time-travel': 0,
      'composer-constellations': 0
    };
    enrichedWorks.forEach((entry) => {
      if (entry.averageDiscoveryScore >= 60 && entry.rarityBand !== 'well-known') counts['hidden-gems'] += 1;
      if (entry.work.languages.length > 0) counts['language-routes'] += 1;
      if (entry.primaryEra !== 'unknown') counts['time-travel'] += 1;
      if (entry.composerWorkCount >= 4) counts['composer-constellations'] += 1;
    });
    return counts;
  }, [enrichedWorks]);

  const spotlightSafeIndex = spotlightIndex < filteredWorks.length ? spotlightIndex : 0;
  const spotlightEntry = filteredWorks[spotlightSafeIndex];
  const spotlight = spotlightEntry?.work;
  const spotlightRecording = spotlight?.mostRecentRecording || spotlight?.recordings[0];

  const nextHops = useMemo(() => {
    if (!spotlightEntry) return [];
    const spotlightSubjects = new Set(spotlightEntry.work.subjects);
    return filteredWorks
      .filter((entry) => entry.work.workTitle !== spotlightEntry.work.workTitle)
      .map((entry) => {
        let score = 0;
        if (entry.work.composer === spotlightEntry.work.composer) score += 2;
        if (entry.primaryEra === spotlightEntry.primaryEra) score += 1;
        if (entry.work.subjects.some((subject) => spotlightSubjects.has(subject))) score += 1;
        score += entry.averageDiscoveryScore / 100;
        return { entry, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ entry }) => entry);
  }, [filteredWorks, spotlightEntry]);

  const jumpToRandom = () => {
    if (filteredWorks.length <= 1) return;

    const weightedPool =
      filters.journey === 'all'
        ? filteredWorks
        : filteredWorks.filter((entry) => entry.averageDiscoveryScore >= 60).slice(0, Math.max(3, filteredWorks.length));
    const pool = weightedPool.length > 0 ? weightedPool : filteredWorks;
    const next = pool[Math.floor(Math.random() * pool.length)];
    const nextIndex = filteredWorks.findIndex((entry) => entry.work.workTitle === next.work.workTitle);
    if (nextIndex >= 0) setSpotlightIndex(nextIndex);
  };

  const resetFilters = () => {
    const reset: DiscoveryFilters = {
      ...initialFilters,
      journey: 'all',
      era: 'all',
      rarityBand: 'all',
      composer: '',
      language: '',
      query: '',
      sortBy: 'discovery'
    };
    setFilters(reset);
    updateUrl(reset);
    setSpotlightIndex(0);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Discovery Sandbox
            </Badge>
            <Badge variant="outline" className="text-xs">
              {filteredWorks.length} works in view
            </Badge>
          </div>
          <CardTitle className="text-2xl">Editorial Journeys Through the Archive</CardTitle>
          <CardDescription>
            Start with curated pathways, then tighten filters to reveal rare corners of the catalog.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {JOURNEY_CARDS.map((journey) => (
          <button
            key={journey.id}
            type="button"
            onClick={() => applyFilters({ journey: journey.id, sortBy: journey.id === 'hidden-gems' ? 'discovery' : filters.sortBy })}
            className={`rounded-lg border p-4 text-left transition-colors ${
              filters.journey === journey.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
            }`}
          >
            <p className="text-sm font-semibold">{journey.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{journey.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">{journeyCounts[journey.id]} works</p>
          </button>
        ))}
      </div>

      {filters.journey === 'language-routes' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Language Route Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {LANGUAGE_ROUTE_OPTIONS.map((language) => (
              <Button
                key={language}
                variant={filters.language === language ? 'default' : 'outline'}
                onClick={() => applyFilters({ language })}
              >
                {language}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Query
              </label>
              <Input
                placeholder="Try Carmen, Puccini, or live recording"
                value={filters.query}
                onChange={(event) => applyFilters({ query: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Composer
              </label>
              <Select value={filters.composer || 'all'} onValueChange={(value) => applyFilters({ composer: value === 'all' ? '' : value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any composer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any composer</SelectItem>
                  {composerOptions.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Language
              </label>
              <Select value={filters.language || 'all'} onValueChange={(value) => applyFilters({ language: value === 'all' ? '' : value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any language</SelectItem>
                  {languageOptions.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Era
              </label>
              <Select value={filters.era} onValueChange={(value) => applyFilters({ era: value as DiscoveryFilters['era'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All eras</SelectItem>
                  <SelectItem value="early">Early</SelectItem>
                  <SelectItem value="golden">Golden</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Rarity
              </label>
              <Select
                value={filters.rarityBand}
                onValueChange={(value) => applyFilters({ rarityBand: value as DiscoveryFilters['rarityBand'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All rarity bands</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="well-known">Well-known</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sort
              </label>
              <Select value={filters.sortBy} onValueChange={(value) => applyFilters({ sortBy: value as DiscoveryFilters['sortBy'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Discovery score</SelectItem>
                  <SelectItem value="recent">Most recent</SelectItem>
                  <SelectItem value="recordings">Most recordings</SelectItem>
                  <SelectItem value="alpha">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button className="flex-1" variant="outline" onClick={jumpToRandom} disabled={filteredWorks.length < 2}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Random Jump
              </Button>
              <Button variant="ghost" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {spotlight && spotlightEntry ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Story Frame</span>
            </div>
            <CardTitle>{spotlightEntry.canonicalTitle}</CardTitle>
            <CardDescription>Why this surfaced and where to go next.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-3">
                {spotlightRecording?.imageUrl ? (
                  <div className="relative h-44 overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={spotlightRecording.imageUrl}
                      alt={spotlightEntry.canonicalTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 220px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex h-44 items-center justify-center rounded-lg border bg-muted">
                    <Disc className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-3 md:col-span-9">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {spotlight.composer || 'Unknown composer'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Disc className="h-3.5 w-3.5" />
                    {spotlight.recordings.length} recordings
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {spotlightEntry.yearMin ? `${spotlightEntry.yearMin} - ${spotlightEntry.yearMax}` : 'Year unknown'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    {spotlight.languages.slice(0, 3).join(', ') || 'Language unknown'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Era: {eraLabel(spotlightEntry.primaryEra)}</Badge>
                  <Badge variant="secondary">Rarity: {spotlightEntry.rarityBand}</Badge>
                  <Badge variant="secondary">Discovery Score: {spotlightEntry.averageDiscoveryScore}</Badge>
                  {spotlightEntry.composerWorkCount >= 4 && <Badge variant="secondary">Composer prominence</Badge>}
                  {spotlight.languages.length >= 2 && <Badge variant="secondary">Language diversity</Badge>}
                </div>
                <div className="space-y-2">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold">
                    <WandSparkles className="h-4 w-4" />
                    Next hops
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nextHops.map((hop) => (
                      <Button
                        key={hop.work.workTitle}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const index = filteredWorks.findIndex((entry) => entry.work.workTitle === hop.work.workTitle);
                          if (index >= 0) setSpotlightIndex(index);
                        }}
                      >
                        {hop.canonicalTitle}
                      </Button>
                    ))}
                    {nextHops.length === 0 && <p className="text-sm text-muted-foreground">No next hops for current filters.</p>}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center py-12 text-center">
            <div>
              <Filter className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-semibold">No works match this view</p>
              <p className="text-sm text-muted-foreground">Adjust the filters or switch journeys to continue exploring.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            <CardTitle>Sandbox Results</CardTitle>
          </div>
          <CardDescription>
            Showing up to 18 works. Open each card to inspect recordings, metadata, and media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredWorks.slice(0, 18).map((entry) => (
            <Card key={entry.work.workTitle}>
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{entry.canonicalTitle}</CardTitle>
                    <CardDescription>{entry.work.composer || 'Unknown composer'}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{entry.work.recordings.length} recordings</Badge>
                    <Badge variant="secondary">Score {entry.averageDiscoveryScore}</Badge>
                  </div>
                </div>
              </CardHeader>
              <ClientWorkGroupGrid work={entry.work} />
            </Card>
          ))}
          {filteredWorks.length > 18 && (
            <p className="text-center text-sm text-muted-foreground">
              {filteredWorks.length - 18} more works match your filters. Narrow the view to inspect more deeply.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
