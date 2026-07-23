import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'https://prompt-studio-7gh.pages.dev/';
const RESEARCH_DIR = 'docs/research/prompt-studio';

fs.mkdirSync(RESEARCH_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 1. Extract all CSS custom properties from :root
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const allVars = {};
    for (let i = 0; i < style.length; i++) {
      const name = style[i];
      if (name.startsWith('--studio-')) {
        allVars[name] = style.getPropertyValue(name).trim();
      }
    }
    return allVars;
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'css-vars.json'), JSON.stringify(cssVars, null, 2));
  console.log('CSS Vars:', JSON.stringify(cssVars, null, 2));

  // 2. Computed styles for key elements
  const computed = await page.evaluate(() => {
    const body = document.body;
    const cs = getComputedStyle(body);
    return {
      body: {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        lineHeight: cs.lineHeight,
      },
      rootCSSVars: Object.fromEntries(
        [...document.documentElement.style].filter(k => k.startsWith('--')).map(k => [k, document.documentElement.style.getPropertyValue(k)])
      )
    };
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'computed.json'), JSON.stringify(computed, null, 2));
  console.log('Computed:', JSON.stringify(computed, null, 2));

  // 3. Deep DOM extraction
  const deep = await page.evaluate(() => {
    function walk(el, depth) {
      if (depth > 5) return null;
      const children = [...el.children];
      return {
        tag: el.tagName.toLowerCase(),
        classes: el.className?.toString().split(' ').slice(0, 10).join(' '),
        text: el.childNodes.length <= 2 ? el.textContent?.trim().slice(0, 300) : null,
        attrs: { id: el.id, role: el.getAttribute('role'), 'data-theme': el.dataset.theme, 'data-testid': el.getAttribute('data-testid') },
        childCount: children.length,
        children: children.slice(0, 30).map(c => walk(c, depth + 1)).filter(Boolean),
      };
    }
    return walk(document.body, 0);
  });
  fs.writeFileSync(path.join(RESEARCH_DIR, 'deep-dom.json'), JSON.stringify(deep, null, 2));

  // 4. Full page screenshot
  await page.screenshot({ path: path.join(RESEARCH_DIR, 'fullpage.png'), fullPage: true });
  console.log('Screenshot saved');

  // 5. Viewport screenshot at 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(RESEARCH_DIR, 'viewport-1440.png') });

  // 6. Viewport screenshot at 390
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(RESEARCH_DIR, 'viewport-390.png'), fullPage: true });

  // 7. Extract all link tags, meta tags
  const head = await page.evaluate(() => ({
    links: [...document.querySelectorAll('link')].map(l => ({ rel: l.rel, href: l.href, as: l.as, type: l.type })),
    metas: [...document.querySelectorAll('meta')].map(m => ({ name: m.name, property: m.property, content: m.content })),
    title: document.title,
  }));
  fs.writeFileSync(path.join(RESEARCH_DIR, 'head.json'), JSON.stringify(head, null, 2));

  console.log('Done!');
  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
