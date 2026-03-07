'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { LightweightOpera } from '@/app/lib/cache-loader';
import {
  buildNetworkGraph,
  GraphPriorityMode,
  getNetworkStats,
  NetworkGraph,
  NetworkLink,
  NetworkNode,
  NodeSizeMetric
} from '@/app/lib/network-graph-builder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, Focus, Maximize2, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface NetworkGraphProps {
  works: LightweightOpera[];
  maxNodes?: number;
  connectionType?: 'all' | 'subject' | 'composer' | 'language' | 'performer';
  nodeSizeMetric?: NodeSizeMetric;
  mobileMode?: boolean;
  minLinkStrength?: number;
  searchQuery?: string;
  priorityMode?: GraphPriorityMode;
}

type SimNode = NetworkNode & d3.SimulationNodeDatum;
type SimLink = NetworkLink & d3.SimulationLinkDatum<SimNode>;

const LINK_COLORS: Record<NetworkLink['type'], string> = {
  subject: '#2563eb',
  composer: '#dc2626',
  language: '#059669',
  performer: '#d97706',
  similar: '#4b5563'
};

function getRadius(node: NetworkNode, metric: NodeSizeMetric, minYear: number, maxYear: number): number {
  if (metric === 'connections') {
    return Math.max(4, Math.min(16, 4 + Math.sqrt(node.degree || 0) * 1.75));
  }
  if (metric === 'discoveryScore') {
    return Math.max(4, Math.min(16, 4 + (node.discoveryScore || 0) / 12));
  }

  if (node.year && maxYear > minYear) {
    const ratio = (node.year - minYear) / (maxYear - minYear);
    return Math.max(4, Math.min(16, 4 + ratio * 10));
  }
  return 6;
}

function buildNeighborSet(graph: NetworkGraph, nodeId: string): Set<string> {
  const neighbors = new Set<string>([nodeId]);
  graph.links.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    if (sourceId === nodeId) neighbors.add(targetId);
    if (targetId === nodeId) neighbors.add(sourceId);
  });
  return neighbors;
}

function getLinkLabel(link: NetworkLink): string {
  if (!link.sharedValue) {
    return link.type;
  }
  if (link.type === 'subject') return `Shared subject: ${link.sharedValue}`;
  if (link.type === 'composer') return `Shared composer: ${link.sharedValue}`;
  if (link.type === 'language') return `Shared language: ${link.sharedValue}`;
  if (link.type === 'performer') return `Shared performer: ${link.sharedValue}`;
  return link.sharedValue;
}

