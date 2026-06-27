import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET_URL = 'https://fantastic-admin.hurui.me/pro-example/#/';
const out = (path) => resolve(__dirname, '../docs', path);

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'zh-CN',
  });

  const page = await context.newPage();

  // Log console messages
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text().slice(0, 200));
  });

  // Track network
  const failedReqs = [];
  page.on('requestfailed', req => {
    failedReqs.push({ url: req.url().slice(0, 120), err: req.failure()?.errorText });
  });

  const responses = [];
  page.on('response', r => {
    if (r.url().includes('assets/')) {
      responses.push({ url: r.url().slice(0, 120), status: r.status() });
    }
  });

  console.log('Navigating...');
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait longer for SPA to boot
  await page.waitForTimeout(3000);

  for (let i = 0; i < 30; i++) {
    const state = await page.evaluate(() => {
      const app = document.querySelector('#app');
      const loading = document.querySelector('[data-app-loading]');
      return {
        appChildren: app ? app.children.length : -1,
        appHTML: app ? app.innerHTML.slice(0, 300).replace(/\s+/g, ' ').trim() : 'no app',
        loading: loading ? 'visible' : 'hidden',
        title: document.title,
        bodyChildren: document.body.children.length
      };
    }).catch(() => ({ appChildren: -2, appHTML: 'error', loading: 'error', title: 'error', bodyChildren: -1 }));

    console.log(`T+${i+1}s: app=${state.appChildren}, loading=${state.loading}, title="${state.title}"`);

    if (state.appChildren > 1 && !state.appHTML.includes('app-loading') && state.title !== 'Fantastic-admin' && state.title) {
      console.log('APP LOADED!');
      break;
    }
  }

  const finalState = await page.evaluate(() => {
    const app = document.querySelector('#app');
    let html = '';
    if (app) html = app.innerHTML.slice(0, 10000).replace(/\s+/g, ' ').trim();
    return {
      html: html,
      title: document.title
    };
  }).catch(() => ({ html: 'evaluate failed', title: 'error' }));

  console.log('\n=== APP CONTENT ===');
  console.log(finalState.html);
  console.log('\nTitle:', finalState.title);

  // Take screenshot
  await page.screenshot({ path: out('design-references/playwright-fullpage.png'), fullPage: true });
  console.log('\nScreenshot saved');

  console.log('\nFailed requests:', JSON.stringify(failedReqs.slice(0, 5), null, 2));
  console.log('Asset responses:', JSON.stringify(responses.slice(0, 10), null, 2));

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
