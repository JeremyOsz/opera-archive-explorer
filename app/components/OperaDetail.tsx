'use client';

import { useState, useEffect } from 'react';
import { OperaRecording } from '@/app/types/opera';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Music, 
  Calendar, 
  User, 
  Globe, 
  Download, 
  Play, 
  ExternalLink,
  Clock,
  FileText,
  Tag,
  Volume2,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Info,
  BookOpen,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { ArchiveAPI } from '@/app/lib/archive-api';
import { EnhancedMusicalMetadataLibrary } from '@/app/lib/musical-metadata-enhanced';
import { getWorkAboutInfo } from '@/app/lib/work-about-data';

interface OperaDetailProps {
  opera: OperaRecording;
  isOpen: boolean;
  onClose: () => void;
}

export default function OperaDetail({ opera, isOpen, onClose }: OperaDetailProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [enhancedOpera, setEnhancedOpera] = useState<OperaRecording>(opera);
  const [musicalDataLoading, setMusicalDataLoading] = useState(false);
  const [workMetadata, setWorkMetadata] = useState<any>(null);
  const [audioFilesExpanded, setAudioFilesExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [musicalInfoExpanded, setMusicalInfoExpanded] = useState(false);

  useEffect(() => {
    if (isOpen && opera.identifier) {
      setLoading(true);
      setMusicalDataLoading(true);
      
      // Load files
      ArchiveAPI.getOperaFiles(opera.identifier)
        .then(files => {
          console.log('Files fetched for', opera.identifier, ':', files);
          setFiles(files);
        })
        .catch(console.error)
        .finally(() => setLoading(false));

      // Try to get enhanced musical metadata (uses mapped data if available)
      const enhanced = EnhancedMusicalMetadataLibrary.getMusicalMetadata(opera.identifier);
      if (enhanced) {
        console.log('Enhanced metadata:', enhanced);
        setWorkMetadata(enhanced);
        
        // Enhance the opera with this metadata
        setEnhancedOpera({
          ...opera,
          musicalKey: enhanced.musicalMetadata.overallKey,
          tempo: enhanced.musicalMetadata.overallTempo,
          duration: enhanced.musicalMetadata.duration,
          genre: enhanced.musicalMetadata.genre,
          instrumentation: enhanced.musicalMetadata.instrumentation,
          mood: enhanced.musicalMetadata.mood,
          movements: enhanced.musicalMetadata.acts.flatMap(act => 
            act.sections.map(section => ({
              title: `${act.title} - ${section.title}`,
              duration: section.duration,
              musicalKey: section.key,
              tempo: section.tempo,
              trackNumber: section.sectionNumber,
              description: section.description
            }))
          ),
          metadata: {
            isMapped: enhanced.musicalMetadata.isMapped,
            source: enhanced.musicalMetadata.source,
            musicalAnalysis: enhanced.musicalMetadata.musicalAnalysis
          }
        });
      } else {
        // Fallback to original enhancement
        ArchiveAPI.enhanceWithMusicDatabases(opera)
          .then(enhanced => {
            console.log('Enhanced opera data:', enhanced);
            setEnhancedOpera(enhanced);
          })
          .catch(console.error);
      }
      
      setMusicalDataLoading(false);
    }
  }, [isOpen, opera.identifier, opera]);

  const audioFiles = Array.isArray(files) ? files.filter(file => {
    const format = file.format?.toLowerCase() || '';
    const name = file.name?.toLowerCase() || '';
    const isAudio = format.includes('mp3') || 
           format.includes('flac') || 
           format.includes('ogg') || 
           format.includes('wav') ||
           format.includes('aac') ||
           format.includes('m4a') ||
           name.includes('.mp3') ||
           name.includes('.flac') ||
           name.includes('.ogg') ||
           name.includes('.wav') ||
           name.includes('.m4a');
    
    if (isAudio) {
      console.log('Audio file found:', file.name, 'format:', file.format);
    }
    return isAudio;
  }) : [];

  console.log('Total files:', files.length, 'Audio files:', audioFiles.length);

  const formatFileSize = (size: string) => {
    const bytes = parseInt(size);
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const formatDuration = (length: string) => {
    const seconds = parseInt(length);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] sm:max-w-[90vw] max-h-[98vh] w-[95vw] h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{opera.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Opera Image and Basic Info - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Opera Image */}
            <Card className="lg:col-span-4">
              <CardContent className="p-8">
                <div className="relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-lg bg-muted">
                  {opera.imageUrl ? (
                    <Image
                      src={opera.imageUrl}
                      alt={opera.title}
                      fill
                      className="object-cover object-center"
                      onError={(e) => {
                        // Show placeholder on error
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"
                    style={{ display: opera.imageUrl ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <Music className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">No Image Available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="lg:col-span-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Opera Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opera.creator && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Creator</p>
                      <p className="text-sm text-muted-foreground">{opera.creator}</p>
                    </div>
                  </div>
                )}
                
                {opera.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{opera.date}</p>
                    </div>
                  </div>
                )}
                
                {opera.language && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">{opera.language}</p>
                    </div>
                  </div>
                )}
                
                {opera.publicdate && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Published</p>
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          try {
                            return new Date(opera.publicdate).toLocaleDateString();
                          } catch {
                            return opera.publicdate;
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {opera.description && (
                <div>
                  <p className="text-sm font-medium mb-2">Description</p>
                  <div className="text-sm text-muted-foreground leading-relaxed max-h-32 overflow-y-auto">
                    {opera.description}
                  </div>
                </div>
              )}

              {Array.isArray(opera.subject) && opera.subject.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {opera.subject.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            </Card>
          </div>

                    {/* About the Work - Collapsible */}
                    {(() => {
            const workTitle = enhancedOpera.title;
            const aboutInfo = getWorkAboutInfo(workTitle);
            
            if (!aboutInfo) return null;
            
            return (
              <Card>
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setAboutExpanded(!aboutExpanded)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      <CardTitle>About the Work</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      {aboutExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {aboutExpanded && (
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
                  </CardContent>
                )}
              </Card>
            );
          })()}

          {/* Musical Information - Collapsible */}
          {(musicalDataLoading || enhancedOpera.musicalKey || enhancedOpera.tempo || enhancedOpera.duration || enhancedOpera.genre?.length || enhancedOpera.instrumentation?.length || enhancedOpera.metadata?.fallback) && (
            <Card>
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setMusicalInfoExpanded(!musicalInfoExpanded)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Musical Information
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {enhancedOpera.metadata?.isMapped && (
                      <Badge variant="default" className="bg-green-600">
                        ✓ Mapped Metadata
                      </Badge>
                    )}
                    {enhancedOpera.metadata?.source === 'generated' && (
                      <Badge variant="secondary">
                        Generated
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      {musicalInfoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {musicalInfoExpanded && (
                <CardContent className="space-y-4">
                {musicalDataLoading ? (
                  <div className="space-y-3">
                    <div className="h-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-16 bg-muted rounded animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {enhancedOpera.musicalKey && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">♫</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Key</p>
                            <p className="text-sm text-muted-foreground">{enhancedOpera.musicalKey}</p>
                          </div>
                        </div>
                      )}
                      
                      {enhancedOpera.tempo && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">♪</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Tempo</p>
                            <p className="text-sm text-muted-foreground">{enhancedOpera.tempo} BPM</p>
                          </div>
                        </div>
                      )}
                      
                      {enhancedOpera.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">{enhancedOpera.duration}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {enhancedOpera.genre && enhancedOpera.genre.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Genre</p>
                        <div className="flex flex-wrap gap-2">
                          {enhancedOpera.genre.map((genre, index) => (
                            <Badge key={index} variant="outline">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {enhancedOpera.instrumentation && enhancedOpera.instrumentation.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Instrumentation</p>
                        <div className="flex flex-wrap gap-2">
                          {enhancedOpera.instrumentation.map((instrument, index) => (
                            <Badge key={index} variant="secondary">
                              {instrument}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {enhancedOpera.mood && enhancedOpera.mood.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Mood & Character</p>
                        <div className="flex flex-wrap gap-2">
                          {enhancedOpera.mood.map((mood, index) => (
                            <Badge key={index} variant="outline" className="text-primary">
                              {mood}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Musical Analysis for mapped works */}
                    {enhancedOpera.metadata?.musicalAnalysis && (
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm font-medium mb-3">Musical Analysis</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Harmonic Complexity</p>
                            <Badge variant="outline" className="capitalize">
                              {enhancedOpera.metadata.musicalAnalysis.harmonicComplexity}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Melodic Style</p>
                            <Badge variant="outline" className="capitalize">
                              {enhancedOpera.metadata.musicalAnalysis.melodicStyle}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Time Signature</p>
                            <Badge variant="outline">
                              {enhancedOpera.metadata.musicalAnalysis.timeSignature}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Data source information */}
                    {(enhancedOpera.metadata?.mockData || enhancedOpera.metadata?.fallback) && (
                      <div className="text-xs text-muted-foreground border-t pt-2">
                        {enhancedOpera.metadata?.mockData && (
                          <p>🎵 Musical data generated based on opera characteristics</p>
                        )}
                        {enhancedOpera.metadata?.fallback && (
                          <p>Using fallback musical data</p>
                        )}
                      </div>
                    )}
                  </>
                )}
                </CardContent>
              )}
            </Card>
          )}



          {/* Movements */}
          {enhancedOpera.movements && enhancedOpera.movements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Movements & Tracks
                </CardTitle>
                <CardDescription>
                  {enhancedOpera.movements.length} movement{enhancedOpera.movements.length !== 1 ? 's' : ''} available
                  {enhancedOpera.metadata?.isMapped && (
                    <span className="ml-2 text-green-600">• Actual work structure</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {enhancedOpera.movements.map((movement, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">{movement.trackNumber || index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <p className="font-medium text-lg">{movement.title}</p>
                              {movement.description && (
                                <p className="text-sm text-muted-foreground mt-1">{movement.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            {movement.musicalKey && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <span className="text-primary">♫</span>
                                {movement.musicalKey}
                              </Badge>
                            )}
                            {movement.tempo && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <span className="text-primary">♪</span>
                                {movement.tempo} BPM
                              </Badge>
                            )}
                            {movement.duration && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {movement.duration}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

            {/* Audio Files - Collapsible */}
            <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setAudioFilesExpanded(!audioFilesExpanded)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  <CardTitle>Available Audio Files</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  {audioFilesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
              <CardDescription>
                {loading ? 'Loading files...' : `${audioFiles.length} audio file${audioFiles.length !== 1 ? 's' : ''} available`}
              </CardDescription>
            </CardHeader>
            {audioFilesExpanded && (
              <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              ) : audioFiles.length > 0 ? (
                <div className="space-y-3">
                  {audioFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{file.format}</span>
                            <span>{formatFileSize(file.size)}</span>
                            {file.length && (
                              <span>{formatDuration(file.length)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const url = ArchiveAPI.getStreamUrl(opera.identifier, file.name);
                            window.open(url, '_blank');
                          }}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Play
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const url = ArchiveAPI.getDownloadUrl(opera.identifier, file.name);
                            window.open(url, '_blank');
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No audio files detected for this recording.
                  </p>
                  {files.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <p>Found {files.length} files total. Available formats:</p>
                      <div className="mt-2 flex flex-wrap gap-1 justify-center">
                        {Array.from(new Set(files.map(f => f.format).filter(Boolean))).slice(0, 10).map((format, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              </CardContent>
            )}
          </Card>

          {/* Archive Link */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setAudioFilesExpanded(true)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">View on Internet Archive</CardTitle>
                  <CardDescription className="mt-1">
                    Access the full recording details and additional metadata
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://archive.org/details/${opera.identifier}`, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Archive
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
