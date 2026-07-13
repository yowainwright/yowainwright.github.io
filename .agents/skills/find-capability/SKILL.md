---
name: find-capability
description: Find agents and skills. Use when user asks what agents/skills are available, how to do something, looking for help with a specific topic, or says "what can you help with".
---

# Find Capability Skill

When helping users find the right agent or skill:

## Available Agents (60 total)

### Framework & Runtime Experts

| Agent               | Use For                                                    |
| ------------------- | ---------------------------------------------------------- |
| `bun-expert`        | Bun runtime, APIs, macros, Bun.serve, compile              |
| `quickjs-expert`    | QuickJS-NG engine, embedding JS in C, lightweight runtimes |
| `next-expert`       | Next.js App Router, RSC, Server Actions, caching           |
| `tailwind-expert`   | Tailwind v4, CSS-first config, shadcn/ui                   |
| `vite-expert`       | Vite config, plugins, SSR, library mode                    |
| `vitest-expert`     | Vitest testing, mocks, coverage, browser mode              |
| `shiki-expert`      | Syntax highlighting, transformers, themes                  |
| `database-expert`   | Raw SQL, Prisma, Drizzle, prisma-migrations                |
| `monorepo-expert`   | Turborepo, workspaces, build orchestration                 |
| `ci-cd-expert`      | GitHub Actions, releases, deployments                      |
| `api-client-expert` | Fetch patterns, TanStack Query, error handling             |
| `cli-ux-expert`     | CLI design, commander, prompts, spinners                   |

### Performance & Testing

| Agent                             | Use For                                              |
| --------------------------------- | ---------------------------------------------------- |
| `javascript-performance-expert`   | JavaScript performance, profiling, V8 optimization   |
| `performance-optimization-expert` | Cross-language performance, CPU cache, memory layout |
| `testing-expert`                  | Test strategy, coverage, mocking patterns            |
| `code-reviewer`                   | Structured code review with priorities               |

### Languages

| Agent               | Use For                                      |
| ------------------- | -------------------------------------------- |
| `go-expert`         | Idiomatic Go, concurrency, error handling    |
| `python-expert`     | Pythonic code, async, type hints             |
| `rust-expert`       | Rust ownership, borrowing, lifetimes, async  |
| `graphql-expert`    | Schema design, resolvers, federation         |
| `typescript-wizard` | Advanced TypeScript, type-level programming  |
| `css-expert`        | CSS architecture, modern layouts, animations |

### Architecture & Infrastructure

| Agent                     | Use For                                           |
| ------------------------- | ------------------------------------------------- |
| `principle-engineer`      | System design, architecture decisions             |
| `platform-engineer`       | Infrastructure, developer experience              |
| `data-access-expert`      | Repository pattern, caching, transactions         |
| `cloud-cost-expert`       | AWS/GCP cost optimization                         |
| `saas-product-strategist` | Pricing, billing, feature cost/value analysis     |
| `resiliancy-engineer`     | Fault tolerance, disaster recovery                |
| `security-engineer`       | Threat modeling, vulnerability prevention         |
| `observability-engineer`  | Logging, metrics, tracing, monitoring             |
| `docker-expert`           | Dockerfile optimization, Docker Compose, security |
| `kubernetes-expert`       | K8s resources, Helm, Kustomize, troubleshooting   |

### Development Environment

| Agent                   | Use For                              |
| ----------------------- | ------------------------------------ |
| `nvim-practical-expert` | Neovim config, plugins, Lua          |
| `jetbrains-expert`      | IntelliJ/WebStorm setup, debugging   |
| `local-devenv-expert`   | Local dev environments, Docker, Tilt |

### Backend & APIs

| Agent                             | Use For                                     |
| --------------------------------- | ------------------------------------------- |
| `nodejs-koa-expert`               | Node.js/Koa middleware, enterprise patterns |
| `fastify-performance-expert`      | High-performance Node.js with Fastify       |
| `database-specialist`             | Database design, query optimization         |
| `reactive-programming-specialist` | RxJS, observable streams, reactive patterns |

