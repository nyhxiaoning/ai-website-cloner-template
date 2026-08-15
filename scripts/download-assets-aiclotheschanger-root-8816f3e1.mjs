import fs from 'fs/promises';
import { basename } from 'path';

const SITE = 'aiclotheschanger-root-8816f3e1';
const OUT = `public/sites/${SITE}/images`;

const assets = [
  // Hero
  { url: 'https://aiclotheschanger.io/logo.png', name: 'logo.png' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fp1.webp&w=3840&q=70', name: 'hero-person-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fp2.webp&w=3840&q=70', name: 'hero-person-2.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fp3.webp&w=3840&q=70', name: 'hero-person-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fc1.webp&w=3840&q=70', name: 'hero-cloth-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fc2.webp&w=3840&q=70', name: 'hero-cloth-2.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fc3.webp&w=3840&q=70', name: 'hero-cloth-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fresults%2Fp1c1.webp&w=3840&q=75', name: 'hero-result-p1c1.webp' },
  // Try-on examples
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fp1.webp&w=3840&q=75', name: 'ex-person-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc1.webp&w=3840&q=75', name: 'ex-cloth-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr1.webp&w=3840&q=75', name: 'ex-result-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fp3.webp&w=3840&q=75', name: 'ex-person-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc3.webp&w=3840&q=75', name: 'ex-cloth-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr3.webp&w=3840&q=75', name: 'ex-result-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc5.webp&w=3840&q=75', name: 'ex-cloth-5.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr5.webp&w=3840&q=75', name: 'ex-result-5.webp' },
  // Quality / Promises
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fquality-promises%2Finspection-logo.webp&w=3840&q=75', name: 'quality-inspection-logo.webp' },
  // How-to steps
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fp1.webp&w=3840&q=75', name: 'howto-person.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fc1.webp&w=3840&q=75', name: 'howto-garment.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fresults%2Fp1c1.webp&w=3840&q=75', name: 'howto-result.webp' },
];

function downloadOne(url, dest) {
  return fetch(url, { redirect: 'follow' })
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`); return r; })
    .then(r => r.arrayBuffer())
    .then(buf => fs.writeFile(dest, Buffer.from(buf)))
    .then(() => console.log(`✓ ${dest}`));
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const MAX = 4;
  for (let i = 0; i < assets.length; i += MAX) {
    const batch = assets.slice(i, i + MAX);
    await Promise.all(batch.map(a => downloadOne(a.url, `${OUT}/${a.name}`)));
  }
  console.log('All downloads complete.');
}
main().catch(e => { console.error(e); process.exit(1); });
