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
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Intercept all navigations
  await page.route('**/*', (route) => {
    const url = route.request().url();
    // Block only about:blank navigations from JS
    if (url === 'about:blank' && route.request().isNavigationRequest()) {
      console.log('Blocked about:blank navigation!');
      route.abort();
      return;
    }
    route.continue();
  });

  // Intercept and prevent window.location changes
  await page.addInitScript(() => {
    // Prevent about:blank navigation
    const originalLocation = window.location;
    let locationWarned = false;
    Object.defineProperty(window, 'location', {
      set: function(val) {
        if (val === 'about:blank') {
          console.warn('[BLOCKED] about:blank navigation');
          if (!locationWarned) {
            locationWarned = true;
            document.body.innerHTML = '<div id="blocked-nav">Navigation to about:blank was blocked</div>';
          }
          return;
        }
        originalLocation.href = val;
      },
      get: function() { return originalLocation; }
    });
  });

  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Initial navigation done');

  // Wait and observe
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(1000);
    try {
      const state = await page.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        bodyHTML: document.body.innerHTML.slice(0, 3000),
        appExists: !!document.querySelector('#app'),
        appChildren: document.querySelector('#app')?.children?.length || 0,
      }));
      console.log(`T+${i+1}s: url=${state.url.slice(0, 60)}, app=${state.appChildren} children, "${state.title}"`);

      // If we see the blocked message, try to continue
      if (state.bodyHTML.includes('blocked-nav')) {
        console.log('Navigation was blocked, checking current state...');
        writeFileSync(out('research/blocked-navigation.html'), state.bodyHTML);

        // Check if the original app content is still there
        const fullHTML = await page.evaluate(() => document.documentElement.outerHTML);
        writeFileSync(out('research/full-html-with-block.html'), fullHTML);
      }
    } catch (e) {
      console.log(`T+${i+1}s: Error evaluating page state`);
    }
  }

  await page.screenshot({ path: out('design-references/blocked-nav.png'), fullPage: true });

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
