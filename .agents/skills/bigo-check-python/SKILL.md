---
name: bigo-check-python
description: Analyze Python code for Big-O complexity issues. Use when user asks to check performance, find O(n²) patterns, or optimize loops in Python.
---

# Big-O Check - Python

Scan Python files for common algorithmic inefficiencies.

## Usage

```
/bigo-check-python src/utils.py
/bigo-check-python src/**/*.py
```

## Anti-Patterns to Detect

### O(n²) - Critical

#### 1. `in` check on list inside loop

```python
# BAD: O(n²) - list membership is O(n)
result = [x for x in items if x in allowed_list]

for item in items:
    if item in other_list:  # O(n) each time
        process(item)

# GOOD: O(n) - set membership is O(1)
allowed_set = set(allowed_list)
result = [x for x in items if x in allowed_set]

other_set = set(other_list)
for item in items:
    if item in other_set:  # O(1)
        process(item)
```

#### 2. `list.index()` in loop

```python
# BAD: O(n²)
for item in items:
    idx = other_list.index(item)  # O(n) each time
    # use idx

# GOOD: O(n)
index_map = {v: i for i, v in enumerate(other_list)}
for item in items:
    idx = index_map[item]  # O(1)
    # use idx
```

#### 3. Nested list comprehensions with search

```python
# BAD: O(n²)
matches = [
    (a, b) for a in list_a
    for b in list_b if a.id == b.ref_id
]

# GOOD: O(n)
b_by_ref = {b.ref_id: b for b in list_b}
matches = [(a, b_by_ref[a.id]) for a in list_a if a.id in b_by_ref]
```

#### 4. Repeated linear search

```python
# BAD: O(n) each call, O(n²) total
def get_user(user_id):
    return next((u for u in users if u.id == user_id), None)

for order in orders:
    user = get_user(order.user_id)  # O(n) each time

# GOOD: O(1) each call
users_by_id = {u.id: u for u in users}
def get_user(user_id):
    return users_by_id.get(user_id)

for order in orders:
    user = get_user(order.user_id)  # O(1)
```

### O(n) - Warning

#### 5. String concatenation in loop

```python
# BAD: O(n²) - strings are immutable
result = ""
for item in items:
    result += item.name + ", "

# GOOD: O(n)
result = ", ".join(item.name for item in items)

# ALSO GOOD: list then join
parts = []
for item in items:
    parts.append(item.name)
result = ", ".join(parts)
```

#### 6. List concatenation in loop

```python
# BAD: O(n²) - creates new list each time
result = []
for item in items:
    result = result + item.children  # new list!

# GOOD: O(n)
result = []
for item in items:
    result.extend(item.children)

# ALSO GOOD: list comprehension
result = [child for item in items for child in item.children]
```

#### 7. Repeated dict access

```python
# BAD: 3 lookups
if config["timeout"]:
    timeout = config["timeout"]
    print(f"timeout: {config['timeout']}")

# GOOD: 1 lookup
timeout = config.get("timeout")
if timeout:
    print(f"timeout: {timeout}")
```

#### 8. Creating set/dict inside loop

```python
# BAD: O(n²) - recreates set each iteration
for item in items:
    if item in set(allowed):  # O(n) to create set
        process(item)

# GOOD: O(n) - create once
allowed_set = set(allowed)
for item in items:
    if item in allowed_set:
        process(item)
```

## Output Format

```markdown
## Big-O Analysis: src/utils.py

### Critical (O(n²))

| Line | Pattern               | Fix                  |
| ---- | --------------------- | -------------------- |
| 23   | `in list` inside loop | Convert to `set`     |
| 56   | `.index()` in loop    | Build `dict` mapping |

### Warning (O(n) avoidable)

| Line | Pattern               | Fix             |
| ---- | --------------------- | --------------- |
| 78   | `+=` string in loop   | Use `''.join()` |
| 92   | `list + list` in loop | Use `.extend()` |

### Suggested Refactor

\`\`\`python

# Line 23: Replace

result = [x for x in items if x in allowed_list]

# With

allowed_set = set(allowed_list)
result = [x for x in items if x in allowed_set]
\`\`\`
```

## Grep Patterns

```bash
# in list (not set/dict) inside comprehension or loop
rg 'if \w+ in \w+_list' --type py
rg 'for.*in.*:' --type py -A 3 | rg 'if.*in \w+\['

# .index() usage
rg '\.index\(' --type py

# String concatenation
rg '\+=' --type py | rg "str|'|\""

# List concatenation
rg '= .* \+ ' --type py | rg '\[\]'
```
