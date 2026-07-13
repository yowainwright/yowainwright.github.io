---
name: api-design
description: Design REST or GraphQL APIs. Use when user asks about endpoints, API structure, request/response formats, or API best practices.
---

# API Design Skill

When designing APIs:

## REST Principles

- Use nouns for resources (`/users`, `/orders`)
- HTTP verbs for actions (GET, POST, PUT, DELETE, PATCH)
- Consistent naming (plural nouns, kebab-case)
- Proper status codes (200, 201, 400, 401, 403, 404, 500)

## Request Design

- Query params for filtering/pagination (`?page=1&limit=20`)
- Path params for resource IDs (`/users/:id`)
- Body for complex data (POST/PUT/PATCH)
- Headers for metadata (auth, content-type)

## Response Design

```json
{
  "data": {},
  "meta": { "page": 1, "total": 100 },
  "errors": []
}
```

## Security Considerations

- Input validation on all endpoints
- Rate limiting headers
- Authentication required by default
- No sensitive data in URLs or logs

## Pagination

- cursor-based for large datasets
- Offset-based for simple cases
- Always include `next`/`prev` links

## Versioning

- URL path (`/v1/users`) - most common
- Header (`Accept: application/vnd.api+json;version=1`)

## Output Format

- Endpoint definition with method and path
- Request/response examples
- Error cases and codes
- Security requirements
