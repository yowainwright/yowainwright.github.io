---
name: database-query
description: Write and optimize database queries. Use when user asks about SQL, queries, database performance, indexes, or data modeling.
---

# Database Query Skill

When working with databases:

## Query Best Practices

- Always use parameterized queries (never string concatenation)
- Select only needed columns (avoid `SELECT *`)
- Use appropriate JOINs (INNER vs LEFT vs EXISTS)
- Limit results when possible

## Performance Optimization

1. **Check indexes** - Columns in WHERE, JOIN, ORDER BY
2. **Avoid N+1** - Use JOINs or batch queries
3. **Use EXPLAIN** - Analyze query plans
4. **Limit scans** - Add WHERE clauses early

## Common Patterns

### Pagination

```sql
-- Offset (simple, slower for large offsets)
SELECT * FROM users ORDER BY id LIMIT 20 OFFSET 40;

-- cursor pagination (faster for large datasets)
SELECT * FROM users WHERE id > :last_id ORDER BY id LIMIT 20;
```

### Aggregation

```sql
SELECT status, COUNT(*) as count
FROM orders
WHERE created_at > :date
GROUP BY status;
```

### Upsert

```sql
-- PostgreSQL
INSERT INTO users (email, name) VALUES (:email, :name)
ON CONFLICT (email) DO UPDATE SET name = :name;
```

## Security Rules

- Never interpolate user input into queries
- Use prepared statements / parameterized queries
- Limit query permissions (read-only where possible)
- Log slow queries, not query contents

## Output Format

- Query with explanation
- Index recommendations if relevant
- Performance considerations
- Security notes
