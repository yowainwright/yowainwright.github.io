# Agent Council Commands

This directory contains specialized agent slash commands that provide expert perspectives on your code and designs.

## Available Agents

### Architecture & System Design

- **`/agents/principle-engineer`** - Architectural vision, system design, cross-cutting concerns
- **`/agents/platform-engineer`** - Infrastructure, developer experience, operational excellence
- **`/agents/resiliancy-engineer`** - System resilience, fault tolerance, disaster recovery

### Security & Quality

- **`/agents/security-engineer`** - Threat modeling, vulnerability prevention, compliance
- **`/agents/qa-lead`** - Testing strategy, quality assurance, release confidence
- **`/agents/code-reviewer`** - Structured code reviews with prioritized feedback (critical/important/minor)
- **`/agents/testing-expert`** - Test design, coverage strategies, testing patterns and anti-patterns

### Frontend & UI

- **`/agents/react-typescript-expert`** - Modern React patterns, TypeScript integration, performance optimization
- **`/agents/browser-engineer`** - Browser APIs, web performance, client-side optimization
- **`/agents/web-capture-specialist`** - Web scraping, automation, data extraction
- **`/agents/css-expert`** - CSS architecture, modern layouts, animations
- **`/agents/tailwind-expert`** - Tailwind v4, CSS-first config, shadcn/ui

### Backend & API

- **`/agents/graphql-expert`** - GraphQL architecture, performance, security; pragmatically recommends REST/gRPC when appropriate
- **`/agents/nodejs-koa-expert`** - Node.js/Koa middleware architecture, enterprise patterns, production readiness
- **`/agents/fastify-performance-expert`** - High-performance Node.js with Fastify, benchmarking, optimization
- **`/agents/api-client-expert`** - Fetch patterns, TanStack Query, error handling

### Data & Storage

- **`/agents/data-access-expert`** - Exposing data to frontends; connects PostgreSQL, BigQuery, REST, GraphQL with caching and cost optimization
- **`/agents/database-specialist`** - Database design, query optimization, data modeling
- **`/agents/database-expert`** - Raw SQL, Prisma, Drizzle, migrations

### Developer Tools & Infrastructure

- **`/agents/cloud-cost-expert`** - Cloud cost optimization; evaluates architectures for AWS/GCP/Azure cost efficiency
- **`/agents/codesandbox-expert`** - CodeSandbox environments from GitHub repos; backend CLIs (Go, Python, Mojo, Node) with web UI execution
- **`/agents/jetbrains-expert`** - JetBrains IDE power user; shortcuts, features, plugins, and optimization across the suite
- **`/agents/local-devenv-expert`** - Local development environments for distributed systems, Tilt, Docker, Kubernetes
- **`/agents/nvim-practical-expert`** - Practical Neovim/Lazy.nvim setup for users who prefer familiar IDE-like shortcuts
- **`/agents/tools-engineer`** - Developer tooling, automation, workflow optimization
- **`/agents/ci-cd-expert`** - GitHub Actions, releases, deployments
- **`/agents/monorepo-expert`** - Turborepo, workspaces, build orchestration
- **`/agents/cli-ux-expert`** - CLI design, commander, prompts, spinners

### Observability & Monitoring

- **`/agents/observability-engineer`** - Logging, metrics, tracing, monitoring

### Performance

- **`/agents/performance-optimization-expert`** - Low-level performance across languages: CPU cache, SIMD, branchless code, memory layout, compiler tricks
- **`/agents/javascript-performance-expert`** - V8 optimization, memory management, profiling, making JavaScript blazingly fast

### Language & Framework Specialists

- **`/agents/bun-expert`** - Bun runtime, APIs, macros, Bun.serve, compile
- **`/agents/next-expert`** - Next.js App Router, RSC, Server Actions, caching
- **`/agents/vite-expert`** - Vite config, plugins, SSR, library mode
- **`/agents/vitest-expert`** - Vitest testing, mocks, coverage, browser mode
- **`/agents/shiki-expert`** - Syntax highlighting, transformers, themes
- **`/agents/go-expert`** - Go expert with JS/TS background, bridges concepts between ecosystems
- **`/agents/python-expert`** - Python expert with JS/TS background, bridges concepts between ecosystems
- **`/agents/high-performance-python-expert`** - Making Python fast; NumPy, Numba, Cython, Mojo, Julia, Polars, profiling
- **`/agents/typescript-wizard`** - Advanced TypeScript patterns, type-level programming
- **`/agents/reactive-programming-specialist`** - Reactive patterns, RxJS, observable streams
- **`/agents/observablehq-expert`** - Observable notebooks, data visualization

### Product & Strategy

- **`/agents/saas-product-strategist`** - Feature cost vs value analysis; bridges product, engineering, and business decisions

### Writing & Content Experts (NEW)

- **`/agents/article-writing-expert`** - Technical articles, blog posts, engaging content inspired by CSS-Tricks, Josh Comeau, Addy Osmani
- **`/agents/humorous-writer`** - Comedy writing, satire, absurdist technical humor (Douglas Adams, The Onion style)
- **`/agents/historian-writer`** - Historical perspective, connecting past to present, narrative history
- **`/agents/left-leaning-writer`** - Progressive political writing, social justice, economic justice perspective
- **`/agents/right-leaning-writer`** - Conservative political writing, classical liberal, free market perspective
- **`/agents/anti-neoliberal-writer`** - Critiquing market fundamentalism, heterodox economics
- **`/agents/pro-neoliberal-writer`** - Defending market institutions, evidence-based policy
- **`/agents/working-class-writer`** - Labor rights, worker perspectives, economic dignity

### Technical Writing Experts (NEW)

- **`/agents/software-technical-writer`** - API documentation, READMEs, SDK docs, tutorials (Stripe docs style)
- **`/agents/engineer-technical-writer`** - Engineering specs, SOPs, hardware documentation, protocols
- **`/agents/scientist-technical-writer`** - Research papers, methods protocols, scientific writing (IMRaD format)
- **`/agents/codelab-demo-expert`** - Interactive tutorials, codelabs, technical demos (Google Codelabs style)

## Usage

Single agent:

```
/agents/principle-engineer
[Paste code or describe design]
```

Multiple agents for complex decisions:

```
/agents/principle-engineer
/agents/security-engineer
[Describe system design]
```

Writing tasks:

```
/agents/software-technical-writer
"Help me document this API endpoint"

/agents/humorous-writer
"Write a funny README for my side project"

/agents/codelab-demo-expert
"Create a step-by-step tutorial for this feature"
```
