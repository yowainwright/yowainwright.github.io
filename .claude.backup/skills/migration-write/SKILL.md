---
name: migration-write
description: Write database migrations. Use when user mentions schema changes, adding tables/columns, database migration, ALTER TABLE, or prisma migrate.
---

# Migration Write Skill

When helping write database migrations:

## Migration Principles

1. **Always reversible** - Every migration should have a rollback
2. **Small and focused** - One logical change per migration
3. **Safe for production** - No table locks, use concurrent indexes
4. **Data preservation** - Never lose data, migrate it

---

## Raw SQL Migrations

### Directory Structure

```
migrations/
├── 001_create_users.sql
├── 002_add_user_email_index.sql
└── 003_create_posts.sql
```

### Migration Template

```sql
-- migrations/001_create_users.sql

-- Up
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);

-- Down
DROP TABLE IF EXISTS users;
```

### Production-Safe Patterns

```sql
-- Add column with default (safe)
ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT 'active';

-- Add nullable column first, then backfill (safer for large tables)
ALTER TABLE users ADD COLUMN avatar_url TEXT;
UPDATE users SET avatar_url = 'default.png' WHERE avatar_url IS NULL;
ALTER TABLE users ALTER COLUMN avatar_url SET NOT NULL;
ALTER TABLE users ALTER COLUMN avatar_url SET DEFAULT 'default.png';

-- Create index concurrently (no table lock)
CREATE INDEX CONCURRENTLY idx_users_status ON users(status);

-- Rename column (may require app changes first)
ALTER TABLE users RENAME COLUMN name TO full_name;

-- Drop column (ensure app doesn't use it first)
ALTER TABLE users DROP COLUMN IF EXISTS legacy_field;
```

### Data Migrations

```sql
-- Migrate data between tables
INSERT INTO new_profiles (user_id, bio, avatar)
SELECT id, bio, avatar_url FROM users;

-- Transform data in place
UPDATE users SET email = lower(email);

-- Split column into multiple
ALTER TABLE users ADD COLUMN first_name TEXT;
ALTER TABLE users ADD COLUMN last_name TEXT;

UPDATE users SET
  first_name = split_part(full_name, ' ', 1),
  last_name = split_part(full_name, ' ', 2);
```

---

## Prisma Migrations

### Create Migration

```bash
# Generate migration from schema changes
npx prisma migrate dev --name add_user_avatar

# Apply pending migrations
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

### Schema Changes

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  avatar    String?  // New nullable field
  posts     Post[]
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
  @@index([email])
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String   @map("author_id")
  createdAt DateTime @default(now()) @map("created_at")

  @@map("posts")
  @@index([authorId])
}
```

### Custom SQL in Prisma Migration

```sql
-- prisma/migrations/20240101_add_search_index/migration.sql

-- Add full-text search index (not supported in schema)
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('english', title || ' ' || content));

-- Create database function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### prisma-migrations for Rollback

```typescript
// Using @yowainwright/prisma-migrations for rollback support
import { migrate, rollback } from "@yowainwright/prisma-migrations";

// Apply migrations
await migrate({
  schemaPath: "./prisma/schema.prisma",
});

// Rollback last migration
await rollback({
  schemaPath: "./prisma/schema.prisma",
  steps: 1,
});
```

---

## Drizzle Migrations

### Generate Migration

```bash
# Generate from schema changes
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Push directly (dev only)
npx drizzle-kit push
```

### Schema with Migration

```typescript
// db/schema.ts
import { pgTable, uuid, text, timestamp, boolean, index } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    avatar: text("avatar"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index("idx_users_email").on(table.email),
  }),
);

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    content: text("content"),
    published: boolean("published").notNull().default(false),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    authorIdx: index("idx_posts_author").on(table.authorId),
  }),
);
```

### Custom Migration

```typescript
// drizzle/migrations/0002_add_search.ts
import { sql } from "drizzle-orm";
import { db } from "../client";

export async function up() {
  await db.execute(sql`
    CREATE INDEX idx_posts_search
    ON posts USING gin(to_tsvector('english', title || ' ' || content))
  `);
}

export async function down() {
  await db.execute(sql`DROP INDEX IF EXISTS idx_posts_search`);
}
```

---

## Migration Checklist

### Before Writing

- [ ] Schema change documented
- [ ] Impact on existing data assessed
- [ ] Rollback strategy defined

### The Migration

- [ ] Up migration works
- [ ] Down migration works
- [ ] No table locks (use CONCURRENTLY)
- [ ] Handles empty/null data

### After Writing

- [ ] Tested on copy of production data
- [ ] App code updated if needed
- [ ] Deployed in correct order (schema before code or vice versa)

---

## Common Patterns

### Add Non-Nullable Column

```sql
-- Step 1: Add nullable
ALTER TABLE users ADD COLUMN role TEXT;

-- Step 2: Backfill
UPDATE users SET role = 'user' WHERE role IS NULL;

-- Step 3: Add constraint
ALTER TABLE users ALTER COLUMN role SET NOT NULL;
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'user';
```

### Rename Table

```sql
-- Rename
ALTER TABLE old_name RENAME TO new_name;

-- Update foreign keys
ALTER TABLE posts DROP CONSTRAINT posts_user_id_fkey;
ALTER TABLE posts ADD CONSTRAINT posts_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES new_name(id);
```

### Split Table

```sql
-- Create new table
CREATE TABLE profiles AS
SELECT id, bio, avatar, website FROM users;

-- Add foreign key
ALTER TABLE profiles ADD PRIMARY KEY (id);
ALTER TABLE profiles ADD CONSTRAINT profiles_user_fkey
  FOREIGN KEY (id) REFERENCES users(id);

-- Remove columns from original
ALTER TABLE users DROP COLUMN bio;
ALTER TABLE users DROP COLUMN avatar;
ALTER TABLE users DROP COLUMN website;
```

## Output Format

When writing migrations:

1. **Explain the change** - What and why
2. **Show the migration** - Up and down
3. **Note production concerns** - Locks, data, timing
4. **Provide rollback** - Always reversible
5. **List app changes** - Code updates needed
