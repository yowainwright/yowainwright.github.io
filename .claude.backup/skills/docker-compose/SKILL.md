---
name: docker-compose
description: Work with Docker and docker-compose. Use when user asks about containers, Docker configuration, docker-compose setup, or containerization.
---

# Docker Compose Skill

When working with Docker:

## Dockerfile Best Practices

- Use specific base image tags (not `latest`)
- Order layers from least to most frequently changed
- Combine RUN commands to reduce layers
- Use multi-stage builds for smaller images
- Don't run as root in production

## docker-compose.yml Patterns

### Basic Service

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules # Exclude node_modules
    depends_on:
      - db
```

### Database Service

```yaml
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### Development Overrides

```yaml
# docker-compose.override.yml (auto-loaded)
services:
  app:
    volumes:
      - .:/app
    command: npm run dev
```

## Common Commands

```bash
docker-compose up -d          # Start detached
docker-compose logs -f app    # Follow logs
docker-compose exec app sh    # Shell into container
docker-compose down -v        # Stop and remove volumes
docker-compose build --no-cache  # Rebuild from scratch
```

## Security

- Never put secrets in Dockerfiles
- Use `.env` files (not committed)
- Scan images for vulnerabilities
- Use read-only volumes where possible
