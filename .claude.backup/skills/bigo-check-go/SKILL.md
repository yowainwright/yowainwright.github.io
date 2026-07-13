---
name: bigo-check-go
description: Analyze Go code for Big-O complexity issues. Use when user asks to check performance, find O(n²) patterns, or optimize loops in Go.
---

# Big-O Check - Go

Scan Go files for common algorithmic inefficiencies.

## Usage

```
/bigo-check-go cmd/server/main.go
/bigo-check-go ./...
```

## Anti-Patterns to Detect

### O(n²) - Critical

#### 1. Linear search in loop

```go
// BAD: O(n²)
for _, order := range orders {
    for _, user := range users {
        if user.ID == order.UserID {
            // process
            break
        }
    }
}

// GOOD: O(n)
usersByID := make(map[string]*User, len(users))
for _, user := range users {
    usersByID[user.ID] = user
}
for _, order := range orders {
    user := usersByID[order.UserID]
    // process
}
```

#### 2. slices.Contains in loop

```go
// BAD: O(n²)
var result []string
for _, item := range items {
    if slices.Contains(allowed, item) {
        result = append(result, item)
    }
}

// GOOD: O(n)
allowedSet := make(map[string]struct{}, len(allowed))
for _, a := range allowed {
    allowedSet[a] = struct{}{}
}
var result []string
for _, item := range items {
    if _, ok := allowedSet[item]; ok {
        result = append(result, item)
    }
}
```

#### 3. Nested range loops

```go
// BAD: O(n²)
for i, a := range items {
    for j, b := range items {
        if i != j && a.Category == b.Category {
            // found match
        }
    }
}

// GOOD: O(n)
byCategory := make(map[string][]*Item)
for _, item := range items {
    byCategory[item.Category] = append(byCategory[item.Category], item)
}
for _, group := range byCategory {
    // process items in same category
}
```

### O(n) - Warning

#### 4. Append without pre-allocation

```go
// BAD: multiple reallocations
var result []string
for _, item := range items {
    result = append(result, item.Name)
}

// GOOD: single allocation
result := make([]string, 0, len(items))
for _, item := range items {
    result = append(result, item.Name)
}

// BETTER: direct assignment
result := make([]string, len(items))
for i, item := range items {
    result[i] = item.Name
}
```

#### 5. String concatenation in loop

```go
// BAD: O(n²) - creates new string each iteration
var result string
for _, item := range items {
    result += item.Name + ", "
}

// GOOD: O(n)
var sb strings.Builder
for _, item := range items {
    sb.WriteString(item.Name)
    sb.WriteString(", ")
}
result := sb.String()

// ALSO GOOD: strings.Join
names := make([]string, len(items))
for i, item := range items {
    names[i] = item.Name
}
result := strings.Join(names, ", ")
```

#### 6. Repeated []byte to string conversion

```go
// BAD: allocates each time
for _, data := range chunks {
    process(string(data))  // allocation
    process(string(data))  // another allocation
}

// GOOD: convert once
for _, data := range chunks {
    s := string(data)
    process(s)
    process(s)
}
```

#### 7. Repeated map lookups

```go
// BAD: 3 lookups
if config["timeout"] != "" {
    timeout := config["timeout"]
    log.Printf("timeout: %s", config["timeout"])
}

// GOOD: 1 lookup
if timeout, ok := config["timeout"]; ok && timeout != "" {
    log.Printf("timeout: %s", timeout)
}
```

## Output Format

```markdown
## Big-O Analysis: cmd/server/main.go

### Critical (O(n²))

| Line | Pattern               | Fix                  |
| ---- | --------------------- | -------------------- |
| 89   | Nested range loops    | Build map for lookup |
| 134  | Linear search in loop | Use map[K]V          |

### Warning (O(n) avoidable)

| Line | Pattern                 | Fix                 |
| ---- | ----------------------- | ------------------- |
| 45   | append without capacity | `make([]T, 0, len)` |
| 67   | string concat in loop   | `strings.Builder`   |

### Suggested Refactor

\`\`\`go
// Line 89: Replace nested loop
usersByID := make(map[string]\*User, len(users))
for \_, u := range users {
usersByID[u.ID] = u
}
\`\`\`
```

## Grep Patterns

```bash
# Nested range loops
rg 'for.*range' --type go -A 5 | rg 'for.*range'

# slices.Contains usage (potential issue if in loop)
rg 'slices\.Contains' --type go

# String concat with +=
rg '\+=' --type go | rg 'string'

# append without make
rg 'var \w+ \[\]' --type go
```
