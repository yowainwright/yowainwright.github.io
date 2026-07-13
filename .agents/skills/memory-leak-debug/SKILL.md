---
name: memory-leak-debug
description: Find and fix memory leaks. Use when user mentions memory leak, heap growth, out of memory, OOM, memory profiling, high memory usage, or process memory increasing over time.
---

# Memory Leak Debug Skill

When investigating memory leaks:

## First: Identify the Environment

Ask which runtime/language if not obvious from context:

- Node.js / Bun
- Browser JavaScript
- Go
- Python

## Node.js / Bun Memory Leaks

### Quick Profiling

```bash
# Run with heap snapshots enabled
node --expose-gc --inspect app.js

# Bun with memory tracking
bun --smol app.ts  # Reduced memory mode
```

### Common Leak Patterns

**1. Event Listener Accumulation**

```javascript
// LEAK: Listeners never removed
emitter.on("data", handler);

// FIX: Remove on cleanup
emitter.off("data", handler);
// Or use once
emitter.once("data", handler);
```

**2. Closures Holding References**

```javascript
// LEAK: Closure keeps large object alive
function process(hugeData) {
  return () => console.log(hugeData.length);
}

// FIX: Extract only what's needed
function process(hugeData) {
  const len = hugeData.length;
  return () => console.log(len);
}
```

**3. Timers Not Cleared**

```javascript
// LEAK: Interval never cleared
setInterval(poll, 1000);

// FIX: Store and clear
const id = setInterval(poll, 1000);
// On cleanup:
clearInterval(id);
```

**4. Cache Without Bounds**

```javascript
// LEAK: Cache grows forever
const cache = new Map();
function get(key) {
  if (!cache.has(key)) cache.set(key, compute(key));
  return cache.get(key);
}

// FIX: Use LRU or WeakMap
const cache = new WeakMap(); // If keys are objects
// Or implement max size
```

**5. Detached DOM Nodes**

```javascript
// LEAK: Reference to removed element
let element = document.getElementById("foo");
element.remove();
// element still holds reference

// FIX: Nullify reference
element.remove();
element = null;
```

**6. Global Variables**

```javascript
// LEAK: Implicit global
function leak() {
  leaked = "oops"; // No const/let = global
}

// FIX: Always declare
function noLeak() {
  const notLeaked = "safe";
}
```

### Heap Snapshot Analysis (Node.js)

```javascript
// Take heap snapshot programmatically
const v8 = require("v8");
const fs = require("fs");

function takeSnapshot(name) {
  const snapshotFile = `${name}-${Date.now()}.heapsnapshot`;
  const snapshot = v8.writeHeapSnapshot(snapshotFile);
  console.log(`Heap snapshot written to ${snapshot}`);
}

// Take before and after suspected leak
takeSnapshot("before");
// ... run leaky operation
takeSnapshot("after");
// Compare in Chrome DevTools
```

### Memory Usage Tracking

```javascript
// Log memory periodically
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    heapUsed: Math.round(used.heapUsed / 1024 / 1024) + "MB",
    heapTotal: Math.round(used.heapTotal / 1024 / 1024) + "MB",
    external: Math.round(used.external / 1024 / 1024) + "MB",
    rss: Math.round(used.rss / 1024 / 1024) + "MB",
  });
}, 5000);
```

### Force Garbage Collection

```javascript
// Run with --expose-gc flag
if (global.gc) {
  global.gc();
  console.log("GC forced");
}
```

## Browser JavaScript

### Chrome DevTools Workflow

1. **Memory Tab** → Take heap snapshot
2. Run suspected leaky operation multiple times
3. Take another snapshot
4. Compare snapshots → Look for growing object counts
5. Filter by "Objects allocated between Snapshot 1 and 2"

### Performance Monitor

1. **More Tools** → Performance Monitor
2. Watch "JS Heap Size" over time
3. If it grows without dropping after GC → leak

### Common Browser Leaks

