-- Rewrite terminology_entries.how_to_apply for the curated v2 500-term glossary.
-- Editorial standard: original Sip Studies phrasing only; no verbatim source excerpts.
-- Supporting source credits are documented in docs/terminology_how_to_apply_sources.md.

begin;

update public.terminology_entries set how_to_apply = 'Use Aglianico when you need to frame a wine around stern tannin, dark fruit, and southern Italian structure; on a list, it is a credible hand-sell for guests who enjoy ageworthy reds with savory grip.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Aglianico';
update public.terminology_entries set how_to_apply = 'Use Albarino when guiding guests toward brisk, saline white wine for shellfish, raw bar service, or warm-weather pours; in tasting, it anchors discussion of Atlantic freshness and aromatic lift.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Albarino';
update public.terminology_entries set how_to_apply = 'Use Amarone when the conversation turns to concentrated dry red wine shaped by appassimento, elevated alcohol, and a plush finish; in pairing, it suits braised meats, aged cheese, and contemplative after-dinner service.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Amarone';
update public.terminology_entries set how_to_apply = 'Use ampelography when identifying vine varieties by leaf shape, bunch form, and berry traits in vineyard study, nursery work, or advanced wine education.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Ampelography';
update public.terminology_entries set how_to_apply = 'Use appellation to explain how legal origin rules govern grape sourcing, yields, style, and labeling; in buying, it helps separate geographic prestige from producer quality.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Appellation';
update public.terminology_entries set how_to_apply = 'Use assemblage when discussing the final blend of base wines, lots, or varieties before bottling; in cellar and exam contexts, it shows how a house shapes balance and signature style.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Assemblage';
update public.terminology_entries set how_to_apply = 'Use astringency when describing the drying tactile pull from tannin or phenolics on the palate; in service, it helps justify decanting, food pairing, or recommending a softer alternative.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Astringency';
update public.terminology_entries set how_to_apply = 'Use autolysis when explaining the bready, biscuit-like complexity that develops as sparkling wine rests on lees; it is a key selling point for traditional-method bottles.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Autolysis';
update public.terminology_entries set how_to_apply = 'Use Barbera when recommending a high-acid red that can carry tomato sauces, charcuterie, or weekday Italian by-the-glass service without overwhelming tannin.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Barbera';
update public.terminology_entries set how_to_apply = 'Use Barolo when you need shorthand for Nebbiolo at a serious, cellar-worthy level; in tableside sales, it signals roses, tar, tension, and a strong affinity for truffle and braised dishes.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Barolo';
update public.terminology_entries set how_to_apply = 'Use barrique when evaluating how small oak barrels shape texture, spice, oxygen exchange, and elevage cost; in tasting, it helps explain toast, cedar, and polish.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Barrique';
update public.terminology_entries set how_to_apply = 'Use biodynamic when describing vineyards farmed by calendar-driven, holistic methods; in trade, the term matters when a buyer or guest values farming philosophy alongside flavor.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Biodynamic';
update public.terminology_entries set how_to_apply = 'Use blanc on labels and wine lists to signal a white wine, or a white expression within a category such as blanc de blancs; it is a quick service cue for style and color.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Blanc';
update public.terminology_entries set how_to_apply = 'Use Bobal when presenting Spanish reds or rosados that offer color, freshness, and regional identity beyond the usual export grapes; it is useful for discovery-driven list building.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Bobal';
update public.terminology_entries set how_to_apply = 'Use botrytis when explaining noble rot in sweet wine production or, negatively, when identifying unwanted fungal impact; in sales, it clarifies why certain dessert wines show saffron, honey, and apricot depth.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Botrytis';
update public.terminology_entries set how_to_apply = 'Use Bourgogne when distinguishing broad regional Burgundy from village or cru bottlings; in buying, it helps set guest expectations around price, pedigree, and typicity.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Bourgogne';
update public.terminology_entries set how_to_apply = 'Use Brix when tracking grape sugar before harvest to estimate potential alcohol and picking windows; in production meetings, it belongs beside acid and flavor ripeness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Brix';
update public.terminology_entries set how_to_apply = 'Use Brunello when discussing Sangiovese at Montalcino''s more structured and ageworthy expression; in premium service, it supports upselling guests from generic Tuscan reds.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Brunello';
update public.terminology_entries set how_to_apply = 'Use Cabernet when anchoring a discussion of black-currant fruit, tannic frame, and cellar potential, whether the focus is Sauvignon, Franc, or a blend built around them.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Cabernet';
update public.terminology_entries set how_to_apply = 'Use carbonic when describing whole-cluster fermentation that emphasizes vivid fruit, low tannin, and early drinkability; it is especially useful in Beaujolais discussions.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Carbonic';
update public.terminology_entries set how_to_apply = 'Use Carmenere when guiding guests toward a red with plush fruit, herbal notes, and Chilean identity; in education, it distinguishes ripe pyrazine character from underripeness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Carmenere';
update public.terminology_entries set how_to_apply = 'Use Carignan when evaluating Mediterranean reds for acid retention, color, and old-vine value; on a list, it offers a savory alternative to softer southern blends.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Carignan';
update public.terminology_entries set how_to_apply = 'Use Chablis when a guest wants Chardonnay without overt oak; in service, the term signals taut citrus, oyster-shell precision, and strong compatibility with seafood.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Chablis';
update public.terminology_entries set how_to_apply = 'Use Champagne only for sparkling wine from the appellation and leverage the term to discuss house style, dosage, lees age, and prestige cuvee positioning.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Champagne';
update public.terminology_entries set how_to_apply = 'Use chaptalization when explaining legal sugar additions before fermentation to raise alcohol rather than sweetness; in exams, it often separates cool-climate technique from richer site expression.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Chaptalization';
update public.terminology_entries set how_to_apply = 'Use clone when comparing vine selections for yield, bunch size, disease pressure, or flavor profile; in vineyard planning, it is a practical tool rather than a marketing flourish.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Clone';
update public.terminology_entries set how_to_apply = 'Use decanting to separate sediment, soften reductive edges, or open a tightly wound wine before service; the decision should reflect age, structure, and guest timing.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Decanting';
update public.terminology_entries set how_to_apply = 'Use dosage when explaining the finishing liqueur that shapes a sparkling wine''s final sweetness and, at times, its harmony after disgorgement.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Dosage';
update public.terminology_entries set how_to_apply = 'Use elegance for wines whose balance, line, and restraint matter more than sheer mass; it is persuasive language when selling finesse over power.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Elegance';
update public.terminology_entries set how_to_apply = 'Use extraction when assessing how much color, tannin, and flavor were drawn from skins or solids during fermentation; it helps explain both depth and harshness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Extraction';
update public.terminology_entries set how_to_apply = 'Use filtration when weighing clarity and microbial stability against possible texture loss; in trade tasting, it belongs in the conversation when a wine feels polished or deliberately less handled.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Filtration';
update public.terminology_entries set how_to_apply = 'Use fining when explaining how proteins or other agents remove haze or bitterness; in service, it can matter for vegan guests and for discussing a wine''s final texture.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Fining';
update public.terminology_entries set how_to_apply = 'Use Fronsac when offering Right Bank Bordeaux character with value relative to more famous neighbors; it helps buyers speak to terroir without the Pomerol tariff.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Fronsac';
update public.terminology_entries set how_to_apply = 'Use Gamay when recommending a red that delivers bright fruit, moderate tannin, and excellent versatility for bistro menus, charcuterie, and chillable service.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Gamay';
update public.terminology_entries set how_to_apply = 'Use Grenache when discussing generous fruit, spice, and alcohol in blends or solo bottlings; it is a useful bridge wine for guests who want ripeness without heavy oak.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Grenache';
update public.terminology_entries set how_to_apply = 'Use harvest to discuss picking date, labor logistics, and ripeness decisions that shape acid, alcohol, and style long before the wine reaches the cellar.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Harvest';
update public.terminology_entries set how_to_apply = 'Use Hermitage when referencing one of the benchmark homes of Syrah and Marsanne-Roussanne; in premium sales, it signals gravitas, longevity, and collector appeal.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Hermitage';
update public.terminology_entries set how_to_apply = 'Use Jeroboam when discussing large-format service, event presentation, or aging dynamics; the format adds spectacle while often slowing development in bottle.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Jeroboam';
update public.terminology_entries set how_to_apply = 'Use Jura when positioning oxidative whites, savagnin, vin jaune, or delicate reds for adventurous guests; it is a category cue for distinctive regional signatures.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Jura';
update public.terminology_entries set how_to_apply = 'Use Lambrusco when guiding guests toward sparkling red wine that can handle cured meats, fried food, or casual aperitif service with far more versatility than many expect.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lambrusco';
update public.terminology_entries set how_to_apply = 'Use Languedoc when discussing southern French value, broad Mediterranean styles, and large appellation diversity; it is useful for list building at accessible price points.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Languedoc';
update public.terminology_entries set how_to_apply = 'Use lees when explaining texture gain, reductive protection, and autolytic complexity from extended contact; in tasting, it often accounts for creaminess and savory depth.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lees';
update public.terminology_entries set how_to_apply = 'Use maceration when discussing the duration and temperature of skin contact, whether for red extraction, orange wine texture, or delicate rose production.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Maceration';
update public.terminology_entries set how_to_apply = 'Use Malbec when steering a guest toward dark-fruited, full-bodied red wine with grill-friendly weight; it is especially effective as a hand-sell for steak service.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Malbec';
update public.terminology_entries set how_to_apply = 'Use malolactic when explaining the conversion that softens sharp malic acid into lactic texture; in Chardonnay or red wine tasting, it helps account for creaminess and butter notes.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Malolactic';
update public.terminology_entries set how_to_apply = 'Use Marsanne when discussing full-bodied Rhone whites with waxy texture and orchard fruit; it is valuable when pairing richer seafood or poultry dishes.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Marsanne';
update public.terminology_entries set how_to_apply = 'Use Merlot when a guest wants plush fruit and supple tannin without sacrificing seriousness; in blending talk, it often explains mid-palate generosity.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Merlot';
update public.terminology_entries set how_to_apply = 'Use minerality with discipline to describe a stony, saline, or chalky impression rather than as a mystical shortcut; in service, it is most useful when tied to a concrete taste experience.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Minerality';
update public.terminology_entries set how_to_apply = 'Use Monastrell when presenting sun-shaped reds with dark fruit, spice, and savory heft; it works well for guests who enjoy Mourvedre-like structure at friendlier prices.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Monastrell';
update public.terminology_entries set how_to_apply = 'Use Mourvedre when discussing wines built on gamey depth, tannin, and heat-loving vineyard performance; in blends, it explains structure and savory tone.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Mourvedre';
update public.terminology_entries set how_to_apply = 'Use Muscadet when recommending lean, sea-breeze white wine for oysters and shellfish; sur lie examples especially suit by-the-glass seafood programs.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Muscadet';
update public.terminology_entries set how_to_apply = 'Use Muscat when describing overt floral aromatics across dry, sparkling, and sweet styles; it is a useful cue for guests who choose wine by perfume.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Muscat';
update public.terminology_entries set how_to_apply = 'Use Nebbiolo when framing pale color against high tannin, high acid, and haunting aromatics; it is essential language for Piedmont buying and blind tasting.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Nebbiolo';
update public.terminology_entries set how_to_apply = 'Use oenology for the technical study of winemaking, analysis, and cellar practice; in trade settings, it separates sensory opinion from production knowledge.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Oenology';
update public.terminology_entries set how_to_apply = 'Use oxidation when diagnosing bruised-apple, nutty, or fading character from oxygen exposure, or when explaining styles where controlled oxidative handling is intentional.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Oxidation';
update public.terminology_entries set how_to_apply = 'Use Parellada when discussing the lighter, high-acid component of many Cava blends; in education, it helps explain delicacy rather than power.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Parellada';
update public.terminology_entries set how_to_apply = 'Use pigeage when describing punch-downs in open-top fermenters to wet the cap and manage extraction; it is classic cellar vocabulary for red vinification.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Pigeage';
update public.terminology_entries set how_to_apply = 'Use Pinot when specifying a member of the pinot family, most often Pinot Noir or Pinot Gris, and clarify the clone, region, or style to avoid vague service language.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Pinot';
update public.terminology_entries set how_to_apply = 'Use Pomerol when discussing plush, merlot-led Bordeaux with a high luxury ceiling; in sales, it signals texture and prestige more than rigid classification.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Pomerol';
update public.terminology_entries set how_to_apply = 'Use Primitivo when offering a ripe, generous red with southern Italian warmth; it is often a comfortable hand-sell for guests who like fruit-forward, fuller-bodied styles.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Primitivo';
update public.terminology_entries set how_to_apply = 'Use pumpover when explaining how juice is circulated over the cap to shape extraction, temperature, and oxygen management during red fermentation.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Pumpover';
update public.terminology_entries set how_to_apply = 'Use racking when discussing the transfer of wine off sediment for clarification and hygiene; in cellar terms, it is a practical quality-control move.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Racking';
update public.terminology_entries set how_to_apply = 'Use reduction when a wine shows struck-flint, smoke, or sulfide-like restraint from low-oxygen handling; in service, it may call for air rather than alarm.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Reduction';
update public.terminology_entries set how_to_apply = 'Use Reserva when interpreting Iberian aging categories, but always pair the term with region and producer because legal minimums do not guarantee quality.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Reserva';
update public.terminology_entries set how_to_apply = 'Use Riesling when you need a reference point for acid-driven, transparent wines that can range from bone dry to lusciously sweet; in pairing, it is among the trade''s most flexible tools.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Riesling';
update public.terminology_entries set how_to_apply = 'Use Ripasso when explaining Valpolicella re-passed over Amarone pomace to gain body, flavor, and commercial appeal between standard and Amarone tiers.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Ripasso';
update public.terminology_entries set how_to_apply = 'Use Rondinella when discussing supporting grapes in Valpolicella and Amarone blends; it helps explain why a wine''s final profile is not solely about Corvina.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Rondinella';
update public.terminology_entries set how_to_apply = 'Use Sangiovese when discussing sour-cherry fruit, savory herbs, and acidity that thrives at the table; it is a core reference for Italian wine programs.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Sangiovese';
update public.terminology_entries set how_to_apply = 'Use Sauternes when selling noble-rot sweet wine with enough acidity to remain poised; beyond dessert, it pairs well with blue cheese, foie gras, and spice.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Sauternes';
update public.terminology_entries set how_to_apply = 'Use sommelier to describe the professional responsible for beverage selection, cellar stewardship, service standards, and guest guidance rather than as a casual synonym for wine lover.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Sommelier';
update public.terminology_entries set how_to_apply = 'Use Syrah when discussing pepper, dark fruit, and a structured frame, whether the context is cool-climate tension or warm-climate richness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Syrah';
update public.terminology_entries set how_to_apply = 'Use tannin when describing the bitter, drying structure that shapes ageability and food affinity; in service, it helps explain why protein and fat matter.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Tannin';
update public.terminology_entries set how_to_apply = 'Use Tempranillo when guiding guests toward a red that balances red and black fruit with savory oak-driven spice; it is central to Rioja and Ribera narratives.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Tempranillo';
update public.terminology_entries set how_to_apply = 'Use Teroldego when building a list that needs alpine Italian reds with dark fruit, freshness, and local identity beyond the obvious classics.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Teroldego';
update public.terminology_entries set how_to_apply = 'Use Torrontes when recommending an aromatic white that reads floral on the nose yet often finishes dry; it is a useful alternative for Gewurztraminer drinkers.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Torrontes';
update public.terminology_entries set how_to_apply = 'Use Trebbiano when discussing a high-yielding family of grapes used for simple whites, regional specialties, and at times distillation material; context is everything with this term.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Trebbiano';
update public.terminology_entries set how_to_apply = 'Use typicity when judging whether a wine faithfully expresses its grape, place, and style benchmark; in exams and panels, it is a quality lens, not a synonym for personal liking.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Typicity';
update public.terminology_entries set how_to_apply = 'Use vendange in French wine contexts to mean the grape harvest, whether referring to timing, labor, or the vintage''s picking conditions.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Vendange';
update public.terminology_entries set how_to_apply = 'Use veraison when discussing the onset of ripening as berries soften and change color; vineyard teams watch it closely when forecasting harvest.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Veraison';
update public.terminology_entries set how_to_apply = 'Use Verdelho when positioning a white grape that can deliver brisk aromatics in dry wines or fortified complexity in Madeira-related discussions.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Verdelho';
update public.terminology_entries set how_to_apply = 'Use Vermentino when offering a Mediterranean white with citrus, herbs, and saline snap; it is especially effective beside grilled fish and coastal cuisine.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Vermentino';
update public.terminology_entries set how_to_apply = 'Use Viognier when discussing low-acid, richly aromatic whites marked by apricot and blossom notes; in sales, it suits guests who want perfume and texture over razor-sharp tension.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Viognier';
update public.terminology_entries set how_to_apply = 'Use vintage to discuss the harvest year and the climatic story behind a wine''s ripeness, acid profile, and market reputation.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Vintage';
update public.terminology_entries set how_to_apply = 'Use viscosity when describing the visual density or tear formation in the glass, but tie it back to alcohol, sugar, or extract rather than treating it as a direct quality marker.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Viscosity';
update public.terminology_entries set how_to_apply = 'Use volatile, usually in the context of volatile acidity, when assessing whether lifted acetic notes add complexity or cross into fault.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Volatile';
update public.terminology_entries set how_to_apply = 'Use Zinfandel when recommending a ripe, exuberant red with blackberry fruit, pepper, and high alcohol; in trade terms, it is a bridge between barbecue-friendly comfort and serious old-vine bottlings.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Zinfandel';
update public.terminology_entries set how_to_apply = 'Use adjunct when discussing unmalted grains or fermentables added to shape body, flavor, cost, or foam; in style analysis, the term explains everything from light lager texture to pastry stout richness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Adjunct';
update public.terminology_entries set how_to_apply = 'Use ale to distinguish warm-fermented beer styles driven by top-fermenting yeast; in service, it helps set expectations for fruit expression, body, and cellar range.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Ale';
update public.terminology_entries set how_to_apply = 'Use Altbier when describing Dusseldorf''s copper-toned, bitter-edged ale that drinks with lager-like polish; it is a smart recommendation for guests between amber ale and pilsner.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Altbier';
update public.terminology_entries set how_to_apply = 'Use amber as a service and merchandising cue for beer color, toastier malt profile, and moderate bitterness, but always pair it with style for precision.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Amber';
update public.terminology_entries set how_to_apply = 'Use amylase when explaining how mash enzymes convert starch into fermentable sugar; brewers track it when targeting attenuation, body, and brewhouse efficiency.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Amylase';
update public.terminology_entries set how_to_apply = 'Use Barleywine when presenting a high-gravity, cellar-worthy beer with warming alcohol and dessert-like depth; in retail, it belongs with slow-sipping or vintage offerings.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Barleywine';
update public.terminology_entries set how_to_apply = 'Use Berlinerweisse when recommending a sharply refreshing, low-alcohol sour beer that works as an aperitif or summer pour.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Berlinerweisse';
update public.terminology_entries set how_to_apply = 'Use bitterness to discuss hop-driven balance rather than macho intensity; in service, it helps match beer to fried food, spice, or guests sensitive to sharp finishes.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Bitterness';
update public.terminology_entries set how_to_apply = 'Use Bock when describing a stronger German lager built on malt richness and smooth drinkability; it is useful for guests who want fullness without roast.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Bock';
update public.terminology_entries set how_to_apply = 'Use Brett to describe Brettanomyces character such as leather, hay, or rustic funk, whether welcome in farmhouse styles or problematic in clean beer.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Brett';
update public.terminology_entries set how_to_apply = 'Use brut in beer for very dry, highly attenuated expressions, often hop-forward, where crisp finish matters more than malt sweetness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Brut';
update public.terminology_entries set how_to_apply = 'Use Cascade when discussing hops that bring grapefruit, floral lift, and classic American pale ale identity; in sales, it is a cue for familiar West Coast citrus.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Cascade';
update public.terminology_entries set how_to_apply = 'Use cask when explaining naturally conditioned beer served from the vessel with soft carbonation and cellar-temperature nuance; the term matters for real ale service standards.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Cask';
update public.terminology_entries set how_to_apply = 'Use Centennial when you want to explain a hop profile built around citrus, resin, and firm bitterness, often as a backbone hop in American styles.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Centennial';
update public.terminology_entries set how_to_apply = 'Use Chinook when discussing hops that deliver pine, grapefruit, and assertive bitterness; it is useful language for classic American IPA positioning.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Chinook';
update public.terminology_entries set how_to_apply = 'Use Citra when signaling modern hop aroma driven by lime, passion fruit, and mango notes; in retail, the name alone can move IPA sales.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Citra';
update public.terminology_entries set how_to_apply = 'Use Columbus when discussing pungent dankness, resin, and sturdy bittering power; it often explains the muscular edge in American hop-forward beer.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Columbus';
update public.terminology_entries set how_to_apply = 'Use conditioning when describing the maturation phase that settles flavor, carbonation, and clarity after primary fermentation; it is a key quality step, not idle waiting.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Conditioning';
update public.terminology_entries set how_to_apply = 'Use decoction when explaining a mash regime that boosts malt depth through boiling a portion of the mash and returning it; it is especially relevant in classic continental brewing.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Decoction';
update public.terminology_entries set how_to_apply = 'Use dextrin when discussing residual body and mouthfeel that remain after fermentation; in recipe design, it helps explain why some beers feel fuller without tasting sweeter.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Dextrin';
update public.terminology_entries set how_to_apply = 'Use diacetyl when assessing buttery or butterscotch notes, distinguishing style-appropriate low levels from incomplete fermentation cleanup.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Diacetyl';
update public.terminology_entries set how_to_apply = 'Use Dortmunder when describing a pale lager with more body and minerally firmness than many pilsners; it is a helpful recommendation for guests who want balance over bitterness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Dortmunder';
update public.terminology_entries set how_to_apply = 'Use dryhopping when explaining late hop contact for aroma without major added bitterness; in production and sales, it signals expressive nose and contemporary IPA technique.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Dryhopping';
update public.terminology_entries set how_to_apply = 'Use Dunkel when presenting a dark lager built on bread-crust malt, restraint, and high drinkability rather than roast aggression.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Dunkel';
update public.terminology_entries set how_to_apply = 'Use EBC as the color scale that lets brewers and buyers compare beer hue consistently across recipes and specifications.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Ebc';
update public.terminology_entries set how_to_apply = 'Use ester when describing fruity fermentation notes such as banana, pear, or stone fruit created by yeast strain and fermentation temperature.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Ester';
update public.terminology_entries set how_to_apply = 'Use Fuggles when discussing earthy, woody, classic English hop character; it is a cue for traditional bitters, porters, and cask ales.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Fuggles';
update public.terminology_entries set how_to_apply = 'Use Gueuze when explaining a blend of young and old lambic that gains sparkle through bottle refermentation; in service, it belongs with cheese, charcuterie, and acid-loving guests.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Gueuze';
update public.terminology_entries set how_to_apply = 'Use Hallertau when discussing noble German hop character marked by herbal, floral, and softly spicy tones, especially in lager programs.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Hallertau';
update public.terminology_entries set how_to_apply = 'Use haze carefully to distinguish intentional turbidity from instability; in modern IPA, it can signal texture and hop saturation, but it is not a universal virtue.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Haze';
update public.terminology_entries set how_to_apply = 'Use Hefeweizen when recommending a wheat beer whose banana-and-clove yeast profile makes it accessible, food-friendly, and stylistically unmistakable.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Hefeweizen';
update public.terminology_entries set how_to_apply = 'Use Helles when presenting a pale lager built on malt grace, low bitterness, and high drinkability; it is ideal for guests who want subtle precision.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Helles';
update public.terminology_entries set how_to_apply = 'Use hopback when discussing a vessel that runs hot wort through hops to add aroma and clarify trub before cooling.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Hopback';
update public.terminology_entries set how_to_apply = 'Use hopstand when explaining warm-side hop steeping after the boil to capture aroma and flavor with softer bitterness than boil additions.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Hopstand';
update public.terminology_entries set how_to_apply = 'Use hydrometer when measuring specific gravity before and after fermentation to track sugar conversion, attenuation, and finished alcohol.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Hydrometer';
update public.terminology_entries set how_to_apply = 'Use IBU as a lab-based bitterness indicator, but pair it with style and residual sweetness because the number alone does not predict perceived balance.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Ibu';
update public.terminology_entries set how_to_apply = 'Use infusion when describing a mash method that holds grain in hot water without decoction; it is the standard reference point in much modern brewing.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Infusion';
update public.terminology_entries set how_to_apply = 'Use isomerization when explaining how boil heat converts hop alpha acids into bitter compounds that the palate can perceive.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Isomerization';
update public.terminology_entries set how_to_apply = 'Use Kolsch when recommending a delicate, cold-conditioned ale that drinks with lager-like poise while retaining faint fruity lift.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Kolsch';
update public.terminology_entries set how_to_apply = 'Use krausen for the foamy cap of active fermentation or for the practice of adding fermenting wort or beer to aid natural carbonation.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Krausen';
update public.terminology_entries set how_to_apply = 'Use Lactobacillus when discussing bacteria that acidify wort or beer in styles such as kettle sours and mixed-fermentation ales.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lactobacillus';
update public.terminology_entries set how_to_apply = 'Use Lambic when referring to spontaneously fermented beer from the Brussels-Pajottenland tradition; in trade terms, it signals patience, barrels, and wild microflora rather than simple sourness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lambic';
update public.terminology_entries set how_to_apply = 'Use lager to describe beers fermented cool with bottom-fermenting yeast and matured for smoothness; in service, it spans far more than light industrial beer.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lager';
update public.terminology_entries set how_to_apply = 'Use lauter when discussing the separation of sweet wort from spent grain in the lauter tun or mash filter stage.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lauter';
update public.terminology_entries set how_to_apply = 'Use Lovibond when specifying malt or beer color in recipe design, supplier specs, and style communication.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Lovibond';
update public.terminology_entries set how_to_apply = 'Use malt when explaining the grain backbone that supplies fermentable extract, color, toast, roast, and foam-supporting proteins.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Malt';
update public.terminology_entries set how_to_apply = 'Use mash when describing the stage where crushed grain and water meet to set fermentability, body, and extract yield.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Mash';
update public.terminology_entries set how_to_apply = 'Use Mosaic when signaling hops that throw berry, citrus, tropical fruit, and dank notes; it is a retail keyword for modern IPA drinkers.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Mosaic';
update public.terminology_entries set how_to_apply = 'Use flocculation when discussing how readily yeast clumps and drops from suspension, affecting clarity, harvestability, and sometimes flavor expression.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Flocculation';
update public.terminology_entries set how_to_apply = 'Use attenuation when measuring how completely yeast consumed fermentable sugars; it helps explain final gravity, dryness, and alcohol level.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Attenuation';
update public.terminology_entries set how_to_apply = 'Use pasteurization when discussing heat treatment for microbial stability and shelf life, especially in packaged beer for wider distribution.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Pasteurization';
update public.terminology_entries set how_to_apply = 'Use phenolic to describe clove-like spice, pepper, or medicinal notes and then identify whether they come from style, yeast, smoke, or contamination.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Phenolic';
update public.terminology_entries set how_to_apply = 'Use Pilsner when recommending a pale, hop-led lager that showcases snap, bitterness, and brewing precision; it is one of the best tests of technical discipline.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Pilsner';
update public.terminology_entries set how_to_apply = 'Use Plato for wort density measurements that estimate dissolved extract and help brewers model strength, yield, and tax or specification targets.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Plato';
update public.terminology_entries set how_to_apply = 'Use Porter when offering dark beer with chocolate, toast, and moderate roast, often for guests who find stout too severe.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Porter';
update public.terminology_entries set how_to_apply = 'Use priming when describing the measured sugar addition that creates bottle or cask carbonation through a final fermentation.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Priming';
update public.terminology_entries set how_to_apply = 'Use Reinheitsgebot when discussing the historical German purity law, but note it as a legal and cultural reference rather than an all-purpose quality guarantee.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Reinheitsgebot';
update public.terminology_entries set how_to_apply = 'Use Saaz when describing noble hop aroma with spice, herbs, and softness, especially in Czech-style pale lager.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Saaz';
update public.terminology_entries set how_to_apply = 'Use Saison when recommending a farmhouse ale with peppery yeast character, dryness, and high food affinity; it handles menus that confuse many beers.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Saison';
update public.terminology_entries set how_to_apply = 'Use sediment when preparing bottle-conditioned service, deciding whether to pour bright or include yeast based on style and guest preference.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Sediment';
update public.terminology_entries set how_to_apply = 'Use Simcoe when discussing hops that bring pine, passion fruit, and dank depth, often as a signature component in American IPA blends.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Simcoe';
update public.terminology_entries set how_to_apply = 'Use sparge when explaining the rinse of the grain bed to recover sugars after mashing; too little wastes extract and too much can pull harshness.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Sparge';
update public.terminology_entries set how_to_apply = 'Use Stout when discussing dark beer built on roast, coffee, cocoa, or creamy texture, whether dry, sweet, foreign extra, or imperial.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Stout';
update public.terminology_entries set how_to_apply = 'Use Tettnang when referencing a noble German hop prized for delicate spice and floral lift in classic lager and wheat beer production.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Tettnang';
update public.terminology_entries set how_to_apply = 'Use Trappist only for beer brewed under monastic control within the certification rules; in sales, the term conveys origin discipline as much as style.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Trappist';
update public.terminology_entries set how_to_apply = 'Use trub when discussing the hop particles and protein solids separated from wort or young beer to protect flavor stability and fermentation health.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Trub';
update public.terminology_entries set how_to_apply = 'Use whirlpool when describing the circular rest that gathers trub after the boil, or the warm-side hop addition point that intensifies aroma.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Whirlpool';
update public.terminology_entries set how_to_apply = 'Use Witbier when recommending a light, hazy wheat beer with citrus peel and coriander, especially for aperitif or brunch service.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Witbier';
update public.terminology_entries set how_to_apply = 'Use wort for the sweet liquid drawn from the mash before fermentation; every gravity, hopping, and yeast decision works on this base.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Wort';
update public.terminology_entries set how_to_apply = 'Use fermentor when discussing the vessel where yeast turns wort into beer; tank shape, pressure, and material all affect process control and final character.' where source_title = 'Sip Studies Original Editorial Glossary Curated v2' and beverage_type in ('wine','beer') and term = 'Fermentor';

