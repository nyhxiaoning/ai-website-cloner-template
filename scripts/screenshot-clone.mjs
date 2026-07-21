import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'docs/design-references/clone-desktop.png' });
  console.log('Clone screenshot saved');
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
