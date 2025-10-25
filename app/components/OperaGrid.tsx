'use client';

import { useState } from 'react';
import { OperaRecording } from '@/app/types/opera';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Calendar, User, Globe, Download, Play, Eye } from 'lucide-react';

interface OperaGridProps {
  operas: OperaRecording[];
  loading?: boolean;
  onOperaClick: (opera: OperaRecording) => void;
}

export default function OperaGrid({ operas, loading = false, onOperaClick }: OperaGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (operas.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Opera Recordings Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all available recordings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {operas.length} recording{operas.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Opera Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {operas.map((opera) => (
          <Card 
            key={opera.identifier} 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onOperaClick(opera)}
          >
            <CardHeader className={viewMode === 'list' ? 'pb-3' : ''}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {opera.title}
                  </CardTitle>
                  {opera.creator && (
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <User className="w-3 h-3" />
                      {opera.creator}
                    </CardDescription>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOperaClick(opera);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className={viewMode === 'list' ? 'pt-0' : ''}>
              <div className="space-y-3">
                {/* Metadata */}
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {opera.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {opera.date}
                    </div>
                  )}
                  {opera.language && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {opera.language}
                    </div>
                  )}
                </div>

                {/* Description */}
                {opera.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {opera.description}
                  </p>
                )}

                {/* Tags */}
                {Array.isArray(opera.subject) && opera.subject.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {opera.subject.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {opera.subject.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{opera.subject.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Format badges */}
                {Array.isArray(opera.format) && opera.format.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {opera.format.slice(0, 2).map((format, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle play action
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download action
                    }}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
