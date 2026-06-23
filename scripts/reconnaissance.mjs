// scripts/reconnaissance.mjs
// Comprehensive site extraction for clone-website pipeline
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_URL = 'https://trial81.toolooz.com/';
const DOCS_DIR = join(__dirname, '..', 'docs');
const RESEARCH_DIR = join(DOCS_DIR, 'research');
const DESIGN_REF_DIR = join(DOCS_DIR, 'design-references');

// Helper: extract computed CSS for an element
const EXTRACT_CSS_SCRIPT = (selector) => `
(() => {
  const el = document.querySelector('${selector}');
  if (!el) return JSON.stringify({ error: 'Element not found: ${selector}' });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap','flexWrap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== '0') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      classes: element.className?.toString().slice(0, 200) || '',
      id: element.id || '',
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 200) : null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
      childCount: children.length,
      children: children.slice(0, 15).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})();
`;

async function run() {
  // Ensure directories exist
  mkdirSync(RESEARCH_DIR, { recursive: true });
  mkdirSync(DESIGN_REF_DIR, { recursive: true });
  mkdirSync(join(RESEARCH_DIR, 'components'), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Navigating to', TARGET_URL);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000); // Let animations settle

  // ==================== SCREENSHOTS ====================
  console.log('Taking screenshots...');
  await page.screenshot({ path: join(DESIGN_REF_DIR, 'desktop-full.png'), fullPage: true });

  // Mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(DESIGN_REF_DIR, 'mobile-full.png'), fullPage: true });

  // Switch back to desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  // ==================== GLOBAL EXTRACTION ====================
  console.log('Extracting global data...');

  // 1. Font info
  const fontInfo = await page.evaluate(() => {
    const fonts = new Set();
    const allEls = document.querySelectorAll('*');
    for (let i = 0; i < Math.min(allEls.length, 300); i++) {
      const f = getComputedStyle(allEls[i]).fontFamily;
      if (f && !f.includes('system') && !f.includes('fallback') && !f.includes('sans-serif') && !f.includes('serif')) {
        fonts.add(f);
      }
    }
    return {
      families: [...fonts],
      headings: [...new Set([...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(h => h.textContent.trim() + ' -> ' + getComputedStyle(h).fontSize + ' ' + getComputedStyle(h).fontWeight))].slice(0, 20),
      body: getComputedStyle(document.body).fontFamily + ' | ' + getComputedStyle(document.body).fontSize + ' | ' + getComputedStyle(document.body).fontWeight,
    };
  });

  // 2. Page structure / all sections
  const pageStructure = await page.evaluate(() => {
    const sections = [];
    // Find major sections by looking for direct children of body/main that are sections, divs, or semantic containers
    const main = document.querySelector('main') || document.body;
    const children = main.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const tag = el.tagName.toLowerCase();
      const cls = el.className?.toString().slice(0, 100) || '';
      const id = el.id || '';
      const rect = el.getBoundingClientRect();
      if (rect.width > 100 && rect.height > 50) {
        sections.push({
          index: i,
          tag, id, classes: cls,
          rect: { w: Math.round(rect.width), h: Math.round(rect.height), t: Math.round(rect.top) },
          textPreview: el.textContent.trim().slice(0, 150),
          childElements: el.children.length,
          hasImages: el.querySelectorAll('img').length > 0,
          hasLinks: el.querySelectorAll('a').length > 0,
        });
      }
    }
    return sections;
  });

  // 3. Color palette extraction
  const colorPalette = await page.evaluate(() => {
    const colors = new Map();
    const allEls = document.querySelectorAll('*');
    for (let i = 0; i < Math.min(allEls.length, 500); i++) {
      const cs = getComputedStyle(allEls[i]);
      ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
        const val = cs[prop];
        if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent' && !val.startsWith('rgb(0, 0, 0)')) {
          colors.set(val, (colors.get(val) || 0) + 1);
        }
      });
    }
    return [...colors.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
      .map(([color, count]) => ({ color, count }));
  });

  // 4. All links / meta / favicons
  const metaData = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() })),
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    links: [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href),
    scripts: [...document.querySelectorAll('script[src]')].map(s => s.src),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
  }));

  // 5. All images with URLs
  const allImages = await page.evaluate(() => {
    const imgs = document.querySelectorAll('img');
    return [...imgs].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      loading: img.loading,
      parentClasses: img.parentElement?.className?.slice(0, 100) || '',
      siblings: img.parentElement ? [...img.parentElement.querySelectorAll('img')].length : 0,
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex,
    })).filter(img => img.src && !img.src.startsWith('data:'));
  });

  // 6. SVG icons count and extraction
  const svgInfo = await page.evaluate(() => {
    const svgs = document.querySelectorAll('svg');
    return {
      count: svgs.length,
      svgs: [...svgs].slice(0, 5).map(svg => ({
        outerHTML: svg.outerHTML.slice(0, 1000),
        width: svg.getAttribute('width') || getComputedStyle(svg).width,
        height: svg.getAttribute('height') || getComputedStyle(svg).height,
        viewBox: svg.getAttribute('viewBox') || '',
      })),
    };
  });

  // 7. Check for Leaflet / interactive map
  const techStack = await page.evaluate(() => {
    const hasLeaflet = typeof L !== 'undefined';
    return {
      hasLeaflet,
      hasFontAwesome: document.querySelector('link[href*="font-awesome"]') !== null || document.querySelector('link[href*="fontawesome"]') !== null,
      hasBootstrap: document.querySelector('link[href*="bootstrap"]') !== null,
      isNextJS: window.__NEXT_DATA__ ? true : false,
      isVue: window.__VUE__ ? true : false,
      isjQuery: typeof jQuery !== 'undefined',
    };
  });

  // ==================== SCROLL SWEEP ====================
  console.log('Running scroll sweep...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const scrollBehavior = await page.evaluate(() => {
    return {
      hasLenis: document.querySelector('.lenis') !== null,
      hasScrollSnap: document.querySelector('[style*="scroll-snap"]') !== null || getComputedStyle(document.documentElement).scrollSnapType !== 'none',
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      overflowStyle: getComputedStyle(document.documentElement).overflow,
    };
  });

  // Check header change on scroll
  const headerBefore = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('[class*="header"]') || document.querySelector('nav');
    if (!header) return null;
    const cs = getComputedStyle(header);
    return {
      background: cs.background,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      position: cs.position,
      padding: cs.padding,
      backdropFilter: cs.backdropFilter,
    };
  });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);

  const headerAfter = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('[class*="header"]') || document.querySelector('nav');
    if (!header) return null;
    const cs = getComputedStyle(header);
    return {
      background: cs.background,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      position: cs.position,
      padding: cs.padding,
      backdropFilter: cs.backdropFilter,
    };
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // ==================== FULL PAGE STRUCTURE DUMP ====================
  console.log('Extracting full page HTML structure...');
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.slice(0, 50000)); // First 50k chars

  // ==================== INTERACTIVE ELEMENT SWEEP ====================
  console.log('Checking interactive elements...');
  const interactiveElements = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button, a, [role="button"], [onclick], .tab, [class*="tab"], [class*="pill"]');
    return [...buttons].slice(0, 30).map(b => ({
      tag: b.tagName.toLowerCase(),
      text: b.textContent.trim().slice(0, 80),
      href: b.href || '',
      classes: b.className?.toString().slice(0, 100) || '',
      id: b.id || '',
      rect: {
        w: Math.round(b.getBoundingClientRect().width),
        h: Math.round(b.getBoundingClientRect().height),
      },
    }));
  });

  // ==================== PAGE TOPOLOGY ====================
  console.log('Determining page sections and topology...');

  // Parse sections more completely
  const topology = await page.evaluate(() => {
    const sections = [];
    // Try to find major visual sections
    const potentialSections = document.querySelectorAll('main > *, body > *, section, div[class*="section"], div[class*="hero"], div[class*="feature"], div[class*="footer"], div[class*="header"], div[class*="nav"]');
    const seen = new Set();
    for (const el of potentialSections) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 200 || rect.height < 30) continue;
      const key = rect.top + '-' + rect.left;
      if (seen.has(key)) continue;
      seen.add(key);
      const cs = getComputedStyle(el);
      sections.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        classes: el.className?.toString().slice(0, 120) || '',
        position: cs.position,
        zIndex: cs.zIndex,
        display: cs.display,
        rect: { w: Math.round(rect.width), h: Math.round(rect.height), t: Math.round(rect.top), l: Math.round(rect.left) },
        textPreview: el.textContent.trim().slice(0, 100),
        childCount: el.children.length,
      });
    }
    // Sort top to bottom
    sections.sort((a, b) => a.rect.t - b.rect.t);
    return sections;
  });

  // ==================== WRITE RESULTS ====================
  const report = {
    url: TARGET_URL,
    timestamp: new Date().toISOString(),
    viewport: { desktop: '1440x900', mobile: '390x844' },
    title: metaData.title,
    description: metaData.description,
    fontInfo,
    techStack,
    scrollBehavior,
    headerState: { before: headerBefore, after: headerAfter },
    colorPalette,
    favicons: metaData.favicons,
    ogImage: metaData.ogImage,
    links: metaData.links,
    scripts: metaData.scripts,
    jsonLd: metaData.jsonLd,
    allImages,
    svgInfo,
    interactiveElements,
    pageTopology: topology,
    pageStructure: pageStructure.slice(0, 40),
  };

  writeFileSync(join(RESEARCH_DIR, 'reconnaissance.json'), JSON.stringify(report, null, 2));
  writeFileSync(join(RESEARCH_DIR, 'body-html.html'), bodyHTML);
  writeFileSync(join(RESEARCH_DIR, 'PAGE_TOPOLOGY.md'), generateTopologyDoc(topology));
  writeFileSync(join(RESEARCH_DIR, 'DESIGN_TOKENS.md'), generateDesignTokensDoc(report));

  console.log('Done! Check docs/research/ for output files.');
  await browser.close();
}

