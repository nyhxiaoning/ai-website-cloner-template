import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const CLONE_URL = 'http://localhost:3000';
const REF_DIR = 'docs/design-references/prompt-studio';

async function main() {
  const browser = await chromium.launch({ headless: true });

  // ---- Setup screen screenshots ----
  const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1 = await ctx1.newPage();
  await page1.goto(CLONE_URL, { waitUntil: 'networkidle', timeout: 15000 });
  await page1.waitForTimeout(2000);
  await page1.screenshot({ path: path.join(REF_DIR, 'qa-setup-desktop.png') });
  await page1.setViewportSize({ width: 390, height: 844 });
  await page1.waitForTimeout(500);
  await page1.screenshot({ path: path.join(REF_DIR, 'qa-setup-mobile.png'), fullPage: true });
  await ctx1.close();
  console.log('Setup screenshots done');

  // ---- Workspace screenshots ----
  const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page2 = await ctx2.newPage();

  // Intercept any navigations to override showDirectoryPicker before it's called
  await page2.addInitScript(() => {
    // Override before React hydration
    const orig = window.showDirectoryPicker;
    window.showDirectoryPicker = async function (...args) {
      throw new Error('User cancelled directory picker');
    };
  });

  await page2.goto(CLONE_URL, { waitUntil: 'networkidle', timeout: 15000 });
  await page2.waitForTimeout(3000);

  // Override in page context too
  await page2.evaluate(() => {
    window.showDirectoryPicker = async function () {
      throw new Error('User cancelled');
    };
  });

  await page2.click('button:has-text("选择工作目录")');
  await page2.waitForTimeout(3000);

  // Check if we're past setup
  const text = await page2.evaluate(() => document.body.innerText);
  console.log('After click text:', text.slice(0, 200));

  if (text.includes('Prompt 不存在') || text.includes('看板') || text.includes('项目')) {
    // We're in workspace mode
    await page2.screenshot({ path: path.join(REF_DIR, 'qa-workspace-desktop.png'), fullPage: true });
    console.log('Workspace desktop screenshot done');
  } else if (text.includes('选择工作目录')) {
    console.log('Still on setup screen - directory picker blocking');
    // Try to trigger the onDirectorySelected callback directly via state manipulation
    // The catch block in the button handler should handle the thrown error
    await page2.evaluate(() => {
      // Manually dispatch the onDirectorySelected callback
      const root = document.getElementById('root');
      // Find the onDirectorySelected call in catch block
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('选择工作目录')) {
          btn.click();
        }
      }
    });
    await page2.waitForTimeout(3000);
    const text2 = await page2.evaluate(() => document.body.innerText);
    console.log('After eval text:', text2.slice(0, 200));
    if (!text2.includes('选择工作目录')) {
      await page2.screenshot({ path: path.join(REF_DIR, 'qa-workspace-desktop.png'), fullPage: true });
      console.log('Workspace desktop screenshot done');
    } else {
      console.log('Could not advance past setup screen');
      await page2.screenshot({ path: path.join(REF_DIR, 'qa-workspace-setup-stuck.png') });
    }
  }

  await ctx2.close();
  console.log('Done');
}

main().catch(err => { console.error(err); process.exit(1); });
