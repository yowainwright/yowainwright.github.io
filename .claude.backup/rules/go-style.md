<!-- Version: 2024-02-16,bac0bd8 -->

# Go Style

## Core Principles

- **Idiomatic Go** - Follow standard Go conventions and community patterns
- **Minimal and explicit** - Avoid over-engineering, keep solutions simple
- **Strict separation of concerns** - Clear boundaries between layers

## Architecture

- **Keep handlers thin** - HTTP handlers should only handle HTTP concerns (parsing, validation, response)
- **Business logic in services** - Domain logic belongs in service layer, not handlers
- **Explicit error handling** - Always handle errors explicitly, never ignore them
- **Small, focused functions** - Like JavaScript, keep functions single-purpose

## Error Handling

```go
// Always handle errors
result, err := doSomething()
if err != nil {
    return fmt.Errorf("doSomething failed: %w", err)
}
```

## Naming

- Short, clear variable names
- Receivers: single letter matching type (`func (s *Server) Handle()`)
- Interfaces: `-er` suffix when possible (`Reader`, `Writer`)
