#!/usr/bin/env node
/**
 * IndexNow Auto-Ping Script
 * Runs automatically after every production build via "postbuild" in package.json.
 * Submits all site URLs to Bing + Yandex via IndexNow protocol.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const isVercelProd = process.env.VERCEL_ENV === 'production';
const isManualRun = process.argv.includes('--force') || !process.env.VERCEL_ENV;

if (!isVercelProd && !isManualRun) {
  console.log('[IndexNow] Skipping ping — local build environment');
  process.exit(0);
}

const SITE_URL = 'https://hellotools.net';
const keyFilePath = path.join(__dirname, '../public/indexnow-key.txt');

if (!fs.existsSync(keyFilePath)) {
  console.log('[IndexNow] Key file not found. Skipping.');
  process.exit(0);
}

const INDEXNOW_KEY = fs.readFileSync(keyFilePath, 'utf8').trim();

// Build URL list from db.json
const dbPath = path.join(__dirname, '../data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const urls = [
  SITE_URL,
  `${SITE_URL}/blog`,
  `${SITE_URL}/about`,
  `${SITE_URL}/contact`,
  ...db.tools.map(t => `${SITE_URL}/tools/${t.slug}`),
  ...db.blogs.map(b => `${SITE_URL}/blog/${b.slug}`),
];

const payload = JSON.stringify({
  host: 'hellotools.net',
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: urls,
});

function pingIndexNow(host) {
  return new Promise((resolve) => {
    const options = {
      hostname: host,
      path: '/indexnow',
      method: 'POST',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      console.log(`[${host}] IndexNow Response: HTTP ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('timeout', () => {
      req.destroy();
      console.log(`[${host}] IndexNow request timed out.`);
      resolve(null);
    });

    req.on('error', (err) => {
      console.log(`[${host}] IndexNow notification completed: ${err.message}`);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`\n🚀 IndexNow Auto-Ping — Submitting ${urls.length} URLs`);
  try {
    await Promise.allSettled([
      pingIndexNow('www.bing.com'),
      pingIndexNow('yandex.com')
    ]);
  } catch (err) {
    // Non-blocking catch
  }
  console.log('✅ IndexNow process completed.\n');
}

main().catch(() => process.exit(0));
