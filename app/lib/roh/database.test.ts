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
  source: 'https://library.roh.org.uk',
  generatedAt: '2026-05-01T12:45:35.377Z',
  collectionCount: 1,
  assetCount: 1,
  collections: [
    {
      id: '47604b21-c326-4a91-987cfb88603f0db5',
      title: 'Siegfried - Press selection',
      description: 'Press pack photos',
      expectedFileCount: 18,
      fetchedFileCount: 18,
      isReadonly: false,
      publicUrl: 'https://library.roh.org.uk/web/47604',
      assets: [
        {
          id: 'FA4667F8-10E3-4F80-AE813563AB68E31C',
          name: 'Elisabet Strid as Brünnhilde in Siegfried',
          tags: ['Richard Wagner'],
          extension: ['jpg'],
          webUrl: 'https://library.roh.org.uk/files/x',
          dateCreated: '2026-03-17T10:55:59Z',
          appCodes: ['IB'],
          orientation: 'landscape',
          fileSize: 1024,
          isArchived: false,
          hasAdditionalFiles: false,
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
    assert.equal(wagnerAssets.items[0]?.metadata.siteSource, 'https://library.roh.org.uk');
    assert.ok(wagnerAssets.items[0]?.metadata.siteSnapshotAt?.includes('2026-05-01'));
    assert.equal(wagnerAssets.items[0]?.metadata.collectionDescription, 'Press pack photos');
    assert.equal(wagnerAssets.items[0]?.metadata.appCodes, 'IB');

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

  it('computes facet counts from currently available filtered results', () => {
    const index = createRohJsonIndex(dataset);
    const combinedOpts = { assetData: assetFixture, rboCatalogue: null } as const;

    const filteredByCollectionSource = searchCombinedRoh(
      index,
      { query: '', source: RohDataSources.collections },
      combinedOpts,
    );
    assert.equal(filteredByCollectionSource.total, 4);
    assert.equal(
      filteredByCollectionSource.facets.sources.find((bucket) => bucket.value === RohDataSources.collections)?.count,
      4,
    );
    assert.equal(
      filteredByCollectionSource.facets.sources.find((bucket) => bucket.value === RohDataSources.assetLibrary)?.count,
      1,
    );
    assert.equal(
      filteredByCollectionSource.facets.collections.some((bucket) => bucket.value === 'Siegfried - Press selection'),
      false,
    );

    const filteredByCollection = searchCombinedRoh(
      index,
      { query: '', source: RohDataSources.collections, collection: 'Attilio Comelli Design Collection' },
      combinedOpts,
    );
    assert.equal(filteredByCollection.total, 1);
    assert.equal(filteredByCollection.facets.creators[0]?.value, 'Attilio Comelli');
  });

  it('falls back to safe pagination defaults for invalid limit/offset values', () => {
    const index = createRohJsonIndex(dataset);
    const combinedOpts = { assetData: assetFixture, rboCatalogue: null } as const;

    const result = searchCombinedRoh(index, { query: '', limit: Number.NaN, offset: Number.NaN }, combinedOpts);
    assert.equal(result.total, 5);
    assert.equal(result.items.length, 5);
  });

  it('applies date range filtering consistently across mixed date formats', () => {
    const index = createRohJsonIndex({
      ...dataset,
      records: [
        ...dataset.records,
        {
          id: 'r-bad-date',
          title: 'Undated season leaflet',
          sourceUrl: 'https://www.rohcollections.org.uk/record.aspx?ref=r-bad-date',
          date: 'Spring Season',
          metadata: {},
        },
      ],
    });
    const combinedOpts = { assetData: assetFixture, rboCatalogue: null } as const;

    const in1949 = searchCombinedRoh(
      index,
      { query: '', dateFrom: '1949-01-01', dateTo: '1949-12-31' },
      combinedOpts,
    );
    assert.equal(in1949.total, 2);
    assert.deepEqual(
      in1949.items.map((item) => item.type).sort(),
      ['performance', 'production'],
    );

    const in1903 = searchCombinedRoh(index, { query: '', dateFrom: '1903-01-01', dateTo: '1903-12-31' }, combinedOpts);
    assert.equal(in1903.total, 1);
    assert.equal(in1903.items[0]?.id, '5306');

    const upTo19490511 = searchCombinedRoh(index, { query: '', dateTo: '1949-05-11' }, combinedOpts);
    assert.equal(upTo19490511.items.some((item) => item.id === '10388'), false);
    assert.equal(upTo19490511.items.some((item) => item.id === '1621'), false);
  });

  it('enriches empty work and record metadata from known fields', () => {
    const index = createRohJsonIndex({
      ...dataset,
      records: [
        ...dataset.records,
        {
          id: 'r-enrich',
          title: 'Sketch for Hall of Valhalla',
          collection: 'Design Collection',
          objectNumber: 'ROH/SKETCH/0001',
          date: '1902',
          description: 'Pencil sketch for stage elevation.',
          creator: 'Anonymous Workshop',
          dimensions: '20 x 30 cm',
          condition: 'Fair',
          sourceUrl: 'https://www.rohcollections.org.uk/record.aspx?ref=r-enrich',
          metadata: {},
        },
      ],
      works: [
        ...dataset.works,
        {
          id: 'w-enrich',
          title: 'Example Opera',
          genre: 'Opera',
          composer: 'Jane Composer',
          librettist: 'John Librettist',
          musicTitle: 'Example Opera',
          language: 'Italian',
          workDefinition: 'Opera in three acts',
          titleNotes: 'Early title variant',
          notes: 'Created for testing',
          worldPremiere: '1901',
          rohPremiere: '1903',
          rohCompanyPremiere: '1904',
          sourceUrl: 'https://www.rohcollections.org.uk/work.aspx?work=w-enrich',
          metadata: {},
          productions: [],
          relatedRecordCollections: [],
        },
      ],
    });

    const enrichedRecord = index.dataset.records.find((record) => record.id === 'r-enrich');
    assert.equal(enrichedRecord?.metadata.Collection, 'Design Collection');
    assert.equal(enrichedRecord?.metadata['Object number'], 'ROH/SKETCH/0001');
    assert.equal(enrichedRecord?.metadata.Creator, 'Anonymous Workshop');
    assert.equal(enrichedRecord?.metadata.Description, 'Pencil sketch for stage elevation.');

    const enrichedWork = index.dataset.works.find((work) => work.id === 'w-enrich');
    assert.equal(enrichedWork?.metadata.Composer, 'Jane Composer');
    assert.equal(enrichedWork?.metadata.Librettist, 'John Librettist');
    assert.equal(enrichedWork?.metadata.Language, 'Italian');
    assert.equal(enrichedWork?.metadata['World premiere'], '1901');
    assert.equal(enrichedWork?.metadata['ROH company premiere'], '1904');
  });

  it('does not overwrite existing metadata entries during enrichment', () => {
    const index = createRohJsonIndex({
      ...dataset,
      works: [
        {
          ...dataset.works[0],
          metadata: {
            Composer: 'Already Curated',
          },
        },
      ],
    });

    const work = index.dataset.works[0];
    assert.equal(work.metadata.Composer, 'Already Curated');
    assert.equal(work.metadata.Language, 'German');
  });

  it('enriches production and performance metadata from known fields', () => {
    const index = createRohJsonIndex({
      ...dataset,
      productions: [
        {
          id: 'p-enrich',
          workId: '553',
          title: 'Example Production',
          company: 'Test Company',
          productionPremiere: '10 June 1950',
          producer: 'Test Producer',
          costumeDesigner: 'Test Designer',
          notes: 'Revival staging',
          sourceUrl: 'https://www.rohcollections.org.uk/production.aspx?production=p-enrich',
          metadata: {},
          performances: [],
        },
      ],
      performances: [
        {
          id: 'pf-enrich',
          productionId: 'p-enrich',
          title: 'Example Production-10 June 1950 Evening',
          date: '10 June 1950',
          session: 'Evening',
          venue: 'Royal Opera House',
          company: 'Test Company',
          status: 'Complete',
          conductor: 'Test Conductor',
          leader: 'Test Leader',
          sourceUrl: 'https://www.rohcollections.org.uk/performance.aspx?performance=pf-enrich',
          metadata: {},
          cast: [],
        },
      ],
    });

    const enrichedProduction = index.dataset.productions[0];
    assert.equal(enrichedProduction.metadata.Company, 'Test Company');
    assert.equal(enrichedProduction.metadata['Production premiere'], '10 June 1950');
    assert.equal(enrichedProduction.metadata.Producer, 'Test Producer');
    assert.equal(enrichedProduction.metadata['Costume designer'], 'Test Designer');
    assert.equal(enrichedProduction.metadata.Notes, 'Revival staging');

    const enrichedPerformance = index.dataset.performances[0];
    assert.equal(enrichedPerformance.metadata.Venue, 'Royal Opera House');
    assert.equal(enrichedPerformance.metadata.Company, 'Test Company');
    assert.equal(enrichedPerformance.metadata['Performance status'], 'Complete');
    assert.equal(enrichedPerformance.metadata.Conductor, 'Test Conductor');
    assert.equal(enrichedPerformance.metadata.Leader, 'Test Leader');
    assert.equal(enrichedPerformance.metadata.Session, 'Evening');
  });
});
