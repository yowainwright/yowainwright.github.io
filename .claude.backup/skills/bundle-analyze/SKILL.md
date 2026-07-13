---
name: bundle-analyze
description: Analyze JavaScript bundle size. Use when user mentions bundle size, bundle analysis, large bundles, slow loading, tree shaking, or code splitting.
---

# Bundle Analyze Skill

When helping analyze and optimize bundle size:

## Quick Analysis Commands

### Bun

```bash
# Build with analysis
bun build ./src/index.ts --outdir ./dist --minify --analyze

# Check bundle size
ls -lh dist/
```

### Next.js

```bash
# Enable bundle analyzer
ANALYZE=true bun run build

# Install if needed
bun add -D @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // your config
});
```

### Vite

```bash
# Install analyzer
bun add -D rollup-plugin-visualizer

# Build with stats
bun run build
```

```typescript
// vite.config.ts
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

### Webpack

```bash
# Generate stats
webpack --profile --json > stats.json

# Analyze with webpack-bundle-analyzer
npx webpack-bundle-analyzer stats.json
```

---

## Common Bloat Sources

### Large Dependencies

| Package    | Size  | Alternative                               |
| ---------- | ----- | ----------------------------------------- |
| moment     | 290kb | date-fns (tree-shakable), dayjs (2kb)     |
| lodash     | 70kb  | lodash-es (tree-shakable), native methods |
| axios      | 13kb  | fetch (native), ky (3kb)                  |
| uuid       | 9kb   | crypto.randomUUID() (native)              |
| classnames | 1kb   | clsx (0.5kb)                              |

### Check Package Size

```bash
# Check size before installing
bunx bundle-phobia-cli lodash
bunx bundle-phobia-cli date-fns

# Or use bundlephobia.com
```

---

## Tree Shaking Issues

### Named vs Default Exports

```typescript
// Bad - imports entire library
import _ from "lodash";
_.map(items, fn);

// Good - tree-shakable
import { map } from "lodash-es";
map(items, fn);

// Best - use native
items.map(fn);
```

### Barrel Files Problem

```typescript
// components/index.ts (barrel)
export { Button } from "./Button";
export { Card } from "./Card";
export { Modal } from "./Modal"; // Large component

// Bad - imports all through barrel
import { Button } from "@/components"; // Pulls in Modal too!

// Good - direct import
import { Button } from "@/components/Button";
```

### Side Effects

```json
// package.json - mark as side-effect-free
{
  "sideEffects": false
}

// Or specify files with side effects
{
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}
```

---

## Code Splitting

### Dynamic Imports

```typescript
// Split heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyChart />
    </Suspense>
  )
}
```

### Route-Based Splitting (Next.js)

```typescript
// app/dashboard/page.tsx
// Already code-split by default in App Router

// For heavy client components
'use client'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/Chart'), {
  loading: () => <Skeleton />,
  ssr: false,  // Client-only
})
```

### Library Splitting

```typescript
// Only load when needed
const loadPdfLib = () => import("pdf-lib");

async function generatePdf() {
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.create();
  // ...
}
```

---

## Optimization Strategies

### 1. Audit Dependencies

```bash
# List all dependencies with sizes
bunx depcheck

# Find duplicates
bunx duplicate-package-checker-webpack-plugin

# Check for unused deps
bunx depcheck
```

### 2. Replace Heavy Libraries

```typescript
// Before: moment (290kb)
import moment from "moment";
moment().format("YYYY-MM-DD");

// After: native Intl (0kb)
new Intl.DateTimeFormat("en-CA").format(new Date());

// Or date-fns (tree-shakable)
import { format } from "date-fns";
format(new Date(), "yyyy-MM-dd");
```

### 3. Optimize Images

```typescript
// next/image auto-optimizes
import Image from 'next/image'

<Image
  src="/hero.jpg"
  width={800}
  height={600}
  placeholder="blur"
/>
```

### 4. Font Optimization

```typescript
// next/font - zero layout shift
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
```

### 5. Environment-Specific Code

```typescript
// Remove from production bundle
if (process.env.NODE_ENV === "development") {
  // Dev-only code - stripped in production
  enableDevTools();
}
```

---

## Size Budgets

### Set Limits

```javascript
// next.config.js
module.exports = {
  experimental: {
    outputFileTracingExcludes: {
      "*": ["node_modules/@swc/**/*"],
    },
  },
};
```

```javascript
// vite.config.ts - warn on large chunks
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 500, // kb
  },
});
```

### CI Size Check

```yaml
# .github/workflows/size.yml
- name: Check bundle size
  run: |
    bun run build
    SIZE=$(du -sb dist | cut -f1)
    MAX=500000  # 500kb
    if [ $SIZE -gt $MAX ]; then
      echo "Bundle too large: $SIZE bytes"
      exit 1
    fi
```

---

## Analysis Report Template

When analyzing a bundle:

```markdown
## Bundle Analysis Report

### Total Size

- Raw: X MB
- Gzipped: X KB
- Brotli: X KB

### Largest Dependencies

1. package-a (XXkb) - [reason/alternative]
2. package-b (XXkb) - [reason/alternative]

### Issues Found

- [ ] Duplicate packages
- [ ] Non-tree-shakable imports
- [ ] Large unoptimized images
- [ ] Unused dependencies

### Recommendations

1. Replace X with Y (save ~XXkb)
2. Dynamic import Z component
3. Remove unused dependency W
```

## Output Format

When analyzing bundles:

1. **Show current size** - Total and per-chunk
2. **Identify largest** - Top 5 dependencies
3. **Find issues** - Duplicates, bad imports
4. **Recommend fixes** - Specific replacements
5. **Estimate savings** - Size reduction expected
