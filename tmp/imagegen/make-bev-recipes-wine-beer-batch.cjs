const fs = require('fs');
const path = require('path');

const source = fs.readFileSync('src/components/Cocktails.tsx', 'utf8');
function extractArray(name) {
  const start = source.indexOf(`const ${name}: BevItem[] = [`);
  if (start < 0) throw new Error(`Missing ${name}`);
  const arrayStart = source.indexOf('[', start);
  const endMarker = '\n];';
  const end = source.indexOf(endMarker, arrayStart);
  if (end < 0) throw new Error(`Missing end for ${name}`);
  const text = source.slice(arrayStart, end + 2);
  return Function(`return ${text};`)();
}

const beerItems = extractArray('beerItems');
const wineItems = extractArray('wineItems');

function wineBottleCue(item) {
  const text = `${item.name} ${item.invented} ${item.family}`.toLowerCase();
  if (text.includes('bordeaux') || text.includes('cabernet') || text.includes('merlot') || text.includes('malbec')) return 'regional Bordeaux-style shoulder bottle with an unreadable blank cream label';
  if (text.includes('burgundy') || text.includes('pinot') || text.includes('chardonnay')) return 'regional Burgundy-style slope-shoulder bottle with an unreadable blank cream label';
  if (text.includes('rhone') || text.includes('syrah') || text.includes('viognier')) return 'regional Rhone-style dark glass bottle with an unreadable blank cream label';
  if (text.includes('rioja') || text.includes('tempranillo')) return 'Spanish Rioja-style bottle with gold capsule and an unreadable blank cream label';
  if (text.includes('tuscany') || text.includes('sangiovese')) return 'Tuscan bottle style with an unreadable blank cream label';
  if (text.includes('riesling') || text.includes('gewurztraminer') || text.includes('alsace') || text.includes('rhine') || text.includes('mosel')) return 'tall slender Rhine or Alsace flute bottle with an unreadable blank cream label';
  if (text.includes('albarino') || text.includes('rias baixas')) return 'green Spanish Atlantic white-wine bottle with an unreadable blank cream label';
  return 'regional wine bottle with an unreadable blank cream label';
}

function wineBackgroundCue(item) {
  const text = `${item.name} ${item.invented}`.toLowerCase();
  if (text.includes('bordeaux')) return 'Bordeaux vineyard with gravel lanes, low trained vines, and a limestone chateau in the distance';
  if (text.includes('burgundy')) return 'Burgundy limestone vineyard rows, low trained Pinot/Chardonnay vines, stone walls, and a small village roofline';
  if (text.includes('rhone')) return 'Rhone Valley vineyard with stony soils, bush vines or cordon-trained vines, cypress, and old stone village architecture';
  if (text.includes('mendoza')) return 'Mendoza high-altitude vineyard with alluvial stones, vertical shoot positioned vines, and Andes mountains in the background';
  if (text.includes('rioja') || text.includes('ribera')) return 'Spanish Rioja/Ribera vineyard with limestone-clay soils, goblet and trellised vines, and sandstone bodega architecture';
  if (text.includes('tuscany')) return 'Tuscan hillside vineyard with cordon-trained Sangiovese vines, cypress, terracotta villa, and galestro-like stones';
  if (text.includes('loire')) return 'Loire Valley vineyard with limestone tuffeau cellar architecture, cool green slopes, and cane-pruned vines';
  if (text.includes('rhine') || text.includes('mosel')) return 'steep German slate vineyard with terraced Riesling vines, river bend, and half-timbered village architecture';
  if (text.includes('alsace')) return 'Alsace vineyard with Vosges foothills, tall-trained vines, and colorful half-timbered village architecture';
  if (text.includes('rias baixas')) return 'Rias Baixas Atlantic vineyard with pergola-trained Albarino vines, granite posts, misty coastal light, and stone architecture';
  return 'regional vineyard with appropriate vine rows, local soils, and traditional wine-country architecture';
}

