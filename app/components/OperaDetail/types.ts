// Types for OperaDetail components
export interface ArchiveFile {
  name: string;
  format: string;
  size: string;
  length?: string;
}

export interface AudioFile {
  name: string;
  format: string;
  size: string;
  length: string;
}

export interface WorkMetadata {
  musicalMetadata: {
    overallKey: string;
    overallTempo: string;
    duration: string;
    genre: string[];
    instrumentation: string[];
    mood: string[];
    acts: Array<{
      title: string;
      sections: Array<{
        title: string;
        duration: string;
        key: string;
        tempo: string;
        sectionNumber: number;
        description: string;
      }>;
    }>;
    isMapped: boolean;
    source: string;
    musicalAnalysis: {
      harmonicComplexity: string;
      melodicStyle: string;
      timeSignature: string;
    };
  };
}

export interface OperaDetailProps {
  opera: import('@/app/types/opera').OperaRecording;
  isOpen: boolean;
  onClose: () => void;
}

// Component-specific prop interfaces
export interface CollapsibleSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export interface AudioFilesSectionProps {
  files: ArchiveFile[];
  opera: import('@/app/types/opera').OperaRecording;
  loading: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  activePlayerIndex: number | null;
  setActivePlayerIndex: (index: number | null) => void;
}

export interface MusicalInformationProps extends CollapsibleSectionProps {
  opera: import('@/app/types/opera').OperaRecording;
  isLoading: boolean;
}

export interface MovementsSectionProps extends CollapsibleSectionProps {
  opera: import('@/app/types/opera').OperaRecording;
}

export interface AboutWorkProps extends CollapsibleSectionProps {
  opera: import('@/app/types/opera').OperaRecording;
}
