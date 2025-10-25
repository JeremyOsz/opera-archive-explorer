import { Suspense } from 'react';
import { GroupedWork, getCanonicalWorkTitle } from '@/app/lib/work-grouper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Calendar, 
  User, 
  Globe, 
  ChevronDown,
  ChevronUp,
  Disc
} from 'lucide-react';
import Image from 'next/image';
import { OperaRecording } from '@/app/types/opera';
import ClientWorkGroupGrid from './ClientWorkGroupGrid';

interface ServerWorkGroupGridProps {
  works: GroupedWork[];
  loading?: boolean;
}

// Server Component for displaying work groups
export default function ServerWorkGroupGrid({ works, loading = false }: ServerWorkGroupGridProps) {
  if (loading) {
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

  if (works.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Works Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all available works.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {works.length} {works.length === 1 ? 'Work' : 'Works'} Found
        </h2>
      </div>

      <div className="space-y-4">
        {works.map((work) => {
          const canonicalTitle = getCanonicalWorkTitle(work);
          const featuredRecording = work.mostRecentRecording || work.recordings[0];

          return (
            <Card key={work.workTitle} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start gap-4">
                  {/* Work Image - Server-side rendered */}
                  {featuredRecording?.imageUrl && (
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={featuredRecording.imageUrl}
                        alt={canonicalTitle}
                        fill
                        className="object-cover object-center"
                        sizes="96px"
                        priority={false}
                      />
                    </div>
                  )}

                  {/* Work Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{canonicalTitle}</CardTitle>
                        {work.composer !== 'Unknown' && (
                          <div className="flex items-center gap-1 text-muted-foreground mb-2">
                            <User className="w-3 h-3" />
                            <span className="text-sm">{work.composer}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Work Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Disc className="w-3 h-3" />
                        <span>{work.recordings.length} recording{work.recordings.length !== 1 ? 's' : ''}</span>
                      </div>
                      
                      {work.years.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{work.years.slice(0, 3).join(', ')}{work.years.length > 3 ? '...' : ''}</span>
                        </div>
                      )}
                      
                      {work.languages.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>{work.languages.slice(0, 2).join(', ')}{work.languages.length > 2 ? '...' : ''}</span>
                        </div>
                      )}
                    </div>

                    {/* Subject Tags */}
                    {work.subjects && work.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {work.subjects.slice(0, 3).map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {work.subjects.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{work.subjects.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              {/* Client-side expandable recordings */}
              <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Loading recordings...</div>}>
                <ClientWorkGroupGrid work={work} />
              </Suspense>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
