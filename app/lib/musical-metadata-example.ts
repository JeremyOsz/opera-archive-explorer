/**
 * Musical Metadata Library - Usage Examples
 * 
 * This file demonstrates how to use the MusicalMetadataLibrary to get
 * enhanced musical information about works in the archive cache.
 */

import { MusicalMetadataLibrary } from './musical-metadata';

/**
 * Example 1: Get musical metadata for a single work
 */
export function exampleGetSingleWork() {
  const identifier = 'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d';
  
  const work = MusicalMetadataLibrary.getMusicalMetadata(identifier);
  
  if (work) {
    console.log('Title:', work.title);
    console.log('Overall Key:', work.musicalMetadata.overallKey);
    console.log('Overall Tempo:', work.musicalMetadata.overallTempo, 'BPM');
    console.log('Genre:', work.musicalMetadata.genre.join(', '));
    console.log('Instrumentation:', work.musicalMetadata.instrumentation.join(', '));
    console.log('Mood:', work.musicalMetadata.mood.join(', '));
    
    console.log('\nMovements:');
    work.musicalMetadata.movements.forEach(movement => {
      console.log(`  ${movement.movementNumber}. ${movement.title}`);
      console.log(`     Key: ${movement.key}, Tempo: ${movement.tempo} BPM (${movement.tempoMarking})`);
      console.log(`     Duration: ${movement.duration}, Time Signature: ${movement.timeSignature}`);
      console.log(`     Mood: ${movement.musicalElements.mood.join(', ')}`);
      console.log('');
    });
    
    console.log('\nMusical Analysis:');
    console.log('  Harmonic Complexity:', work.musicalMetadata.musicalAnalysis.harmonicComplexity);
    console.log('  Melodic Style:', work.musicalMetadata.musicalAnalysis.melodicStyle);
  }
}

/**
 * Example 2: Get musical metadata for multiple works
 */
export function exampleGetMultipleWorks() {
  const identifiers = [
    'lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d',
    'lp_tosca_puccini',
    'lp_rigoletto_maria-callas-giuseppe-di-stefano-tito-g'
  ];
  
  const works = MusicalMetadataLibrary.getMusicalMetadataBatch(identifiers);
  
  console.log(`Found ${works.length} works with musical metadata`);
  
  works.forEach(work => {
    console.log(`\n${work.title}`);
    console.log(`  Key: ${work.musicalMetadata.overallKey}`);
    console.log(`  Tempo: ${work.musicalMetadata.overallTempo} BPM`);
    console.log(`  Movements: ${work.musicalMetadata.movements.length}`);
  });
}

/**
 * Example 3: Search works with musical metadata filters
 */
export function exampleSearchWithMetadata() {
  // Search for works by title
  const resultsByTitle = MusicalMetadataLibrary.searchWithMusicalMetadata({
    title: 'Tosca'
  });
  
  console.log(`Found ${resultsByTitle.length} works matching "Tosca"`);
  
  // Search for works by creator
  const resultsByCreator = MusicalMetadataLibrary.searchWithMusicalMetadata({
    creator: 'Verdi'
  });
  
  console.log(`Found ${resultsByCreator.length} works by Verdi`);
  
  resultsByCreator.forEach(work => {
    console.log(`  ${work.title} - ${work.musicalMetadata.overallKey} (${work.musicalMetadata.overallTempo} BPM)`);
  });
}

/**
 * Example 4: Analyze movements and tempos
 */
export function exampleAnalyzeMovements() {
  const work = MusicalMetadataLibrary.getMusicalMetadata('lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d');
  
  if (work && work.musicalMetadata.movements.length > 0) {
    console.log(`Analysis of ${work.title}:`);
    console.log(`Total Movements: ${work.musicalMetadata.movements.length}`);
    
    const tempos = work.musicalMetadata.movements.map(m => m.tempo);
    const averageTempo = Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length);
    const minTempo = Math.min(...tempos);
    const maxTempo = Math.max(...tempos);
    
    console.log(`Tempo Range: ${minTempo} - ${maxTempo} BPM (Average: ${averageTempo} BPM)`);
    
    const totalDuration = work.musicalMetadata.movements.reduce((total, movement) => {
      const [minutes, seconds] = movement.duration.split(':').map(Number);
      return total + minutes * 60 + seconds;
    }, 0);
    
    const hours = Math.floor(totalDuration / 3600);
    const mins = Math.floor((totalDuration % 3600) / 60);
    
    console.log(`Total Duration: ${hours}:${mins.toString().padStart(2, '0')}`);
    
    console.log('\nKey Progressions:');
    work.musicalMetadata.movements.forEach(movement => {
      console.log(`  ${movement.movementNumber}. ${movement.key}`);
    });
  }
}

/**
 * Example 5: Filter works by musical characteristics
 */
export function exampleFilterByMusicalCharacter() {
  const allVerdiWorks = MusicalMetadataLibrary.searchWithMusicalMetadata({
    creator: 'Verdi'
  });
  
  // Find complex harmonic works
  const complexWorks = allVerdiWorks.filter(
    work => work.musicalMetadata.musicalAnalysis.harmonicComplexity === 'complex'
  );
  
  console.log(`Found ${complexWorks.length} complex harmonic works by Verdi`);
  
  complexWorks.forEach(work => {
    console.log(`  ${work.title} - ${work.musicalMetadata.overallKey}`);
  });
  
  // Find dramatic melodic style works
  const dramaticWorks = allVerdiWorks.filter(
    work => work.musicalMetadata.musicalAnalysis.melodicStyle === 'dramatic'
  );
  
  console.log(`\nFound ${dramaticWorks.length} dramatic works by Verdi`);
}

/**
 * Example 6: Build a musical analysis report
 */
export function exampleBuildAnalysisReport() {
  const work = MusicalMetadataLibrary.getMusicalMetadata('lp_la-boheme_giacomo-puccini-maria-callas-giuseppe-d');
  
  if (work) {
    const report = {
      title: work.title,
      creator: work.creator,
      summary: {
        key: work.musicalMetadata.overallKey,
        tempo: work.musicalMetadata.overallTempo,
        duration: work.musicalMetadata.duration,
        movements: work.musicalMetadata.movements.length
      },
      style: {
        genre: work.musicalMetadata.genre,
        mood: work.musicalMetadata.mood,
        instrumentation: work.musicalMetadata.instrumentation
      },
      analysis: {
        harmonic: work.musicalMetadata.musicalAnalysis.harmonicComplexity,
        melodic: work.musicalMetadata.musicalAnalysis.melodicStyle,
        timeSignature: work.musicalMetadata.musicalAnalysis.timeSignature
      },
      movements: work.musicalMetadata.movements.map(m => ({
        title: m.title,
        key: m.key,
        tempo: m.tempo,
        duration: m.duration,
        elements: m.musicalElements
      }))
    };
    
    console.log(JSON.stringify(report, null, 2));
  }
}
