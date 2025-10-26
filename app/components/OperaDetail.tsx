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
  Sparkles,
  Users
} from 'lucide-react';
import Image from 'next/image';
import { ArchiveAPI } from '@/app/lib/archive-api';
import { EnhancedMusicalMetadataLibrary } from '@/app/lib/musical-metadata-enhanced';
import { getWorkAboutInfo } from '@/app/lib/work-about-data';
import AudioPlayer, { AudioPlayerControls } from './AudioPlayer';

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
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [musicalInfoExpanded, setMusicalInfoExpanded] = useState(true);
  const [movementsExpanded, setMovementsExpanded] = useState(true);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && opera.identifier) {
      setLoading(true);
      setMusicalDataLoading(true);
      
      // Load files using server-side API
      fetch(`/api/archive-files?id=${opera.identifier}`)
        .then(response => response.json())
        .then(data => {
          console.log('Files fetched for', opera.identifier, ':', data.files);
          setFiles(data.files || []);
        })
        .catch(console.error)
        .finally(() => setLoading(false));

      // Try to get enhanced musical metadata (uses mapped data if available)
      const enhanced = EnhancedMusicalMetadataLibrary.getMusicalMetadata(opera.identifier);
      if (enhanced) {
        console.log('Enhanced metadata:', enhanced);
        setWorkMetadata(enhanced);
        
        // Enhance the opera with this metadata
        const operaWithMusicalData = {
          ...opera,
          musicalKey: enhanced.musicalMetadata.overallKey,
          tempo: enhanced.musicalMetadata.overallTempo,
          duration: enhanced.musicalMetadata.duration,
          genre: enhanced.musicalMetadata.genre,
          instrumentation: enhanced.musicalMetadata.instrumentation,
          mood: enhanced.musicalMetadata.mood,
          acts: enhanced.musicalMetadata.acts,
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
        };
        
        // Enhance with recording information using server-side API
        fetch(`/api/enhance?id=${opera.identifier}&type=recording`)
          .then(response => response.json())
          .then(data => {
            console.log('Enhanced with recording info:', data.opera);
            // Merge the server-side enhancement with our client-side musical metadata
            const mergedOpera = {
              ...data.opera,
              musicalKey: operaWithMusicalData.musicalKey,
              tempo: operaWithMusicalData.tempo,
              duration: operaWithMusicalData.duration,
              genre: operaWithMusicalData.genre,
              instrumentation: operaWithMusicalData.instrumentation,
              mood: operaWithMusicalData.mood,
              acts: operaWithMusicalData.acts,
              movements: operaWithMusicalData.movements,
              metadata: {
                ...data.opera.metadata,
                isMapped: operaWithMusicalData.metadata.isMapped,
                source: operaWithMusicalData.metadata.source,
                musicalAnalysis: operaWithMusicalData.metadata.musicalAnalysis
              }
            };
            // Also enhance with sheet music links
            return fetch(`/api/enhance?id=${opera.identifier}&type=sheet-music`);
          })
          .then(response => response.json())
          .then(data => {
            console.log('Enhanced with sheet music:', data.opera);
            // Merge the sheet music enhancement with our preserved musical metadata
            const finalOpera = {
              ...data.opera,
              musicalKey: operaWithMusicalData.musicalKey,
              tempo: operaWithMusicalData.tempo,
              duration: operaWithMusicalData.duration,
              genre: operaWithMusicalData.genre,
              instrumentation: operaWithMusicalData.instrumentation,
              mood: operaWithMusicalData.mood,
              acts: operaWithMusicalData.acts,
              movements: operaWithMusicalData.movements,
              metadata: {
                ...data.opera.metadata,
                isMapped: operaWithMusicalData.metadata.isMapped,
                source: operaWithMusicalData.metadata.source,
                musicalAnalysis: operaWithMusicalData.metadata.musicalAnalysis
              }
            };
            setEnhancedOpera(finalOpera);
          })
          .catch(console.error)
          .finally(() => setMusicalDataLoading(false));
      } else {
        // Fallback to original enhancement using server-side API
        fetch(`/api/enhance?id=${opera.identifier}&type=all`)
          .then(response => response.json())
          .then(data => {
            console.log('Enhanced opera data:', data.opera);
            setEnhancedOpera(data.opera);
          })
          .catch(console.error)
          .finally(() => setMusicalDataLoading(false));
      }
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
                Recording Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {opera.recordingInfo ? (
                <>
                  {/* Performers */}
                  {opera.recordingInfo.performers && opera.recordingInfo.performers.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Performers</p>
                      <div className="space-y-1">
                        {opera.recordingInfo.performers.map((performer, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {performer.name} - {performer.role}
                              {performer.instrument && ` (${performer.instrument})`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conductor */}
                  {opera.recordingInfo.conductor && (
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Conductor</p>
                        <p className="text-sm text-muted-foreground">{opera.recordingInfo.conductor}</p>
                      </div>
                    </div>
                  )}

                  {/* Orchestra */}
                  {opera.recordingInfo.orchestra && (
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Orchestra</p>
                        <p className="text-sm text-muted-foreground">{opera.recordingInfo.orchestra}</p>
                      </div>
                    </div>
                  )}

                  {/* Recording Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {opera.recordingInfo.recordingDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Recording Date</p>
                          <p className="text-sm text-muted-foreground">{opera.recordingInfo.recordingDate}</p>
                        </div>
                      </div>
                    )}

                    {opera.recordingInfo.venue && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Venue</p>
                          <p className="text-sm text-muted-foreground">{opera.recordingInfo.venue}</p>
                        </div>
                      </div>
                    )}

                    {opera.recordingInfo.label && (
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Label</p>
                          <p className="text-sm text-muted-foreground">{opera.recordingInfo.label}</p>
                        </div>
                      </div>
                    )}

                    {opera.recordingInfo.country && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Country</p>
                          <p className="text-sm text-muted-foreground">{opera.recordingInfo.country}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  {opera.recordingInfo.notes && (
                    <div>
                      <p className="text-sm font-medium mb-2">Recording Notes</p>
                      <div className="text-sm text-muted-foreground leading-relaxed max-h-32 overflow-y-auto">
                        {opera.recordingInfo.notes}
                      </div>
                    </div>
                  )}

                  {/* Discogs Link */}
                  {opera.recordingInfo.discogsUrl && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={opera.recordingInfo.discogsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View on Discogs
                      </a>
                    </div>
                  )}
                </>
              ) : (
                /* Fallback to basic information when no recording info available */
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
              )}

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
                      className="h-8 w-8 p-0 cursor-pointer"
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
          })()}

          {/* Sheet Music Section - Prominent */}
          {enhancedOpera.sheetMusicLinks && enhancedOpera.sheetMusicLinks.length > 0 && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-blue-900">Sheet Music Available</CardTitle>
                    <Badge variant="default" className="bg-blue-600">
                      IMSLP
                    </Badge>
                  </div>
                  <div className="text-sm text-blue-700">
                    {enhancedOpera.sheetMusicLinks.length} score{enhancedOpera.sheetMusicLinks.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {enhancedOpera.sheetMusicLinks.slice(0, 3).map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{link.title}</p>
                        <p className="text-sm text-gray-600">{link.composer}</p>
                        {link.catalogNumber && (
                          <p className="text-xs text-gray-500">Catalog: {link.catalogNumber}</p>
                        )}
                      </div>
                      <a
                        href={link.imslpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 cursor-pointer bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Score
                      </a>
                    </div>
                  ))}
                  {enhancedOpera.sheetMusicLinks.length > 3 && (
                    <div className="text-center pt-2">
                      <p className="text-sm text-blue-700">
                        +{enhancedOpera.sheetMusicLinks.length - 3} more scores available in Musical Information section
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

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
                      className="h-8 w-8 p-0 cursor-pointer"
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



          {/* Movements & Acts */}
          {enhancedOpera.acts && enhancedOpera.acts.length > 0 && (
            <Card>
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setMovementsExpanded(!movementsExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="w-5 h-5" />
                      Movements & Tracks
                    </CardTitle>
                    <CardDescription>
                      {enhancedOpera.acts.reduce((total, act) => total + act.sections.length, 0)} movement{enhancedOpera.acts.reduce((total, act) => total + act.sections.length, 0) !== 1 ? 's' : ''} across {enhancedOpera.acts.length} act{enhancedOpera.acts.length !== 1 ? 's' : ''}
                      {enhancedOpera.metadata?.isMapped && (
                        <span className="ml-2 text-green-600">• Actual work structure</span>
                      )}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    {movementsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {movementsExpanded && (
                <CardContent>
                  <div className="space-y-6">
                    {enhancedOpera.acts.map((act, actIndex) => (
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
                  className="h-8 w-8 p-0 cursor-pointer"
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
                      <div key={index}>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
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
                            <AudioPlayer 
                              audioFile={file}
                              identifier={opera.identifier}
                              title={opera.title}
                              onClick={() => setActivePlayerIndex(activePlayerIndex === index ? null : index)}
                            />
                            <a
                              href={`https://archive.org/download/${opera.identifier}/${file.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Download
                            </a>
                          </div>
                        </div>
                        <AudioPlayerControls 
                          audioFile={file}
                          identifier={opera.identifier}
                          isVisible={activePlayerIndex === index}
                          onClose={() => setActivePlayerIndex(null)}
                        />
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
                <a
                  href={`https://archive.org/details/${opera.identifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Archive
                </a>
              </div>
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
