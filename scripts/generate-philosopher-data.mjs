import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('docs/research/knowphilosophers.site/extraction.json', 'utf8'));
const nodes = data.philosopherData || [];

// Parse each node into structured data
const philosophers = nodes.map((node, index) => {
  const title = node.title || '';
  const text = node.text || '';
  const children = node.children || [];

  // Extract school from children
  const schoolEl = children.find(c => c.text && !/[A-Z]/.test(c.text) && (c.text.includes('学派') || c.text.includes('主义') || c.text.includes('倾向') || c.text.includes('派')));
  const school = schoolEl?.text || '';

  // Extract Chinese name
  const chineseName = children.find(c => c.text && /[\u4e00-\u9fff]/.test(c.text) && !c.text.includes('学派') && !c.text.includes('主义'))?.text || '';

  // Extract English name
  const englishName = children.find(c => c.text && /^[A-Z]/.test(c.text) && c.text.length > 2)?.text || '';

  // Extract rating from title
  const ratingMatch = title.match(/★+\s*\[(\d)阶\]|★+\s*•\s*【学术定位】(\d+)★|★+\s*★+\s*/);
  let rating = 3;
  if (title.includes('★★★★★')) rating = 5;
  else if (title.includes('★★★★☆')) rating = 4;
  else if (title.includes('★★★☆☆')) rating = 3;
  else if (title.includes('★★☆☆☆')) rating = 2;
  else if (title.includes('★☆☆☆☆')) rating = 1;

  return {
    id: `p${index}`,
    chineseName: chineseName || title.split('(')[0].trim(),
    englishName: englishName || (title.match(/\(([^)]+)\)/)?.[1] || '').split('•')[0].trim(),
    school,
    era: '', // Will be mapped later
    rating,
    position: { left: node.left || '0%', top: node.top || '0%' },
    opacity: node.opacity,
    classes: node.classes?.slice(0, 200) || ''
  };
}).filter(p => p.chineseName || p.englishName);

// Write the data as TypeScript
let tsOutput = `import type { Philosopher } from "./philosophy";

export const philosophers: Philosopher[] = ${JSON.stringify(philosophers, null, 2)};
`;

writeFileSync('src/data/philosophers.ts', tsOutput);
console.log(`Generated ${philosophers.length} philosopher entries`);
console.log('Sample:', JSON.stringify(philosophers.slice(0, 3), null, 2));
