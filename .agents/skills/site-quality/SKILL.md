---
name: site-quality
description: Review and fix this static Next.js blog's metadata, crawlability, image delivery, and measured page performance. Use for technical SEO, broken social previews, or page speed work in this repository.
---

# Site quality

Use repository evidence and primary documentation. NotFair's
[SEO](https://github.com/nowork-studio/notfair-plugin/blob/main/seo/seo-analysis/WORKFLOW.md)
and [image review](https://github.com/nowork-studio/notfair-plugin/blob/main/seo/image-seo/WORKFLOW.md)
workflows are references only. Do not install them, execute their scripts, or
connect marketing services as part of this skill.

## Establish the failure

Read relevant source, git status, recent history, and related issues/PRs.
Inspect `pages/`, `lib/components/OgMeta/`, `next.config.mjs`, and
`scripts/rss/` for metadata or crawlability work. Inspect actual imported
components and generated chunks before proposing JavaScript changes.

Sample home, archive, one Markdown post, and one MDX post. Treat `out/` as a
possibly stale artifact until a current build succeeds. For each route check:

- One descriptive title, one description, and one absolute canonical matching
  the configured trailing-slash convention.
- Open Graph and Twitter images exist, with accurate dimensions. Verify local
  paths against `public/` and `out/`; check external resources when needed.
- JSON-LD parses and describes the visible page. Do not fabricate modification
  dates, rankings, traffic, or search benefits.
- Sitemap URLs resolve to exported pages and robots rules permit intended access.
- Image dimensions or aspect ratios reserve space; responsive sources match the
  layout. Verify intrinsic dimensions before writing width and height.

This project's MDX compiler removes JavaScript expressions, including inline
style objects. Put responsive image styling in the existing SCSS and verify
computed dimensions on mobile rather than trusting the MDX source alone.

## Make a narrow fix

Use `code-improve` and its required confirmation before editing; reuse an
existing agreement. Prefer native Next.js features and existing Imgix delivery.
Keep metadata elements directly inside `next/head` or a single array/fragment,
following [Next.js Head](https://nextjs.org/docs/pages/api-reference/components/head).
Check direct requests and client navigation; a mocked Head component does
not establish navigation correctness.

Identify the actual largest visible element before changing load priority.
Follow [LCP guidance](https://web.dev/articles/optimize-lcp): keep below-fold
images lazy, and avoid lazy-loading the LCP image. Do not make every image eager
or add caches, preloads, dependencies, or architecture based on bundle size alone.

## Verify the result

Use installed tools; do not run package installation or the skill installer
merely to validate a site fix. Run focused regression tests, type checking, and
configured lint/legibility checks. `node_modules/.bin/next build` creates the
production export without the network-driven pricing update in `build`.
Reinspect generated HTML and image paths after that build. Validate metadata
after navigating from home to a post and between posts with the real head manager.

For performance claims, compare the same routes, viewport, cache state, and
network/CPU settings. Separate raw/gzipped asset sizes, lab LCP/CLS, and field
LCP/INP/CLS. List missing measurements instead of inventing scores or gains.
Report concrete failures fixed, checks passed, and remaining gaps briefly.