function beerSettingCue(item) {
  const text = `${item.name} ${item.invented} ${item.family}`.toLowerCase();
  if (text.includes('czech') || text.includes('plzen')) return 'Czech lager hall with copper taps, pale stone cellar details, and bright polished lager service';
  if (text.includes('munich') || text.includes('bavaria') || text.includes('germany')) return 'Bavarian beer hall or lager cellar with copper kettles, warm wood, tiled walls, and traditional ambiance';
  if (text.includes('vienna') || text.includes('austria')) return 'Viennese lager tasting room with copper brewing vessels, amber wood, and old-world central European details';
  if (text.includes('belgium') || text.includes('wallonia') || text.includes('hoegaarden')) return 'Belgian beer hall with stone walls, copper brewhouse, warm lamps, and farmhouse brewing atmosphere';
  if (text.includes('london') || text.includes('england') || text.includes('u.k.')) return 'English pub brewery counter with handpulls, dark wood, brick, and classic cask-cellar atmosphere';
  if (text.includes('vermont') || text.includes('united states') || text.includes('u.s.')) return 'modern American craft brewery tasting room with stainless fermenters, hop-forward ambiance, and warm counter lighting';
  return 'regional brewery tasting room with visible brewing equipment, warm counter lighting, and style-appropriate beer hall ambiance';
}

function beerBottleCue(item) {
  const text = `${item.name} ${item.family}`.toLowerCase();
  if (text.includes('lager') || text.includes('pilsner') || text.includes('helles')) return 'brown longneck regional lager bottle with no readable label';
  if (text.includes('wheat') || text.includes('witbier')) return 'tall regional wheat-beer bottle with no readable label';
  if (text.includes('farmhouse') || text.includes('belgian')) return 'Belgian-style cork-and-cage bottle with no readable label';
  if (text.includes('dark') || text.includes('porter') || text.includes('stout')) return 'dark brown stout bottle with no readable label';
  if (text.includes('hoppy') || text.includes('ipa') || text.includes('pale')) return 'modern craft beer bottle with no readable label';
  return 'regional beer bottle with no readable label';
}

function wineScenePrompt(item) {
  const color = item.wineColor === 'red' ? 'deep red wine with realistic ruby to garnet highlights' : 'white wine with realistic pale straw to golden highlights';
  return `Use case: photorealistic-natural. Asset type: Bev Recipes selected wine photo. Primary request: A premium editorial beverage photo of ${item.name}. Subject: a ${item.glassware} filled with ${color}, beside a ${wineBottleCue(item)} on a fancy table in the vineyard region. Regional setting: ${wineBackgroundCue(item)}. Terroir cue: ${item.terroir || item.invented}. Style cues: ${item.family}; sensory profile ${item.profile.join(', ')}. Composition/framing: square crop, glass as hero subject, bottle secondary, elegant tabletop foreground, vineyard and regional architecture softly visible behind. Lighting/mood: golden-hour natural light, premium sommelier education aesthetic, realistic reflections and glass transparency. Constraints: no readable text, no logos, no brand marks, no people, no hands, no cartoon, no illustration. Avoid: misshapen glass, extra glasses, fake labels, watermark, text overlays, cluttered table, overfilled glass.`;
}

function wineColorPrompt(item) {
  const color = item.wineColor === 'red' ? 'red wine hue, rim variation, core depth, legs, and concentration from ruby through garnet tones as appropriate' : 'white wine hue, rim brightness, straw-to-gold concentration, viscosity, and clarity as appropriate';
  return `Use case: photorealistic-natural. Asset type: Bev Recipes wine color and concentration study. Primary request: A close educational photo of ${item.name} in a tilted clear ${item.glassware}, angled about 35 to 45 degrees to show ${color}. Subject: one transparent wine glass only, partially filled and tilted so the wine pools on one side like a professional color assessment. Background: clean premium dark teal studio with soft backlight, no vineyard scene, no chart text. Composition/framing: square crop, glass centered, liquid meniscus and color gradient clearly visible, generous margin. Lighting/mood: backlit sommelier tasting-room lighting, crisp rim highlights, realistic glass refraction. Constraints: no readable text, no labels, no bottle, no logo, no hands, no people, no watermark, no cartoon, no illustration. Avoid: spilling wine, impossible liquid physics, multiple glasses, opaque glass, over-dark image.`;
}

