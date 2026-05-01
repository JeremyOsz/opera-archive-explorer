import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isValidRohBasicAuthHeader, rohPassword, rohUsername } from './auth';

function basicHeader(password: string, username = 'roh'): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

describe('ROH auth', () => {
  it('uses fallback username when env is missing', () => {
    delete process.env.ROH_USERNAME;
    assert.equal(rohUsername(), 'roh');
  });

  it('uses env username when provided', () => {
    process.env.ROH_USERNAME = 'archive';
    assert.equal(rohUsername(), 'archive');
  });

  it('uses fallback password when env is missing', () => {
    delete process.env.ROH_PASSWORD;
    assert.equal(rohPassword(), 'RBO-SHIFT');
  });

  it('uses env password when provided', () => {
    process.env.ROH_PASSWORD = 'MY-SECRET';
    assert.equal(rohPassword(), 'MY-SECRET');
  });

  it('accepts valid basic auth password', () => {
    process.env.ROH_USERNAME = 'archive';
    process.env.ROH_PASSWORD = 'MY-SECRET';
    assert.equal(isValidRohBasicAuthHeader(basicHeader('MY-SECRET', 'archive')), true);
  });

  it('rejects missing or invalid auth headers and credentials', () => {
    process.env.ROH_USERNAME = 'archive';
    process.env.ROH_PASSWORD = 'MY-SECRET';
    assert.equal(isValidRohBasicAuthHeader(null), false);
    assert.equal(isValidRohBasicAuthHeader('Bearer token'), false);
    assert.equal(isValidRohBasicAuthHeader(basicHeader('MY-SECRET', 'wrong-user')), false);
    assert.equal(isValidRohBasicAuthHeader(basicHeader('WRONG', 'archive')), false);
    assert.equal(isValidRohBasicAuthHeader('Basic not-base64!'), false);
  });
});
