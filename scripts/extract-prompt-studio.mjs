import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'https://prompt-studio-7gh.pages.dev/';
const RESEARCH_DIR = 'docs/research/prompt-studio';
const REF_DIR = 'docs/design-references/prompt-studio';

fs.mkdirSync(RESEARCH_DIR, { recursive: true });
fs.mkdirSync(REF_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // 1. Navigate
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 2. Full-page screenshot desktop
  await page.screenshot({ path: path.join(REF_DIR, 'desktop-full.png'), fullPage: true });
  console.log('Desktop screenshot saved');

  // 3. Viewport screenshot
  await page.screenshot({ path: path.join(REF_DIR, 'desktop-viewport.png') });
  console.log('Desktop viewport screenshot saved');

  // 4. Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(REF_DIR, 'mobile-viewport.png'), fullPage: true });
  console.log('Mobile screenshot saved');

  // 5. Extract full DOM
  const domHTML = await page.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync(path.join(RESEARCH_DIR, 'dom.html'), domHTML);
  console.log('DOM HTML saved');

  // 6. Extract font info
  const fontInfo = await page.evaluate(() => {
    const styles = [...document.querySelectorAll('*')].slice(0, 100);
    return styles.map(el => {
      const cs = getComputedStyle(el);
      return { tag: el.tagName, fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight };
    });
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'fonts.json'), JSON.stringify(fontInfo, null, 2));

  // 7. Extract colors
  const colors = await page.evaluate(() => {
    const allElements = [...document.querySelectorAll('*')];
    const colorMap = {};
    allElements.forEach(el => {
      const cs = getComputedStyle(el);
      ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
        const val = cs[prop];
        if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent' && val !== 'rgb(0, 0, 0)') {
          colorMap[val] = (colorMap[val] || 0) + 1;
        }
      });
    });
    return Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 30);
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'colors.json'), JSON.stringify(colors, null, 2));

  // 8. Extract all assets
  const assets = await page.evaluate(() => ({
    images: [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      parentClasses: img.parentElement?.className,
    })),
    links: [...document.querySelectorAll('link')].map(l => ({ rel: l.rel, href: l.href })),
    scripts: [...document.querySelectorAll('script[src]')].map(s => s.src),
  }));
  fs.writeFileSync(path.join(RESEARCH_DIR, 'assets.json'), JSON.stringify(assets, null, 2));

  // 9. Computed styles of key elements
  const computedStyles = await page.evaluate(() => {
    const keySelectors = ['h1', 'h2', 'h3', 'body', 'header', 'nav', 'main', 'section', 'footer', 'a', 'button', 'input'];
    const results = {};
    keySelectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        results[sel] = {
          tag: el.tagName,
          className: el.className,
          textContent: el.textContent?.slice(0, 100),
          computed: getComputedStyle(el)
        };
      }
    });
    return results;
  });

  // 10. Extract all text content
  const textContent = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(path.join(RESEARCH_DIR, 'text-content.txt'), textContent);

  // 11. Page structure
  const structure = await page.evaluate(() => {
    const sections = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.height > 50 && rect.width > 100 && el.children.length > 1 && el.children.length < 50) {
        const cs = getComputedStyle(el);
        if (cs.display === 'flex' || cs.display === 'grid' || cs.position === 'relative') {
          sections.push({
            tag: el.tagName,
            classes: el.className?.toString().split(' ').slice(0, 5),
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            childCount: el.children.length,
          });
        }
      }
    });
    return sections;
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'structure.json'), JSON.stringify(structure, null, 2));

  // 12. Check for scroll behaviors, libraries
  const behaviors = await page.evaluate(() => ({
    hasLenis: !!document.querySelector('.lenis') || !!window.lenis,
    hasScrollSnap: getComputedStyle(document.documentElement).scrollSnapType !== 'none',
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content,
    bodyChildren: [...document.body.children].map(el => ({
      tag: el.tagName, classes: el.className?.toString().split(' ').slice(0, 5)
    })),
  }));
  fs.writeFileSync(path.join(RESEARCH_DIR, 'behaviors.json'), JSON.stringify(behaviors, null, 2));

  // 13. Extract all CSS
  const cssText = await page.evaluate(() => {
    const sheets = [...document.styleSheets];
    let css = '';
    sheets.forEach(sheet => {
      try {
        [...sheet.cssRules].forEach(rule => { css += rule.cssText + '\n'; });
      } catch(e) { css += '/* CORS blocked */\n'; }
    });
    return css;
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'computed-styles.css'), cssText);

  console.log('\n=== Extraction Complete ===');
  console.log('Files saved to', RESEARCH_DIR, 'and', REF_DIR);

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