```javascript
// LEAK: addEventListener without removeEventListener
window.addEventListener("resize", handler);

// LEAK: React useEffect without cleanup
useEffect(() => {
  window.addEventListener("resize", handler);
  // Missing cleanup!
}, []);

// FIX: Return cleanup function
useEffect(() => {
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);
```

## Go Memory Leaks

### Profiling with pprof

```go
import (
    "net/http"
    _ "net/http/pprof"
)

func main() {
    // Enable pprof endpoint
    go func() {
        http.ListenAndServe("localhost:6060", nil)
    }()
    // ... rest of app
}
```

```bash
# Capture heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Commands in pprof
top 10          # Top memory consumers
list funcName   # Source with annotations
web             # Visual graph (needs graphviz)
```

### Common Go Leaks

**1. Goroutine Leaks**

```go
// LEAK: Goroutine blocked forever
func leak() {
    ch := make(chan int)
    go func() {
        val := <-ch  // Blocks forever, ch never written
        fmt.Println(val)
    }()
}

// FIX: Use context for cancellation
func noLeak(ctx context.Context) {
    ch := make(chan int)
    go func() {
        select {
        case val := <-ch:
            fmt.Println(val)
        case <-ctx.Done():
            return
        }
    }()
}
```

**2. Slice Backing Array**

```go
// LEAK: Small slice holds large backing array
func leak(data []byte) []byte {
    return data[:10]  // Still references full array
}

// FIX: Copy to new slice
func noLeak(data []byte) []byte {
    result := make([]byte, 10)
    copy(result, data[:10])
    return result
}
```

**3. time.Ticker Not Stopped**

```go
// LEAK: Ticker goroutine runs forever
ticker := time.NewTicker(time.Second)
// Never call ticker.Stop()

// FIX: Always stop
ticker := time.NewTicker(time.Second)
defer ticker.Stop()
```

### Check Goroutine Count

```go
import "runtime"

fmt.Printf("Goroutines: %d\n", runtime.NumGoroutine())
```

## Python Memory Leaks

### Memory Profiling

```bash
# Install memory_profiler
pip install memory_profiler

# Run with profiling
python -m memory_profiler script.py
```

```python
# Line-by-line profiling
from memory_profiler import profile

@profile
def suspect_function():
    # ... code to profile
```

### tracemalloc (Built-in)

```python
import tracemalloc

tracemalloc.start()

# ... run code

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')

for stat in top_stats[:10]:
    print(stat)
```

### Common Python Leaks

**1. Circular References**

```python
# LEAK: Circular reference with __del__
class Node:
    def __init__(self):
        self.parent = None
        self.children = []

    def __del__(self):
        print("deleted")  # May never print

# FIX: Use weakref
import weakref

class Node:
    def __init__(self):
        self._parent = None
        self.children = []

    @property
    def parent(self):
        return self._parent() if self._parent else None

    @parent.setter
    def parent(self, node):
        self._parent = weakref.ref(node) if node else None
```

**2. Mutable Default Arguments**

```python
# LEAK: List persists across calls
def append(item, lst=[]):
    lst.append(item)
    return lst

# FIX: Use None default
def append(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```

**3. Global Collections**

```python
# LEAK: Module-level cache grows forever
_cache = {}

def get(key):
    if key not in _cache:
        _cache[key] = expensive_compute(key)
    return _cache[key]

# FIX: Use functools.lru_cache with maxsize
from functools import lru_cache

@lru_cache(maxsize=1000)
def get(key):
    return expensive_compute(key)
```

## Debugging Checklist

1. **Reproduce** - Isolate the leak to specific operation
2. **Measure** - Get baseline memory, run operation N times, measure again
3. **Profile** - Take heap snapshots before/after
4. **Identify** - Find growing objects/allocations
5. **Fix** - Apply appropriate pattern fix
6. **Verify** - Re-run measurement to confirm fix

## Output Format

When reporting findings:

1. **Suspected Location** - File and line/function
2. **Leak Type** - Which pattern it matches
3. **Evidence** - Memory growth data, snapshot comparison
4. **Fix** - Specific code change
5. **Verification** - How to confirm the fix worked