function generateTopologyDoc(sections) {
  let md = '# Page Topology\n\n';
  md += 'Sections from top to bottom (desktop 1440px):\n\n';
  md += '| # | Tag | Classes | Height | Preview |\n';
  md += '|---|-----|---------|--------|--------|\n';
  sections.forEach((s, i) => {
    md += `| ${i+1} | ${s.tag} | \`${s.classes.slice(0, 60)}\` | ${s.rect.h}px | ${s.textPreview.slice(0, 60)} |\n`;
  });
  return md;
}

function generateDesignTokensDoc(report) {
  let md = '# Design Tokens\n\n';
  md += `## Fonts\n\n`;
  md += `- Body: ${report.fontInfo.body}\n`;
  md += `- Families: ${report.fontInfo.families.join(', ')}\n\n`;
  md += '### Heading Sizes\n';
  report.fontInfo.headings.forEach(h => { md += `- ${h}\n`; });

  md += `\n## Colors (by frequency)\n\n`;
  md += '| Color | Count |\n|-------|-------|\n';
  report.colorPalette.forEach(c => {
    md += `| \`${c.color}\` | ${c.count} |\n`;
  });

  md += `\n## Tech Stack\n\n`;
  md += `- Leaflet Map: ${report.techStack.hasLeaflet}\n`;
  md += `- Font Awesome: ${report.techStack.hasFontAwesome}\n`;
  md += `- jQuery: ${report.techStack.isjQuery}\n`;
  md += `- Next.js: ${report.techStack.isNextJS}\n`;
  md += `- Vue: ${report.techStack.isVue}\n`;

  md += `\n## Scroll Behavior\n\n`;
  md += `- Has Lenis: ${report.scrollBehavior.hasLenis}\n`;
  md += `- Scroll Snap: ${report.scrollBehavior.hasScrollSnap}\n`;
  md += `- scroll-behavior: ${report.scrollBehavior.scrollBehavior}\n`;
  md += `- overflow: ${report.scrollBehavior.overflowStyle}\n`;

  if (report.headerState.before) {
    md += `\n## Header State Changes\n\n`;
    md += '### Before Scroll\n';
    md += `\`\`\`json\n${JSON.stringify(report.headerState.before, null, 2)}\n\`\`\`\n`;
    md += '### After Scroll (300px down)\n';
    md += `\`\`\`json\n${JSON.stringify(report.headerState.after, null, 2)}\n\`\`\`\n`;
  }

  return md;
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
