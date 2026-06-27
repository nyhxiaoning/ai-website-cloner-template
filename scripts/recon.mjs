import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_URL = 'https://fantastic-admin.hurui.me/pro-example/#/';

const out = (path) => resolve(__dirname, '../docs', path);

mkdirSync(out('research'), { recursive: true });
mkdirSync(out('design-references'), { recursive: true });

async function extractPage(el) {
  return el.evaluate(() => {
    const props = [
      'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
      'textTransform','textDecoration','backgroundColor','background',
      'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
      'margin','marginTop','marginRight','marginBottom','marginLeft',
      'width','height','maxWidth','minWidth','maxHeight','minHeight',
      'display','flexDirection','justifyContent','alignItems','gap',
      'gridTemplateColumns','gridTemplateRows',
      'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
      'boxShadow','overflow',
      'position','top','right','bottom','left','zIndex',
      'opacity','transform','transition','cursor',
      'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
      'whiteSpace','textOverflow'
    ];
    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
      return styles;
    }
    function walk(element, depth) {
      if (depth > 5) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        classes: element.className?.toString().slice(0, 200),
        id: element.id || undefined,
        text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 300) : null,
        styles: extractStyles(element),
        images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, w: element.naturalWidth, h: element.naturalHeight } : null,
        childCount: children.length,
        children: children.slice(0, 25).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }
    return walk(document.body, 0);
  });
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('=== DESKTOP (1440px) ===');
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: out('design-references/fullpage-desktop.png'), fullPage: true });
  console.log('Screenshot saved: fullpage-desktop.png');

  // Extract fonts
  const fonts = await page.evaluate(() => {
    const fontLinks = [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href);
    const families = [...new Set([...document.querySelectorAll('*')].slice(0, 300).map(el => getComputedStyle(el).fontFamily))];
    const fontFaces = [...document.styleSheets].flatMap(s => {
      try { return [...s.cssRules].filter(r => r instanceof CSSFontFaceRule).map(r => r.cssText); } catch { return []; }
    });
    return { fontLinks, families, fontFaces };
  });
  console.log('Fonts:', JSON.stringify(fonts, null, 2));

  // Extract colors
  const colors = await page.evaluate(() => {
    const elements = [...document.querySelectorAll('*')].slice(0, 500);
    const colorProps = ['color', 'backgroundColor', 'borderColor', 'background'];
    const palette = {};
    elements.forEach(el => {
      const cs = getComputedStyle(el);
      colorProps.forEach(p => {
        const v = cs[p];
        if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent' && !v.startsWith('linear-gradient')) {
          const key = v.replace(/\s+/g, ' ').trim();
          palette[key] = (palette[key] || 0) + 1;
        }
      });
    });
    const sorted = Object.entries(palette)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 60)
      .map(([color, count]) => ({ color, count }));
    return sorted;
  });

  // Extract CSS variables
  const cssVars = await page.evaluate(() => {
    const vars = {};
    const sheets = [...document.styleSheets];
    sheets.forEach(s => {
      try {
        [...s.cssRules].forEach(r => {
          if (r instanceof CSSStyleRule && r.selectorText === ':root') {
            [...r.style].forEach(p => {
              if (p.startsWith('--')) vars[p] = r.style.getPropertyValue(p).trim();
            });
          }
        });
      } catch {}
    });
    return vars;
  });

  // Extract all assets
  const assets = await page.evaluate(() => {
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight,
      parentClasses: img.parentElement?.className?.slice(0, 100) || '',
      pos: getComputedStyle(img).position, zIndex: getComputedStyle(img).zIndex
    }));
    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }));
    const svgs = [...document.querySelectorAll('svg')].length;
    return { images, favicons, svgCount: svgs };
  });

  // Get page title and meta
  const meta = await page.evaluate(() => ({
    title: document.title,
    metaDesc: document.querySelector('meta[name="description"]')?.content || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    bodyClass: document.body.className,
    htmlAttrs: document.documentElement.getAttribute('class') || ''
  }));

  // Extract page topology (all major sections)
  const topology = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('section, header, footer, nav, div[class*="section"], div[class*="container"], main, aside, [role="main"], [role="navigation"]')]
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 200 && rect.height > 20;
      })
      .map(el => ({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        classes: el.className?.toString().slice(0, 150),
        rect: { w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) },
        text: el.textContent.trim().slice(0, 100)
      }));
    return sections;
  });

  // Save all findings
  const findings = { fonts, colors, cssVars, assets, meta, topology, url: TARGET_URL };
  writeFileSync(out('research/reconnaissance.json'), JSON.stringify(findings, null, 2));
  writeFileSync(out('research/topology-raw.json'), JSON.stringify(topology, null, 2));

  // Now mobile screenshot
  console.log('\n=== MOBILE (390px) ===');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: out('design-references/fullpage-mobile.png'), fullPage: true });
  console.log('Screenshot saved: fullpage-mobile.png');

  // Extract DOM structure at mobile
  const mobileDom = await extractPage(page);
  writeFileSync(out('research/dom-mobile.json'), JSON.stringify(mobileDom, null, 2));

  // Full interaction sweep at desktop
  console.log('\n=== INTERACTION SWEEP ===');

  // Tab-based navigation detection
  const tabs = await page.evaluate(() => {
    const elements = [...document.querySelectorAll('[role="tab"], [class*="tab"], button, a, [class*="menu-item"], [class*="nav-item"]')]
      .slice(0, 50)
      .map(el => ({
        tag: el.tagName.toLowerCase(),
        classes: el.className?.toString().slice(0, 100),
        text: el.textContent.trim().slice(0, 50),
        href: el.href || '',
        rect: { x: Math.round(el.getBoundingClientRect().x), y: Math.round(el.getBoundingClientRect().y), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) }
      }));
    return elements;
  });

  // Use desktop viewport for mobile interaction sweep
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const desktopDom = await extractPage(page);
  writeFileSync(out('research/dom-desktop.json'), JSON.stringify(desktopDom, null, 2));
  writeFileSync(out('research/tabs-found.json'), JSON.stringify(tabs, null, 2));

  console.log(`\nFound ${tabs.length} interactive elements`);
  console.log('All recon data saved to docs/research/');

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
