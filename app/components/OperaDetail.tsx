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
  Volume2
} from 'lucide-react';
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
        .then(setFiles)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, opera.identifier]);

  const audioFiles = Array.isArray(files) ? files.filter(file => 
    file.format === 'VBR MP3' || 
    file.format === '64Kbps MP3' || 
    file.format === '128Kbps MP3' ||
    file.format === 'Flac' ||
    file.format === 'Ogg Vorbis'
  ) : [];

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{opera.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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
                        {new Date(opera.publicdate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {opera.description && (
                <div>
                  <p className="text-sm font-medium mb-2">Description</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {opera.description}
                  </p>
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
                <p className="text-muted-foreground text-center py-8">
                  No audio files available for this recording.
                </p>
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
