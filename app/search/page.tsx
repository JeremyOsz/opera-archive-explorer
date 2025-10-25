import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';
import ServerWorkGroupGrid from '@/app/components/ServerWorkGroupGrid';
import { loadArchiveCache, searchCachedWorks } from '@/app/lib/cache-loader';
import { groupRecordingsByWork } from '@/app/lib/work-grouper';

interface SearchPageProps {
  searchParams: {
    q?: string;
    creator?: string;
    date?: string;
    language?: string;
  };
}

// Server Component that handles search on the server
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, creator, date, language } = searchParams;
  
  // If no search query, show welcome message
  if (!query) {
    return (
      <div className="space-y-8">
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Search Opera Archive</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use the search bar above to find opera recordings. Try searching for works like "Madama Butterfly" or composers like "Puccini".
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Server-side search using cached data
  const cache = loadArchiveCache();
  if (!cache) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Search Unavailable</h3>
          <p className="text-muted-foreground">
            The search cache is not available. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Perform server-side search
  const searchResults = searchCachedWorks(query, {
    creator: creator || undefined,
    date: date || undefined,
    language: language || undefined
  });

  // Convert to OperaRecording format (server-side processing)
  const convertedResults = searchResults.map((work) => ({
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
  }));

  // Group recordings by work (server-side)
  const groupedWorks = groupRecordingsByWork(convertedResults);

  return (
    <div className="space-y-6">
      {/* Search Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {groupedWorks.length} {groupedWorks.length === 1 ? 'Work' : 'Works'} Found
          </h2>
          <p className="text-muted-foreground">
            Results for "{query}"
            {creator && ` by ${creator}`}
            {date && ` from ${date}`}
            {language && ` in ${language}`}
          </p>
        </div>
      </div>

      {/* Server-rendered search results */}
      <Suspense fallback={<SearchResultsSkeleton />}>
        <ServerWorkGroupGrid works={groupedWorks} />
      </Suspense>
    </div>
  );
}

// Loading skeleton for search results
function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-muted rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
