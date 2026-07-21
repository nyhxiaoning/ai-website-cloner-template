import https from 'https';
import fs from 'fs';
import path from 'path';

const ASSETS = [
  { url: 'https://china.zecrs.com/favicon-32.png', dest: 'public/seo/favicon-32.png' },
  { url: 'https://china.zecrs.com/apple-touch-icon.png', dest: 'public/seo/apple-touch-icon.png' },
  { url: 'https://china.zecrs.com/app-icon-512.png', dest: 'public/seo/app-icon-512.png' },
  { url: 'https://china.zecrs.com/assets/app-icon.svg-Ca62YEq5.png', dest: 'public/images/app-icon.png' },
  { url: 'https://china.zecrs.com/manifest.webmanifest', dest: 'public/manifest.webmanifest' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function main() {
  for (const a of ASSETS) {
    try {
      await download(a.url, a.dest);
      console.log(`OK: ${a.dest}`);
    } catch (e) {
      console.error(`FAIL: ${a.url} -> ${e.message}`);
    }
  }
}

main();
