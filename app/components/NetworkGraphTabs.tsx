'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LightweightOpera } from '@/app/lib/cache-loader';
import NetworkGraphComponent from './NetworkGraph';
import { Button } from '@/components/ui/button';
import { Music, Globe, Users, Tag, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NodeSizeMetric } from '@/app/lib/network-graph-builder';

interface NetworkGraphTabsProps {
  works: LightweightOpera[];
  maxNodes?: number;
}

type ConnectionType = 'composer' | 'subject' | 'language' | 'performer';

const connectionTypes: Array<{
  id: ConnectionType;
  label: string;
  icon: ReactNode;
  color: string;
  description: string;
}> = [
  {
    id: 'composer',
    label: 'Composer',
    icon: <Music className="w-4 h-4" />,
    color: 'bg-red-500',
    description: 'Connections by shared composer',
  },
  {
    id: 'subject',
    label: 'Genre',
    icon: <Tag className="w-4 h-4" />,
    color: 'bg-blue-500',
    description: 'Connections by shared genres/subjects',
  },
  {
    id: 'language',
    label: 'Language',
    icon: <Globe className="w-4 h-4" />,
    color: 'bg-green-500',
    description: 'Connections by shared languages',
  },
  {
    id: 'performer',
    label: 'Performer',
    icon: <Users className="w-4 h-4" />,
    color: 'bg-orange-500',
    description: 'Connections by shared performers/orchestras',
  },
];

export default function NetworkGraphTabs({ works, maxNodes = 100 }: NetworkGraphTabsProps) {
  const [activeTab, setActiveTab] = useState<ConnectionType>('composer');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 900 : false
  );
  const [nodeSizeMetric, setNodeSizeMetric] = useState<NodeSizeMetric>('connections');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap border-b">
        {connectionTypes.map((type) => (
          <Button
            key={type.id}
            variant={activeTab === type.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(type.id)}
            className="rounded-b-none"
          >
            <span className="mr-2">{type.icon}</span>
            {type.label}
          </Button>
        ))}
      </div>

      {/* Active Tab Description */}
      <div className="text-sm text-muted-foreground">
        {connectionTypes.find(t => t.id === activeTab)?.description}
      </div>

      {isMobile && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          <div className="rounded-md border px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
            Mobile profile: reduced node density
          </div>
          <div className="rounded-md border px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
            Tap node to inspect neighborhood
          </div>
          <div className="rounded-md border px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
            Use isolate mode for focused reading
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => setShowAdvanced((value) => !value)}>
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </Button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-md border p-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Node Size Metric
            </label>
            <Select value={nodeSizeMetric} onValueChange={(value) => setNodeSizeMetric(value as NodeSizeMetric)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="connections">Connections</SelectItem>
                <SelectItem value="discoveryScore">Discovery Score</SelectItem>
                <SelectItem value="yearRecency">Year Recency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Graph for Active Tab */}
      <NetworkGraphComponent
        works={works}
        maxNodes={isMobile ? Math.min(60, maxNodes) : Math.min(120, maxNodes)}
        connectionType={activeTab}
        nodeSizeMetric={nodeSizeMetric}
        mobileMode={isMobile}
      />
    </div>
  );
}
