-- Original editorial rewrites for terminology_entries.how_to_apply
-- Scope: coffee, kombucha, juice, milk, and water from Sip Studies Original Editorial Glossary Curated v2
begin;

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