### Frontend & UI

| Agent                     | Use For                                              |
| ------------------------- | ---------------------------------------------------- |
| `react-typescript-expert` | Modern React patterns, TypeScript integration        |
| `browser-engineer`        | Browser APIs, web performance, client optimization   |
| `web-capture-specialist`  | Web scraping, automation, data extraction            |
| `accessibility-expert`    | WCAG compliance, screen readers, keyboard navigation |
| `i18n-expert`             | Internationalization, translations, RTL, formatting  |

### Writing & Content Experts

| Agent                    | Use For                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `article-writing-expert` | Technical articles, blog posts, engaging content              |
| `left-leaning-writer`    | Progressive political writing, social justice perspective     |
| `right-leaning-writer`   | Conservative political writing, classical liberal perspective |
| `humorous-writer`        | Comedy writing, satire, entertaining technical content        |
| `historian-writer`       | Historical perspective, connecting past to present            |
| `anti-neoliberal-writer` | Critiquing market fundamentalism, heterodox economics         |
| `pro-neoliberal-writer`  | Defending market institutions, liberal economics              |
| `working-class-writer`   | Labor rights, worker perspectives, economic dignity           |

### Technical Writing Experts

| Agent                        | Use For                                          |
| ---------------------------- | ------------------------------------------------ |
| `software-technical-writer`  | API docs, README, SDK documentation              |
| `engineer-technical-writer`  | Engineering specs, SOPs, hardware documentation  |
| `scientist-technical-writer` | Research papers, protocols, scientific writing   |
| `codelab-demo-expert`        | Interactive tutorials, codelabs, technical demos |

### AI/ML & Prompts

| Agent                 | Use For                                                      |
| --------------------- | ------------------------------------------------------------ |
| `ai-ml-expert`        | LLMs, embeddings, RAG, vector databases, ML integration      |
| `llm-prompt-engineer` | Prompt design, few-shot, chain-of-thought, output formatting |

### DevRel & Community

| Agent           | Use For                                                     |
| --------------- | ----------------------------------------------------------- |
| `devrel-writer` | Product launches, tutorials, newsletters, community content |

### Legal & Compliance

| Agent               | Use For                                                   |
| ------------------- | --------------------------------------------------------- |
| `compliance-writer` | Privacy policies, terms of service, GDPR/CCPA, legal docs |

### Other

| Agent                 | Use For                                  |
| --------------------- | ---------------------------------------- |
| `qa-lead`             | Testing strategy, quality assurance      |
| `tools-engineer`      | Developer tooling, automation            |
| `observablehq-expert` | Observable notebooks, data visualization |

---

## Available Skills (36 local total)

### Project Setup

| Skill           | Auto-Triggers On                               |
| --------------- | ---------------------------------------------- |
| `repo-setup`    | Verify repository defaults and structure       |
| `bun-workspace` | Scaffold monorepo with Next.js/Tailwind/shadcn |
| `github-setup`  | Set up .github folder, templates, workflows    |
| `env-setup`     | Create .env.example, validation with Zod       |

### Code Quality

| Skill                | Auto-Triggers On                            |
| -------------------- | ------------------------------------------- |
| `code-improve`       | Big-O optimization, immutability, hoisting  |
| `code-hygiene`       | Remove comments, emojis, verbose text       |
| `code-quality-check` | Comprehensive quality audit                 |
| `refactor-patterns`  | Clean up code, reduce complexity            |
| `diff-check`         | Run format/lint/build/test on changed files |
| `style-check`        | Run linters and style checks                |
| `quick-review`       | Fast staged-file bug/security review        |
| `code-reps`          | Focused code improvement reps               |
| `type-reps`          | TypeScript inference, generics, type safety |
| `bigo-check-js`      | Big-O checks for JavaScript/TypeScript      |
| `bigo-check-go`      | Big-O checks for Go                         |
| `bigo-check-python`  | Big-O checks for Python                     |

