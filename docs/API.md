# API Documentation

This project exposes both versioned and legacy API routes under `app/api`.

## Linkable Docs Endpoint

- JSON docs index: `/api/docs`
- OpenAPI spec (JSON): `/api/openapi`
- Swagger UI: `/api-docs`

## Base URL

- Local dev: `http://localhost:3000`
- Production: your deployed domain

## Versioned Endpoints (Recommended)

### `GET /api/v1/search`

Primary Royal Opera House (ROH) search endpoint.

Query parameters:

- `q` or `query` (string, optional)
- `type` (`record|work|production|performance|asset|rbo_web|rbo_stream|all`, optional)
- `source` (string, optional)
- `collection` (string, optional)
- `genre` (string, optional)
- `creator` (string, optional)
- `company` (string, optional)
- `dateFrom` (string, optional)
- `dateTo` (string, optional)
- `page` (number, optional; default `1`)
- `limit` or `per_page` (number, optional; default `50`)
- `offset` (number, optional; overrides `page` offset calculation)

Example:

```bash
curl "http://localhost:3000/api/v1/search?q=traviata&type=production&limit=10&page=1"
```

Success response includes:

- `items`: result items
- `total`: total count
- `page`: current page
- `perPage`: page size
- `facets`: facet buckets (including sources)

Error responses:

- `503` when the ROH search corpus is unavailable

---

### `GET /api/v1/items/{type}:{id}`

Get one item by typed identifier.

- `type` must be one of: `record|work|production|performance|asset|rbo_web|rbo_stream`
- You can also pass `?type=...` if the path ID is untyped.

Examples:

```bash
curl "http://localhost:3000/api/v1/items/production:abc123"
curl "http://localhost:3000/api/v1/items/abc123?type=production"
```

Error responses:

- `400` missing/invalid type
- `404` item not found
- `503` corpus unavailable

---

### `GET /api/v1/sources`

Returns available sources with current counts and mapped entity types.

Example:

```bash
curl "http://localhost:3000/api/v1/sources"
```

## Legacy ROH Endpoints

### `GET /api/roh/search`

Legacy ROH search endpoint.

Query parameters:

- `q`, `type`, `source`, `collection`, `genre`, `creator`, `company`, `dateFrom`, `dateTo`, `limit`, `offset`

Returns search results from `searchCombinedRoh(...)`.

---

### `GET /api/roh/item/{type}/{id}`

Legacy typed item endpoint.

- `type` must be one of: `record|work|production|performance|asset|rbo_web|rbo_stream`

## Archive.org Data Endpoints

### `GET /api/search`

Searches the local archive cache and returns grouped works plus pagination.

Query parameters:

- `q` (optional)
- `creator` (optional)
- `date` (optional)
- `language` (optional)
- `page` (default `1`)
- `rows` (default `50`)

---

### `GET /api/metadata?id={identifier}`

Fetches enriched metadata for an Archive.org item.

- Required: `id`
- Returns: `{ opera }`

---

### `GET /api/images?id={identifier}`

Returns optimized image URLs.

- Required: `id`
- Returns: `imageUrl`, `thumbnailUrl`, and optimization flags

---

### `GET /api/archive-files?id={identifier}`

Returns files for an Archive.org item.

- Required: `id`
- Returns: `{ files: [...] }`

---

### `GET /api/enhance?id={identifier}&type={enhancement}`

Enhances opera metadata using external enrichment logic.

- Required: `id`
- Optional `type`: `all|recording|sheet-music|musical-data` (default `all`)
- Returns: `{ opera }`

## External Proxy Endpoint

### `GET /api/external/imslp`

Proxy/filter endpoint for IMSLP.

Query parameters:

- `q` (required)
- `start` (default `0`)
- `limit` (default `50`)
- `sortBy` (default `id`)

## Error Format

Most endpoints return a simple shape:

```json
{ "error": "message" }
```

Some ROH endpoints include additional fields for unavailable corpus states:

```json
{
  "error": "Search corpus unavailable...",
  "items": [],
  "total": 0
}
```
