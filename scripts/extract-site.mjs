import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.knowphilosophers.site/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Screenshots at multiple viewports
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'docs/design-references/knowphilosophers.site/desktop-1440.png', fullPage: true });
  console.log('Desktop 1440px screenshot taken');

  await page.setViewportSize({ width: 768, height: 900 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'docs/design-references/knowphilosophers.site/tablet-768.png', fullPage: true });
  console.log('Tablet 768px screenshot taken');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'docs/design-references/knowphilosophers.site/mobile-390.png', fullPage: true });
  console.log('Mobile 390px screenshot taken');

  // Restore desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  // === Extract text content ===
  const textContent = await page.evaluate(() => {
    // Get all text nodes from the body
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) {
      const t = walker.currentNode.textContent.trim();
      if (t.length > 2) texts.push(t);
    }
    return texts;
  });
  console.log('=== ALL TEXT CONTENT ===');
  textContent.forEach(t => console.log(t));
  console.log('=== END TEXT ===');

  // === Extract SVG icons ===
  const svgs = await page.evaluate(() => {
    const icons = [];
    document.querySelectorAll('svg').forEach((svg, i) => {
      const html = svg.outerHTML;
      const cls = svg.className?.toString() || '';
      const parent = svg.parentElement?.tagName || '';
      const siblingText = svg.parentElement?.textContent?.trim().slice(0, 50) || '';
      icons.push({ index: i, classes: cls, parent, siblingText, html: html.slice(0, 500) });
    });
    return icons;
  });
  console.log('=== SVGs ===');
  svgs.forEach(s => console.log(`SVG#${s.index} class="${s.classes}" parent=${s.parent} near="${s.siblingText}"`));

  // === Extract philosopher nodes ===
  const philosophers = await page.evaluate(() => {
    const nodes = [];
    document.querySelectorAll('[class*="absolute"]').forEach(el => {
      const title = el.getAttribute('title');
      const text = el.textContent?.trim();
      if (title || (text && text.length > 3)) {
        const style = el.getAttribute('style') || '';
        nodes.push({
          title: title || '',
          text: text?.slice(0, 100) || '',
          style: style,
          classes: (el.className || '').slice(0, 200),
          tag: el.tagName
        });
      }
    });
    return nodes;
  });
  console.log('\n=== PHILOSOPHER NODES ===');
  philosophers.forEach(p => {
    if (p.title || (p.text && p.text.length > 5 && !p.text.includes('opensubmenu'))) {
      console.log(`[${p.tag}] title="${p.title}" text="${p.text}" style="${p.style.slice(0, 200)}"`);
    }
  });

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
