# [Jeffry\.in](https://jeffry.in) 🥤

[![CodeFactor](https://www.codefactor.io/repository/github/yowainwright/yowainwright.github.io/badge)](https://www.codefactor.io/repository/github/yowainwright/yowainwright.github.io)
[![DeepScan grade](https://deepscan.io/api/teams/8416/projects/10577/branches/148587/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8416&pid=10577&bid=148587)

---

> **[Jeffry\.in](https://jeffry.in)** is my (Jeff Wainwright's) webpage.

## About

I'm a husband, dad, & [software engineer](https://jeffry.in). When I'm not writing code, I enjoy fitness activities.<br>[Surfing](https://www.instagram.com/p/BrlE4oSnF05/) and [running](https://www.strava.com/athletes/722335) are my current favorites.

I write articles on my blog, [Jeffry.in](https://jeffry.in), & have written articles for [CSS-Tricks](https://css-tricks.com/?s=yowainwright).<br>
I've presented at [JS.LA](https://www.youtube.com/watch?v=8YQ8BGSOsyE) on the benefits of CI/CD tools.

I'm currently a  at [Tenex.ai](https://tenex.ai), working on AI SOC as a Staff Software Engineer.

## Former Work

Formally, I've worked at/on:

- **[Lokker](https://lokker.com/):** Principal Software Engineer, architected frontend, middleware, and ingestions systems improving website privacy
- **[GoodRx](https://www.goodrx.com/):** Senior Software Engineer II, architected developer tools and worked on privacy & security tools in TypeScript, Go, & Python
- **Currency:** Built fullstack payment systems for the frontend
- **[Dollar Shave Club](https://www.dollarshaveclub.com/):** Led building [dynamic landing pages](https://www.dollarshaveclub.com/join/shave-set) with Contentful and React
- **[Billboard](https://www.billboard.com/):** Built frontend of Headless CMS using Backbone and jQuery
- **[The Hollywood Reporter](https://www.hollywoodreporter.com/):** Same as Billboard
- **[California Psychics](https://www.californiapsychics.com/):** Built responsive UI using jQuery and CSS
- **[Nasdaq](https://www.nasdaq.com/):** Built UI using jQuery and CSS

## Runtime and static hosting

The default build uses [Vinext](https://github.com/cloudflare/vinext) with React
on the server and in the browser. Existing `next/*` imports stay.
GitHub Pages deploys the static export from `dist/client/`.

Development uses mprocs, pinned in `mise.toml`. Run `mise install` once before
starting the development processes on a new machine.

```sh
pnpm run build:local
pnpm run test:runtime
pnpm run dev
```

`build:local` generates CSS, search data, feeds, and sitemap before exporting.
`build` also refreshes AI pricing. `build:vinext` only bundles existing generated
assets. `dev:next` remains available for comparison.

Browser tests cover theme hydration, search, static and dynamic navigation,
browser history, metadata, charts, and code-copy controls. Third-party requests
are blocked; live Firebase, Sentry, and Giscus services require separate checks.
CI runs these tests against the static export using its installed Chrome.

To test an already running development server without starting another server:

```sh
RUNTIME_SITE_URL=http://localhost:34730 pnpm run test:runtime
```

Development SSR loads the CommonJS and Node-specific dependencies listed in
`vite.config.ts` through Node. This avoids evaluating their `require`, `module`,
and `exports` statements as ES modules. Production bundling remains unchanged.

Sentry client initialization uses `instrumentation-client.ts`. The
[Sentry Vite plugin](https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/)
uploads hidden source maps only in CI when `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and
`SENTRY_PROJECT` are present, then deletes map files. Client reporting requires
`NEXT_PUBLIC_SENTRY_DSN`. Next.js build-plugin auto-instrumentation is not used.

An initial cold-browser homepage comparison requested approximately 132 KiB of
gzipped JavaScript with Next and 116 KiB with Vinext + Redact. That comparison
predates the Sentry client entry point; it is not a current performance score or
a measurement of Core Web Vitals.
