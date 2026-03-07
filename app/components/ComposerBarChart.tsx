'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LightweightOpera } from '@/app/lib/cache-loader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComposerBarChartProps {
  works: LightweightOpera[];
}

type ComposerView = 'top-count' | 'era-diversity';

interface ComposerMetric {
  composer: string;
  value: number;
  detail: string;
}

function getPrimaryComposer(work: LightweightOpera): string | null {
  if (work.primaryComposer) return work.primaryComposer;
  if (!work.creator) return null;
  const first = work.creator.split(',')[0]?.trim();
  return first || null;
}

export default function ComposerBarChart({ works }: ComposerBarChartProps) {
  const router = useRouter();
  const [view, setView] = useState<ComposerView>('top-count');

  const metrics = useMemo(() => {
    const countMap = new Map<string, number>();
    const eraMap = new Map<string, Set<string>>();

    works.forEach((work) => {
      const composer = getPrimaryComposer(work);
      if (!composer) return;

      countMap.set(composer, (countMap.get(composer) || 0) + 1);

      if (!eraMap.has(composer)) {
        eraMap.set(composer, new Set<string>());
      }
      if (work.era && work.era !== 'unknown') {
        eraMap.get(composer)?.add(work.era);
      }
    });

    const topCount: ComposerMetric[] = Array.from(countMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16)
      .map(([composer, value]) => ({
        composer,
        value,
        detail: `${value} works`
      }));

    const eraDiversity: ComposerMetric[] = Array.from(eraMap.entries())
      .map(([composer, eras]) => ({
        composer,
        value: eras.size,
        detail: `${countMap.get(composer) || 0} works across ${eras.size} periods`
      }))
      .sort((a, b) => b.value - a.value || (countMap.get(b.composer) || 0) - (countMap.get(a.composer) || 0))
      .slice(0, 16);

    return {
      'top-count': topCount,
      'era-diversity': eraDiversity
    };
  }, [works]);

  const active = metrics[view];
  const maxValue = active.length > 0 ? Math.max(...active.map((item) => item.value)) : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={view === 'top-count' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setView('top-count')}
        >
          Top Composers
        </Button>
        <Button
          variant={view === 'era-diversity' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setView('era-diversity')}
        >
          Period Diversity
        </Button>
      </div>

      <div className="space-y-2">
        {active.map((item) => {
          const width = `${Math.max(8, (item.value / maxValue) * 100)}%`;
          return (
            <button
              key={item.composer}
              type="button"
              onClick={() => router.push(`/sandbox?composer=${encodeURIComponent(item.composer)}&journey=composer-constellations`)}
              className="w-full rounded-md border p-3 text-left transition-colors hover:bg-muted/50"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-medium text-sm">{item.composer}</span>
                <Badge variant="secondary">{item.value}</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary/80" style={{ width }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
