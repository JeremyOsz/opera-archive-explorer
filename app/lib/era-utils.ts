import { Era } from './discovery-types';

interface EraInput {
  composer?: string;
  title?: string;
  subjects?: string[];
  year?: number;
}

const COMPOSER_TO_ERA: Record<string, Era> = {
  'johann sebastian bach': 'baroque',
  'georg friedrich handel': 'baroque',
  'george frideric handel': 'baroque',
  'claudio monteverdi': 'baroque',
  'henry purcell': 'baroque',
  'alessandro scarlatti': 'baroque',
  'jean-baptiste lully': 'baroque',
  'antonio vivaldi': 'baroque',
  'wolfgang amadeus mozart': 'classical',
  'christoph willibald gluck': 'classical',
  'joseph haydn': 'classical',
  'gioachino rossini': 'romantic',
  'gaetano donizetti': 'romantic',
  'vincenzo bellini': 'romantic',
  'giuseppe verdi': 'romantic',
  'richard wagner': 'romantic',
  'pyotr ilyich tchaikovsky': 'romantic',
  'peter ilich tchaikovsky': 'romantic',
  'giacomo puccini': 'romantic',
  'jules massenet': 'romantic',
  'richard strauss': 'modern',
  'claude debussy': 'modern',
  'maurice ravel': 'modern',
  'igor stravinsky': 'modern',
  'modest mussorgsky': 'romantic',
  'dmitri shostakovich': 'modern',
  'sergei prokofiev': 'modern',
  'benjamin britten': 'modern',
  'arnold schoenberg': 'modern',
  'alban berg': 'modern',
  'philip glass': 'contemporary',
  'john adams': 'contemporary',
  'thomas ades': 'contemporary'
};

function includesAny(value: string, needles: string[]): boolean {
  return needles.some((needle) => value.includes(needle));
}

function inferFromSubjects(subjects: string[]): Era | undefined {
  const joined = subjects.map((entry) => entry.toLowerCase()).join(' ');

  if (includesAny(joined, ['contemporary', 'postmodern', '21st century', '21st-century'])) return 'contemporary';
  if (includesAny(joined, ['neo-classical', 'neoclassical', 'impressionist', 'modernist', '20th century', '20th-century', 'modern'])) return 'modern';
  if (includesAny(joined, ['romantic', 'bel canto', 'verismo', 'late romantic', 'neo-romantic'])) return 'romantic';
  if (includesAny(joined, ['classical', 'galant', 'rococo'])) return 'classical';
  if (includesAny(joined, ['baroque', 'renaissance', 'early music'])) return 'baroque';

  return undefined;
}

function inferFromComposer(composer?: string): Era | undefined {
  if (!composer) return undefined;
  const normalized = composer.toLowerCase();

  for (const [name, era] of Object.entries(COMPOSER_TO_ERA)) {
    if (normalized.includes(name)) {
      return era;
    }
  }
  return undefined;
}

function inferFromTitle(title?: string): Era | undefined {
  if (!title) return undefined;
  const normalized = title.toLowerCase();

  if (includesAny(normalized, ['baroque'])) return 'baroque';
  if (includesAny(normalized, ['bel canto', 'verismo'])) return 'romantic';
  if (includesAny(normalized, ['modern', 'contemporary'])) return 'modern';
  return undefined;
}

function inferFromYear(year?: number): Era | undefined {
  if (!year) return undefined;
  if (year <= 1750) return 'baroque';
  if (year <= 1820) return 'classical';
  if (year <= 1915) return 'romantic';
  if (year <= 1990) return 'modern';
  return 'contemporary';
}

export function inferOperaEra({ composer, title, subjects = [], year }: EraInput): Era {
  return (
    inferFromSubjects(subjects) ||
    inferFromComposer(composer) ||
    inferFromTitle(title) ||
    inferFromYear(year) ||
    'unknown'
  );
}

export function getEraLabel(era: Era): string {
  if (era === 'baroque') return 'Baroque';
  if (era === 'classical') return 'Classical';
  if (era === 'romantic') return 'Romantic';
  if (era === 'modern') return 'Modern';
  if (era === 'contemporary') return 'Contemporary';
  return 'Unknown';
}
