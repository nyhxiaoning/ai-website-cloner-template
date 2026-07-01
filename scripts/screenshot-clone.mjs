import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'docs/design-references/knowphilosophers.site/clone-desktop.png', fullPage: true });
  console.log('Clone screenshot taken');

  // Also screenshot hero area
  await page.screenshot({ path: 'docs/design-references/knowphilosophers.site/clone-hero.png' });
  console.log('Clone hero screenshot taken');

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