### Debugging

| Skill               | Auto-Triggers On                             |
| ------------------- | -------------------------------------------- |
| `error-diagnosis`   | Stack traces, error messages, exceptions     |
| `test-debug`        | Failing tests, parse output, find root cause |
| `memory-leak-debug` | Memory leaks, heap growth, OOM errors        |
| `bundle-analyze`    | Bundle size, bloat, tree shaking issues      |

### Database & API

| Skill             | Auto-Triggers On                       |
| ----------------- | -------------------------------------- |
| `database-query`  | SQL queries, optimization              |
| `migration-write` | Schema changes, Prisma/Drizzle/raw SQL |
| `api-design`      | REST endpoints, API structure          |

### DevOps & Git

| Skill                  | Auto-Triggers On                   |
| ---------------------- | ---------------------------------- |
| `docker-compose`       | Containers, Docker configuration   |
| `git-conflict-resolve` | Merge conflicts, rebase issues     |
| `dependency-check`     | Outdated packages, vulnerabilities |

### Workflow

| Skill                 | Auto-Triggers On                                                 |
| --------------------- | ---------------------------------------------------------------- |
| `pr-prep`             | "Ready for PR", "prepare PR", "before I commit"                  |
| `architecture-review` | "Should I use X or Y", "design review", "how should I structure" |
| `technical-writing`   | "Document this", "write docs", "create README", "write tutorial" |
| `log-work`            | Log session work to Obsidian daily notes                         |
| `thinking-reps`       | "Grill me", stress-test a plan, sharpen thinking                 |

### Product & Interface Design

| Skill        | Auto-Triggers On                                      |
| ------------ | ----------------------------------------------------- |
| `impeccable` | Frontend UI/UX design, critique, audit, polish, craft |

### Onboarding & Audits

| Skill               | Auto-Triggers On                                             |
| ------------------- | ------------------------------------------------------------ |
| `onboarding`        | "New to this repo", "explain codebase", "how does this work" |
| `security-audit`    | "Check vulnerabilities", "security review", "audit security" |
| `performance-audit` | "Slow", "optimize", "bottleneck", "speed up"                 |

### Discovery

| Skill             | Auto-Triggers On                          |
| ----------------- | ----------------------------------------- |
| `find-capability` | "What agents do you have?", "How do I..." |

---

## Official External Skills

These are synced into `.agents/skills/<namespace>/` from official upstream repos.
Claude receives a compatibility mirror from `.agents/skills`; do not maintain
separate agent-specific skill sources.
In Codex, choose the matching skill by name and read its `SKILL.md` only when
the task triggers it. In Claude, use `/load-agent-lazy <namespace>/<skill-path>`
when the skill is not already loaded.

| Namespace     | Use For                                                     |
| ------------- | ----------------------------------------------------------- |
| `matt-pocock` | Official skills from <https://github.com/mattpocock/skills> |
| `effect-ts`   | Effect TS patterns from Effect-TS                           |
| `xstate`      | XState v5 and state-management skills                       |
| `greptile`    | Greptile PR review and iterative review loop                |

Fast Matt Pocock picks:

| Need                 | Skill Path                                              |
| -------------------- | ------------------------------------------------------- |
| Router               | `matt-pocock/engineering/ask-matt`                      |
| Test-first code work | `matt-pocock/engineering/tdd`                           |
| Codebase design      | `matt-pocock/engineering/codebase-design`               |
| Architecture scan    | `matt-pocock/engineering/improve-codebase-architecture` |
| Plan grilling        | `matt-pocock/productivity/grill-me`                     |
| Reusable grilling    | `matt-pocock/productivity/grilling`                     |
| Domain modeling      | `matt-pocock/engineering/domain-modeling`               |
| Exercise scaffolding | `matt-pocock/misc/scaffold-exercises`                   |

ReactiveX/RxPY does not currently publish an official `SKILL.md` tree. For
reactive programming help, use `reactive-programming-specialist` until an
official RxPY skill source exists.

