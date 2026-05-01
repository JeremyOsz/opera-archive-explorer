import Link from 'next/link';
import { Archive, BarChart3, Compass, Database, ExternalLink, Search, SlidersHorizontal } from 'lucide-react';
import SiteHeader from '@/app/components/SiteHeader';
import { getCombinedRohSummary, hasRohSearchCorpus, loadRohJsonIndex, searchCombinedRoh } from '@/app/lib/roh/database';
import { RohDataSources, RohEntityType, RohFacetBucket, RohSearchItem } from '@/app/lib/roh/types';

const ROH_KIND_TYPES: RohEntityType[] = [
  'record',
  'work',
  'production',
  'performance',
  'asset',
  'rbo_web',
  'rbo_stream',
];
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RohPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

type GroupByMode = 'none' | 'collection_asset';

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function typeValue(value: string): RohEntityType | 'all' {
  return ROH_KIND_TYPES.includes(value as RohEntityType) ? (value as RohEntityType) : 'all';
}

function typeLabel(type: RohSearchItem['type']): string {
  switch (type) {
    case 'asset':
      return 'library asset';
    case 'rbo_web':
      return 'web content';
    case 'rbo_stream':
      return 'stream';
    default:
      return type;
  }
}

function outboundLinkLabel(item: RohSearchItem): string {
  if (item.type === 'asset') return 'Open in library';
  if (item.type === 'rbo_web' || item.type === 'rbo_stream') return 'Open on RBO site';
  return 'Collections record';
}

function facetOptions(facets: RohFacetBucket[], selected: string) {
  return (
    <>
      <option value="">Any</option>
      {facets.map((facet) => (
        <option key={facet.value} value={facet.value}>
          {facet.value} ({facet.count})
        </option>
      ))}
      {selected && !facets.some((facet) => facet.value === selected) ? <option value={selected}>{selected}</option> : null}
    </>
  );
}

function groupByValue(value: string): GroupByMode {
  return value === 'collection_asset' ? 'collection_asset' : 'none';
}

