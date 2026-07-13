---
name: env-setup
description: Set up environment variables. Use when user mentions .env, environment variables, config setup, secrets management, or needs to document configuration.
---

# Environment Setup Skill

When helping set up environment configuration:

## Create .env.example

Document all required environment variables without real values:

```bash
# .env.example

# =============================================================================
# Application
# =============================================================================
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# =============================================================================
# Database
# =============================================================================
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# =============================================================================
# Authentication
# =============================================================================
# Generate with: openssl rand -base64 32
JWT_SECRET=your-secret-here
SESSION_SECRET=your-session-secret

# OAuth (optional)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# =============================================================================
# External Services
# =============================================================================
# API keys for third-party services
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...

# =============================================================================
# Feature Flags
# =============================================================================
ENABLE_ANALYTICS=false
ENABLE_RATE_LIMITING=true
```

## Validation with Zod

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  // Database
  DATABASE_URL: z.string().url(),

  // Auth
  JWT_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().min(32),

  // Optional OAuth
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // External Services
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  SENDGRID_API_KEY: z.string().startsWith("SG").optional(),

  // Feature Flags
  ENABLE_ANALYTICS: z.coerce.boolean().default(false),
  ENABLE_RATE_LIMITING: z.coerce.boolean().default(true),
});

// Validate at startup
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

// Type-safe access
export type Env = z.infer<typeof envSchema>;
```

## Next.js Configuration

```typescript
// env.ts for Next.js (client + server split)
import { z } from "zod";

// Server-only variables
const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
});

// Client-safe variables (NEXT_PUBLIC_ prefix)
const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
});

// Validate server env (only runs on server)
export const serverEnv = serverSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
});

// Validate client env
export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});
```

## Platform-Specific Patterns

### Vercel

```bash
# .env.local (gitignored, local development)
DATABASE_URL=postgresql://localhost:5432/myapp

# Set in Vercel Dashboard for production
# Project Settings > Environment Variables
```

### Docker

```yaml
# docker-compose.yml
services:
  app:
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
```

### GitHub Actions

```yaml
# .github/workflows/ci.yml
env:
  NODE_ENV: test

jobs:
  test:
    steps:
      - run: npm test
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

## Security Checklist

1. **Never commit secrets**
   - Add `.env` to `.gitignore`
   - Only commit `.env.example` with placeholder values

2. **Validate at startup**
   - Fail fast if required variables are missing
   - Use Zod or similar for type-safe validation

3. **Use secrets managers in production**
   - Vercel/Netlify environment variables
   - AWS Secrets Manager
   - HashiCorp Vault
   - 1Password CLI

4. **Rotate secrets regularly**
   - JWT secrets
   - API keys
   - Database passwords

## Gitignore Pattern

```gitignore
# Environment files
.env
.env.local
.env.*.local
.env.development
.env.production

# Keep example file
!.env.example
```

## Output Format

When setting up environment configuration:

1. **Create .env.example** - Document all variables with comments
2. **Create validation** - Zod schema with types
3. **Add to .gitignore** - Ensure secrets aren't committed
4. **Document in README** - How to configure for local dev
5. **Platform config** - Vercel, Docker, CI as needed
