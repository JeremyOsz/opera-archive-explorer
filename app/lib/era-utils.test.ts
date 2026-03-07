import test from 'node:test';
import assert from 'node:assert/strict';
import { getEraLabel, inferOperaEra } from './era-utils';

test('inferOperaEra prefers subject-based period classification', () => {
  assert.equal(
    inferOperaEra({
      subjects: ['Opera', 'Bel Canto'],
      composer: 'Unknown Composer',
      year: 1960
    }),
    'romantic'
  );
});

test('inferOperaEra maps known opera composers to historical periods', () => {
  assert.equal(inferOperaEra({ composer: 'Giuseppe Verdi' }), 'romantic');
  assert.equal(inferOperaEra({ composer: 'Wolfgang Amadeus Mozart' }), 'classical');
  assert.equal(inferOperaEra({ composer: 'Johann Sebastian Bach' }), 'baroque');
});

test('inferOperaEra falls back to unknown when metadata is insufficient', () => {
  assert.equal(inferOperaEra({}), 'unknown');
});

test('getEraLabel formats era values for UI', () => {
  assert.equal(getEraLabel('baroque'), 'Baroque');
  assert.equal(getEraLabel('contemporary'), 'Contemporary');
});
