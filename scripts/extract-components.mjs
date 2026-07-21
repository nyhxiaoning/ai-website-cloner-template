import { chromium } from 'playwright';
import fs from 'fs';

const URL = 'https://china.zecrs.com/';

function extractCSS(selector) {
  return `(function(selector) {
    const el = document.querySelector(selector);
    if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
    const props = [
      'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
      'textTransform','textDecoration','backgroundColor','background',
      'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
      'margin','marginTop','marginRight','marginBottom','marginLeft',
      'width','height','maxWidth','minWidth','maxHeight','minHeight',
      'display','flexDirection','justifyContent','alignItems','gap',
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
      props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
      return styles;
    }
    function walk(element, depth) {
      if (depth > 4) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || undefined,
        classes: element.className?.toString().split(' ').slice(0, 8).join(' '),
        text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 300) : null,
        styles: extractStyles(element),
        images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt } : null,
        childCount: children.length,
        children: children.slice(0, 30).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }
    return JSON.stringify(walk(el, 0), null, 2);
  })('${selector}')`;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Extract topbar CSS
  const topbar = await page.evaluate(extractCSS('.topbar'));
  fs.writeFileSync('docs/research/topbar.css.json', topbar);

  // Extract workspace CSS
  const workspace = await page.evaluate(extractCSS('.workspace'));
  fs.writeFileSync('docs/research/workspace.css.json', workspace);

  // Extract map-area CSS
  const mapArea = await page.evaluate(extractCSS('.map-area'));
  fs.writeFileSync('docs/research/map-area.css.json', mapArea);

  // Extract explore-panel CSS
  const panel = await page.evaluate(extractCSS('.explore-panel'));
  fs.writeFileSync('docs/research/panel.css.json', panel);

  // Extract place card CSS
  const card = await page.evaluate(extractCSS('.place-card'));
  fs.writeFileSync('docs/research/card.css.json', card);

  // Extract SVG map
  const svgContent = await page.evaluate(() => {
    const svg = document.querySelector('.map-area svg') || document.querySelector('svg[viewBox]');
    if (!svg) return null;
    return svg.outerHTML;
  });
  if (svgContent) {
    fs.writeFileSync('docs/research/china-map.svg', svgContent);
    console.log('SVG map extracted');
  }

  // Extract province data from SVG
  const provinces = await page.evaluate(() => {
    const paths = document.querySelectorAll('.map-area path[id]');
    return [...paths].map(p => ({
      id: p.id,
      d: p.getAttribute('d')?.slice(0, 100) + '...',
      fill: getComputedStyle(p).fill || p.getAttribute('fill'),
      classes: p.className?.baseVal
    }));
  });
  fs.writeFileSync('docs/research/provinces.json', JSON.stringify(provinces, null, 2));

  // Extract all card data
  const cards = await page.evaluate(() => {
    const cards = document.querySelectorAll('.place-card');
    return [...cards].map(card => {
      const cover = card.querySelector('.place-cover');
      const badge = card.querySelector('.level-badge b');
      const title = card.querySelector('h3');
      const location = card.querySelector('.place-tags span');
      const type = card.querySelector('.place-tags i:not(.trend-tag)');
      const trend = card.querySelector('.trend-tag');
      const desc = card.querySelector('.place-desc small');
      const meta = card.querySelector('.place-meta');
      const metaTexts = meta ? [...meta.querySelectorAll('span')].map(s => s.textContent.trim()) : [];
      return {
        level: badge?.textContent,
        title: title?.textContent,
        location: location?.textContent,
        type: type?.textContent,
        trend: trend?.textContent,
        description: desc?.textContent,
        meta: metaTexts,
        coverClass: cover?.className
      };
    });
  });
  fs.writeFileSync('docs/research/cards.json', JSON.stringify(cards, null, 2));

  // Extract SVG icons used in the page
  const svgs = await page.evaluate(() => {
    const allSvgs = document.querySelectorAll('svg');
    const iconMap = {};
    [...allSvgs].forEach((svg, i) => {
      const parent = svg.parentElement;
      const label = parent?.getAttribute('aria-label') || parent?.className?.toString() || `svg-${i}`;
      if (!iconMap[label]) {
        iconMap[label] = svg.outerHTML.slice(0, 500);
      }
    });
    return iconMap;
  });
  fs.writeFileSync('docs/research/icons.json', JSON.stringify(svgs, null, 2));

  // Extract heatmap gradient colors
  const heatmap = await page.evaluate(() => {
    const legend = document.querySelector('.heatmap-bar i') || document.querySelector('i[style*="linear-gradient"]');
    if (!legend) return null;
    return getComputedStyle(legend).backgroundImage;
  });
  fs.writeFileSync('docs/research/heatmap.json', JSON.stringify({ gradient: heatmap }));

  console.log('All component data extracted.');
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
