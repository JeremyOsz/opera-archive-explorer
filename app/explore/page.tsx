import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Network, Compass, Database, Search } from 'lucide-react';
import Link from 'next/link';
import { loadArchiveCache } from '@/app/lib/cache-loader';
import ComposerBarChart from '@/app/components/ComposerBarChart';
import NetworkGraphTabs from '@/app/components/NetworkGraphTabs';
import SiteHeader from '@/app/components/SiteHeader';

export default function ExplorePage() {
  const cache = loadArchiveCache();
  
  if (!cache) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader
          tagline="Visual insights into the archive collection."
          links={[
            { href: '/', label: 'Search', icon: Search },
            { href: '/roh', label: 'ROH Index', icon: Database },
            { href: '/sandbox', label: 'Sandbox', icon: Compass },
            { href: '/explore', label: 'Explore', icon: BarChart3, active: true },
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

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        tagline="Visual insights into the archive collection."
        links={[
            { href: '/', label: 'Search', icon: Search },
            { href: '/roh', label: 'ROH Index', icon: Database },
            { href: '/sandbox', label: 'Sandbox', icon: Compass },
          { href: '/explore', label: 'Explore', icon: BarChart3, active: true },
        ]}
        meta={
          <span>
            Collection scope: {cache.metadata.totalWorks.toLocaleString()} cached items, generated on{' '}
            {new Date(cache.metadata.generatedAt).toLocaleDateString()}
          </span>
        }
      />

      <div className="container mx-auto px-4 py-10">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">Explore</p>
            <h2 className="font-brand-display text-4xl mb-2">Archive Explorer</h2>
            <p className="text-muted-foreground">
              Visual insights into the opera archive collection
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{cache.metadata.totalWorks.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cache Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {new Date(cache.metadata.generatedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Version
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">{cache.metadata.version}</div>
              </CardContent>
            </Card>
          </div>

          {/* Works by Composer Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Works by Composer</CardTitle>
              <p className="text-sm text-muted-foreground">
                Distribution of works across different composers in the archive
              </p>
              <Link href="/sandbox?journey=composer-constellations" className="text-sm text-primary underline-offset-4 hover:underline">
                Continue exploring in Sandbox
              </Link>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ChartLoadingSkeleton />}>
                <ComposerBarChart works={cache.works} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Network Graph */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                <CardTitle>Network Exploration</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Interactive network visualizations showing connections between recordings. Switch between tabs to explore different connection types.
              </p>
              <Link href="/sandbox?journey=hidden-gems&sortBy=discovery" className="text-sm text-primary underline-offset-4 hover:underline">
                Continue exploring in Sandbox
              </Link>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ChartLoadingSkeleton />}>
                <NetworkGraphTabs works={cache.works} maxNodes={150} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChartLoadingSkeleton() {
  return (
    <div className="w-full h-96 bg-muted/50 rounded-[2px] animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading chart...</p>
    </div>
  );
}
