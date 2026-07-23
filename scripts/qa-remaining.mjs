import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ORIGINAL_URL = 'https://prompt-studio-7gh.pages.dev/';
const CLONE_URL = 'http://localhost:3000';
const REF_DIR = 'docs/design-references/prompt-studio';

function safeExtract(fn) {
  return function(data) {
    try { return fn(data); } catch(e) { return 'ERROR: ' + e.message; }
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  // ========== SETUP SCREEN ==========
  console.log('\n=== SETUP SCREEN COMPARISON ===');

  // --- Original ---
  const origCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const origPage = await origCtx.newPage();
  await origPage.goto(ORIGINAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await origPage.waitForTimeout(3000);
  results.origSetup = await origPage.evaluate(() => {
    const main = document.querySelector('main');
    const section = document.querySelector('section');
    const allP = section ? [...section.querySelectorAll('p')] : [];
    const brand = allP[0];
    const desc = allP.find(p => p.textContent && p.textContent.length > 50) || allP[1];
    const heading = section ? section.querySelector('h1') : null;
    const btn = section ? section.querySelector('button') : null;
    return {
      bodyText: document.body.innerText,
      mainBg: main ? getComputedStyle(main).backgroundColor : null,
      sectionBg: section ? getComputedStyle(section).backgroundColor : null,
      sectionBorder: section ? getComputedStyle(section).border : null,
      sectionRadius: section ? getComputedStyle(section).borderRadius : null,
      sectionPadding: section ? getComputedStyle(section).padding : null,
      sectionMaxWidth: section ? getComputedStyle(section).maxWidth : null,
      sectionShadow: section ? getComputedStyle(section).boxShadow : null,
      brandColor: brand ? getComputedStyle(brand).color : null,
      brandSize: brand ? getComputedStyle(brand).fontSize : null,
      brandWeight: brand ? getComputedStyle(brand).fontWeight : null,
      brandTransform: brand ? getComputedStyle(brand).textTransform : null,
      brandText: brand ? brand.textContent : null,
      h1Color: heading ? getComputedStyle(heading).color : null,
      h1Size: heading ? getComputedStyle(heading).fontSize : null,
      h1Weight: heading ? getComputedStyle(heading).fontWeight : null,
      h1LineHeight: heading ? getComputedStyle(heading).lineHeight : null,
      h1Text: heading ? heading.textContent : null,
      descColor: desc ? getComputedStyle(desc).color : null,
      descSize: desc ? getComputedStyle(desc).fontSize : null,
      descLineHeight: desc ? getComputedStyle(desc).lineHeight : null,
      descText: desc ? (desc.textContent || '').slice(0, 80) : null,
      btnColor: btn ? getComputedStyle(btn).color : null,
      btnBg: btn ? getComputedStyle(btn).backgroundColor : null,
      btnSize: btn ? getComputedStyle(btn).fontSize : null,
      btnWeight: btn ? getComputedStyle(btn).fontWeight : null,
      btnPadding: btn ? getComputedStyle(btn).padding : null,
      btnRadius: btn ? getComputedStyle(btn).borderRadius : null,
      btnText: btn ? btn.textContent : null,
    };
  });

  // --- Clone ---
  const cloneCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const clonePage = await cloneCtx.newPage();
  await clonePage.goto(CLONE_URL, { waitUntil: 'networkidle', timeout: 15000 });
  await clonePage.waitForTimeout(2000);
  results.cloneSetup = await clonePage.evaluate(() => {
    const main = document.querySelector('main');
    const section = document.querySelector('section');
    const allP = section ? [...section.querySelectorAll('p')] : [];
    const brand = allP[0];
    const desc = allP.find(p => p.textContent && p.textContent.length > 50) || allP[1];
    const heading = section ? section.querySelector('h1') : null;
    const btn = section ? section.querySelector('button') : null;
    return {
      bodyText: document.body.innerText,
      mainBg: main ? getComputedStyle(main).backgroundColor : null,
      sectionBg: section ? getComputedStyle(section).backgroundColor : null,
      sectionBorder: section ? getComputedStyle(section).border : null,
      sectionRadius: section ? getComputedStyle(section).borderRadius : null,
      sectionPadding: section ? getComputedStyle(section).padding : null,
      sectionMaxWidth: section ? getComputedStyle(section).maxWidth : null,
      sectionShadow: section ? getComputedStyle(section).boxShadow : null,
      brandColor: brand ? getComputedStyle(brand).color : null,
      brandSize: brand ? getComputedStyle(brand).fontSize : null,
      brandWeight: brand ? getComputedStyle(brand).fontWeight : null,
      brandTransform: brand ? getComputedStyle(brand).textTransform : null,
      brandText: brand ? brand.textContent : null,
      h1Color: heading ? getComputedStyle(heading).color : null,
      h1Size: heading ? getComputedStyle(heading).fontSize : null,
      h1Weight: heading ? getComputedStyle(heading).fontWeight : null,
      h1LineHeight: heading ? getComputedStyle(heading).lineHeight : null,
      h1Text: heading ? heading.textContent : null,
      descColor: desc ? getComputedStyle(desc).color : null,
      descSize: desc ? getComputedStyle(desc).fontSize : null,
      descLineHeight: desc ? getComputedStyle(desc).lineHeight : null,
      descText: desc ? (desc.textContent || '').slice(0, 80) : null,
      btnColor: btn ? getComputedStyle(btn).color : null,
      btnBg: btn ? getComputedStyle(btn).backgroundColor : null,
      btnSize: btn ? getComputedStyle(btn).fontSize : null,
      btnWeight: btn ? getComputedStyle(btn).fontWeight : null,
      btnPadding: btn ? getComputedStyle(btn).padding : null,
      btnRadius: btn ? getComputedStyle(btn).borderRadius : null,
      btnText: btn ? btn.textContent : null,
    };
  });

  // ========== WORKSPACE ==========
  console.log('\n=== WORKSPACE COMPARISON ===');
  await clonePage.evaluate(() => {
    window.showDirectoryPicker = async function () { throw new Error('cancelled'); };
  });
  await clonePage.click('button:has-text("选择工作目录")');
  await clonePage.waitForTimeout(3000);

  // Original site only has setup screen, skip workspace comparison for original
  results.origWorkspace = { bodyText: 'original has no workspace', hasAside: false };

  results.cloneWorkspace = await clonePage.evaluate(() => ({
    hasAside: !!document.querySelector('aside'),
    bodyText: document.body.innerText.slice(0, 500),
  }));

  await cloneCtx.close();
  await origCtx.close();

  // ========== PRINT DIFF ==========
  const o = results.origSetup;
  const c = results.cloneSetup;

  console.log('\n--- Text Content ---');
  console.log('Body match:', o.bodyText === c.bodyText ? '✓' : '✗');
  console.log('Orig:', o.bodyText?.slice(0, 80));
  console.log('Clone:', c.bodyText?.slice(0, 80));

  console.log('\n--- Main ---');
  console.log('bg:', o.mainBg, '→', c.mainBg, o.mainBg === c.mainBg ? '✓' : '✗');

  console.log('\n--- Section ---');
  console.log('bg:', o.sectionBg, '→', c.sectionBg, o.sectionBg === c.sectionBg ? '✓' : '✗');
  console.log('border:', o.sectionBorder, '→', c.sectionBorder, o.sectionBorder === c.sectionBorder ? '✓' : '✗');
  console.log('radius:', o.sectionRadius, '→', c.sectionRadius, o.sectionRadius === c.sectionRadius ? '✓' : '✗');
  console.log('padding:', o.sectionPadding, '→', c.sectionPadding, o.sectionPadding === c.sectionPadding ? '✓' : '✗');
  console.log('maxWidth:', o.sectionMaxWidth, '→', c.sectionMaxWidth, o.sectionMaxWidth === c.sectionMaxWidth ? '✓' : '✗');

  console.log('\n--- Brand ---');
  console.log('color:', o.brandColor, '→', c.brandColor, o.brandColor === c.brandColor ? '✓' : '✗');
  console.log('size:', o.brandSize, '→', c.brandSize, o.brandSize === c.brandSize ? '✓' : '✗');
  console.log('weight:', o.brandWeight, '→', c.brandWeight, o.brandWeight === c.brandWeight ? '✓' : '✗');
  console.log('text:', o.brandText, '→', c.brandText, o.brandText === c.brandText ? '✓' : '✗');

  console.log('\n--- H1 ---');
  console.log('color:', o.h1Color, '→', c.h1Color, o.h1Color === c.h1Color ? '✓' : '✗');
  console.log('size:', o.h1Size, '→', c.h1Size, o.h1Size === c.h1Size ? '✓' : '✗');
  console.log('weight:', o.h1Weight, '→', c.h1Weight, o.h1Weight === c.h1Weight ? '✓' : '✗');
  console.log('text:', o.h1Text, '→', c.h1Text, o.h1Text === c.h1Text ? '✓' : '✗');

  console.log('\n--- Description ---');
  console.log('color:', o.descColor, '→', c.descColor, o.descColor === c.descColor ? '✓' : '✗');
  console.log('size:', o.descSize, '→', c.descSize, o.descSize === c.descSize ? '✓' : '✗');
  console.log('text:', o.descText?.slice(0, 50), '→', c.descText?.slice(0, 50));

  console.log('\n--- Button ---');
  console.log('color:', o.btnColor, '→', c.btnColor, o.btnColor === c.btnColor ? '✓' : '✗');
  console.log('bg:', o.btnBg, '→', c.btnBg, o.btnBg === c.btnBg ? '✓' : '✗');
  console.log('size:', o.btnSize, '→', c.btnSize, o.btnSize === c.btnSize ? '✓' : '✗');
  console.log('weight:', o.btnWeight, '→', c.btnWeight, o.btnWeight === c.btnWeight ? '✓' : '✗');
  console.log('padding:', o.btnPadding, '→', c.btnPadding, o.btnPadding === c.btnPadding ? '✓' : '✗');
  console.log('radius:', o.btnRadius, '→', c.btnRadius, o.btnRadius === c.btnRadius ? '✓' : '✗');
  console.log('text:', o.btnText, '→', c.btnText, o.btnText === c.btnText ? '✓' : '✗');

  console.log('\n--- Workspace ---');
  console.log('Has aside:', results.origWorkspace.hasAside, '→', results.cloneWorkspace.hasAside);
  console.log('Text match:', results.origWorkspace.bodyText === results.cloneWorkspace.bodyText ? '✓' : '✗');

  fs.writeFileSync(path.join(REF_DIR, 'qa-diff.json'), JSON.stringify(results, null, 2));
  console.log('\nDiff saved.');
  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
