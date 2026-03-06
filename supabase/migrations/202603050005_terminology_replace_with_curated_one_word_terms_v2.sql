-- Replace Curated v1 with Curated v2 natural one-word exam-style terminology.

delete from public.terminology_entries
where source_title = 'Sip Studies Original Editorial Glossary Curated v1';

insert into public.terminology_entries (
  term,
  beverage_type,
  category,
  meaning,
  how_to_apply,
  examples,
  other_ideas,
  related_terms,
  reference_links,
  mla_citations,
  source_title,
  source_authors,
  purchase_links,
  is_verbatim_from_source,
  source_rights_basis,
  source_note,
  is_published
)
values
(
  'Aglianico',
  'wine',
  'production style',
  '"Aglianico" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Aglianico" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Aglianico" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Aglianico" appears in each.'
  ]::text[],
  array[
    'Add "Aglianico" to flashcards with one benchmark reference.',
    'Pair "Aglianico" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Albarino',
  'wine',
  'variety of source ingredient',
  '"Albarino" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Albarino" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Albarino" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Albarino" appears in each.'
  ]::text[],
  array[
    'Add "Albarino" to flashcards with one benchmark reference.',
    'Pair "Albarino" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Amarone',
  'wine',
  'terroir',
  '"Amarone" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Amarone" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Amarone" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Amarone" appears in each.'
  ]::text[],
  array[
    'Add "Amarone" to flashcards with one benchmark reference.',
    'Pair "Amarone" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ampelography',
  'wine',
  'location',
  '"Ampelography" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Ampelography" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Ampelography" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Ampelography" appears in each.'
  ]::text[],
  array[
    'Add "Ampelography" to flashcards with one benchmark reference.',
    'Pair "Ampelography" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Appellation',
  'wine',
  'production style',
  '"Appellation" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Appellation" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Appellation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Appellation" appears in each.'
  ]::text[],
  array[
    'Add "Appellation" to flashcards with one benchmark reference.',
    'Pair "Appellation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Assemblage',
  'wine',
  'variety of source ingredient',
  '"Assemblage" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Assemblage" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Assemblage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Assemblage" appears in each.'
  ]::text[],
  array[
    'Add "Assemblage" to flashcards with one benchmark reference.',
    'Pair "Assemblage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Astringency',
  'wine',
  'terroir',
  '"Astringency" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Astringency" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Astringency" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Astringency" appears in each.'
  ]::text[],
  array[
    'Add "Astringency" to flashcards with one benchmark reference.',
    'Pair "Astringency" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Autolysis',
  'wine',
  'location',
  '"Autolysis" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Autolysis" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Autolysis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Autolysis" appears in each.'
  ]::text[],
  array[
    'Add "Autolysis" to flashcards with one benchmark reference.',
    'Pair "Autolysis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Barbera',
  'wine',
  'production style',
  '"Barbera" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Barbera" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Barbera" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Barbera" appears in each.'
  ]::text[],
  array[
    'Add "Barbera" to flashcards with one benchmark reference.',
    'Pair "Barbera" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Barolo',
  'wine',
  'variety of source ingredient',
  '"Barolo" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Barolo" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Barolo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Barolo" appears in each.'
  ]::text[],
  array[
    'Add "Barolo" to flashcards with one benchmark reference.',
    'Pair "Barolo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Barrique',
  'wine',
  'terroir',
  '"Barrique" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Barrique" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Barrique" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Barrique" appears in each.'
  ]::text[],
  array[
    'Add "Barrique" to flashcards with one benchmark reference.',
    'Pair "Barrique" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Biodynamic',
  'wine',
  'location',
  '"Biodynamic" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Biodynamic" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Biodynamic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Biodynamic" appears in each.'
  ]::text[],
  array[
    'Add "Biodynamic" to flashcards with one benchmark reference.',
    'Pair "Biodynamic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Blanc',
  'wine',
  'production style',
  '"Blanc" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Blanc" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Blanc" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Blanc" appears in each.'
  ]::text[],
  array[
    'Add "Blanc" to flashcards with one benchmark reference.',
    'Pair "Blanc" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bobal',
  'wine',
  'variety of source ingredient',
  '"Bobal" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Bobal" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Bobal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Bobal" appears in each.'
  ]::text[],
  array[
    'Add "Bobal" to flashcards with one benchmark reference.',
    'Pair "Bobal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Botrytis',
  'wine',
  'terroir',
  '"Botrytis" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Botrytis" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Botrytis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Botrytis" appears in each.'
  ]::text[],
  array[
    'Add "Botrytis" to flashcards with one benchmark reference.',
    'Pair "Botrytis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bourgogne',
  'wine',
  'location',
  '"Bourgogne" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Bourgogne" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Bourgogne" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Bourgogne" appears in each.'
  ]::text[],
  array[
    'Add "Bourgogne" to flashcards with one benchmark reference.',
    'Pair "Bourgogne" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brix',
  'wine',
  'production style',
  '"Brix" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Brix" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Brix" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Brix" appears in each.'
  ]::text[],
  array[
    'Add "Brix" to flashcards with one benchmark reference.',
    'Pair "Brix" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brunello',
  'wine',
  'variety of source ingredient',
  '"Brunello" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Brunello" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Brunello" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Brunello" appears in each.'
  ]::text[],
  array[
    'Add "Brunello" to flashcards with one benchmark reference.',
    'Pair "Brunello" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cabernet',
  'wine',
  'terroir',
  '"Cabernet" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Cabernet" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Cabernet" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Cabernet" appears in each.'
  ]::text[],
  array[
    'Add "Cabernet" to flashcards with one benchmark reference.',
    'Pair "Cabernet" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Carbonic',
  'wine',
  'location',
  '"Carbonic" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Carbonic" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Carbonic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Carbonic" appears in each.'
  ]::text[],
  array[
    'Add "Carbonic" to flashcards with one benchmark reference.',
    'Pair "Carbonic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Carmenere',
  'wine',
  'production style',
  '"Carmenere" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Carmenere" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Carmenere" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Carmenere" appears in each.'
  ]::text[],
  array[
    'Add "Carmenere" to flashcards with one benchmark reference.',
    'Pair "Carmenere" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Carignan',
  'wine',
  'variety of source ingredient',
  '"Carignan" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Carignan" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Carignan" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Carignan" appears in each.'
  ]::text[],
  array[
    'Add "Carignan" to flashcards with one benchmark reference.',
    'Pair "Carignan" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chablis',
  'wine',
  'terroir',
  '"Chablis" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Chablis" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Chablis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Chablis" appears in each.'
  ]::text[],
  array[
    'Add "Chablis" to flashcards with one benchmark reference.',
    'Pair "Chablis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Champagne',
  'wine',
  'location',
  '"Champagne" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Champagne" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Champagne" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Champagne" appears in each.'
  ]::text[],
  array[
    'Add "Champagne" to flashcards with one benchmark reference.',
    'Pair "Champagne" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chaptalization',
  'wine',
  'production style',
  '"Chaptalization" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Chaptalization" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Chaptalization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Chaptalization" appears in each.'
  ]::text[],
  array[
    'Add "Chaptalization" to flashcards with one benchmark reference.',
    'Pair "Chaptalization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Clone',
  'wine',
  'variety of source ingredient',
  '"Clone" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Clone" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Clone" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Clone" appears in each.'
  ]::text[],
  array[
    'Add "Clone" to flashcards with one benchmark reference.',
    'Pair "Clone" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Decanting',
  'wine',
  'terroir',
  '"Decanting" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Decanting" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Decanting" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Decanting" appears in each.'
  ]::text[],
  array[
    'Add "Decanting" to flashcards with one benchmark reference.',
    'Pair "Decanting" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dosage',
  'wine',
  'location',
  '"Dosage" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Dosage" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Dosage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Dosage" appears in each.'
  ]::text[],
  array[
    'Add "Dosage" to flashcards with one benchmark reference.',
    'Pair "Dosage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Elegance',
  'wine',
  'production style',
  '"Elegance" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Elegance" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Elegance" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Elegance" appears in each.'
  ]::text[],
  array[
    'Add "Elegance" to flashcards with one benchmark reference.',
    'Pair "Elegance" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Extraction',
  'wine',
  'variety of source ingredient',
  '"Extraction" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Extraction" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Extraction" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Extraction" appears in each.'
  ]::text[],
  array[
    'Add "Extraction" to flashcards with one benchmark reference.',
    'Pair "Extraction" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Filtration',
  'wine',
  'terroir',
  '"Filtration" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Filtration" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Filtration" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Filtration" appears in each.'
  ]::text[],
  array[
    'Add "Filtration" to flashcards with one benchmark reference.',
    'Pair "Filtration" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fining',
  'wine',
  'location',
  '"Fining" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Fining" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Fining" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Fining" appears in each.'
  ]::text[],
  array[
    'Add "Fining" to flashcards with one benchmark reference.',
    'Pair "Fining" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fronsac',
  'wine',
  'production style',
  '"Fronsac" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Fronsac" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Fronsac" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Fronsac" appears in each.'
  ]::text[],
  array[
    'Add "Fronsac" to flashcards with one benchmark reference.',
    'Pair "Fronsac" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gamay',
  'wine',
  'variety of source ingredient',
  '"Gamay" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Gamay" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Gamay" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Gamay" appears in each.'
  ]::text[],
  array[
    'Add "Gamay" to flashcards with one benchmark reference.',
    'Pair "Gamay" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Grenache',
  'wine',
  'terroir',
  '"Grenache" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Grenache" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Grenache" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Grenache" appears in each.'
  ]::text[],
  array[
    'Add "Grenache" to flashcards with one benchmark reference.',
    'Pair "Grenache" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Harvest',
  'wine',
  'location',
  '"Harvest" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Harvest" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Harvest" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Harvest" appears in each.'
  ]::text[],
  array[
    'Add "Harvest" to flashcards with one benchmark reference.',
    'Pair "Harvest" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hermitage',
  'wine',
  'production style',
  '"Hermitage" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Hermitage" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Hermitage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Hermitage" appears in each.'
  ]::text[],
  array[
    'Add "Hermitage" to flashcards with one benchmark reference.',
    'Pair "Hermitage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Jeroboam',
  'wine',
  'variety of source ingredient',
  '"Jeroboam" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Jeroboam" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Jeroboam" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Jeroboam" appears in each.'
  ]::text[],
  array[
    'Add "Jeroboam" to flashcards with one benchmark reference.',
    'Pair "Jeroboam" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Jura',
  'wine',
  'terroir',
  '"Jura" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Jura" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Jura" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Jura" appears in each.'
  ]::text[],
  array[
    'Add "Jura" to flashcards with one benchmark reference.',
    'Pair "Jura" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lambrusco',
  'wine',
  'location',
  '"Lambrusco" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Lambrusco" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Lambrusco" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Lambrusco" appears in each.'
  ]::text[],
  array[
    'Add "Lambrusco" to flashcards with one benchmark reference.',
    'Pair "Lambrusco" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Languedoc',
  'wine',
  'production style',
  '"Languedoc" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Languedoc" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Languedoc" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Languedoc" appears in each.'
  ]::text[],
  array[
    'Add "Languedoc" to flashcards with one benchmark reference.',
    'Pair "Languedoc" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lees',
  'wine',
  'variety of source ingredient',
  '"Lees" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Lees" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Lees" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Lees" appears in each.'
  ]::text[],
  array[
    'Add "Lees" to flashcards with one benchmark reference.',
    'Pair "Lees" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Maceration',
  'wine',
  'terroir',
  '"Maceration" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Maceration" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Maceration" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Maceration" appears in each.'
  ]::text[],
  array[
    'Add "Maceration" to flashcards with one benchmark reference.',
    'Pair "Maceration" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Malbec',
  'wine',
  'location',
  '"Malbec" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Malbec" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Malbec" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Malbec" appears in each.'
  ]::text[],
  array[
    'Add "Malbec" to flashcards with one benchmark reference.',
    'Pair "Malbec" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Malolactic',
  'wine',
  'production style',
  '"Malolactic" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Malolactic" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Malolactic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Malolactic" appears in each.'
  ]::text[],
  array[
    'Add "Malolactic" to flashcards with one benchmark reference.',
    'Pair "Malolactic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Marsanne',
  'wine',
  'variety of source ingredient',
  '"Marsanne" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Marsanne" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Marsanne" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Marsanne" appears in each.'
  ]::text[],
  array[
    'Add "Marsanne" to flashcards with one benchmark reference.',
    'Pair "Marsanne" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Merlot',
  'wine',
  'terroir',
  '"Merlot" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Merlot" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Merlot" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Merlot" appears in each.'
  ]::text[],
  array[
    'Add "Merlot" to flashcards with one benchmark reference.',
    'Pair "Merlot" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Minerality',
  'wine',
  'location',
  '"Minerality" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Minerality" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Minerality" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Minerality" appears in each.'
  ]::text[],
  array[
    'Add "Minerality" to flashcards with one benchmark reference.',
    'Pair "Minerality" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Monastrell',
  'wine',
  'production style',
  '"Monastrell" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Monastrell" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Monastrell" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Monastrell" appears in each.'
  ]::text[],
  array[
    'Add "Monastrell" to flashcards with one benchmark reference.',
    'Pair "Monastrell" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mourvedre',
  'wine',
  'variety of source ingredient',
  '"Mourvedre" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Mourvedre" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Mourvedre" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Mourvedre" appears in each.'
  ]::text[],
  array[
    'Add "Mourvedre" to flashcards with one benchmark reference.',
    'Pair "Mourvedre" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Muscadet',
  'wine',
  'terroir',
  '"Muscadet" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Muscadet" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Muscadet" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Muscadet" appears in each.'
  ]::text[],
  array[
    'Add "Muscadet" to flashcards with one benchmark reference.',
    'Pair "Muscadet" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Muscat',
  'wine',
  'location',
  '"Muscat" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Muscat" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Muscat" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Muscat" appears in each.'
  ]::text[],
  array[
    'Add "Muscat" to flashcards with one benchmark reference.',
    'Pair "Muscat" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Nebbiolo',
  'wine',
  'production style',
  '"Nebbiolo" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Nebbiolo" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Nebbiolo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Nebbiolo" appears in each.'
  ]::text[],
  array[
    'Add "Nebbiolo" to flashcards with one benchmark reference.',
    'Pair "Nebbiolo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Oenology',
  'wine',
  'variety of source ingredient',
  '"Oenology" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Oenology" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Oenology" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Oenology" appears in each.'
  ]::text[],
  array[
    'Add "Oenology" to flashcards with one benchmark reference.',
    'Pair "Oenology" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Oxidation',
  'wine',
  'terroir',
  '"Oxidation" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Oxidation" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Oxidation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Oxidation" appears in each.'
  ]::text[],
  array[
    'Add "Oxidation" to flashcards with one benchmark reference.',
    'Pair "Oxidation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Parellada',
  'wine',
  'location',
  '"Parellada" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Parellada" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Parellada" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Parellada" appears in each.'
  ]::text[],
  array[
    'Add "Parellada" to flashcards with one benchmark reference.',
    'Pair "Parellada" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pigeage',
  'wine',
  'production style',
  '"Pigeage" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Pigeage" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Pigeage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Pigeage" appears in each.'
  ]::text[],
  array[
    'Add "Pigeage" to flashcards with one benchmark reference.',
    'Pair "Pigeage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pinot',
  'wine',
  'variety of source ingredient',
  '"Pinot" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Pinot" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Pinot" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Pinot" appears in each.'
  ]::text[],
  array[
    'Add "Pinot" to flashcards with one benchmark reference.',
    'Pair "Pinot" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pomerol',
  'wine',
  'terroir',
  '"Pomerol" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Pomerol" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Pomerol" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Pomerol" appears in each.'
  ]::text[],
  array[
    'Add "Pomerol" to flashcards with one benchmark reference.',
    'Pair "Pomerol" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Primitivo',
  'wine',
  'location',
  '"Primitivo" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Primitivo" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Primitivo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Primitivo" appears in each.'
  ]::text[],
  array[
    'Add "Primitivo" to flashcards with one benchmark reference.',
    'Pair "Primitivo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pumpover',
  'wine',
  'production style',
  '"Pumpover" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Pumpover" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Pumpover" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Pumpover" appears in each.'
  ]::text[],
  array[
    'Add "Pumpover" to flashcards with one benchmark reference.',
    'Pair "Pumpover" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Racking',
  'wine',
  'variety of source ingredient',
  '"Racking" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Racking" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Racking" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Racking" appears in each.'
  ]::text[],
  array[
    'Add "Racking" to flashcards with one benchmark reference.',
    'Pair "Racking" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Reduction',
  'wine',
  'terroir',
  '"Reduction" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Reduction" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Reduction" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Reduction" appears in each.'
  ]::text[],
  array[
    'Add "Reduction" to flashcards with one benchmark reference.',
    'Pair "Reduction" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Reserva',
  'wine',
  'location',
  '"Reserva" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Reserva" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Reserva" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Reserva" appears in each.'
  ]::text[],
  array[
    'Add "Reserva" to flashcards with one benchmark reference.',
    'Pair "Reserva" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Riesling',
  'wine',
  'production style',
  '"Riesling" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Riesling" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Riesling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Riesling" appears in each.'
  ]::text[],
  array[
    'Add "Riesling" to flashcards with one benchmark reference.',
    'Pair "Riesling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ripasso',
  'wine',
  'variety of source ingredient',
  '"Ripasso" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Ripasso" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Ripasso" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Ripasso" appears in each.'
  ]::text[],
  array[
    'Add "Ripasso" to flashcards with one benchmark reference.',
    'Pair "Ripasso" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Rondinella',
  'wine',
  'terroir',
  '"Rondinella" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Rondinella" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Rondinella" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Rondinella" appears in each.'
  ]::text[],
  array[
    'Add "Rondinella" to flashcards with one benchmark reference.',
    'Pair "Rondinella" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sangiovese',
  'wine',
  'location',
  '"Sangiovese" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Sangiovese" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Sangiovese" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Sangiovese" appears in each.'
  ]::text[],
  array[
    'Add "Sangiovese" to flashcards with one benchmark reference.',
    'Pair "Sangiovese" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sauternes',
  'wine',
  'production style',
  '"Sauternes" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Sauternes" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Sauternes" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Sauternes" appears in each.'
  ]::text[],
  array[
    'Add "Sauternes" to flashcards with one benchmark reference.',
    'Pair "Sauternes" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sommelier',
  'wine',
  'variety of source ingredient',
  '"Sommelier" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Sommelier" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Sommelier" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Sommelier" appears in each.'
  ]::text[],
  array[
    'Add "Sommelier" to flashcards with one benchmark reference.',
    'Pair "Sommelier" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Syrah',
  'wine',
  'terroir',
  '"Syrah" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Syrah" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Syrah" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Syrah" appears in each.'
  ]::text[],
  array[
    'Add "Syrah" to flashcards with one benchmark reference.',
    'Pair "Syrah" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tannin',
  'wine',
  'location',
  '"Tannin" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Tannin" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Tannin" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Tannin" appears in each.'
  ]::text[],
  array[
    'Add "Tannin" to flashcards with one benchmark reference.',
    'Pair "Tannin" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tempranillo',
  'wine',
  'production style',
  '"Tempranillo" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Tempranillo" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Tempranillo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Tempranillo" appears in each.'
  ]::text[],
  array[
    'Add "Tempranillo" to flashcards with one benchmark reference.',
    'Pair "Tempranillo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Teroldego',
  'wine',
  'variety of source ingredient',
  '"Teroldego" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Teroldego" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Teroldego" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Teroldego" appears in each.'
  ]::text[],
  array[
    'Add "Teroldego" to flashcards with one benchmark reference.',
    'Pair "Teroldego" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Torrontes',
  'wine',
  'terroir',
  '"Torrontes" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Torrontes" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Torrontes" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Torrontes" appears in each.'
  ]::text[],
  array[
    'Add "Torrontes" to flashcards with one benchmark reference.',
    'Pair "Torrontes" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Trebbiano',
  'wine',
  'location',
  '"Trebbiano" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Trebbiano" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Trebbiano" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Trebbiano" appears in each.'
  ]::text[],
  array[
    'Add "Trebbiano" to flashcards with one benchmark reference.',
    'Pair "Trebbiano" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Typicity',
  'wine',
  'production style',
  '"Typicity" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Typicity" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Typicity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Typicity" appears in each.'
  ]::text[],
  array[
    'Add "Typicity" to flashcards with one benchmark reference.',
    'Pair "Typicity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Vendange',
  'wine',
  'variety of source ingredient',
  '"Vendange" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Vendange" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Vendange" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Vendange" appears in each.'
  ]::text[],
  array[
    'Add "Vendange" to flashcards with one benchmark reference.',
    'Pair "Vendange" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Veraison',
  'wine',
  'terroir',
  '"Veraison" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Veraison" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Veraison" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Veraison" appears in each.'
  ]::text[],
  array[
    'Add "Veraison" to flashcards with one benchmark reference.',
    'Pair "Veraison" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Verdelho',
  'wine',
  'location',
  '"Verdelho" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Verdelho" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Verdelho" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Verdelho" appears in each.'
  ]::text[],
  array[
    'Add "Verdelho" to flashcards with one benchmark reference.',
    'Pair "Verdelho" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Vermentino',
  'wine',
  'production style',
  '"Vermentino" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Vermentino" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Vermentino" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Vermentino" appears in each.'
  ]::text[],
  array[
    'Add "Vermentino" to flashcards with one benchmark reference.',
    'Pair "Vermentino" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Viognier',
  'wine',
  'variety of source ingredient',
  '"Viognier" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Viognier" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Viognier" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Viognier" appears in each.'
  ]::text[],
  array[
    'Add "Viognier" to flashcards with one benchmark reference.',
    'Pair "Viognier" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Vintage',
  'wine',
  'terroir',
  '"Vintage" is a one-word exam-style glossary term used in Wine study, focused on site and environmental expression.',
  'Apply "Vintage" in theory review and tasting notes by linking observations to site and environmental expression in Wine.',
  array[
    'Study example: define "Vintage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Vintage" appears in each.'
  ]::text[],
  array[
    'Add "Vintage" to flashcards with one benchmark reference.',
    'Pair "Vintage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Viscosity',
  'wine',
  'location',
  '"Viscosity" is a one-word exam-style glossary term used in Wine study, focused on regional context.',
  'Apply "Viscosity" in theory review and tasting notes by linking observations to regional context in Wine.',
  array[
    'Study example: define "Viscosity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Viscosity" appears in each.'
  ]::text[],
  array[
    'Add "Viscosity" to flashcards with one benchmark reference.',
    'Pair "Viscosity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Volatile',
  'wine',
  'production style',
  '"Volatile" is a one-word exam-style glossary term used in Wine study, focused on production and process.',
  'Apply "Volatile" in theory review and tasting notes by linking observations to production and process in Wine.',
  array[
    'Study example: define "Volatile" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Volatile" appears in each.'
  ]::text[],
  array[
    'Add "Volatile" to flashcards with one benchmark reference.',
    'Pair "Volatile" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Zinfandel',
  'wine',
  'variety of source ingredient',
  '"Zinfandel" is a one-word exam-style glossary term used in Wine study, focused on source ingredient identity.',
  'Apply "Zinfandel" in theory review and tasting notes by linking observations to source ingredient identity in Wine.',
  array[
    'Study example: define "Zinfandel" in one sentence before blind tasting calibration.',
    'Practice example: compare two Wine samples and explain how "Zinfandel" appears in each.'
  ]::text[],
  array[
    'Add "Zinfandel" to flashcards with one benchmark reference.',
    'Pair "Zinfandel" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.oiv.int/',
    'https://www.wsetglobal.com/'
  ]::text[],
  array[
    'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
    'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/shop/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Adjunct',
  'beer',
  'production style',
  '"Adjunct" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Adjunct" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Adjunct" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Adjunct" appears in each.'
  ]::text[],
  array[
    'Add "Adjunct" to flashcards with one benchmark reference.',
    'Pair "Adjunct" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ale',
  'beer',
  'variety of source ingredient',
  '"Ale" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Ale" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Ale" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Ale" appears in each.'
  ]::text[],
  array[
    'Add "Ale" to flashcards with one benchmark reference.',
    'Pair "Ale" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Altbier',
  'beer',
  'terroir',
  '"Altbier" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Altbier" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Altbier" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Altbier" appears in each.'
  ]::text[],
  array[
    'Add "Altbier" to flashcards with one benchmark reference.',
    'Pair "Altbier" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Amber',
  'beer',
  'location',
  '"Amber" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Amber" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Amber" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Amber" appears in each.'
  ]::text[],
  array[
    'Add "Amber" to flashcards with one benchmark reference.',
    'Pair "Amber" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Amylase',
  'beer',
  'production style',
  '"Amylase" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Amylase" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Amylase" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Amylase" appears in each.'
  ]::text[],
  array[
    'Add "Amylase" to flashcards with one benchmark reference.',
    'Pair "Amylase" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Barleywine',
  'beer',
  'variety of source ingredient',
  '"Barleywine" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Barleywine" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Barleywine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Barleywine" appears in each.'
  ]::text[],
  array[
    'Add "Barleywine" to flashcards with one benchmark reference.',
    'Pair "Barleywine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Berlinerweisse',
  'beer',
  'terroir',
  '"Berlinerweisse" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Berlinerweisse" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Berlinerweisse" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Berlinerweisse" appears in each.'
  ]::text[],
  array[
    'Add "Berlinerweisse" to flashcards with one benchmark reference.',
    'Pair "Berlinerweisse" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bitterness',
  'beer',
  'location',
  '"Bitterness" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Bitterness" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Bitterness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Bitterness" appears in each.'
  ]::text[],
  array[
    'Add "Bitterness" to flashcards with one benchmark reference.',
    'Pair "Bitterness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bock',
  'beer',
  'production style',
  '"Bock" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Bock" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Bock" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Bock" appears in each.'
  ]::text[],
  array[
    'Add "Bock" to flashcards with one benchmark reference.',
    'Pair "Bock" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brett',
  'beer',
  'variety of source ingredient',
  '"Brett" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Brett" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Brett" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Brett" appears in each.'
  ]::text[],
  array[
    'Add "Brett" to flashcards with one benchmark reference.',
    'Pair "Brett" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brut',
  'beer',
  'terroir',
  '"Brut" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Brut" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Brut" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Brut" appears in each.'
  ]::text[],
  array[
    'Add "Brut" to flashcards with one benchmark reference.',
    'Pair "Brut" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cascade',
  'beer',
  'location',
  '"Cascade" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Cascade" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Cascade" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Cascade" appears in each.'
  ]::text[],
  array[
    'Add "Cascade" to flashcards with one benchmark reference.',
    'Pair "Cascade" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cask',
  'beer',
  'production style',
  '"Cask" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Cask" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Cask" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Cask" appears in each.'
  ]::text[],
  array[
    'Add "Cask" to flashcards with one benchmark reference.',
    'Pair "Cask" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Centennial',
  'beer',
  'variety of source ingredient',
  '"Centennial" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Centennial" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Centennial" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Centennial" appears in each.'
  ]::text[],
  array[
    'Add "Centennial" to flashcards with one benchmark reference.',
    'Pair "Centennial" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chinook',
  'beer',
  'terroir',
  '"Chinook" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Chinook" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Chinook" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Chinook" appears in each.'
  ]::text[],
  array[
    'Add "Chinook" to flashcards with one benchmark reference.',
    'Pair "Chinook" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Citra',
  'beer',
  'location',
  '"Citra" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Citra" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Citra" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Citra" appears in each.'
  ]::text[],
  array[
    'Add "Citra" to flashcards with one benchmark reference.',
    'Pair "Citra" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Columbus',
  'beer',
  'production style',
  '"Columbus" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Columbus" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Columbus" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Columbus" appears in each.'
  ]::text[],
  array[
    'Add "Columbus" to flashcards with one benchmark reference.',
    'Pair "Columbus" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Conditioning',
  'beer',
  'variety of source ingredient',
  '"Conditioning" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Conditioning" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Conditioning" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Conditioning" appears in each.'
  ]::text[],
  array[
    'Add "Conditioning" to flashcards with one benchmark reference.',
    'Pair "Conditioning" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Decoction',
  'beer',
  'terroir',
  '"Decoction" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Decoction" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Decoction" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Decoction" appears in each.'
  ]::text[],
  array[
    'Add "Decoction" to flashcards with one benchmark reference.',
    'Pair "Decoction" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dextrin',
  'beer',
  'location',
  '"Dextrin" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Dextrin" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Dextrin" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Dextrin" appears in each.'
  ]::text[],
  array[
    'Add "Dextrin" to flashcards with one benchmark reference.',
    'Pair "Dextrin" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Diacetyl',
  'beer',
  'production style',
  '"Diacetyl" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Diacetyl" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Diacetyl" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Diacetyl" appears in each.'
  ]::text[],
  array[
    'Add "Diacetyl" to flashcards with one benchmark reference.',
    'Pair "Diacetyl" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dortmunder',
  'beer',
  'variety of source ingredient',
  '"Dortmunder" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Dortmunder" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Dortmunder" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Dortmunder" appears in each.'
  ]::text[],
  array[
    'Add "Dortmunder" to flashcards with one benchmark reference.',
    'Pair "Dortmunder" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dryhopping',
  'beer',
  'terroir',
  '"Dryhopping" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Dryhopping" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Dryhopping" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Dryhopping" appears in each.'
  ]::text[],
  array[
    'Add "Dryhopping" to flashcards with one benchmark reference.',
    'Pair "Dryhopping" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dunkel',
  'beer',
  'location',
  '"Dunkel" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Dunkel" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Dunkel" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Dunkel" appears in each.'
  ]::text[],
  array[
    'Add "Dunkel" to flashcards with one benchmark reference.',
    'Pair "Dunkel" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ebc',
  'beer',
  'production style',
  '"Ebc" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Ebc" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Ebc" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Ebc" appears in each.'
  ]::text[],
  array[
    'Add "Ebc" to flashcards with one benchmark reference.',
    'Pair "Ebc" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ester',
  'beer',
  'variety of source ingredient',
  '"Ester" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Ester" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Ester" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Ester" appears in each.'
  ]::text[],
  array[
    'Add "Ester" to flashcards with one benchmark reference.',
    'Pair "Ester" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fuggles',
  'beer',
  'terroir',
  '"Fuggles" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Fuggles" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Fuggles" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Fuggles" appears in each.'
  ]::text[],
  array[
    'Add "Fuggles" to flashcards with one benchmark reference.',
    'Pair "Fuggles" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gueuze',
  'beer',
  'location',
  '"Gueuze" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Gueuze" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Gueuze" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Gueuze" appears in each.'
  ]::text[],
  array[
    'Add "Gueuze" to flashcards with one benchmark reference.',
    'Pair "Gueuze" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hallertau',
  'beer',
  'production style',
  '"Hallertau" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Hallertau" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Hallertau" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Hallertau" appears in each.'
  ]::text[],
  array[
    'Add "Hallertau" to flashcards with one benchmark reference.',
    'Pair "Hallertau" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Haze',
  'beer',
  'variety of source ingredient',
  '"Haze" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Haze" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Haze" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Haze" appears in each.'
  ]::text[],
  array[
    'Add "Haze" to flashcards with one benchmark reference.',
    'Pair "Haze" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hefeweizen',
  'beer',
  'terroir',
  '"Hefeweizen" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Hefeweizen" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Hefeweizen" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Hefeweizen" appears in each.'
  ]::text[],
  array[
    'Add "Hefeweizen" to flashcards with one benchmark reference.',
    'Pair "Hefeweizen" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Helles',
  'beer',
  'location',
  '"Helles" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Helles" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Helles" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Helles" appears in each.'
  ]::text[],
  array[
    'Add "Helles" to flashcards with one benchmark reference.',
    'Pair "Helles" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hopback',
  'beer',
  'production style',
  '"Hopback" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Hopback" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Hopback" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Hopback" appears in each.'
  ]::text[],
  array[
    'Add "Hopback" to flashcards with one benchmark reference.',
    'Pair "Hopback" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hopstand',
  'beer',
  'variety of source ingredient',
  '"Hopstand" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Hopstand" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Hopstand" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Hopstand" appears in each.'
  ]::text[],
  array[
    'Add "Hopstand" to flashcards with one benchmark reference.',
    'Pair "Hopstand" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hydrometer',
  'beer',
  'terroir',
  '"Hydrometer" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Hydrometer" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Hydrometer" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Hydrometer" appears in each.'
  ]::text[],
  array[
    'Add "Hydrometer" to flashcards with one benchmark reference.',
    'Pair "Hydrometer" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ibu',
  'beer',
  'location',
  '"Ibu" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Ibu" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Ibu" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Ibu" appears in each.'
  ]::text[],
  array[
    'Add "Ibu" to flashcards with one benchmark reference.',
    'Pair "Ibu" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Infusion',
  'beer',
  'production style',
  '"Infusion" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Infusion" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Infusion" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Infusion" appears in each.'
  ]::text[],
  array[
    'Add "Infusion" to flashcards with one benchmark reference.',
    'Pair "Infusion" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Isomerization',
  'beer',
  'variety of source ingredient',
  '"Isomerization" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Isomerization" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Isomerization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Isomerization" appears in each.'
  ]::text[],
  array[
    'Add "Isomerization" to flashcards with one benchmark reference.',
    'Pair "Isomerization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kolsch',
  'beer',
  'terroir',
  '"Kolsch" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Kolsch" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Kolsch" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Kolsch" appears in each.'
  ]::text[],
  array[
    'Add "Kolsch" to flashcards with one benchmark reference.',
    'Pair "Kolsch" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Krausen',
  'beer',
  'location',
  '"Krausen" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Krausen" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Krausen" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Krausen" appears in each.'
  ]::text[],
  array[
    'Add "Krausen" to flashcards with one benchmark reference.',
    'Pair "Krausen" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lactobacillus',
  'beer',
  'production style',
  '"Lactobacillus" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Lactobacillus" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Lactobacillus" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Lactobacillus" appears in each.'
  ]::text[],
  array[
    'Add "Lactobacillus" to flashcards with one benchmark reference.',
    'Pair "Lactobacillus" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lambic',
  'beer',
  'variety of source ingredient',
  '"Lambic" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Lambic" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Lambic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Lambic" appears in each.'
  ]::text[],
  array[
    'Add "Lambic" to flashcards with one benchmark reference.',
    'Pair "Lambic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lager',
  'beer',
  'terroir',
  '"Lager" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Lager" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Lager" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Lager" appears in each.'
  ]::text[],
  array[
    'Add "Lager" to flashcards with one benchmark reference.',
    'Pair "Lager" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lauter',
  'beer',
  'location',
  '"Lauter" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Lauter" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Lauter" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Lauter" appears in each.'
  ]::text[],
  array[
    'Add "Lauter" to flashcards with one benchmark reference.',
    'Pair "Lauter" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lovibond',
  'beer',
  'production style',
  '"Lovibond" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Lovibond" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Lovibond" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Lovibond" appears in each.'
  ]::text[],
  array[
    'Add "Lovibond" to flashcards with one benchmark reference.',
    'Pair "Lovibond" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Malt',
  'beer',
  'variety of source ingredient',
  '"Malt" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Malt" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Malt" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Malt" appears in each.'
  ]::text[],
  array[
    'Add "Malt" to flashcards with one benchmark reference.',
    'Pair "Malt" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mash',
  'beer',
  'terroir',
  '"Mash" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Mash" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Mash" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Mash" appears in each.'
  ]::text[],
  array[
    'Add "Mash" to flashcards with one benchmark reference.',
    'Pair "Mash" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mosaic',
  'beer',
  'location',
  '"Mosaic" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Mosaic" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Mosaic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Mosaic" appears in each.'
  ]::text[],
  array[
    'Add "Mosaic" to flashcards with one benchmark reference.',
    'Pair "Mosaic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Flocculation',
  'beer',
  'production style',
  '"Flocculation" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Flocculation" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Flocculation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Flocculation" appears in each.'
  ]::text[],
  array[
    'Add "Flocculation" to flashcards with one benchmark reference.',
    'Pair "Flocculation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Attenuation',
  'beer',
  'variety of source ingredient',
  '"Attenuation" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Attenuation" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Attenuation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Attenuation" appears in each.'
  ]::text[],
  array[
    'Add "Attenuation" to flashcards with one benchmark reference.',
    'Pair "Attenuation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pasteurization',
  'beer',
  'terroir',
  '"Pasteurization" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Pasteurization" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Pasteurization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Pasteurization" appears in each.'
  ]::text[],
  array[
    'Add "Pasteurization" to flashcards with one benchmark reference.',
    'Pair "Pasteurization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Phenolic',
  'beer',
  'location',
  '"Phenolic" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Phenolic" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Phenolic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Phenolic" appears in each.'
  ]::text[],
  array[
    'Add "Phenolic" to flashcards with one benchmark reference.',
    'Pair "Phenolic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pilsner',
  'beer',
  'production style',
  '"Pilsner" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Pilsner" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Pilsner" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Pilsner" appears in each.'
  ]::text[],
  array[
    'Add "Pilsner" to flashcards with one benchmark reference.',
    'Pair "Pilsner" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Plato',
  'beer',
  'variety of source ingredient',
  '"Plato" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Plato" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Plato" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Plato" appears in each.'
  ]::text[],
  array[
    'Add "Plato" to flashcards with one benchmark reference.',
    'Pair "Plato" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Porter',
  'beer',
  'terroir',
  '"Porter" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Porter" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Porter" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Porter" appears in each.'
  ]::text[],
  array[
    'Add "Porter" to flashcards with one benchmark reference.',
    'Pair "Porter" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Priming',
  'beer',
  'location',
  '"Priming" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Priming" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Priming" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Priming" appears in each.'
  ]::text[],
  array[
    'Add "Priming" to flashcards with one benchmark reference.',
    'Pair "Priming" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Reinheitsgebot',
  'beer',
  'production style',
  '"Reinheitsgebot" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Reinheitsgebot" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Reinheitsgebot" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Reinheitsgebot" appears in each.'
  ]::text[],
  array[
    'Add "Reinheitsgebot" to flashcards with one benchmark reference.',
    'Pair "Reinheitsgebot" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Saaz',
  'beer',
  'variety of source ingredient',
  '"Saaz" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Saaz" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Saaz" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Saaz" appears in each.'
  ]::text[],
  array[
    'Add "Saaz" to flashcards with one benchmark reference.',
    'Pair "Saaz" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Saison',
  'beer',
  'terroir',
  '"Saison" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Saison" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Saison" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Saison" appears in each.'
  ]::text[],
  array[
    'Add "Saison" to flashcards with one benchmark reference.',
    'Pair "Saison" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sediment',
  'beer',
  'location',
  '"Sediment" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Sediment" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Sediment" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Sediment" appears in each.'
  ]::text[],
  array[
    'Add "Sediment" to flashcards with one benchmark reference.',
    'Pair "Sediment" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Simcoe',
  'beer',
  'production style',
  '"Simcoe" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Simcoe" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Simcoe" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Simcoe" appears in each.'
  ]::text[],
  array[
    'Add "Simcoe" to flashcards with one benchmark reference.',
    'Pair "Simcoe" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sparge',
  'beer',
  'variety of source ingredient',
  '"Sparge" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Sparge" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Sparge" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Sparge" appears in each.'
  ]::text[],
  array[
    'Add "Sparge" to flashcards with one benchmark reference.',
    'Pair "Sparge" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Stout',
  'beer',
  'terroir',
  '"Stout" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Stout" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Stout" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Stout" appears in each.'
  ]::text[],
  array[
    'Add "Stout" to flashcards with one benchmark reference.',
    'Pair "Stout" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tettnang',
  'beer',
  'location',
  '"Tettnang" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Tettnang" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Tettnang" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Tettnang" appears in each.'
  ]::text[],
  array[
    'Add "Tettnang" to flashcards with one benchmark reference.',
    'Pair "Tettnang" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Trappist',
  'beer',
  'production style',
  '"Trappist" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Trappist" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Trappist" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Trappist" appears in each.'
  ]::text[],
  array[
    'Add "Trappist" to flashcards with one benchmark reference.',
    'Pair "Trappist" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Trub',
  'beer',
  'variety of source ingredient',
  '"Trub" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Trub" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Trub" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Trub" appears in each.'
  ]::text[],
  array[
    'Add "Trub" to flashcards with one benchmark reference.',
    'Pair "Trub" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Whirlpool',
  'beer',
  'terroir',
  '"Whirlpool" is a one-word exam-style glossary term used in Beer study, focused on site and environmental expression.',
  'Apply "Whirlpool" in theory review and tasting notes by linking observations to site and environmental expression in Beer.',
  array[
    'Study example: define "Whirlpool" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Whirlpool" appears in each.'
  ]::text[],
  array[
    'Add "Whirlpool" to flashcards with one benchmark reference.',
    'Pair "Whirlpool" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Witbier',
  'beer',
  'location',
  '"Witbier" is a one-word exam-style glossary term used in Beer study, focused on regional context.',
  'Apply "Witbier" in theory review and tasting notes by linking observations to regional context in Beer.',
  array[
    'Study example: define "Witbier" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Witbier" appears in each.'
  ]::text[],
  array[
    'Add "Witbier" to flashcards with one benchmark reference.',
    'Pair "Witbier" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Wort',
  'beer',
  'production style',
  '"Wort" is a one-word exam-style glossary term used in Beer study, focused on production and process.',
  'Apply "Wort" in theory review and tasting notes by linking observations to production and process in Beer.',
  array[
    'Study example: define "Wort" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Wort" appears in each.'
  ]::text[],
  array[
    'Add "Wort" to flashcards with one benchmark reference.',
    'Pair "Wort" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fermentor',
  'beer',
  'variety of source ingredient',
  '"Fermentor" is a one-word exam-style glossary term used in Beer study, focused on source ingredient identity.',
  'Apply "Fermentor" in theory review and tasting notes by linking observations to source ingredient identity in Beer.',
  array[
    'Study example: define "Fermentor" in one sentence before blind tasting calibration.',
    'Practice example: compare two Beer samples and explain how "Fermentor" appears in each.'
  ]::text[],
  array[
    'Add "Fermentor" to flashcards with one benchmark reference.',
    'Pair "Fermentor" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.brewersassociation.org/',
    'https://www.bjcp.org/'
  ]::text[],
  array[
    'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
    'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.brewersassociation.org/education/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Absinthe',
  'spirits',
  'production style',
  '"Absinthe" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Absinthe" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Absinthe" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Absinthe" appears in each.'
  ]::text[],
  array[
    'Add "Absinthe" to flashcards with one benchmark reference.',
    'Pair "Absinthe" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Aguardiente',
  'spirits',
  'variety of source ingredient',
  '"Aguardiente" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Aguardiente" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Aguardiente" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Aguardiente" appears in each.'
  ]::text[],
  array[
    'Add "Aguardiente" to flashcards with one benchmark reference.',
    'Pair "Aguardiente" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Agricole',
  'spirits',
  'terroir',
  '"Agricole" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Agricole" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Agricole" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Agricole" appears in each.'
  ]::text[],
  array[
    'Add "Agricole" to flashcards with one benchmark reference.',
    'Pair "Agricole" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Alambic',
  'spirits',
  'location',
  '"Alambic" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Alambic" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Alambic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Alambic" appears in each.'
  ]::text[],
  array[
    'Add "Alambic" to flashcards with one benchmark reference.',
    'Pair "Alambic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Aquavit',
  'spirits',
  'production style',
  '"Aquavit" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Aquavit" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Aquavit" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Aquavit" appears in each.'
  ]::text[],
  array[
    'Add "Aquavit" to flashcards with one benchmark reference.',
    'Pair "Aquavit" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Arak',
  'spirits',
  'variety of source ingredient',
  '"Arak" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Arak" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Arak" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Arak" appears in each.'
  ]::text[],
  array[
    'Add "Arak" to flashcards with one benchmark reference.',
    'Pair "Arak" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Armagnac',
  'spirits',
  'terroir',
  '"Armagnac" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Armagnac" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Armagnac" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Armagnac" appears in each.'
  ]::text[],
  array[
    'Add "Armagnac" to flashcards with one benchmark reference.',
    'Pair "Armagnac" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Azeotrope',
  'spirits',
  'location',
  '"Azeotrope" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Azeotrope" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Azeotrope" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Azeotrope" appears in each.'
  ]::text[],
  array[
    'Add "Azeotrope" to flashcards with one benchmark reference.',
    'Pair "Azeotrope" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Backset',
  'spirits',
  'production style',
  '"Backset" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Backset" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Backset" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Backset" appears in each.'
  ]::text[],
  array[
    'Add "Backset" to flashcards with one benchmark reference.',
    'Pair "Backset" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Batching',
  'spirits',
  'variety of source ingredient',
  '"Batching" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Batching" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Batching" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Batching" appears in each.'
  ]::text[],
  array[
    'Add "Batching" to flashcards with one benchmark reference.',
    'Pair "Batching" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bottling',
  'spirits',
  'terroir',
  '"Bottling" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Bottling" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Bottling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Bottling" appears in each.'
  ]::text[],
  array[
    'Add "Bottling" to flashcards with one benchmark reference.',
    'Pair "Bottling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brandy',
  'spirits',
  'location',
  '"Brandy" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Brandy" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Brandy" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Brandy" appears in each.'
  ]::text[],
  array[
    'Add "Brandy" to flashcards with one benchmark reference.',
    'Pair "Brandy" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Calvados',
  'spirits',
  'production style',
  '"Calvados" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Calvados" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Calvados" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Calvados" appears in each.'
  ]::text[],
  array[
    'Add "Calvados" to flashcards with one benchmark reference.',
    'Pair "Calvados" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cachaca',
  'spirits',
  'variety of source ingredient',
  '"Cachaca" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Cachaca" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Cachaca" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Cachaca" appears in each.'
  ]::text[],
  array[
    'Add "Cachaca" to flashcards with one benchmark reference.',
    'Pair "Cachaca" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Charcoal',
  'spirits',
  'terroir',
  '"Charcoal" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Charcoal" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Charcoal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Charcoal" appears in each.'
  ]::text[],
  array[
    'Add "Charcoal" to flashcards with one benchmark reference.',
    'Pair "Charcoal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Congeners',
  'spirits',
  'location',
  '"Congeners" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Congeners" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Congeners" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Congeners" appears in each.'
  ]::text[],
  array[
    'Add "Congeners" to flashcards with one benchmark reference.',
    'Pair "Congeners" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Curacao',
  'spirits',
  'production style',
  '"Curacao" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Curacao" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Curacao" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Curacao" appears in each.'
  ]::text[],
  array[
    'Add "Curacao" to flashcards with one benchmark reference.',
    'Pair "Curacao" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Demerara',
  'spirits',
  'variety of source ingredient',
  '"Demerara" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Demerara" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Demerara" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Demerara" appears in each.'
  ]::text[],
  array[
    'Add "Demerara" to flashcards with one benchmark reference.',
    'Pair "Demerara" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Distillate',
  'spirits',
  'terroir',
  '"Distillate" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Distillate" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Distillate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Distillate" appears in each.'
  ]::text[],
  array[
    'Add "Distillate" to flashcards with one benchmark reference.',
    'Pair "Distillate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Distillation',
  'spirits',
  'location',
  '"Distillation" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Distillation" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Distillation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Distillation" appears in each.'
  ]::text[],
  array[
    'Add "Distillation" to flashcards with one benchmark reference.',
    'Pair "Distillation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dunder',
  'spirits',
  'production style',
  '"Dunder" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Dunder" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Dunder" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Dunder" appears in each.'
  ]::text[],
  array[
    'Add "Dunder" to flashcards with one benchmark reference.',
    'Pair "Dunder" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'EauDeVie',
  'spirits',
  'variety of source ingredient',
  '"EauDeVie" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "EauDeVie" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "EauDeVie" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "EauDeVie" appears in each.'
  ]::text[],
  array[
    'Add "EauDeVie" to flashcards with one benchmark reference.',
    'Pair "EauDeVie" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Evaporation',
  'spirits',
  'terroir',
  '"Evaporation" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Evaporation" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Evaporation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Evaporation" appears in each.'
  ]::text[],
  array[
    'Add "Evaporation" to flashcards with one benchmark reference.',
    'Pair "Evaporation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Feints',
  'spirits',
  'location',
  '"Feints" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Feints" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Feints" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Feints" appears in each.'
  ]::text[],
  array[
    'Add "Feints" to flashcards with one benchmark reference.',
    'Pair "Feints" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fusel',
  'spirits',
  'production style',
  '"Fusel" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Fusel" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Fusel" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Fusel" appears in each.'
  ]::text[],
  array[
    'Add "Fusel" to flashcards with one benchmark reference.',
    'Pair "Fusel" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gin',
  'spirits',
  'variety of source ingredient',
  '"Gin" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Gin" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Gin" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Gin" appears in each.'
  ]::text[],
  array[
    'Add "Gin" to flashcards with one benchmark reference.',
    'Pair "Gin" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Grappa',
  'spirits',
  'terroir',
  '"Grappa" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Grappa" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Grappa" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Grappa" appears in each.'
  ]::text[],
  array[
    'Add "Grappa" to flashcards with one benchmark reference.',
    'Pair "Grappa" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Heads',
  'spirits',
  'location',
  '"Heads" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Heads" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Heads" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Heads" appears in each.'
  ]::text[],
  array[
    'Add "Heads" to flashcards with one benchmark reference.',
    'Pair "Heads" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hearts',
  'spirits',
  'production style',
  '"Hearts" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Hearts" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Hearts" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Hearts" appears in each.'
  ]::text[],
  array[
    'Add "Hearts" to flashcards with one benchmark reference.',
    'Pair "Hearts" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Highproof',
  'spirits',
  'variety of source ingredient',
  '"Highproof" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Highproof" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Highproof" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Highproof" appears in each.'
  ]::text[],
  array[
    'Add "Highproof" to flashcards with one benchmark reference.',
    'Pair "Highproof" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Juniper',
  'spirits',
  'terroir',
  '"Juniper" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Juniper" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Juniper" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Juniper" appears in each.'
  ]::text[],
  array[
    'Add "Juniper" to flashcards with one benchmark reference.',
    'Pair "Juniper" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kirsch',
  'spirits',
  'location',
  '"Kirsch" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Kirsch" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Kirsch" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Kirsch" appears in each.'
  ]::text[],
  array[
    'Add "Kirsch" to flashcards with one benchmark reference.',
    'Pair "Kirsch" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Liqueur',
  'spirits',
  'production style',
  '"Liqueur" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Liqueur" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Liqueur" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Liqueur" appears in each.'
  ]::text[],
  array[
    'Add "Liqueur" to flashcards with one benchmark reference.',
    'Pair "Liqueur" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Macerate',
  'spirits',
  'variety of source ingredient',
  '"Macerate" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Macerate" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Macerate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Macerate" appears in each.'
  ]::text[],
  array[
    'Add "Macerate" to flashcards with one benchmark reference.',
    'Pair "Macerate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Maturation',
  'spirits',
  'terroir',
  '"Maturation" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Maturation" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Maturation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Maturation" appears in each.'
  ]::text[],
  array[
    'Add "Maturation" to flashcards with one benchmark reference.',
    'Pair "Maturation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mezcal',
  'spirits',
  'location',
  '"Mezcal" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Mezcal" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Mezcal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Mezcal" appears in each.'
  ]::text[],
  array[
    'Add "Mezcal" to flashcards with one benchmark reference.',
    'Pair "Mezcal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Moonshine',
  'spirits',
  'production style',
  '"Moonshine" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Moonshine" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Moonshine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Moonshine" appears in each.'
  ]::text[],
  array[
    'Add "Moonshine" to flashcards with one benchmark reference.',
    'Pair "Moonshine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Nosing',
  'spirits',
  'variety of source ingredient',
  '"Nosing" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Nosing" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Nosing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Nosing" appears in each.'
  ]::text[],
  array[
    'Add "Nosing" to flashcards with one benchmark reference.',
    'Pair "Nosing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Overproof',
  'spirits',
  'terroir',
  '"Overproof" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Overproof" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Overproof" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Overproof" appears in each.'
  ]::text[],
  array[
    'Add "Overproof" to flashcards with one benchmark reference.',
    'Pair "Overproof" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Peated',
  'spirits',
  'location',
  '"Peated" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Peated" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Peated" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Peated" appears in each.'
  ]::text[],
  array[
    'Add "Peated" to flashcards with one benchmark reference.',
    'Pair "Peated" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Potstill',
  'spirits',
  'production style',
  '"Potstill" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Potstill" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Potstill" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Potstill" appears in each.'
  ]::text[],
  array[
    'Add "Potstill" to flashcards with one benchmark reference.',
    'Pair "Potstill" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Proofing',
  'spirits',
  'variety of source ingredient',
  '"Proofing" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Proofing" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Proofing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Proofing" appears in each.'
  ]::text[],
  array[
    'Add "Proofing" to flashcards with one benchmark reference.',
    'Pair "Proofing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Rectification',
  'spirits',
  'terroir',
  '"Rectification" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Rectification" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Rectification" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Rectification" appears in each.'
  ]::text[],
  array[
    'Add "Rectification" to flashcards with one benchmark reference.',
    'Pair "Rectification" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Rhum',
  'spirits',
  'location',
  '"Rhum" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Rhum" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Rhum" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Rhum" appears in each.'
  ]::text[],
  array[
    'Add "Rhum" to flashcards with one benchmark reference.',
    'Pair "Rhum" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Rye',
  'spirits',
  'production style',
  '"Rye" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Rye" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Rye" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Rye" appears in each.'
  ]::text[],
  array[
    'Add "Rye" to flashcards with one benchmark reference.',
    'Pair "Rye" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Solera',
  'spirits',
  'variety of source ingredient',
  '"Solera" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Solera" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Solera" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Solera" appears in each.'
  ]::text[],
  array[
    'Add "Solera" to flashcards with one benchmark reference.',
    'Pair "Solera" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sourmash',
  'spirits',
  'terroir',
  '"Sourmash" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Sourmash" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Sourmash" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Sourmash" appears in each.'
  ]::text[],
  array[
    'Add "Sourmash" to flashcards with one benchmark reference.',
    'Pair "Sourmash" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Stillage',
  'spirits',
  'location',
  '"Stillage" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Stillage" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Stillage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Stillage" appears in each.'
  ]::text[],
  array[
    'Add "Stillage" to flashcards with one benchmark reference.',
    'Pair "Stillage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Stripping',
  'spirits',
  'production style',
  '"Stripping" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Stripping" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Stripping" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Stripping" appears in each.'
  ]::text[],
  array[
    'Add "Stripping" to flashcards with one benchmark reference.',
    'Pair "Stripping" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sugarcane',
  'spirits',
  'variety of source ingredient',
  '"Sugarcane" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Sugarcane" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Sugarcane" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Sugarcane" appears in each.'
  ]::text[],
  array[
    'Add "Sugarcane" to flashcards with one benchmark reference.',
    'Pair "Sugarcane" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tails',
  'spirits',
  'terroir',
  '"Tails" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Tails" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Tails" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Tails" appears in each.'
  ]::text[],
  array[
    'Add "Tails" to flashcards with one benchmark reference.',
    'Pair "Tails" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tequila',
  'spirits',
  'location',
  '"Tequila" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Tequila" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Tequila" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Tequila" appears in each.'
  ]::text[],
  array[
    'Add "Tequila" to flashcards with one benchmark reference.',
    'Pair "Tequila" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tincture',
  'spirits',
  'production style',
  '"Tincture" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Tincture" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Tincture" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Tincture" appears in each.'
  ]::text[],
  array[
    'Add "Tincture" to flashcards with one benchmark reference.',
    'Pair "Tincture" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Vermouth',
  'spirits',
  'variety of source ingredient',
  '"Vermouth" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Vermouth" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Vermouth" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Vermouth" appears in each.'
  ]::text[],
  array[
    'Add "Vermouth" to flashcards with one benchmark reference.',
    'Pair "Vermouth" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Washback',
  'spirits',
  'terroir',
  '"Washback" is a one-word exam-style glossary term used in Spirits study, focused on site and environmental expression.',
  'Apply "Washback" in theory review and tasting notes by linking observations to site and environmental expression in Spirits.',
  array[
    'Study example: define "Washback" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Washback" appears in each.'
  ]::text[],
  array[
    'Add "Washback" to flashcards with one benchmark reference.',
    'Pair "Washback" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Whiskey',
  'spirits',
  'location',
  '"Whiskey" is a one-word exam-style glossary term used in Spirits study, focused on regional context.',
  'Apply "Whiskey" in theory review and tasting notes by linking observations to regional context in Spirits.',
  array[
    'Study example: define "Whiskey" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Whiskey" appears in each.'
  ]::text[],
  array[
    'Add "Whiskey" to flashcards with one benchmark reference.',
    'Pair "Whiskey" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Wormtub',
  'spirits',
  'production style',
  '"Wormtub" is a one-word exam-style glossary term used in Spirits study, focused on production and process.',
  'Apply "Wormtub" in theory review and tasting notes by linking observations to production and process in Spirits.',
  array[
    'Study example: define "Wormtub" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Wormtub" appears in each.'
  ]::text[],
  array[
    'Add "Wormtub" to flashcards with one benchmark reference.',
    'Pair "Wormtub" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Newmake',
  'spirits',
  'variety of source ingredient',
  '"Newmake" is a one-word exam-style glossary term used in Spirits study, focused on source ingredient identity.',
  'Apply "Newmake" in theory review and tasting notes by linking observations to source ingredient identity in Spirits.',
  array[
    'Study example: define "Newmake" in one sentence before blind tasting calibration.',
    'Practice example: compare two Spirits samples and explain how "Newmake" appears in each.'
  ]::text[],
  array[
    'Add "Newmake" to flashcards with one benchmark reference.',
    'Pair "Newmake" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.distilledspirits.org/',
    'https://www.ttb.gov/spirits'
  ]::text[],
  array[
    'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
    'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Arabica',
  'coffee',
  'production style',
  '"Arabica" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Arabica" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Arabica" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Arabica" appears in each.'
  ]::text[],
  array[
    'Add "Arabica" to flashcards with one benchmark reference.',
    'Pair "Arabica" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Robusta',
  'coffee',
  'variety of source ingredient',
  '"Robusta" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Robusta" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Robusta" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Robusta" appears in each.'
  ]::text[],
  array[
    'Add "Robusta" to flashcards with one benchmark reference.',
    'Pair "Robusta" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Typica',
  'coffee',
  'terroir',
  '"Typica" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Typica" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Typica" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Typica" appears in each.'
  ]::text[],
  array[
    'Add "Typica" to flashcards with one benchmark reference.',
    'Pair "Typica" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Caturra',
  'coffee',
  'location',
  '"Caturra" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Caturra" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Caturra" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Caturra" appears in each.'
  ]::text[],
  array[
    'Add "Caturra" to flashcards with one benchmark reference.',
    'Pair "Caturra" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Catuai',
  'coffee',
  'production style',
  '"Catuai" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Catuai" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Catuai" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Catuai" appears in each.'
  ]::text[],
  array[
    'Add "Catuai" to flashcards with one benchmark reference.',
    'Pair "Catuai" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pacamara',
  'coffee',
  'variety of source ingredient',
  '"Pacamara" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Pacamara" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Pacamara" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Pacamara" appears in each.'
  ]::text[],
  array[
    'Add "Pacamara" to flashcards with one benchmark reference.',
    'Pair "Pacamara" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Geisha',
  'coffee',
  'terroir',
  '"Geisha" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Geisha" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Geisha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Geisha" appears in each.'
  ]::text[],
  array[
    'Add "Geisha" to flashcards with one benchmark reference.',
    'Pair "Geisha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Liberica',
  'coffee',
  'location',
  '"Liberica" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Liberica" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Liberica" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Liberica" appears in each.'
  ]::text[],
  array[
    'Add "Liberica" to flashcards with one benchmark reference.',
    'Pair "Liberica" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Excelsa',
  'coffee',
  'production style',
  '"Excelsa" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Excelsa" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Excelsa" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Excelsa" appears in each.'
  ]::text[],
  array[
    'Add "Excelsa" to flashcards with one benchmark reference.',
    'Pair "Excelsa" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Catimor',
  'coffee',
  'variety of source ingredient',
  '"Catimor" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Catimor" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Catimor" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Catimor" appears in each.'
  ]::text[],
  array[
    'Add "Catimor" to flashcards with one benchmark reference.',
    'Pair "Catimor" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Maragogipe',
  'coffee',
  'terroir',
  '"Maragogipe" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Maragogipe" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Maragogipe" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Maragogipe" appears in each.'
  ]::text[],
  array[
    'Add "Maragogipe" to flashcards with one benchmark reference.',
    'Pair "Maragogipe" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'MundoNovo',
  'coffee',
  'location',
  '"MundoNovo" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "MundoNovo" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "MundoNovo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "MundoNovo" appears in each.'
  ]::text[],
  array[
    'Add "MundoNovo" to flashcards with one benchmark reference.',
    'Pair "MundoNovo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bourbon',
  'coffee',
  'production style',
  '"Bourbon" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Bourbon" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Bourbon" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Bourbon" appears in each.'
  ]::text[],
  array[
    'Add "Bourbon" to flashcards with one benchmark reference.',
    'Pair "Bourbon" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Heirloom',
  'coffee',
  'variety of source ingredient',
  '"Heirloom" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Heirloom" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Heirloom" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Heirloom" appears in each.'
  ]::text[],
  array[
    'Add "Heirloom" to flashcards with one benchmark reference.',
    'Pair "Heirloom" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Natural',
  'coffee',
  'terroir',
  '"Natural" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Natural" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Natural" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Natural" appears in each.'
  ]::text[],
  array[
    'Add "Natural" to flashcards with one benchmark reference.',
    'Pair "Natural" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Washed',
  'coffee',
  'location',
  '"Washed" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Washed" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Washed" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Washed" appears in each.'
  ]::text[],
  array[
    'Add "Washed" to flashcards with one benchmark reference.',
    'Pair "Washed" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Honey',
  'coffee',
  'production style',
  '"Honey" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Honey" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Honey" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Honey" appears in each.'
  ]::text[],
  array[
    'Add "Honey" to flashcards with one benchmark reference.',
    'Pair "Honey" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Anaerobic',
  'coffee',
  'variety of source ingredient',
  '"Anaerobic" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Anaerobic" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Anaerobic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Anaerobic" appears in each.'
  ]::text[],
  array[
    'Add "Anaerobic" to flashcards with one benchmark reference.',
    'Pair "Anaerobic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pulping',
  'coffee',
  'terroir',
  '"Pulping" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Pulping" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Pulping" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Pulping" appears in each.'
  ]::text[],
  array[
    'Add "Pulping" to flashcards with one benchmark reference.',
    'Pair "Pulping" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mucilage',
  'coffee',
  'location',
  '"Mucilage" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Mucilage" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Mucilage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Mucilage" appears in each.'
  ]::text[],
  array[
    'Add "Mucilage" to flashcards with one benchmark reference.',
    'Pair "Mucilage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Demucilage',
  'coffee',
  'production style',
  '"Demucilage" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Demucilage" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Demucilage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Demucilage" appears in each.'
  ]::text[],
  array[
    'Add "Demucilage" to flashcards with one benchmark reference.',
    'Pair "Demucilage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Drymill',
  'coffee',
  'variety of source ingredient',
  '"Drymill" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Drymill" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Drymill" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Drymill" appears in each.'
  ]::text[],
  array[
    'Add "Drymill" to flashcards with one benchmark reference.',
    'Pair "Drymill" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Wetmill',
  'coffee',
  'terroir',
  '"Wetmill" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Wetmill" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Wetmill" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Wetmill" appears in each.'
  ]::text[],
  array[
    'Add "Wetmill" to flashcards with one benchmark reference.',
    'Pair "Wetmill" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Defect',
  'coffee',
  'location',
  '"Defect" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Defect" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Defect" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Defect" appears in each.'
  ]::text[],
  array[
    'Add "Defect" to flashcards with one benchmark reference.',
    'Pair "Defect" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Screening',
  'coffee',
  'production style',
  '"Screening" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Screening" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Screening" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Screening" appears in each.'
  ]::text[],
  array[
    'Add "Screening" to flashcards with one benchmark reference.',
    'Pair "Screening" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Roastery',
  'coffee',
  'variety of source ingredient',
  '"Roastery" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Roastery" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Roastery" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Roastery" appears in each.'
  ]::text[],
  array[
    'Add "Roastery" to flashcards with one benchmark reference.',
    'Pair "Roastery" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Roast',
  'coffee',
  'terroir',
  '"Roast" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Roast" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Roast" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Roast" appears in each.'
  ]::text[],
  array[
    'Add "Roast" to flashcards with one benchmark reference.',
    'Pair "Roast" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Maillard',
  'coffee',
  'location',
  '"Maillard" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Maillard" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Maillard" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Maillard" appears in each.'
  ]::text[],
  array[
    'Add "Maillard" to flashcards with one benchmark reference.',
    'Pair "Maillard" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Caramelization',
  'coffee',
  'production style',
  '"Caramelization" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Caramelization" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Caramelization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Caramelization" appears in each.'
  ]::text[],
  array[
    'Add "Caramelization" to flashcards with one benchmark reference.',
    'Pair "Caramelization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Development',
  'coffee',
  'variety of source ingredient',
  '"Development" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Development" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Development" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Development" appears in each.'
  ]::text[],
  array[
    'Add "Development" to flashcards with one benchmark reference.',
    'Pair "Development" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Degassing',
  'coffee',
  'terroir',
  '"Degassing" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Degassing" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Degassing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Degassing" appears in each.'
  ]::text[],
  array[
    'Add "Degassing" to flashcards with one benchmark reference.',
    'Pair "Degassing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Refractometer',
  'coffee',
  'location',
  '"Refractometer" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Refractometer" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Refractometer" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Refractometer" appears in each.'
  ]::text[],
  array[
    'Add "Refractometer" to flashcards with one benchmark reference.',
    'Pair "Refractometer" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dose',
  'coffee',
  'production style',
  '"Dose" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Dose" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Dose" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Dose" appears in each.'
  ]::text[],
  array[
    'Add "Dose" to flashcards with one benchmark reference.',
    'Pair "Dose" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Yield',
  'coffee',
  'variety of source ingredient',
  '"Yield" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Yield" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Yield" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Yield" appears in each.'
  ]::text[],
  array[
    'Add "Yield" to flashcards with one benchmark reference.',
    'Pair "Yield" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Espresso',
  'coffee',
  'terroir',
  '"Espresso" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Espresso" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Espresso" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Espresso" appears in each.'
  ]::text[],
  array[
    'Add "Espresso" to flashcards with one benchmark reference.',
    'Pair "Espresso" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ristretto',
  'coffee',
  'location',
  '"Ristretto" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Ristretto" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Ristretto" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Ristretto" appears in each.'
  ]::text[],
  array[
    'Add "Ristretto" to flashcards with one benchmark reference.',
    'Pair "Ristretto" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lungo',
  'coffee',
  'production style',
  '"Lungo" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Lungo" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Lungo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Lungo" appears in each.'
  ]::text[],
  array[
    'Add "Lungo" to flashcards with one benchmark reference.',
    'Pair "Lungo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Americano',
  'coffee',
  'variety of source ingredient',
  '"Americano" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Americano" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Americano" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Americano" appears in each.'
  ]::text[],
  array[
    'Add "Americano" to flashcards with one benchmark reference.',
    'Pair "Americano" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cappuccino',
  'coffee',
  'terroir',
  '"Cappuccino" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Cappuccino" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Cappuccino" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Cappuccino" appears in each.'
  ]::text[],
  array[
    'Add "Cappuccino" to flashcards with one benchmark reference.',
    'Pair "Cappuccino" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Macchiato',
  'coffee',
  'location',
  '"Macchiato" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Macchiato" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Macchiato" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Macchiato" appears in each.'
  ]::text[],
  array[
    'Add "Macchiato" to flashcards with one benchmark reference.',
    'Pair "Macchiato" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cortado',
  'coffee',
  'production style',
  '"Cortado" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Cortado" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Cortado" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Cortado" appears in each.'
  ]::text[],
  array[
    'Add "Cortado" to flashcards with one benchmark reference.',
    'Pair "Cortado" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dripper',
  'coffee',
  'variety of source ingredient',
  '"Dripper" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Dripper" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Dripper" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Dripper" appears in each.'
  ]::text[],
  array[
    'Add "Dripper" to flashcards with one benchmark reference.',
    'Pair "Dripper" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chemex',
  'coffee',
  'terroir',
  '"Chemex" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Chemex" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Chemex" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Chemex" appears in each.'
  ]::text[],
  array[
    'Add "Chemex" to flashcards with one benchmark reference.',
    'Pair "Chemex" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kalita',
  'coffee',
  'location',
  '"Kalita" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Kalita" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Kalita" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Kalita" appears in each.'
  ]::text[],
  array[
    'Add "Kalita" to flashcards with one benchmark reference.',
    'Pair "Kalita" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Aeropress',
  'coffee',
  'production style',
  '"Aeropress" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Aeropress" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Aeropress" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Aeropress" appears in each.'
  ]::text[],
  array[
    'Add "Aeropress" to flashcards with one benchmark reference.',
    'Pair "Aeropress" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Frenchpress',
  'coffee',
  'variety of source ingredient',
  '"Frenchpress" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Frenchpress" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Frenchpress" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Frenchpress" appears in each.'
  ]::text[],
  array[
    'Add "Frenchpress" to flashcards with one benchmark reference.',
    'Pair "Frenchpress" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Siphon',
  'coffee',
  'terroir',
  '"Siphon" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Siphon" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Siphon" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Siphon" appears in each.'
  ]::text[],
  array[
    'Add "Siphon" to flashcards with one benchmark reference.',
    'Pair "Siphon" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Turkish',
  'coffee',
  'location',
  '"Turkish" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Turkish" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Turkish" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Turkish" appears in each.'
  ]::text[],
  array[
    'Add "Turkish" to flashcards with one benchmark reference.',
    'Pair "Turkish" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Portafilter',
  'coffee',
  'production style',
  '"Portafilter" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Portafilter" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Portafilter" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Portafilter" appears in each.'
  ]::text[],
  array[
    'Add "Portafilter" to flashcards with one benchmark reference.',
    'Pair "Portafilter" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tamper',
  'coffee',
  'variety of source ingredient',
  '"Tamper" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Tamper" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Tamper" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Tamper" appears in each.'
  ]::text[],
  array[
    'Add "Tamper" to flashcards with one benchmark reference.',
    'Pair "Tamper" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Grouphead',
  'coffee',
  'terroir',
  '"Grouphead" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Grouphead" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Grouphead" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Grouphead" appears in each.'
  ]::text[],
  array[
    'Add "Grouphead" to flashcards with one benchmark reference.',
    'Pair "Grouphead" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Backflush',
  'coffee',
  'location',
  '"Backflush" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Backflush" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Backflush" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Backflush" appears in each.'
  ]::text[],
  array[
    'Add "Backflush" to flashcards with one benchmark reference.',
    'Pair "Backflush" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Channeling',
  'coffee',
  'production style',
  '"Channeling" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Channeling" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Channeling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Channeling" appears in each.'
  ]::text[],
  array[
    'Add "Channeling" to flashcards with one benchmark reference.',
    'Pair "Channeling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Crema',
  'coffee',
  'variety of source ingredient',
  '"Crema" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Crema" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Crema" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Crema" appears in each.'
  ]::text[],
  array[
    'Add "Crema" to flashcards with one benchmark reference.',
    'Pair "Crema" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Aftertaste',
  'coffee',
  'terroir',
  '"Aftertaste" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Aftertaste" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Aftertaste" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Aftertaste" appears in each.'
  ]::text[],
  array[
    'Add "Aftertaste" to flashcards with one benchmark reference.',
    'Pair "Aftertaste" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sweetness',
  'coffee',
  'location',
  '"Sweetness" is a one-word exam-style glossary term used in Coffee study, focused on regional context.',
  'Apply "Sweetness" in theory review and tasting notes by linking observations to regional context in Coffee.',
  array[
    'Study example: define "Sweetness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Sweetness" appears in each.'
  ]::text[],
  array[
    'Add "Sweetness" to flashcards with one benchmark reference.',
    'Pair "Sweetness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fragrance',
  'coffee',
  'production style',
  '"Fragrance" is a one-word exam-style glossary term used in Coffee study, focused on production and process.',
  'Apply "Fragrance" in theory review and tasting notes by linking observations to production and process in Coffee.',
  array[
    'Study example: define "Fragrance" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Fragrance" appears in each.'
  ]::text[],
  array[
    'Add "Fragrance" to flashcards with one benchmark reference.',
    'Pair "Fragrance" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cupping',
  'coffee',
  'variety of source ingredient',
  '"Cupping" is a one-word exam-style glossary term used in Coffee study, focused on source ingredient identity.',
  'Apply "Cupping" in theory review and tasting notes by linking observations to source ingredient identity in Coffee.',
  array[
    'Study example: define "Cupping" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Cupping" appears in each.'
  ]::text[],
  array[
    'Add "Cupping" to flashcards with one benchmark reference.',
    'Pair "Cupping" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cupper',
  'coffee',
  'terroir',
  '"Cupper" is a one-word exam-style glossary term used in Coffee study, focused on site and environmental expression.',
  'Apply "Cupper" in theory review and tasting notes by linking observations to site and environmental expression in Coffee.',
  array[
    'Study example: define "Cupper" in one sentence before blind tasting calibration.',
    'Practice example: compare two Coffee samples and explain how "Cupper" appears in each.'
  ]::text[],
  array[
    'Add "Cupper" to flashcards with one benchmark reference.',
    'Pair "Cupper" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://sca.coffee/',
    'https://worldcoffeeresearch.org/'
  ]::text[],
  array[
    'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
    'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://education.sca.coffee/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Assam',
  'tea',
  'production style',
  '"Assam" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Assam" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Assam" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Assam" appears in each.'
  ]::text[],
  array[
    'Add "Assam" to flashcards with one benchmark reference.',
    'Pair "Assam" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Darjeeling',
  'tea',
  'variety of source ingredient',
  '"Darjeeling" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Darjeeling" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Darjeeling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Darjeeling" appears in each.'
  ]::text[],
  array[
    'Add "Darjeeling" to flashcards with one benchmark reference.',
    'Pair "Darjeeling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ceylon',
  'tea',
  'terroir',
  '"Ceylon" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Ceylon" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Ceylon" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Ceylon" appears in each.'
  ]::text[],
  array[
    'Add "Ceylon" to flashcards with one benchmark reference.',
    'Pair "Ceylon" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Nilgiri',
  'tea',
  'location',
  '"Nilgiri" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Nilgiri" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Nilgiri" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Nilgiri" appears in each.'
  ]::text[],
  array[
    'Add "Nilgiri" to flashcards with one benchmark reference.',
    'Pair "Nilgiri" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Yunnan',
  'tea',
  'production style',
  '"Yunnan" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Yunnan" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Yunnan" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Yunnan" appears in each.'
  ]::text[],
  array[
    'Add "Yunnan" to flashcards with one benchmark reference.',
    'Pair "Yunnan" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Anji',
  'tea',
  'variety of source ingredient',
  '"Anji" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Anji" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Anji" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Anji" appears in each.'
  ]::text[],
  array[
    'Add "Anji" to flashcards with one benchmark reference.',
    'Pair "Anji" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Longjing',
  'tea',
  'terroir',
  '"Longjing" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Longjing" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Longjing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Longjing" appears in each.'
  ]::text[],
  array[
    'Add "Longjing" to flashcards with one benchmark reference.',
    'Pair "Longjing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Biluochun',
  'tea',
  'location',
  '"Biluochun" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Biluochun" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Biluochun" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Biluochun" appears in each.'
  ]::text[],
  array[
    'Add "Biluochun" to flashcards with one benchmark reference.',
    'Pair "Biluochun" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tieguanyin',
  'tea',
  'production style',
  '"Tieguanyin" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Tieguanyin" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Tieguanyin" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Tieguanyin" appears in each.'
  ]::text[],
  array[
    'Add "Tieguanyin" to flashcards with one benchmark reference.',
    'Pair "Tieguanyin" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dahongpao',
  'tea',
  'variety of source ingredient',
  '"Dahongpao" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Dahongpao" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Dahongpao" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Dahongpao" appears in each.'
  ]::text[],
  array[
    'Add "Dahongpao" to flashcards with one benchmark reference.',
    'Pair "Dahongpao" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Wuyi',
  'tea',
  'terroir',
  '"Wuyi" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Wuyi" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Wuyi" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Wuyi" appears in each.'
  ]::text[],
  array[
    'Add "Wuyi" to flashcards with one benchmark reference.',
    'Pair "Wuyi" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lapsang',
  'tea',
  'location',
  '"Lapsang" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Lapsang" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Lapsang" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Lapsang" appears in each.'
  ]::text[],
  array[
    'Add "Lapsang" to flashcards with one benchmark reference.',
    'Pair "Lapsang" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Keemun',
  'tea',
  'production style',
  '"Keemun" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Keemun" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Keemun" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Keemun" appears in each.'
  ]::text[],
  array[
    'Add "Keemun" to flashcards with one benchmark reference.',
    'Pair "Keemun" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dianhong',
  'tea',
  'variety of source ingredient',
  '"Dianhong" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Dianhong" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Dianhong" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Dianhong" appears in each.'
  ]::text[],
  array[
    'Add "Dianhong" to flashcards with one benchmark reference.',
    'Pair "Dianhong" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sencha',
  'tea',
  'terroir',
  '"Sencha" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Sencha" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Sencha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Sencha" appears in each.'
  ]::text[],
  array[
    'Add "Sencha" to flashcards with one benchmark reference.',
    'Pair "Sencha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gyokuro',
  'tea',
  'location',
  '"Gyokuro" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Gyokuro" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Gyokuro" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Gyokuro" appears in each.'
  ]::text[],
  array[
    'Add "Gyokuro" to flashcards with one benchmark reference.',
    'Pair "Gyokuro" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kabusecha',
  'tea',
  'production style',
  '"Kabusecha" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Kabusecha" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Kabusecha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Kabusecha" appears in each.'
  ]::text[],
  array[
    'Add "Kabusecha" to flashcards with one benchmark reference.',
    'Pair "Kabusecha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bancha',
  'tea',
  'variety of source ingredient',
  '"Bancha" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Bancha" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Bancha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Bancha" appears in each.'
  ]::text[],
  array[
    'Add "Bancha" to flashcards with one benchmark reference.',
    'Pair "Bancha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hojicha',
  'tea',
  'terroir',
  '"Hojicha" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Hojicha" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Hojicha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Hojicha" appears in each.'
  ]::text[],
  array[
    'Add "Hojicha" to flashcards with one benchmark reference.',
    'Pair "Hojicha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kukicha',
  'tea',
  'location',
  '"Kukicha" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Kukicha" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Kukicha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Kukicha" appears in each.'
  ]::text[],
  array[
    'Add "Kukicha" to flashcards with one benchmark reference.',
    'Pair "Kukicha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Genmaicha',
  'tea',
  'production style',
  '"Genmaicha" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Genmaicha" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Genmaicha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Genmaicha" appears in each.'
  ]::text[],
  array[
    'Add "Genmaicha" to flashcards with one benchmark reference.',
    'Pair "Genmaicha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Matcha',
  'tea',
  'variety of source ingredient',
  '"Matcha" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Matcha" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Matcha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Matcha" appears in each.'
  ]::text[],
  array[
    'Add "Matcha" to flashcards with one benchmark reference.',
    'Pair "Matcha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tencha',
  'tea',
  'terroir',
  '"Tencha" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Tencha" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Tencha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Tencha" appears in each.'
  ]::text[],
  array[
    'Add "Tencha" to flashcards with one benchmark reference.',
    'Pair "Tencha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tamaryokucha',
  'tea',
  'location',
  '"Tamaryokucha" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Tamaryokucha" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Tamaryokucha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Tamaryokucha" appears in each.'
  ]::text[],
  array[
    'Add "Tamaryokucha" to flashcards with one benchmark reference.',
    'Pair "Tamaryokucha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Shincha',
  'tea',
  'production style',
  '"Shincha" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Shincha" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Shincha" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Shincha" appears in each.'
  ]::text[],
  array[
    'Add "Shincha" to flashcards with one benchmark reference.',
    'Pair "Shincha" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Puerh',
  'tea',
  'variety of source ingredient',
  '"Puerh" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Puerh" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Puerh" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Puerh" appears in each.'
  ]::text[],
  array[
    'Add "Puerh" to flashcards with one benchmark reference.',
    'Pair "Puerh" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sheng',
  'tea',
  'terroir',
  '"Sheng" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Sheng" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Sheng" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Sheng" appears in each.'
  ]::text[],
  array[
    'Add "Sheng" to flashcards with one benchmark reference.',
    'Pair "Sheng" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Shou',
  'tea',
  'location',
  '"Shou" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Shou" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Shou" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Shou" appears in each.'
  ]::text[],
  array[
    'Add "Shou" to flashcards with one benchmark reference.',
    'Pair "Shou" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gaba',
  'tea',
  'production style',
  '"Gaba" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Gaba" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Gaba" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Gaba" appears in each.'
  ]::text[],
  array[
    'Add "Gaba" to flashcards with one benchmark reference.',
    'Pair "Gaba" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Baozhong',
  'tea',
  'variety of source ingredient',
  '"Baozhong" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Baozhong" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Baozhong" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Baozhong" appears in each.'
  ]::text[],
  array[
    'Add "Baozhong" to flashcards with one benchmark reference.',
    'Pair "Baozhong" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Jasmine',
  'tea',
  'terroir',
  '"Jasmine" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Jasmine" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Jasmine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Jasmine" appears in each.'
  ]::text[],
  array[
    'Add "Jasmine" to flashcards with one benchmark reference.',
    'Pair "Jasmine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Osmanthus',
  'tea',
  'location',
  '"Osmanthus" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Osmanthus" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Osmanthus" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Osmanthus" appears in each.'
  ]::text[],
  array[
    'Add "Osmanthus" to flashcards with one benchmark reference.',
    'Pair "Osmanthus" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Baihao',
  'tea',
  'production style',
  '"Baihao" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Baihao" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Baihao" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Baihao" appears in each.'
  ]::text[],
  array[
    'Add "Baihao" to flashcards with one benchmark reference.',
    'Pair "Baihao" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Baimudan',
  'tea',
  'variety of source ingredient',
  '"Baimudan" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Baimudan" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Baimudan" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Baimudan" appears in each.'
  ]::text[],
  array[
    'Add "Baimudan" to flashcards with one benchmark reference.',
    'Pair "Baimudan" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Shoumei',
  'tea',
  'terroir',
  '"Shoumei" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Shoumei" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Shoumei" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Shoumei" appears in each.'
  ]::text[],
  array[
    'Add "Shoumei" to flashcards with one benchmark reference.',
    'Pair "Shoumei" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Yabukita',
  'tea',
  'location',
  '"Yabukita" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Yabukita" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Yabukita" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Yabukita" appears in each.'
  ]::text[],
  array[
    'Add "Yabukita" to flashcards with one benchmark reference.',
    'Pair "Yabukita" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Saemidori',
  'tea',
  'production style',
  '"Saemidori" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Saemidori" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Saemidori" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Saemidori" appears in each.'
  ]::text[],
  array[
    'Add "Saemidori" to flashcards with one benchmark reference.',
    'Pair "Saemidori" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Benifuki',
  'tea',
  'variety of source ingredient',
  '"Benifuki" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Benifuki" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Benifuki" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Benifuki" appears in each.'
  ]::text[],
  array[
    'Add "Benifuki" to flashcards with one benchmark reference.',
    'Pair "Benifuki" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cultivar',
  'tea',
  'terroir',
  '"Cultivar" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Cultivar" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Cultivar" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Cultivar" appears in each.'
  ]::text[],
  array[
    'Add "Cultivar" to flashcards with one benchmark reference.',
    'Pair "Cultivar" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Plucking',
  'tea',
  'location',
  '"Plucking" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Plucking" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Plucking" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Plucking" appears in each.'
  ]::text[],
  array[
    'Add "Plucking" to flashcards with one benchmark reference.',
    'Pair "Plucking" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Withering',
  'tea',
  'production style',
  '"Withering" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Withering" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Withering" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Withering" appears in each.'
  ]::text[],
  array[
    'Add "Withering" to flashcards with one benchmark reference.',
    'Pair "Withering" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Rolling',
  'tea',
  'variety of source ingredient',
  '"Rolling" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Rolling" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Rolling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Rolling" appears in each.'
  ]::text[],
  array[
    'Add "Rolling" to flashcards with one benchmark reference.',
    'Pair "Rolling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Oxidative',
  'tea',
  'terroir',
  '"Oxidative" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Oxidative" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Oxidative" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Oxidative" appears in each.'
  ]::text[],
  array[
    'Add "Oxidative" to flashcards with one benchmark reference.',
    'Pair "Oxidative" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Firing',
  'tea',
  'location',
  '"Firing" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Firing" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Firing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Firing" appears in each.'
  ]::text[],
  array[
    'Add "Firing" to flashcards with one benchmark reference.',
    'Pair "Firing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Steaming',
  'tea',
  'production style',
  '"Steaming" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Steaming" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Steaming" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Steaming" appears in each.'
  ]::text[],
  array[
    'Add "Steaming" to flashcards with one benchmark reference.',
    'Pair "Steaming" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Panfiring',
  'tea',
  'variety of source ingredient',
  '"Panfiring" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Panfiring" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Panfiring" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Panfiring" appears in each.'
  ]::text[],
  array[
    'Add "Panfiring" to flashcards with one benchmark reference.',
    'Pair "Panfiring" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Roasting',
  'tea',
  'terroir',
  '"Roasting" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Roasting" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Roasting" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Roasting" appears in each.'
  ]::text[],
  array[
    'Add "Roasting" to flashcards with one benchmark reference.',
    'Pair "Roasting" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Compression',
  'tea',
  'location',
  '"Compression" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Compression" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Compression" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Compression" appears in each.'
  ]::text[],
  array[
    'Add "Compression" to flashcards with one benchmark reference.',
    'Pair "Compression" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Steeping',
  'tea',
  'production style',
  '"Steeping" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Steeping" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Steeping" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Steeping" appears in each.'
  ]::text[],
  array[
    'Add "Steeping" to flashcards with one benchmark reference.',
    'Pair "Steeping" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Astringent',
  'tea',
  'variety of source ingredient',
  '"Astringent" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Astringent" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Astringent" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Astringent" appears in each.'
  ]::text[],
  array[
    'Add "Astringent" to flashcards with one benchmark reference.',
    'Pair "Astringent" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Briskness',
  'tea',
  'terroir',
  '"Briskness" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Briskness" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Briskness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Briskness" appears in each.'
  ]::text[],
  array[
    'Add "Briskness" to flashcards with one benchmark reference.',
    'Pair "Briskness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Liquor',
  'tea',
  'location',
  '"Liquor" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Liquor" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Liquor" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Liquor" appears in each.'
  ]::text[],
  array[
    'Add "Liquor" to flashcards with one benchmark reference.',
    'Pair "Liquor" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tippy',
  'tea',
  'production style',
  '"Tippy" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Tippy" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Tippy" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Tippy" appears in each.'
  ]::text[],
  array[
    'Add "Tippy" to flashcards with one benchmark reference.',
    'Pair "Tippy" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Muscatel',
  'tea',
  'variety of source ingredient',
  '"Muscatel" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Muscatel" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Muscatel" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Muscatel" appears in each.'
  ]::text[],
  array[
    'Add "Muscatel" to flashcards with one benchmark reference.',
    'Pair "Muscatel" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Clonal',
  'tea',
  'terroir',
  '"Clonal" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Clonal" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Clonal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Clonal" appears in each.'
  ]::text[],
  array[
    'Add "Clonal" to flashcards with one benchmark reference.',
    'Pair "Clonal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Terpene',
  'tea',
  'location',
  '"Terpene" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Terpene" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Terpene" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Terpene" appears in each.'
  ]::text[],
  array[
    'Add "Terpene" to flashcards with one benchmark reference.',
    'Pair "Terpene" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Catechin',
  'tea',
  'production style',
  '"Catechin" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Catechin" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Catechin" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Catechin" appears in each.'
  ]::text[],
  array[
    'Add "Catechin" to flashcards with one benchmark reference.',
    'Pair "Catechin" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Theanine',
  'tea',
  'variety of source ingredient',
  '"Theanine" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Theanine" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Theanine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Theanine" appears in each.'
  ]::text[],
  array[
    'Add "Theanine" to flashcards with one benchmark reference.',
    'Pair "Theanine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Polyphenol',
  'tea',
  'terroir',
  '"Polyphenol" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Polyphenol" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Polyphenol" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Polyphenol" appears in each.'
  ]::text[],
  array[
    'Add "Polyphenol" to flashcards with one benchmark reference.',
    'Pair "Polyphenol" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Camellia',
  'tea',
  'location',
  '"Camellia" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Camellia" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Camellia" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Camellia" appears in each.'
  ]::text[],
  array[
    'Add "Camellia" to flashcards with one benchmark reference.',
    'Pair "Camellia" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Orthodox',
  'tea',
  'production style',
  '"Orthodox" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Orthodox" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Orthodox" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Orthodox" appears in each.'
  ]::text[],
  array[
    'Add "Orthodox" to flashcards with one benchmark reference.',
    'Pair "Orthodox" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ctc',
  'tea',
  'variety of source ingredient',
  '"Ctc" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Ctc" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Ctc" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Ctc" appears in each.'
  ]::text[],
  array[
    'Add "Ctc" to flashcards with one benchmark reference.',
    'Pair "Ctc" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Flush',
  'tea',
  'terroir',
  '"Flush" is a one-word exam-style glossary term used in Tea study, focused on site and environmental expression.',
  'Apply "Flush" in theory review and tasting notes by linking observations to site and environmental expression in Tea.',
  array[
    'Study example: define "Flush" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Flush" appears in each.'
  ]::text[],
  array[
    'Add "Flush" to flashcards with one benchmark reference.',
    'Pair "Flush" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Vernal',
  'tea',
  'location',
  '"Vernal" is a one-word exam-style glossary term used in Tea study, focused on regional context.',
  'Apply "Vernal" in theory review and tasting notes by linking observations to regional context in Tea.',
  array[
    'Study example: define "Vernal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Vernal" appears in each.'
  ]::text[],
  array[
    'Add "Vernal" to flashcards with one benchmark reference.',
    'Pair "Vernal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Monsoonal',
  'tea',
  'production style',
  '"Monsoonal" is a one-word exam-style glossary term used in Tea study, focused on production and process.',
  'Apply "Monsoonal" in theory review and tasting notes by linking observations to production and process in Tea.',
  array[
    'Study example: define "Monsoonal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Monsoonal" appears in each.'
  ]::text[],
  array[
    'Add "Monsoonal" to flashcards with one benchmark reference.',
    'Pair "Monsoonal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Autumnal',
  'tea',
  'variety of source ingredient',
  '"Autumnal" is a one-word exam-style glossary term used in Tea study, focused on source ingredient identity.',
  'Apply "Autumnal" in theory review and tasting notes by linking observations to source ingredient identity in Tea.',
  array[
    'Study example: define "Autumnal" in one sentence before blind tasting calibration.',
    'Practice example: compare two Tea samples and explain how "Autumnal" appears in each.'
  ]::text[],
  array[
    'Add "Autumnal" to flashcards with one benchmark reference.',
    'Pair "Autumnal" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.teausa.com/',
    'https://www.ukteaacademy.co.uk/'
  ]::text[],
  array[
    'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
    'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.ukteaacademy.co.uk/courses/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Scoby',
  'kombucha',
  'production style',
  '"Scoby" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Scoby" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Scoby" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Scoby" appears in each.'
  ]::text[],
  array[
    'Add "Scoby" to flashcards with one benchmark reference.',
    'Pair "Scoby" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pellicle',
  'kombucha',
  'variety of source ingredient',
  '"Pellicle" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Pellicle" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Pellicle" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Pellicle" appears in each.'
  ]::text[],
  array[
    'Add "Pellicle" to flashcards with one benchmark reference.',
    'Pair "Pellicle" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Acetobacter',
  'kombucha',
  'terroir',
  '"Acetobacter" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Acetobacter" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Acetobacter" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Acetobacter" appears in each.'
  ]::text[],
  array[
    'Add "Acetobacter" to flashcards with one benchmark reference.',
    'Pair "Acetobacter" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gluconacetobacter',
  'kombucha',
  'location',
  '"Gluconacetobacter" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Gluconacetobacter" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Gluconacetobacter" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Gluconacetobacter" appears in each.'
  ]::text[],
  array[
    'Add "Gluconacetobacter" to flashcards with one benchmark reference.',
    'Pair "Gluconacetobacter" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Saccharomyces',
  'kombucha',
  'production style',
  '"Saccharomyces" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Saccharomyces" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Saccharomyces" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Saccharomyces" appears in each.'
  ]::text[],
  array[
    'Add "Saccharomyces" to flashcards with one benchmark reference.',
    'Pair "Saccharomyces" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brettanomyces',
  'kombucha',
  'variety of source ingredient',
  '"Brettanomyces" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Brettanomyces" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Brettanomyces" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Brettanomyces" appears in each.'
  ]::text[],
  array[
    'Add "Brettanomyces" to flashcards with one benchmark reference.',
    'Pair "Brettanomyces" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Inoculum',
  'kombucha',
  'terroir',
  '"Inoculum" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Inoculum" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Inoculum" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Inoculum" appears in each.'
  ]::text[],
  array[
    'Add "Inoculum" to flashcards with one benchmark reference.',
    'Pair "Inoculum" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Backslop',
  'kombucha',
  'location',
  '"Backslop" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Backslop" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Backslop" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Backslop" appears in each.'
  ]::text[],
  array[
    'Add "Backslop" to flashcards with one benchmark reference.',
    'Pair "Backslop" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Acetic',
  'kombucha',
  'production style',
  '"Acetic" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Acetic" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Acetic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Acetic" appears in each.'
  ]::text[],
  array[
    'Add "Acetic" to flashcards with one benchmark reference.',
    'Pair "Acetic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gluconic',
  'kombucha',
  'variety of source ingredient',
  '"Gluconic" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Gluconic" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Gluconic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Gluconic" appears in each.'
  ]::text[],
  array[
    'Add "Gluconic" to flashcards with one benchmark reference.',
    'Pair "Gluconic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lactic',
  'kombucha',
  'terroir',
  '"Lactic" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Lactic" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Lactic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Lactic" appears in each.'
  ]::text[],
  array[
    'Add "Lactic" to flashcards with one benchmark reference.',
    'Pair "Lactic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Malic',
  'kombucha',
  'location',
  '"Malic" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Malic" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Malic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Malic" appears in each.'
  ]::text[],
  array[
    'Add "Malic" to flashcards with one benchmark reference.',
    'Pair "Malic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Succinic',
  'kombucha',
  'production style',
  '"Succinic" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Succinic" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Succinic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Succinic" appears in each.'
  ]::text[],
  array[
    'Add "Succinic" to flashcards with one benchmark reference.',
    'Pair "Succinic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Carbonation',
  'kombucha',
  'variety of source ingredient',
  '"Carbonation" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Carbonation" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Carbonation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Carbonation" appears in each.'
  ]::text[],
  array[
    'Add "Carbonation" to flashcards with one benchmark reference.',
    'Pair "Carbonation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Effervescence',
  'kombucha',
  'terroir',
  '"Effervescence" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Effervescence" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Effervescence" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Effervescence" appears in each.'
  ]::text[],
  array[
    'Add "Effervescence" to flashcards with one benchmark reference.',
    'Pair "Effervescence" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fizz',
  'kombucha',
  'location',
  '"Fizz" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Fizz" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Fizz" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Fizz" appears in each.'
  ]::text[],
  array[
    'Add "Fizz" to flashcards with one benchmark reference.',
    'Pair "Fizz" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Vinegar',
  'kombucha',
  'production style',
  '"Vinegar" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Vinegar" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Vinegar" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Vinegar" appears in each.'
  ]::text[],
  array[
    'Add "Vinegar" to flashcards with one benchmark reference.',
    'Pair "Vinegar" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tanginess',
  'kombucha',
  'variety of source ingredient',
  '"Tanginess" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Tanginess" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Tanginess" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Tanginess" appears in each.'
  ]::text[],
  array[
    'Add "Tanginess" to flashcards with one benchmark reference.',
    'Pair "Tanginess" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dryness',
  'kombucha',
  'terroir',
  '"Dryness" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Dryness" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Dryness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Dryness" appears in each.'
  ]::text[],
  array[
    'Add "Dryness" to flashcards with one benchmark reference.',
    'Pair "Dryness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Headspace',
  'kombucha',
  'location',
  '"Headspace" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Headspace" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Headspace" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Headspace" appears in each.'
  ]::text[],
  array[
    'Add "Headspace" to flashcards with one benchmark reference.',
    'Pair "Headspace" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Biofilm',
  'kombucha',
  'production style',
  '"Biofilm" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Biofilm" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Biofilm" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Biofilm" appears in each.'
  ]::text[],
  array[
    'Add "Biofilm" to flashcards with one benchmark reference.',
    'Pair "Biofilm" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cooling',
  'kombucha',
  'variety of source ingredient',
  '"Cooling" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Cooling" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Cooling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Cooling" appears in each.'
  ]::text[],
  array[
    'Add "Cooling" to flashcards with one benchmark reference.',
    'Pair "Cooling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Flavoring',
  'kombucha',
  'terroir',
  '"Flavoring" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Flavoring" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Flavoring" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Flavoring" appears in each.'
  ]::text[],
  array[
    'Add "Flavoring" to flashcards with one benchmark reference.',
    'Pair "Flavoring" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Secondary',
  'kombucha',
  'location',
  '"Secondary" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Secondary" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Secondary" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Secondary" appears in each.'
  ]::text[],
  array[
    'Add "Secondary" to flashcards with one benchmark reference.',
    'Pair "Secondary" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Primary',
  'kombucha',
  'production style',
  '"Primary" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Primary" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Primary" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Primary" appears in each.'
  ]::text[],
  array[
    'Add "Primary" to flashcards with one benchmark reference.',
    'Pair "Primary" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Acidification',
  'kombucha',
  'variety of source ingredient',
  '"Acidification" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Acidification" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Acidification" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Acidification" appears in each.'
  ]::text[],
  array[
    'Add "Acidification" to flashcards with one benchmark reference.',
    'Pair "Acidification" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sanitation',
  'kombucha',
  'terroir',
  '"Sanitation" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Sanitation" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Sanitation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Sanitation" appears in each.'
  ]::text[],
  array[
    'Add "Sanitation" to flashcards with one benchmark reference.',
    'Pair "Sanitation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Contamination',
  'kombucha',
  'location',
  '"Contamination" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Contamination" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Contamination" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Contamination" appears in each.'
  ]::text[],
  array[
    'Add "Contamination" to flashcards with one benchmark reference.',
    'Pair "Contamination" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mold',
  'kombucha',
  'production style',
  '"Mold" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Mold" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Mold" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Mold" appears in each.'
  ]::text[],
  array[
    'Add "Mold" to flashcards with one benchmark reference.',
    'Pair "Mold" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kahm',
  'kombucha',
  'variety of source ingredient',
  '"Kahm" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Kahm" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Kahm" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Kahm" appears in each.'
  ]::text[],
  array[
    'Add "Kahm" to flashcards with one benchmark reference.',
    'Pair "Kahm" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Culture',
  'kombucha',
  'terroir',
  '"Culture" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Culture" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Culture" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Culture" appears in each.'
  ]::text[],
  array[
    'Add "Culture" to flashcards with one benchmark reference.',
    'Pair "Culture" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Symbiosis',
  'kombucha',
  'location',
  '"Symbiosis" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Symbiosis" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Symbiosis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Symbiosis" appears in each.'
  ]::text[],
  array[
    'Add "Symbiosis" to flashcards with one benchmark reference.',
    'Pair "Symbiosis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Dilution',
  'kombucha',
  'production style',
  '"Dilution" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Dilution" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Dilution" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Dilution" appears in each.'
  ]::text[],
  array[
    'Add "Dilution" to flashcards with one benchmark reference.',
    'Pair "Dilution" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sourness',
  'kombucha',
  'variety of source ingredient',
  '"Sourness" is a one-word exam-style glossary term used in Kombucha study, focused on source ingredient identity.',
  'Apply "Sourness" in theory review and tasting notes by linking observations to source ingredient identity in Kombucha.',
  array[
    'Study example: define "Sourness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Sourness" appears in each.'
  ]::text[],
  array[
    'Add "Sourness" to flashcards with one benchmark reference.',
    'Pair "Sourness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ethanol',
  'kombucha',
  'terroir',
  '"Ethanol" is a one-word exam-style glossary term used in Kombucha study, focused on site and environmental expression.',
  'Apply "Ethanol" in theory review and tasting notes by linking observations to site and environmental expression in Kombucha.',
  array[
    'Study example: define "Ethanol" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Ethanol" appears in each.'
  ]::text[],
  array[
    'Add "Ethanol" to flashcards with one benchmark reference.',
    'Pair "Ethanol" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Acetate',
  'kombucha',
  'location',
  '"Acetate" is a one-word exam-style glossary term used in Kombucha study, focused on regional context.',
  'Apply "Acetate" in theory review and tasting notes by linking observations to regional context in Kombucha.',
  array[
    'Study example: define "Acetate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Acetate" appears in each.'
  ]::text[],
  array[
    'Add "Acetate" to flashcards with one benchmark reference.',
    'Pair "Acetate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cellulose',
  'kombucha',
  'production style',
  '"Cellulose" is a one-word exam-style glossary term used in Kombucha study, focused on production and process.',
  'Apply "Cellulose" in theory review and tasting notes by linking observations to production and process in Kombucha.',
  array[
    'Study example: define "Cellulose" in one sentence before blind tasting calibration.',
    'Practice example: compare two Kombucha samples and explain how "Cellulose" appears in each.'
  ]::text[],
  array[
    'Add "Cellulose" to flashcards with one benchmark reference.',
    'Pair "Cellulose" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.kombuchabrewers.org/',
    'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook'
  ]::text[],
  array[
    'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
    'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.kombuchabrewers.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Nectar',
  'juice',
  'production style',
  '"Nectar" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Nectar" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Nectar" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Nectar" appears in each.'
  ]::text[],
  array[
    'Add "Nectar" to flashcards with one benchmark reference.',
    'Pair "Nectar" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Concentrate',
  'juice',
  'variety of source ingredient',
  '"Concentrate" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Concentrate" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Concentrate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Concentrate" appears in each.'
  ]::text[],
  array[
    'Add "Concentrate" to flashcards with one benchmark reference.',
    'Pair "Concentrate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Reconstitution',
  'juice',
  'terroir',
  '"Reconstitution" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Reconstitution" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Reconstitution" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Reconstitution" appears in each.'
  ]::text[],
  array[
    'Add "Reconstitution" to flashcards with one benchmark reference.',
    'Pair "Reconstitution" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Clarifier',
  'juice',
  'location',
  '"Clarifier" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Clarifier" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Clarifier" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Clarifier" appears in each.'
  ]::text[],
  array[
    'Add "Clarifier" to flashcards with one benchmark reference.',
    'Pair "Clarifier" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pectinase',
  'juice',
  'production style',
  '"Pectinase" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Pectinase" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Pectinase" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Pectinase" appears in each.'
  ]::text[],
  array[
    'Add "Pectinase" to flashcards with one benchmark reference.',
    'Pair "Pectinase" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Enzyme',
  'juice',
  'variety of source ingredient',
  '"Enzyme" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Enzyme" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Enzyme" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Enzyme" appears in each.'
  ]::text[],
  array[
    'Add "Enzyme" to flashcards with one benchmark reference.',
    'Pair "Enzyme" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Cloudiness',
  'juice',
  'terroir',
  '"Cloudiness" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Cloudiness" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Cloudiness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Cloudiness" appears in each.'
  ]::text[],
  array[
    'Add "Cloudiness" to flashcards with one benchmark reference.',
    'Pair "Cloudiness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pulp',
  'juice',
  'location',
  '"Pulp" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Pulp" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Pulp" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Pulp" appears in each.'
  ]::text[],
  array[
    'Add "Pulp" to flashcards with one benchmark reference.',
    'Pair "Pulp" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pressing',
  'juice',
  'production style',
  '"Pressing" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Pressing" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Pressing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Pressing" appears in each.'
  ]::text[],
  array[
    'Add "Pressing" to flashcards with one benchmark reference.',
    'Pair "Pressing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Aseptic',
  'juice',
  'variety of source ingredient',
  '"Aseptic" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Aseptic" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Aseptic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Aseptic" appears in each.'
  ]::text[],
  array[
    'Add "Aseptic" to flashcards with one benchmark reference.',
    'Pair "Aseptic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sweetener',
  'juice',
  'terroir',
  '"Sweetener" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Sweetener" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Sweetener" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Sweetener" appears in each.'
  ]::text[],
  array[
    'Add "Sweetener" to flashcards with one benchmark reference.',
    'Pair "Sweetener" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Acidulant',
  'juice',
  'location',
  '"Acidulant" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Acidulant" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Acidulant" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Acidulant" appears in each.'
  ]::text[],
  array[
    'Add "Acidulant" to flashcards with one benchmark reference.',
    'Pair "Acidulant" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Stabilizer',
  'juice',
  'production style',
  '"Stabilizer" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Stabilizer" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Stabilizer" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Stabilizer" appears in each.'
  ]::text[],
  array[
    'Add "Stabilizer" to flashcards with one benchmark reference.',
    'Pair "Stabilizer" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Deaeration',
  'juice',
  'variety of source ingredient',
  '"Deaeration" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Deaeration" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Deaeration" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Deaeration" appears in each.'
  ]::text[],
  array[
    'Add "Deaeration" to flashcards with one benchmark reference.',
    'Pair "Deaeration" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Browning',
  'juice',
  'terroir',
  '"Browning" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Browning" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Browning" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Browning" appears in each.'
  ]::text[],
  array[
    'Add "Browning" to flashcards with one benchmark reference.',
    'Pair "Browning" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ascorbate',
  'juice',
  'location',
  '"Ascorbate" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Ascorbate" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Ascorbate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Ascorbate" appears in each.'
  ]::text[],
  array[
    'Add "Ascorbate" to flashcards with one benchmark reference.',
    'Pair "Ascorbate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Citric',
  'juice',
  'production style',
  '"Citric" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Citric" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Citric" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Citric" appears in each.'
  ]::text[],
  array[
    'Add "Citric" to flashcards with one benchmark reference.',
    'Pair "Citric" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Tartaric',
  'juice',
  'variety of source ingredient',
  '"Tartaric" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Tartaric" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Tartaric" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Tartaric" appears in each.'
  ]::text[],
  array[
    'Add "Tartaric" to flashcards with one benchmark reference.',
    'Pair "Tartaric" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Turbidity',
  'juice',
  'terroir',
  '"Turbidity" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Turbidity" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Turbidity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Turbidity" appears in each.'
  ]::text[],
  array[
    'Add "Turbidity" to flashcards with one benchmark reference.',
    'Pair "Turbidity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sedimentation',
  'juice',
  'location',
  '"Sedimentation" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Sedimentation" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Sedimentation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Sedimentation" appears in each.'
  ]::text[],
  array[
    'Add "Sedimentation" to flashcards with one benchmark reference.',
    'Pair "Sedimentation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Retort',
  'juice',
  'production style',
  '"Retort" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Retort" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Retort" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Retort" appears in each.'
  ]::text[],
  array[
    'Add "Retort" to flashcards with one benchmark reference.',
    'Pair "Retort" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chiller',
  'juice',
  'variety of source ingredient',
  '"Chiller" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Chiller" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Chiller" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Chiller" appears in each.'
  ]::text[],
  array[
    'Add "Chiller" to flashcards with one benchmark reference.',
    'Pair "Chiller" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Conveyor',
  'juice',
  'terroir',
  '"Conveyor" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Conveyor" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Conveyor" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Conveyor" appears in each.'
  ]::text[],
  array[
    'Add "Conveyor" to flashcards with one benchmark reference.',
    'Pair "Conveyor" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mouthfeel',
  'juice',
  'location',
  '"Mouthfeel" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Mouthfeel" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Mouthfeel" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Mouthfeel" appears in each.'
  ]::text[],
  array[
    'Add "Mouthfeel" to flashcards with one benchmark reference.',
    'Pair "Mouthfeel" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Flavor',
  'juice',
  'production style',
  '"Flavor" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Flavor" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Flavor" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Flavor" appears in each.'
  ]::text[],
  array[
    'Add "Flavor" to flashcards with one benchmark reference.',
    'Pair "Flavor" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Color',
  'juice',
  'variety of source ingredient',
  '"Color" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Color" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Color" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Color" appears in each.'
  ]::text[],
  array[
    'Add "Color" to flashcards with one benchmark reference.',
    'Pair "Color" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hue',
  'juice',
  'terroir',
  '"Hue" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Hue" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Hue" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Hue" appears in each.'
  ]::text[],
  array[
    'Add "Hue" to flashcards with one benchmark reference.',
    'Pair "Hue" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pomace',
  'juice',
  'location',
  '"Pomace" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Pomace" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Pomace" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Pomace" appears in each.'
  ]::text[],
  array[
    'Add "Pomace" to flashcards with one benchmark reference.',
    'Pair "Pomace" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Coldpress',
  'juice',
  'production style',
  '"Coldpress" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Coldpress" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Coldpress" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Coldpress" appears in each.'
  ]::text[],
  array[
    'Add "Coldpress" to flashcards with one benchmark reference.',
    'Pair "Coldpress" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Juiciness',
  'juice',
  'variety of source ingredient',
  '"Juiciness" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Juiciness" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Juiciness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Juiciness" appears in each.'
  ]::text[],
  array[
    'Add "Juiciness" to flashcards with one benchmark reference.',
    'Pair "Juiciness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ripening',
  'juice',
  'terroir',
  '"Ripening" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Ripening" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Ripening" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Ripening" appears in each.'
  ]::text[],
  array[
    'Add "Ripening" to flashcards with one benchmark reference.',
    'Pair "Ripening" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Storage',
  'juice',
  'location',
  '"Storage" is a one-word exam-style glossary term used in Juice study, focused on regional context.',
  'Apply "Storage" in theory review and tasting notes by linking observations to regional context in Juice.',
  array[
    'Study example: define "Storage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Storage" appears in each.'
  ]::text[],
  array[
    'Add "Storage" to flashcards with one benchmark reference.',
    'Pair "Storage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Labeling',
  'juice',
  'production style',
  '"Labeling" is a one-word exam-style glossary term used in Juice study, focused on production and process.',
  'Apply "Labeling" in theory review and tasting notes by linking observations to production and process in Juice.',
  array[
    'Study example: define "Labeling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Labeling" appears in each.'
  ]::text[],
  array[
    'Add "Labeling" to flashcards with one benchmark reference.',
    'Pair "Labeling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Distribution',
  'juice',
  'variety of source ingredient',
  '"Distribution" is a one-word exam-style glossary term used in Juice study, focused on source ingredient identity.',
  'Apply "Distribution" in theory review and tasting notes by linking observations to source ingredient identity in Juice.',
  array[
    'Study example: define "Distribution" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Distribution" appears in each.'
  ]::text[],
  array[
    'Add "Distribution" to flashcards with one benchmark reference.',
    'Pair "Distribution" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Refreshment',
  'juice',
  'terroir',
  '"Refreshment" is a one-word exam-style glossary term used in Juice study, focused on site and environmental expression.',
  'Apply "Refreshment" in theory review and tasting notes by linking observations to site and environmental expression in Juice.',
  array[
    'Study example: define "Refreshment" in one sentence before blind tasting calibration.',
    'Practice example: compare two Juice samples and explain how "Refreshment" appears in each.'
  ]::text[],
  array[
    'Add "Refreshment" to flashcards with one benchmark reference.',
    'Pair "Refreshment" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.juiceproducts.org/',
    'https://www.ift.org/'
  ]::text[],
  array[
    'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
    'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.juiceproducts.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Casein',
  'milk',
  'production style',
  '"Casein" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Casein" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Casein" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Casein" appears in each.'
  ]::text[],
  array[
    'Add "Casein" to flashcards with one benchmark reference.',
    'Pair "Casein" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lactose',
  'milk',
  'variety of source ingredient',
  '"Lactose" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Lactose" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Lactose" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Lactose" appears in each.'
  ]::text[],
  array[
    'Add "Lactose" to flashcards with one benchmark reference.',
    'Pair "Lactose" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lactase',
  'milk',
  'terroir',
  '"Lactase" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Lactase" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Lactase" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Lactase" appears in each.'
  ]::text[],
  array[
    'Add "Lactase" to flashcards with one benchmark reference.',
    'Pair "Lactase" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Whey',
  'milk',
  'location',
  '"Whey" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Whey" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Whey" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Whey" appears in each.'
  ]::text[],
  array[
    'Add "Whey" to flashcards with one benchmark reference.',
    'Pair "Whey" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Curd',
  'milk',
  'production style',
  '"Curd" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Curd" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Curd" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Curd" appears in each.'
  ]::text[],
  array[
    'Add "Curd" to flashcards with one benchmark reference.',
    'Pair "Curd" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Creamline',
  'milk',
  'variety of source ingredient',
  '"Creamline" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Creamline" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Creamline" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Creamline" appears in each.'
  ]::text[],
  array[
    'Add "Creamline" to flashcards with one benchmark reference.',
    'Pair "Creamline" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Homogenization',
  'milk',
  'terroir',
  '"Homogenization" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Homogenization" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Homogenization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Homogenization" appears in each.'
  ]::text[],
  array[
    'Add "Homogenization" to flashcards with one benchmark reference.',
    'Pair "Homogenization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Uht',
  'milk',
  'location',
  '"Uht" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Uht" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Uht" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Uht" appears in each.'
  ]::text[],
  array[
    'Add "Uht" to flashcards with one benchmark reference.',
    'Pair "Uht" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Skimming',
  'milk',
  'production style',
  '"Skimming" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Skimming" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Skimming" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Skimming" appears in each.'
  ]::text[],
  array[
    'Add "Skimming" to flashcards with one benchmark reference.',
    'Pair "Skimming" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Rennet',
  'milk',
  'variety of source ingredient',
  '"Rennet" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Rennet" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Rennet" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Rennet" appears in each.'
  ]::text[],
  array[
    'Add "Rennet" to flashcards with one benchmark reference.',
    'Pair "Rennet" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Coagulation',
  'milk',
  'terroir',
  '"Coagulation" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Coagulation" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Coagulation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Coagulation" appears in each.'
  ]::text[],
  array[
    'Add "Coagulation" to flashcards with one benchmark reference.',
    'Pair "Coagulation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Curdling',
  'milk',
  'location',
  '"Curdling" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Curdling" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Curdling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Curdling" appears in each.'
  ]::text[],
  array[
    'Add "Curdling" to flashcards with one benchmark reference.',
    'Pair "Curdling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Churning',
  'milk',
  'production style',
  '"Churning" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Churning" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Churning" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Churning" appears in each.'
  ]::text[],
  array[
    'Add "Churning" to flashcards with one benchmark reference.',
    'Pair "Churning" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Culturing',
  'milk',
  'variety of source ingredient',
  '"Culturing" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Culturing" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Culturing" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Culturing" appears in each.'
  ]::text[],
  array[
    'Add "Culturing" to flashcards with one benchmark reference.',
    'Pair "Culturing" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Probiotic',
  'milk',
  'terroir',
  '"Probiotic" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Probiotic" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Probiotic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Probiotic" appears in each.'
  ]::text[],
  array[
    'Add "Probiotic" to flashcards with one benchmark reference.',
    'Pair "Probiotic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Thermization',
  'milk',
  'location',
  '"Thermization" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Thermization" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Thermization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Thermization" appears in each.'
  ]::text[],
  array[
    'Add "Thermization" to flashcards with one benchmark reference.',
    'Pair "Thermization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ultraheat',
  'milk',
  'production style',
  '"Ultraheat" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Ultraheat" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Ultraheat" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Ultraheat" appears in each.'
  ]::text[],
  array[
    'Add "Ultraheat" to flashcards with one benchmark reference.',
    'Pair "Ultraheat" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Microfiltration',
  'milk',
  'variety of source ingredient',
  '"Microfiltration" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Microfiltration" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Microfiltration" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Microfiltration" appears in each.'
  ]::text[],
  array[
    'Add "Microfiltration" to flashcards with one benchmark reference.',
    'Pair "Microfiltration" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Separation',
  'milk',
  'terroir',
  '"Separation" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Separation" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Separation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Separation" appears in each.'
  ]::text[],
  array[
    'Add "Separation" to flashcards with one benchmark reference.',
    'Pair "Separation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Creaming',
  'milk',
  'location',
  '"Creaming" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Creaming" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Creaming" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Creaming" appears in each.'
  ]::text[],
  array[
    'Add "Creaming" to flashcards with one benchmark reference.',
    'Pair "Creaming" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lipolysis',
  'milk',
  'production style',
  '"Lipolysis" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Lipolysis" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Lipolysis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Lipolysis" appears in each.'
  ]::text[],
  array[
    'Add "Lipolysis" to flashcards with one benchmark reference.',
    'Pair "Lipolysis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Proteolysis',
  'milk',
  'variety of source ingredient',
  '"Proteolysis" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Proteolysis" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Proteolysis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Proteolysis" appears in each.'
  ]::text[],
  array[
    'Add "Proteolysis" to flashcards with one benchmark reference.',
    'Pair "Proteolysis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Gelation',
  'milk',
  'terroir',
  '"Gelation" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Gelation" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Gelation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Gelation" appears in each.'
  ]::text[],
  array[
    'Add "Gelation" to flashcards with one benchmark reference.',
    'Pair "Gelation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Syneresis',
  'milk',
  'location',
  '"Syneresis" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Syneresis" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Syneresis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Syneresis" appears in each.'
  ]::text[],
  array[
    'Add "Syneresis" to flashcards with one benchmark reference.',
    'Pair "Syneresis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Lactation',
  'milk',
  'production style',
  '"Lactation" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Lactation" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Lactation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Lactation" appears in each.'
  ]::text[],
  array[
    'Add "Lactation" to flashcards with one benchmark reference.',
    'Pair "Lactation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Colostrum',
  'milk',
  'variety of source ingredient',
  '"Colostrum" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Colostrum" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Colostrum" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Colostrum" appears in each.'
  ]::text[],
  array[
    'Add "Colostrum" to flashcards with one benchmark reference.',
    'Pair "Colostrum" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mastitis',
  'milk',
  'terroir',
  '"Mastitis" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Mastitis" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Mastitis" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Mastitis" appears in each.'
  ]::text[],
  array[
    'Add "Mastitis" to flashcards with one benchmark reference.',
    'Pair "Mastitis" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Caseinate',
  'milk',
  'location',
  '"Caseinate" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Caseinate" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Caseinate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Caseinate" appears in each.'
  ]::text[],
  array[
    'Add "Caseinate" to flashcards with one benchmark reference.',
    'Pair "Caseinate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Buttermilk',
  'milk',
  'production style',
  '"Buttermilk" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Buttermilk" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Buttermilk" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Buttermilk" appears in each.'
  ]::text[],
  array[
    'Add "Buttermilk" to flashcards with one benchmark reference.',
    'Pair "Buttermilk" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Kefir',
  'milk',
  'variety of source ingredient',
  '"Kefir" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Kefir" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Kefir" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Kefir" appears in each.'
  ]::text[],
  array[
    'Add "Kefir" to flashcards with one benchmark reference.',
    'Pair "Kefir" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Yogurt',
  'milk',
  'terroir',
  '"Yogurt" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Yogurt" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Yogurt" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Yogurt" appears in each.'
  ]::text[],
  array[
    'Add "Yogurt" to flashcards with one benchmark reference.',
    'Pair "Yogurt" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Laban',
  'milk',
  'location',
  '"Laban" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Laban" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Laban" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Laban" appears in each.'
  ]::text[],
  array[
    'Add "Laban" to flashcards with one benchmark reference.',
    'Pair "Laban" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Holstein',
  'milk',
  'production style',
  '"Holstein" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Holstein" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Holstein" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Holstein" appears in each.'
  ]::text[],
  array[
    'Add "Holstein" to flashcards with one benchmark reference.',
    'Pair "Holstein" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Jersey',
  'milk',
  'variety of source ingredient',
  '"Jersey" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Jersey" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Jersey" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Jersey" appears in each.'
  ]::text[],
  array[
    'Add "Jersey" to flashcards with one benchmark reference.',
    'Pair "Jersey" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Guernsey',
  'milk',
  'terroir',
  '"Guernsey" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Guernsey" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Guernsey" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Guernsey" appears in each.'
  ]::text[],
  array[
    'Add "Guernsey" to flashcards with one benchmark reference.',
    'Pair "Guernsey" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Buffalo',
  'milk',
  'location',
  '"Buffalo" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Buffalo" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Buffalo" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Buffalo" appears in each.'
  ]::text[],
  array[
    'Add "Buffalo" to flashcards with one benchmark reference.',
    'Pair "Buffalo" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Caprine',
  'milk',
  'production style',
  '"Caprine" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Caprine" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Caprine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Caprine" appears in each.'
  ]::text[],
  array[
    'Add "Caprine" to flashcards with one benchmark reference.',
    'Pair "Caprine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ovine',
  'milk',
  'variety of source ingredient',
  '"Ovine" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Ovine" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Ovine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Ovine" appears in each.'
  ]::text[],
  array[
    'Add "Ovine" to flashcards with one benchmark reference.',
    'Pair "Ovine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bovine',
  'milk',
  'terroir',
  '"Bovine" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Bovine" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Bovine" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Bovine" appears in each.'
  ]::text[],
  array[
    'Add "Bovine" to flashcards with one benchmark reference.',
    'Pair "Bovine" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Silage',
  'milk',
  'location',
  '"Silage" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Silage" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Silage" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Silage" appears in each.'
  ]::text[],
  array[
    'Add "Silage" to flashcards with one benchmark reference.',
    'Pair "Silage" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Feedlot',
  'milk',
  'production style',
  '"Feedlot" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Feedlot" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Feedlot" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Feedlot" appears in each.'
  ]::text[],
  array[
    'Add "Feedlot" to flashcards with one benchmark reference.',
    'Pair "Feedlot" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Milkshed',
  'milk',
  'variety of source ingredient',
  '"Milkshed" is a one-word exam-style glossary term used in Milk study, focused on source ingredient identity.',
  'Apply "Milkshed" in theory review and tasting notes by linking observations to source ingredient identity in Milk.',
  array[
    'Study example: define "Milkshed" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Milkshed" appears in each.'
  ]::text[],
  array[
    'Add "Milkshed" to flashcards with one benchmark reference.',
    'Pair "Milkshed" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Foaming',
  'milk',
  'terroir',
  '"Foaming" is a one-word exam-style glossary term used in Milk study, focused on site and environmental expression.',
  'Apply "Foaming" in theory review and tasting notes by linking observations to site and environmental expression in Milk.',
  array[
    'Study example: define "Foaming" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Foaming" appears in each.'
  ]::text[],
  array[
    'Add "Foaming" to flashcards with one benchmark reference.',
    'Pair "Foaming" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Texturization',
  'milk',
  'location',
  '"Texturization" is a one-word exam-style glossary term used in Milk study, focused on regional context.',
  'Apply "Texturization" in theory review and tasting notes by linking observations to regional context in Milk.',
  array[
    'Study example: define "Texturization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Texturization" appears in each.'
  ]::text[],
  array[
    'Add "Texturization" to flashcards with one benchmark reference.',
    'Pair "Texturization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Pasteurizer',
  'milk',
  'production style',
  '"Pasteurizer" is a one-word exam-style glossary term used in Milk study, focused on production and process.',
  'Apply "Pasteurizer" in theory review and tasting notes by linking observations to production and process in Milk.',
  array[
    'Study example: define "Pasteurizer" in one sentence before blind tasting calibration.',
    'Practice example: compare two Milk samples and explain how "Pasteurizer" appears in each.'
  ]::text[],
  array[
    'Add "Pasteurizer" to flashcards with one benchmark reference.',
    'Pair "Pasteurizer" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.idfa.org/',
    'https://www.fil-idf.org/'
  ]::text[],
  array[
    'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
    'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.idfa.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Aquifer',
  'water',
  'production style',
  '"Aquifer" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Aquifer" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Aquifer" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Aquifer" appears in each.'
  ]::text[],
  array[
    'Add "Aquifer" to flashcards with one benchmark reference.',
    'Pair "Aquifer" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Alkalinity',
  'water',
  'variety of source ingredient',
  '"Alkalinity" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Alkalinity" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Alkalinity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Alkalinity" appears in each.'
  ]::text[],
  array[
    'Add "Alkalinity" to flashcards with one benchmark reference.',
    'Pair "Alkalinity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hardness',
  'water',
  'terroir',
  '"Hardness" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Hardness" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Hardness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Hardness" appears in each.'
  ]::text[],
  array[
    'Add "Hardness" to flashcards with one benchmark reference.',
    'Pair "Hardness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Softness',
  'water',
  'location',
  '"Softness" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Softness" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Softness" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Softness" appears in each.'
  ]::text[],
  array[
    'Add "Softness" to flashcards with one benchmark reference.',
    'Pair "Softness" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Mineralization',
  'water',
  'production style',
  '"Mineralization" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Mineralization" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Mineralization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Mineralization" appears in each.'
  ]::text[],
  array[
    'Add "Mineralization" to flashcards with one benchmark reference.',
    'Pair "Mineralization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Conductivity',
  'water',
  'variety of source ingredient',
  '"Conductivity" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Conductivity" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Conductivity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Conductivity" appears in each.'
  ]::text[],
  array[
    'Add "Conductivity" to flashcards with one benchmark reference.',
    'Pair "Conductivity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Bicarbonate',
  'water',
  'terroir',
  '"Bicarbonate" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Bicarbonate" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Bicarbonate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Bicarbonate" appears in each.'
  ]::text[],
  array[
    'Add "Bicarbonate" to flashcards with one benchmark reference.',
    'Pair "Bicarbonate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Calcium',
  'water',
  'location',
  '"Calcium" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Calcium" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Calcium" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Calcium" appears in each.'
  ]::text[],
  array[
    'Add "Calcium" to flashcards with one benchmark reference.',
    'Pair "Calcium" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Magnesium',
  'water',
  'production style',
  '"Magnesium" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Magnesium" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Magnesium" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Magnesium" appears in each.'
  ]::text[],
  array[
    'Add "Magnesium" to flashcards with one benchmark reference.',
    'Pair "Magnesium" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sodium',
  'water',
  'variety of source ingredient',
  '"Sodium" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Sodium" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Sodium" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Sodium" appears in each.'
  ]::text[],
  array[
    'Add "Sodium" to flashcards with one benchmark reference.',
    'Pair "Sodium" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Potassium',
  'water',
  'terroir',
  '"Potassium" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Potassium" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Potassium" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Potassium" appears in each.'
  ]::text[],
  array[
    'Add "Potassium" to flashcards with one benchmark reference.',
    'Pair "Potassium" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sulfate',
  'water',
  'location',
  '"Sulfate" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Sulfate" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Sulfate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Sulfate" appears in each.'
  ]::text[],
  array[
    'Add "Sulfate" to flashcards with one benchmark reference.',
    'Pair "Sulfate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chloride',
  'water',
  'production style',
  '"Chloride" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Chloride" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Chloride" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Chloride" appears in each.'
  ]::text[],
  array[
    'Add "Chloride" to flashcards with one benchmark reference.',
    'Pair "Chloride" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Silica',
  'water',
  'variety of source ingredient',
  '"Silica" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Silica" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Silica" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Silica" appears in each.'
  ]::text[],
  array[
    'Add "Silica" to flashcards with one benchmark reference.',
    'Pair "Silica" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Fluoride',
  'water',
  'terroir',
  '"Fluoride" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Fluoride" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Fluoride" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Fluoride" appears in each.'
  ]::text[],
  array[
    'Add "Fluoride" to flashcards with one benchmark reference.',
    'Pair "Fluoride" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Nitrate',
  'water',
  'location',
  '"Nitrate" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Nitrate" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Nitrate" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Nitrate" appears in each.'
  ]::text[],
  array[
    'Add "Nitrate" to flashcards with one benchmark reference.',
    'Pair "Nitrate" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Nitrite',
  'water',
  'production style',
  '"Nitrite" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Nitrite" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Nitrite" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Nitrite" appears in each.'
  ]::text[],
  array[
    'Add "Nitrite" to flashcards with one benchmark reference.',
    'Pair "Nitrite" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Arsenic',
  'water',
  'variety of source ingredient',
  '"Arsenic" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Arsenic" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Arsenic" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Arsenic" appears in each.'
  ]::text[],
  array[
    'Add "Arsenic" to flashcards with one benchmark reference.',
    'Pair "Arsenic" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Manganese',
  'water',
  'terroir',
  '"Manganese" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Manganese" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Manganese" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Manganese" appears in each.'
  ]::text[],
  array[
    'Add "Manganese" to flashcards with one benchmark reference.',
    'Pair "Manganese" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Iron',
  'water',
  'location',
  '"Iron" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Iron" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Iron" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Iron" appears in each.'
  ]::text[],
  array[
    'Add "Iron" to flashcards with one benchmark reference.',
    'Pair "Iron" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Potability',
  'water',
  'production style',
  '"Potability" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Potability" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Potability" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Potability" appears in each.'
  ]::text[],
  array[
    'Add "Potability" to flashcards with one benchmark reference.',
    'Pair "Potability" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Disinfection',
  'water',
  'variety of source ingredient',
  '"Disinfection" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Disinfection" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Disinfection" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Disinfection" appears in each.'
  ]::text[],
  array[
    'Add "Disinfection" to flashcards with one benchmark reference.',
    'Pair "Disinfection" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Chlorination',
  'water',
  'terroir',
  '"Chlorination" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Chlorination" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Chlorination" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Chlorination" appears in each.'
  ]::text[],
  array[
    'Add "Chlorination" to flashcards with one benchmark reference.',
    'Pair "Chlorination" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ozonation',
  'water',
  'location',
  '"Ozonation" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Ozonation" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Ozonation" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Ozonation" appears in each.'
  ]::text[],
  array[
    'Add "Ozonation" to flashcards with one benchmark reference.',
    'Pair "Ozonation" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Ultraviolet',
  'water',
  'production style',
  '"Ultraviolet" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Ultraviolet" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Ultraviolet" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Ultraviolet" appears in each.'
  ]::text[],
  array[
    'Add "Ultraviolet" to flashcards with one benchmark reference.',
    'Pair "Ultraviolet" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Membrane',
  'water',
  'variety of source ingredient',
  '"Membrane" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Membrane" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Membrane" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Membrane" appears in each.'
  ]::text[],
  array[
    'Add "Membrane" to flashcards with one benchmark reference.',
    'Pair "Membrane" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Remineralization',
  'water',
  'terroir',
  '"Remineralization" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Remineralization" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Remineralization" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Remineralization" appears in each.'
  ]::text[],
  array[
    'Add "Remineralization" to flashcards with one benchmark reference.',
    'Pair "Remineralization" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Sparkling',
  'water',
  'location',
  '"Sparkling" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Sparkling" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Sparkling" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Sparkling" appears in each.'
  ]::text[],
  array[
    'Add "Sparkling" to flashcards with one benchmark reference.',
    'Pair "Sparkling" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Stillwater',
  'water',
  'production style',
  '"Stillwater" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Stillwater" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Stillwater" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Stillwater" appears in each.'
  ]::text[],
  array[
    'Add "Stillwater" to flashcards with one benchmark reference.',
    'Pair "Stillwater" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Springwater',
  'water',
  'variety of source ingredient',
  '"Springwater" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Springwater" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Springwater" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Springwater" appears in each.'
  ]::text[],
  array[
    'Add "Springwater" to flashcards with one benchmark reference.',
    'Pair "Springwater" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Glacial',
  'water',
  'terroir',
  '"Glacial" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Glacial" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Glacial" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Glacial" appears in each.'
  ]::text[],
  array[
    'Add "Glacial" to flashcards with one benchmark reference.',
    'Pair "Glacial" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Artesian',
  'water',
  'location',
  '"Artesian" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Artesian" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Artesian" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Artesian" appears in each.'
  ]::text[],
  array[
    'Add "Artesian" to flashcards with one benchmark reference.',
    'Pair "Artesian" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Groundwater',
  'water',
  'production style',
  '"Groundwater" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Groundwater" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Groundwater" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Groundwater" appears in each.'
  ]::text[],
  array[
    'Add "Groundwater" to flashcards with one benchmark reference.',
    'Pair "Groundwater" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Watershed',
  'water',
  'variety of source ingredient',
  '"Watershed" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Watershed" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Watershed" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Watershed" appears in each.'
  ]::text[],
  array[
    'Add "Watershed" to flashcards with one benchmark reference.',
    'Pair "Watershed" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Catchment',
  'water',
  'terroir',
  '"Catchment" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Catchment" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Catchment" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Catchment" appears in each.'
  ]::text[],
  array[
    'Add "Catchment" to flashcards with one benchmark reference.',
    'Pair "Catchment" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Runoff',
  'water',
  'location',
  '"Runoff" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Runoff" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Runoff" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Runoff" appears in each.'
  ]::text[],
  array[
    'Add "Runoff" to flashcards with one benchmark reference.',
    'Pair "Runoff" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Recharge',
  'water',
  'production style',
  '"Recharge" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Recharge" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Recharge" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Recharge" appears in each.'
  ]::text[],
  array[
    'Add "Recharge" to flashcards with one benchmark reference.',
    'Pair "Recharge" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hydrology',
  'water',
  'variety of source ingredient',
  '"Hydrology" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Hydrology" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Hydrology" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Hydrology" appears in each.'
  ]::text[],
  array[
    'Add "Hydrology" to flashcards with one benchmark reference.',
    'Pair "Hydrology" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Hydrogeology',
  'water',
  'terroir',
  '"Hydrogeology" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Hydrogeology" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Hydrogeology" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Hydrogeology" appears in each.'
  ]::text[],
  array[
    'Add "Hydrogeology" to flashcards with one benchmark reference.',
    'Pair "Hydrogeology" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Desalination',
  'water',
  'location',
  '"Desalination" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Desalination" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Desalination" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Desalination" appears in each.'
  ]::text[],
  array[
    'Add "Desalination" to flashcards with one benchmark reference.',
    'Pair "Desalination" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Brackish',
  'water',
  'production style',
  '"Brackish" is a one-word exam-style glossary term used in Water study, focused on production and process.',
  'Apply "Brackish" in theory review and tasting notes by linking observations to production and process in Water.',
  array[
    'Study example: define "Brackish" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Brackish" appears in each.'
  ]::text[],
  array[
    'Add "Brackish" to flashcards with one benchmark reference.',
    'Pair "Brackish" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Salinity',
  'water',
  'variety of source ingredient',
  '"Salinity" is a one-word exam-style glossary term used in Water study, focused on source ingredient identity.',
  'Apply "Salinity" in theory review and tasting notes by linking observations to source ingredient identity in Water.',
  array[
    'Study example: define "Salinity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Salinity" appears in each.'
  ]::text[],
  array[
    'Add "Salinity" to flashcards with one benchmark reference.',
    'Pair "Salinity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Palatability',
  'water',
  'terroir',
  '"Palatability" is a one-word exam-style glossary term used in Water study, focused on site and environmental expression.',
  'Apply "Palatability" in theory review and tasting notes by linking observations to site and environmental expression in Water.',
  array[
    'Study example: define "Palatability" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Palatability" appears in each.'
  ]::text[],
  array[
    'Add "Palatability" to flashcards with one benchmark reference.',
    'Pair "Palatability" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
),
(
  'Purity',
  'water',
  'location',
  '"Purity" is a one-word exam-style glossary term used in Water study, focused on regional context.',
  'Apply "Purity" in theory review and tasting notes by linking observations to regional context in Water.',
  array[
    'Study example: define "Purity" in one sentence before blind tasting calibration.',
    'Practice example: compare two Water samples and explain how "Purity" appears in each.'
  ]::text[],
  array[
    'Add "Purity" to flashcards with one benchmark reference.',
    'Pair "Purity" with Aroma, Terroir, and Vinification for exam recall mapping.'
  ]::text[],
  array['Aroma','Terroir','Vinification']::text[],
  array[
    'https://www.bottledwater.org/',
    'https://www.who.int/health-topics/water'
  ]::text[],
  array[
    'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
    'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
  ]::text[],
  'Sip Studies Original Editorial Glossary Curated v2',
  array['Sip Studies Editorial Team']::text[],
  array['https://www.bottledwater.org/']::text[],
  false,
  '',
  'Curated natural one-word exam-style term. Original Sip Studies editorial rewrite; no verbatim excerpts.',
  true
);