update public.terminology_entries
set how_to_apply = 'Use absinthe when you need to frame an anise-led botanical spirit, especially in louche service, aperitif positioning, or classic cocktail specs.'
where beverage_type = 'spirits'
  and term = 'Absinthe'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use aguardiente to signal a regional spirit category and set expectations around raw material, proof, and customary local service.'
where beverage_type = 'spirits'
  and term = 'Aguardiente'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use agricole when distinguishing rhum made from fresh cane juice rather than molasses, especially in buying notes, tastings, or rum flights.'
where beverage_type = 'spirits'
  and term = 'Agricole'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use alambic in production talk to identify a traditional still design and explain its effect on texture, congener load, and house character.'
where beverage_type = 'spirits'
  and term = 'Alambic'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use aquavit to position a caraway- or dill-led Scandinavian spirit in chilled service, seafood pairings, or savory cocktail builds.'
where beverage_type = 'spirits'
  and term = 'Aquavit'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use arak when discussing the Levantine anise spirit, its cloudy dilution with water, and its natural place alongside mezze.'
where beverage_type = 'spirits'
  and term = 'Arak'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Armagnac to mark a Gascon brandy with vintage depth, rustic structure, and clear digestif or collector appeal.'
where beverage_type = 'spirits'
  and term = 'Armagnac'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use azeotrope in technical distillation training to explain why simple distillation cannot drive ethanol-water strength endlessly upward.'
