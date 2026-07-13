---
name: performance-audit
description: Analyze code or application for performance issues. Use when user mentions "slow", "optimize", "performance issues", "speed up", "bottleneck", "latency", or asks about profiling.
---

# Performance Audit Skill

When analyzing for performance issues:

## Scope Identification

Clarify what to analyze:

- Frontend (loading, rendering, interaction)?
- Backend (API response times, database)?
- Specific function or algorithm?
- Build/bundle size?

## Quick Wins Checklist

### Frontend Performance

```markdown
□ Images optimized (format, size, lazy loading)
□ JavaScript bundle size reasonable
□ Code splitting implemented
□ No render-blocking resources
□ Caching headers configured
□ Compression enabled (gzip/brotli)
□ No layout thrashing
□ Virtualization for long lists
```

### Backend Performance

```markdown
□ Database queries optimized
□ N+1 queries eliminated
□ Appropriate indexes exist
□ Connection pooling configured
□ Caching layer (Redis) where appropriate
□ Async operations used correctly
□ No blocking I/O in hot paths
□ Pagination implemented
```

### Algorithm/Code

```markdown
□ Time complexity appropriate
□ Space complexity reasonable
□ No unnecessary iterations
□ Early exits where possible
□ Memoization for expensive calculations
□ No memory leaks
```

## Common Performance Issues

### N+1 Query Problem

```javascript
// BAD: N+1 queries
const users = await db.query("SELECT * FROM users");
for (const user of users) {
  user.orders = await db.query("SELECT * FROM orders WHERE user_id = ?", [user.id]);
}

// GOOD: Single query with join
const users = await db.query(`
  SELECT u.*, o.*
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.id
`);
```

### Missing Database Index

```sql
-- Check for slow queries
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123

-- Add index for frequent lookups
CREATE INDEX idx_orders_customer_id ON orders(customer_id)
```

### Unnecessary Re-renders (React)

```javascript
// BAD: New object every render
<Component style={{ marginTop: 10 }} />

// GOOD: Stable reference
const style = useMemo(() => ({ marginTop: 10 }), [])
<Component style={style} />

// BAD: Inline function creates new reference
<Button onClick={() => handleClick(id)} />

// GOOD: useCallback
const onClick = useCallback(() => handleClick(id), [id])
<Button onClick={onClick} />
```

### Blocking Main Thread

```javascript
// BAD: Blocks main thread
const result = heavyComputation(data);

// GOOD: Use worker
const worker = new Worker("compute-worker.js");
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);
```

### Memory Leaks

```javascript
// BAD: Event listener never removed
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);

// GOOD: Cleanup
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

### Large Bundle Size

```javascript
// BAD: Import entire library
import _ from "lodash";
_.debounce(fn);

// GOOD: Import only what you need
import debounce from "lodash/debounce";
debounce(fn);

// Or use native
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
```

## Profiling Commands

### Node.js

```bash
# CPU profiling
node --prof app.js
node --prof-process isolate-*.log > profile.txt

# Memory profiling
node --inspect app.js
# Then open chrome://inspect

# Heap snapshot
node --heap-snapshot app.js
```

### Frontend

```markdown
- Chrome DevTools Performance tab
- Lighthouse audit
- Web Vitals (LCP, FID, CLS)
- Bundle analyzer (webpack-bundle-analyzer)
```

### Database

```sql
-- PostgreSQL slow query log
ALTER SYSTEM SET log_min_duration_statement = 100;

-- Query execution plan
EXPLAIN (ANALYZE, BUFFERS) SELECT ...
```

## Metrics to Track

```markdown
### Frontend

| Metric      | Target  |
| ----------- | ------- |
| LCP         | < 2.5s  |
| FID         | < 100ms |
| CLS         | < 0.1   |
| TTI         | < 3.8s  |
| Bundle size | < 200KB |

### Backend

| Metric        | Target  |
| ------------- | ------- |
| p50 latency   | < 50ms  |
| p99 latency   | < 200ms |
| Error rate    | < 0.1%  |
| DB query time | < 10ms  |
```

## Output Format

For each finding:

### [HIGH/MEDIUM/LOW] Issue Title

**Location:** `file.ts:42`

**Impact:** What's the performance cost

**Current:**

```typescript
// Current slow code
```

**Optimized:**

```typescript
// Improved version
```

**Expected Improvement:** Estimated speedup or size reduction

## Summary Template

```markdown
## Performance Audit Summary

**Scope:** [what was analyzed]
**Date:** [date]

### Key Metrics

| Metric      | Current | Target  |
| ----------- | ------- | ------- |
| Page load   | 4.2s    | < 2s    |
| Bundle size | 450KB   | < 200KB |
| API p99     | 800ms   | < 200ms |

### Top Issues

1. [Highest impact issue]
2. [Second highest]
3. [Third]

### Quick Wins

1. [Easy fix with high impact]
2. [Easy fix with medium impact]

### Recommendations

1. [Priority recommendation]
2. [Secondary recommendation]
```

## Recommended Agents

For deeper analysis, invoke:

- `javascript-performance-expert` - JS/V8 specific optimization
- `performance-optimization-expert` - Cross-language, low-level optimization
- `database-specialist` - Query and schema optimization
