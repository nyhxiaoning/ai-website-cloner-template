import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.knowphilosophers.site/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Extract full SVG content
  const svgContents = await page.evaluate(() => {
    const svgs = [];
    document.querySelectorAll('svg').forEach((svg, i) => {
      const outer = svg.outerHTML;
      const viewBox = svg.getAttribute('viewBox') || '';
      const cls = svg.className?.toString() || '';
      const parentTag = svg.parentElement?.tagName || '';
      const parentCls = svg.parentElement?.className?.toString().slice(0, 100) || '';
      const siblingText = svg.parentElement?.textContent?.trim().slice(0, 80) || '';
      svgs.push({
        index: i,
        viewBox,
        classes: cls,
        parent: parentTag + (parentCls ? '.' + parentCls : ''),
        siblingText,
        html: outer
      });
    });
    return svgs;
  });

  writeFileSync('docs/research/knowphilosophers.site/svgs.json', JSON.stringify(svgContents, null, 2));
  console.log(`${svgContents.length} SVGs extracted`);

  // Show first few SVGs
  svgContents.slice(0, 10).forEach(s => {
    console.log(`\n=== SVG #${s.index} ===`);
    console.log(`ViewBox: ${s.viewBox}, Classes: ${s.classes}`);
    console.log(`Parent: ${s.parent}, Text: ${s.siblingText}`);
    console.log(s.html.length > 400 ? s.html.slice(0, 400) + '...' : s.html);
  });

  // Also try to take a viewport screenshot at scroll position to see the page
  // Scroll through and take section screenshots
  const sections = [
    { name: 'hero', y: 0 },
    { name: 'timeline-start', y: 500 },
    { name: 'debate-arena', y: 2000 }
  ];

  for (const section of sections) {
    await page.evaluate((y) => window.scrollTo(0, y), section.y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `docs/design-references/knowphilosophers.site/${section.name}.png` });
    console.log(`Screenshot: ${section.name}`);
  }

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
