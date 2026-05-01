import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const ROH_ASSET_STORE_JSON_PATH = join(process.cwd(), 'app', 'data', 'roh-asset-store-collections.json');

export interface RohAssetStoreAssetJson {
  id: string;
  name: string;
  description?: string;
  dateCreated?: string;
  thumbnailUrl?: string;
  webUrl?: string;
  tags?: string[];
  extension?: string[];
  /** From library snapshot JSON (`appCodes` on assets). */
  appCodes?: string[];
  orientation?: string;
  fileSize?: number;
  isArchived?: boolean;
  isKeyVisual?: boolean;
  hasAdditionalFiles?: boolean;
  isPrivate?: boolean;
  metadata?: Record<string, string>;
}

export interface RohAssetStoreCollectionJson {
  id: string;
  title: string;
  description?: string;
  publicUrl?: string;
  sourceUrl?: string;
  expectedFileCount?: number;
  fetchedFileCount?: number;
  reportedFileCount?: number;
  isReadonly?: boolean;
  metadata?: Record<string, string>;
  assets?: RohAssetStoreAssetJson[];
}

export interface RohAssetStoreFileJson {
  generatedAt?: string;
  source?: string;
  collectionCount?: number;
  assetCount?: number;
  collections: RohAssetStoreCollectionJson[];
}

let memoAssetFile: RohAssetStoreFileJson | null | undefined;
let memoPath: string | undefined;

function resolvedAssetStorePath(): string {
  return process.env.ROH_ASSET_STORE_PATH || ROH_ASSET_STORE_JSON_PATH;
}

/** Reset memo (tests). Not used in production builds. */
export function clearRohAssetStoreMemo(): void {
  memoAssetFile = undefined;
  memoPath = undefined;
}

export function loadRohAssetStoreFile(): RohAssetStoreFileJson | null {
  const path = resolvedAssetStorePath();
  if (memoAssetFile !== undefined && memoPath === path) {
    return memoAssetFile;
  }

  memoPath = path;
  if (!existsSync(path)) {
    memoAssetFile = null;
    return null;
  }

  const parsed = JSON.parse(readFileSync(path, 'utf8')) as RohAssetStoreFileJson;
  if (!Array.isArray(parsed?.collections)) {
    memoAssetFile = null;
    return null;
  }

  memoAssetFile = parsed;
  return memoAssetFile;
}

export function countRohAssetsInFile(data: RohAssetStoreFileJson | null): number {
  if (!data?.collections) return 0;
  let n = 0;
  for (const c of data.collections) {
    n += c.assets?.length ?? 0;
  }
  return n;
}
