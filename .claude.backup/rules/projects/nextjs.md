# Next.js Project Rules

## App Router Conventions

### File Structure
```
app/
├── (auth)/           # Route groups for layouts
│   ├── login/
│   └── register/
├── api/              # API routes
├── components/       # Shared components (or use src/components)
└── [dynamic]/        # Dynamic routes
```

### Component Types
- **Server Components** (default): Fetch data, access backend, no interactivity
- **Client Components** (`'use client'`): Interactivity, hooks, browser APIs

### Data Fetching
- Use `fetch` in Server Components with caching options
- Use Server Actions for mutations
- Avoid `getServerSideProps` / `getStaticProps` (Pages Router patterns)

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE | `API_BASE_URL` |
| Route files | lowercase | `page.tsx`, `layout.tsx` |

## Server Actions

```typescript
// Always use 'use server' directive
'use server'

// Always validate input
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function createUser(formData: FormData) {
  const validated = schema.parse(Object.fromEntries(formData))
  // ... implementation
}
```

## Error Handling

- Use `error.tsx` for route error boundaries
- Use `not-found.tsx` for 404 handling
- Log errors server-side, show friendly messages client-side

## Performance

- Use `loading.tsx` for Suspense boundaries
- Implement `generateStaticParams` for static generation
- Use `next/image` for images, `next/font` for fonts
