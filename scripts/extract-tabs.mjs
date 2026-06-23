// scripts/extract-tabs.mjs
// Click each tab and extract the full rendered content
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';

const TARGET_URL = 'https://trial81.toolooz.com/';
const RESEARCH_DIR = join(dirname(new URL(import.meta.url).pathname), '..', 'docs', 'research');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const tabs = ['地图视图', '时间轴视图', '思维导图', '赞赏支持'];
  const allContent = {};

  // Get the full page HTML first
  allContent['initial'] = await page.evaluate(() => document.body.innerText);

  for (const tabText of tabs) {
    try {
      // Find and click the tab button
      const btn = page.locator('button', { hasText: tabText });
      await btn.click();
      await page.waitForTimeout(2000);

      // Extract full inner text and HTML
      const innerText = await page.evaluate(() => document.body.innerText);
      const innerHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');

      allContent[tabText] = { innerText, innerHTML };
      console.log(`Extracted: ${tabText} (${innerText.length} chars)`);
    } catch (e) {
      console.error(`Failed to click ${tabText}:`, e.message);
    }
  }

  // Save all content
  for (const [key, val] of Object.entries(allContent)) {
    if (typeof val === 'string') {
      writeFileSync(join(RESEARCH_DIR, `tab-${key}.txt`), val);
    } else {
      writeFileSync(join(RESEARCH_DIR, `tab-${key}.txt`), val.innerText);
      writeFileSync(join(RESEARCH_DIR, `tab-${key}.html`), val.innerHTML);
    }
  }

  console.log('All tab content saved to docs/research/');
  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
