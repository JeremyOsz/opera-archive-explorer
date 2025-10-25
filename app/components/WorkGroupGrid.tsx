'use client';

import { useState, useMemo } from 'react';
import { GroupedWork, getCanonicalWorkTitle } from '@/app/lib/work-grouper';
import { useOptimizedImages } from '@/app/lib/use-optimized-images';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OperaRecording } from '@/app/types/opera';
import OperaDetail from './OperaDetail';

interface WorkGroupGridProps {
  works: GroupedWork[];
  loading?: boolean;
}

export default function WorkGroupGrid({ works, loading = false }: WorkGroupGridProps) {
  const [expandedWorks, setExpandedWorks] = useState<Set<string>>(new Set());
  const [selectedRecording, setSelectedRecording] = useState<OperaRecording | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Extract all recording identifiers for optimized image loading
  const allIdentifiers = useMemo(() => {
    return works.flatMap(work => work.recordings.map(recording => recording.identifier));
  }, [works]);

  // Use optimized image loading
  const { images, isLoading: imagesLoading } = useOptimizedImages(allIdentifiers);

  const toggleWork = (workTitle: string) => {
    const newExpanded = new Set(expandedWorks);
    if (newExpanded.has(workTitle)) {
      newExpanded.delete(workTitle);
    } else {
      newExpanded.add(workTitle);
    }
    setExpandedWorks(newExpanded);
  };

  const handleRecordingClick = (recording: OperaRecording) => {
    setSelectedRecording(recording);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedRecording(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
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
            Try adjusting your search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {works.length} work{works.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {works.map((work) => {
        const canonicalTitle = getCanonicalWorkTitle(work);
        const isExpanded = expandedWorks.has(work.workTitle);
        const featuredRecording = work.mostRecentRecording || work.recordings[0];

        return (
          <Card key={work.workTitle} className="overflow-hidden">
            <CardHeader className="cursor-pointer" onClick={() => toggleWork(work.workTitle)}>
              <div className="flex items-start gap-4">
                {/* Work Image */}
                {(() => {
                  const optimizedImage = images[featuredRecording?.identifier || ''];
                  const imageUrl = optimizedImage?.imageUrl || featuredRecording?.imageUrl;
                  
                  return imageUrl && (
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={imageUrl}
                        alt={canonicalTitle}
                        fill
                        className="object-cover object-center"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  );
                })()}

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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Work Stats */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="gap-1">
                      <Disc className="w-3 h-3" />
                      {work.totalRecordings} recording{work.totalRecordings !== 1 ? 's' : ''}
                    </Badge>
                    {work.years.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{work.years.slice(0, 3).join(', ')}{work.years.length > 3 ? '...' : ''}</span>
                      </div>
                    )}
                    {work.languages.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{work.languages.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Expanded Recordings List */}
            {isExpanded && (
              <CardContent className="border-t pt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold mb-3">Available Recordings</h4>
                  {work.recordings.map((recording) => (
                    <div
                      key={recording.identifier}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => handleRecordingClick(recording)}
                    >
                      {/* Recording thumbnail */}
                      {(() => {
                        const optimizedImage = images[recording.identifier];
                        const thumbnailUrl = optimizedImage?.thumbnailUrl || recording.thumbnailUrl;
                        
                        return thumbnailUrl && (
                          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                            <Image
                              src={thumbnailUrl}
                              alt={recording.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        );
                      })()}

                      {/* Recording details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                          {recording.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {recording.date && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {extractYear(recording.date)}
                            </span>
                          )}
                          {recording.language && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {recording.language}
                            </span>
                          )}
                          {Array.isArray(recording.subject) && recording.subject.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {recording.subject[0]}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* View button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRecordingClick(recording);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}

      {/* Recording Detail Dialog */}
      {selectedRecording && (
        <OperaDetail
          opera={selectedRecording}
          isOpen={showDetail}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

function extractYear(date: string): string {
  const match = date.match(/\d{4}/);
  return match ? match[0] : '';
}
