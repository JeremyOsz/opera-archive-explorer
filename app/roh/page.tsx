import Link from 'next/link';
import { Archive, BarChart3, Compass, Database, ExternalLink, Search, SlidersHorizontal } from 'lucide-react';
import SiteHeader from '@/app/components/SiteHeader';
import { getRohStats, loadRohJsonIndex, searchRohIndex } from '@/app/lib/roh/database';
import { RohEntityType, RohFacetBucket, RohSearchItem } from '@/app/lib/roh/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RohPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function typeValue(value: string): RohEntityType | 'all' {
  return ['record', 'work', 'production', 'performance'].includes(value) ? (value as RohEntityType) : 'all';
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
              <Badge variant="secondary" className="capitalize">
                {item.type}
              </Badge>
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
            ROH source
          </a>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link href={`/api/roh/item/${item.type}/${item.id}`}>Metadata JSON</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default async function RohPage({ searchParams }: RohPageProps) {
  const resolvedParams = (await searchParams) || {};
  const query = single(resolvedParams.q);
  const type = typeValue(single(resolvedParams.type));
  const collection = single(resolvedParams.collection);
  const genre = single(resolvedParams.genre);
  const creator = single(resolvedParams.creator);
  const company = single(resolvedParams.company);
  const index = loadRohJsonIndex();

  if (!index) {
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
              <CardTitle>ROH index not generated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Generate the local JSON index before using this page.</p>
              <pre className="overflow-x-auto rounded-[2px] bg-muted p-4 text-foreground">
                <code>{'pnpm roh:crawl\npnpm roh:index\npnpm roh:validate'}</code>
              </pre>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const stats = getRohStats(index);
  const result = searchRohIndex(index, {
    query,
    type,
    collection,
    genre,
    creator,
    company,
    limit: 50,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        tagline="Search Royal Ballet and Opera Collections records, works, productions, performances, and cast metadata."
        links={[
          { href: '/', label: 'IA Search', icon: Search },
          { href: '/roh', label: 'ROH Index', icon: Database, active: true },
          { href: '/sandbox', label: 'Sandbox', icon: Compass },
          { href: '/explore', label: 'Explore', icon: BarChart3 },
        ]}
        meta={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Archive className="h-4 w-4" />
            <span>
              {stats.records.toLocaleString()} records, {stats.works.toLocaleString()} works,{' '}
              {stats.productions.toLocaleString()} productions, {stats.performances.toLocaleString()} performances
            </span>
          </span>
        }
      />

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside>
            <form className="sticky top-4 space-y-4 rounded-[2px] border bg-card p-4" action="/roh">
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
                <span className="mb-1 block text-muted-foreground">Type</span>
                <select name="type" defaultValue={type} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  <option value="all">All</option>
                  <option value="record">Records</option>
                  <option value="work">Works</option>
                  <option value="production">Productions</option>
                  <option value="performance">Performances</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Collection</span>
                <select name="collection" defaultValue={collection} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  {facetOptions(result.facets.collections, collection)}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Genre</span>
                <select name="genre" defaultValue={genre} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  {facetOptions(result.facets.genres, genre)}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Creator / composer</span>
                <select name="creator" defaultValue={creator} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  {facetOptions(result.facets.creators, creator)}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Company</span>
                <select name="company" defaultValue={company} className="w-full rounded-[2px] border bg-background px-3 py-2">
                  {facetOptions(result.facets.companies, company)}
                </select>
              </label>
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
              <h1 className="font-brand-display text-4xl">ROH Index</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {result.total.toLocaleString()} matching item{result.total === 1 ? '' : 's'}
              </p>
            </div>

            {result.items.length > 0 ? (
              <div className="space-y-4">
                {result.items.map((item) => (
                  <ResultCard key={`${item.type}-${item.id}`} item={item} />
                ))}
              </div>
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
