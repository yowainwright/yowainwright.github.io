<!-- Version: 2024-02-16,bac0bd8 -->

# Python Style

## Core Principles

- **Pythonic code** - Follow PEP 8 and Python idioms (list comprehensions, context managers, decorators)
- **Explicit is better than implicit** - Clear intent over clever tricks (Zen of Python)
- **Minimal and readable** - Keep solutions simple and obvious

## Function and Class Design

- **Keep functions focused** - Single-purpose functions, ideally under 20 lines
- **Prefer functions over classes** - Don't create classes when functions/modules suffice
- **Use dataclasses** - For data containers, prefer `@dataclass` over manual `__init__`
- **Type hints** - Use type annotations for function signatures and complex structures

## Pythonic Patterns

- **List/dict comprehensions** - Prefer over map/filter when readable
  ```python
  # Good
  active_users = [u for u in users if u.is_active]
  ```
- **Context managers** - Always use `with` for files and resources
- **Enumerate and zip** - Use built-ins instead of manual indexing
- **Avoid unnecessary classes** - Module-level functions are often sufficient

## Code Organization

- **Flat module structure** - Avoid deep package hierarchies
- **Avoid circular imports** - Sign of poor separation of concerns
- **Keep dependencies minimal** - Use standard library when possible