where beverage_type = 'spirits'
  and term = 'Azeotrope'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use backset to describe spent stillage returned to a new ferment for continuity, acidity, and flavor carryover in whiskey or rum production.'
where beverage_type = 'spirits'
  and term = 'Backset'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use batching when scaling a blend, liqueur, or RTD recipe so sweetness, proof, and flavor remain steady from lot to lot.'
where beverage_type = 'spirits'
  and term = 'Batching'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use bottling when final proof, filtration, closure, and release style matter, because those choices shape both texture and market presentation.'
where beverage_type = 'spirits'
  and term = 'Bottling'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use brandy as the broad spirit family for wine- or fruit-based distillates, then narrow the conversation to origin, fruit source, and maturation.'
where beverage_type = 'spirits'
  and term = 'Brandy'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Calvados when a list or pairing note needs to distinguish apple-based Norman brandy from grape brandy or generic apple spirit.'
where beverage_type = 'spirits'
  and term = 'Calvados'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use cachaca to specify Brazilian cane-juice spirit in caipirinha service and to separate it clearly from molasses-based rum.'
where beverage_type = 'spirits'
  and term = 'Cachaca'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use charcoal when explaining mellowing, filtration, or smoke influence, especially in Tennessee whiskey and charcoal-treated spirits.'
where beverage_type = 'spirits'
  and term = 'Charcoal'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use congeners in tasting or production review to explain the flavor-active compounds that give a spirit aroma, weight, and individuality beyond alcohol.'
where beverage_type = 'spirits'
  and term = 'Congeners'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Curacao to identify orange-peel liqueur style in cocktail specs and to judge whether its sweetness or bitterness suits the build.'
where beverage_type = 'spirits'
  and term = 'Curacao'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Demerara when describing rum or syrup tied to Guyanese sugar heritage and a darker treacle-toned flavor profile.'
where beverage_type = 'spirits'
  and term = 'Demerara'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use distillate as the precise term for spirit coming off the still before proofing, finishing, sweetening, or bottling decisions are applied.'
where beverage_type = 'spirits'
  and term = 'Distillate'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use distillation to describe the separation step that concentrates alcohol and aroma compounds in production, compliance, and education settings.'
where beverage_type = 'spirits'
  and term = 'Distillation'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use dunder in rum discussions to describe acidic still residue reused for fermentation complexity, especially in Jamaican-style production.'
where beverage_type = 'spirits'
  and term = 'Dunder'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use eau-de-vie when presenting an unaged fruit distillate where varietal purity and aromatic lift matter more than oak.'
where beverage_type = 'spirits'
  and term = 'EauDeVie'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use evaporation when discussing angel''s share, warehouse loss, and the way maturation can concentrate or soften a spirit over time.'
where beverage_type = 'spirits'
  and term = 'Evaporation'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use feints for the later, less desirable portion of a run that is usually recycled rather than bottled as finished spirit.'
where beverage_type = 'spirits'
  and term = 'Feints'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use fusel in quality control to discuss heavier alcohols that can add body in balance or read coarse when distillation is poorly managed.'
where beverage_type = 'spirits'
  and term = 'Fusel'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use gin to anchor a conversation around juniper-led spirit style, then refine the pitch toward London dry, Old Tom, or modern botanical expressions.'
where beverage_type = 'spirits'
  and term = 'Gin'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use grappa when the list or tasting note must show the spirit is distilled from pomace rather than finished wine.'
where beverage_type = 'spirits'
  and term = 'Grappa'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use heads for the earliest cut from the still, where highly volatile compounds make the spirit sharp and generally unsuitable for bottling.'
where beverage_type = 'spirits'
  and term = 'Heads'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use hearts for the preferred middle cut that carries the cleanest and most complete expression of the intended house style.'
where beverage_type = 'spirits'
  and term = 'Hearts'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use highproof to show that a spirit is bottled with extra strength for concentration, controlled dilution, or assertive cocktail structure.'
where beverage_type = 'spirits'
  and term = 'Highproof'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use juniper to describe the defining botanical in gin and to judge whether a style reads classic, restrained, or intentionally contemporary.'
where beverage_type = 'spirits'
  and term = 'Juniper'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use kirsch when a recipe, pastry, or digestif program calls for a dry cherry eau-de-vie rather than a sweet cherry liqueur.'
where beverage_type = 'spirits'
  and term = 'Kirsch'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use liqueur to distinguish a sweetened, flavored spirit from a base spirit, especially in cocktail, dessert, and after-dinner service.'
