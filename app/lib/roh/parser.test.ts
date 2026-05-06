import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  parseCollectionResultsPage,
  parsePerformanceIndexPage,
  parsePerformancePage,
  parseProductionPage,
  parseRecordPage,
  parseWorkPage,
} from './parser';

const fixtureDir = join(process.cwd(), 'tests', 'fixtures', 'roh');

function fixture(name: string): string {
  return readFileSync(join(fixtureDir, name), 'utf8');
}

describe('ROH parser', () => {
  it('extracts collection record metadata and related work links', () => {
    const record = parseRecordPage(
      fixture('record-5306.html'),
      'https://www.rohcollections.org.uk/record.aspx?ref=5306&collection=Attilio%20Comelli%20Design%20Collection&row=7&searchtype=collection'
    );

    assert.equal(record.id, '5306');
    assert.equal(record.title, "Signed and dated costume design by Attilio Comelli - Froh in 'Das Rheingold'");
    assert.equal(record.collection, 'Attilio Comelli Design Collection');
    assert.equal(record.objectNumber, 'ROH/COM/DES/COS/0012');
    assert.equal(record.date, '1903');
    assert.equal(record.creator, 'Attilio Comelli');
    assert.equal(record.relatedWorkId, '553');
    assert.equal(record.imageUrl, 'https://www.rohcollections.org.uk/Roh_Images/main/67/5306_17567.jpg');
  });

  it('extracts work details, production links, and related record collections', () => {
    const work = parseWorkPage(fixture('work-553.html'), 'https://www.rohcollections.org.uk/work.aspx?work=553');

    assert.equal(work.id, '553');
    assert.equal(work.title, 'Das Rheingold');
    assert.equal(work.genre, 'Opera');
    assert.equal(work.composer, 'Richard Wagner');
    assert.equal(work.language, 'German');
    assert.equal(work.relatedWorkId, '7966');
    assert.deepEqual(work.productions.map((production) => production.id), ['1621']);
    assert.deepEqual(work.relatedRecordCollections.map((record) => record.collection), [
      'Attilio Comelli Design Collection',
      'Technical Equipment Collection',
    ]);
  });

  it('extracts production details and performance links', () => {
    const production = parseProductionPage(
      fixture('production-1621.html'),
      'https://www.rohcollections.org.uk/production.aspx?production=1621&row=0'
    );

    assert.equal(production.id, '1621');
    assert.equal(production.workId, '553');
    assert.equal(production.title, 'Das Rheingold (1949)');
    assert.equal(production.company, 'Covent Garden Opera Company');
    assert.equal(production.productionPremiere, '12 May 1949');
    assert.equal(production.performances[0].id, '10388');
    assert.equal(production.performances[0].venue, 'Royal Opera House, Covent Garden, London');
  });

  it('extracts performance details and cast rows', () => {
    const performance = parsePerformancePage(
      fixture('performance-10388.html'),
      'https://www.rohcollections.org.uk/performance.aspx?performance=10388&row=0'
    );

    assert.equal(performance.id, '10388');
    assert.equal(performance.productionId, '1621');
    assert.equal(performance.company, 'Covent Garden Opera Company');
    assert.equal(performance.conductor, 'Karl Rankl');
    assert.deepEqual(
      performance.cast.map((castMember) => [castMember.role, castMember.performer]),
      [
        ['Wotan', 'Hans Hotter'],
        ['Froh', 'Edgar Evans'],
        ['', 'The Covent Garden Orchestra'],
      ]
    );
  });

  it('extracts performance index work seeds', () => {
    const seeds = parsePerformanceIndexPage(
      fixture('performance-index-a.html'),
      'https://www.rohcollections.org.uk/performanceindex.aspx?genre=All&letter=A'
    );

    assert.deepEqual(seeds.map((seed) => [seed.id, seed.genre, seed.title, seed.creator]), [
      ['553', 'Opera', 'Aida', 'Giuseppe Verdi'],
      ['9', 'Ballet', 'A new pas de deux', 'Kenneth MacMillan'],
    ]);
  });

  it('extracts collection result seeds and next page', () => {
    const results = parseCollectionResultsPage(
      fixture('collection-results.html'),
      'https://www.rohcollections.org.uk/SearchResults.aspx?searchtype=collection&collection=Technical+Equipment+Collection&page=0'
    );

    assert.equal(results.total, 24);
    assert.equal(results.records[0].id, '17745');
    assert.equal(results.records[0].title, 'Four metal rope brakes');
    assert.equal(results.records[0].objectNumber, 'ROH/TEC/EQU/001');
    assert.equal(
      results.nextPageUrl,
      'https://www.rohcollections.org.uk/SearchResults.aspx?searchtype=collection&collection=Technical+Equipment+Collection&page=1'
    );
  });
});
