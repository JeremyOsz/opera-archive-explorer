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
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';
import { ArchiveAPI } from '@/app/lib/archive-api';

interface OperaDetailProps {
  opera: OperaRecording;
  isOpen: boolean;
  onClose: () => void;
}

export default function OperaDetail({ opera, isOpen, onClose }: OperaDetailProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && opera.identifier) {
      setLoading(true);
      ArchiveAPI.getOperaFiles(opera.identifier)
        .then(files => {
          console.log('Files fetched for', opera.identifier, ':', files);
          setFiles(files);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, opera.identifier]);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Opera Image */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
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
            <Card>
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

          {/* Audio Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Available Audio Files
              </CardTitle>
              <CardDescription>
                {loading ? 'Loading files...' : `${audioFiles.length} audio file${audioFiles.length !== 1 ? 's' : ''} available`}
              </CardDescription>
            </CardHeader>
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
          </Card>

          {/* Archive Link */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">View on Internet Archive</p>
                  <p className="text-sm text-muted-foreground">
                    Access the full recording details and additional metadata
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(`https://archive.org/details/${opera.identifier}`, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Archive
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
