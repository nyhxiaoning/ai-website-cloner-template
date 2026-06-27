import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://fantastic-admin.hurui.me/pro-example';
const out = (path) => resolve(__dirname, '../docs', path);

async function main() {
  // First, download the CSS files directly
  const cssFiles = [
    'https://fantastic-admin.hurui.me/pro-example/assets/src-CVOjVobh.css',
    'https://fantastic-admin.hurui.me/pro-example/assets/index-DjpgJGQ7.css',
    'https://fantastic-admin.hurui.me/pro-example/assets/I18n-B0AeUMSZ.css',
    'https://fantastic-admin.hurui.me/pro-example/assets/login-C96bl7UZ.css'
  ];

  writeFileSync(out('research/css-manifest.json'), JSON.stringify({ cssFiles }, null, 2));
  console.log('CSS files listed in manifest');

  // Now try loading with Playwright differently
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'zh-CN'
  });

  const page = await context.newPage();

  // Block Baidu analytics
  await page.route('**/hm.baidu.com/**', route => route.abort());

  // Track all loaded resources
  const resources = { scripts: [], styles: [], images: [], fetches: [] };
  page.on('response', r => {
    const url = r.url();
    const type = r.request().resourceType();
    if (type === 'script' && url.includes('/pro-example/')) resources.scripts.push(url);
    else if (type === 'stylesheet') resources.styles.push(url);
    else if (type === 'image') resources.images.push({ url, status: r.status() });
    else if (type === 'fetch' || type === 'xhr') resources.fetches.push({ url, status: r.status() });
  });

  // Navigate with just domcontentloaded and wait manually
  await page.goto(BASE_URL + '/#/', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for all module scripts to load
  await page.waitForTimeout(5000);

  // Check the page state
  const state = await page.evaluate(() => {
    return {
      url: window.location.href,
      readyState: document.readyState,
      title: document.title,
      appExists: !!document.querySelector('#app'),
      appHTML: document.querySelector('#app')?.innerHTML?.slice(0, 300) || '',
      loadingExists: !!document.querySelector('[data-app-loading]'),
      bodyHTML: document.body.innerHTML.slice(0, 500)
    };
  });
  console.log('State:', JSON.stringify(state, null, 2));

  await page.waitForTimeout(3000);
  const state2 = await page.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    appHTML: document.querySelector('#app')?.innerHTML?.slice(0, 1000) || ''
  }));
  console.log('State after 3s:', JSON.stringify(state2, null, 2));

  await new Promise(r => setTimeout(r, 4000));
  const state3 = await page.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    appHTML: document.querySelector('#app')?.innerHTML?.slice(0, 2000) || ''
  }));
  console.log('State after 7s:', JSON.stringify(state3, null, 2));

  // Another wait for any async routing
  await new Promise(r => setTimeout(r, 5000));
  const state4 = await page.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    appHTML: document.querySelector('#app')?.innerHTML?.slice(0, 3000) || ''
  }));
  console.log('State after 12s:', JSON.stringify(state4, null, 2));

  console.log('\nResources:', JSON.stringify(resources, null, 2));

  await page.screenshot({ path: out('design-references/final-state.png'), fullPage: true });
  console.log('Final screenshot saved');

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
