'use client';

import { useState } from 'react';
import { GroupedWork } from '@/app/lib/work-grouper';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Globe, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Image from 'next/image';
import { OperaRecording } from '@/app/types/opera';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OperaDetail from './OperaDetail';

interface ClientWorkGroupGridProps {
  work: GroupedWork;
}

export default function ClientWorkGroupGrid({ work }: ClientWorkGroupGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<OperaRecording | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRecordingClick = (recording: OperaRecording) => {
    setSelectedRecording(recording);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedRecording(null);
  };

  return (
    <>
      <CardContent className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold">Available Recordings</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpanded}
            className="flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show All
              </>
            )}
          </Button>
        </div>

        {/* Expanded Recordings List */}
        {isExpanded && (
          <div className="space-y-3">
            {work.recordings.map((recording) => (
              <div
                key={recording.identifier}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => handleRecordingClick(recording)}
              >
                {/* Recording thumbnail */}
                {recording.thumbnailUrl && (
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                    <Image
                      src={recording.thumbnailUrl}
                      alt={recording.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}

                {/* Recording details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                    {recording.title}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    {recording.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(recording.date).getFullYear()}</span>
                      </div>
                    )}
                    {recording.language && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{recording.language}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recording metadata badges */}
                <div className="flex gap-1">
                  {recording.subject?.slice(0, 2).map((subject) => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collapsed view - show first few recordings */}
        {!isExpanded && (
          <div className="space-y-2">
            {work.recordings.slice(0, 3).map((recording) => (
              <div
                key={recording.identifier}
                className="flex items-center gap-3 p-2 border rounded hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => handleRecordingClick(recording)}
              >
                {recording.thumbnailUrl && (
                  <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded bg-muted">
                    <Image
                      src={recording.thumbnailUrl}
                      alt={recording.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                    {recording.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    {recording.date && (
                      <span>{new Date(recording.date).getFullYear()}</span>
                    )}
                    {recording.language && (
                      <span>• {recording.language}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {work.recordings.length > 3 && (
              <div className="text-center py-2">
                <span className="text-sm text-muted-foreground">
                  +{work.recordings.length - 3} more recordings
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Recording Detail Modal */}
      {selectedRecording && (
        <OperaDetail
          opera={selectedRecording}
          isOpen={showDetail}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
}