where beverage_type = 'spirits'
  and term = 'Liqueur'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use macerate for the steeping step where fruit, spices, herbs, or peels surrender flavor before distillation or finishing.'
where beverage_type = 'spirits'
  and term = 'Macerate'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use maturation when judging how time in oak or inert vessel alters texture, integration, and aromatic shape.'
where beverage_type = 'spirits'
  and term = 'Maturation'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use mezcal to flag an agave spirit in the broader artisanal category, then narrow by village, agave, roast, or producer.'
where beverage_type = 'spirits'
  and term = 'Mezcal'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use moonshine carefully to describe unaged rustic spirit, and clarify whether you mean legal craft style or historical illicit production.'
where beverage_type = 'spirits'
  and term = 'Moonshine'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use nosing in staff training and judging to describe structured aromatic assessment before water is added or the spirit is tasted.'
where beverage_type = 'spirits'
  and term = 'Nosing'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use overproof for spirits bottled above standard strength, especially in tiki builds, float service, or proof-forward benchmarking.'
where beverage_type = 'spirits'
  and term = 'Overproof'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use peated when smoke derived from peat is central to a spirit''s aromatic identity, most often in whisky.'
where beverage_type = 'spirits'
  and term = 'Peated'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use potstill to explain a batch distillation method that usually preserves more texture and congeners than column distillation.'
where beverage_type = 'spirits'
  and term = 'Potstill'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use proofing for the controlled addition of water before bottling so the spirit lands at target strength without losing balance.'
where beverage_type = 'spirits'
  and term = 'Proofing'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use rectification when repeated distillation or fine purification is the point, either to raise purity or refine flavor balance.'
where beverage_type = 'spirits'
  and term = 'Rectification'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use rhum when the spirit belongs to French-speaking rum traditions, especially agricole and Martinique contexts.'
where beverage_type = 'spirits'
  and term = 'Rhum'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use rye to signal grain-driven spice in whiskey style, recipe design, and food pairing.'
where beverage_type = 'spirits'
  and term = 'Rye'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use solera to describe fractional blending across barrels or vintages, where continuity of house style matters more than a single harvest.'
where beverage_type = 'spirits'
  and term = 'Solera'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use sourmash in American whiskey production to describe ferment built with acidic backset for pH control and continuity.'
where beverage_type = 'spirits'
  and term = 'Sourmash'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use stillage for spent wash left after distillation, especially when discussing backset, disposal, or agricultural reuse.'
where beverage_type = 'spirits'
  and term = 'Stillage'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use stripping for the first distillation pass that concentrates alcohol before a later spirit run refines the cut.'
where beverage_type = 'spirits'
  and term = 'Stripping'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use sugarcane when raw material matters, especially to distinguish cane-juice spirits, molasses spirits, and cane-derived sweeteners.'
where beverage_type = 'spirits'
  and term = 'Sugarcane'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use tails for the final cut where heavier oils and dull notes rise, making the spirit better suited to recycle than bottling.'
where beverage_type = 'spirits'
  and term = 'Tails'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use tequila when the spirit must be tied to blue agave, denomination rules, and common service or cocktail applications.'
where beverage_type = 'spirits'
  and term = 'Tequila'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use tincture for a concentrated botanical extract added in drops or small measures to tune aroma, bitterness, or color.'
where beverage_type = 'spirits'
  and term = 'Tincture'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use vermouth to frame an aromatized, fortified wine in aperitif service, cocktail builds, and by-the-glass storage protocols.'
where beverage_type = 'spirits'
  and term = 'Vermouth'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use washback for the fermentation vessel in whisky production, especially when discussing yeast management and bacterial influence.'
where beverage_type = 'spirits'
  and term = 'Washback'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use whiskey as the broad category, then narrow by grain bill, still type, cask regimen, and national style.'
where beverage_type = 'spirits'
  and term = 'Whiskey'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use wormtub when old-style condenser design matters, since it can preserve sulfur and a weightier distillate.'
where beverage_type = 'spirits'
  and term = 'Wormtub'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use newmake to discuss spirit fresh off the still before wood, revealing the distillery''s core character without cask influence.'
where beverage_type = 'spirits'
  and term = 'Newmake'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Assam to signal a malty, broad-shouldered black tea, especially for breakfast blends and milk-friendly service.'
where beverage_type = 'tea'
  and term = 'Assam'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Darjeeling to position a high-grown Himalayan tea with lift and delicacy rather than brute weight, often in premium pot service.'
where beverage_type = 'tea'
  and term = 'Darjeeling'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Ceylon when listing Sri Lankan tea styles, then narrow by district, elevation, and whether the cup should read brisk, citrusy, or full.'
where beverage_type = 'tea'
  and term = 'Ceylon'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Nilgiri to identify South Indian tea valued for fragrance and blend utility, especially in aromatic black teas and iced tea programs.'
where beverage_type = 'tea'
  and term = 'Nilgiri'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Yunnan when a tea''s pitch should include Chinese black tea depth, golden buds, or origin context shared with pu-erh.'
where beverage_type = 'tea'
  and term = 'Yunnan'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Anji to point buyers or guests toward a delicate Chinese green tea known for sweetness, clarity, and pale liquor.'
where beverage_type = 'tea'
  and term = 'Anji'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Longjing to mark Dragon Well style, where flat-fired leaf and chestnut-toned clarity are expected.'
where beverage_type = 'tea'
  and term = 'Longjing'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Biluochun when discussing fine green tea made for floral lift, spring freshness, and careful low-temperature infusion.'
where beverage_type = 'tea'
  and term = 'Biluochun'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Tieguanyin to distinguish oolong style by roast level and oxidation, from green floral examples to deeper traditional versions.'
where beverage_type = 'tea'
  and term = 'Tieguanyin'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Dahongpao when describing Wuyi rock oolong with roast, structure, and a cup that evolves across multiple infusions.'
where beverage_type = 'tea'
  and term = 'Dahongpao'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Wuyi to invoke yancha origin and rocky mountain character when training staff on oolong terroir.'
where beverage_type = 'tea'
  and term = 'Wuyi'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Lapsang to identify smoked black tea so buyers and guests understand that the campfire note is deliberate.'
where beverage_type = 'tea'
  and term = 'Lapsang'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Keemun when a blend or list calls for refined Chinese black tea with cocoa, orchid, or light smoke nuance.'
where beverage_type = 'tea'
  and term = 'Keemun'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Dianhong to pitch Yunnan black tea with golden buds, gentle malt, and a rounder mouthfeel than commodity black tea.'
where beverage_type = 'tea'
  and term = 'Dianhong'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use sencha as the baseline Japanese steamed green tea reference in education, buying, and food pairing.'
where beverage_type = 'tea'
  and term = 'Sencha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use gyokuro when the selling point is shade-grown intensity, umami richness, and premium small-pot service.'
where beverage_type = 'tea'
  and term = 'Gyokuro'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use kabusecha to bridge sencha and gyokuro in explanation, showing moderate shading and a softer umami profile.'
where beverage_type = 'tea'
  and term = 'Kabusecha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use bancha when you want to describe an everyday Japanese green tea with simpler structure and approachable pricing.'
where beverage_type = 'tea'
  and term = 'Bancha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use hojicha to flag roasted green tea, especially for guests seeking low bitterness and toasty comfort.'
where beverage_type = 'tea'
  and term = 'Hojicha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use kukicha when stem content matters, because the term signals a lighter body and sweet twig-derived character.'
where beverage_type = 'tea'
  and term = 'Kukicha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use genmaicha to indicate green tea blended with roasted rice, useful for pairings that benefit from savory cereal notes.'
where beverage_type = 'tea'
  and term = 'Genmaicha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use matcha when the tea is powdered and whisked whole, which changes texture, extraction, and culinary utility.'
where beverage_type = 'tea'
  and term = 'Matcha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use tencha in production talk to describe the shaded leaf material destined for matcha before grinding.'
where beverage_type = 'tea'
  and term = 'Tencha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use tamaryokucha to identify curly Japanese green tea that drinks softer and more aromatic than standard needle-shaped sencha.'
where beverage_type = 'tea'
  and term = 'Tamaryokucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use shincha when seasonality is the selling point, since it signals the fresh first tea of the new harvest.'
where beverage_type = 'tea'
  and term = 'Shincha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use puerh as the umbrella term for Yunnan post-fermented tea, then specify raw or ripe before recommending service.'
where beverage_type = 'tea'
  and term = 'Puerh'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use sheng to identify raw pu-erh, especially when discussing ageworthiness, structure, bitterness, and collector interest.'
where beverage_type = 'tea'
  and term = 'Sheng'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use shou to identify ripe pu-erh produced through accelerated fermentation and valued for earthy readiness.'
where beverage_type = 'tea'
  and term = 'Shou'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use GABA when explaining tea processed to elevate gamma-aminobutyric acid and marketed for a soft fruit-driven cup.'
where beverage_type = 'tea'
  and term = 'Gaba'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Baozhong to position a lightly oxidized Taiwanese oolong with floral lift and elegant body.'
where beverage_type = 'tea'
  and term = 'Baozhong'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use jasmine to specify scented tea, and clarify whether the base tea and scent intensity suit a delicate or perfumed presentation.'
where beverage_type = 'tea'
  and term = 'Jasmine'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use osmanthus when floral scenting should read apricot-like and softer than jasmine in service notes or buying sheets.'
where beverage_type = 'tea'
  and term = 'Osmanthus'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use baihao to note visible downy leaf or, in Taiwanese contexts, a bug-bitten aromatic style, and clarify which meaning you intend.'
where beverage_type = 'tea'
  and term = 'Baihao'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Baimudan to identify White Peony white tea with fuller body than Silver Needle yet a still gentle handling requirement.'
where beverage_type = 'tea'
  and term = 'Baimudan'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Shoumei when describing a later-picked white tea that offers more body and rusticity than finer white grades.'
where beverage_type = 'tea'
  and term = 'Shoumei'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Yabukita to name the dominant Japanese tea cultivar when plant material, not just origin, explains the cup profile.'
where beverage_type = 'tea'
  and term = 'Yabukita'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Saemidori when a sweeter, vivid Japanese cultivar profile is part of the tea''s sales story.'
where beverage_type = 'tea'
  and term = 'Saemidori'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Benifuki when cultivar choice is tied to brisk black tea potential or a menthol-like aromatic distinction.'
where beverage_type = 'tea'
  and term = 'Benifuki'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use cultivar as the plant-selection term when leaf genetics, not only origin, explain cup character.'
where beverage_type = 'tea'
  and term = 'Cultivar'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use plucking to describe harvest standard, because bud-to-leaf ratio directly shapes delicacy, yield, and price.'
where beverage_type = 'tea'
  and term = 'Plucking'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use withering for the controlled moisture-loss stage that softens leaf for shaping and begins aroma development.'
where beverage_type = 'tea'
  and term = 'Withering'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use rolling to explain the shaping step that bruises leaf, affects oxidation, and influences extraction speed.'
where beverage_type = 'tea'
  and term = 'Rolling'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use oxidative when describing how much enzymatic browning a tea undergoes, because that steers style from green through black.'
where beverage_type = 'tea'
  and term = 'Oxidative'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use firing for the heat step that fixes leaf, halts oxidation when needed, and sets shipping stability.'
where beverage_type = 'tea'
  and term = 'Firing'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use steaming when Japanese green tea style is defined by steam fixation rather than dry pan heat.'
where beverage_type = 'tea'
  and term = 'Steaming'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use panfiring to mark wok or pan fixation common in Chinese tea, often bringing nutty or chestnut notes.'
where beverage_type = 'tea'
  and term = 'Panfiring'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use roasting when finishing heat shapes sweetness, spice, or mineral depth in oolong and some green teas.'
where beverage_type = 'tea'
  and term = 'Roasting'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use compression for cakes, bricks, or tuos where aging, storage, and portioning become part of the sales and service conversation.'
where beverage_type = 'tea'
  and term = 'Compression'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use steeping as the service term for leaf weight, water temperature, vessel choice, and infusion time.'
where beverage_type = 'tea'
  and term = 'Steeping'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use astringent in tasting notes when palate grip needs to be distinguished from simple bitterness or sheer strength.'
