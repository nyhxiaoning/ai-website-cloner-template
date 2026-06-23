// scripts/download-assets.mjs
// Download favicons, OG image from target site
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const SEO_DIR = join(PUBLIC_DIR, 'seo');
const IMAGES_DIR = join(PUBLIC_DIR, 'images');

const BASE_URL = 'https://trial81.toolooz.com';

const assets = [
  { url: '/favicon.ico', dest: 'seo/favicon.ico' },
  { url: '/favicon-16x16.png', dest: 'seo/favicon-16x16.png' },
  { url: '/favicon-32x32.png', dest: 'seo/favicon-32x32.png' },
  { url: '/apple-touch-icon.png', dest: 'seo/apple-touch-icon.png' },
  { url: '/android-chrome-192x192.png', dest: 'seo/android-chrome-192x192.png' },
  { url: '/android-chrome-512x512.png', dest: 'seo/android-chrome-512x512.png' },
  { url: '/og-image.png', dest: 'seo/og-image.png' },
  { url: '/donate.jpg', dest: 'images/donate.jpg' },
];

async function download(url, destPath) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.log(`  [${response.status}] Skipped: ${fullUrl}`);
      return;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(destPath, buffer);
    console.log(`  Downloaded: ${destPath} (${buffer.length} bytes)`);
  } catch (err) {
    console.log(`  Failed: ${fullUrl} - ${err.message}`);
  }
}

async function main() {
  mkdirSync(SEO_DIR, { recursive: true });
  mkdirSync(IMAGES_DIR, { recursive: true });
  console.log('Downloading assets...');
  // Download in parallel (4 at a time)
  const batchSize = 4;
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await Promise.all(
      batch.map(a => download(a.url, join(PUBLIC_DIR, a.dest)))
    );
  }
  console.log('Done downloading assets.');
}

main().catch(console.error);
