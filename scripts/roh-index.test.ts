import assert from 'node:assert/strict';
import test from 'node:test';
import { mergeDatasets, partialIndexWarning } from './roh-index';
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

test('partialIndexWarning returns null when performances are intentionally skipped and productions exist', () => {
  const warning = partialIndexWarning(
    emptyDataset({
      productions: [{ id: 'p1', title: 'p', sourceUrl: 'u', metadata: {}, performances: [] }],
      performances: [],
    }),
    { skipPerformances: true }
  );
  assert.equal(warning, null);
});

test('partialIndexWarning returns null for records-only indexing even without productions', () => {
  const warning = partialIndexWarning(
    emptyDataset({
      records: [{ id: 'r1', title: 'r', sourceUrl: 'u', metadata: {} }],
      works: [],
      productions: [],
      performances: [],
    }),
    { recordsOnly: true },
  );
  assert.equal(warning, null);
});

test('mergeDatasets dedupes entities by id across chunks', () => {
  const merged = mergeDatasets([
    emptyDataset({
      records: [{ id: 'r1', title: 'first', sourceUrl: 'u', metadata: {} }],
      works: [{ id: 'w1', title: 'work', sourceUrl: 'u', metadata: {}, productions: [], relatedRecordCollections: [] }],
    }),
    emptyDataset({
      records: [{ id: 'r1', title: 'second', sourceUrl: 'u2', metadata: {} }],
      productions: [{ id: 'p1', title: 'prod', sourceUrl: 'u', metadata: {}, performances: [] }],
      performances: [{ id: 'pf1', title: 'perf', sourceUrl: 'u', metadata: {}, cast: [] }],
    }),
  ]);

  assert.equal(merged.records.length, 1);
  assert.equal(merged.records[0]?.title, 'second');
  assert.equal(merged.works.length, 1);
  assert.equal(merged.productions.length, 1);
  assert.equal(merged.performances.length, 1);
});

