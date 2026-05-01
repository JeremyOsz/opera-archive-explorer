import assert from 'node:assert/strict';
import test from 'node:test';
import { partialIndexWarning } from './roh-index';
import type { RohDataset } from '../app/lib/roh/types';

function emptyDataset(overrides: Partial<RohDataset> = {}): RohDataset {
  return {
    records: [],
    works: [],
    productions: [],
    performances: [],
    ...overrides,
  };
}

test('partialIndexWarning returns warning for missing production/performance coverage', () => {
  const warning = partialIndexWarning(
    emptyDataset({
      records: [{ id: 'r1', title: 'r', sourceUrl: 'u', metadata: {} }],
      works: [{ id: 'w1', title: 'w', sourceUrl: 'u', metadata: {}, productions: [], relatedRecordCollections: [] }],
    })
  );
  assert.ok(warning);
  assert.match(warning, /incomplete/i);
});

test('partialIndexWarning returns null for complete entity coverage', () => {
  const warning = partialIndexWarning(
    emptyDataset({
      productions: [{ id: 'p1', title: 'p', sourceUrl: 'u', metadata: {}, performances: [] }],
      performances: [{ id: 'pf1', title: 'pf', sourceUrl: 'u', metadata: {}, cast: [] }],
    })
  );
  assert.equal(warning, null);
});

