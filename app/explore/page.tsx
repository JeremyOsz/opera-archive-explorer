import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Music, Home, Network, Compass } from 'lucide-react';
import Link from 'next/link';
import { loadArchiveCache } from '@/app/lib/cache-loader';
import ComposerBarChart from '@/app/components/ComposerBarChart';
import NetworkGraphTabs from '@/app/components/NetworkGraphTabs';

export default function ExplorePage() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                  Discover and explore opera recordings from the Internet Archive
                </p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link 
                href="/sandbox"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Sandbox</span>
              </Link>
              <Link 
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Archive Explorer</h2>
                <p className="text-muted-foreground">
                  Visual insights into the opera archive collection
                </p>
              </div>
            </div>
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
              <Link href="/sandbox?journey=composer-constellations" className="text-sm text-primary hover:underline">
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
              <Link href="/sandbox?journey=hidden-gems&sortBy=discovery" className="text-sm text-primary hover:underline">
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
    <div className="w-full h-96 bg-muted/50 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading chart...</p>
    </div>
  );
}
