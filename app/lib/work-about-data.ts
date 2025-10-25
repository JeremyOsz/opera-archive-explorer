import { NotablePerformance } from './metadata/types';
import { getWorkMusicalMetadata } from './metadata';

export interface WorkAboutInfo {
  description: string;
  history: string;
  themes: string[];
  trivia: string[];
  notablePerformances?: NotablePerformance[];
}

export interface WorkAboutData {
  [workTitle: string]: WorkAboutInfo;
}

/**
 * Work-level information for specific operas
 * This provides contextual information about the works themselves, not specific recordings
 */
export const WORK_ABOUT_DATA: WorkAboutData = {
  'madama butterfly': {
    description: 'Puccini\'s tragic masterpiece about a young Japanese geisha who falls in love with an American naval officer, only to be abandoned. The opera is renowned for its beautiful arias and dramatic intensity, particularly the famous "Un bel dì vedremo" (One fine day).',
    history: 'Premiered at La Scala in Milan in 1904, the opera was initially a failure. Puccini revised it multiple times before it achieved success. The work was inspired by John Luther Long\'s short story and David Belasco\'s play, introducing Western audiences to Japanese themes at a time when Japonisme was fashionable.',
    themes: [
      'Love and Betrayal',
      'Cultural Clash',
      'The Price of Devotion',
      'Loss of Innocence',
      'West Meets East'
    ],
    trivia: [
      'The original version was in two acts and was a complete failure at its premiere, being booed by the audience.',
      'Puccini revised it into three acts and made five different versions before the final 1907 version we know today.',
      'The opera features authentic Japanese folk songs, particularly in the first act.',
      'Butterfly\'s suicide is one of opera\'s most famous and tragic moments.',
      'The "Humming Chorus" is one of the most famous orchestral interludes in all of opera.'
    ],
    notablePerformances: [
      {
        year: 1904,
        conductor: 'Cleofonte Campanini',
        orchestra: 'La Scala Orchestra',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Rosina Storchio', role: 'Cio-Cio-San (Butterfly)' },
          { name: 'Giovanni Zenatello', role: 'Pinkerton' }
        ],
        significance: 'World premiere that initially failed but became a masterpiece',
        historicalContext: 'The premiere was a disaster due to poor preparation, but Puccini revised the work and it became one of his greatest successes.',
        notes: 'The original version was in two acts; Puccini later split it into three acts for better dramatic flow.'
      },
      {
        year: 1974,
        conductor: 'Herbert von Karajan',
        orchestra: 'Vienna Philharmonic',
        venue: 'Salzburg Festival',
        singers: [
          { name: 'Mirella Freni', role: 'Cio-Cio-San (Butterfly)' },
          { name: 'Luciano Pavarotti', role: 'Pinkerton' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording is considered one of the finest interpretations of the work, featuring two of the greatest voices of the era.',
        recordingLabel: 'Decca',
        notes: 'Freni\'s Butterfly is considered definitive, combining vocal perfection with deep emotional understanding of the character.'
      }
    ]
  },
  'la boheme': {
    description: 'Puccini\'s beloved opera about a group of struggling artists in 19th-century Paris. The story centers on the romance between Rodolfo, a poet, and Mimì, a seamstress, and their bohemian friends Marcello, Musetta, Colline, and Schaunard.',
    history: 'Premiered in Turin in 1896, conducted by Arturo Toscanini. Based on Henri Murger\'s novel "Scènes de la vie de bohème," the opera combines comedy and tragedy in equal measure. Despite initial mixed reviews, it quickly became one of the most popular operas ever written.',
    themes: [
      'Youth and Idealism',
      'Poverty and Art',
      'Love and Loss',
      'Friendship',
      'The Bohemian Life'
    ],
    trivia: [
      'Puccini and Leoncavallo both wrote operas based on Murger\'s novel at the same time, causing a bitter rivalry.',
      'Puccini\'s version premiered just 18 months before Leoncavallo\'s, but Puccini\'s became the enduring favorite.',
      'The famous aria "Che gelida manina" (Your tiny hand is frozen) is Rodolfo\'s first meeting with Mimì.',
      'Act II\'s Café Momus scene is one of the most spectacular crowd scenes in opera.',
      'The opera takes place over several months, from Christmas Eve to spring.',
      'Jonathan Larson\'s musical "Rent" is loosely based on La Bohème.'
    ],
    notablePerformances: [
      {
        year: 1896,
        conductor: 'Arturo Toscanini',
        orchestra: 'Teatro Regio Orchestra',
        venue: 'Teatro Regio, Turin',
        singers: [
          { name: 'Evan Gorga', role: 'Rodolfo' },
          { name: 'Cesira Ferrani', role: 'Mimì' },
          { name: 'Antonio Pini-Corsi', role: 'Marcello' },
          { name: 'Camilla Pasini', role: 'Musetta' }
        ],
        significance: 'World premiere of Puccini\'s beloved opera',
        historicalContext: 'This premiere established La Bohème as one of the most popular operas ever written, despite initial mixed reviews.',
        notes: 'Toscanini was only 29 when he conducted this premiere, beginning his legendary career.'
      },
      {
        year: 1956,
        conductor: 'Thomas Beecham',
        orchestra: 'Royal Philharmonic Orchestra',
        venue: 'Kingsway Hall, London',
        singers: [
          { name: 'Jussi Björling', role: 'Rodolfo' },
          { name: 'Victoria de los Ángeles', role: 'Mimì' },
          { name: 'Robert Merrill', role: 'Marcello' },
          { name: 'Lucine Amara', role: 'Musetta' }
        ],
        significance: 'Legendary recording considered definitive',
        historicalContext: 'This recording features some of the greatest voices of the era in their prime.',
        recordingLabel: 'EMI',
        notes: 'Björling\'s Rodolfo and de los Ángeles\' Mimì are considered among the finest interpretations ever recorded.'
      }
    ]
  },
  'rigoletto': {
    description: 'Verdi\'s dark tragedy about a court jester who seeks revenge after his daughter is seduced by his lecherous master, the Duke of Mantua. The opera features some of Verdi\'s most famous music, including the ubiquitous "La donna è mobile."',
    history: 'Premiered in Venice in 1851 at the Teatro La Fenice. The opera was initially controversial due to its depiction of debauchery and political corruption, leading to censorship issues. Based on Victor Hugo\'s play "Le Roi s\'amuse," Verdi fought with censors to keep the story intact.',
    themes: [
      'Justice and Revenge',
      'Paternal Love',
      'Corruption of Power',
      'Innocence and Temptation',
      'Fate and Curses'
    ],
    trivia: [
      'The famous curse that Monterone places on Rigoletto is central to the plot and provides much of the opera\'s dramatic tension.',
      'Verdi kept the melody for "La donna è mobile" secret even from the tenor until the final dress rehearsal.',
      'Gilda is one of the most demanding soprano roles in opera, requiring both coloratura and dramatic skills.',
      'The opera was originally going to be called "La maledizione" (The Curse).',
      'Rigoletto\'s deformity and his dual nature (funny jester, loving father) make him one of opera\'s most complex characters.'
    ],
    notablePerformances: [
      {
        year: 1851,
        conductor: 'Luigi Ricci',
        orchestra: 'Teatro La Fenice Orchestra',
        venue: 'Teatro La Fenice, Venice',
        singers: [
          { name: 'Raffaele Mirate', role: 'Duke of Mantua' },
          { name: 'Felice Varesi', role: 'Rigoletto' },
          { name: 'Teresa Brambilla', role: 'Gilda' }
        ],
        significance: 'World premiere of Verdi\'s revolutionary opera',
        historicalContext: 'This was Verdi\'s first major success after a period of struggle, establishing him as the leading Italian composer of his time.',
        notes: 'The premiere was a triumph, with the famous quartet becoming one of the most celebrated moments in opera.'
      },
      {
        year: 1955,
        conductor: 'Tullio Serafin',
        orchestra: 'Orchestra of La Scala',
        venue: 'La Scala, Milan',
        singers: [
          { name: 'Maria Callas', role: 'Gilda' },
          { name: 'Giuseppe Di Stefano', role: 'Duke of Mantua' },
          { name: 'Tito Gobbi', role: 'Rigoletto' }
        ],
        significance: 'Legendary recording with dream cast',
        historicalContext: 'This recording features three of the greatest singers of the 20th century in their prime.',
        recordingLabel: 'EMI',
        notes: 'Callas\'s Gilda is considered definitive, combining vocal perfection with deep emotional understanding.'
      }
    ]
  },
  'manon lescaut': {
    description: 'Puccini\'s first major success tells the story of Manon, a young woman torn between love and luxury, and her devoted lover Des Grieux. The opera combines French elegance with Italian passion, featuring some of Puccini\'s most beautiful melodies.',
    history: 'Premiered in Turin in 1893, this was Puccini\'s third opera and established him as a major composer. Based on Abbé Prévost\'s novel "L\'Histoire du Chevalier des Grieux et de Manon Lescaut," it had been previously set by Massenet just a few years earlier.',
    themes: [
      'Desire vs. Duty',
      'Materialism and Wealth',
      'Unconditional Love',
      'Redemption',
      'The Power of Forgiveness'
    ],
    trivia: [
      'Puccini\'s version focuses more on the love story than Massenet\'s, emphasizing the passionate relationship between Manon and Des Grieux.',
      'The opera is unusual for not having the typical "women\'s chorus" - the only female role is Manon herself.',
      'Manon\'s death scene in the Louisiana desert is one of opera\'s most moving and tragic finales.',
      'Puccini was only 35 when this opera premiered, establishing him as the successor to Verdi.',
      'The opera made its debut in America at the Metropolitan Opera in 1907 with Enrico Caruso as Des Grieux.',
      'Manon Lescaut is unique among Puccini operas for not having a "big aria" for the tenor - Des Grieux\'s music is more integrated into ensembles.'
    ]
  },
  'tosca': {
    description: 'Verdi\'s intense drama of love, jealousy, and political intrigue in 1800 Rome. The story follows the singer Floria Tosca, her lover the painter Mario Cavaradossi, and the villainous chief of police Baron Scarpia in a tale of oppression and resistance.',
    history: 'Premiered in Rome in 1900 at the Teatro Costanzi. Based on Victorien Sardou\'s play "La Tosca," Puccini saw Sarah Bernhardt perform it and was determined to create an opera version. The premiere was delayed due to fears of political unrest (the opera features themes of resistance to authority).',
    themes: [
      'Political Oppression',
      'Jealousy and Passion',
      'Art and Freedom',
      'Betrayal and Trust',
      'Suffering and Sacrifice'
    ],
    trivia: [
      'The opera is noted for its "reality effect" - Puccini insisted on using real church bells in the first act.',
      'The three acts take place in three real Roman locations: Sant\'Andrea della Valle church, the Palazzo Farnese, and the Castel Sant\'Angelo.',
      'Tosca\'s suicide jump from Castel Sant\'Angelo is one of opera\'s most dramatic endings.',
      'Scarpia is one of opera\'s most villainous characters - a sadistic police chief who lusts after Tosca.',
      '"Vissi d\'arte" (I lived for art) is one of Tosca\'s most famous arias, showing her questioning her faith.',
      'The opera\'s plot famously includes torture, murder, and suicide all within a few hours.'
    ]
  }
};

/**
 * Get about information for a work
 */
export function getWorkAboutInfo(workTitle: string): WorkAboutInfo | null {
  const normalized = normalizeTitle(workTitle);
  const baseInfo = WORK_ABOUT_DATA[normalized];
  
  if (!baseInfo) return null;
  
  // Try to get notable performances from musical metadata
  const notablePerformances = getNotablePerformancesForWork(workTitle);
  
  return {
    ...baseInfo,
    notablePerformances: notablePerformances.length > 0 ? notablePerformances : undefined
  };
}

/**
 * Get notable performances for a work from musical metadata
 */
export function getNotablePerformancesForWork(workTitle: string): NotablePerformance[] {
  // For now, we'll use the notable performances that are directly embedded in the work-about-data
  // In the future, this could be enhanced to look up from musical metadata by work title
  const normalized = normalizeTitle(workTitle);
  const baseInfo = WORK_ABOUT_DATA[normalized];
  
  if (baseInfo && baseInfo.notablePerformances) {
    return baseInfo.notablePerformances;
  }
  
  return [];
}

/**
 * Check if about information exists for a work
 */
export function hasWorkAboutInfo(workTitle: string): boolean {
  const normalized = normalizeTitle(workTitle);
  return normalized in WORK_ABOUT_DATA;
}

/**
 * Normalize work title for lookup
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .trim();
}

/**
 * Get all works with about information
 */
export function getWorksWithAboutInfo(): string[] {
  return Object.keys(WORK_ABOUT_DATA);
}
