import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { flattenRboPublicCatalogue, type RboPublicCatalogueFileJson } from './rbo-public-catalogue';

describe('RBO public catalogue flattening', () => {
  it('adds site envelope and entity metadata for events, digital events, and videos', () => {
    const catalogue: RboPublicCatalogueFileJson = {
      source: 'https://www.rbo.org.uk',
      generatedAt: '2026-05-01T00:00:00.000Z',
      endpoints: { events: '/api/events' },
      counts: { events: 1, digitalEvents: 1, digitalEventVideos: 1 },
      events: [
        {
          type: 'event',
          id: '30681',
          attributes: {
            sourceType: 'event-detail',
            title: 'Sample Tour',
            slug: 'sample-tour',
            description: '<p>Inside the workshop.</p>',
            carouselDescription: '<p>Behind the scenes.</p>',
            dateFieldOverride: '2026-04-01',
            performances: [
              { date: '2026-06-01T12:00:00+01:00', performanceType: 'thurrock' },
              { date: '2026-05-01T12:00:00+01:00', performanceType: 'guided' },
            ],
            isCancelled: false,
            cinemaBroadcastLink: { url: '/cinemas/x' },
            helpInformation: null,
          },
          relationships: {
            tags: { data: [{ type: 'tags', id: '922' }] },
            locations: { data: [{ type: 'locations', id: '0' }] },
          },
        },
      ],
      digitalEvents: [
        {
          type: 'digitalEvent',
          id: 'de-one',
          attributes: {
            slug: 'digital-one',
            title: 'Digital One',
            description: '<p>Full prog.</p>',
            shortDescription: '<p>Short.</p>',
            publishedAt: '2023-01-01T11:22:33',
            guidance: '<p>For all ages</p>',
            availabilityDateFormat: 'date&time',
            assetAvailabilityWindow: { startDateTime: '2023-02-01T00:00:00', endDateTime: null },
            mainVideoFeeId: null,
          },
          relationships: {
            performanceVideo: { data: { type: 'videoInfo', id: 'vi-one' } },
            subtags: { data: [{ type: 'subtags', id: 'insight' }] },
          },
        },
      ],
      digitalEventVideos: [
        {
          type: 'videoInfo',
          id: 'vi-one',
          attributes: {
            title: 'Digital One playback',
            shortDescription: '<p>Night at the ballet.</p>',
            extraVideoType: 'Performance',
            source: {
              id: '1',
              assetType: 'VOD',
              videoType: 'performance',
              videoKey: 'abc_key',
              activityId: '123',
              duration: 471,
              resolution: 'HD',
              performance: { id: '9', activityTitle: 'Nutcracker Suite', archived: false },
            },
          },
          relationships: {
            tags: { data: [{ type: 'tags', id: '922' }] },
          },
        },
      ],
    };

    const rows = flattenRboPublicCatalogue(catalogue);
    assert.equal(rows.length, 3);

    const ev = rows.find((r) => r.id === 'rbo-ev-30681');
    assert.ok(ev);
    assert.equal(ev.metadata.catalogueKind, 'event');
    assert.equal(ev.metadata.siteSource, 'https://www.rbo.org.uk');
    assert.ok(ev.metadata.siteSnapshotAt?.includes('2026-05-01'));
    assert.equal(ev.metadata.performanceTypes, 'guided, thurrock');
    assert.equal(ev.metadata.performanceCount, '2');
    assert.equal(ev.metadata.firstPerformanceAt, '2026-05-01T12:00:00+01:00');
    assert.ok(ev.metadata.cinemaBroadcastUrl?.includes('/cinemas/x'));
    assert.ok(ev.metadata.tagIds?.includes('922'));

    const de = rows.find((r) => r.id === 'rbo-de-de-one');
    assert.ok(de);
    assert.equal(de.metadata.linkedVideoInfoIds, 'vi-one');
    assert.equal(de.metadata.subtagIds, 'insight');

    const vi = rows.find((r) => r.id === 'rbo-vi-vi-one');
    assert.ok(vi);
    assert.equal(vi.metadata.slug, 'digital-one');
    assert.equal(vi.metadata.streamAssetType, 'VOD');
    assert.equal(vi.metadata.streamPerformanceActivityTitle, 'Nutcracker Suite');
    assert.ok(vi.sourceUrl.includes('/stream/digital-one'));
  });
});
