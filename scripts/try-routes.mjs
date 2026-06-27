import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://fantastic-admin.hurui.me/pro-example';
const out = (path) => resolve(__dirname, '../docs', path);

async function tryRoute(browser, route) {
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[${route}] ERROR:`, msg.text().slice(0, 150));
    if (msg.type() === 'info' || msg.type() === 'log') console.log(`[${route}] LOG:`, msg.text().slice(0, 150));
  });

  let finalUrl = route;
  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) finalUrl = frame.url();
  });

  await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(8000);

  const state = await page.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    appHTML: document.querySelector('#app')?.innerHTML?.slice(0, 2000) || 'NO APP'
  })).catch(() => ({ url: finalUrl, title: 'error', appHTML: 'evaluation failed' }));

  console.log(`\n[${route}] Final URL: ${state.url}`);
  console.log(`[${route}] Title: "${state.title}"`);
  console.log(`[${route}] App HTML (${state.appHTML.length} chars):`);
  console.log(state.appHTML.slice(0, 1000));

  return { route, state, page };
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const routes = [
    `${BASE}/#/`,
    `${BASE}/#/login`,
    `${BASE}/#/dashboard`,
    `${BASE}/#/dashboard/workplace`,
    `${BASE}`,
  ];

  for (const route of routes) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Trying: ${route}`);
    console.log('='.repeat(60));
    try {
      const result = await tryRoute(browser, route);
      if (result.state.appHTML !== 'NO APP' && result.state.appHTML !== 'evaluation failed' && result.state.appHTML.length > 50) {
        const filename = route.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40);
        writeFileSync(out(`research/route-${filename}.html`), result.state.appHTML);
      }
      await result.page.close();
    } catch (e) {
      console.log(`[${route}] Error:`, e.message.slice(0, 200));
    }
  }

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
