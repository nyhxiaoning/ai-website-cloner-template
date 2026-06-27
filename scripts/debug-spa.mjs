import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_URL = 'https://fantastic-admin.hurui.me/pro-example/#/';
const out = (path) => resolve(__dirname, '../docs', path);

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // First check raw page source before JS
  const rawPage = await browser.newPage();
  const response = await rawPage.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
  const rawHtml = await rawPage.content();
  writeFileSync(out('research/raw-html-initial.html'), rawHtml);

  const scripts = await rawPage.evaluate(() =>
    [...document.querySelectorAll('script')].map(s => ({ src: s.src, type: s.type, text: s.text.slice(0, 200) }))
  );
  writeFileSync(out('research/scripts.json'), JSON.stringify(scripts, null, 2));
  console.log(`Found ${scripts.length} scripts, app HTML length: ${rawHtml.length}`);

  // Now try with JS enabled and longer wait
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Listen for console messages to debug
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait and check every second to see if SPA renders
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const bodyChildren = await page.evaluate(() => document.body.children.length);
    const title = await page.evaluate(() => document.title);
    console.log(`Second ${i+1}: body children=${bodyChildren}, title="${title}"`);

    if (bodyChildren > 0 && title) break;
  }

  const html = await page.content();
  writeFileSync(out('research/dom-full.html'), html);

  const bodyHTML = await page.evaluate(() => document.body.innerHTML.slice(0, 5000));
  console.log('\nBody HTML (first 5000 chars):');
  console.log(bodyHTML);

  // Try to find any visible elements
  const visible = await page.evaluate(() => {
    const all = [...document.querySelectorAll('*')];
    const visible_ = all.filter(el => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    });
    return visible_.slice(0, 30).map(el => ({
      tag: el.tagName.toLowerCase(),
      id: el.id,
      cls: el.className?.toString().slice(0, 100),
      text: el.textContent.trim().slice(0, 80),
      rect: { w: Math.round(rect.width), h: Math.round(rect.height) }
    }));
  });
  console.log(`\nVisible elements (${visible.length}):`, JSON.stringify(visible.slice(0, 15), null, 2));

  await page.screenshot({ path: out('design-references/spa-check.png'), fullPage: true });
  console.log('\nScreenshot saved');

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
