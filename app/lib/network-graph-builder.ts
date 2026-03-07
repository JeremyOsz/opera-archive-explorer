import { LightweightOpera } from './cache-loader';
import { Era } from './discovery-types';
import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface NetworkNode extends SimulationNodeDatum {
  id: string;
  title: string;
  composer?: string;
  subjects: string[];
  languages: string[];
  performers: string[];
  type: 'recording';
  size: number;
  group: number; // For color grouping
  year?: number;
  era?: Era;
  discoveryScore?: number;
  degree?: number;
  /** Set by D3 force simulation */
  x?: number;
  y?: number;
}

export interface NetworkLink extends SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  type: 'subject' | 'composer' | 'language' | 'performer' | 'similar';
  strength: number;
  value: number;
  sharedValue?: string; // What they share (e.g., "Puccini", "Classical", "eng")
}

export interface NetworkGraph {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export type NodeSizeMetric = 'connections' | 'discoveryScore' | 'yearRecency';

/**
 * Extract primary composer from creator field
 */
function extractPrimaryComposer(creator?: string): string | null {
  if (!creator) return null;
  
  const creatorLower = creator.toLowerCase();
  
  // Skip performers/orchestras
  if (
    creatorLower.includes('orchestra') ||
    creatorLower.includes('baritone') ||
    creatorLower.includes('soprano') ||
    creatorLower.includes('tenor') ||
    creatorLower.includes('conductor') ||
    creatorLower.includes('company') ||
    creatorLower.includes('choir') ||
    creatorLower.includes('band')
  ) {
    return null;
  }
  
  // Extract first composer (before comma)
  const primaryComposer = creator.includes(',') 
    ? creator.split(',')[0].trim() 
    : creator.trim();
  
  return primaryComposer || null;
}

/**
 * Extract performers from creator field
 */
function extractPerformers(creator?: string): string[] {
  if (!creator) return [];
  
  const parts = creator.split(',').map(p => p.trim());
  const performers: string[] = [];
  
  // Skip the first part (usually the composer)
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const partLower = part.toLowerCase();
    
    // Include if it looks like a performer/orchestra
    if (
      partLower.includes('orchestra') ||
      partLower.includes('baritone') ||
      partLower.includes('soprano') ||
      partLower.includes('tenor') ||
      partLower.includes('conductor') ||
      partLower.includes('choir') ||
      partLower.includes('band') ||
      partLower.includes('singer') ||
      partLower.includes('symphony') ||
      partLower.includes('philharmonia') ||
      partLower.includes('opera company')
    ) {
      performers.push(part);
    } else if (parts.length > 2 && i > 0) {
      // If there are 3+ parts and this isn't the first, it's likely a performer
      // But be more conservative - only if it's clearly a name (has capital letters)
      if (part.match(/[A-Z]/)) {
        performers.push(part);
      }
    }
  }
  
  return performers;
}

/**
 * Build a network graph from archive works
 * Creates connections based on shared metadata
 * @param connectionType - Filter to only show specific connection type, or 'all' for all types
 */