function beerScenePrompt(item) {
  return `Use case: photorealistic-natural. Asset type: Bev Recipes selected beer photo. Primary request: A premium editorial beverage photo of ${item.name}. Subject: a ${item.glassware} filled with style-accurate ${item.name} beer, realistic foam head and color, beside a ${beerBottleCue(item)} on a counter in a regional tasting room or beer hall. Regional setting: ${beerSettingCue(item)}. Style cues: ${item.family}; ${item.method}; ingredients ${item.detailLines.join('; ')}; sensory profile ${item.profile.join(', ')}. Composition/framing: square crop, beer glass as hero subject, bottle secondary, counter foreground, brewing equipment and ambiance softly visible behind. Lighting/mood: warm beer-hall or taproom lighting, realistic condensation, glass reflections, premium beverage education aesthetic. Constraints: no readable text, no logos, no brand marks, no people, no hands, no cartoon, no illustration. Avoid: misshapen glass, extra glasses, fake labels, watermark, text overlays, cluttered counter, wrong beer color.`;
}

function beerColorPrompt(item) {
  return `Use case: photorealistic-natural. Asset type: Bev Recipes beer color and concentration study. Primary request: A close educational photo of ${item.name} in a tilted clear ${item.glassware}, angled about 35 to 45 degrees to show beer color, clarity or haze, foam, and concentration. Subject: one transparent beer glass only, partially filled and tilted so the beer forms a visible gradient along the glass wall; style-accurate color for ${item.family}; sensory profile ${item.profile.join(', ')}. Background: clean premium dark teal studio with soft backlight, no beer hall scene, no chart text. Composition/framing: square crop, glass centered, liquid color gradient and foam ring clearly visible, generous margin. Lighting/mood: backlit beer judging table lighting, crisp rim highlights, realistic bubbles and glass refraction. Constraints: no readable text, no labels, no bottle, no logo, no hands, no people, no watermark, no cartoon, no illustration. Avoid: spilling beer, impossible liquid physics, multiple glasses, opaque glass, flat soda-like appearance, wrong beer color.`;
}

const jobs = [];
for (const item of wineItems) {
  jobs.push({ model: 'gpt-image-1.5', prompt: wineScenePrompt(item), use_case: 'photorealistic-natural', style: 'premium editorial beverage photography, realistic glass and regional environment', composition: 'square crop, hero glass with regional bottle and background', constraints: 'no readable text, no logos, no brand marks, no people, no hands, no watermark', size: '1024x1024', quality: 'medium', out: `wines/${item.id}.png` });
  jobs.push({ model: 'gpt-image-1.5', prompt: wineColorPrompt(item), use_case: 'photorealistic-natural', style: 'educational beverage color study photography, realistic glass and liquid physics', composition: 'square crop, single tilted glass, color gradient visible', constraints: 'no text, no labels, no bottle, no logos, no hands, no people, no watermark', size: '1024x1024', quality: 'medium', out: `wines/${item.id}-color.png` });
}
for (const item of beerItems) {
  jobs.push({ model: 'gpt-image-1.5', prompt: beerScenePrompt(item), use_case: 'photorealistic-natural', style: 'premium editorial beer photography, realistic glassware and regional brewery environment', composition: 'square crop, hero beer glass with regional bottle and brewhouse background', constraints: 'no readable text, no logos, no brand marks, no people, no hands, no watermark', size: '1024x1024', quality: 'medium', out: `beers/${item.id}.png` });
  jobs.push({ model: 'gpt-image-1.5', prompt: beerColorPrompt(item), use_case: 'photorealistic-natural', style: 'educational beer color study photography, realistic glass and liquid physics', composition: 'square crop, single tilted beer glass, color gradient and foam visible', constraints: 'no text, no labels, no bottle, no logos, no hands, no people, no watermark', size: '1024x1024', quality: 'medium', out: `beers/${item.id}-color.png` });
}

fs.mkdirSync('tmp/imagegen', { recursive: true });
fs.writeFileSync('tmp/imagegen/bev-recipes-wine-beer-photos-gpt-image-1.5.jsonl', jobs.map((job) => JSON.stringify(job)).join('\n') + '\n');
console.log(`wine items: ${wineItems.length}`);
console.log(`beer items: ${beerItems.length}`);
console.log(`jobs: ${jobs.length}`);
