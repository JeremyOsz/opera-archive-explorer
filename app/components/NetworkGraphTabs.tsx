'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LightweightOpera } from '@/app/lib/cache-loader';
import NetworkGraphComponent from './NetworkGraph';
import { Button } from '@/components/ui/button';
import { Music, Globe, Users, Tag, SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraphPriorityMode, NodeSizeMetric } from '@/app/lib/network-graph-builder';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [minLinkStrength, setMinLinkStrength] = useState('2');
  const [nodeLimit, setNodeLimit] = useState('120');
  const [priorityMode, setPriorityMode] = useState<GraphPriorityMode>('discoveryScore');

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

      <div className="grid gap-3 rounded-xl border bg-muted/20 p-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Find A Recording
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title or composer"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Click a node to inspect it</Badge>
            <Badge variant="outline">Hover reveals local structure</Badge>
            <Badge variant="outline">Search keeps matching nodes and their neighbors</Badge>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Connection Floor
            </label>
            <Select value={minLinkStrength} onValueChange={setMinLinkStrength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 • show everything</SelectItem>
                <SelectItem value="2">2 • reduce noise</SelectItem>
                <SelectItem value="3">3 • stronger ties</SelectItem>
                <SelectItem value="5">5 • dense clusters only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Node Budget
            </label>
            <Select value={nodeLimit} onValueChange={setNodeLimit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="90">90</SelectItem>
                <SelectItem value="120">120</SelectItem>
                <SelectItem value="150">150</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prioritize
            </label>
            <Select value={priorityMode} onValueChange={(value) => setPriorityMode(value as GraphPriorityMode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discoveryScore">Discovery potential</SelectItem>
                <SelectItem value="metadataRichness">Metadata richness</SelectItem>
                <SelectItem value="yearRecency">Most recent years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
          <div className="rounded-md border bg-background p-3 text-sm">
            <div className="mb-1 flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Better sampling
            </div>
            <p className="text-muted-foreground">
              The graph now favors works with stronger discovery signals and richer metadata instead of arbitrary index sampling.
            </p>
          </div>
        </div>
      )}

      {/* Graph for Active Tab */}
      <NetworkGraphComponent
        works={works}
        maxNodes={isMobile ? Math.min(60, Number(nodeLimit)) : Math.min(Number(nodeLimit), maxNodes)}
        connectionType={activeTab}
        nodeSizeMetric={nodeSizeMetric}
        mobileMode={isMobile}
        minLinkStrength={Number(minLinkStrength)}
        searchQuery={searchQuery}
        priorityMode={priorityMode}
      />
    </div>
  );
}
