import { NetworkGraph, NetworkNode } from './network-graph-builder';

export type NetworkSearchMode = 'highlight' | 'filter';

interface NetworkSearchResult {
  graph: NetworkGraph;
  matchedNodeIds: string[];
  firstMatchId: string | null;
}

function normalizeValue(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function matchesQuery(node: NetworkNode, query: string): boolean {
  const haystacks = [node.title, node.composer, ...node.subjects, ...node.languages, ...node.performers]
    .filter(Boolean)
    .map((value) => normalizeValue(value!));
  return haystacks.some((value) => value.includes(query));
}

function getNeighborSet(graph: NetworkGraph, nodeId: string): Set<string> {
  const neighbors = new Set<string>([nodeId]);
  graph.links.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    if (sourceId === nodeId) neighbors.add(targetId);
    if (targetId === nodeId) neighbors.add(sourceId);
  });
  return neighbors;
}

export function applyNetworkSearch(
  graph: NetworkGraph,
  query: string,
  mode: NetworkSearchMode = 'highlight'
): NetworkSearchResult {
  const normalizedQuery = normalizeValue(query);
  if (!normalizedQuery) {
    return {
      graph,
      matchedNodeIds: [],
      firstMatchId: null,
    };
  }

  const matchingNodes = graph.nodes.filter((node) => matchesQuery(node, normalizedQuery));
  const matchedNodeIds = matchingNodes.map((node) => node.id);
  const firstMatchId = matchedNodeIds[0] || null;

  if (mode === 'highlight') {
    return {
      graph,
      matchedNodeIds,
      firstMatchId,
    };
  }

  if (matchingNodes.length === 0) {
    return {
      graph: { nodes: [], links: [] },
      matchedNodeIds: [],
      firstMatchId: null,
    };
  }

  const keepIds = new Set<string>();
  matchingNodes.forEach((node) => {
    getNeighborSet(graph, node.id).forEach((id) => keepIds.add(id));
  });

  return {
    graph: {
      nodes: graph.nodes.filter((node) => keepIds.has(node.id)),
      links: graph.links.filter((link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        return keepIds.has(sourceId) && keepIds.has(targetId);
      }),
    },
    matchedNodeIds,
    firstMatchId,
  };
}
