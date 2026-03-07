import test from 'node:test';
import assert from 'node:assert/strict';
import { LightweightOpera } from '@/app/lib/cache-loader';
import {
  buildNetworkGraph,
  normalizeComposerKey,
  normalizeWorkKey,
} from '@/app/lib/network-graph-builder';
import { applyNetworkSearch } from '@/app/lib/network-search';

function createWork(overrides: Partial<LightweightOpera> & Pick<LightweightOpera, 'identifier' | 'title'>): LightweightOpera {
  return {
    identifier: overrides.identifier,
    title: overrides.title,
    creator: overrides.creator,
    year: overrides.year,
    primaryComposer: overrides.primaryComposer,
    languages: overrides.languages,
    subjectsNormalized: overrides.subjectsNormalized,
    discoveryScore: overrides.discoveryScore,
    composerWorkCount: overrides.composerWorkCount,
    rarityBand: overrides.rarityBand,
    language: overrides.language,
    subject: overrides.subject,
  };
}

function getLink(graph: ReturnType<typeof buildNetworkGraph>, idA: string, idB: string) {
  return graph.links.find((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    return (
      (sourceId === idA && targetId === idB) ||
      (sourceId === idB && targetId === idA)
    );
  });
}

test('hybrid all-mode creates cross-composer links by shared work/metadata', () => {
  const works = [
    createWork({
      identifier: 'w1',
      title: "La Bohème (Live Recording)",
      primaryComposer: 'Giacomo Puccini',
      subjectsNormalized: ['opera'],
      languages: ['ita'],
      year: 1950,
      discoveryScore: 82,
    }),
    createWork({
      identifier: 'w2',
      title: 'La Boheme',
      primaryComposer: 'Renata Scotto',
      subjectsNormalized: ['opera'],
      languages: ['ita'],
      year: 1952,
      discoveryScore: 74,
    }),
    createWork({
      identifier: 'w3',
      title: 'Stabat Mater',
      primaryComposer: 'Gioachino Rossini',
      subjectsNormalized: ['oratorio'],
      languages: ['lat'],
      year: 1948,
      discoveryScore: 66,
    }),
  ];

  const graph = buildNetworkGraph(works, 10, 3, 'all', {
    edgeModel: 'hybrid',
    maxEdgesPerNode: 8,
  });

  const bridgeLink = getLink(graph, 'w1', 'w2');
  assert.ok(bridgeLink, 'expected shared-work cross-composer link to exist');
  assert.ok(bridgeLink!.strength >= 5, 'expected link strength to include work-level weighting');
  assert.equal(bridgeLink!.type, 'work');
});

test('composer mode sampling stays composer-constrained but avoids collapse', () => {
  const uniqueWorks = Array.from({ length: 12 }).map((_, index) =>
    createWork({
      identifier: `u${index}`,
      title: `Unique Work ${index}`,
      primaryComposer: `Unique Composer ${index}`,
      discoveryScore: 100 - index,
      subjectsNormalized: ['opera'],
      languages: ['eng'],
    })
  );

  const repeatedWorks = [
    createWork({ identifier: 'a1', title: 'A Work I', primaryComposer: 'Composer A', discoveryScore: 20 }),
    createWork({ identifier: 'a2', title: 'A Work II', primaryComposer: 'Composer A', discoveryScore: 19 }),
    createWork({ identifier: 'a3', title: 'A Work III', primaryComposer: 'Composer A', discoveryScore: 18 }),
    createWork({ identifier: 'b1', title: 'B Work I', primaryComposer: 'Composer B', discoveryScore: 20 }),
    createWork({ identifier: 'b2', title: 'B Work II', primaryComposer: 'Composer B', discoveryScore: 19 }),
    createWork({ identifier: 'b3', title: 'B Work III', primaryComposer: 'Composer B', discoveryScore: 18 }),
  ];

  const graph = buildNetworkGraph([...uniqueWorks, ...repeatedWorks], 12, 1, 'composer', {
    priorityMode: 'discoveryScore',
  });

  const composerCounts = new Map<string, number>();
  graph.nodes.forEach((node) => {
    const key = (node.composer || '').toLowerCase();
    if (!key) return;
    composerCounts.set(key, (composerCounts.get(key) || 0) + 1);
  });

  assert.ok(graph.links.length > 0, 'expected composer mode to retain repeated-composer links');
  assert.ok(
    (composerCounts.get('composer a') || 0) > 1 || (composerCounts.get('composer b') || 0) > 1,
    'expected repeated composer nodes in sampled graph'
  );
});

test('top-K edge pruning is deterministic and preserves node set', () => {
  const denseWorks = Array.from({ length: 20 }).map((_, index) =>
    createWork({
      identifier: `d${index}`,
      title: `Dense Work ${index}`,
      primaryComposer: index % 2 === 0 ? 'Composer A' : 'Composer B',
      subjectsNormalized: ['opera', 'classical'],
      languages: ['eng', 'ita'],
      year: 1950 + index,
      discoveryScore: 90 - index,
    })
  );

  const pruned = buildNetworkGraph(denseWorks, 20, 2, 'all', {
    edgeModel: 'hybrid',
    maxEdgesPerNode: 2,
  });
  const unpruned = buildNetworkGraph(denseWorks, 20, 2, 'all', {
    edgeModel: 'hybrid',
    maxEdgesPerNode: 10,
  });

  assert.equal(pruned.nodes.length, unpruned.nodes.length);
  assert.ok(pruned.links.length < unpruned.links.length);
});

test('normalization handles punctuation and diacritics consistently', () => {
  assert.equal(
    normalizeComposerKey('Georg Friedrich Händel'),
    normalizeComposerKey('georg friedrich handel')
  );
  assert.equal(
    normalizeWorkKey("L'Amour de Carmen (Live Recording)"),
    normalizeWorkKey('L amour de carmen')
  );
});

test('highlight search returns matches without reducing graph size', () => {
  const works = [
    createWork({
      identifier: 's1',
      title: 'La Traviata',
      primaryComposer: 'Giuseppe Verdi',
      subjectsNormalized: ['opera'],
      languages: ['ita'],
    }),
    createWork({
      identifier: 's2',
      title: 'Rigoletto',
      primaryComposer: 'Giuseppe Verdi',
      subjectsNormalized: ['opera'],
      languages: ['ita'],
    }),
    createWork({
      identifier: 's3',
      title: 'Don Giovanni',
      primaryComposer: 'Wolfgang Amadeus Mozart',
      subjectsNormalized: ['opera'],
      languages: ['ita'],
    }),
  ];

  const graph = buildNetworkGraph(works, 10, 1, 'all', {
    edgeModel: 'hybrid',
    maxEdgesPerNode: 8,
  });

  const highlighted = applyNetworkSearch(graph, 'traviata', 'highlight');
  const filtered = applyNetworkSearch(graph, 'traviata', 'filter');

  assert.equal(highlighted.graph.nodes.length, graph.nodes.length);
  assert.ok(highlighted.matchedNodeIds.length > 0);
  assert.ok(filtered.graph.nodes.length <= graph.nodes.length);
});
