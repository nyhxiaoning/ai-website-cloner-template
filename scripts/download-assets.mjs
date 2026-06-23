// Script to download all assets for the colors.ichuantong.cn clone
import fs from 'fs';
import https from 'https';
import path from 'path';

const BASE = 'https://colors.ichuantong.cn';

const assets = [
  { url: `${BASE}/figure/hehuaqingting.png`, dest: 'public/images/figure-hehuaqingting.png' },
  { url: `${BASE}/assets/bg.texture-Dnw-puWb.png`, dest: 'public/images/bg-texture.png' },
  { url: `${BASE}/assets/bg.top-Be-VN3rr.png`, dest: 'public/images/bg-top.png' },
  { url: `${BASE}/assets/chinese.circle.border-BUnoneo5.png`, dest: 'public/images/chinese-circle-border.png' },
  { url: `${BASE}/bgm.mp3`, dest: 'public/audio/bgm.mp3' },
  { url: `${BASE}/favicon.ico`, dest: 'public/seo/favicon.ico' },
  { url: `${BASE}/favicon-16x16.png`, dest: 'public/seo/favicon-16x16.png' },
  { url: `${BASE}/favicon-32x32.png`, dest: 'public/seo/favicon-32x32.png' },
  { url: `${BASE}/apple-touch-icon.png`, dest: 'public/seo/apple-touch-icon.png' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        console.log(`  SKIP ${url} (${response.statusCode})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`  FAIL ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('Downloading assets...');
  const results = await Promise.all(assets.map(a => download(a.url, a.dest)));
  const succeeded = results.filter(Boolean).length;
  console.log(`Downloaded ${succeeded}/${assets.length} assets`);
}

main().catch(console.error);