function hrefWithFilters(base: Record<string, string>, updates: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  const merged: Record<string, string | undefined> = { ...base, ...updates };

  for (const [key, value] of Object.entries(merged)) {
    if (value && value.trim().length > 0) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `/roh?${query}` : '/roh';
}

function compactFacetList(facets: RohFacetBucket[], selected: string, max = 12): RohFacetBucket[] {
  if (!selected) return facets.slice(0, max);
  if (facets.some((facet) => facet.value === selected)) return facets.slice(0, max);
  const selectedBucket: RohFacetBucket = { value: selected, count: 0 };
  return [selectedBucket, ...facets.slice(0, Math.max(0, max - 1))];
}

function TagFacetFilter({
  label,
  paramName,
  facets,
  selected,
  baseFilters,
}: {
  label: string;
  paramName: 'collection' | 'genre' | 'creator' | 'company';
  facets: RohFacetBucket[];
  selected: string;
  baseFilters: Record<string, string>;
}) {
  const visibleFacets = compactFacetList(facets, selected);

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2 min-w-0">
        <Button
          asChild
          size="sm"
          variant={selected ? 'outline' : 'default'}
          className="h-auto max-w-full min-w-0 shrink whitespace-normal break-words text-left"
        >
          <Link href={hrefWithFilters(baseFilters, { [paramName]: '' })}>Any</Link>
        </Button>
        {visibleFacets.map((facet) => {
          const isActive = facet.value === selected;
          return (
            <Button
              key={facet.value}
              asChild
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              className="h-auto max-w-full min-w-0 shrink whitespace-normal break-words text-left"
            >
              <Link href={hrefWithFilters(baseFilters, { [paramName]: isActive ? '' : facet.value })}>
                {facet.value} ({facet.count})
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ item }: { item: RohSearchItem }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt=""
              className="h-20 w-20 flex-shrink-0 rounded-[2px] bg-muted object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{typeLabel(item.type)}</Badge>
              <span className="text-[0.7rem] text-muted-foreground">{item.source}</span>
              {item.date ? <span className="text-sm text-muted-foreground">{item.date}</span> : null}
            </div>
            <CardTitle className="text-xl leading-snug">{item.title}</CardTitle>
            {item.subtitle ? <p className="mt-2 text-sm text-muted-foreground">{item.subtitle}</p> : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <Button asChild size="sm" variant="outline">
          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            {outboundLinkLabel(item)}
          </a>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link href={`/api/roh/item/${item.type}/${encodeURIComponent(item.id)}`}>Metadata JSON</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default async function RohPage({ searchParams }: RohPageProps) {
  const resolvedParams = (await searchParams) || {};
  const query = single(resolvedParams.q);
  const type = typeValue(single(resolvedParams.type));
  const catalogueSource = single(resolvedParams.source);
  const collection = single(resolvedParams.collection);
  const genre = single(resolvedParams.genre);
  const creator = single(resolvedParams.creator);
  const company = single(resolvedParams.company);
  const groupBy = groupByValue(single(resolvedParams.groupBy));
  const index = loadRohJsonIndex();
  const baseFilters: Record<string, string> = {
    q: query,
    type,
    source: catalogueSource,
    collection,
    genre,
    creator,
    company,
    groupBy,
  };

  if (!hasRohSearchCorpus(index)) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader
          tagline="Search Royal Ballet and Opera Collections metadata."
          links={[
            { href: '/', label: 'IA Search', icon: Search },
            { href: '/roh', label: 'ROH Index', icon: Database, active: true },
            { href: '/sandbox', label: 'Sandbox', icon: Compass },
            { href: '/explore', label: 'Explore', icon: BarChart3 },
          ]}
        />
        <main className="container mx-auto px-4 py-10">
          <Card>
            <CardHeader>
              <CardTitle>ROH search data not found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                This page merges the Royal Ballet &amp; Opera Collections index with the ROH digital library snapshot. Provide
                at least one dataset below.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Collections catalogue (records, works, performances)</p>
                <pre className="overflow-x-auto rounded-[2px] bg-muted p-4 text-foreground">
                  <code>{'pnpm roh:crawl\npnpm roh:index\npnpm roh:validate'}</code>
                </pre>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Digital library collections (library.roh.org.uk snapshot)</p>
                <pre className="overflow-x-auto rounded-[2px] bg-muted p-4 text-foreground">
                  <code>pnpm roh:asset-store</code>
                </pre>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">RBO public web + stream catalogue (rbo.org.uk)</p>
                <pre className="overflow-x-auto rounded-[2px] bg-muted p-4 text-foreground">
                  <code>pnpm rbo:fetch</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const stats = getCombinedRohSummary(index);
  const result = searchCombinedRoh(index, {
    query,
    type,
    source: catalogueSource || undefined,
    collection,
    genre,
    creator,
    company,
    limit: 50,
  });
  const grouped = groupBy === 'collection_asset';
  const collectionItems = grouped ? result.items.filter((item) => item.source === RohDataSources.collections) : [];
  const assetItems = grouped ? result.items.filter((item) => item.source === RohDataSources.assetLibrary) : [];
  const otherItems = grouped
    ? result.items.filter((item) => item.source !== RohDataSources.collections && item.source !== RohDataSources.assetLibrary)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        tagline="Search RBO Collections, Asset Library, public web catalogue, Stream, plus ROH archived catalogue."
        links={[
          { href: '/', label: 'IA Search', icon: Search },
          { href: '/roh', label: 'ROH Index', icon: Database, active: true },
          { href: '/sandbox', label: 'Sandbox', icon: Compass },
          { href: '/explore', label: 'Explore', icon: BarChart3 },
        ]}
        meta={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Archive className="h-4 w-4" />
            <span className="text-balance">
              <span title="Archived catalogue">{stats.records + stats.works + stats.productions + stats.performances} collections entities</span>
              {' · '}
              <span title="Digital library snapshots">{stats.assetLibraryAssets} asset rows</span>
              {' · '}
              <span title="Site events API">{stats.webContentItems} web catalogue</span>
              {' · '}
              <span title="Digital programmes + videos">{stats.streamItems} stream</span>
            </span>
          </span>
        }
      />

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-4">
            <form className="space-y-4 rounded-[2px] border bg-card p-4" action="/roh">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal className="h-4 w-4" />
                Search and filters
              </div>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Query</span>
                <input
                  name="q"
                  defaultValue={query}
                  className="w-full rounded-[2px] border bg-background px-3 py-2"
                  placeholder="Title, person, object number"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Source</span>
                <select name="source" defaultValue={catalogueSource} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  {facetOptions(result.facets.sources ?? [], catalogueSource)}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Type</span>
                <select name="type" defaultValue={type} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  <option value="all">All</option>
                  <option value="record">Records</option>
                  <option value="work">Works</option>
                  <option value="production">Productions</option>
                  <option value="performance">Performances</option>
                  <option value="asset">Library assets</option>
                  <option value="rbo_web">RBO web (events)</option>
                  <option value="rbo_stream">RBO Stream (videos)</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Group results</span>
                <select name="groupBy" defaultValue={groupBy} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  <option value="none">No grouping</option>
                  <option value="collection_asset">Collection vs asset</option>
                </select>
              </label>
              <input type="hidden" name="collection" value={collection} />
              <input type="hidden" name="genre" value={genre} />
              <input type="hidden" name="creator" value={creator} />
              <input type="hidden" name="company" value={company} />
              <TagFacetFilter
                label="Collection"
                paramName="collection"
                facets={result.facets.collections}
                selected={collection}
                baseFilters={baseFilters}
              />
              <TagFacetFilter
                label="Genre"
                paramName="genre"
                facets={result.facets.genres}
                selected={genre}
                baseFilters={baseFilters}
              />
              <TagFacetFilter
                label="Creator / composer"
                paramName="creator"
                facets={result.facets.creators}
                selected={creator}
                baseFilters={baseFilters}
              />
              <TagFacetFilter
                label="Company"
                paramName="company"
                facets={result.facets.companies}
                selected={company}
                baseFilters={baseFilters}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Search
                </Button>
                <Button asChild variant="outline">
                  <Link href="/roh">Reset</Link>
                </Button>
              </div>
            </form>
          </aside>

          <section className="space-y-4">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Royal Ballet and Opera Collections
              </p>
              <h1 className="font-brand-display text-4xl">ROH catalogue &amp; library</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {result.total.toLocaleString()} matching item{result.total === 1 ? '' : 's'}
              </p>
            </div>

            {result.items.length > 0 ? (
              grouped ? (
                <div className="space-y-8">
                  {collectionItems.length > 0 ? (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Collections ({collectionItems.length})</h2>
                      <div className="space-y-4">
                        {collectionItems.map((item) => (
                          <ResultCard key={`${item.type}-${item.id}`} item={item} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {assetItems.length > 0 ? (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Assets ({assetItems.length})</h2>
                      <div className="space-y-4">
                        {assetItems.map((item) => (
                          <ResultCard key={`${item.type}-${item.id}`} item={item} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {otherItems.length > 0 ? (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Other sources ({otherItems.length})</h2>
                      <div className="space-y-4">
                        {otherItems.map((item) => (
                          <ResultCard key={`${item.type}-${item.id}`} item={item} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-4">
                  {result.items.map((item) => (
                    <ResultCard key={`${item.type}-${item.id}`} item={item} />
                  ))}
                </div>
              )
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">No ROH items matched the current filters.</CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
