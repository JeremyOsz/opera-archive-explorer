import { 
  Music, 
  Calendar, 
  User, 
  Globe, 
  ExternalLink,
  Clock,
  Tag,
  Volume2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OperaRecording } from '@/app/types/opera';

interface RecordingInfoProps {
  opera: OperaRecording;
}

export const RecordingInfo = ({ opera }: RecordingInfoProps) => (
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
);
