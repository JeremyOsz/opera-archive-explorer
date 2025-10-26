import { BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OperaRecording } from '@/app/types/opera';

interface SheetMusicSectionProps {
  opera: OperaRecording;
}

export const SheetMusicSection = ({ opera }: SheetMusicSectionProps) => {
  if (!opera.sheetMusicLinks || opera.sheetMusicLinks.length === 0) return null;
  
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-900">Sheet Music Available</CardTitle>
            <Badge variant="default" className="bg-blue-600">
              IMSLP
            </Badge>
          </div>
          <div className="text-sm text-blue-700">
            {opera.sheetMusicLinks.length} score{opera.sheetMusicLinks.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {opera.sheetMusicLinks.slice(0, 3).map((link, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{link.title}</p>
                <p className="text-sm text-gray-600">{link.composer}</p>
                {link.catalogNumber && (
                  <p className="text-xs text-gray-500">Catalog: {link.catalogNumber}</p>
                )}
              </div>
              <a
                href={link.imslpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 cursor-pointer bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Score
              </a>
            </div>
          ))}
          {opera.sheetMusicLinks.length > 3 && (
            <div className="text-center pt-2">
              <p className="text-sm text-blue-700">
                +{opera.sheetMusicLinks.length - 3} more scores available in Musical Information section
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