where beverage_type = 'tea'
  and term = 'Astringent'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use briskness when a black tea should taste lively and palate-cleansing rather than merely strong.'
where beverage_type = 'tea'
  and term = 'Briskness'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use liquor as the professional term for the brewed tea in the cup, not the dry leaf.'
where beverage_type = 'tea'
  and term = 'Liquor'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use tippy when abundant buds signal finer leaf selection and a softer, often sweeter cup.'
where beverage_type = 'tea'
  and term = 'Tippy'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use muscatel chiefly for Darjeeling-style tasting notes when grape-like perfume is a prized marker.'
where beverage_type = 'tea'
  and term = 'Muscatel'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use clonal to show that a tea garden relies on selected clones for consistency, yield, or a targeted flavor set.'
where beverage_type = 'tea'
  and term = 'Clonal'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use terpene in advanced sensory training to explain volatile compounds behind floral, citrus, or resinous lift.'
where beverage_type = 'tea'
  and term = 'Terpene'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use catechin when discussing green tea structure, bitterness, oxidation potential, or health-linked talking points.'
where beverage_type = 'tea'
  and term = 'Catechin'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use theanine to explain sweetness, umami, and the calm texture found in high-quality or shade-grown teas.'
where beverage_type = 'tea'
  and term = 'Theanine'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use polyphenol as the broader chemistry term behind grip, color development, and aging behavior.'
where beverage_type = 'tea'
  and term = 'Polyphenol'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use Camellia when you need to remind staff that true tea comes from Camellia sinensis rather than herbal infusions.'
where beverage_type = 'tea'
  and term = 'Camellia'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use orthodox to describe conventional leaf manufacture aimed at preserving leaf shape and nuanced cup character.'
where beverage_type = 'tea'
  and term = 'Orthodox'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use CTC to flag crush-tear-curl manufacture built for quick extraction, strong color, and milk-taking blends.'
where beverage_type = 'tea'
  and term = 'Ctc'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use flush to mark harvest season or wave, especially when timing affects aroma, price, and style.'
where beverage_type = 'tea'
  and term = 'Flush'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use vernal to describe spring character or spring-picked tea when freshness and lift are central to the offer.'
where beverage_type = 'tea'
  and term = 'Vernal'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use monsoonal when rainy-season growth affects leaf pace, cup weight, and blending decisions.'
where beverage_type = 'tea'
  and term = 'Monsoonal'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = 'Use autumnal to describe late-season tea with rounder, deeper notes than spring lots.'
where beverage_type = 'tea'
  and term = 'Autumnal'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';


update public.terminology_entries
set how_to_apply = $txt$Arabica belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind higher acidity, aromatic lift, and a finer cup line. In trade use, it helps explain why a lot commands a premium and suits single-origin programs.$txt$
where term = 'Arabica'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Robusta to anchor origin training, green coffee selection, and guest-facing copy around more body, firmer bitterness, and heavier crema. It is practical shorthand for blend cost, caffeine lift, and espresso structure.$txt$
where term = 'Robusta'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Typica belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind classic sweetness and elegant citrus-led structure. In trade use, it helps explain benchmark quality in traditional arabica lineages.$txt$
where term = 'Typica'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Call out Caturra when cup profile, farm selection, or blend design depends on a bright, compact, high-yield profile. In the marketplace, the term signals why many producers balance productivity with lively cup character.$txt$
where term = 'Caturra'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Call out Catuai when cup profile, farm selection, or blend design depends on steady sweetness and dependable balance. In the marketplace, the term signals farm resilience and consistent blending performance.$txt$
where term = 'Catuai'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pacamara to anchor origin training, green coffee selection, and guest-facing copy around large-bean lots with broad texture and dramatic aromatics. It is practical shorthand for why rare lots attract attention on premium lists.$txt$
where term = 'Pacamara'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Call out Geisha when cup profile, farm selection, or blend design depends on floral perfume, tea-like lift, and precision. In the marketplace, the term signals auction pricing and luxury menu positioning.$txt$
where term = 'Geisha'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Liberica belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind an unusual resinous, fruity, often smoky profile. In trade use, it helps explain how a list can highlight rarity rather than conformity.$txt$
where term = 'Liberica'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Excelsa to anchor origin training, green coffee selection, and guest-facing copy around sharp aromatic lift and tart fruit accents. It is practical shorthand for how blenders add top-note complexity.$txt$
where term = 'Excelsa'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Call out Catimor when cup profile, farm selection, or blend design depends on disease-resistant production with cup tradeoffs to manage. In the marketplace, the term signals how agronomy and quality are balanced in sourcing.$txt$
where term = 'Catimor'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Maragogipe belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind oversized beans and a delicate, open aromatic set. In trade use, it helps explain why presentation and rarity can matter as much as yield.$txt$
where term = 'Maragogipe'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$MundoNovo belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind structured sweetness and volume-friendly consistency. In trade use, it helps explain Brazilian sourcing logic for blends and espresso.$txt$
where term = 'MundoNovo'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Bourbon to anchor origin training, green coffee selection, and guest-facing copy around sweet fruit definition and polished texture. It is practical shorthand for why certain estates market heritage cultivars as quality markers.$txt$
where term = 'Bourbon'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Heirloom belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind genetic diversity and origin-driven nuance. In trade use, it helps explain why Ethiopian lots often need broader cultivar language.$txt$
where term = 'Heirloom'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Natural is applied in coffee trade language when you need to connect process to fruit weight, jammy sweetness, and broader body. It is especially useful on roast briefs and cupping tables because the seed dries inside the cherry and picks up more fruit influence.$txt$
where term = 'Natural'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Washed is applied in coffee trade language when you need to connect process to clarity, acidity, and transparent origin character. It is especially useful on roast briefs and cupping tables because removing fruit early reduces ferment impact and sharpens definition.$txt$
where term = 'Washed'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Honey when explaining why a coffee shows texture, sweetness, and mid-palate richness or why a roaster chose a certain workflow. The term has value because retained mucilage changes drying behavior and flavor development.$txt$
where term = 'Honey'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Anaerobic when discussing processing or roasting decisions that shape intense ester character and a more experimental cup profile. In production and quality control, it matters because sealed fermentation changes microbial activity and sensory outcomes.$txt$
where term = 'Anaerobic'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pulping when discussing processing or roasting decisions that shape how fruit is removed before fermentation or drying. In production and quality control, it matters because that first mechanical step sets up the rest of the process flow.$txt$
where term = 'Pulping'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Mucilage when discussing processing or roasting decisions that shape sweetness, texture, and fermentation dynamics. In production and quality control, it matters because that sticky fruit layer feeds microbial action during processing.$txt$
where term = 'Mucilage'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Demucilage when discussing processing or roasting decisions that shape cleaner, more controlled washed profiles. In production and quality control, it matters because mechanical removal reduces fermentation variability.$txt$
where term = 'Demucilage'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Drymill is applied in coffee trade language when you need to connect process to final preparation, sorting, and export readiness. It is especially useful on roast briefs and cupping tables because hulling and grading after drying decide the lot's commercial finish.$txt$
where term = 'Drymill'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Wetmill when explaining why a coffee shows pulping, washing, and fermentation control at origin or why a roaster chose a certain workflow. The term has value because mill setup strongly affects cleanliness and consistency.$txt$
where term = 'Wetmill'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Defect when explaining why a coffee shows price deductions, grading calls, and cup faults or why a roaster chose a certain workflow. The term has value because a defect changes both valuation and sensory trust.$txt$
where term = 'Defect'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Screening when explaining why a coffee shows bean-size uniformity before roasting or why a roaster chose a certain workflow. The term has value because even size improves heat transfer and cleaner roast development.$txt$
where term = 'Screening'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Roastery when explaining why a coffee shows how production philosophy becomes a finished style or why a roaster chose a certain workflow. The term has value because roastery standards govern sourcing, profiling, and quality release.$txt$
where term = 'Roastery'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Roast when explaining why a coffee shows solubility, aroma balance, and brew suitability or why a roaster chose a certain workflow. The term has value because the roast decision determines how far origin character or development is pushed.$txt$
where term = 'Roast'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Maillard when explaining why a coffee shows nutty, bready, and chocolate-like development or why a roaster chose a certain workflow. The term has value because those browning reactions build complexity between drying and darker roast stages.$txt$
where term = 'Maillard'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Caramelization is applied in coffee trade language when you need to connect process to deeper sweetness and darker sugar tones. It is especially useful on roast briefs and cupping tables because continued heat transforms sugars and shifts the cup away from raw acidity.$txt$
where term = 'Caramelization'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Development when discussing processing or roasting decisions that shape how fully the roast finishes after first crack. In production and quality control, it matters because too little leaves the cup sharp while too much mutes detail.$txt$
where term = 'Development'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Degassing when explaining why a coffee shows espresso stability and packaging timing or why a roaster chose a certain workflow. The term has value because freshly roasted coffee releases carbon dioxide that can distort extraction.$txt$
where term = 'Degassing'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Refractometer belongs in espresso or brew conversations whenever measuring strength and extraction with precision is the target. In practical use, it matters because TDS data keeps brew decisions grounded in numbers rather than guesswork.$txt$
where term = 'Refractometer'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Dose when dialing in beverages, teaching staff, or writing service specs around controlling concentration and extraction balance. The term stays useful because changing the dry coffee mass shifts how the recipe behaves.$txt$
where term = 'Dose'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Yield when dialing in beverages, teaching staff, or writing service specs around tracking beverage output and recipe ratio. The term stays useful because cup weight tells the barista whether the extraction ran short or long.$txt$
where term = 'Yield'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Espresso in bar training and service standards when the goal is a concentrated brew with pressure, texture, and crema. It guides recipe choices because it is the base format for many bar drinks and a key calibration point.$txt$
where term = 'Espresso'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Ristretto belongs in espresso or brew conversations whenever a shorter, denser, sweeter espresso expression is the target. In practical use, it matters because cutting the yield changes concentration and perceived body.$txt$
where term = 'Ristretto'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Lungo belongs in espresso or brew conversations whenever a longer espresso with more dilution through extraction is the target. In practical use, it matters because extended yield shifts bitterness, body, and aromatic shape.$txt$
where term = 'Lungo'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Americano when dialing in beverages, teaching staff, or writing service specs around serving espresso in a longer, cleaner format. The term stays useful because dilution opens aroma while keeping espresso character.$txt$
where term = 'Americano'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Cappuccino in bar training and service standards when the goal is balancing espresso intensity with textured milk. It guides recipe choices because foam ratio changes both sweetness perception and service style.$txt$
where term = 'Cappuccino'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Macchiato when dialing in beverages, teaching staff, or writing service specs around marking espresso with a small amount of milk. The term stays useful because the drink keeps espresso first while softening the edge.$txt$
where term = 'Macchiato'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Cortado when dialing in beverages, teaching staff, or writing service specs around equalizing espresso and milk for a compact, balanced drink. The term stays useful because a tighter milk ratio preserves coffee definition.$txt$
where term = 'Cortado'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Dripper in bar training and service standards when the goal is manual percolation and filter shape control. It guides recipe choices because brew bed geometry affects flow rate and extraction clarity.$txt$
where term = 'Dripper'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Chemex when dialing in beverages, teaching staff, or writing service specs around a clean, polished filter profile with lighter texture. The term stays useful because the thick paper reduces sediment and oils.$txt$
where term = 'Chemex'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Kalita belongs in espresso or brew conversations whenever stable flat-bed extraction and even drawdown is the target. In practical use, it matters because its geometry helps reduce channeling in pour-over service.$txt$
where term = 'Kalita'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Aeropress in bar training and service standards when the goal is flexible immersion-plus-pressure brewing. It guides recipe choices because it lets staff change body, clarity, and brew time with ease.$txt$
where term = 'Aeropress'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Frenchpress in bar training and service standards when the goal is full-bodied immersion brewing with more sediment. It guides recipe choices because metal filtration preserves oils and weight.$txt$
where term = 'Frenchpress'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Siphon belongs in espresso or brew conversations whenever a theatrical brew with high clarity and aroma lift is the target. In practical use, it matters because vacuum brewing turns service into both extraction and presentation.$txt$
where term = 'Siphon'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Turkish when dialing in beverages, teaching staff, or writing service specs around finely ground, unfiltered brewing with dense texture. The term stays useful because the method keeps solids in the cup and carries strong cultural identity.$txt$
where term = 'Turkish'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Portafilter in bar training and service standards when the goal is holding and presenting the espresso puck correctly. It guides recipe choices because basket choice and prep affect flow and extraction.$txt$
where term = 'Portafilter'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Tamper when dialing in beverages, teaching staff, or writing service specs around setting an even coffee bed before brewing. The term stays useful because good puck prep reduces uneven water flow.$txt$
where term = 'Tamper'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Grouphead in bar training and service standards when the goal is stable water delivery at the espresso machine. It guides recipe choices because temperature and cleanliness at the head influence shot quality.$txt$
where term = 'Grouphead'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Backflush in bar training and service standards when the goal is keeping espresso equipment clean and flavor-stable. It guides recipe choices because oil buildup quickly taints shots and machine performance.$txt$
where term = 'Backflush'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Channeling belongs in espresso or brew conversations whenever diagnosing uneven extraction in the puck is the target. In practical use, it matters because water always finds weak points first and leaves the shot unbalanced.$txt$
where term = 'Channeling'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Crema when dialing in beverages, teaching staff, or writing service specs around reading freshness, gas retention, and espresso texture. The term stays useful because it affects visual appeal but must be judged alongside taste.$txt$
where term = 'Crema'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Aftertaste when dialing in beverages, teaching staff, or writing service specs around evaluating how flavor lingers after swallowing. The term stays useful because finish quality often separates average cups from great ones.$txt$
where term = 'Aftertaste'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Sweetness belongs in espresso or brew conversations whenever describing balance and ripeness in the cup is the target. In practical use, it matters because real sweetness is a quality marker across origin, roast, and brew.$txt$
where term = 'Sweetness'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Fragrance when dialing in beverages, teaching staff, or writing service specs around judging dry aroma before water is added. The term stays useful because that first aromatic read helps set cupping expectations.$txt$
where term = 'Fragrance'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Cupping in bar training and service standards when the goal is comparing coffees under a standardized tasting method. It guides recipe choices because shared protocol makes buying and QC decisions more defensible.$txt$
where term = 'Cupping'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Cupper when dialing in beverages, teaching staff, or writing service specs around the trained palate behind green-buying and QC calls. The term stays useful because commercial decisions depend on disciplined sensory judgment.$txt$
where term = 'Cupper'
  and beverage_type = 'coffee'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Scoby in brew logs, QA checks, and training when acid structure and ferment reliability depends on microbial balance. The reason is simple: the symbiotic culture drives the whole fermentation.$txt$
