import assert from 'node:assert/strict';
import test from 'node:test';
import {
  dequeueNextUrl,
  initialSeeds,
  isAllowedCrawlUrl,
  isRetryableHttpStatus,
  rehydrateQueueFromManifestLinks,
  shouldSkipCrawlUrl,
} from './roh-crawl';

test('dequeueNextUrl prioritizes entity pages over listing pages', () => {
  const queued = new Set([
    'https://www.rohcollections.org.uk/PerformanceIndex.aspx?genre=All&letter=A',
    'https://www.rohcollections.org.uk/CollectionsROH.aspx',
    'https://www.rohcollections.org.uk/work.aspx?work=123',
  ]);

  const next = dequeueNextUrl(queued);
  assert.equal(next, 'https://www.rohcollections.org.uk/work.aspx?work=123');
});

test('dequeueNextUrl re-sorts each iteration so newly discovered entities fetch sooner', () => {
  const queued = new Set([
    'https://www.rohcollections.org.uk/PerformanceIndex.aspx?genre=All&letter=A',
    'https://www.rohcollections.org.uk/CollectionsROH.aspx',
  ]);

  const first = dequeueNextUrl(queued);
  assert.equal(first, 'https://www.rohcollections.org.uk/PerformanceIndex.aspx?genre=All&letter=A');

  queued.add('https://www.rohcollections.org.uk/production.aspx?production=42');
  const second = dequeueNextUrl(queued);
  assert.equal(second, 'https://www.rohcollections.org.uk/production.aspx?production=42');
});

test('isRetryableHttpStatus matches overload / rate-limit / gateway errors only', () => {
  assert.equal(isRetryableHttpStatus(429), true);
  assert.equal(isRetryableHttpStatus(503), true);
  assert.equal(isRetryableHttpStatus(404), false);
  assert.equal(isRetryableHttpStatus(200), false);
});

test('shouldSkipCrawlUrl skips only performance pages when skip flag is enabled', () => {
  assert.equal(
    shouldSkipCrawlUrl('https://www.rohcollections.org.uk/performance.aspx?performance=123', {
      skipPerformances: true,
      recordsOnly: false,
    }),
    true,
  );
  assert.equal(
    shouldSkipCrawlUrl('https://www.rohcollections.org.uk/production.aspx?production=123', {
      skipPerformances: true,
      recordsOnly: false,
    }),
    false,
  );
  assert.equal(
    shouldSkipCrawlUrl('https://www.rohcollections.org.uk/performance.aspx?performance=123', {
      skipPerformances: false,
      recordsOnly: false,
    }),
    false,
  );
});

test('isAllowedCrawlUrl rejects opera graph URLs in records-only mode', () => {
  assert.equal(
    isAllowedCrawlUrl('https://www.rohcollections.org.uk/work.aspx?work=1', false),
    true,
  );
  assert.equal(
    isAllowedCrawlUrl('https://www.rohcollections.org.uk/work.aspx?work=1', true),
    false,
  );
  assert.equal(
    isAllowedCrawlUrl('https://www.rohcollections.org.uk/record.aspx?ref=1', true),
    true,
  );
  assert.equal(
    isAllowedCrawlUrl('https://www.rohcollections.org.uk/relatedobjects.aspx?production=1&collection=x', true),
    true,
  );
});

test('rehydrateQueueFromManifestLinks refills queue for unfetched children of cached pages', () => {
  const hub = 'https://www.rohcollections.org.uk/CollectionsROH.aspx';
  const listChild = 'https://www.rohcollections.org.uk/SearchResults.aspx?searchtype=collection&collection=z&page=0';
  const entityChild = 'https://www.rohcollections.org.uk/Record.aspx?ref=123';
  const manifest = {
    generatedAt: '',
    crawlDelayMs: 0,
    pages: {
      [hub]: {
        url: hub,
        file: 'a',
        fetchedAt: '',
        status: 200,
        links: [listChild, entityChild],
      },
    },
  };
  const queued = new Set<string>([hub]);
  const entityQueued = new Set<string>();
  const opts = { skipPerformances: true, recordsOnly: true };
  const added = rehydrateQueueFromManifestLinks(manifest, queued, entityQueued, opts);
  assert.equal(added.discoveryAdded, 1);
  assert.equal(added.entityAdded, 1);
  assert.equal(queued.has(listChild), true);
  assert.equal(entityQueued.has(entityChild), true);
});

test('initialSeeds uses only collection hubs in records-only mode', () => {
  assert.equal(initialSeeds(true).length, 3);
  // Full catalog: one PerformanceIndex seed per browse bucket (0-9 + A–Z) plus three collection hubs.
  assert.equal(initialSeeds(false).length, 27 + 3);
});

