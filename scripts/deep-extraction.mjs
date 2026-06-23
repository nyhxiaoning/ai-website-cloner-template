// scripts/deep-extraction.mjs
// Deep extraction of all components, CSS values, and data from the site
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const TARGET_URL = 'https://trial81.toolooz.com/';
const RESEARCH_DIR = join(dirname(new URL(import.meta.url).pathname), '..', 'docs', 'research');
const COMP_DIR = join(RESEARCH_DIR, 'components');

async function run() {
  mkdirSync(COMP_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // 1. Extract full rendered HTML (after React hydration)
  const fullHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
  writeFileSync(join(RESEARCH_DIR, 'rendered-html.html'), fullHTML);

  // 2. Extract the CSS from the page (both inline and linked)
  const cssText = await page.evaluate(() => {
    const sheets = [...document.styleSheets];
    let css = '';
    for (const sheet of sheets) {
      try {
        const rules = [...sheet.cssRules];
        for (const rule of rules) {
          css += rule.cssText + '\n';
        }
      } catch (e) {
        // External stylesheets may not be accessible
      }
    }
    return css;
  });
  writeFileSync(join(RESEARCH_DIR, 'computed-styles.css'), cssText);

  // 3. Extract all section components with full computed CSS
  const sectionSelectors = [
    { name: 'HeroHeader', selector: '.bg-gradient-to-br' },
    { name: 'TabNavigation', selector: '.bg-amber-50' },
    { name: 'MapSection', selector: '.h-\\[750px\\]' },
    { name: 'BottomSection', selector: 'footer, .bg-gray-800, [class*="bg-gray"]' },
  ];

  const componentCSS = {};
  for (const section of sectionSelectors) {
    try {
      componentCSS[section.name] = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return { error: 'not found: ' + sel };
        const cs = getComputedStyle(el);
        return {
          tag: el.tagName,
          classes: el.className?.slice(0, 200),
          styles: {
            background: cs.background,
            backgroundColor: cs.backgroundColor,
            padding: cs.padding,
            margin: cs.margin,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            color: cs.color,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow,
            border: cs.border,
            position: cs.position,
            zIndex: cs.zIndex,
          },
          text: el.textContent.trim().slice(0, 300),
        };
      }, section.selector);
    } catch (e) {
      componentCSS[section.name] = { error: e.message };
    }
  }

  // 4. More detailed section extraction by walking DOM
  const sections = await page.evaluate(() => {
    const root = document.getElementById('root');
    if (!root) return [];
    const results = [];
    const walk = (el, depth) => {
      if (depth > 3 || !el || results.length > 30) return;
      const tag = el.tagName?.toLowerCase() || 'unknown';
      const cls = el.className?.toString()?.slice(0, 150) || '';
      const id = el.id || '';
      const rect = el.getBoundingClientRect();

      // Only capture significant containers
      if (rect.width > 300 && rect.height > 30 && (tag === 'div' || tag === 'section' || tag === 'header' || tag === 'footer' || tag === 'nav')) {
        const children = [...el.children];
        const cs = getComputedStyle(el);
        results.push({
          tag, id, classes: cls,
          rect: { w: Math.round(rect.width), h: Math.round(rect.height), t: Math.round(rect.top) },
          display: cs.display,
          position: cs.position,
          flexDirection: cs.flexDirection,
          justifyContent: cs.justifyContent,
          alignItems: cs.alignItems,
          gap: cs.gap,
          textPreview: el.textContent.trim().slice(0, 150),
          childCount: children.length,
        });
      }
      for (const child of el.children) {
        walk(child, depth + 1);
      }
    };
    walk(root, 0);
    return results;
  });

  // 5. Extract exact map markers data
  const markerData = await page.evaluate(() => {
    const markers = document.querySelectorAll('.custom-marker, .leaflet-marker-icon');
    return [...markers].slice(0, 30).map(m => ({
      text: m.textContent.trim(),
      classes: m.className?.slice(0, 150) || '',
      html: m.innerHTML.slice(0, 300),
    }));
  });

  // 6. Extract button states (click each tab)
  const tabData = {};
  const buttons = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    return [...btns].map(b => ({
      text: b.textContent.trim(),
      classes: b.className || '',
      html: b.innerHTML.slice(0, 200),
    }));
  });

  // Click each button and capture results
  for (let i = 0; i < Math.min(buttons.length, 4); i++) {
    try {
      const btnText = buttons[i].text;
      const btns = await page.$$('button');
      if (btns[i]) {
        await btns[i].click();
        await page.waitForTimeout(1000);
        const afterHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML?.slice(0, 10000) || '');
        tabData[btnText] = afterHTML;
      }
    } catch (e) {
      // ignore click errors
    }
  }

  // 7. Check all Font Awesome icons used
  const fontAwesomeIcons = await page.evaluate(() => {
    const icons = document.querySelectorAll('i[class*="fa-"], svg[class*="fa-"]');
    return [...icons].map(i => i.className || i.getAttribute('class'));
  });

  // 8. Extract all unique CSS custom properties
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const vars = {};
    const cs = getComputedStyle(root);
    for (let i = 0; i < cs.length; i++) {
      const name = cs[i];
      if (name.startsWith('--')) {
        vars[name] = cs.getPropertyValue(name).trim();
      }
    }
    return vars;
  });

  // 9. Extract character SVG details
  const characterSVGs = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg.animate-bounce');
    return [...svgs].map(s => ({
      outerHTML: s.outerHTML,
      width: s.getAttribute('width'),
      height: s.getAttribute('height'),
      viewBox: s.getAttribute('viewBox'),
      classes: s.className?.toString() || '',
    }));
  });

  // 10. Check for timeline/mindmap content (other views)
  const otherViews = await page.evaluate(() => {
    // Look for hidden panels
    const allDivs = document.querySelectorAll('div[class*="hidden"], div[style*="display: none"]');
    return [...allDivs].slice(0, 10).map(d => ({
      classes: d.className?.slice(0, 150) || '',
      text: d.textContent.trim().slice(0, 300),
      innerHTML: d.innerHTML.slice(0, 2000),
    }));
  });

  // 11. Extract Leaflet-specific data
  const leafletData = await page.evaluate(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if (!mapContainer) return null;
    const cs = getComputedStyle(mapContainer);
    return {
      width: cs.width,
      height: cs.height,
      zIndex: cs.zIndex,
      background: cs.background,
      classes: mapContainer.className?.slice(0, 200) || '',
    };
  });

  const result = {
    sections,
    buttons,
    tabData,
    fontAwesomeIcons,
    cssVars,
    characterSVGs,
    markerData,
    otherViews,
    leafletData,
    componentCSS,
  };

  const outPath = join(RESEARCH_DIR, 'deep-extraction.json');
  writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Done! Wrote:', outPath);
  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
