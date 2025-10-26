import { 
  ChevronDown,
  ChevronUp,
  Info,
  FileText,
  BookOpen,
  Lightbulb,
  Sparkles,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getWorkAboutInfo } from '@/app/lib/work-about-data';
import { AboutWorkProps } from './types';

export const AboutWork = ({ opera, isExpanded, onToggle }: AboutWorkProps) => {
  const aboutInfo = getWorkAboutInfo(opera.title);
  
  if (!aboutInfo) return null;
  
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            <CardTitle>About the Work</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <h4 className="font-semibold">Description</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aboutInfo.description}
            </p>
          </div>

          {/* History */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <h4 className="font-semibold">History & Premiere</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aboutInfo.history}
            </p>
          </div>

          {/* Themes */}
          {aboutInfo.themes && aboutInfo.themes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Themes</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutInfo.themes.map((theme, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Trivia */}
          {aboutInfo.trivia && aboutInfo.trivia.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Interesting Facts</h4>
              </div>
              <ul className="space-y-2">
                {aboutInfo.trivia.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{fact}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notable Performances */}
          {aboutInfo.notablePerformances && aboutInfo.notablePerformances.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Notable Performances</h4>
              </div>
              <div className="space-y-4">
                {aboutInfo.notablePerformances.map((performance, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{performance.year}</span>
                        {performance.venue && (
                          <span className="text-xs text-muted-foreground">• {performance.venue}</span>
                        )}
                      </div>
                      {performance.recordingLabel && (
                        <Badge variant="secondary" className="text-xs">
                          {performance.recordingLabel}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">{performance.significance}</p>
                      
                      {performance.historicalContext && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {performance.historicalContext}
                        </p>
                      )}
                      
                      {(performance.conductor || performance.orchestra) && (
                        <div className="text-xs text-muted-foreground">
                          {performance.conductor && (
                            <span>Conductor: {performance.conductor}</span>
                          )}
                          {performance.conductor && performance.orchestra && <span> • </span>}
                          {performance.orchestra && (
                            <span>Orchestra: {performance.orchestra}</span>
                          )}
                        </div>
                      )}
                      
                      {performance.singers && performance.singers.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Cast: </span>
                          {performance.singers.map((singer, singerIndex) => (
                            <span key={singerIndex}>
                              {singer.name} ({singer.role})
                              {singerIndex < performance.singers!.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {performance.notes && (
                        <p className="text-xs text-muted-foreground italic">
                          {performance.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
