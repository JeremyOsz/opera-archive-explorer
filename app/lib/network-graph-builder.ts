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
  normalizedComposer?: string;
  normalizedWorkKey: string;
  subjectsNormalized: string[];
  languagesNormalized: string[];
  performersNormalized: string[];
  /** Set by D3 force simulation */
  x?: number;
  y?: number;
}

export interface NetworkLink extends SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  type: 'subject' | 'composer' | 'language' | 'performer' | 'work' | 'similar';
  strength: number;
  value: number;
  sharedValue?: string; // What they share (e.g., "Puccini", "Classical", "eng")
}

export interface NetworkGraph {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export type NodeSizeMetric = 'connections' | 'discoveryScore' | 'yearRecency';
export type GraphPriorityMode = 'discoveryScore' | 'metadataRichness' | 'yearRecency';
export type GraphEdgeModel = 'hybrid' | 'legacy';

interface GraphBuildOptions {
  priorityMode?: GraphPriorityMode;
  edgeModel?: GraphEdgeModel;
  maxEdgesPerNode?: number;
}

const CREATOR_PERFORMER_HINTS = [
  'orchestra',
  'baritone',
  'soprano',
  'tenor',
  'conductor',
  'company',
  'choir',
  'band',
  'singer',
  'symphony',
  'philharmonia',
  'opera company',
];

const WORK_STOP_WORDS = new Set([
  'act',
  'scene',
  'part',
  'disc',
  'track',
  'live',
  'recording',
  'complete',
  'highlights',
  'opera',
  'edition',
  'version',
]);

function stripDiacritics(input: string): string {
  return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeToken(input?: string): string {
  if (!input) return '';
  return stripDiacritics(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeComposerKey(input?: string): string {
  return normalizeToken(input);
}

export function normalizeWorkKey(input?: string): string {
  if (!input) return '';
  const normalized = normalizeToken(input)
    .split(' ')
    .filter((token) => token && !WORK_STOP_WORDS.has(token) && !/^\d{4}$/.test(token))
    .join(' ')
    .trim();
  return normalized;
}

function getNormalizedArray(items: string[]): string[] {
  return Array.from(
    new Set(
      items
        .map((item) => normalizeToken(item))
        .filter(Boolean)
    )
  );
}

function findOriginalMatch(candidates: string[], normalizedTarget: string): string | undefined {
  return candidates.find((candidate) => normalizeToken(candidate) === normalizedTarget);
}

function isLikelyPerformer(text: string): boolean {
  const lowered = text.toLowerCase();
  return CREATOR_PERFORMER_HINTS.some((hint) => lowered.includes(hint));
}

function extractPrimaryComposer(creator?: string): string | null {
  if (!creator) return null;
  const parts = creator
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (!isLikelyPerformer(part)) {
      return part;
    }
  }
  return null;
}

/**
 * Extract performers from creator field
 */
function extractPerformers(creator?: string): string[] {
  if (!creator) return [];

  const parts = creator
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const performers: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (isLikelyPerformer(part)) {
      performers.push(part);
    }
  }

  return performers;
}

function hashGroup(value: string): number {
  return value
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
}

function getPrimaryComposer(work: LightweightOpera): string | null {
  return work.primaryComposer || extractPrimaryComposer(work.creator);
}

function getMetadataRichnessScore(work: LightweightOpera): number {
  const subjectScore = work.subjectsNormalized?.length || work.subject?.length || 0;
  const languageScore = work.languages?.length || work.language?.split(',').filter(Boolean).length || 0;
  const composerScore = getPrimaryComposer(work) ? 4 : 0;
  const performerScore = extractPerformers(work.creator).length * 2;
  const yearScore = work.year ? 2 : 0;
  const rarityScore = work.rarityBand === 'rare' ? 3 : work.rarityBand === 'uncommon' ? 2 : 0;
  return subjectScore * 2 + languageScore * 2 + composerScore + performerScore + yearScore + rarityScore;
}

function getPriorityScore(work: LightweightOpera, mode: GraphPriorityMode): number {
  if (mode === 'yearRecency') {
    return work.year || 0;
  }
  if (mode === 'metadataRichness') {
    return getMetadataRichnessScore(work);
  }
  return (work.discoveryScore || 0) * 10 + getMetadataRichnessScore(work);
}

function sampleWorksForComposerMode(
  works: LightweightOpera[],
  maxNodes: number,
  priorityMode: GraphPriorityMode
): LightweightOpera[] {
  const byComposer = new Map<string, LightweightOpera[]>();

  works.forEach((work) => {
    const composer = normalizeComposerKey(getPrimaryComposer(work) || '');
    if (!composer) return;
    const group = byComposer.get(composer) || [];
    group.push(work);
    byComposer.set(composer, group);
  });

  const repeatedComposerGroups = Array.from(byComposer.values())
    .filter((group) => group.length > 1)
    .map((group) => [...group].sort((a, b) => getPriorityScore(b, priorityMode) - getPriorityScore(a, priorityMode)))
    .sort((a, b) => b.length - a.length);

  const sampled: LightweightOpera[] = [];
  const selectedIds = new Set<string>();
  const selectedGroupCount = Math.max(1, Math.min(repeatedComposerGroups.length, Math.floor(maxNodes / 2)));
  const prioritizedGroups = repeatedComposerGroups.slice(0, selectedGroupCount);

  for (const group of prioritizedGroups) {
    if (sampled.length >= maxNodes) break;
    const first = group[0];
    if (first && !selectedIds.has(first.identifier)) {
      sampled.push(first);
      selectedIds.add(first.identifier);
    }
    if (sampled.length >= maxNodes) break;
    const second = group[1];
    if (second && !selectedIds.has(second.identifier)) {
      sampled.push(second);
      selectedIds.add(second.identifier);
    }
  }

  let index = 2;
  while (sampled.length < maxNodes && prioritizedGroups.length > 0) {
    let addedInRound = false;
    for (const group of prioritizedGroups) {
      const work = group[index];
      if (!work || selectedIds.has(work.identifier)) continue;
      sampled.push(work);
      selectedIds.add(work.identifier);
      addedInRound = true;
      if (sampled.length >= maxNodes) break;
    }
    if (!addedInRound) break;
    index += 1;
  }

  if (sampled.length < maxNodes) {
    const remaining = [...works]
      .filter((work) => !selectedIds.has(work.identifier))
      .sort((a, b) => getPriorityScore(b, priorityMode) - getPriorityScore(a, priorityMode));
    sampled.push(...remaining.slice(0, maxNodes - sampled.length));
  }

  return sampled.slice(0, maxNodes);
}

function getOverlapCount(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const lookup = new Set(a);
  return b.reduce((count, value) => (lookup.has(value) ? count + 1 : count), 0);
}

function getStrictLink(
  nodeA: NetworkNode,
  nodeB: NetworkNode,
  connectionType: 'subject' | 'composer' | 'language' | 'performer',
  minConnections: number
): NetworkLink | null {
  let strength = 0;
  let sharedValue: string | undefined;

  if (connectionType === 'composer') {
    if (nodeA.normalizedComposer && nodeA.normalizedComposer === nodeB.normalizedComposer) {
      strength = 6;
      sharedValue = nodeA.composer;
    }
  }

  if (connectionType === 'subject') {
    const overlap = nodeA.subjectsNormalized.filter((subject) => nodeB.subjectsNormalized.includes(subject));
    if (overlap.length > 0) {
      strength = overlap.length * 2;
      sharedValue = findOriginalMatch(nodeA.subjects, overlap[0]) || overlap[0];
    }
  }

  if (connectionType === 'language') {
    const overlap = nodeA.languagesNormalized.filter((language) => nodeB.languagesNormalized.includes(language));
    if (overlap.length > 0) {
      strength = overlap.length;
      sharedValue = findOriginalMatch(nodeA.languages, overlap[0]) || overlap[0];
    }
  }

  if (connectionType === 'performer') {
    const overlap = nodeA.performersNormalized.filter((performer) => nodeB.performersNormalized.includes(performer));
    if (overlap.length > 0) {
      strength = overlap.length * 3;
      sharedValue = findOriginalMatch(nodeA.performers, overlap[0]) || overlap[0];
    }
  }

  if (strength < minConnections) return null;

  return {
    source: nodeA.id,
    target: nodeB.id,
    type: connectionType,
    strength,
    value: strength,
    sharedValue,
  };
}

function getLegacyAllLink(nodeA: NetworkNode, nodeB: NetworkNode, minConnections: number): NetworkLink | null {
  let connectionStrength = 0;
  let linkType: NetworkLink['type'] = 'similar';
  let sharedValue: string | undefined;

  const sharedSubjects = nodeA.subjectsNormalized.filter((subject) => nodeB.subjectsNormalized.includes(subject));
  if (sharedSubjects.length > 0) {
    connectionStrength += sharedSubjects.length * 2;
    linkType = 'subject';
    sharedValue = findOriginalMatch(nodeA.subjects, sharedSubjects[0]) || sharedSubjects[0];
  }

  if (nodeA.normalizedComposer && nodeA.normalizedComposer === nodeB.normalizedComposer) {
    connectionStrength += 5;
    linkType = 'composer';
    sharedValue = nodeA.composer;
  }

  const sharedLanguages = nodeA.languagesNormalized.filter((language) => nodeB.languagesNormalized.includes(language));
  if (sharedLanguages.length > 0) {
    connectionStrength += sharedLanguages.length;
    if (linkType === 'similar') {
      linkType = 'language';
      sharedValue = findOriginalMatch(nodeA.languages, sharedLanguages[0]) || sharedLanguages[0];
    }
  }

  const sharedPerformers = nodeA.performersNormalized.filter((performer) => nodeB.performersNormalized.includes(performer));
  if (sharedPerformers.length > 0) {
    connectionStrength += sharedPerformers.length * 3;
    if (linkType === 'similar') {
      linkType = 'performer';
      sharedValue = findOriginalMatch(nodeA.performers, sharedPerformers[0]) || sharedPerformers[0];
    }
  }

  if (connectionStrength < minConnections) return null;

  return {
    source: nodeA.id,
    target: nodeB.id,
    type: linkType,
    strength: connectionStrength,
    value: connectionStrength,
    sharedValue,
  };
}

function getHybridAllLink(nodeA: NetworkNode, nodeB: NetworkNode, minConnections: number): NetworkLink | null {
  let score = 0;
  const contributions: Array<{ type: NetworkLink['type']; score: number; sharedValue?: string }> = [];

  if (nodeA.normalizedComposer && nodeA.normalizedComposer === nodeB.normalizedComposer) {
    const composerScore = 6;
    score += composerScore;
    contributions.push({ type: 'composer', score: composerScore, sharedValue: nodeA.composer });
  }

  if (nodeA.normalizedWorkKey && nodeA.normalizedWorkKey === nodeB.normalizedWorkKey) {
    const workScore = 5;
    score += workScore;
    contributions.push({ type: 'work', score: workScore, sharedValue: nodeA.title });
  }

  const subjectOverlap = getOverlapCount(nodeA.subjectsNormalized, nodeB.subjectsNormalized);
  if (subjectOverlap > 0) {
    const subjectScore = Math.min(6, subjectOverlap * 2);
    score += subjectScore;
    const match = nodeA.subjectsNormalized.find((subject) => nodeB.subjectsNormalized.includes(subject)) || '';
    contributions.push({
      type: 'subject',
      score: subjectScore,
      sharedValue: findOriginalMatch(nodeA.subjects, match) || match,
    });
  }

  const languageOverlap = getOverlapCount(nodeA.languagesNormalized, nodeB.languagesNormalized);
  if (languageOverlap > 0) {
    const languageScore = Math.min(2, languageOverlap);
    score += languageScore;
    const match = nodeA.languagesNormalized.find((language) => nodeB.languagesNormalized.includes(language)) || '';
    contributions.push({
      type: 'language',
      score: languageScore,
      sharedValue: findOriginalMatch(nodeA.languages, match) || match,
    });
  }

  const performerOverlap = getOverlapCount(nodeA.performersNormalized, nodeB.performersNormalized);
  if (performerOverlap > 0) {
    const performerScore = Math.min(6, performerOverlap * 2);
    score += performerScore;
    const match = nodeA.performersNormalized.find((performer) => nodeB.performersNormalized.includes(performer)) || '';
    contributions.push({
      type: 'performer',
      score: performerScore,
      sharedValue: findOriginalMatch(nodeA.performers, match) || match,
    });
  }

  if (nodeA.year && nodeB.year) {
    const yearDelta = Math.abs(nodeA.year - nodeB.year);
    if (yearDelta <= 5) score += 2;
    else if (yearDelta <= 15) score += 1;
  }

  if (score < minConnections) return null;

  const dominantContribution = contributions.sort((a, b) => b.score - a.score)[0];
  const linkType = dominantContribution?.type || 'similar';

  return {
    source: nodeA.id,
    target: nodeB.id,
    type: linkType,
    strength: score,
    value: score,
    sharedValue: dominantContribution?.sharedValue,
  };
}

function pruneLinksByNodeTopK(
  links: NetworkLink[],
  nodes: NetworkNode[],
  maxEdgesPerNode?: number
): NetworkLink[] {
  if (!maxEdgesPerNode || maxEdgesPerNode < 1 || links.length === 0) {
    return links;
  }

  const incident = new Map<string, Array<{ index: number; key: string; strength: number }>>();
  nodes.forEach((node) => incident.set(node.id, []));

  links.forEach((link, index) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    const edgeKey = sourceId < targetId ? `${sourceId}|${targetId}` : `${targetId}|${sourceId}`;
    const descriptor = { index, key: edgeKey, strength: link.strength };
    incident.get(sourceId)?.push(descriptor);
    incident.get(targetId)?.push(descriptor);
  });

  const keep = new Set<number>();
  incident.forEach((descriptors) => {
    descriptors
      .sort((a, b) => b.strength - a.strength || a.key.localeCompare(b.key))
      .slice(0, maxEdgesPerNode)
      .forEach((descriptor) => keep.add(descriptor.index));
  });

  return links.filter((_, index) => keep.has(index));
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
  connectionType: 'all' | 'subject' | 'composer' | 'language' | 'performer' = 'all',
  options: GraphBuildOptions = {}
): NetworkGraph {
  const priorityMode = options.priorityMode || 'discoveryScore';
  const edgeModel = options.edgeModel || (connectionType === 'all' ? 'hybrid' : 'legacy');
  const maxEdgesPerNode = options.maxEdgesPerNode ?? (connectionType === 'all' ? 8 : undefined);

  const sampledWorks =
    connectionType === 'composer'
      ? sampleWorksForComposerMode(works, maxNodes, priorityMode)
      : [...works]
          .sort((a, b) => getPriorityScore(b, priorityMode) - getPriorityScore(a, priorityMode))
          .slice(0, maxNodes);

  const nodes: NetworkNode[] = sampledWorks.map((work) => {
    const composer = getPrimaryComposer(work);
    const performers = extractPerformers(work.creator);
    const subjects = work.subjectsNormalized || work.subject || [];
    const languages = work.languages || (
      work.language
        ? work.language.split(',').map((language) => language.trim()).filter(Boolean)
        : []
    );
    const normalizedComposer = normalizeComposerKey(composer || '');
    const normalizedWorkKey = normalizeWorkKey(work.title);
    const subjectsNormalized = getNormalizedArray(subjects);
    const languagesNormalized = getNormalizedArray(languages);
    const performersNormalized = getNormalizedArray(performers);

    let group = 0;
    if (connectionType === 'composer' && normalizedComposer) {
      group = hashGroup(normalizedComposer);
    } else if (connectionType === 'subject' && subjectsNormalized.length > 0) {
      group = hashGroup(subjectsNormalized[0]);
    } else if (connectionType === 'language' && languagesNormalized.length > 0) {
      group = hashGroup(languagesNormalized[0]);
    } else if (connectionType === 'performer' && performersNormalized.length > 0) {
      group = hashGroup(performersNormalized[0]);
    } else if (normalizedComposer) {
      group = hashGroup(normalizedComposer);
    } else if (subjectsNormalized.length > 0) {
      group = hashGroup(subjectsNormalized[0]);
    } else if (languagesNormalized.length > 0) {
      group = hashGroup(languagesNormalized[0]);
    } else if (normalizedWorkKey) {
      group = hashGroup(normalizedWorkKey);
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
      degree: 0,
      normalizedComposer: normalizedComposer || undefined,
      normalizedWorkKey,
      subjectsNormalized,
      languagesNormalized,
      performersNormalized,
    };
  });

  const rawLinks: NetworkLink[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      let link: NetworkLink | null = null;

      if (connectionType === 'all') {
        link = edgeModel === 'legacy'
          ? getLegacyAllLink(nodeA, nodeB, minConnections)
          : getHybridAllLink(nodeA, nodeB, minConnections);
      } else {
        link = getStrictLink(nodeA, nodeB, connectionType, minConnections);
      }

      if (link) {
        rawLinks.push(link);
      }
    }
  }

  const links = pruneLinksByNodeTopK(rawLinks, nodes, maxEdgesPerNode);

  const degrees = new Map<string, number>();
  links.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    degrees.set(sourceId, (degrees.get(sourceId) || 0) + 1);
    degrees.set(targetId, (degrees.get(targetId) || 0) + 1);
  });

  const nodesWithDegrees = nodes.map((node) => ({
    ...node,
    degree: degrees.get(node.id) || 0,
  }));

  return {
    nodes: nodesWithDegrees,
    links,
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

  const composers = new Set(graph.nodes.map((node) => node.composer).filter(Boolean));
  const subjects = new Set(graph.nodes.flatMap((node) => node.subjects));

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
    componentCount,
  };
}
