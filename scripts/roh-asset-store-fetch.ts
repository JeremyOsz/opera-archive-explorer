import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ASSET_STORE_BASE_URL = 'https://library.roh.org.uk';
const OUTPUT_PATH = join(process.cwd(), 'app', 'data', 'roh-asset-store-collections.json');

interface AssetStoreCollectionSeed {
  id: string;
  title: string;
  expectedFileCount: number;
}

interface AssetStoreCollectionInfo {
  id: string;
  name: string;
  description?: string;
  isReadonly?: boolean;
}

interface AssetStoreAsset {
  id: string;
  name: string;
  description?: string;
  dateCreated?: string;
  fileSize?: number;
  extension?: string[];
  orientation?: string;
  tags?: string[];
  thumbnailUrl?: string;
  webUrl?: string;
  isPrivate?: boolean;
  isArchived?: boolean;
  isKeyVisual?: boolean;
  hasAdditionalFiles?: boolean;
  appCodes?: string[];
}

interface AssetSearchResponse {
  count: {
    total: number;
    filters?: Record<string, unknown>;
  };
  assets: AssetStoreAsset[];
}

const collections: AssetStoreCollectionSeed[] = [
  { id: '47604B21-C326-4A91-987CFB88603F0DB5', title: 'Siegfried - Press selection', expectedFileCount: 18 },
  { id: '4E5B7BFA-F353-4CC5-85AF9E0262DE55FD', title: 'Calvin Richardson', expectedFileCount: 14 },
  { id: '93A2EE2F-0585-403D-8D42FFE9F8B4232F', title: 'Constructing Costume Histories', expectedFileCount: 7 },
  { id: 'FDC887F6-719F-449A-974FF8965ABAB9DB', title: 'Patricio Revé', expectedFileCount: 11 },
  { id: '55C0ED81-6DB5-4398-9CDB46967E670503', title: 'La traviata', expectedFileCount: 24 },
  { id: '1F22CFC6-0DC3-45EC-93F373D4AF353E25', title: 'VisitBritain images', expectedFileCount: 22 },
  { id: '16500A55-2AF2-414A-99B50814C2813D45', title: 'Turandot - Full selection', expectedFileCount: 42 },
  { id: 'F51D6682-12D2-4A0D-8319863B198DAA80', title: 'Images for book', expectedFileCount: 48 },
  { id: '4F9F20E1-700D-4C5F-BCB902728B231950', title: 'Ariodante rehearsals', expectedFileCount: 34 },
  { id: '4C8813E5-A8DE-4F0F-A4616B09263A200C', title: 'Extra images', expectedFileCount: 10 },
  { id: '2A3AA2DA-B4FC-4416-8F7CF1414FF055D2', title: 'ORR1', expectedFileCount: 13 },
  { id: '4F170133-9D66-4058-AEE6487F407294BB', title: 'BP4 additional images', expectedFileCount: 14 },
  { id: '09CBD1F7-62EB-404F-9A17A915EC67FC6B', title: 'Opera rehearsal', expectedFileCount: 31 },
  { id: '2275667E-EADB-4AF4-86F677D8AB7F137A', title: 'BHM Portraits', expectedFileCount: 2 },
  { id: 'FA39B302-FA37-45D0-8C753BD1277218DD', title: 'MAKESHIFT, RBO/Shift', expectedFileCount: 74 },
  { id: '7C54E1D8-C87D-45DF-8B4776C170E975B1', title: 'Rehearsal final', expectedFileCount: 12 },
  { id: '9C1B610C-22FD-4678-9BC67E9574529649', title: 'SHORTLIST', expectedFileCount: 12 },
  { id: 'BCA7BD90-2C04-4957-BD363C747F8DB112', title: 'Abstract ballet and opera images', expectedFileCount: 37 },
  { id: 'EF8D9FC6-00B8-4D17-96866D15BED69579', title: 'Serenade options 2', expectedFileCount: 18 },
  { id: 'A1F07350-DE82-4585-9E51A303059AE0CB', title: 'RB Promotions - image options', expectedFileCount: 13 },
  { id: 'F1A07858-A281-4E79-A4F195114294AAA0', title: 'Magazine cover options', expectedFileCount: 21 },
  { id: 'C52D1654-8BB2-45FA-9D4276848D1D38AE', title: 'Korean tour', expectedFileCount: 30 },
  { id: 'E0A6B345-CB26-4FAA-A3767C0B9209E3DE', title: 'Opera - portrait', expectedFileCount: 16 },
  { id: 'CFF01D47-42A4-4CE8-A40CF7669F27968F', title: 'Rehearsal sample images', expectedFileCount: 19 },
  { id: '72CCE060-D79D-4E6C-8BD587BDB9CBA9B0', title: '24 25 Principal shortlist', expectedFileCount: 45 },
  { id: '9B5A4C7C-4190-4035-B7C1F36CB0D36E0C', title: 'Images for Matt', expectedFileCount: 40 },
  { id: '8E1E651B-FC8A-4164-B7CF08A490B23E6A', title: 'Faust, 2025', expectedFileCount: 50 },
  { id: 'F5665328-C454-4293-9E528227D4FC2417', title: 'Ballet to Broadway, 2025', expectedFileCount: 148 },
  { id: '2A67C1DD-48B9-4BBF-934C79491C4B8BD4', title: 'Carmen, 2025', expectedFileCount: 50 },
  { id: '63A92F68-A7B8-45BB-AFED0504349E4145', title: 'Balanchine programme', expectedFileCount: 33 },
  { id: '2DB2643C-5FC6-4C03-A52BD860EFF2B361', title: 'Il trov OOH', expectedFileCount: 12 },
  { id: 'F71FB9C2-3715-4E69-AF66741618032E4C', title: '_25/26 Season Launch Images', expectedFileCount: 74 },
  { id: '37812043-F6AA-4A35-B16BC2E963FF141B', title: 'Osipova', expectedFileCount: 34 },
  { id: '310BE83F-77B3-45AE-A3C513420E42C951', title: '_PRISMIC IMAGES', expectedFileCount: 8 },
  { id: '9E74889A-1F13-42FB-BE533B5ACFC8A4D5', title: 'Tutu Tree', expectedFileCount: 136 },
  { id: '745D8391-BA5E-4CF2-B2AECF49DFD5D3BB', title: 'Ballet rehearsal image options for postcards', expectedFileCount: 95 },
  { id: '1F5F72C6-2741-42CE-AB39E2FC04659AB5', title: 'Die Walkure, 2025', expectedFileCount: 60 },
  { id: 'C1E9306A-4CAD-4B26-875C2AF56C2FC7B5', title: '2023-24 Season hero image crops', expectedFileCount: 313 },
  { id: '9B90169D-3022-4BF7-8B362F86F650F96F', title: '20 Best FOH Images', expectedFileCount: 15 },
  { id: '42914364-2CBA-4348-A87B4CEF110075CD', title: 'Ballet Rehearsals', expectedFileCount: 1013 },
];

function absoluteAssetStoreUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return new URL(value, ASSET_STORE_BASE_URL).toString();
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(new URL(path, ASSET_STORE_BASE_URL), {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'opera-archive-explorer asset-store importer',
    },
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} ${response.statusText}: ${path}`);
  }
  return (await response.json()) as T;
}

async function fetchCollectionAssets(collectionId: string): Promise<{ total: number; assets: AssetStoreAsset[] }> {
  const assets: AssetStoreAsset[] = [];
  let total = 0;
  let page = 1;

  do {
    const params = new URLSearchParams({
      collectionId,
      filterkey: collectionId,
      orderBy: 'dateCreated',
      orderType: 'desc',
      page: String(page),
      viewType: 'grid',
    });
    const result = await fetchJson<AssetSearchResponse>(`/search/assets/?${params}`);
    total = result.count.total;
    assets.push(...result.assets);
    page += 1;
  } while (assets.length < total);

  return { total, assets };
}

async function main(): Promise<void> {
  const fetched = [];

  for (const seed of collections) {
    console.log(`Fetching ${seed.title} (${seed.id})`);
    const [info, assetResult] = await Promise.all([
      fetchJson<AssetStoreCollectionInfo>(`/collections/v2?id=${encodeURIComponent(seed.id)}`),
      fetchCollectionAssets(seed.id),
    ]);

    fetched.push({
      id: seed.id,
      title: info.name || seed.title,
      description: info.description || '',
      expectedFileCount: seed.expectedFileCount,
      fetchedFileCount: assetResult.assets.length,
      reportedFileCount: assetResult.total,
      publicUrl: `${ASSET_STORE_BASE_URL}/web/${seed.id}`,
      sourceUrl: `${ASSET_STORE_BASE_URL}/collections/view/${seed.id}`,
      isReadonly: Boolean(info.isReadonly),
      assets: assetResult.assets.map((asset) => ({
        ...asset,
        thumbnailUrl: absoluteAssetStoreUrl(asset.thumbnailUrl),
        webUrl: absoluteAssetStoreUrl(asset.webUrl),
      })),
    });
  }

  const output = {
    generatedAt: new Date().toISOString(),
    source: ASSET_STORE_BASE_URL,
    collectionCount: fetched.length,
    assetCount: fetched.reduce((total, collection) => total + collection.assets.length, 0),
    collections: fetched,
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Wrote ${output.collectionCount} collections and ${output.assetCount} assets to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
