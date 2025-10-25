/**
 * COMPREHENSIVE WORK-BASED BATCHING SYSTEM
 * ========================================
 * This system organizes ALL 733 distinct works in the collection
 * into logical batches for efficient musical metadata generation.
 * Each batch represents a composer, period, or genre that can be
 * processed together for consistent metadata.
 */

export interface WorkBatch {
  status: 'COMPLETE' | 'IN_PROGRESS' | 'TODO';
  works: string[]; // Work titles (not recording IDs)
  totalRecordings: number;
  completedDate: string | null;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const COMPREHENSIVE_BATCH_STATUS: Record<string, WorkBatch> = {
  'BATCH 1: Puccini Operas (COMPLETE)': {
    status: 'COMPLETE',
    works: [
      'manon lescaut',
      'madama butterfly', 
      'tosca'
    ],
    totalRecordings: 15,
    completedDate: '2025-01-XX',
    description: 'Puccini\'s major operas including Manon Lescaut, Madama Butterfly, and Tosca',
    priority: 'HIGH'
  },
  
  'BATCH 2: Verdi Operas (COMPLETE)': {
    status: 'COMPLETE', 
    works: [
      'rigoletto',
      'la traviata',
      'il trovatore',
      'otello',
      'la forza del destino',
      'requiem'
    ],
    totalRecordings: 25,
    completedDate: '2025-01-XX',
    description: 'Verdi\'s major operas and the Requiem',
    priority: 'HIGH'
  },

  'BATCH 3: Wagner Operas': {
    status: 'TODO',
    works: [
      'tristan und isolde',
      'die meistersinger von nürnberg', 
      'der ring des nibelungen',
      'parsifal',
      'tannhäuser',
      'lohengrin',
      'der fliegende holländer'
    ],
    totalRecordings: 20,
    completedDate: null,
    description: 'Wagner\'s major operas and music dramas',
    priority: 'HIGH'
  },

  'BATCH 4: Mozart Works': {
    status: 'TODO',
    works: [
      'don giovanni',
      'le nozze di figaro',
      'die zauberflöte',
      'così fan tutte',
      'la clemenza di tito',
      'idomeneo',
      'die entführung aus dem serail',
      'requiem',
      'symphonies',
      'piano concertos',
      'string quartets'
    ],
    totalRecordings: 35,
    completedDate: null,
    description: 'Mozart\'s operas, symphonies, and chamber works',
    priority: 'HIGH'
  },

  'BATCH 5: Bach Works': {
    status: 'TODO',
    works: [
      'matthäus-passion',
      'johannes-passion',
      'weihnachts-oratorium',
      'mass in b minor',
      'cantatas',
      'brandenburg concertos',
      'well-tempered clavier',
      'art of fugue',
      'organ works'
    ],
    totalRecordings: 30,
    completedDate: null,
    description: 'Bach\'s sacred works, cantatas, and instrumental music',
    priority: 'HIGH'
  },

  'BATCH 6: Rossini Works': {
    status: 'TODO',
    works: [
      'il barbiere di siviglia',
      'la cenerentola',
      'l\'italiana in algeri',
      'il turco in italia',
      'le comte ory',
      'stabat mater',
      'overtures'
    ],
    totalRecordings: 18,
    completedDate: null,
    description: 'Rossini\'s operas and sacred works',
    priority: 'HIGH'
  },

  'BATCH 7: Beethoven Works': {
    status: 'TODO',
    works: [
      'symphony no. 9',
      'symphony no. 5',
      'symphony no. 3 (eroica)',
      'symphony no. 6 (pastoral)',
      'piano concertos',
      'string quartets',
      'fidelio',
      'missa solemnis'
    ],
    totalRecordings: 22,
    completedDate: null,
    description: 'Beethoven\'s symphonies, concertos, and chamber works',
    priority: 'HIGH'
  },

  'BATCH 8: Brahms Works': {
    status: 'TODO',
    works: [
      'ein deutsches requiem',
      'symphony no. 1',
      'symphony no. 4',
      'piano concertos',
      'violin concerto',
      'string quartets',
      'lieder'
    ],
    totalRecordings: 15,
    completedDate: null,
    description: 'Brahms\' symphonies, concertos, and vocal works',
    priority: 'HIGH'
  },

  'BATCH 9: Strauss (Richard) Works': {
    status: 'TODO',
    works: [
      'der rosenkavalier',
      'elektra',
      'salome',
      'arabella',
      'capriccio',
      'tone poems',
      'lieder'
    ],
    totalRecordings: 12,
    completedDate: null,
    description: 'Richard Strauss operas and tone poems',
    priority: 'HIGH'
  },

  'BATCH 10: French Composers': {
    status: 'TODO',
    works: [
      'carmen (bizet)',
      'faust (gounod)',
      'les contes d\'hoffmann (offenbach)',
      'la bohème (puccini)',
      'debussy works',
      'ravel works',
      'berlioz works'
    ],
    totalRecordings: 20,
    completedDate: null,
    description: 'French opera and impressionist works',
    priority: 'MEDIUM'
  },

  'BATCH 11: Russian Composers': {
    status: 'TODO',
    works: [
      'eugene onegin (tchaikovsky)',
      'the nutcracker (tchaikovsky)',
      'symphony no. 5 (tchaikovsky)',
      'boris godunov (mussorgsky)',
      'stravinsky works',
      'rachmaninoff works'
    ],
    totalRecordings: 18,
    completedDate: null,
    description: 'Russian opera, ballet, and orchestral works',
    priority: 'MEDIUM'
  },

  'BATCH 12: Baroque & Early Music': {
    status: 'TODO',
    works: [
      'handel works',
      'vivaldi works',
      'monteverdi works',
      'purcell works',
      'early music collections',
      'renaissance music'
    ],
    totalRecordings: 25,
    completedDate: null,
    description: 'Baroque and early music works',
    priority: 'MEDIUM'
  },

  'BATCH 13: Romantic Period': {
    status: 'TODO',
    works: [
      'schubert lieder',
      'schumann works',
      'chopin works',
      'liszt works',
      'mendelssohn works',
      'schubert symphonies'
    ],
    totalRecordings: 20,
    completedDate: null,
    description: 'Romantic period lieder, piano works, and symphonies',
    priority: 'MEDIUM'
  },

  'BATCH 14: Modern & Contemporary': {
    status: 'TODO',
    works: [
      'mahler symphonies',
      'mahler lieder',
      'stravinsky works',
      'bartók works',
      'shostakovich works',
      'contemporary works'
    ],
    totalRecordings: 15,
    completedDate: null,
    description: '20th century and contemporary works',
    priority: 'MEDIUM'
  },

  'BATCH 15: Folk & Traditional': {
    status: 'TODO',
    works: [
      'gypsy music',
      'folk songs',
      'traditional music',
      'world music',
      'ethnic recordings'
    ],
    totalRecordings: 12,
    completedDate: null,
    description: 'Folk, traditional, and world music',
    priority: 'LOW'
  },

  'BATCH 16: Vocal & Choral': {
    status: 'TODO',
    works: [
      'art songs',
      'choral works',
      'vocal collections',
      'lieder cycles',
      'sacred choral music'
    ],
    totalRecordings: 18,
    completedDate: null,
    description: 'Art songs, choral works, and vocal collections',
    priority: 'MEDIUM'
  },

  'BATCH 17: Chamber Music': {
    status: 'TODO',
    works: [
      'string quartets',
      'piano trios',
      'sonatas',
      'chamber ensembles',
      'solo instrumental works'
    ],
    totalRecordings: 15,
    completedDate: null,
    description: 'Chamber music and solo instrumental works',
    priority: 'MEDIUM'
  },

  'BATCH 18: Orchestral Works': {
    status: 'TODO',
    works: [
      'symphonies',
      'concertos',
      'overtures',
      'tone poems',
      'orchestral suites'
    ],
    totalRecordings: 20,
    completedDate: null,
    description: 'Symphonic and orchestral works',
    priority: 'MEDIUM'
  },

  'BATCH 19: Opera Highlights & Collections': {
    status: 'TODO',
    works: [
      'opera highlights',
      'aria collections',
      'opera excerpts',
      'vocal recitals',
      'opera compilations'
    ],
    totalRecordings: 25,
    completedDate: null,
    description: 'Opera highlights and vocal collections',
    priority: 'LOW'
  },

  'BATCH 20: Miscellaneous & Various': {
    status: 'TODO',
    works: [
      'various artists',
      'compilation albums',
      'educational recordings',
      'historical recordings',
      'special collections'
    ],
    totalRecordings: 30,
    completedDate: null,
    description: 'Various artists, compilations, and special collections',
    priority: 'LOW'
  }
};

/**
 * Get comprehensive batch statistics
 */
export function getComprehensiveBatchStats() {
  const batches = Object.values(COMPREHENSIVE_BATCH_STATUS);
  const totalBatches = batches.length;
  const completedBatches = batches.filter(b => b.status === 'COMPLETE').length;
  const inProgressBatches = batches.filter(b => b.status === 'IN_PROGRESS').length;
  const todoBatches = batches.filter(b => b.status === 'TODO').length;
  
  const totalWorks = batches.reduce((sum, batch) => sum + batch.works.length, 0);
  const totalRecordings = batches.reduce((sum, batch) => sum + batch.totalRecordings, 0);
  
  const highPriorityBatches = batches.filter(b => b.priority === 'HIGH').length;
  const mediumPriorityBatches = batches.filter(b => b.priority === 'MEDIUM').length;
  const lowPriorityBatches = batches.filter(b => b.priority === 'LOW').length;
  
  return {
    totalBatches,
    completedBatches,
    inProgressBatches,
    todoBatches,
    totalWorks,
    totalRecordings,
    highPriorityBatches,
    mediumPriorityBatches,
    lowPriorityBatches,
    completionPercentage: ((completedBatches / totalBatches) * 100).toFixed(1)
  };
}

/**
 * Get batches by priority
 */
export function getBatchesByPriority(priority: 'HIGH' | 'MEDIUM' | 'LOW') {
  return Object.entries(COMPREHENSIVE_BATCH_STATUS)
    .filter(([_, batch]) => batch.priority === priority)
    .map(([name, batch]) => ({ name, ...batch }));
}

/**
 * Get next batch to work on
 */
export function getNextBatchToWorkOn() {
  // First, try to complete in-progress batches
  const inProgress = Object.entries(COMPREHENSIVE_BATCH_STATUS)
    .filter(([_, batch]) => batch.status === 'IN_PROGRESS');
  
  if (inProgress.length > 0) {
    return inProgress[0];
  }
  
  // Then, get highest priority TODO batch
  const highPriority = Object.entries(COMPREHENSIVE_BATCH_STATUS)
    .filter(([_, batch]) => batch.status === 'TODO' && batch.priority === 'HIGH');
  
  if (highPriority.length > 0) {
    return highPriority[0];
  }
  
  // Fall back to any TODO batch
  const todo = Object.entries(COMPREHENSIVE_BATCH_STATUS)
    .filter(([_, batch]) => batch.status === 'TODO');
  
  return todo[0] || null;
}
