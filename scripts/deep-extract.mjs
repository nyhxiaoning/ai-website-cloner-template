import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.knowphilosophers.site/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const result = {};

  // 1. Extract bottom nav
  result.bottomNav = await page.evaluate(() => {
    const navs = [...document.querySelectorAll('*')].filter(el => {
      try {
        const pos = getComputedStyle(el).position;
        return (pos === 'fixed' || pos === 'sticky') && el.textContent.includes('ΦΙΛΟΣΟΦΙΑ');
      } catch(e) { return false; }
    });
    if (navs.length === 0) return 'Not found';
    const nav = navs[0];
    const cs = getComputedStyle(nav);
    const styles = {};
    ['position', 'bottom', 'left', 'zIndex', 'display', 'alignItems', 'justifyContent', 'gap',
     'backgroundColor', 'backdropFilter', 'border', 'borderRadius', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
     'maxWidth', 'fontFamily', 'fontSize', 'color', 'boxShadow', 'height'].forEach(p => {
      const v = cs[p];
      if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') styles[p] = v;
    });
    return { tag: nav.tagName, classes: nav.className?.slice(0, 300), styles, html: nav.innerHTML.slice(0, 800) };
  });

  // 2. Extract hero section
  result.heroSection = await page.evaluate(() => {
    const allEls = [...document.querySelectorAll('h1, h2, h3, div, p')];
    for (const el of allEls) {
      if (!el || !el.textContent) continue;
      if (el.textContent.includes('西方哲学发展脉络交互图谱')) {
        let parent = el;
        let attempts = 0;
        while (parent && parent.parentElement && parent.parentElement.children.length < 5 && attempts < 5) {
          parent = parent.parentElement;
          attempts++;
        }
        if (!parent) continue;
        const cs = getComputedStyle(parent);
        const styles = {};
        ['padding', 'paddingTop', 'paddingBottom', 'maxWidth', 'margin', 'backgroundColor',
         'display', 'flexDirection', 'alignItems', 'gap', 'fontFamily', 'fontSize', 'color'].forEach(p => {
          const v = cs[p];
          if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') styles[p] = v;
        });
        return {
          container: { tag: parent.tagName, classes: parent.className?.slice(0, 300), styles },
          title: el.textContent?.trim(),
          titleStyles: (() => { try { const c = getComputedStyle(el); return { fontSize: c.fontSize, fontWeight: c.fontWeight, color: c.color, fontFamily: c.fontFamily, letterSpacing: c.letterSpacing }; } catch(e) { return {}; } })(),
          html: parent.innerHTML.slice(0, 2000)
        };
      }
    }
    return 'Not found';
  });

  // 3. Extract era labels
  result.eraLabels = await page.evaluate(() => {
    const eras = ['古希腊罗马哲学', '中世纪与经院哲学', '文艺复兴与近代早期哲学', '法兰西启蒙思想和唯物主义', '德意志古典哲学', '过渡时期与19世纪中后期', '现代派、英美分析与世纪后的大分分流'];
    const eraData = [];
    eras.forEach(eraName => {
      const els = [...document.querySelectorAll('*')].filter(el => {
        try { return el.textContent?.trim() === eraName; } catch(e) { return false; }
      });
      if (els.length > 0) {
        const el = els[0];
        if (!el) return;
        try {
          const cs = getComputedStyle(el);
          eraData.push({
            name: eraName,
            tag: el.tagName,
            classes: el.className?.slice(0, 200),
            styles: { fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, fontFamily: cs.fontFamily, letterSpacing: cs.letterSpacing }
          });
        } catch(e) {}
      }
    });
    return eraData;
  });

  // 4. Extract school labels
  result.schoolLabels = await page.evaluate(() => {
    const schools = ['米利都学派', '爱利亚学派', '毕达哥拉斯学派', '雅典学派', '斯多葛学派', '理性主义', '经验主义'];
    const schoolData = [];
    schools.forEach(school => {
      const els = [...document.querySelectorAll('span, div, p, h3')].filter(el => {
        try { return el.textContent?.trim() === school; } catch(e) { return false; }
      });
      if (els.length > 0) {
        const el = els[0];
        if (!el) return;
        try {
          const cs = getComputedStyle(el);
          schoolData.push({
            name: school,
            tag: el.tagName,
            classes: el.className?.slice(0, 200),
            styles: { fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, fontFamily: cs.fontFamily, letterSpacing: cs.letterSpacing, opacity: cs.opacity }
          });
        } catch(e) {}
      }
    });
    return schoolData;
  });

  // 5. Extract all philosopher data
  result.philosopherData = await page.evaluate(() => {
    const nodes = [];
    const allEls = document.querySelectorAll('*');
    const seen = new Set();

    allEls.forEach(el => {
      try {
        const style = el.getAttribute('style') || '';
        if (!style.includes('left:') || !style.includes('top:')) return;
        if (seen.has(el)) return;
        seen.add(el);

        const title = el.getAttribute('title') || '';
        const text = el.textContent?.trim() || '';
        const hasChinese = /[\u4e00-\u9fff]/.test(text);
        const hasEnglish = /[a-zA-Z]{3,}/.test(text);
        if (!hasChinese && !title) return;

        const leftMatch = style.match(/left:\s*([^;%]+)/);
        const topMatch = style.match(/top:\s*([^;%]+)/);

        const children = [...el.querySelectorAll('span, h3, div')].slice(0, 5).map(s => ({
          text: s.textContent?.trim()?.slice(0, 100),
          classes: (s.className || '').slice(0, 150)
        })).filter(s => s.text);

        nodes.push({
          title: title.slice(0, 200),
          text: text.slice(0, 300),
          left: leftMatch ? leftMatch[1].trim() : null,
          top: topMatch ? topMatch[1].trim() : null,
          opacity: style.match(/opacity:\s*([^;]+)/)?.[1]?.trim(),
          children,
          classes: (el.className || '').slice(0, 300)
        });
      } catch(e) {}
    });
    return nodes;
  });

  // 6. Extract SVG icons
  result.svgs = await page.evaluate(() => {
    const icons = [];
    document.querySelectorAll('svg').forEach((svg, i) => {
      try {
        const html = svg.outerHTML;
        const cls = svg.className?.toString() || '';
        const viewBox = svg.getAttribute('viewBox') || '';
        const parent = svg.parentElement?.tagName || '';
        const parentText = svg.parentElement?.textContent?.trim().slice(0, 80) || '';
        // Extract paths
        const paths = [...svg.querySelectorAll('path')].map(p => p.getAttribute('d')).filter(Boolean);
        icons.push({ index: i, classes: cls, viewBox, parent, parentText, pathCount: paths.length, html: html.slice(0, 600) });
      } catch(e) {}
    });
    return icons;
  });

  // 7. Extract all century/period markers
  result.periodMarkers = await page.evaluate(() => {
    const periods = [];
    document.querySelectorAll('*').forEach(el => {
      try {
        const text = el.textContent?.trim() || '';
        if (!text) return;
        const style = el.getAttribute('style') || '';
        if (!style.includes('left:') && !style.includes('top:')) return;
        if (/^(BC|AD)\s*\d|^\d+\s*世纪|^\d+~\d+/.test(text)) {
          const cs = getComputedStyle(el);
          periods.push({
            text,
            left: el.style.left,
            top: el.style.top,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            color: cs.color,
            classes: (el.className || '').slice(0, 150)
          });
        }
      } catch(e) {}
    });
    return periods;
  });

  // 8. Extract filter bar
  result.filterBar = await page.evaluate(() => {
    const els = [...document.querySelectorAll('*')].filter(el => {
      try { return el.textContent?.includes('谱系学等阶筛选'); } catch(e) { return false; }
    });
    if (els.length === 0) return 'Not found';
    const filterEl = els[0];
    try {
      let section = filterEl.parentElement;
      let attempts = 0;
      while (section && section.children.length < 3 && attempts < 5) {
        section = section.parentElement;
        attempts++;
      }
      if (!section) return 'Could not find container';
      const cs = getComputedStyle(section);
      const styles = {};
      ['display', 'padding', 'backgroundColor', 'border', 'borderRadius', 'gap', 'flexDirection', 'alignItems', 'margin', 'maxWidth'].forEach(p => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') styles[p] = v;
      });
      return { tag: section.tagName, classes: section.className?.slice(0, 300), styles, html: section.outerHTML.slice(0, 3000) };
    } catch(e) { return 'Error: ' + e.message; }
  });

  // 9. Extract debate arena
  result.debateArena = await page.evaluate(() => {
    const els = [...document.querySelectorAll('*')].filter(el => {
      try { return el.textContent?.includes('对话广场'); } catch(e) { return false; }
    });
    if (els.length === 0) return 'Not found';
    const debateEl = els[0];
    try {
      let section = debateEl.parentElement;
      let attempts = 0;
      while (section && section.children.length < 8 && attempts < 10) {
        section = section.parentElement;
        attempts++;
      }
      if (!section) return 'Could not find container';
      const cs = getComputedStyle(section);
      const styles = {};
      ['padding', 'backgroundColor', 'border', 'borderRadius', 'margin', 'maxWidth', 'display', 'flexDirection', 'gap', 'width'].forEach(p => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') styles[p] = v;
      });
      return { tag: section.tagName, classes: section.className?.slice(0, 300), styles, html: section.outerHTML.slice(0, 5000) };
    } catch(e) { return 'Error: ' + e.message; }
  });

  // 10. Extract oklch category colors
  result.oklchColors = await page.evaluate(() => {
    const colors = new Set();
    document.querySelectorAll('*').forEach(el => {
      try {
        const cs = getComputedStyle(el);
        ['backgroundColor', 'color', 'borderColor'].forEach(p => {
          const v = cs[p];
          if (v && v.startsWith('oklch')) colors.add(v);
        });
      } catch(e) {}
    });
    return [...colors];
  });

  writeFileSync('docs/research/knowphilosophers.site/extraction.json', JSON.stringify(result, null, 2));
  console.log('Extraction complete.');

  // Summary
  console.log(`Philosopher nodes: ${result.philosopherData?.length || 0}`);
  console.log(`Period markers: ${result.periodMarkers?.length || 0}`);
  console.log(`Unique oklch colors: ${result.oklchColors?.length || 0}`);
  console.log(`SVG icons: ${result.svgs?.length || 0}`);

  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
