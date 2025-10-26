import { Volume2, Music, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AudioPlayer, { AudioPlayerControls } from '../AudioPlayer';
import { AudioFilesSectionProps, AudioFile } from './types';
import { isAudioFile, formatFileSize, formatDuration } from './utils';

export const AudioFilesSection = ({ 
  files, 
  opera, 
  loading, 
  isExpanded, 
  onToggle, 
  activePlayerIndex, 
  setActivePlayerIndex 
}: AudioFilesSectionProps) => {
  const audioFiles = files.filter(isAudioFile);
  
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
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
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        <CardDescription>
          {loading ? 'Loading files...' : `${audioFiles.length} audio file${audioFiles.length !== 1 ? 's' : ''} available`}
        </CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          ) : audioFiles.length > 0 ? (
            <div className="space-y-3">
              {audioFiles.map((file, index) => {
                const audioFile: AudioFile = {
                  ...file,
                  length: file.length || '0'
                };
                return (
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
                          audioFile={audioFile}
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
                      audioFile={audioFile}
                      identifier={opera.identifier}
                      isVisible={activePlayerIndex === index}
                      onClose={() => setActivePlayerIndex(null)}
                    />
                  </div>
                );
              })}
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
  );
};