where term = 'Scoby'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pellicle when explaining culture health, fermentation behavior, or cellar decisions in kombucha production. It matters because the cellulose mat is a sign of active culture rather than the whole culture itself and it directly shapes surface growth and oxygen-exposed fermentation behavior.$txt$
where term = 'Pellicle'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Acetobacter belongs in kombucha production notes whenever you need to link microbial activity to vinegar-like lift and acid development. In practical terms, these bacteria convert alcohol into acetic acid when oxygen is available.$txt$
where term = 'Acetobacter'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Gluconacetobacter belongs in kombucha production notes whenever you need to link microbial activity to cellulose formation and stable acid production. In practical terms, it helps build the pellicle while shaping the ferment.$txt$
where term = 'Gluconacetobacter'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Saccharomyces in brew logs, QA checks, and training when sugar conversion and early alcohol production depends on microbial balance. The reason is simple: yeast activity sets up the bacteria that follow.$txt$
where term = 'Saccharomyces'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Brettanomyces in brew logs, QA checks, and training when funky, wild aromatic notes when present depends on microbial balance. The reason is simple: it can add complexity or push the batch off style.$txt$
where term = 'Brettanomyces'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Inoculum belongs in kombucha production notes whenever you need to link microbial activity to fermentation speed and consistency from batch to batch. In practical terms, the starting culture volume sets the initial microbial balance.$txt$
where term = 'Inoculum'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Backslop in brew logs, QA checks, and training when fast acidification and safer batch starts depends on microbial balance. The reason is simple: using mature kombucha as starter lowers pH early.$txt$
where term = 'Backslop'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Acetic when discussing fermentation management, packaging, or sensory control in kombucha. It matters because too much acetic character makes the drink harsh and culinary rather than refreshing and shows up as sharp vinegar-like drive on the palate.$txt$
where term = 'Acetic'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Gluconic is useful trade language when a producer needs to connect process choices to a gentler acid line with softer sourness. On the floor, this acid often contributes freshness without the bite of straight vinegar notes.$txt$
where term = 'Gluconic'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Lactic is useful trade language when a producer needs to connect process choices to rounder, yogurt-like acidity when it appears. On the floor, its softer profile can shift the drink toward a smoother sour impression.$txt$
where term = 'Lactic'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Malic when discussing fermentation management, packaging, or sensory control in kombucha. It matters because the term helps tasters separate green-fruit lift from harsher acetic notes and shows up as apple-like acidity and crispness.$txt$
where term = 'Malic'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Succinic is useful trade language when a producer needs to connect process choices to a savory-bitter acid accent in the finish. On the floor, it can add complexity but can also read coarse if balance is poor.$txt$
where term = 'Succinic'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Carbonation on batch sheets or tasting notes whenever package pressure and mouthfeel is at stake. It earns its keep because dissolved carbon dioxide drives liveliness and shelf behavior.$txt$
where term = 'Carbonation'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Effervescence when discussing fermentation management, packaging, or sensory control in kombucha. It matters because bubble texture changes perceived freshness and shows up as how fine and elegant the bubbles feel in service.$txt$
where term = 'Effervescence'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Fizz on batch sheets or tasting notes whenever casual service language for visible sparkle and lift is at stake. It earns its keep because retail staff use it to describe liveliness in approachable terms.$txt$
where term = 'Fizz'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Vinegar on batch sheets or tasting notes whenever the point where the batch has moved too far toward acetic sharpness is at stake. It earns its keep because producers watch this closely to avoid losing drinkability.$txt$
where term = 'Vinegar'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Tanginess is useful trade language when a producer needs to connect process choices to bright, appetizing acidity in the finished drink. On the floor, the word helps sell sour refreshment without sounding harsh.$txt$
where term = 'Tanginess'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Dryness when discussing fermentation management, packaging, or sensory control in kombucha. It matters because it signals a cleaner finish and a more adult profile and shows up as how little residual sugar remains at bottling.$txt$
where term = 'Dryness'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Headspace when discussing fermentation management, packaging, or sensory control in kombucha. It matters because the fill level affects both acetic development and carbonation and shows up as oxygen exposure and package pressure risk.$txt$
where term = 'Headspace'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Biofilm belongs in kombucha production notes whenever you need to link microbial activity to surface growth, sanitation review, and culture behavior. In practical terms, not every film is healthy kombucha growth, so the term sharpens QA language.$txt$
where term = 'Biofilm'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Cooling is useful trade language when a producer needs to connect process choices to slowing fermentation before storage or transport. On the floor, temperature control is one of the cleanest ways to steady a live product.$txt$
where term = 'Cooling'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Flavoring when discussing fermentation management, packaging, or sensory control in kombucha. It matters because secondary additions can raise both appeal and instability and shows up as how fruit, spice, or herb additions reshape the base tea ferment.$txt$
where term = 'Flavoring'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Secondary when discussing fermentation management, packaging, or sensory control in kombucha. It matters because this stage often decides final pressure and aromatic style and shows up as bottle conditioning, flavor integration, and extra fizz.$txt$
where term = 'Secondary'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Primary on batch sheets or tasting notes whenever the main fermentation where sugar is first transformed is at stake. It earns its keep because getting this stage right sets the ceiling for the whole batch.$txt$
where term = 'Primary'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Acidification on batch sheets or tasting notes whenever microbial safety and final balance is at stake. It earns its keep because dropping pH quickly protects the batch and defines the style.$txt$
where term = 'Acidification'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Sanitation when discussing fermentation management, packaging, or sensory control in kombucha. It matters because clean equipment is non-negotiable with a live acidic beverage and shows up as preventing spoilage and off-flavor organisms.$txt$
where term = 'Sanitation'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Contamination on batch sheets or tasting notes whenever why a batch has drifted off profile or become unsafe is at stake. It earns its keep because the term is used when unwanted organisms overtake the intended culture.$txt$
where term = 'Contamination'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Mold when discussing fermentation management, packaging, or sensory control in kombucha. It matters because visible mold means the culture and batch can no longer be trusted and shows up as a discard decision rather than a salvage discussion.$txt$
where term = 'Mold'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Kahm is useful trade language when a producer needs to connect process choices to surface yeast growth that signals quality trouble. On the floor, it is not the same as mold, but it still strips freshness and clean flavor.$txt$
where term = 'Kahm'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Culture in brew logs, QA checks, and training when the living engine of the beverage depends on microbial balance. The reason is simple: operators use the word broadly for the yeast-and-bacteria system that governs flavor and safety.$txt$
where term = 'Culture'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Symbiosis in brew logs, QA checks, and training when the balance between yeast fermentation and bacterial acid formation depends on microbial balance. The reason is simple: kombucha quality depends on those partners working in step.$txt$
where term = 'Symbiosis'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Dilution when discussing fermentation management, packaging, or sensory control in kombucha. It matters because watering back can recover balance, but it also changes acid, sugar, and aroma definition and shows up as adjusting intensity before packaging or service.$txt$
where term = 'Dilution'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Sourness on batch sheets or tasting notes whenever consumer-facing tartness and refreshment level is at stake. It earns its keep because the term lets tasters discuss acid impact apart from aroma.$txt$
where term = 'Sourness'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Ethanol is useful trade language when a producer needs to connect process choices to compliance, label risk, and fermentation stage. On the floor, alcohol is a normal intermediate and has to be managed carefully.$txt$
where term = 'Ethanol'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Acetate on batch sheets or tasting notes whenever volatile ester and solvent-like notes when the ferment drifts is at stake. It earns its keep because producers track it because it can move a batch from lively to coarse.$txt$
where term = 'Acetate'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Cellulose when explaining culture health, fermentation behavior, or cellar decisions in kombucha production. It matters because bacterial cellulose is one visual sign of an active ferment and it directly shapes pellicle formation and the physical structure of the culture.$txt$
where term = 'Cellulose'
  and beverage_type = 'kombucha'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Nectar when connecting processing choices to a richer fruit style that needs added body or sweetness in packaged or fresh juice. The trade value is that the term tells buyers the drink is not simply straight juice.$txt$
