import { OperaRecording } from '@/app/types/opera';
import { ArchiveFile, WorkMetadata } from './types';

// Utility functions for OperaDetail components
export const formatFileSize = (size: string): string => {
  const bytes = parseInt(size);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

export const formatDuration = (length: string): string => {
  const seconds = parseInt(length);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const isAudioFile = (file: ArchiveFile): boolean => {
  const format = file.format?.toLowerCase() || '';
  const name = file.name?.toLowerCase() || '';
  return format.includes('mp3') || 
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
};

export const enhanceOperaWithMusicalData = (opera: OperaRecording, enhanced: any): OperaRecording => {
  return {
    ...opera,
    musicalKey: enhanced.musicalMetadata.overallKey,
    tempo: enhanced.musicalMetadata.overallTempo?.toString() || enhanced.musicalMetadata.overallTempo,
    duration: enhanced.musicalMetadata.duration,
    genre: enhanced.musicalMetadata.genre,
    instrumentation: enhanced.musicalMetadata.instrumentation,
    mood: enhanced.musicalMetadata.mood,
    acts: enhanced.musicalMetadata.acts,
    movements: enhanced.musicalMetadata.acts.flatMap((act: any) => 
      act.sections.map((section: any) => ({
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
};
