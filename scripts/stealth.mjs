import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

puppeteer.use(StealthPlugin());

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_URL = 'https://fantastic-admin.hurui.me/pro-example/#/';
const out = (path) => resolve(__dirname, '../docs', path);

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1440,900'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Override navigator.webdriver
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  // Monitor for failures
  const failed = [];
  page.on('requestfailed', r => {
    failed.push({ url: r.url().slice(0, 100), err: r.failure()?.errorText });
  });

  let loaded = false;
  page.on('response', r => {
    if (r.url().includes('index-ffzmp8YI.js') && r.status() === 200) loaded = true;
  });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for app to potentially mount
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const appHtml = await page.evaluate(() => {
      const app = document.querySelector('#app');
      return app ? app.children.length + ' children, html: ' + app.innerHTML.slice(0, 500) : 'no #app';
    });
    const title = await page.evaluate(() => document.title);
    console.log(`Second ${i+1}: app=${appHtml}, title="${title}", scriptsLoaded=${loaded}`);

    if (loaded && !appHtml.includes('no #app') && appHtml.includes('>')) break;
  }

  // Take screenshot
  await page.screenshot({ path: out('design-references/stealth-desktop.png'), fullPage: true });

  // If loaded, extract everything
  if (loaded) {
    console.log('\n=== APP LOADED! Extracting data... ===');

    const pageTitle = await page.evaluate(() => document.title);
    console.log('Title:', pageTitle);

    const bodyHTML = await page.evaluate(() => document.body.innerHTML.slice(0, 5000));
    console.log('\nBody HTML:', bodyHTML);

    const appHTML = await page.evaluate(() => document.querySelector('#app')?.innerHTML?.slice(0, 5000));
    console.log('\nApp inner HTML:', appHTML);
  }

  console.log('\nFailed requests:', JSON.stringify(failed.slice(0, 5), null, 2));
  console.log('Scripts loaded:', loaded);

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
