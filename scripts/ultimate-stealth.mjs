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
      '--window-size=1440,900',
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'zh-CN',
    timezoneId: 'Asia/Shanghai',
    deviceScaleFactor: 2,
    hasTouch: false,
  });

  const page = await context.newPage();

  // Override ALL headless detection signals
  await page.addInitScript(() => {
    // Override navigator.webdriver
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

    // Override chrome.runtime
    (window as any).chrome = {
      runtime: {
        onMessage: { addListener: () => {} },
        onConnect: { addListener: () => {} },
        sendMessage: () => {},
        id: 'chrome'
      },
      loadTimes: () => {},
      csi: () => {},
      app: { isInstalled: false }
    };

    // Override plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer' },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai' },
        { name: 'Native Client', filename: 'internal-nacl-plugin' }
      ] as any
    });

    Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh', 'en'] });

    // Override permissions
    const originalQuery = navigator.permissions.query;
    navigator.permissions.query = (params: any) => {
      if (params.name === 'notifications') return Promise.resolve({ state: 'prompt' } as any);
      return originalQuery(params);
    };

    // Override webdriver check
    const getPrototypeOf = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')?.get;
    if (getPrototypeOf) {
      Object.defineProperty(document, 'cookie', {
        get: () => getPrototypeOf.call(document),
        set: (val) => { (document as any).__cookie = val; }
      });
    }

    // Prevent about:blank navigations from the router
    let lastHref = window.location.href;
    const pushState = history.pushState.bind(history);
    history.pushState = function(...args: any[]) {
      const url = args[2];
      if (url && url.toString().startsWith('about:')) {
        console.warn('[BLOCKED] pushState to about:', url);
        return;
      }
      return pushState.apply(history, args);
    };

    const replaceState = history.replaceState.bind(history);
    history.replaceState = function(...args: any[]) {
      const url = args[2];
      if (url && url.toString().startsWith('about:')) {
        console.warn('[BLOCKED] replaceState to about:', url);
        return;
      }
      return replaceState.apply(history, args);
    };

    // Intercept location.href assignments
    let locationDescriptor = Object.getOwnPropertyDescriptor(window, 'location')!;
    let _location = window.location;
    let locationBlocker = setInterval(() => {
      if (window.location.href === 'about:blank' && _location.href !== 'about:blank') {
        console.warn('[BLOCKED] location changed to about:blank, restoring');
        // Don't restore — the router already committed
      }
    }, 100);

    // Special override for window.location = 'about:blank'
    // (this bypasses the setter protection)
    const origDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'location');
    if (origDesc && origDesc.set) {
      const origSet = origDesc.set;
      try {
        Object.defineProperty(window, 'location', {
          set: function(val: any) {
            if (val === 'about:blank' || val?.toString?.() === 'about:blank') {
              console.warn('[BLOCKED] window.location = about:blank');
              return;
            }
            origSet.call(window, val);
          },
          get: function() { return origDesc.get!.call(window); },
          configurable: true
        });
      } catch(e) {
        console.warn('Could not override location setter:', e);
      }
    }
  });

  // Also intercept at the network level
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url === 'about:blank' && route.request().isNavigationRequest()) {
      console.log('[NETWORK] Blocked about:blank navigation');
      route.abort();
      return;
    }
    route.continue();
  });

  // Block baidu analytics
  await page.route('**/hm.baidu.com/**', route => route.abort());

  const logs: string[] = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    if (type === 'warning' || type === 'error') {
      logs.push(`[${type}] ${text.slice(0, 200)}`);
    }
  });

  console.log('Navigating...');
  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => {
      const app = document.querySelector('#app');
      return {
        url: window.location.href,
        title: document.title,
        appExists: !!app,
        appChildren: app ? app.children.length : 0,
        appHTML: app ? app.innerHTML.slice(0, 500) : 'NO APP',
        appLoading: !!document.querySelector('[data-app-loading]'),
      };
    }).catch(() => ({ url: 'error', title: 'error', appExists: false, appChildren: -1, appHTML: 'error', appLoading: false }));

    console.log(`T+${i+1}s: url="${state.url.slice(0, 70)}", app=${state.appChildren}ch, "${state.title}"`);

    // If app rendered with content, we're done
    if (state.appChildren > 2 && state.appHTML.length > 100 && !state.appHTML.includes('app-loading')) {
      console.log('APP RENDERED!');
      const fullAppHTML = await page.evaluate(() => document.querySelector('#app')?.innerHTML || '');
      writeFileSync(out('research/app-rendered.html'), fullAppHTML);
      const fullPageHTML = await page.evaluate(() => document.documentElement.outerHTML);
      writeFileSync(out('research/full-page-rendered.html'), fullPageHTML);
      break;
    }
  }

  await page.screenshot({ path: out('design-references/stealth-final.png'), fullPage: true });
  console.log('\nScreenshot saved');

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
