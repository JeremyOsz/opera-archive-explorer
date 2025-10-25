# Discogs API Integration

This document explains how the Discogs API integration works and how to handle common issues.

## Overview

The Opera Archive Explorer can optionally integrate with the Discogs API to provide enhanced recording information including:

- Performer details (singers, musicians, roles)
- Conductor and orchestra information
- Recording venue and date
- Label and catalog information
- Links to full Discogs release pages

## Configuration

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Enable/disable Discogs integration
NEXT_PUBLIC_ENABLE_DISCOGS=true

# Optional: Discogs API token for better rate limits
DISCOGS_API_TOKEN=your_discogs_token_here
```

### Configuration Options

- **`NEXT_PUBLIC_ENABLE_DISCOGS`**: Set to `'true'` to enable Discogs integration, `'false'` to disable
- **`DISCOGS_API_TOKEN`**: Optional API token from Discogs for better rate limits (get from https://www.discogs.com/settings/developers)

## Error Handling

The integration is designed to be resilient and will gracefully fall back to basic recording information when:

1. **Discogs API is unavailable** (network issues, server errors)
2. **Rate limits are exceeded** (429 errors)
3. **Authentication fails** (401 errors)
4. **No matching recordings found** (404 errors)

## Fallback Behavior

When Discogs integration is disabled or fails, the system provides basic recording information using:

- Archive.org metadata (creator, date, description)
- Intelligent parsing of creator fields to extract conductor/orchestra information
- Default values for missing fields

## Common Issues and Solutions

### 1. "Discogs API error: 401 Unauthorized"

**Cause**: Discogs API requires authentication for most requests.

**Solutions**:
- Get a free Discogs API token from https://www.discogs.com/settings/developers
- Add the token to your `.env.local` file: `DISCOGS_API_TOKEN=your_token_here`
- Or disable Discogs integration: `NEXT_PUBLIC_ENABLE_DISCOGS=false`

### 2. "Discogs API error: 429 Too Many Requests"

**Cause**: Rate limit exceeded (25 requests/minute without token, 60/minute with token).

**Solutions**:
- Add a Discogs API token to increase rate limits
- The system automatically includes rate limiting delays
- Consider disabling Discogs integration if rate limits are consistently exceeded

### 3. "Discogs API error: 404 Not Found"

**Cause**: No matching recordings found for the opera.

**Solutions**:
- This is normal - not all operas have corresponding Discogs releases
- The system will use fallback recording information
- No action needed

### 4. Network Errors

**Cause**: Internet connectivity issues or Discogs API downtime.

**Solutions**:
- The system automatically falls back to basic recording information
- No action needed - the app continues to work normally

## Development vs Production

- **Development**: Discogs integration is enabled by default
- **Production**: Discogs integration is disabled by default to avoid API issues
- Override with `NEXT_PUBLIC_ENABLE_DISCOGS=true` in production if desired

## Monitoring

The system logs Discogs API interactions to the browser console:

- `🎵 Enhancing opera with recording information` - Starting Discogs lookup
- `🎵 Found recording info from Discogs` - Successfully found data
- `🎵 No Discogs recording info found, using fallback` - No matching recordings
- `Discogs API unavailable, using fallback recording info` - API error occurred

## Performance Considerations

- Discogs API calls add ~1-2 seconds to opera detail loading
- Rate limiting prevents excessive API usage
- Fallback information is always available instantly
- Consider disabling in production if performance is critical
