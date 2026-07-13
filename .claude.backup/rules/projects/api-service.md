# API Service Rules

## REST Conventions

### HTTP Methods
| Method | Use For | Idempotent |
|--------|---------|------------|
| GET | Read resources | Yes |
| POST | Create resources | No |
| PUT | Replace resources | Yes |
| PATCH | Partial update | Yes |
| DELETE | Remove resources | Yes |

### URL Structure
```
GET    /api/users          # List users
GET    /api/users/:id      # Get user
POST   /api/users          # Create user
PUT    /api/users/:id      # Replace user
PATCH  /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

### Response Format
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      { "field": "email", "message": "Must be valid email" }
    ]
  }
}
```

## Error Handling

- Return appropriate HTTP status codes
- Never expose internal error details to clients
- Log full error context server-side
- Use error codes for programmatic handling

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Server Error |

## Logging

- Log request ID for tracing
- Log user ID (if authenticated)
- Log timing information
- Never log passwords, tokens, or PII

## Validation

- Validate all input at API boundary
- Use schema validation (Zod, Joi)
- Return detailed validation errors
- Sanitize input before processing
