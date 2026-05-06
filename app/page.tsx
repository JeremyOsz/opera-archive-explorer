import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, Archive, BarChart3, Compass, Database, Search } from 'lucide-react';
import Link from 'next/link';
import SearchInterface from '@/app/components/SearchInterface';
import { Button } from '@/components/ui/button';
import SiteHeader from '@/app/components/SiteHeader';

// Server Component - runs on the server
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        tagline="Discover and explore opera recordings from the Internet Archive."
        links={[
          { href: '/', label: 'Search', icon: Search, active: true },
          { href: '/roh', label: 'ROH Index', icon: Database },
          { href: '/sandbox', label: 'Sandbox', icon: Compass },
          { href: '/explore', label: 'Explore', icon: BarChart3 },
        ]}
        meta={
          <span className="inline-flex flex-wrap items-center gap-2">
            <Archive className="h-4 w-4" />
            <span>
              Powered by{' '}
              <a
                href="https://archive.org/details/vinyl_frank-defreytas-memoria-opera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Internet Archive - Frank DeFreytas Memoria Opera Collection
              </a>
            </span>
          </span>
        }
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="space-y-8">
          <Card className="border-foreground/20 bg-card">
            <CardHeader className="gap-3">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Discovery Sandbox
              </p>
              <CardTitle className="font-brand-display text-3xl leading-tight sm:text-4xl">
                Editorial Journeys Through Opera History
              </CardTitle>
              <CardDescription>
                Explore by pattern: language clusters, rare singletons, early-era recordings, and random jumps across works.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href="/sandbox" className="inline-flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Open Sandbox
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Search Interface with Server-Side Data */}
          <Suspense fallback={<SearchLoadingSkeleton />}>
            <SearchInterface />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// Loading skeleton for search interface
function SearchLoadingSkeleton() {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Music className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-brand-display text-3xl mb-2">Loading Opera Archive Explorer</h2>
        <p className="text-muted-foreground">Preparing your search experience...</p>
      </CardContent>
    </Card>
  );
}