export default function NetworkGraphComponent({
  works,
  maxNodes = 100,
  connectionType = 'all',
  nodeSizeMetric = 'connections',
  mobileMode = false,
  minLinkStrength = 1,
  searchQuery = '',
  priorityMode = 'discoveryScore'
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [focusNeighborhood, setFocusNeighborhood] = useState(false);

  const baseGraph = useMemo(() => {
    if (works.length === 0) return { nodes: [], links: [] } as NetworkGraph;
    return buildNetworkGraph(works, maxNodes, minLinkStrength, connectionType, { priorityMode });
  }, [works, maxNodes, minLinkStrength, connectionType, priorityMode]);

  const query = searchQuery.trim().toLowerCase();

  const searchableGraph = useMemo(() => {
    if (!query) {
      return baseGraph;
    }

    const matchingNodes = baseGraph.nodes.filter((node) => {
      const haystacks = [node.title, node.composer, ...node.subjects, ...node.languages, ...node.performers]
        .filter(Boolean)
        .map((value) => value!.toLowerCase());
      return haystacks.some((value) => value.includes(query));
    });

    if (matchingNodes.length === 0) {
      return { nodes: [], links: [] } as NetworkGraph;
    }

    const keepIds = new Set<string>();
    matchingNodes.forEach((node) => buildNeighborSet(baseGraph, node.id).forEach((id) => keepIds.add(id)));

    return {
      nodes: baseGraph.nodes.filter((node) => keepIds.has(node.id)),
      links: baseGraph.links.filter((link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        return keepIds.has(sourceId) && keepIds.has(targetId);
      }),
    };
  }, [baseGraph, query]);

  const graph = useMemo(() => {
    if (!focusNeighborhood || !selectedNodeId) {
      return searchableGraph;
    }
    if (!searchableGraph.nodes.some((node) => node.id === selectedNodeId)) {
      return searchableGraph;
    }
    const neighbors = buildNeighborSet(searchableGraph, selectedNodeId);
    const nodes = searchableGraph.nodes.filter((node) => neighbors.has(node.id));
    const links = searchableGraph.links.filter((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      return neighbors.has(sourceId) && neighbors.has(targetId);
    });
    return { nodes, links };
  }, [searchableGraph, focusNeighborhood, selectedNodeId]);

  useEffect(() => {
    if (!query) {
      return;
    }
    const firstMatch = searchableGraph.nodes.find((node) => {
      const haystacks = [node.title, node.composer].filter(Boolean).map((value) => value!.toLowerCase());
      return haystacks.some((value) => value.includes(query));
    });
    if (firstMatch) {
      setSelectedNodeId(firstMatch.id);
    }
  }, [query, searchableGraph]);

  useEffect(() => {
    if (!graph.nodes.some((node) => node.id === selectedNodeId)) {
      setSelectedNodeId(graph.nodes[0]?.id || null);
    }
  }, [graph, selectedNodeId]);

  const selectedNode = useMemo(
    () => graph.nodes.find((node) => node.id === selectedNodeId) || null,
    [graph.nodes, selectedNodeId]
  );

  const strongestLinks = useMemo(() => {
    if (!selectedNode) {
      return [];
    }

    return graph.links
      .filter((link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        return sourceId === selectedNode.id || targetId === selectedNode.id;
      })
      .map((link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        const peerId = sourceId === selectedNode.id ? targetId : sourceId;
        const peer = graph.nodes.find((node) => node.id === peerId);
        return {
          link,
          peer,
        };
      })
      .filter((item) => item.peer)
      .sort((a, b) => b.link.strength - a.link.strength)
      .slice(0, 8);
  }, [graph.links, graph.nodes, selectedNode]);

  const stats = useMemo(() => getNetworkStats(graph), [graph]);

  useEffect(() => {
    if (!svgRef.current || graph.nodes.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = mobileMode ? 860 : 1200;
    const height = mobileMode ? 620 : 800;
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
    const container = svg.append('g');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 4.5])
      .on('zoom', (event) => {
        container.attr('transform', event.transform.toString());
      });
    svg.call(zoom);
    zoomRef.current = zoom;

    const years = graph.nodes.map((node) => node.year || 0).filter((year) => year > 0);
    const minYear = years.length > 0 ? Math.min(...years) : 0;
    const maxYear = years.length > 0 ? Math.max(...years) : 0;

    const nodeColorScale = d3.scaleSequential(d3.interpolateTurbo).domain([0, 10]);

    const simNodes = graph.nodes as SimNode[];
    const simLinks = graph.links as SimLink[];

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => 95 - d.strength * 4)
          .strength((d) => Math.max(0.08, d.strength * 0.08))
      )
      .force('charge', d3.forceManyBody().strength(mobileMode ? -240 : -320))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<SimNode>().radius((d) => getRadius(d, nodeSizeMetric, minYear, maxYear) + 3));

    simulationRef.current = simulation;

    const links = container
      .append('g')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke', (d) => LINK_COLORS[d.type] || LINK_COLORS.similar)
      .attr('stroke-opacity', (d) => Math.min(0.7, 0.16 + d.strength * 0.08))
      .attr('stroke-width', (d) => Math.max(1, d.strength / 2));

    const nodes = container
      .append('g')
      .selectAll('circle')
      .data(simNodes)
      .enter()
      .append('circle')
      .attr('r', (d) => getRadius(d, nodeSizeMetric, minYear, maxYear))
      .attr('fill', (d) => nodeColorScale(d.group))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.8)
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<SVGCircleElement, SimNode>()
          .on('start', (event) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on('drag', (event) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on('end', (event) => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          })
      )
      .on('click', (_, d) => setSelectedNodeId(d.id));

    const labels = container
      .append('g')
      .selectAll('text')
      .data(simNodes)
      .enter()
      .append('text')
      .text((d) => (d.title.length > 32 ? `${d.title.slice(0, 32)}...` : d.title))
      .attr('font-size', mobileMode ? '9px' : '10px')
      .attr('dx', (d) => getRadius(d, nodeSizeMetric, minYear, maxYear) + 4)
      .attr('dy', 4)
      .attr('fill', '#111827')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    simulation.on('tick', () => {
      links
        .attr('x1', (d) => (typeof d.source === 'string' ? 0 : (d.source as SimNode).x ?? 0))
        .attr('y1', (d) => (typeof d.source === 'string' ? 0 : (d.source as SimNode).y ?? 0))
        .attr('x2', (d) => (typeof d.target === 'string' ? 0 : (d.target as SimNode).x ?? 0))
        .attr('y2', (d) => (typeof d.target === 'string' ? 0 : (d.target as SimNode).y ?? 0));

      nodes.attr('cx', (d) => (d as SimNode).x ?? 0).attr('cy', (d) => (d as SimNode).y ?? 0);
      labels
        .attr('x', (d) => (d as SimNode).x ?? 0)
        .attr('y', (d) => (d as SimNode).y ?? 0)
        .style('opacity', (d) => {
          if (!selectedNodeId) return 0;
          const neighbors = buildNeighborSet(graph, selectedNodeId);
          return neighbors.has(d.id) ? 1 : 0;
        });
    });

    nodes
      .on('mouseover', function (_, d) {
        const neighbors = buildNeighborSet(graph, d.id);
        links
          .attr('stroke-opacity', (link) => {
            const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
            const targetId = typeof link.target === 'string' ? link.target : link.target.id;
            return sourceId === d.id || targetId === d.id ? 0.9 : 0.08;
          })
          .attr('stroke-width', (link) => {
            const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
            const targetId = typeof link.target === 'string' ? link.target : link.target.id;
            return sourceId === d.id || targetId === d.id ? Math.max(2, link.strength / 1.8) : 1;
          });

        nodes.attr('opacity', (node) => (neighbors.has(node.id) ? 1 : 0.2));
        labels.style('opacity', (node) => (neighbors.has(node.id) ? 1 : 0));
        d3.select(this).attr('stroke', '#111827').attr('stroke-width', 2.5);
      })
      .on('mouseout', function () {
        links
          .attr('stroke-opacity', (d) => Math.min(0.7, 0.16 + d.strength * 0.08))
          .attr('stroke-width', (d) => Math.max(1, d.strength / 2));
        nodes.attr('opacity', 1);
        labels.style('opacity', (d) => {
          if (!selectedNodeId) return 0;
          const neighbors = buildNeighborSet(graph, selectedNodeId);
          return neighbors.has(d.id) ? 1 : 0;
        });
        d3.select(this).attr('stroke', '#ffffff').attr('stroke-width', 1.8);
      });

    setIsSimulating(true);
    simulation.on('end', () => setIsSimulating(false));

    return () => {
      simulation.stop();
      simulationRef.current = null;
    };
  }, [graph, mobileMode, nodeSizeMetric, selectedNodeId]);

  const handleReset = () => {
    if (simulationRef.current) {
      simulationRef.current.alpha(1).restart();
    }
  };

  const handleZoomIn = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, 1.4);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, 0.72);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.transform, d3.zoomIdentity);
    }
  };

  if (baseGraph.nodes.length === 0 || graph.nodes.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            {query ? 'No recordings matched the current search and filter settings.' : 'No data available for network visualization.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        <div className="rounded-md border p-2">
          <p className="text-xs text-muted-foreground">Nodes</p>
          <p className="text-lg font-semibold">{stats.nodeCount}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-xs text-muted-foreground">Links</p>
          <p className="text-lg font-semibold">{stats.linkCount}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-xs text-muted-foreground">Avg Degree</p>
          <p className="text-lg font-semibold">{stats.averageConnections.toFixed(2)}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-xs text-muted-foreground">Density</p>
          <p className="text-lg font-semibold">{stats.density.toFixed(3)}</p>
        </div>
        <div className="rounded-md border p-2">
          <p className="text-xs text-muted-foreground">Components</p>
          <p className="text-lg font-semibold">{stats.componentCount}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">Showing {graph.nodes.length} of {baseGraph.nodes.length} nodes</Badge>
        <Badge variant="outline">Minimum link strength {minLinkStrength}</Badge>
        <Badge variant="outline">Priority: {priorityMode === 'discoveryScore' ? 'Discovery potential' : priorityMode === 'metadataRichness' ? 'Metadata richness' : 'Year recency'}</Badge>
        {query ? <Badge>{`Search: ${searchQuery}`}</Badge> : null}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleReset} disabled={isSimulating}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isSimulating ? 'animate-spin' : ''}`} />
            Reset Layout
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4 mr-2" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4 mr-2" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetZoom}>
            <Maximize2 className="w-4 h-4 mr-2" />
            Reset Zoom
          </Button>
          <Button
            variant={focusNeighborhood ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFocusNeighborhood((value) => !value)}
            disabled={!selectedNode}
          >
            <Focus className="w-4 h-4 mr-2" />
            Focus Neighborhood
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {nodeSizeMetric === 'connections' ? 'Node size: connectivity' : nodeSizeMetric === 'discoveryScore' ? 'Node size: discovery score' : 'Node size: recency'}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" className="gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          Composer
        </Badge>
        <Badge variant="outline" className="gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Subject
        </Badge>
        <Badge variant="outline" className="gap-2">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          Language
        </Badge>
        <Badge variant="outline" className="gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Performer
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="w-full overflow-auto border rounded-lg">
            <svg ref={svgRef} className="w-full" style={{ minHeight: mobileMode ? '620px' : '780px' }} />
          </div>
        </CardContent>
      </Card>

      {selectedNode && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Recording</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
            <div className="space-y-2 text-sm">
              <div>
                <strong>Title:</strong> {selectedNode.title}
              </div>
              {selectedNode.composer && (
                <div>
                  <strong>Composer:</strong> {selectedNode.composer}
                </div>
              )}
              <div>
                <strong>Connections:</strong> {selectedNode.degree || 0}
              </div>
              {selectedNode.discoveryScore !== undefined && (
                <div>
                  <strong>Discovery Score:</strong> {selectedNode.discoveryScore}
                </div>
              )}
              {selectedNode.year && (
                <div>
                  <strong>Year:</strong> {selectedNode.year}
                </div>
              )}
              {selectedNode.subjects.length > 0 && (
                <div>
                  <strong>Genres:</strong> {selectedNode.subjects.slice(0, 6).join(', ')}
                </div>
              )}
              {selectedNode.languages.length > 0 && (
                <div>
                  <strong>Languages:</strong> {selectedNode.languages.join(', ')}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold">Strongest Connections</h4>
              </div>
              {strongestLinks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No visible links for this node under the current filters.</p>
              ) : (
                <div className="space-y-2">
                  {strongestLinks.map(({ link, peer }) => (
                    <div key={`${selectedNode.id}-${peer?.id}`} className="rounded-lg border p-3 text-sm">
                      <div className="font-medium">{peer?.title}</div>
                      <div className="text-muted-foreground">{peer?.composer || 'Composer unknown'}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{getLinkLabel(link)}</Badge>
                        <Badge variant="secondary">Strength {link.strength}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
