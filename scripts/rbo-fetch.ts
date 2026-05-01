import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const RBO_BASE_URL = 'https://www.rbo.org.uk';
const OUTPUT_PATH = join(process.cwd(), 'app', 'data', 'rbo-public-catalogue.json');

interface JsonApiPage<T> {
  data: T[];
  included?: unknown[];
  links?: {
    self?: string;
    first?: string;
    last?: string;
    prev?: string | null;
    next?: string | null;
  };
  meta?: {
    totalItems?: number;
    totalPages?: number;
  };
}

interface JsonApiResource {
  type: string;
  id: string;
  attributes?: Record<string, unknown>;
  relationships?: Record<string, unknown>;
}

interface JsonApiSingle<T> {
  data: T;
  included?: unknown[];
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'opera-archive-explorer rbo importer',
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} ${response.statusText}: ${url}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('json')) {
    throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}: ${url}`);
  }

  return (await response.json()) as T;
}

async function fetchJsonApiCollection(path: string): Promise<{
  items: JsonApiResource[];
  included: unknown[];
  pagesFetched: number;
  reportedTotalItems?: number;
  reportedTotalPages?: number;
}> {
  const items: JsonApiResource[] = [];
  const included: unknown[] = [];
  let pagesFetched = 0;
  let reportedTotalItems: number | undefined;
  let reportedTotalPages: number | undefined;
  let nextUrl: string | null = new URL(path, RBO_BASE_URL).toString();

  while (nextUrl) {
    const page: JsonApiPage<JsonApiResource> = await fetchJson(nextUrl);
    pagesFetched += 1;
    items.push(...page.data);
    included.push(...(page.included || []));
    reportedTotalItems ??= page.meta?.totalItems;
    reportedTotalPages ??= page.meta?.totalPages;
    nextUrl = page.links?.next || null;
  }

  return { items, included, pagesFetched, reportedTotalItems, reportedTotalPages };
}

async function main(): Promise<void> {
  const [events, digitalEvents, digitalEventVideos, streamHomePage] = await Promise.all([
    fetchJsonApiCollection('/api/events'),
    fetchJsonApiCollection('/api/digital-events'),
    fetchJsonApiCollection('/api/information/digital-event-videos'),
    fetchJson<JsonApiSingle<JsonApiResource>>(new URL('/api/stream-home-page', RBO_BASE_URL).toString()),
  ]);

  const output = {
    generatedAt: new Date().toISOString(),
    source: RBO_BASE_URL,
    endpoints: {
      events: '/api/events',
      digitalEvents: '/api/digital-events',
      digitalEventVideos: '/api/information/digital-event-videos',
      streamHomePage: '/api/stream-home-page',
    },
    counts: {
      events: events.items.length,
      digitalEvents: digitalEvents.items.length,
      digitalEventVideos: digitalEventVideos.items.length,
      streamHomePage: streamHomePage.data ? 1 : 0,
    },
    pagination: {
      events: {
        pagesFetched: events.pagesFetched,
        reportedTotalItems: events.reportedTotalItems,
        reportedTotalPages: events.reportedTotalPages,
      },
      digitalEvents: {
        pagesFetched: digitalEvents.pagesFetched,
        reportedTotalItems: digitalEvents.reportedTotalItems,
        reportedTotalPages: digitalEvents.reportedTotalPages,
      },
      digitalEventVideos: {
        pagesFetched: digitalEventVideos.pagesFetched,
        reportedTotalItems: digitalEventVideos.reportedTotalItems,
        reportedTotalPages: digitalEventVideos.reportedTotalPages,
      },
    },
    events: events.items,
    digitalEvents: digitalEvents.items,
    digitalEventVideos: digitalEventVideos.items,
    streamHomePage: streamHomePage.data,
    included: {
      events: events.included,
      digitalEvents: digitalEvents.included,
      digitalEventVideos: digitalEventVideos.included,
      streamHomePage: streamHomePage.included || [],
    },
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`);

  console.log(
    `Wrote ${output.counts.events} events, ${output.counts.digitalEvents} digital events, ` +
      `${output.counts.digitalEventVideos} videos to ${OUTPUT_PATH}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
