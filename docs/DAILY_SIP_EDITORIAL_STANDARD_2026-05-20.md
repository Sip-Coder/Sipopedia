# Daily Sip Editorial Standard

Date: 2026-05-20
Standard version: `daily-sip-avant-garde-v2-2026-05`

This standard governs `scripts/generate-daily-sip.mjs`, which writes the Daily Sip reports consumed by `src/components/FlavorBlog.tsx`.

## Current Generator Review

The prior Daily Sip path was deterministic rather than a live ChatGPT article writer. It fetched configured beverage feeds, ranked articles by recency and keyword signals, and wrote `summary`, `whyItMatters`, and `marketImpact` fields into `src/data/dailySip.ts`.

The earlier voice was useful but repetitive: phrases such as "The simple read" and broad market-impact claims made the brief feel templated. The update keeps the source scan and ranking model, but changes the composition standard so each article is shorter, more attributed, less promotional, and easier to audit.

## Research Inputs

Newsroom standards:

- Associated Press: accuracy and bias control depend on attribution, source identification, and vetting internet-sourced information. AP says disputed material should be attributed and internet information should be vetted and attributed to the original source. Source: https://www.ap.org/about/news-values-and-principles/ and https://www.ap.org/about/news-values-and-principles/telling-the-story/
- BBC: due accuracy is more important than speed; single-source reliance should be avoided where possible; controversial subjects should distinguish opinion from fact and reflect significant views with due weight. Source: https://downloads.bbc.co.uk/guidelines/editorialguidelines/pdfs/bbc-editorial-guidelines-whole-document.pdf
- Reuters: integrity, independence, and freedom from bias are core trust principles. Source: https://www.thomsonreuters.com/en/about-us/trust-principles and https://reutersagency.com/about/standards-values/

Beverage media patterns:

- Decanter uses clear headline/deck/byline/date structures and emphasizes authoritative content, independent advice, expert editors, and global wine context. Source: https://www.decanter.com/wine-news/ and https://www.decanter.com/about/
- Wine Enthusiast blends accessible consumer education with trend reporting, profiles, reviews, and industry coverage. Source: https://www.wineenthusiast.com/about-us/
- VinePair prioritizes accessible, entertaining drinks culture, reported pieces, reader relevance, format clarity, and timely trend or issue framing; it explicitly rejects press-release writeups as a pitch model. Source: https://vinepair.com/how-to-pitch-vinepair/
- Good Beer Hunting Sightlines combines a strong hook with a "THE GIST" style opening, named sources, data points, and explainers for why beer-industry signals matter. Source: https://www.goodbeerhunting.com/sightlines/2022/12/9/ingredients-materials-begin-to-drive-up-craft-beer-prices-at-the-wrong-time
- SevenFifty Daily frames beverage trade stories around category developments, operations, science, sustainability, trend coverage, news, profiles, and ethics; its pitch guidance calls for cited facts and figures. Source: https://daily.sevenfifty.com/app/uploads/2024/06/Pitch-Guidelines_-SevenFifty-Daily.pdf
- The Spirits Business focuses on industry-relevant business news, brand updates, probing interviews, analysis, and investigative articles. Source: https://www.thespiritsbusiness.com/about/
- Punch succeeds by bridging experts and enthusiasts through behind-the-scenes perspective, insider access, and story-driven drinks culture. Source: https://www.voxmedia.com/2023/11/14/23960475/punch-celebrates-its-10-year-anniversary/
- Perfect Daily Grind uses recap and "key takeaway" patterns that help readers extract the operational signal quickly. Source: https://perfectdailygrind.com/

## Daily Sip Composition Rules

1. Attribute first.
   Start each article summary with the source name. Do not present source claims as Sip Studies facts unless independently verified by the generator.

2. Treat claims as signals, not verdicts.
   Launches, awards, acquisitions, pricing claims, and forecasts should be framed as market signals. Avoid language that sounds like endorsement, certainty, or promotion.

3. Keep the article module compact.
   Each ranked item should answer three questions:
   - What did the source report?
   - Why might it matter?
   - What should a beverage professional watch next?

4. Separate facts, context, and interpretation.
   The summary should contain the reported fact and short context. `whyItMatters` should explain relevance. `marketImpact` is displayed as "Watch next" in the UI and should remain conditional. Do not include the literal "Watch next:" prefix inside `marketImpact`; the Flavor Blog component owns that label.

5. Use a concise but memorable voice.
   The voice may be avant-garde in framing, but the claims must stay neutral. Good labels include "Rules rewrite the shelf", "Supply sets the tempo", and "Capital moves the room" because they are vivid without endorsing a side.

6. Avoid hype language.
   Avoid unsupported superlatives, promotional adjectives, and vague certainty. Prefer "may", "can", "watch", "signal", "reported", "according to", and "source trail".

7. Build trend confidence through repetition.
   A single source is enough to include an article, but not enough to call something a trend. The watchlist should ask whether a signal repeats across future scans.

8. Preserve auditability.
   Keep `sourceName`, `publishedAt`, and `url` visible. The original article link stays attached to every ranked item.

## Scheduled Path

The scheduled runner is `scripts/run-daily-sip.ps1`. It now sets and logs:

```powershell
$env:DAILY_SIP_EDITORIAL_STANDARD = "daily-sip-avant-garde-v2-2026-05"
```

The generator also defaults to that same standard if the environment variable is absent. Future scheduled reports therefore use the updated voice and carry the `editorialStandard` metadata field.
