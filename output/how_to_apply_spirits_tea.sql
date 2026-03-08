-- Original editorial rewrite for spirits and tea terminology how_to_apply fields.
-- Scope: beverage_type in ('spirits', 'tea') and source_title = 'Sip Studies Original Editorial Glossary Curated v2'.
begin;

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

commit;