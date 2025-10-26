'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { OperaDetailProps } from './OperaDetail/types';
import { useOperaData } from './OperaDetail/useOperaData';
import {
  OperaImage,
  RecordingInfo,
  AboutWork,
  SheetMusicSection,
  MusicalInformation,
  MovementsSection,
  AudioFilesSection
} from './OperaDetail/index';

export default function OperaDetail({ opera, isOpen, onClose }: OperaDetailProps) {
  const [audioFilesExpanded, setAudioFilesExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [musicalInfoExpanded, setMusicalInfoExpanded] = useState(true);
  const [movementsExpanded, setMovementsExpanded] = useState(true);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number | null>(null);

  const {
    files,
    loading,
    enhancedOpera,
    musicalDataLoading
  } = useOperaData(opera, isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[90vw] max-h-[98vh] w-[95vw] h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{opera.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Opera Image and Basic Info - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <OperaImage opera={enhancedOpera} />
            <RecordingInfo opera={enhancedOpera} />
          </div>

          {/* About the Work */}
          <AboutWork 
            opera={enhancedOpera} 
            isExpanded={aboutExpanded} 
            onToggle={() => setAboutExpanded(!aboutExpanded)} 
          />

          {/* Sheet Music Section */}
          <SheetMusicSection opera={enhancedOpera} />

          {/* Musical Information */}
          <MusicalInformation 
            opera={enhancedOpera} 
            isLoading={musicalDataLoading} 
            isExpanded={musicalInfoExpanded} 
            onToggle={() => setMusicalInfoExpanded(!musicalInfoExpanded)} 
          />

          {/* Movements & Acts */}
          <MovementsSection 
            opera={enhancedOpera} 
            isExpanded={movementsExpanded} 
            onToggle={() => setMovementsExpanded(!movementsExpanded)} 
          />

          {/* Audio Files */}
          <AudioFilesSection 
            files={files} 
            opera={enhancedOpera} 
            loading={loading} 
            isExpanded={audioFilesExpanded} 
            onToggle={() => setAudioFilesExpanded(!audioFilesExpanded)} 
            activePlayerIndex={activePlayerIndex} 
            setActivePlayerIndex={setActivePlayerIndex} 
          />

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