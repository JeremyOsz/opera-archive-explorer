import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { RohAssetStoreFileJson } from './asset-store';
import { createRohJsonIndex, searchCombinedRoh, searchRohIndex } from './database';
import { RohDataSources, RohDataset } from './types';

const dataset: RohDataset = {
  records: [
    {
      id: '5306',
      title: "Signed costume design - Froh in 'Das Rheingold'",
      collection: 'Attilio Comelli Design Collection',
      objectNumber: 'ROH/COM/DES/COS/0012',
      date: '1903',
      description: 'Watercolour and pencil design for Froh.',
      creator: 'Attilio Comelli',
      imageUrl: 'https://www.rohcollections.org.uk/Roh_Images/main/67/5306_17567.jpg',
      thumbnailUrl: 'https://www.rohcollections.org.uk/Roh_Images/thumb/67/5306_17567.jpg',
      sourceUrl: 'https://www.rohcollections.org.uk/record.aspx?ref=5306',
      metadata: { Condition: 'Good.' },
      relatedWorkId: '553',
    },
  ],
  works: [
    {
      id: '553',
      title: 'Das Rheingold',
      genre: 'Opera',
      composer: 'Richard Wagner',
      language: 'German',
      sourceUrl: 'https://www.rohcollections.org.uk/work.aspx?work=553',
      metadata: {},
      productions: [],
      relatedRecordCollections: [],
    },
  ],
  productions: [
    {
      id: '1621',
      workId: '553',
      title: 'Das Rheingold (1949)',
      company: 'Covent Garden Opera Company',
      productionPremiere: '12 May 1949',
      sourceUrl: 'https://www.rohcollections.org.uk/production.aspx?production=1621',
      metadata: {},
      performances: [],
    },
  ],
  performances: [
    {
      id: '10388',
      productionId: '1621',
      title: 'Das Rheingold-12 May 1949 Evening',
      date: '12 May 1949',
      session: 'Evening',
      venue: 'Royal Opera House, Covent Garden, London',
      company: 'Covent Garden Opera Company',
      conductor: 'Karl Rankl',
      sourceUrl: 'https://www.rohcollections.org.uk/performance.aspx?performance=10388',
      metadata: {},
      cast: [
        { performanceId: '10388', role: 'Wotan', performer: 'Hans Hotter' },
        { performanceId: '10388', role: 'Froh', performer: 'Edgar Evans' },
      ],
    },
  ],
};

const assetFixture: RohAssetStoreFileJson = {
  collections: [
    {
      id: '47604b21-c326-4a91-987cfb88603f0db5',
      title: 'Siegfried - Press selection',
      publicUrl: 'https://library.roh.org.uk/web/47604',
      assets: [
        {
          id: 'FA4667F8-10E3-4F80-AE813563AB68E31C',
          name: 'Elisabet Strid as Brünnhilde in Siegfried',
          tags: ['Richard Wagner'],
          extension: ['jpg'],
          webUrl: 'https://library.roh.org.uk/files/x',
          dateCreated: '2026-03-17T10:55:59Z',
        },
      ],
    },
  ],
};

describe('ROH JSON index', () => {
  it('searches across records, works, productions, performances, and cast', () => {
    const index = createRohJsonIndex(dataset);

    const comelliHit = searchRohIndex(index, { query: 'Comelli' }).items[0];
    assert.equal(comelliHit?.type, 'record');
    assert.equal(comelliHit?.source, RohDataSources.collections);
    assert.deepEqual(searchRohIndex(index, { query: 'Wagner' }).items.map((item) => item.type), ['work']);
    assert.deepEqual(searchRohIndex(index, { query: 'Rankl' }).items.map((item) => item.type), ['performance']);
    assert.deepEqual(searchRohIndex(index, { query: 'Hotter' }).items.map((item) => item.type), ['performance']);
  });

  it('supports facets and record type filtering', () => {
    const index = createRohJsonIndex(dataset);

    const allResults = searchRohIndex(index, { query: '' });
    assert.equal(allResults.total, 4);
    assert.equal(allResults.facets.sources[0]?.value, RohDataSources.collections);
    assert.equal(allResults.facets.sources[0]?.count, 4);
    assert.equal(allResults.facets.collections[0].value, 'Attilio Comelli Design Collection');
    assert.equal(allResults.facets.genres[0].value, 'Opera');
    assert.equal(allResults.facets.companies[0].value, 'Covent Garden Opera Company');

    const performances = searchRohIndex(index, { query: '', type: 'performance' });
    assert.deepEqual(performances.items.map((item) => item.id), ['10388']);
  });

  it('merges digital library asset rows into combined search', () => {
    const index = createRohJsonIndex(dataset);

    const combinedOpts = { assetData: assetFixture, rboCatalogue: null } as const;
    const combined = searchCombinedRoh(index, { query: '' }, combinedOpts);
    assert.equal(combined.total, 5);
    assert.ok(combined.facets.sources.some((bucket) => bucket.value === RohDataSources.assetLibrary));
    assert.ok(combined.facets.sources.some((bucket) => bucket.value === RohDataSources.collections));

    const wagnerAssets = searchCombinedRoh(
      index,
      { query: 'wagner', type: 'asset' },
      combinedOpts,
    );
    assert.equal(wagnerAssets.total, 1);
    assert.equal(wagnerAssets.items[0]?.type, 'asset');
    assert.equal(wagnerAssets.items[0]?.source, RohDataSources.assetLibrary);
    assert.equal(wagnerAssets.items[0]?.id, 'FA4667F8-10E3-4F80-AE813563AB68E31C');

    const assetSourceOnly = searchCombinedRoh(
      index,
      { query: 'wagner', source: RohDataSources.assetLibrary },
      combinedOpts,
    );
    assert.equal(assetSourceOnly.total, 1);

    const archivesOnlyWorks = searchCombinedRoh(
      index,
      { query: 'wagner', type: 'record' },
      combinedOpts,
    );
    assert.equal(archivesOnlyWorks.total, 0);
  });
});
