import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CLONE_URL = 'http://localhost:3000';
const REF_DIR = 'docs/design-references/prompt-studio';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(CLONE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(REF_DIR, 'clone-desktop.png') });

  // Full page
  await page.screenshot({ path: path.join(REF_DIR, 'clone-desktop-full.png'), fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(REF_DIR, 'clone-mobile.png'), fullPage: true });

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(REF_DIR, 'clone-tablet.png') });

  // Extract text to verify content
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Clone text content:', text);

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
