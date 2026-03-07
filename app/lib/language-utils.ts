const LANGUAGE_ALIASES: Record<string, string[]> = {
  italian: ['italian', 'ita', 'it'],
  french: ['french', 'fre', 'fra', 'fr'],
  german: ['german', 'ger', 'deu', 'de'],
  russian: ['russian', 'rus', 'ru'],
  english: ['english', 'eng', 'en'],
  spanish: ['spanish', 'spa', 'es'],
  portuguese: ['portuguese', 'por', 'pt'],
  latin: ['latin', 'lat', 'la'],
  hungarian: ['hungarian', 'hun', 'hu'],
  bulgarian: ['bulgarian', 'bul', 'bg'],
  czech: ['czech', 'ces', 'cze', 'cs'],
  polish: ['polish', 'pol', 'pl'],
  dutch: ['dutch', 'nld', 'dut', 'nl']
};

const TOKEN_TO_CANONICAL = new Map<string, string>();

for (const [canonical, aliases] of Object.entries(LANGUAGE_ALIASES)) {
  aliases.forEach((alias) => {
    TOKEN_TO_CANONICAL.set(alias, canonical);
  });
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

function titleCase(value: string): string {
  if (!value) return value;
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

export function canonicalizeLanguage(value: string): string {
  const token = normalizeToken(value);
  return TOKEN_TO_CANONICAL.get(token) || token;
}

export function normalizeLanguageFilterValue(value: string): string {
  if (!value) return '';
  return titleCase(canonicalizeLanguage(value));
}

export function matchesLanguageFilter(workLanguages: string[], selectedLanguage: string): boolean {
  if (!selectedLanguage) return true;
  const selectedCanonical = canonicalizeLanguage(selectedLanguage);

  return workLanguages.some((entry) => canonicalizeLanguage(entry) === selectedCanonical);
}

export function toLanguageDisplayName(value: string): string {
  return titleCase(canonicalizeLanguage(value));
}
