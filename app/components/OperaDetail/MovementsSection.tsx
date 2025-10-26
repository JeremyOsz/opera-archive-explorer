import { Music, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MovementsSectionProps } from './types';

export const MovementsSection = ({ 
  opera, 
  isExpanded, 
  onToggle 
}: MovementsSectionProps) => {
  if (!opera.acts || opera.acts.length === 0) return null;
  
  const totalMovements = opera.acts.reduce((total, act) => total + act.sections.length, 0);
  
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Movements & Tracks
            </CardTitle>
            <CardDescription>
              {totalMovements} movement{totalMovements !== 1 ? 's' : ''} across {opera.acts.length} act{opera.acts.length !== 1 ? 's' : ''}
              {opera.metadata?.isMapped && (
                <span className="ml-2 text-green-600">• Actual work structure</span>
              )}
            </CardDescription>
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
        <CardContent>
          <div className="space-y-6">
            {opera.acts.map((act, actIndex) => (
              <div key={actIndex} className="space-y-3">
                {/* Act Header */}
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{act.actNumber}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{act.title}</h3>
                      {act.description && (
                        <p className="text-sm text-muted-foreground">{act.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm ml-11">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span className="text-primary">♫</span>
                      {act.key}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span className="text-primary">♪</span>
                      {act.tempo} BPM
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {act.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {act.tempoMarking}
                    </Badge>
                  </div>
                </div>
                
                {/* Act Sections */}
                <div className="ml-6 space-y-2">
                  {act.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors bg-white/50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-muted-foreground font-medium text-sm">{section.sectionNumber}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <p className="font-medium">{section.title}</p>
                              {section.description && (
                                <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <Badge variant="outline" className="flex items-center gap-1 text-xs">
                              <span className="text-primary">♫</span>
                              {section.key}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1 text-xs">
                              <span className="text-primary">♪</span>
                              {section.tempo} BPM
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1 text-xs">
                              <Clock className="w-3 h-3" />
                              {section.duration}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {section.sectionType}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {section.tempoMarking}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
