/**
 * IMSLP Static Lookup
 * ===================
 * Static lookup table for common operas and their IMSLP sheet music links
 */

export interface StaticSheetMusicLink {
  title: string;
  composer: string;
  imslpUrl: string;
  catalogNumber?: string;
  workType: string;
}

export class IMSLPStaticLookup {
  private static readonly OPERA_LOOKUP: Record<string, StaticSheetMusicLink[]> = {
    // Puccini Operas
    'madama butterfly': [
      {
        title: 'Madama Butterfly, SC 74',
        composer: 'Puccini, Giacomo',
        imslpUrl: 'https://imslp.org/wiki/Madama_Butterfly%2C_SC_74_%28Puccini%2C_Giacomo%29',
        catalogNumber: 'SC 74',
        workType: 'Opera'
      }
    ],
    'la bohème': [
      {
        title: 'La Bohème, SC 69',
        composer: 'Puccini, Giacomo',
        imslpUrl: 'https://imslp.org/wiki/La_Boh%C3%A8me%2C_SC_69_%28Puccini%2C_Giacomo%29',
        catalogNumber: 'SC 69',
        workType: 'Opera'
      }
    ],
    'tosca': [
      {
        title: 'Tosca, SC 65',
        composer: 'Puccini, Giacomo',
        imslpUrl: 'https://imslp.org/wiki/Tosca%2C_SC_65_%28Puccini%2C_Giacomo%29',
        catalogNumber: 'SC 65',
        workType: 'Opera'
      }
    ],
    'manon lescaut': [
      {
        title: 'Manon Lescaut, SC 64',
        composer: 'Puccini, Giacomo',
        imslpUrl: 'https://imslp.org/wiki/Manon_Lescaut%2C_SC_64_%28Puccini%2C_Giacomo%29',
        catalogNumber: 'SC 64',
        workType: 'Opera'
      }
    ],
    'la fanciulla del west': [
      {
        title: 'La Fanciulla del West, SC 78',
        composer: 'Puccini, Giacomo',
        imslpUrl: 'https://imslp.org/wiki/La_Fanciulla_del_West%2C_SC_78_%28Puccini%2C_Giacomo%29',
        catalogNumber: 'SC 78',
        workType: 'Opera'
      }
    ],
    'turandot': [
      {
        title: 'Turandot, SC 91',
        composer: 'Puccini, Giacomo',
        imslpUrl: 'https://imslp.org/wiki/Turandot%2C_SC_91_%28Puccini%2C_Giacomo%29',
        catalogNumber: 'SC 91',
        workType: 'Opera'
      }
    ],

    // Verdi Operas
    'rigoletto': [
      {
        title: 'Rigoletto',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/Rigoletto_%28Verdi%2C_Giuseppe%29',
        workType: 'Opera'
      }
    ],
    'la traviata': [
      {
        title: 'La Traviata',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/La_Traviata_%28Verdi%2C_Giuseppe%29',
        workType: 'Opera'
      }
    ],
    'il trovatore': [
      {
        title: 'Il Trovatore',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/Il_Trovatore_%28Verdi%2C_Giuseppe%29',
        workType: 'Opera'
      }
    ],
    'otello': [
      {
        title: 'Otello',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/Otello_%28Verdi%2C_Giuseppe%29',
        workType: 'Opera'
      }
    ],
    'falstaff': [
      {
        title: 'Falstaff',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/Falstaff_%28Verdi%2C_Giuseppe%29',
        workType: 'Opera'
      }
    ],
    'la forza del destino': [
      {
        title: 'La Forza del Destino',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/La_Forza_del_Destino_%28Verdi%2C_Giuseppe%29',
        workType: 'Opera'
      }
    ],
    'requiem': [
      {
        title: 'Messa da Requiem',
        composer: 'Verdi, Giuseppe',
        imslpUrl: 'https://imslp.org/wiki/Messa_da_Requiem_%28Verdi%2C_Giuseppe%29',
        workType: 'Requiem'
      }
    ],

    // Wagner Operas
    'tristan und isolde': [
      {
        title: 'Tristan und Isolde, WWV 90',
        composer: 'Wagner, Richard',
        imslpUrl: 'https://imslp.org/wiki/Tristan_und_Isolde%2C_WWV_90_%28Wagner%2C_Richard%29',
        catalogNumber: 'WWV 90',
        workType: 'Opera'
      }
    ],
    'die meistersinger von nürnberg': [
      {
        title: 'Die Meistersinger von Nürnberg, WWV 96',
        composer: 'Wagner, Richard',
        imslpUrl: 'https://imslp.org/wiki/Die_Meistersinger_von_N%C3%BCrnberg%2C_WWV_96_%28Wagner%2C_Richard%29',
        catalogNumber: 'WWV 96',
        workType: 'Opera'
      }
    ],
    'parsifal': [
      {
        title: 'Parsifal, WWV 111',
        composer: 'Wagner, Richard',
        imslpUrl: 'https://imslp.org/wiki/Parsifal%2C_WWV_111_%28Wagner%2C_Richard%29',
        catalogNumber: 'WWV 111',
        workType: 'Opera'
      }
    ],
    'tannhäuser': [
      {
        title: 'Tannhäuser, WWV 70',
        composer: 'Wagner, Richard',
        imslpUrl: 'https://imslp.org/wiki/Tannh%C3%A4user%2C_WWV_70_%28Wagner%2C_Richard%29',
        catalogNumber: 'WWV 70',
        workType: 'Opera'
      }
    ],
    'lohengrin': [
      {
        title: 'Lohengrin, WWV 75',
        composer: 'Wagner, Richard',
        imslpUrl: 'https://imslp.org/wiki/Lohengrin%2C_WWV_75_%28Wagner%2C_Richard%29',
        catalogNumber: 'WWV 75',
        workType: 'Opera'
      }
    ],
    'der fliegende holländer': [
      {
        title: 'Der Fliegende Holländer, WWV 63',
        composer: 'Wagner, Richard',
        imslpUrl: 'https://imslp.org/wiki/Der_Fliegende_Holl%C3%A4nder%2C_WWV_63_%28Wagner%2C_Richard%29',
        catalogNumber: 'WWV 63',
        workType: 'Opera'
      }
    ],

    // Mozart Operas
    'don giovanni': [
      {
        title: 'Don Giovanni, K.527',
        composer: 'Mozart, Wolfgang Amadeus',
        imslpUrl: 'https://imslp.org/wiki/Don_Giovanni%2C_K.527_%28Mozart%2C_Wolfgang_Amadeus%29',
        catalogNumber: 'K.527',
        workType: 'Opera'
      }
    ],
    'le nozze di figaro': [
      {
        title: 'Le Nozze di Figaro, K.492',
        composer: 'Mozart, Wolfgang Amadeus',
        imslpUrl: 'https://imslp.org/wiki/Le_Nozze_di_Figaro%2C_K.492_%28Mozart%2C_Wolfgang_Amadeus%29',
        catalogNumber: 'K.492',
        workType: 'Opera'
      }
    ],
    'die zauberflöte': [
      {
        title: 'Die Zauberflöte, K.620',
        composer: 'Mozart, Wolfgang Amadeus',
        imslpUrl: 'https://imslp.org/wiki/Die_Zauberfl%C3%B6te%2C_K.620_%28Mozart%2C_Wolfgang_Amadeus%29',
        catalogNumber: 'K.620',
        workType: 'Opera'
      }
    ],
    'così fan tutte': [
      {
        title: 'Così fan tutte, K.588',
        composer: 'Mozart, Wolfgang Amadeus',
        imslpUrl: 'https://imslp.org/wiki/Cos%C3%AC_fan_tutte%2C_K.588_%28Mozart%2C_Wolfgang_Amadeus%29',
        catalogNumber: 'K.588',
        workType: 'Opera'
      }
    ],
    'la clemenza di tito': [
      {
        title: 'La Clemenza di Tito, K.621',
        composer: 'Mozart, Wolfgang Amadeus',
        imslpUrl: 'https://imslp.org/wiki/La_Clemenza_di_Tito%2C_K.621_%28Mozart%2C_Wolfgang_Amadeus%29',
        catalogNumber: 'K.621',
        workType: 'Opera'
      }
    ],
    'idomeneo': [
      {
        title: 'Idomeneo, K.366',
        composer: 'Mozart, Wolfgang Amadeus',
        imslpUrl: 'https://imslp.org/wiki/Idomeneo%2C_K.366_%28Mozart%2C_Wolfgang_Amadeus%29',
        catalogNumber: 'K.366',
        workType: 'Opera'
      }
    ],

    // Rossini Operas
    'il barbiere di siviglia': [
      {
        title: 'Il Barbiere di Siviglia',
        composer: 'Rossini, Gioachino',
        imslpUrl: 'https://imslp.org/wiki/Il_Barbiere_di_Siviglia_%28Rossini%2C_Gioachino%29',
        workType: 'Opera'
      }
    ],
    'la cenerentola': [
      {
        title: 'La Cenerentola',
        composer: 'Rossini, Gioachino',
        imslpUrl: 'https://imslp.org/wiki/La_Cenerentola_%28Rossini%2C_Gioachino%29',
        workType: 'Opera'
      }
    ],
    'l\'italiana in algeri': [
      {
        title: 'L\'Italiana in Algeri',
        composer: 'Rossini, Gioachino',
        imslpUrl: 'https://imslp.org/wiki/L%27Italiana_in_Algeri_%28Rossini%2C_Gioachino%29',
        workType: 'Opera'
      }
    ],

    // Bizet Operas
    'carmen': [
      {
        title: 'Carmen',
        composer: 'Bizet, Georges',
        imslpUrl: 'https://imslp.org/wiki/Carmen_%28Bizet%2C_Georges%29',
        workType: 'Opera'
      }
    ],

    // Strauss Operas
    'salome': [
      {
        title: 'Salome, Op.54',
        composer: 'Strauss, Richard',
        imslpUrl: 'https://imslp.org/wiki/Salome%2C_Op.54_%28Strauss%2C_Richard%29',
        catalogNumber: 'Op.54',
        workType: 'Opera'
      }
    ],
    'elektra': [
      {
        title: 'Elektra, Op.58',
        composer: 'Strauss, Richard',
        imslpUrl: 'https://imslp.org/wiki/Elektra%2C_Op.58_%28Strauss%2C_Richard%29',
        catalogNumber: 'Op.58',
        workType: 'Opera'
      }
    ],
    'der rosenkavalier': [
      {
        title: 'Der Rosenkavalier, Op.59',
        composer: 'Strauss, Richard',
        imslpUrl: 'https://imslp.org/wiki/Der_Rosenkavalier%2C_Op.59_%28Strauss%2C_Richard%29',
        catalogNumber: 'Op.59',
        workType: 'Opera'
      }
    ]
  };

