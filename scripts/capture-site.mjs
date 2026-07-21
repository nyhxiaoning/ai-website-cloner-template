import { chromium } from 'playwright';

const URL = 'https://china.zecrs.com/';
const DESKTOP_W = 1440;
const MOBILE_W = 390;

async function extractAll(page) {
  return await page.evaluate(() => {
    const props = [
      'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
      'textTransform','textDecoration','backgroundColor','background',
      'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
      'margin','marginTop','marginRight','marginBottom','marginLeft',
      'width','height','maxWidth','minWidth','maxHeight','minHeight',
      'display','flexDirection','justifyContent','alignItems','gap',
      'gridTemplateColumns','gridTemplateRows',
      'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
      'boxShadow','overflow','overflowX','overflowY',
      'position','top','right','bottom','left','zIndex',
      'opacity','transform','transition','cursor',
      'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
      'whiteSpace','textOverflow','WebkitLineClamp'
    ];
    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
      return styles;
    }
    function walk(element, depth) {
      if (depth > 5) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || undefined,
        classes: element.className?.toString().split(' ').slice(0, 8).join(' '),
        text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 300) : null,
        styles: extractStyles(element),
        images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
        childCount: children.length,
        children: children.slice(0, 30).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }
    return walk(document.body, 0);
  });
}

async function discoverAssets(page) {
  return await page.evaluate(() => {
    return {
      images: [...document.querySelectorAll('img')].map(img => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        parentClasses: img.parentElement?.className,
        position: getComputedStyle(img).position,
        zIndex: getComputedStyle(img).zIndex
      })),
      videos: [...document.querySelectorAll('video')].map(v => ({
        src: v.src || v.querySelector('source')?.src,
        poster: v.poster,
        autoplay: v.autoplay,
        loop: v.loop
      })),
      backgroundImages: [...document.querySelectorAll('*')].filter(el => {
        const bg = getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none';
      }).map(el => ({
        url: getComputedStyle(el).backgroundImage,
        element: el.tagName + '.' + (el.className?.toString().split(' ')[0] || '')
      })),
      svgCount: document.querySelectorAll('svg').length,
      fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 300).map(el => getComputedStyle(el).fontFamily))],
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() })),
      manifestLink: document.querySelector('link[rel="manifest"]')?.href
    };
  });
}

async function getPageText(page) {
  return await page.evaluate(() => {
    const texts = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      const t = node.textContent.trim();
      if (t.length > 0) {
        const parent = node.parentElement;
        texts.push({
          text: t.slice(0, 500),
          tag: parent?.tagName,
          classes: parent?.className?.toString().split(' ').slice(0, 5).join(' ')
        });
      }
    }
    return texts;
  });
}

async function getInteractivity(page) {
  return await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button, [role="button"], a, [onclick]')].map(el => ({
      tag: el.tagName,
      text: el.textContent.trim().slice(0, 100),
      classes: el.className?.toString().split(' ').slice(0, 5).join(' '),
      href: el.href || undefined,
      role: el.getAttribute('role'),
      ariaLabel: el.getAttribute('aria-label')
    }));
    const inputs = [...document.querySelectorAll('input, select, textarea')].map(el => ({
      tag: el.tagName,
      type: el.type,
      placeholder: el.placeholder,
      classes: el.className?.toString().split(' ').slice(0, 5).join(' ')
    }));
    const sections = [...document.querySelectorAll('section, [data-section], [id]')].map(el => ({
      tag: el.tagName,
      id: el.id,
      classes: el.className?.toString().split(' ').slice(0, 5).join(' ')
    }));
    return { buttons, inputs, sections };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop viewport
  console.log('=== DESKTOP (1440px) ===');
  const desktopPage = await browser.newPage({ viewport: { width: DESKTOP_W, height: 900 } });
  await desktopPage.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(3000); // Wait for animations
  
  await desktopPage.screenshot({ path: 'docs/design-references/desktop-full.png', fullPage: true });
  await desktopPage.screenshot({ path: 'docs/design-references/desktop-viewport.png' });
  
  const desktopTree = await extractAll(desktopPage);
  const desktopAssets = await discoverAssets(desktopPage);
  const desktopTexts = await getPageText(desktopPage);
  const desktopInteract = await getInteractivity(desktopPage);
  
  const fs = await import('fs');
  fs.writeFileSync('docs/research/desktop-tree.json', JSON.stringify(desktopTree, null, 2));
  fs.writeFileSync('docs/research/desktop-assets.json', JSON.stringify(desktopAssets, null, 2));
  fs.writeFileSync('docs/research/desktop-texts.json', JSON.stringify(desktopTexts, null, 2));
  fs.writeFileSync('docs/research/desktop-interactivity.json', JSON.stringify(desktopInteract, null, 2));
  
  console.log('Desktop screenshots and data saved.');
  console.log('Images found:', desktopAssets.images.length);
  console.log('SVGs found:', desktopAssets.svgCount);
  console.log('Fonts:', desktopAssets.fonts);
  console.log('Buttons/links:', desktopInteract.buttons.length);
  
  await desktopPage.close();
  
  // Mobile viewport
  console.log('\n=== MOBILE (390px) ===');
  const mobilePage = await browser.newPage({ viewport: { width: MOBILE_W, height: 844 } });
  await mobilePage.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(3000);
  
  await mobilePage.screenshot({ path: 'docs/design-references/mobile-full.png', fullPage: true });
  await mobilePage.screenshot({ path: 'docs/design-references/mobile-viewport.png' });
  
  const mobileTree = await extractAll(mobilePage);
  fs.writeFileSync('docs/research/mobile-tree.json', JSON.stringify(mobileTree, null, 2));
  
  console.log('Mobile screenshots saved.');
  
  await mobilePage.close();
  await browser.close();
  
  console.log('\nDone. All data saved to docs/');
}

main().catch(e => { console.error(e); process.exit(1); });
