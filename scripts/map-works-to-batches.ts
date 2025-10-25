/**
 * Map Works to Comprehensive Batches
 * ==================================
 * This script maps all 733 distinct works from the work-lookup
 * to the comprehensive batching system for efficient metadata generation.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface WorkLookupEntry {
  workTitle: string;
  composer: string;
  recordingIdentifiers: string[];
  totalRecordings: number;
  years: string[];
  languages: string[];
  mostRecentIdentifier?: string;
}

interface WorkLookupTable {
  version: string;
  generatedAt: string;
  totalWorks: number;
  totalRecordings: number;
  works: Record<string, WorkLookupEntry>;
}

interface MappedBatch {
  batchName: string;
  works: WorkLookupEntry[];
  totalRecordings: number;
  composers: string[];
  years: string[];
  languages: string[];
}

function loadWorkLookup(): WorkLookupTable {
  const filePath = join(__dirname, '../app/data/work-lookup.json');
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function mapWorksToBatches(): MappedBatch[] {
  const lookup = loadWorkLookup();
  const works = Object.values(lookup.works);
  
  // Define batch mappings based on composer and work characteristics
  const batchMappings: Record<string, (work: WorkLookupEntry) => boolean> = {
    'BATCH 1: Puccini Operas': (work) => 
      work.composer.toLowerCase().includes('puccini') ||
      work.workTitle.toLowerCase().includes('manon lescaut') ||
      work.workTitle.toLowerCase().includes('madama butterfly') ||
      work.workTitle.toLowerCase().includes('tosca'),
      
    'BATCH 2: Verdi Operas': (work) =>
      work.composer.toLowerCase().includes('verdi') ||
      work.workTitle.toLowerCase().includes('rigoletto') ||
      work.workTitle.toLowerCase().includes('la traviata') ||
      work.workTitle.toLowerCase().includes('il trovatore') ||
      work.workTitle.toLowerCase().includes('otello') ||
      work.workTitle.toLowerCase().includes('requiem'),
      
    'BATCH 3: Wagner Operas': (work) =>
      work.composer.toLowerCase().includes('wagner') ||
      work.workTitle.toLowerCase().includes('tristan') ||
      work.workTitle.toLowerCase().includes('meistersinger') ||
      work.workTitle.toLowerCase().includes('ring') ||
      work.workTitle.toLowerCase().includes('parsifal') ||
      work.workTitle.toLowerCase().includes('tannhäuser') ||
      work.workTitle.toLowerCase().includes('lohengrin'),
      
    'BATCH 4: Mozart Works': (work) =>
      work.composer.toLowerCase().includes('mozart') ||
      work.workTitle.toLowerCase().includes('don giovanni') ||
      work.workTitle.toLowerCase().includes('figaro') ||
      work.workTitle.toLowerCase().includes('zauberflöte') ||
      work.workTitle.toLowerCase().includes('così fan tutte') ||
      work.workTitle.toLowerCase().includes('clemenza') ||
      work.workTitle.toLowerCase().includes('idomeneo'),
      
    'BATCH 5: Bach Works': (work) =>
      work.composer.toLowerCase().includes('bach') ||
      work.workTitle.toLowerCase().includes('matthäus') ||
      work.workTitle.toLowerCase().includes('johannes') ||
      work.workTitle.toLowerCase().includes('weihnachts') ||
      work.workTitle.toLowerCase().includes('cantata') ||
      work.workTitle.toLowerCase().includes('brandenburg'),
      
    'BATCH 6: Rossini Works': (work) =>
      work.composer.toLowerCase().includes('rossini') ||
      work.workTitle.toLowerCase().includes('barbiere') ||
      work.workTitle.toLowerCase().includes('cenerentola') ||
      work.workTitle.toLowerCase().includes('italiana') ||
      work.workTitle.toLowerCase().includes('turco') ||
      work.workTitle.toLowerCase().includes('comte ory'),
      
    'BATCH 7: Beethoven Works': (work) =>
      work.composer.toLowerCase().includes('beethoven') ||
      work.workTitle.toLowerCase().includes('symphony no. 9') ||
      work.workTitle.toLowerCase().includes('symphony no. 5') ||
      work.workTitle.toLowerCase().includes('eroica') ||
      work.workTitle.toLowerCase().includes('pastoral') ||
      work.workTitle.toLowerCase().includes('fidelio'),
      
    'BATCH 8: Brahms Works': (work) =>
      work.composer.toLowerCase().includes('brahms') ||
      work.workTitle.toLowerCase().includes('deutsches requiem') ||
      work.workTitle.toLowerCase().includes('symphony no. 1') ||
      work.workTitle.toLowerCase().includes('symphony no. 4'),
      
    'BATCH 9: Strauss (Richard) Works': (work) =>
      work.composer.toLowerCase().includes('strauss') && 
      !work.composer.toLowerCase().includes('johann') ||
      work.workTitle.toLowerCase().includes('rosenkavalier') ||
      work.workTitle.toLowerCase().includes('elektra') ||
      work.workTitle.toLowerCase().includes('salome'),
      
    'BATCH 10: French Composers': (work) =>
      work.composer.toLowerCase().includes('bizet') ||
      work.composer.toLowerCase().includes('gounod') ||
      work.composer.toLowerCase().includes('offenbach') ||
      work.composer.toLowerCase().includes('debussy') ||
      work.composer.toLowerCase().includes('ravel') ||
      work.composer.toLowerCase().includes('berlioz') ||
      work.workTitle.toLowerCase().includes('carmen') ||
      work.workTitle.toLowerCase().includes('faust'),
      
    'BATCH 11: Russian Composers': (work) =>
      work.composer.toLowerCase().includes('tchaikovsky') ||
      work.composer.toLowerCase().includes('mussorgsky') ||
      work.composer.toLowerCase().includes('stravinsky') ||
      work.composer.toLowerCase().includes('rachmaninoff') ||
      work.workTitle.toLowerCase().includes('eugene onegin') ||
      work.workTitle.toLowerCase().includes('nutcracker') ||
      work.workTitle.toLowerCase().includes('boris godunov'),
      
    'BATCH 12: Baroque & Early Music': (work) =>
      work.composer.toLowerCase().includes('handel') ||
      work.composer.toLowerCase().includes('vivaldi') ||
      work.composer.toLowerCase().includes('monteverdi') ||
      work.composer.toLowerCase().includes('purcell') ||
      work.workTitle.toLowerCase().includes('baroque') ||
      work.workTitle.toLowerCase().includes('renaissance'),
      
    'BATCH 13: Romantic Period': (work) =>
      work.composer.toLowerCase().includes('schubert') ||
      work.composer.toLowerCase().includes('schumann') ||
      work.composer.toLowerCase().includes('chopin') ||
      work.composer.toLowerCase().includes('liszt') ||
      work.composer.toLowerCase().includes('mendelssohn') ||
      work.workTitle.toLowerCase().includes('lieder'),
      
    'BATCH 14: Modern & Contemporary': (work) =>
      work.composer.toLowerCase().includes('mahler') ||
      work.composer.toLowerCase().includes('bartók') ||
      work.composer.toLowerCase().includes('shostakovich') ||
      work.workTitle.toLowerCase().includes('contemporary') ||
      work.workTitle.toLowerCase().includes('modern'),
      
    'BATCH 15: Folk & Traditional': (work) =>
      work.workTitle.toLowerCase().includes('gypsy') ||
      work.workTitle.toLowerCase().includes('folk') ||
      work.workTitle.toLowerCase().includes('traditional') ||
      work.workTitle.toLowerCase().includes('ethnic') ||
      work.workTitle.toLowerCase().includes('budapest') ||
      work.workTitle.toLowerCase().includes('polka'),
      
    'BATCH 16: Vocal & Choral': (work) =>
      work.workTitle.toLowerCase().includes('songs') ||
      work.workTitle.toLowerCase().includes('choral') ||
      work.workTitle.toLowerCase().includes('lieder') ||
      work.workTitle.toLowerCase().includes('shakespeare') ||
      work.workTitle.toLowerCase().includes('kipling'),
      
    'BATCH 17: Chamber Music': (work) =>
      work.workTitle.toLowerCase().includes('quartet') ||
      work.workTitle.toLowerCase().includes('trio') ||
      work.workTitle.toLowerCase().includes('sonata') ||
      work.workTitle.toLowerCase().includes('chamber'),
      
    'BATCH 18: Orchestral Works': (work) =>
      work.workTitle.toLowerCase().includes('symphony') ||
      work.workTitle.toLowerCase().includes('concerto') ||
      work.workTitle.toLowerCase().includes('overture') ||
      work.workTitle.toLowerCase().includes('suite'),
      
    'BATCH 19: Opera Highlights & Collections': (work) =>
      work.workTitle.toLowerCase().includes('highlights') ||
      work.workTitle.toLowerCase().includes('excerpts') ||
      work.workTitle.toLowerCase().includes('recital') ||
      work.workTitle.toLowerCase().includes('collection'),
      
    'BATCH 20: Miscellaneous & Various': (work) =>
      work.composer.toLowerCase().includes('various') ||
      work.workTitle.toLowerCase().includes('various') ||
      work.workTitle.toLowerCase().includes('compilation')
  };
  
  const mappedBatches: MappedBatch[] = [];
  
  for (const [batchName, matcher] of Object.entries(batchMappings)) {
    const matchingWorks = works.filter(matcher);
    
    if (matchingWorks.length > 0) {
      const totalRecordings = matchingWorks.reduce((sum, work) => sum + work.totalRecordings, 0);
      const composers = [...new Set(matchingWorks.map(w => w.composer))];
      const years = [...new Set(matchingWorks.flatMap(w => w.years))];
      const languages = [...new Set(matchingWorks.flatMap(w => w.languages))];
      
      mappedBatches.push({
        batchName,
        works: matchingWorks,
        totalRecordings,
        composers,
        years,
        languages
      });
    }
  }
  
  return mappedBatches;
}

function generateBatchReport(): void {
  const mappedBatches = mapWorksToBatches();
  
  let report = 'COMPREHENSIVE WORK BATCHING REPORT\n';
  report += '===================================\n\n';
  
  report += `Total batches: ${mappedBatches.length}\n`;
  report += `Total works mapped: ${mappedBatches.reduce((sum, batch) => sum + batch.works.length, 0)}\n`;
  report += `Total recordings: ${mappedBatches.reduce((sum, batch) => sum + batch.totalRecordings, 0)}\n\n`;
  
  report += 'BATCH DETAILS:\n';
  report += '==============\n\n';
  
  mappedBatches.forEach((batch, index) => {
    report += `${index + 1}. ${batch.batchName}\n`;
    report += `   Works: ${batch.works.length}\n`;
    report += `   Recordings: ${batch.totalRecordings}\n`;
    report += `   Composers: ${batch.composers.slice(0, 3).join(', ')}${batch.composers.length > 3 ? '...' : ''}\n`;
    report += `   Years: ${batch.years.slice(0, 5).join(', ')}${batch.years.length > 5 ? '...' : ''}\n`;
    report += `   Languages: ${batch.languages.slice(0, 3).join(', ')}${batch.languages.length > 3 ? '...' : ''}\n\n`;
    
    // Show sample works
    report += `   Sample works:\n`;
    batch.works.slice(0, 5).forEach(work => {
      report += `     - ${work.workTitle} (${work.composer})\n`;
    });
    if (batch.works.length > 5) {
      report += `     ... and ${batch.works.length - 5} more works\n`;
    }
    report += '\n';
  });
  
  // Write report to file
  writeFileSync('comprehensive-batch-report.txt', report);
  console.log('Comprehensive batch report generated: comprehensive-batch-report.txt');
}

// Run the mapping
if (require.main === module) {
  generateBatchReport();
}

export { mapWorksToBatches, generateBatchReport };
