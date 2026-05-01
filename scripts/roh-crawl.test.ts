import assert from 'node:assert/strict';
import test from 'node:test';
import { dequeueNextUrl } from './roh-crawl';

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

