import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'https://prompt-studio-7gh.pages.dev/';
const RESEARCH_DIR = 'docs/research/prompt-studio';
const REF_DIR = 'docs/design-references/prompt-studio';

fs.mkdirSync(RESEARCH_DIR, { recursive: true });
fs.mkdirSync(REF_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Listen for console events
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Screenshot initial state
  await page.screenshot({ path: path.join(REF_DIR, '01-setup-screen.png'), fullPage: true });

  // Try to click the "选择工作目录" button and see what happens
  const btn = page.locator('button:has-text("选择工作目录")');
  console.log('Button visible:', await btn.isVisible());

  // Try clicking the button
  try {
    await btn.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(REF_DIR, '02-after-click.png'), fullPage: true });

    // Extract new content
    const newText = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync(path.join(RESEARCH_DIR, 'after-click.txt'), newText);
    console.log('After click text:', newText.slice(0, 500));

    // Extract new DOM
    const newDom = await page.evaluate(() => {
      function walk(el, depth) {
        if (depth > 4) return null;
        const children = [...el.children];
        return {
          tag: el.tagName.toLowerCase(),
          classes: el.className?.toString().split(' ').slice(0, 5),
          text: el.childNodes.length <= 2 ? el.textContent?.trim().slice(0, 100) : null,
          childCount: children.length,
          children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean),
        };
      }
      return walk(document.body, 0);
    });
    fs.writeFileSync(path.join(RESEARCH_DIR, 'dom-after-click.json'), JSON.stringify(newDom, null, 2));
  } catch (e) {
    console.log('Click failed:', e.message);
  }

  // Now try to navigate with a fake directory selection
  // The button likely triggers a directory picker - let's intercept it
  page.evaluate(() => {
    // Override showDirectoryPicker to auto-select
    if ('showDirectoryPicker' in window) {
      window.showDirectoryPicker = async () => {
        return {
          name: 'prompt-studio-demo',
          kind: 'directory',
          getFileHandle: async () => ({ getFile: async () => new File([''], 'test') }),
          getDirectoryHandle: async () => ({ entries: async function*() {} }),
          removeEntry: async () => {},
        };
      };
    }
  });

  try {
    await btn.click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(REF_DIR, '03-after-directory-select.png'), fullPage: true });

    const fullText = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync(path.join(RESEARCH_DIR, 'full-app-text.txt'), fullText);
    console.log('Full app text (first 1000):', fullText.slice(0, 1000));

    // Get the full DOM
    const fullDom = await page.evaluate(() => {
      function walk(el, depth) {
        if (depth > 6) return null;
        const children = [...el.children];
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id,
          classes: el.className?.toString().split(' ').slice(0, 8).join(' '),
          text: el.childNodes.length <= 3 ? el.textContent?.trim().slice(0, 200) : null,
          childCount: children.length,
          children: children.slice(0, 30).map(c => walk(c, depth + 1)).filter(Boolean),
        };
      }
      return walk(document.body, 0);
    });
    fs.writeFileSync(path.join(RESEARCH_DIR, 'full-app-dom.json'), JSON.stringify(fullDom, null, 2));

    // Extract all routes/links
    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a[href]')].map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent?.trim().slice(0, 50),
        classes: a.className?.toString().split(' ').slice(0, 5),
      }));
    });
    fs.writeFileSync(path.join(RESEARCH_DIR, 'links.json'), JSON.stringify(links, null, 2));

    // Extract buttons
    const buttons = await page.evaluate(() => {
      return [...document.querySelectorAll('button')].map(b => ({
        text: b.textContent?.trim().slice(0, 50),
        classes: b.className?.toString().split(' ').slice(0, 5),
        type: b.type,
      }));
    });
    fs.writeFileSync(path.join(RESEARCH_DIR, 'buttons.json'), JSON.stringify(buttons, null, 2));

    // Get computed styles of key elements
    const styles = await page.evaluate(() => {
      const sels = ['h1', 'h2', 'h3', 'button', 'a', 'nav', 'aside', 'input', 'section', '.card'];
      const res = {};
      sels.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
          const cs = getComputedStyle(el);
          res[sel] = {
            tag: el.tagName,
            text: el.textContent?.slice(0, 50),
            font: cs.font,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            color: cs.color,
            bg: cs.backgroundColor,
            padding: cs.padding,
            margin: cs.margin,
            borderRadius: cs.borderRadius,
            border: cs.border,
            display: cs.display,
          };
        }
      });
      return res;
    });
    fs.writeFileSync(path.join(RESEARCH_DIR, 'key-styles.json'), JSON.stringify(styles, null, 2));

    // Full page screenshot
    await page.screenshot({ path: path.join(REF_DIR, '04-full-app.png'), fullPage: true });

    // Try navigating to different routes
    const routes = ['/snippets', '/rules', '/settings'];
    for (const route of routes) {
      try {
        await page.goto(URL + route, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(REF_DIR, `route-${route.slice(1)}.png`), fullPage: true });
        const text = await page.evaluate(() => document.body.innerText);
        fs.writeFileSync(path.join(RESEARCH_DIR, `route-${route.slice(1)}.txt`), text);
        console.log(`Route ${route}:`, text.slice(0, 200));
      } catch (e) {
        console.log(`Route ${route} failed:`, e.message);
      }
    }

  } catch (e) {
    console.log('Directory selection failed:', e.message);
  }

  await browser.close();
  console.log('Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
