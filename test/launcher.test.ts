import { describe, expect, it } from 'vitest';
import { handler } from '../launcher/handler.js';

const event = (method: string, rawPath: string) => ({
  version: '2.0',
  routeKey: '$default',
  rawPath,
  rawQueryString: '',
  headers: {},
  requestContext: {
    accountId: '428692811555',
    apiId: 'api',
    domainName: 'plugins.cortier.com',
    domainPrefix: 'plugins',
    http: { method, path: rawPath, protocol: 'HTTP/1.1', sourceIp: '127.0.0.1', userAgent: 'test' },
    requestId: 'request',
    routeKey: '$default',
    stage: '$default',
    time: '01/Jan/2026:00:00:00 +0000',
    timeEpoch: 0,
  },
  isBase64Encoded: false,
});

describe('plugin launcher', () => {
  it('serves the Codex launcher only at /design', async () => {
    const response = await handler(event('GET', '/design'));
    expect(response.statusCode).toBe(200);
    expect(response.headers?.['content-type']).toBe('text/html; charset=utf-8');
    expect(response.headers?.['referrer-policy']).toBe('no-referrer');
    expect(response.body).toContain("url.protocol !== 'codex:'");
    expect(response.body).toContain("url.hostname !== 'new'");
  });

  it.each([
    ['GET', '/'],
    ['POST', '/design'],
    ['GET', '/other'],
  ])('returns 404 for %s %s', async (method, path) => {
    const response = await handler(event(method, path));
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe('{"error":"not_found"}');
  });
});