---

## Quick Reference

### "I need help with..."

| Topic                | Agent/Skill                                            |
| -------------------- | ------------------------------------------------------ |
| Bun/Deno runtime     | `bun-expert`                                           |
| Next.js App Router   | `next-expert`                                          |
| Tailwind/shadcn      | `tailwind-expert`                                      |
| Vite config/plugins  | `vite-expert`                                          |
| Vitest testing       | `vitest-expert`                                        |
| Syntax highlighting  | `shiki-expert`                                         |
| Database schema      | `database-expert` or `database-specialist`             |
| Prisma migrations    | `database-expert` + `migration-write`                  |
| Bundle too large     | `bundle-analyze`                                       |
| Tests failing        | `test-debug` or `vitest-expert`                        |
| Memory leak          | `memory-leak-debug`                                    |
| Performance issues   | `javascript-performance-expert` or `performance-audit` |
| Code review          | `code-reviewer`                                        |
| GitHub Actions       | `ci-cd-expert`                                         |
| Monorepo setup       | `monorepo-expert`                                      |
| API client           | `api-client-expert`                                    |
| CLI tool             | `cli-ux-expert`                                        |
| Go code              | `go-expert`                                            |
| Python code          | `python-expert`                                        |
| Rust code            | `rust-expert`                                          |
| TypeScript types     | `typescript-wizard`                                    |
| Merge conflict       | `git-conflict-resolve`                                 |
| Environment vars     | `env-setup`                                            |
| Docker/containers    | `docker-expert`                                        |
| Kubernetes/K8s       | `kubernetes-expert`                                    |
| Accessibility/a11y   | `accessibility-expert`                                 |
| Internationalization | `i18n-expert`                                          |
| LLM prompts          | `llm-prompt-engineer`                                  |
| New to codebase      | `onboarding`                                           |
| Security check       | `security-audit`                                       |

### "I need to write..."

| Content Type                 | Agent                        |
| ---------------------------- | ---------------------------- |
| Technical blog post          | `article-writing-expert`     |
| API documentation            | `software-technical-writer`  |
| README/SDK docs              | `software-technical-writer`  |
| Engineering specs/SOPs       | `engineer-technical-writer`  |
| Research paper/protocol      | `scientist-technical-writer` |
| Interactive tutorial/codelab | `codelab-demo-expert`        |
| Funny technical content      | `humorous-writer`            |
| Historical analysis          | `historian-writer`           |
| Progressive perspective      | `left-leaning-writer`        |
| Conservative perspective     | `right-leaning-writer`       |
| Labor/worker perspective     | `working-class-writer`       |
| Market economy defense       | `pro-neoliberal-writer`      |
| Market critique              | `anti-neoliberal-writer`     |
| Product launch/DevRel        | `devrel-writer`              |
| Privacy policy/ToS           | `compliance-writer`          |

---

## How to Use

### Agents (explicit invocation)

```bash
/agents/bun-expert "How do I set up Bun.serve with WebSocket?"
/agents/database-expert "Compare Prisma vs Drizzle for this schema"
/agents/software-technical-writer "Help me document this API"
/agents/humorous-writer "Write a funny commit message guide"
/agents/rust-expert "Explain ownership to a JS developer"
/agents/kubernetes-expert "Debug this CrashLoopBackOff"
```

### Skills (automatic)

Skills activate automatically based on context. Just describe what you need:

- "I have a memory leak in my Node app" → `memory-leak-debug` activates
- "Help me write a migration to add a column" → `migration-write` activates
- "My tests are failing with this error..." → `test-debug` activates
- "I'm new to this codebase" → `onboarding` activates
- "Check this for security issues" → `security-audit` activates

---

## Output Format

When user asks what's available:

1. **Understand intent** - What problem are they solving?
2. **Recommend specific** - Point to the right agent/skill
3. **Show usage** - How to invoke it
4. **Offer alternatives** - If multiple apply
