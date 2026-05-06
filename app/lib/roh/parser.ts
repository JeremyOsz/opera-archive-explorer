import { load } from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import {
  ROH_BASE_URL,
  RohCollectionResults,
  RohPerformance,
  RohPerformanceSeed,
  RohProduction,
  RohProductionSeed,
  RohRecord,
  RohRecordSeed,
  RohRelatedRecordCollection,
  RohWork,
  RohWorkSeed,
} from './types';

function cleanText(value: string): string {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanLabel(value: string): string {
  return cleanText(value).replace(/:$/, '');
}

export function absoluteRohUrl(href: string | undefined, baseUrl = ROH_BASE_URL): string {
  if (!href) return '';
  const url = new URL(href, baseUrl);
  url.protocol = 'https:';
  url.hostname = 'www.rohcollections.org.uk';
  url.port = '';
  return url.toString();
}

function getQueryParam(url: string, name: string): string | undefined {
  const value = new URL(url, ROH_BASE_URL).searchParams.get(name);
  return value || undefined;
}

function metadataValue(metadata: Record<string, string>, ...labels: string[]): string | undefined {
  for (const label of labels) {
    const value = metadata[label];
    if (value) return value;
  }
  return undefined;
}

function extractMetadata($: CheerioAPI, selector = 'table.result'): Record<string, string> {
  const metadata: Record<string, string> = {};
  $(`${selector} tr`).each((_, row) => {
    const label = cleanLabel($(row).find('th').first().text());
    const valueCell = $(row).find('td').first().clone();
    valueCell.find('br').replaceWith(' ');
    const value = cleanText(valueCell.text());
    if (label && value) {
      metadata[label] = value;
    }
  });
  return metadata;
}

function firstImageUrl($: CheerioAPI, selector: string, sourceUrl: string): string | undefined {
  const src = $(selector).first().attr('src');
  return src ? absoluteRohUrl(src, sourceUrl) : undefined;
}

function linkedId($: CheerioAPI, selector: string, param: string): string | undefined {
  const href = $(selector).first().attr('href');
  return href ? getQueryParam(absoluteRohUrl(href), param) : undefined;
}

function relatedCollections($: CheerioAPI, sourceUrl: string): RohRelatedRecordCollection[] {
  const collections: RohRelatedRecordCollection[] = [];
  $('.relatedrecords a[href*="relatedobjects.aspx"]').each((_, link) => {
    const href = absoluteRohUrl($(link).attr('href'), sourceUrl);
    const collection = cleanText($(link).text());
    const afterText = cleanText($(link).parent().text());
    const countMatch = afterText.match(new RegExp(`${collection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\((\\d+)\\)`));
    if (collection) {
      collections.push({
        collection,
        count: countMatch ? Number(countMatch[1]) : undefined,
        url: href,
      });
    }
  });
  return collections;
}

function genreBeforeDetailsHeading($: CheerioAPI): string | undefined {
  let genre: string | undefined;
  $('h2').each((_, heading) => {
    const text = cleanText($(heading).text());
    const match = text.match(/^([^:]+):\s*Work details/i);
    if (match) genre = match[1];
  });
  return genre;
}

function parseCreatorSuffix(text: string, title: string): string | undefined {
  const suffix = cleanText(text).slice(title.length).trim();
  const match = suffix.match(/^\((.+)\)$/);
  return match?.[1];
}

export function parseRecordPage(html: string, sourceUrl: string): RohRecord {
  const $ = load(html);
  const metadata = extractMetadata($);
  const title = cleanText($('h1').first().text()) || metadataValue(metadata, 'Title') || 'Untitled ROH record';
  const id = getQueryParam(sourceUrl, 'ref') || '';
  const imageUrl = firstImageUrl($, '#ContentPlaceHolderBody_uiObjectImage img, .objectimage img', sourceUrl);
  const relatedWorkId = linkedId($, 'table.result a[href*="work.aspx?work="]', 'work');

  return {
    id,
    title,
    collection: metadataValue(metadata, 'Collection'),
    objectNumber: metadataValue(metadata, 'Object number'),
    date: metadataValue(metadata, 'Date'),
    description: metadataValue(metadata, 'Description'),
    creator: metadataValue(
      metadata,
      'Costume designer',
      'Set designer',
      'Designer',
      'Artist',
      'Creator',
      'Photographer',
      'Composer'
    ),
    dimensions: metadataValue(metadata, 'Dimensions'),
    condition: metadataValue(metadata, 'Condition'),
    imageUrl,
    thumbnailUrl: imageUrl?.replace('/main/', '/thumb/'),
    sourceUrl: absoluteRohUrl(sourceUrl),
    metadata,
    relatedWorkId,
  };
}

export function parseWorkPage(html: string, sourceUrl: string): RohWork {
  const $ = load(html);
  const metadata = extractMetadata($, 'table.result.work');
  const id = getQueryParam(sourceUrl, 'work') || '';
  const title = cleanText($('h1').first().text()) || metadataValue(metadata, 'Music title') || 'Untitled ROH work';
  const productions: RohProductionSeed[] = [];

  $('table.production tr, table.results.production tr').each((_, row) => {
    const link = $(row).find('a[href*="production.aspx?production="]').first();
    const href = link.attr('href');
    const productionId = href ? getQueryParam(absoluteRohUrl(href, sourceUrl), 'production') : undefined;
    if (!productionId || !href) return;

    const cells = $(row).find('td');
    const companyText = cleanText(cells.eq(1).text());
    productions.push({
      id: productionId,
      title: cleanText(link.text()),
      company: companyText.replace(/\s*\(\d+\s+performances?\s+online\).*$/i, '') || undefined,
      performanceCount: Number(companyText.match(/\((\d+)\s+performances?\s+online\)/i)?.[1]) || undefined,
      sourceUrl: absoluteRohUrl(href, sourceUrl),
    });
  });

  return {
    id,
    title,
    genre: genreBeforeDetailsHeading($),
    composer: metadataValue(metadata, 'Composer'),
    librettist: metadataValue(metadata, 'Librettist'),
    musicTitle: metadataValue(metadata, 'Music title'),
    language: metadataValue(metadata, 'Language'),
    workDefinition: metadataValue(metadata, 'Work definition'),
    titleNotes: metadataValue(metadata, 'Title notes'),
    notes: metadataValue(metadata, 'Notes'),
    worldPremiere: metadataValue(metadata, 'World premiere'),
    rohPremiere: metadataValue(metadata, 'ROH premiere'),
    rohCompanyPremiere: metadataValue(metadata, 'ROH company premiere'),
    sourceUrl: absoluteRohUrl(sourceUrl),
    metadata,
    relatedWorkId: linkedId($, 'table.result.work a[href*="work.aspx?work="]', 'work'),
    productions,
    relatedRecordCollections: relatedCollections($, sourceUrl),
  };
}

export function parseProductionPage(html: string, sourceUrl: string): RohProduction {
  const $ = load(html);
  const metadata = extractMetadata($, 'table.result.work');
  const id = getQueryParam(sourceUrl, 'production') || '';
  const title = cleanText($('h1').first().text()) || 'Untitled ROH production';
  const performances: RohPerformanceSeed[] = [];

  $('table.performance tr, table.results.performance tr').each((_, row) => {
    const link = $(row).find('a[href*="performance.aspx?performance="]').first();
    const href = link.attr('href');
    const performanceId = href ? getQueryParam(absoluteRohUrl(href, sourceUrl), 'performance') : undefined;
    if (!performanceId || !href) return;

    const cells = $(row).find('td');
    performances.push({
      id: performanceId,
      date: cleanText(link.text()),
      session: cleanText(cells.eq(1).text()) || undefined,
      venue: cleanText(cells.eq(2).text()) || undefined,
      sourceUrl: absoluteRohUrl(href, sourceUrl),
    });
  });

  return {
    id,
    workId: linkedId($, 'a[id*="ProdLinkAll"], a[href*="Work.aspx?work="], a[href*="work.aspx?work="]', 'work'),
    title,
    company: metadataValue(metadata, 'Company'),
    productionPremiere: metadataValue(metadata, 'Production premiere'),
    producer: metadataValue(metadata, 'Producer'),
    costumeDesigner: metadataValue(metadata, 'Costume designer'),
    notes: metadataValue(metadata, 'Notes'),
    sourceUrl: absoluteRohUrl(sourceUrl),
    metadata,
    performances,
    relatedRecordCollections: relatedCollections($, sourceUrl),
  };
}

export function parsePerformancePage(html: string, sourceUrl: string): RohPerformance {
  const $ = load(html);
  const metadata = extractMetadata($);
  const id = getQueryParam(sourceUrl, 'performance') || '';
  const title = cleanText($('h1').first().text()) || 'Untitled ROH performance';
  const cast = $('.personresults table tr')
    .toArray()
    .map((row) => {
      const cells = $(row).find('td');
      if (cells.length < 3) return null;
      const role = cleanText(cells.eq(0).clone().children('i').remove().end().text());
      const notes = cleanText(cells.eq(1).text()) || undefined;
      const performer = cleanText(cells.eq(2).text());
      if (!performer) return null;
      return { performanceId: id, role, performer, notes };
    })
    .filter((member): member is NonNullable<typeof member> => Boolean(member));

  const titleDateMatch = title.match(/-(\d{1,2}\s+\w+\s+\d{4})(.*)$/);

  return {
    id,
    productionId: linkedId($, 'a[id*="PerfLinkAll"], a[href*="Production.aspx?production="], a[href*="production.aspx?production="]', 'production'),
    title,
    date: titleDateMatch ? cleanText(titleDateMatch[1]) : undefined,
    session: titleDateMatch ? cleanText(titleDateMatch[2]) || undefined : undefined,
    venue: metadataValue(metadata, 'Venue'),
    company: metadataValue(metadata, 'Company'),
    status: metadataValue(metadata, 'Performance status'),
    conductor: metadataValue(metadata, 'Conductor'),
    leader: metadataValue(metadata, 'Leader'),
    sourceUrl: absoluteRohUrl(sourceUrl),
    metadata,
    cast,
  };
}

export function parsePerformanceIndexPage(html: string, sourceUrl: string): RohWorkSeed[] {
  const $ = load(html);
  const seeds: RohWorkSeed[] = [];

  $('td.title a[href*="work.aspx?work="]').each((_, link) => {
    const href = $(link).attr('href');
    if (!href) return;
    const absoluteUrl = absoluteRohUrl(href, sourceUrl);
    const title = cleanText($(link).text());
    const row = $(link).closest('tr');
    seeds.push({
      id: getQueryParam(absoluteUrl, 'work') || '',
      title,
      genre: cleanText(row.find('td.genre').text()) || undefined,
      creator: parseCreatorSuffix(row.find('td.title').text(), title),
      sourceUrl: absoluteUrl,
    });
  });

  return seeds.filter((seed) => seed.id);
}

export function parseCollectionResultsPage(html: string, sourceUrl: string): RohCollectionResults {
  const $ = load(html);
  const records: RohRecordSeed[] = [];
  const heading = cleanText($('#ContentPlaceHolderBody_uiArchiveObjectResults th, .objectresults th').first().text());
  const total = Number(heading.match(/showing\s+\d+-\d+\s+of\s+(\d+)/i)?.[1]) || undefined;

  $('a[href*="record.aspx?ref="]').each((_, link) => {
    const href = $(link).attr('href');
    if (!href || $(link).find('img').length > 0) return;
    const absoluteUrl = absoluteRohUrl(href, sourceUrl);
    const id = getQueryParam(absoluteUrl, 'ref');
    if (!id) return;
    const row = $(link).closest('tr');
    const rowText = cleanText(row.find('td').last().text());
    const title = cleanText($(link).text());
    const objectNumber = cleanText(rowText.replace(title, ''));
    const thumbnail = row.find('img').first().attr('src');
    records.push({
      id,
      title,
      collection: getQueryParam(absoluteUrl, 'collection'),
      objectNumber: objectNumber || undefined,
      thumbnailUrl: thumbnail ? absoluteRohUrl(thumbnail, sourceUrl) : undefined,
      sourceUrl: absoluteUrl,
    });
  });

  const nextHref = $('a[id*="ArchiveObjectLinkNext"]').attr('href');
  return {
    records,
    total,
    nextPageUrl: nextHref ? absoluteRohUrl(nextHref, sourceUrl) : undefined,
  };
}
