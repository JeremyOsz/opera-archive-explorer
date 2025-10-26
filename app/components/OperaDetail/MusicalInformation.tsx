import { Music, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MusicalInformationProps } from './types';

export const MusicalInformation = ({ 
  opera, 
  isLoading, 
  isExpanded, 
  onToggle 
}: MusicalInformationProps) => {
  const hasMusicalData = opera.musicalKey || opera.tempo || opera.duration || 
                        opera.genre?.length || opera.instrumentation?.length || 
                        opera.metadata?.fallback;
  
  if (!hasMusicalData && !isLoading) return null;
  
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Musical Information
          </CardTitle>
          <div className="flex items-center gap-2">
            {opera.metadata?.isMapped && (
              <Badge variant="default" className="bg-green-600">
                ✓ Mapped Metadata
              </Badge>
            )}
            {opera.metadata?.source === 'generated' && (
              <Badge variant="secondary">
                Generated
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-16 bg-muted rounded animate-pulse"></div>
              <div className="h-16 bg-muted rounded animate-pulse"></div>
              <div className="h-16 bg-muted rounded animate-pulse"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {opera.musicalKey && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">♫</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Key</p>
                      <p className="text-sm text-muted-foreground">{opera.musicalKey}</p>
                    </div>
                  </div>
                )}
                
                {opera.tempo && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">♪</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tempo</p>
                      <p className="text-sm text-muted-foreground">{opera.tempo} BPM</p>
                    </div>
                  </div>
                )}
                
                {opera.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{opera.duration}</p>
                    </div>
                  </div>
                )}
              </div>

              {opera.genre && opera.genre.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Genre</p>
                  <div className="flex flex-wrap gap-2">
                    {opera.genre.map((genre, index) => (
                      <Badge key={index} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {opera.instrumentation && opera.instrumentation.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Instrumentation</p>
                  <div className="flex flex-wrap gap-2">
                    {opera.instrumentation.map((instrument, index) => (
                      <Badge key={index} variant="secondary">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {opera.mood && opera.mood.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Mood & Character</p>
                  <div className="flex flex-wrap gap-2">
                    {opera.mood.map((mood, index) => (
                      <Badge key={index} variant="outline" className="text-primary">
                        {mood}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Musical Analysis for mapped works */}
              {opera.metadata?.musicalAnalysis && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium mb-3">Musical Analysis</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Harmonic Complexity</p>
                      <Badge variant="outline" className="capitalize">
                        {opera.metadata.musicalAnalysis.harmonicComplexity}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Melodic Style</p>
                      <Badge variant="outline" className="capitalize">
                        {opera.metadata.musicalAnalysis.melodicStyle}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Time Signature</p>
                      <Badge variant="outline">
                        {opera.metadata.musicalAnalysis.timeSignature}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Data source information */}
              {(opera.metadata?.mockData || opera.metadata?.fallback) && (
                <div className="text-xs text-muted-foreground border-t pt-2">
                  {opera.metadata?.mockData && (
                    <p>🎵 Musical data generated based on opera characteristics</p>
                  )}
                  {opera.metadata?.fallback && (
                    <p>Using fallback musical data</p>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};