  /**
   * Find sheet music links for a work
   */
  static findSheetMusic(workTitle: string, composer?: string): StaticSheetMusicLink[] {
    const normalizedTitle = this.normalizeTitle(workTitle);
    const normalizedComposer = composer ? this.normalizeComposer(composer) : '';
    
    // Try exact match first
    if (this.OPERA_LOOKUP[normalizedTitle]) {
      return this.OPERA_LOOKUP[normalizedTitle];
    }
    
    // Try partial matches
    for (const [key, links] of Object.entries(this.OPERA_LOOKUP)) {
      if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
        return links;
      }
    }
    
    // Try composer-based matching
    if (normalizedComposer) {
      for (const [key, links] of Object.entries(this.OPERA_LOOKUP)) {
        if (links.some(link => 
          this.normalizeComposer(link.composer).includes(normalizedComposer) ||
          normalizedComposer.includes(this.normalizeComposer(link.composer))
        )) {
          return links;
        }
      }
    }
    
    return [];
  }

  /**
   * Normalize title for matching
   */
  private static normalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/^(the|a|an|la|le|les|der|die|das|il|lo|gli|i|gli|le|l')\s+/i, '') // Remove articles
      .replace(/\s*\([^)]*\)\s*$/, '') // Remove parenthetical content
      .replace(/\s*,\s*Op\.\s*\d+.*$/, '') // Remove opus numbers
      .replace(/\s*,\s*K\.\s*\d+.*$/, '') // Remove Köchel numbers
      .replace(/\s*,\s*BWV\s*\d+.*$/, '') // Remove BWV numbers
      .replace(/\s*,\s*SC\s*\d+.*$/, '') // Remove SC numbers
      .replace(/\s*,\s*WWV\s*\d+.*$/, '') // Remove WWV numbers
      .trim();
  }

  /**
   * Normalize composer name for matching
   */
  private static normalizeComposer(composer: string): string {
    return composer
      .toLowerCase()
      .replace(/\s*,\s*.*$/, '') // Remove everything after comma (last name only)
      .trim();
  }

  /**
   * Get all available operas
   */
  static getAllOperas(): string[] {
    return Object.keys(this.OPERA_LOOKUP);
  }

  /**
   * Check if an opera is available
   */
  static hasOpera(title: string): boolean {
    const normalizedTitle = this.normalizeTitle(title);
    return normalizedTitle in this.OPERA_LOOKUP;
  }
}
