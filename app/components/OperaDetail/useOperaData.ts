import { useState, useEffect, useCallback } from 'react';
import { OperaRecording } from '@/app/types/opera';
import { EnhancedMusicalMetadataLibrary } from '@/app/lib/musical-metadata-enhanced';
import { ArchiveFile, WorkMetadata } from './types';
import { enhanceOperaWithMusicalData } from './utils';

export const useOperaData = (opera: OperaRecording, isOpen: boolean) => {
  const [files, setFiles] = useState<ArchiveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [enhancedOpera, setEnhancedOpera] = useState<OperaRecording>(opera);
  const [musicalDataLoading, setMusicalDataLoading] = useState(false);
  const [workMetadata, setWorkMetadata] = useState<any>(null);

  const fetchOperaData = useCallback(async () => {
    if (!isOpen || !opera.identifier) return;
    
    setLoading(true);
    setMusicalDataLoading(true);
    
    try {
      // Load files
      const filesResponse = await fetch(`/api/archive-files?id=${opera.identifier}`);
      const filesData = await filesResponse.json();
      setFiles(filesData.files || []);
      
      // Try to get enhanced musical metadata
      const enhanced = EnhancedMusicalMetadataLibrary.getMusicalMetadata(opera.identifier);
      
      if (enhanced) {
        setWorkMetadata(enhanced);
        const operaWithMusicalData = enhanceOperaWithMusicalData(opera, enhanced);
        
        // Enhance with recording information
        const recordingResponse = await fetch(`/api/enhance?id=${opera.identifier}&type=recording`);
        const recordingData = await recordingResponse.json();
        
        // Enhance with sheet music links
        const sheetMusicResponse = await fetch(`/api/enhance?id=${opera.identifier}&type=sheet-music`);
        const sheetMusicData = await sheetMusicResponse.json();
        
        // Check if enhancement succeeded
        if (sheetMusicResponse.ok && sheetMusicData.opera) {
          // Merge all enhancements
          const finalOpera = {
            ...sheetMusicData.opera,
            musicalKey: operaWithMusicalData.musicalKey,
            tempo: operaWithMusicalData.tempo,
            duration: operaWithMusicalData.duration,
            genre: operaWithMusicalData.genre,
            instrumentation: operaWithMusicalData.instrumentation,
            mood: operaWithMusicalData.mood,
            acts: operaWithMusicalData.acts,
            movements: operaWithMusicalData.movements,
            metadata: {
              ...sheetMusicData.opera.metadata,
              isMapped: operaWithMusicalData.metadata?.isMapped,
              source: operaWithMusicalData.metadata?.source,
              musicalAnalysis: operaWithMusicalData.metadata?.musicalAnalysis
            }
          };
          
          setEnhancedOpera(finalOpera);
        } else {
          // If sheet music enhancement failed, just use the enhanced musical data
          setEnhancedOpera(operaWithMusicalData);
        }
      } else {
        // Fallback to original enhancement
        const response = await fetch(`/api/enhance?id=${opera.identifier}&type=all`);
        const data = await response.json();
        
        // Safety check: ensure opera exists before setting
        if (data && data.opera) {
          setEnhancedOpera(data.opera);
        } else {
          // Final fallback: use the original opera
          setEnhancedOpera(opera);
        }
      }
    } catch (error) {
      console.error('Error fetching opera data:', error);
    } finally {
      setLoading(false);
      setMusicalDataLoading(false);
    }
  }, [isOpen, opera.identifier, opera]);

  useEffect(() => {
    fetchOperaData();
  }, [fetchOperaData]);

  return {
    files,
    loading,
    enhancedOpera,
    musicalDataLoading,
    workMetadata
  };
};
