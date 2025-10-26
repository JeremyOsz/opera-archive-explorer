import Image from 'next/image';
import { Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { OperaRecording } from '@/app/types/opera';

interface OperaImageProps {
  opera: OperaRecording;
}

export const OperaImage = ({ opera }: OperaImageProps) => (
  <Card className="lg:col-span-4">
    <CardContent className="p-8">
      <div className="relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-lg bg-muted">
        {opera.imageUrl ? (
          <Image
            src={opera.imageUrl}
            alt={opera.title}
            fill
            className="object-cover object-center"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"
          style={{ display: opera.imageUrl ? 'none' : 'flex' }}
        >
          <div className="text-center">
            <Music className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No Image Available</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