where term = 'Nectar'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Concentrate when connecting processing choices to cost, logistics, and reprocessing options in packaged or fresh juice. The trade value is that removing water changes freight efficiency and formulation flexibility.$txt$
where term = 'Concentrate'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Reconstitution when connecting processing choices to how a concentrate returns to saleable strength in packaged or fresh juice. The trade value is that water quality and ratio accuracy decide whether the finished juice feels complete.$txt$
where term = 'Reconstitution'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Clarifier belongs on technical sheets, tasting reviews, and plant discussions whenever how haze is reduced before packaging needs to be controlled. In practical terms, clear juice needs solids managed without stripping too much character.$txt$
where term = 'Clarifier'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pectinase in juice production and buying conversations when yield, settling, and filtration ease is the concern. It matters because breaking down pectin helps free juice and lower viscosity.$txt$
where term = 'Pectinase'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Enzyme when connecting processing choices to targeted changes to texture, extraction, or clarification in packaged or fresh juice. The trade value is that processors use specific enzymes to solve specific plant problems.$txt$
where term = 'Enzyme'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Cloudiness when a juice's appeal rests on natural-looking opacity and suspended solids. The term matters because for some styles it signals freshness, while for others it reads as instability.$txt$
where term = 'Cloudiness'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pulp in tasting, menu copy, or QC language when you need to describe texture and a sense of less processed fruit. It is useful because the amount of pulp changes both drinking feel and customer preference.$txt$
where term = 'Pulp'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pressing in juice production and buying conversations when how efficiently fruit becomes juice without harsh extraction is the concern. It matters because press choices affect yield, solids, and bitterness.$txt$
where term = 'Pressing'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Aseptic when connecting processing choices to shelf-stable packaging without refrigeration in packaged or fresh juice. The trade value is that sterile product and sterile pack conditions extend life while preserving flavor.$txt$
where term = 'Aseptic'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Sweetener belongs on technical sheets, tasting reviews, and plant discussions whenever final balance and target market style needs to be controlled. In practical terms, adding sweetness changes both label position and sensory honesty.$txt$
where term = 'Sweetener'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Acidulant when connecting processing choices to brightness, microbial stability, and flavor lift in packaged or fresh juice. The trade value is that added acid can restore structure that fruit alone does not provide.$txt$
where term = 'Acidulant'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Stabilizer when connecting processing choices to suspension and texture over shelf life in packaged or fresh juice. The trade value is that it helps keep the drink uniform instead of separating out.$txt$
where term = 'Stabilizer'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Deaeration in juice production and buying conversations when oxidative stability and fresher flavor retention is the concern. It matters because removing dissolved oxygen limits browning and aroma loss.$txt$
where term = 'Deaeration'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Browning helps retailers, makers, and educators discuss oxidation damage or heat stress in the product without vague wording. In practice, the term matters because color shift often warns of flavor decline.$txt$
where term = 'Browning'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Ascorbate belongs on technical sheets, tasting reviews, and plant discussions whenever protecting color and limiting oxidation needs to be controlled. In practical terms, ascorbic additions are often used as an antioxidant tool.$txt$
where term = 'Ascorbate'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Citric in juice production and buying conversations when sharpening the acid line in fruit beverages is the concern. It matters because the term is useful when final brightness needs to be adjusted predictably.$txt$
where term = 'Citric'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Tartaric belongs on technical sheets, tasting reviews, and plant discussions whenever firmer, wine-like acid structure in certain blends needs to be controlled. In practical terms, it is used when a sharper and more persistent acid backbone is wanted.$txt$
where term = 'Tartaric'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Turbidity in tasting, menu copy, or QC language when you need to describe the amount of suspended matter in the juice. It is useful because it helps QA teams decide whether the product looks intentionally rustic or poorly settled.$txt$
where term = 'Turbidity'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Sedimentation when connecting processing choices to how solids fall out during holding or distribution in packaged or fresh juice. The trade value is that the term matters because visible separation can hurt consumer trust.$txt$
where term = 'Sedimentation'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Retort belongs on technical sheets, tasting reviews, and plant discussions whenever thermal preservation in sealed packages needs to be controlled. In practical terms, that heat step secures shelf life but can also flatten fresh fruit notes.$txt$
where term = 'Retort'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Chiller when connecting processing choices to bringing juice down to a stable storage temperature quickly in packaged or fresh juice. The trade value is that fast cooling protects aroma and slows spoilage.$txt$
where term = 'Chiller'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Conveyor belongs on technical sheets, tasting reviews, and plant discussions whenever line efficiency and gentle package handling needs to be controlled. In practical terms, even simple movement systems matter when throughput and damage control are on the line.$txt$
where term = 'Conveyor'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Mouthfeel helps retailers, makers, and educators discuss how weight, texture, and smoothness register on the palate without vague wording. In practice, buyers often decide repeat purchase on feel as much as flavor.$txt$
where term = 'Mouthfeel'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Flavor in tasting, menu copy, or QC language when you need to describe the overall taste identity of the juice. It is useful because the term lets teams discuss whether fruit character tastes fresh, cooked, dilute, or balanced.$txt$
where term = 'Flavor'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Color helps retailers, makers, and educators discuss visual ripeness, style, and processing impact without vague wording. In practice, customers judge quality long before the first sip.$txt$
where term = 'Color'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Hue when a juice's appeal rests on the shade and tonal direction of the juice. The term matters because small hue shifts can reveal oxidation, dilution, or fruit variety differences.$txt$
where term = 'Hue'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pomace in juice production and buying conversations when what remains after extraction and whether more value can be recovered is the concern. It matters because the term matters in yield calculations and by-product planning.$txt$
where term = 'Pomace'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Coldpress belongs on technical sheets, tasting reviews, and plant discussions whenever a fresh, minimally heated positioning needs to be controlled. In practical terms, the style is sold on cleaner flavor and premium wellness appeal.$txt$
where term = 'Coldpress'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Juiciness when a juice's appeal rests on how vividly a beverage evokes ripe, fresh fruit. The term matters because the word is useful in sales because it points to immediacy and drinkability.$txt$
where term = 'Juiciness'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Ripening in juice production and buying conversations when harvest timing and sugar-acid balance before processing is the concern. It matters because fruit picked at the wrong stage never fully recovers in the tank.$txt$
where term = 'Ripening'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Storage when connecting processing choices to how temperature and time preserve or erode freshness in packaged or fresh juice. The trade value is that good storage is one of the cheapest quality protections in the business.$txt$
where term = 'Storage'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Labeling in juice production and buying conversations when how the product is legally and commercially presented is the concern. It matters because claims about juice content, sweeteners, or processing must match the package.$txt$
where term = 'Labeling'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Distribution when connecting processing choices to how the product survives the route to market in packaged or fresh juice. The trade value is that cold chain, handling, and shelf rotation all influence the final drink.$txt$
where term = 'Distribution'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Refreshment in tasting, menu copy, or QC language when you need to describe the drink's ability to quench and invite another sip. It is useful because it is a useful sales term because balance matters more than sheer sweetness.$txt$
where term = 'Refreshment'
  and beverage_type = 'juice'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Casein belongs in dairy training and plant specs whenever body, whiteness, and curd formation drives the outcome. In practice, casein is the key milk protein in cheese and many dairy textures.$txt$
where term = 'Casein'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Lactose belongs in dairy training and plant specs whenever natural sweetness and fermentation potential drives the outcome. In practice, milk sugar affects both flavor and digestibility.$txt$
where term = 'Lactose'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Lactase in cheesemaking, cultured dairy, or fluid milk discussions when making milk easier to tolerate and slightly sweeter is under review. The trade value is that the enzyme splits lactose into simpler sugars.$txt$
where term = 'Lactase'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Whey in cheesemaking, cultured dairy, or fluid milk discussions when the liquid fraction left after curd formation is under review. The trade value is that its composition matters for cheese yield, beverages, and powders.$txt$
where term = 'Whey'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Curd in cheesemaking, cultured dairy, or fluid milk discussions when the solid phase that becomes cheese or strained dairy is under review. The trade value is that managing curd texture decides moisture and final style.$txt$
where term = 'Curd'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Creamline when dairy production, texture, or shelf-life decisions hinge on a non-homogenized look that signals richness and minimal processing. It matters because the rise of fat to the top changes both appearance and marketing story.$txt$
where term = 'Creamline'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Homogenization belongs in dairy training and plant specs whenever fat distribution and visual uniformity drives the outcome. In practice, breaking fat globules keeps cream from separating.$txt$
where term = 'Homogenization'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Uht in cheesemaking, cultured dairy, or fluid milk discussions when long shelf life without refrigeration before opening is under review. The trade value is that ultra-high-temperature treatment trades some fresh flavor for convenience.$txt$
where term = 'Uht'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Skimming when dairy production, texture, or shelf-life decisions hinge on reducing fat level and changing texture. It matters because removing cream shifts both nutrition and sensory weight.$txt$
where term = 'Skimming'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Rennet in cheesemaking, cultured dairy, or fluid milk discussions when controlled coagulation in cheesemaking is under review. The trade value is that it triggers a cleaner curd set than uncontrolled souring.$txt$
where term = 'Rennet'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Coagulation in cheesemaking, cultured dairy, or fluid milk discussions when the moment liquid milk turns into a structured gel is under review. The trade value is that that transition is fundamental in cheese and cultured dairy.$txt$
where term = 'Coagulation'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Curdling in cheesemaking, cultured dairy, or fluid milk discussions when an unwanted split or an intended transformation depending on context is under review. The trade value is that the term helps separate technique from spoilage.$txt$
where term = 'Curdling'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Churning in cheesemaking, cultured dairy, or fluid milk discussions when turning cream into butter by disrupting the emulsion is under review. The trade value is that the process decides grain, buttermilk release, and final texture.$txt$
where term = 'Churning'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Culturing when dairy production, texture, or shelf-life decisions hinge on using live microbes to acidify and flavor dairy. It matters because it drives yogurt, kefir, and many fermented milk styles.$txt$
where term = 'Culturing'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Probiotic when dairy production, texture, or shelf-life decisions hinge on live-culture positioning and gut-health marketing. It matters because the term matters only when the product is built around viable strains.$txt$
where term = 'Probiotic'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Thermization when dairy production, texture, or shelf-life decisions hinge on milder heat treatment before further processing. It matters because it lowers microbial load without fully pasteurizing the milk.$txt$
where term = 'Thermization'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Ultraheat in cheesemaking, cultured dairy, or fluid milk discussions when extreme heat processing for shelf stability is under review. The trade value is that the term helps explain cooked notes and extended storage life.$txt$
where term = 'Ultraheat'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Microfiltration when dairy production, texture, or shelf-life decisions hinge on removing microbes and particles with less heat impact. It matters because it can extend shelf life while keeping a fresher profile.$txt$
where term = 'Microfiltration'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Separation in cheesemaking, cultured dairy, or fluid milk discussions when splitting cream from skim for later standardization is under review. The trade value is that controlling fat streams is basic dairy plant practice.$txt$
where term = 'Separation'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Creaming in cheesemaking, cultured dairy, or fluid milk discussions when the natural rise of fat in non-homogenized milk is under review. The trade value is that it changes both mouthfeel and visual expectation.$txt$
where term = 'Creaming'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Lipolysis in cheesemaking, cultured dairy, or fluid milk discussions when fat breakdown and the development of sharp dairy notes is under review. The trade value is that too much can taste rancid, but controlled levels add character in some products.$txt$
where term = 'Lipolysis'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Proteolysis when dairy production, texture, or shelf-life decisions hinge on protein breakdown during ripening or fermentation. It matters because it softens texture and builds savory depth.$txt$
where term = 'Proteolysis'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Gelation when dairy production, texture, or shelf-life decisions hinge on the setting of yogurt, custard, or other dairy structures. It matters because the final texture depends on how the protein network forms.$txt$
where term = 'Gelation'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Syneresis in cheesemaking, cultured dairy, or fluid milk discussions when whey leakage from a gelled dairy product is under review. The trade value is that it is a critical fault call when yogurt or curd starts to weep.$txt$
where term = 'Syneresis'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Lactation when the identity of the animal, herd, or farm system explains seasonal yield and compositional shifts. It is practical trade shorthand because stage of lactation changes fat, protein, and milk volume.$txt$
where term = 'Lactation'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Colostrum when discussing milk style, fat quality, or production economics around the first milk after birth and its unusual richness. The term matters because it is nutritionally different and not treated like standard market milk.$txt$
where term = 'Colostrum'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Mastitis when the identity of the animal, herd, or farm system explains animal health, somatic cell counts, and flavor risk. It is practical trade shorthand because udder infection directly affects quality and farm economics.$txt$
where term = 'Mastitis'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Caseinate when dairy production, texture, or shelf-life decisions hinge on using milk protein as a functional ingredient. It matters because processors rely on it for emulsification and added body.$txt$
where term = 'Caseinate'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Buttermilk when dairy production, texture, or shelf-life decisions hinge on either a cultured drink or the liquid left from butter making. It matters because the term affects both recipe design and label language.$txt$
where term = 'Buttermilk'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Kefir in cheesemaking, cultured dairy, or fluid milk discussions when a cultured dairy drink with lively acidity and slight effervescence is under review. The trade value is that it is used when the goal is a more dynamic fermented profile than yogurt.$txt$
where term = 'Kefir'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Yogurt in cheesemaking, cultured dairy, or fluid milk discussions when set or stirred cultured milk with clear acid freshness is under review. The trade value is that the term frames texture, live culture use, and market expectation.$txt$
where term = 'Yogurt'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Laban belongs in dairy training and plant specs whenever a savory, drinkable cultured milk style drives the outcome. In practice, it helps position dairy beyond sweet yogurt formats.$txt$
where term = 'Laban'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Holstein belongs in dairy buying and education when you need to connect source conditions to high-volume milk supply with moderate fat. In real use, breed choice affects both economics and composition.$txt$
where term = 'Holstein'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Jersey when discussing milk style, fat quality, or production economics around richer fat and protein concentration. The term matters because the breed is often cited when a creamier dairy profile is desired.$txt$
where term = 'Jersey'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Guernsey belongs in dairy buying and education when you need to connect source conditions to golden milk color and generous richness. In real use, its breed identity supports premium dairy storytelling.$txt$
where term = 'Guernsey'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Buffalo belongs in dairy buying and education when you need to connect source conditions to dense milk suited to mozzarella and rich cultured products. In real use, higher solids change both yield and texture.$txt$
where term = 'Buffalo'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Caprine belongs in dairy buying and education when you need to connect source conditions to goat-milk identity and a lighter fat structure. In real use, the term is used when species character matters to flavor or digestibility.$txt$
where term = 'Caprine'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Ovine when the identity of the animal, herd, or farm system explains sheep-milk richness and high cheese yield. It is practical trade shorthand because its solids concentration changes texture and value.$txt$
where term = 'Ovine'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Bovine when discussing milk style, fat quality, or production economics around standard cow-milk supply in most commercial dairy systems. The term matters because the term is useful when species must be stated precisely.$txt$
where term = 'Bovine'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Silage when the identity of the animal, herd, or farm system explains feed-derived aromas that can carry into the milk. It is practical trade shorthand because ration style affects sensory quality and seasonality.$txt$
where term = 'Silage'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Feedlot when discussing milk style, fat quality, or production economics around intensive production economics and feed consistency. The term matters because the management system helps explain cost and compositional uniformity.$txt$
where term = 'Feedlot'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Milkshed belongs in dairy buying and education when you need to connect source conditions to the geographic supply zone feeding a plant or brand. In real use, origin logistics and local identity both depend on it.$txt$
where term = 'Milkshed'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Foaming when dairy production, texture, or shelf-life decisions hinge on how milk behaves for cappuccino and latte service. It matters because protein and fat balance determine bubble stability.$txt$
where term = 'Foaming'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Texturization in cheesemaking, cultured dairy, or fluid milk discussions when steaming milk to the right gloss and density is under review. The trade value is that bar service depends on controlled microfoam rather than random bubbles.$txt$
where term = 'Texturization'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Pasteurizer when dairy production, texture, or shelf-life decisions hinge on the equipment step that makes milk safer for sale. It matters because time and temperature choices shape both safety and flavor retention.$txt$
where term = 'Pasteurizer'
  and beverage_type = 'milk'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Aquifer when source identity or watershed context explains source consistency and mineral identity. It matters in water trade because underground geology often defines the water long before bottling.$txt$
