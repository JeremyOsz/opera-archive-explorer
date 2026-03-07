import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalizeLanguage,
  matchesLanguageFilter,
  normalizeLanguageFilterValue,
  toLanguageDisplayName
} from './language-utils';

test('canonicalizeLanguage maps known aliases to canonical names', () => {
  assert.equal(canonicalizeLanguage('ita'), 'italian');
  assert.equal(canonicalizeLanguage('DEU'), 'german');
  assert.equal(canonicalizeLanguage('French'), 'french');
});

test('normalizeLanguageFilterValue returns title-cased canonical language', () => {
  assert.equal(normalizeLanguageFilterValue('rus'), 'Russian');
  assert.equal(normalizeLanguageFilterValue('german'), 'German');
});

test('matchesLanguageFilter supports matching between full names and codes', () => {
  assert.equal(matchesLanguageFilter(['ita', 'eng'], 'Italian'), true);
  assert.equal(matchesLanguageFilter(['deu'], 'German'), true);
  assert.equal(matchesLanguageFilter(['eng'], 'German'), false);
});

test('toLanguageDisplayName normalizes codes and names for UI display', () => {
  assert.equal(toLanguageDisplayName('fra'), 'French');
  assert.equal(toLanguageDisplayName('Russian'), 'Russian');
});
