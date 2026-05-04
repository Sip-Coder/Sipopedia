const fs = require('fs');
const path = require('path');
const source = fs.readFileSync('src/data/commodityStudies.ts', 'utf8');
const pattern = /\{\s*id: "([^"]+)",\s*commodity: "([^"]+)",\s*name: "([^"]+)",\s*family: "([^"]+)"/g;
const seen = new Set();
const items = [];
let match;
while ((match = pattern.exec(source))) {
  const [, id, commodity, name, family] = match;
  const key = `${commodity}/${id}`;
  if (seen.has(key)) continue;
  seen.add(key);
  items.push({ id, commodity, name, family });
}
const notesByCommodity = {
  grains: 'show the raw grain kernels or malted grain as a clean educational ingredient study for beer and spirits production',
  hops: 'show whole hop cones and lupulin detail as a clean educational ingredient study for beer production',
  coffee: 'show coffee beans or coffee cherries as appropriate for the named species or cultivar, clean educational coffee reference',
  tea: 'show loose tea leaves or prepared leaf form appropriate for the named tea type, clean educational tea reference',
  fruit: 'show the fresh fruit as a clean educational ingredient study for juice, wine, and spirits production'
};
const jobs = items.map((item) => ({
  model: 'gpt-image-2',
  prompt: [
    'Use case: photorealistic-natural.',
    'Asset type: Sip Studies Grapes & Grains commodity reference photo.',
    `Primary request: Photorealistic static reference photo of ${item.name}, a ${item.family.toLowerCase()}.`,
    `Subject: ${item.name}; ${notesByCommodity[item.commodity] || 'clean educational beverage ingredient reference'}.`,
    'Scene/backdrop: dark teal studio background matching a premium beverage education website, subtle surface, no clutter.',
    'Style/medium: macro educational product photography, realistic texture, accurate morphology, high clarity.',
    'Composition/framing: one centered primary subject, fully visible, generous margin, square crop, suitable for a card and detail page.',
    'Lighting/mood: soft directional studio light, crisp detail, restrained premium academic feel.',
    'Constraints: no text, no labels, no watermark, no logo, no hands, no packaging, no glassware unless essential to show the raw ingredient, no cartoon, no illustration.'
  ].join(' '),
  use_case: 'photorealistic-natural',
  style: 'macro educational product photography, realistic beverage ingredient reference',
  composition: 'centered single subject, square crop, generous margin, fully visible',
  constraints: 'no text, no labels, no watermark, no logos, no hands, no packaging, no clutter',
  size: '1024x1024',
  quality: 'medium',
  out: `${item.commodity}/${item.id}.png`
}));
fs.mkdirSync('tmp/imagegen', { recursive: true });
fs.mkdirSync('public/commodities', { recursive: true });
for (const commodity of ['grains', 'hops', 'coffee', 'tea', 'fruit']) fs.mkdirSync(path.join('public/commodities', commodity), { recursive: true });
fs.writeFileSync('tmp/imagegen/commodity-photos.jsonl', jobs.map((job) => JSON.stringify(job)).join('\n') + '\n');
fs.writeFileSync('tmp/imagegen/commodity-photos-smoke.jsonl', JSON.stringify(jobs[0]) + '\n');
console.log(`wrote ${jobs.length} jobs`);
