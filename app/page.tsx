import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music, Archive, BarChart3, Compass } from 'lucide-react';
import Link from 'next/link';
import SearchInterface from '@/app/components/SearchInterface';
import { Button } from '@/components/ui/button';

// Server Component - runs on the server
export default function Home() {
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
                href="/explore"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Explore</span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Archive className="w-4 h-4" />
            <span>
              Powered by{' '}
              <a 
                href="https://archive.org/details/vinyl_frank-defreytas-memoria-opera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Internet Archive - Frank DeFreytas Memoria Opera Collection
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Card className="border-primary/20 bg-gradient-to-r from-background via-background to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Archive Discovery Sandbox</CardTitle>
              <CardDescription>
                Explore by pattern: language clusters, rare singletons, early-era recordings, and random jumps across works.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href="/sandbox" className="inline-flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Open Discovery Sandbox
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
        <h2 className="text-2xl font-semibold mb-2">Loading Opera Archive Explorer</h2>
        <p className="text-muted-foreground">Preparing your search experience...</p>
      </CardContent>
    </Card>
  );
}
