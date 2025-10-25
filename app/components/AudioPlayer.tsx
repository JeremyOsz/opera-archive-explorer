'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Download, ExternalLink, X, SkipBack, SkipForward } from 'lucide-react';

interface AudioFile {
  name: string;
  format: string;
  size: string;
  length: string;
  url?: string;
}

interface AudioPlayerProps {
  audioFile: AudioFile;
  identifier: string;
  title: string;
  onClick?: () => void;
}

// Audio Player Controls Component
function AudioPlayerControls({ 
  audioFile, 
  identifier, 
  isVisible, 
  onClose 
}: {
  audioFile: AudioFile;
  identifier: string;
  isVisible: boolean;
  onClose: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getAudioUrl = () => {
    return `https://archive.org/download/${identifier}/${audioFile.name}`;
  };

  // Auto-play when component becomes visible
  useEffect(() => {
    if (isVisible && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="mt-3 p-3 border rounded-lg bg-muted/20">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={getAudioUrl()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Minimal Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <Button
          onClick={handlePlayPause}
          size="sm"
          className="rounded-full w-8 h-8 p-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        {/* Progress Bar */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(currentTime / duration) * 100}%, #e2e8f0 ${(currentTime / duration) * 100}%, #e2e8f0 100%)`
            }}
          />
        </div>
        
        {/* Time Display */}
        <div className="text-xs text-muted-foreground min-w-0">
          <span>{formatTime(currentTime)}</span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center gap-1">
          <Volume2 className="w-3 h-3 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

export default function AudioPlayer({ audioFile, identifier, title, onClick }: AudioPlayerProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Play className="w-4 h-4" />
      Play
    </Button>
  );
}

// Export the AudioPlayerControls component
export { AudioPlayerControls };
