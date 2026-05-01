const DEFAULT_ROH_USERNAME = 'roh';
const DEFAULT_ROH_PASSWORD = 'RBO-SHIFT';

function decodeBase64(value: string): string | null {
  try {
    return Buffer.from(value, 'base64').toString('utf8');
  } catch {
    return null;
  }
}

export function rohPassword(): string {
  const configured = process.env.ROH_PASSWORD?.trim();
  return configured || DEFAULT_ROH_PASSWORD;
}

export function rohUsername(): string {
  const configured = process.env.ROH_USERNAME?.trim();
  return configured || DEFAULT_ROH_USERNAME;
}

export function isValidRohBasicAuthHeader(authHeader: string | null): boolean {
  if (!authHeader) return false;
  if (!authHeader.startsWith('Basic ')) return false;

  const decoded = decodeBase64(authHeader.slice('Basic '.length).trim());
  if (!decoded) return false;

  const separator = decoded.indexOf(':');
  if (separator < 0) return false;

  const username = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);
  return username === rohUsername() && password === rohPassword();
}
