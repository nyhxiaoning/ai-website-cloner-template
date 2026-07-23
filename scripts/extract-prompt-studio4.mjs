import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'https://prompt-studio-7gh.pages.dev/';
const RESEARCH_DIR = 'docs/research/prompt-studio';
const REF_DIR = 'docs/design-references/prompt-studio';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Get exact computed styles of all key elements
  const computed = await page.evaluate(() => {
    const sels = [
      'main', 'section', 'h1', 'button', 'p',
      'main > section', 'section > div > div > p:first-child', 'section > div > div > h1', 'section > div > div > p:nth-child(3)', 'section > div:last-child button'
    ];
    const res = {};
    sels.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        const cs = getComputedStyle(el);
        const relevant = {};
        ['fontFamily','fontSize','fontWeight','color','backgroundColor','padding','paddingTop','paddingRight','paddingBottom','paddingLeft','margin','marginTop','marginRight','marginBottom','marginLeft','width','maxWidth','borderRadius','border','borderTop','borderBottom','borderLeft','borderRight','boxShadow','display','flexDirection','justifyContent','alignItems','gap','position','top','right','bottom','left','zIndex','textTransform','letterSpacing','lineHeight','textShadow','opacity','transition','cursor'].forEach(p => {
          const v = cs[p];
          if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== 'rgba(0,0,0,0)') relevant[p] = v;
        });
        res[sel] = { tag: el.tagName, text: el.textContent?.slice(0, 80), ...relevant };
      }
    });
    return res;
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'computed-styles.json'), JSON.stringify(computed, null, 2));
  console.log(JSON.stringify(computed, null, 2));

  // Screenshot at 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(REF_DIR, 'mobile-setup.png') });

  // Screenshot at 768px
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(REF_DIR, 'tablet-setup.png') });

  // Screenshot at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(REF_DIR, 'desktop-setup.png') });

  // Get full HTML text content structure
  const fullText = await page.evaluate(() => {
    const walk = (el) => {
      if (el.nodeType === 3) return el.textContent.trim();
      if (el.nodeType !== 1) return null;
      const text = Array.from(el.childNodes).map(walk).filter(Boolean).join(' ');
      if (el.children.length === 0 && text) return text;
      return null;
    };
    return walk(document.body);
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'text-structure.txt'), fullText);

  // Get the vite.svg
  const svg = await page.evaluate(() => {
    const svgEl = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    return svgEl ? svgEl.href : null;
  });
  console.log('Favicon SVG:', svg);

  await browser.close();
  console.log('Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
