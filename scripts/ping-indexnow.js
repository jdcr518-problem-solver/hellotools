#!/usr/bin/env node
/**
 * IndexNow Ping Script
 * Submits all site URLs to Bing/Yandex/Seznam via IndexNow protocol
 * Run after deployment: node scripts/ping-indexnow.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://hellotools.net';
const INDEXNOW_KEY = fs.readFileSync(path.join(__dirname, '../public/indexnow-key.txt'), 'utf8').trim();

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
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      console.log(`[${host}] IndexNow Response: HTTP ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (err) => {
      console.error(`[${host}] Error:`, err.message);
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`\n🚀 IndexNow Ping — Submitting ${urls.length} URLs\n`);
  console.log(`Key: ${INDEXNOW_KEY}`);
  console.log(`URLs to submit: ${urls.length}\n`);

  // Bing supports IndexNow
  await pingIndexNow('www.bing.com');
  // Yandex supports IndexNow
  await pingIndexNow('yandex.com');

  console.log('\n✅ IndexNow ping complete!');
  console.log('Bing and Yandex will crawl your new/updated pages within hours.\n');
}

main().catch(console.error);