export function buildNetworkGraph(
  works: LightweightOpera[],
  maxNodes: number = 100,
  minConnections: number = 1,
  connectionType: 'all' | 'subject' | 'composer' | 'language' | 'performer' = 'all'
): NetworkGraph {
  // Sample works if too many (for performance)
  const sampledWorks = works.length > maxNodes 
    ? works.filter((_, i) => i % Math.ceil(works.length / maxNodes) === 0).slice(0, maxNodes)
    : works;

  // Build nodes
  const nodes: NetworkNode[] = sampledWorks.map((work) => {
    const composer = extractPrimaryComposer(work.creator);
    const performers = extractPerformers(work.creator);
    const subjects = work.subject || [];
    const languages = work.language 
      ? work.language.split(',').map(l => l.trim()).filter(Boolean)
      : [];

    // Group by connection type for color coding
    let group = 0;
    if (connectionType === 'composer' && composer) {
      group = composer.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
    } else if (connectionType === 'subject' && subjects.length > 0) {
      group = subjects[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
    } else if (connectionType === 'language' && languages.length > 0) {
      group = languages[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
    } else if (connectionType === 'performer' && performers.length > 0) {
      group = performers[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
    } else if (composer) {
      group = composer.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
    }

    return {
      id: work.identifier,
      title: work.title,
      composer: composer || undefined,
      subjects,
      languages,
      performers,
      type: 'recording',
      size: Math.max(3, Math.min(10, subjects.length + languages.length + (composer ? 1 : 0) + performers.length)),
      group,
      year: work.year,
      era: work.era,
      discoveryScore: work.discoveryScore,
      degree: 0
    };
  });

  // Build links based on shared metadata
  const linkMap = new Map<string, NetworkLink>();

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];
      
      let connectionStrength = 0;
      let linkType: NetworkLink['type'] = 'similar';
      let sharedValue: string | undefined;

      // Check shared subjects/genres
      if (connectionType === 'all' || connectionType === 'subject') {
        const sharedSubjects = nodeA.subjects.filter(s => nodeB.subjects.includes(s));
        if (sharedSubjects.length > 0) {
          connectionStrength += sharedSubjects.length * 2;
          linkType = 'subject';
          sharedValue = sharedSubjects[0]; // Use first shared subject
        }
      }

      // Check shared composer
      if (connectionType === 'all' || connectionType === 'composer') {
        if (nodeA.composer && nodeB.composer && nodeA.composer === nodeB.composer) {
          connectionStrength += 5;
          linkType = 'composer';
          sharedValue = nodeA.composer;
        }
      }

      // Check shared languages
      if (connectionType === 'all' || connectionType === 'language') {
        const sharedLanguages = nodeA.languages.filter(l => nodeB.languages.includes(l));
        if (sharedLanguages.length > 0) {
          connectionStrength += sharedLanguages.length;
          if (linkType === 'similar') {
            linkType = 'language';
            sharedValue = sharedLanguages[0];
          }
        }
      }

      // Check shared performers
      if (connectionType === 'all' || connectionType === 'performer') {
        const sharedPerformers = nodeA.performers.filter(p => nodeB.performers.includes(p));
        if (sharedPerformers.length > 0) {
          connectionStrength += sharedPerformers.length * 3;
          if (linkType === 'similar' || connectionType === 'performer') {
            linkType = 'performer';
            sharedValue = sharedPerformers[0];
          }
        }
      }

      // Only create link if it matches the filter and has meaningful connection
      const shouldCreateLink = connectionType === 'all' 
        ? connectionStrength >= minConnections
        : linkType === connectionType && connectionStrength >= minConnections;

      if (shouldCreateLink) {
        const linkKey = `${nodeA.id}-${nodeB.id}`;
        const existingLink = linkMap.get(linkKey);
        
        if (!existingLink || existingLink.strength < connectionStrength) {
          const link: NetworkLink = {
            source: nodeA.id,
            target: nodeB.id,
            type: linkType,
            strength: connectionStrength,
            value: connectionStrength,
            sharedValue,
          };
          
          linkMap.set(linkKey, link);
        }
      }
    }
  }

  // Convert map to array
  const finalLinks = Array.from(linkMap.values());

  // Filter nodes that have no connections (optional - can keep them for isolated nodes)
  const connectedNodeIds = new Set<string>();
  finalLinks.forEach(link => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    connectedNodeIds.add(sourceId);
    connectedNodeIds.add(targetId);
  });

  // Keep all nodes but mark isolated ones
  const filteredNodes = nodes.filter(node => 
    connectedNodeIds.has(node.id) || nodes.length < 50 // Keep isolated nodes if graph is small
  );

  // Update links to only reference existing nodes
  const filteredLinks = finalLinks.filter(link =>
    filteredNodes.some(n => n.id === (typeof link.source === 'string' ? link.source : link.source.id)) &&
    filteredNodes.some(n => n.id === (typeof link.target === 'string' ? link.target : link.target.id))
  );

  const degrees = new Map<string, number>();
  filteredLinks.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    degrees.set(sourceId, (degrees.get(sourceId) || 0) + 1);
    degrees.set(targetId, (degrees.get(targetId) || 0) + 1);
  });
  filteredNodes.forEach((node) => {
    node.degree = degrees.get(node.id) || 0;
  });

  return {
    nodes: filteredNodes,
    links: filteredLinks,
  };
}

/**
 * Get statistics about the network graph
 */
export function getNetworkStats(graph: NetworkGraph) {
  const nodeCount = graph.nodes.length;
  const linkCount = graph.links.length;
  
  const linkTypes = graph.links.reduce((acc, link) => {
    acc[link.type] = (acc[link.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const composers = new Set(graph.nodes.map(n => n.composer).filter(Boolean));
  const subjects = new Set(graph.nodes.flatMap(n => n.subjects));

  const averageConnections = nodeCount > 0 ? linkCount / nodeCount : 0;
  const density = nodeCount > 1 ? (2 * linkCount) / (nodeCount * (nodeCount - 1)) : 0;

  const adjacency = new Map<string, string[]>();
  graph.nodes.forEach((node) => adjacency.set(node.id, []));
  graph.links.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    adjacency.get(sourceId)?.push(targetId);
    adjacency.get(targetId)?.push(sourceId);
  });

  let componentCount = 0;
  const visited = new Set<string>();
  graph.nodes.forEach((node) => {
    if (visited.has(node.id)) return;
    componentCount += 1;
    const queue = [node.id];
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current || visited.has(current)) continue;
      visited.add(current);
      adjacency.get(current)?.forEach((neighbor) => {
        if (!visited.has(neighbor)) queue.push(neighbor);
      });
    }
  });

  return {
    nodeCount,
    linkCount,
    linkTypes,
    composerCount: composers.size,
    subjectCount: subjects.size,
    averageConnections,
    density,
    componentCount
  };
}
