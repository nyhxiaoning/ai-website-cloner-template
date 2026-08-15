const { writeFileSync, mkdirSync } = await import('fs');
const { join } = await import('path');

const SITE1 = 'virtual-try-on-clothes-root-2e35dd5c';
const SITE2 = 'ai-fashion-model-generator-root-ffdc46d3';

const assets = [
  // virtual-try-on page
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fp1.webp&w=3840&q=70', site: SITE1, name: 'hero-person-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fp2.webp&w=3840&q=70', site: SITE1, name: 'hero-person-2.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fp3.webp&w=3840&q=70', site: SITE1, name: 'hero-person-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fc1.webp&w=3840&q=70', site: SITE1, name: 'hero-cloth-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fc2.webp&w=3840&q=70', site: SITE1, name: 'hero-cloth-2.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fc3.webp&w=3840&q=70', site: SITE1, name: 'hero-cloth-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fvirtual-try-on-hero-v2%2Fresults%2Fp1c1.webp&w=3840&q=75', site: SITE1, name: 'hero-result-1.webp' },
  // shared example images
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fp1.webp&w=3840&q=75', site: SITE1, name: 'ex-person-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc1.webp&w=3840&q=75', site: SITE1, name: 'ex-cloth-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr1.webp&w=3840&q=75', site: SITE1, name: 'ex-result-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fp3.webp&w=3840&q=75', site: SITE1, name: 'ex-person-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc3.webp&w=3840&q=75', site: SITE1, name: 'ex-cloth-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr3.webp&w=3840&q=75', site: SITE1, name: 'ex-result-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc5.webp&w=3840&q=75', site: SITE1, name: 'ex-cloth-5.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr5.webp&w=3840&q=75', site: SITE1, name: 'ex-result-5.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fp1.webp&w=3840&q=75', site: SITE1, name: 'howto-person.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fc1.webp&w=3840&q=75', site: SITE1, name: 'howto-garment.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fresults%2Fp1c1.webp&w=3840&q=75', site: SITE1, name: 'howto-result.webp' },
  // ai-fashion-model page - uses shared assets from try-on-examples
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fp1.webp&w=3840&q=75', site: SITE2, name: 'ex-person-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc1.webp&w=3840&q=75', site: SITE2, name: 'ex-cloth-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr1.webp&w=3840&q=75', site: SITE2, name: 'ex-result-1.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fp3.webp&w=3840&q=75', site: SITE2, name: 'ex-person-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc3.webp&w=3840&q=75', site: SITE2, name: 'ex-cloth-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr3.webp&w=3840&q=75', site: SITE2, name: 'ex-result-3.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fc5.webp&w=3840&q=75', site: SITE2, name: 'ex-cloth-5.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ftry-on-examples%2Fr5.webp&w=3840&q=75', site: SITE2, name: 'ex-result-5.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Fquality-promises%2Finspection-logo.webp&w=3840&q=75', site: SITE2, name: 'quality-inspection-logo.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fp1.webp&w=3840&q=75', site: SITE2, name: 'howto-person.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fc1.webp&w=3840&q=75', site: SITE2, name: 'howto-garment.webp' },
  { url: 'https://aiclotheschanger.io/_next/image?url=%2Fimgs%2Ffittora-hero%2Fresults%2Fp1c1.webp&w=3840&q=75', site: SITE2, name: 'howto-result.webp' },
];

async function downloadOne(url, dest) {
  try {
    const r = await fetch(url, { redirect: 'follow' });
    if (!r.ok) { console.log(`✗ ${r.status} ${url}`); return false; }
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`✓ ${dest} (${buf.length} bytes)`);
    return true;
  } catch(e) { console.log(`✗ ${url}: ${e.message}`); return false; }
}

async function main() {
  for (const a of assets) {
    const dir = `public/sites/${a.site}/images`;
    mkdirSync(dir, { recursive: true });
    await downloadOne(a.url, `${dir}/${a.name}`);
  }
  console.log('Done');
}
main();
