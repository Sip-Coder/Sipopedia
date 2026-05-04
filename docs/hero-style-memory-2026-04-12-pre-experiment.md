# Hero Baseline Memory (Pre-Experiment)

Date: 2026-04-12
Context: Workspace hero style before testing "less bulky header + right-side vertical House Brands".

## Source Files
- `src/App.tsx`
- `src/styles.css`

## Current Hero Structure (Workspace Expanded)
- Main hero container class: `hero hero-brand expanded`
- Layout flow:
1. Sip Studies seal
2. Sip Studies wordmark + subtitle + body copy
3. House Brands section below with 3 logos in a row

## Current Key Sizing/Placement
- `.workspace-shell .hero-brand.expanded`
  - `padding: 1.2rem 1.1rem`
  - `border-radius: 20px`
- `.workspace-shell .hero-brand.expanded .hero-brand-seal`
  - `max-width: 187px`
- `.workspace-shell .hero-brand.expanded .hero-wordmark`
  - `width: min(372px, 88%)`
- `.workspace-shell .hero-brand.expanded .hero-subtitle`
  - `font-size: clamp(0.94rem, 1.6vw, 1.2rem)`
- `.workspace-shell .hero-brand.expanded .hero-brand-copy`
  - `width: min(620px, 100%)`
- `.workspace-shell .hero-brand.expanded .hero-brand-copy p`
  - `margin-top: 0.28rem`
  - `font-size: 0.86rem`
  - `line-height: 1.35`
- `.workspace-shell .hero-brand.expanded .hero-brand-house-row`
  - `margin-top: 0.45rem`
- `.workspace-shell .hero-brand.expanded .hero-logos-card`
  - `padding: 0.35rem`
  - `border: 0`
- `.workspace-shell .hero-brand.expanded .hero-logo-row`
  - `grid-template-columns: repeat(3, minmax(112px, 141px))`
  - `gap: 0.3rem`
  - `justify-content: center`
- `.workspace-shell .hero-brand.expanded .brand-house-btn`
  - `max-width: 141px`

## Current Content Labels
- Section title: `House Brands`
- Brand order:
1. Sip Studios
2. Ai RnD
3. Somm Support