where term = 'Aquifer'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Alkalinity belongs in sensory, compliance, and sourcing discussions whenever buffering capacity and how resistant the water is to pH change is tied to composition. In practical terms, it influences taste, extraction, and how a water handles acid in coffee or food pairing.$txt$
where term = 'Alkalinity'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Hardness when the chemistry of a water changes service value or production fit. The term is useful because hard water behaves differently in both equipment and extraction and shows up in scale risk and the grip of calcium and magnesium on the palate.$txt$
where term = 'Hardness'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Softness belongs in sensory, compliance, and sourcing discussions whenever a gentler mouthfeel and lower mineral load is tied to composition. In practical terms, the term helps explain why some waters taste round but extract lightly.$txt$
where term = 'Softness'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Mineralization when the chemistry of a water changes service value or production fit. The term is useful because it is a core driver of both flavor and premium positioning and shows up in overall dissolved-mineral intensity and texture.$txt$
where term = 'Mineralization'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Conductivity belongs in sensory, compliance, and sourcing discussions whenever how much dissolved ionic material the water contains is tied to composition. In practical terms, higher conductivity usually signals a more mineralized water.$txt$
where term = 'Conductivity'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bicarbonate belongs in sensory, compliance, and sourcing discussions whenever buffering power and chalky structure is tied to composition. In practical terms, it is one of the key ions behind alkalinity.$txt$
where term = 'Bicarbonate'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Calcium when reading a water report, setting product specs, or pairing water with food and coffee. It matters because calcium can improve brewing performance but also build scale and directly affects hardness, structure, and extraction support.$txt$
where term = 'Calcium'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Magnesium belongs in sensory, compliance, and sourcing discussions whenever hardness with a sharper effect on flavor extraction is tied to composition. In practical terms, it is prized in many coffee water recipes for lifting perceived clarity.$txt$
where term = 'Magnesium'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Sodium belongs in sensory, compliance, and sourcing discussions whenever saline roundness and palate width is tied to composition. In practical terms, in balance it can soften the impression of acidity, but too much tastes flat or salty.$txt$
where term = 'Sodium'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Potassium when the chemistry of a water changes service value or production fit. The term is useful because the term matters when full ionic balance is being discussed rather than headline minerals alone and shows up in minor mineral contribution and subtle palate softness.$txt$
where term = 'Potassium'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Sulfate belongs in sensory, compliance, and sourcing discussions whenever a drier, more assertive mineral impression is tied to composition. In practical terms, higher sulfate can make water feel firmer and more bitter.$txt$
where term = 'Sulfate'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Chloride when reading a water report, setting product specs, or pairing water with food and coffee. It matters because too much can damage equipment and muddy flavor and directly affects fullness and a softer round texture at moderate levels.$txt$
where term = 'Chloride'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Silica when reading a water report, setting product specs, or pairing water with food and coffee. It matters because it is a talking point when mouthfeel rather than hardness drives the style and directly affects a smooth, polished texture often noted in premium still waters.$txt$
where term = 'Silica'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Fluoride belongs in sensory, compliance, and sourcing discussions whenever regulatory and health discussion more than broad sensory style is tied to composition. In practical terms, its presence is tracked closely in many municipal and packaged waters.$txt$
where term = 'Fluoride'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Nitrate belongs in sensory, compliance, and sourcing discussions whenever source vulnerability and compliance risk is tied to composition. In practical terms, elevated nitrate points to contamination pressure from agriculture or waste.$txt$
where term = 'Nitrate'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Nitrite when reading a water report, setting product specs, or pairing water with food and coffee. It matters because it is watched closely because acceptable levels are very low and directly affects an immediate safety concern in water analysis.$txt$
where term = 'Nitrite'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Arsenic belongs in sensory, compliance, and sourcing discussions whenever whether a source is safe and legally saleable is tied to composition. In practical terms, trace toxic metals turn a geology story into a compliance issue.$txt$
where term = 'Arsenic'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Manganese when the chemistry of a water changes service value or production fit. The term is useful because even moderate levels can hurt both appearance and taste and shows up in metallic notes, staining, and technical treatment needs.$txt$
where term = 'Manganese'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Iron when reading a water report, setting product specs, or pairing water with food and coffee. It matters because the term matters whenever water tastes metallic or leaves deposits and directly affects rusty flavor, discoloration, and source treatment decisions.$txt$
where term = 'Iron'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Potability is practical language for plant operators and beverage buyers when whether the water is fit for human consumption depends on treatment. In real use, all source romance is secondary if the water does not meet safety standards.$txt$
where term = 'Potability'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Disinfection in QA, compliance, and service training whenever microbial safety before bottling or service is managed through treatment. The term earns its keep because the purpose is to control pathogens without destroying drinkability.$txt$
where term = 'Disinfection'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Chlorination is practical language for plant operators and beverage buyers when residual protection in treated water depends on treatment. In real use, chlorine is effective, but it has to be controlled to avoid medicinal flavor.$txt$
where term = 'Chlorination'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Ozonation is practical language for plant operators and beverage buyers when clean microbial control with little residual taste depends on treatment. In real use, ozone works fast and then dissipates.$txt$
where term = 'Ozonation'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Ultraviolet when treatment decisions shape safety, texture, or finish in packaged or service water. It matters because UV is useful when producers want clean treatment and neutral flavor impact and influences microbial reduction without adding a chemical residue.$txt$
where term = 'Ultraviolet'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Membrane when treatment decisions shape safety, texture, or finish in packaged or service water. It matters because membrane systems let operators strip out unwanted dissolved material and influences precision filtration such as reverse osmosis.$txt$
where term = 'Membrane'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Remineralization is practical language for plant operators and beverage buyers when restoring balance after aggressive filtration depends on treatment. In real use, water stripped too clean often tastes hollow until minerals are put back.$txt$
where term = 'Remineralization'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Sparkling when treatment decisions shape safety, texture, or finish in packaged or service water. It matters because the presence of dissolved CO2 changes both palate lift and service occasion and influences carbonation level, bubble texture, and pairing energy.$txt$
where term = 'Sparkling'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Stillwater in QA, compliance, and service training whenever a quiet texture without carbonation is managed through treatment. The term earns its keep because the term helps contrast source and mineral style without bubble interference.$txt$
where term = 'Stillwater'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Springwater belongs in source storytelling, technical review, and packaging language whenever natural emergence and premium origin storytelling depends on origin. In practice, the legal and marketing value rests on water rising from an underground source.$txt$
where term = 'Springwater'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Glacial belongs in source storytelling, technical review, and packaging language whenever cold-origin purity cues and very clean branding depends on origin. In practice, the term is often used when source image matters as much as chemistry.$txt$
where term = 'Glacial'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Artesian belongs in source storytelling, technical review, and packaging language whenever confined-source pressure and distinctive provenance depends on origin. In practice, a naturally pressurized source can support both quality narrative and technical distinction.$txt$
where term = 'Artesian'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Groundwater when source identity or watershed context explains subsurface sourcing and mineral pickup from geology. It matters in water trade because many packaged waters are defined more by underground travel than by surface conditions.$txt$
where term = 'Groundwater'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Bring in Watershed when a water's market position or sensory profile is tied to the broader landscape feeding a source. The reason is that what happens across the drainage area shapes long-term quality risk.$txt$
where term = 'Watershed'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Catchment belongs in source storytelling, technical review, and packaging language whenever where source water is collected and protected depends on origin. In practice, good catchment management keeps contamination risk low.$txt$
where term = 'Catchment'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Runoff when source identity or watershed context explains how quickly contaminants or sediments can reach a source. It matters in water trade because the term matters in both environmental review and source protection.$txt$
where term = 'Runoff'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Recharge when source identity or watershed context explains how an aquifer is naturally replenished. It matters in water trade because recharge rate affects sustainability and extraction planning.$txt$
where term = 'Recharge'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Hydrology belongs in source storytelling, technical review, and packaging language whenever how water moves through a region and into supply depends on origin. In practice, understanding flow patterns supports source planning and risk management.$txt$
where term = 'Hydrology'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Hydrogeology belongs in source storytelling, technical review, and packaging language whenever the relationship between rock structure and groundwater behavior depends on origin. In practice, the term explains why one source is stable, mineral, or vulnerable.$txt$
where term = 'Hydrogeology'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Desalination is practical language for plant operators and beverage buyers when turning saline feed water into usable drinking water depends on treatment. In real use, the process opens supply options where fresh water is scarce.$txt$
where term = 'Desalination'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Brackish when reading a water report, setting product specs, or pairing water with food and coffee. It matters because the term matters because moderate salt content changes both treatment needs and taste and directly affects water that sits between fresh and fully saline.$txt$
where term = 'Brackish'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Salinity when the chemistry of a water changes service value or production fit. The term is useful because higher salinity changes palatability, pairing, and process requirements and shows up in the total salt impression and treatment burden.$txt$
where term = 'Salinity'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Use Palatability when treatment decisions shape safety, texture, or finish in packaged or service water. It matters because legal safety alone does not guarantee guest approval and influences whether the water is actually pleasant to drink.$txt$
where term = 'Palatability'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';

update public.terminology_entries
set how_to_apply = $txt$Apply Purity in QA, compliance, and service training whenever a clean, fault-free impression in the glass is managed through treatment. The term earns its keep because in trade language it is useful only when backed by analysis rather than vague marketing.$txt$
where term = 'Purity'
  and beverage_type = 'water'
  and source_title = 'Sip Studies Original Editorial Glossary Curated v2';


commit;

