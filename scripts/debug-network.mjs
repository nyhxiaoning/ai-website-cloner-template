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
    args: [
      '--no-sandbox', '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--allow-running-insecure-content'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Set a more realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  );

  // Capture network requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText,
      type: request.resourceType()
    });
  });

  const successfulRequests = [];
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push({
        url: response.url(),
        status: response.status(),
        type: response.request().resourceType()
      });
    } else if (response.request().resourceType() === 'script') {
      successfulRequests.push({ url: response.url(), status: response.status() });
    }
  });

  // Navigate and wait for everything
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  // Check what's in the app div
  const appContent = await page.evaluate(() => {
    const app = document.querySelector('#app');
    if (!app) return 'No #app found';
    return {
      childCount: app.children.length,
      html: app.innerHTML.slice(0, 3000),
      text: app.textContent.trim().slice(0, 500)
    };
  });

  console.log('App content:', JSON.stringify(appContent, null, 2));

  // List failed requests
  console.log('\nFailed requests:', JSON.stringify(failedRequests, null, 2));

  // Check if app div has any rerendering
  const loadingShown = await page.evaluate(() => {
    const loading = document.querySelector('[data-app-loading]');
    return loading ? 'Loading still shown' : 'Loading hidden';
  });
  console.log('\nLoading state:', loadingShown);

  // Try clicking or interacting
  const screenshotPath = out('design-references/initial-state.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Screenshot saved');

  // Check for iframes
  const iframes = await page.evaluate(() =>
    [...document.querySelectorAll('iframe')].map(f => ({ src: f.src, id: f.id }))
  );
  console.log('Iframes:', iframes);

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
