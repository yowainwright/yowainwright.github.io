---
name: bun-workspace
description: Create a Bun monorepo workspace with a library and Next.js site. Use when user asks to scaffold a new library project, create a bun workspace, or set up a monorepo with a docs/demo site.
---

# Bun Library Workspace Skill

When scaffolding a new Bun workspace project with a library + Next.js site:

## First: Ask About the Project

1. **Project name** - Package name for npm (e.g., `my-lib`)
2. **Description** - One-line description
3. **GitHub username** - For package.json links
4. **Author info** - Name and email

## Project Structure

```
{project-name}/
├── src/                    # Library source (root package)
│   └── index.ts
├── site/                   # Next.js demo/docs site (workspace)
│   ├── src/
│   │   └── app/
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.ts
│   └── tsconfig.json
├── test/                   # Tests for library
├── package.json            # Root with workspaces
├── tsconfig.json           # Library tsconfig
├── turbo.json              # Turborepo config
├── bunfig.toml
└── .gitignore
```

## Root package.json

```json
{
  "name": "{project-name}",
  "version": "0.0.1",
  "description": "{description}",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "engines": {
    "bun": ">=1.0.0"
  },
  "files": ["dist"],
  "workspaces": ["site"],
  "scripts": {
    "dev": "turbo dev",
    "dev:lib": "bun run --watch src/index.ts",
    "build": "rm -rf dist && bun build ./src/index.ts --outdir dist --target bun --minify && tsc --emitDeclarationOnly --outDir dist",
    "test": "bun test",
    "lint": "oxlint src/",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "keywords": [],
  "author": "{author-name} <{author-email}>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/{github-username}/{project-name}.git"
  },
  "bugs": {
    "url": "https://github.com/{github-username}/{project-name}/issues"
  },
  "homepage": "https://github.com/{github-username}/{project-name}",
  "devDependencies": {
    "@types/bun": "latest",
    "turbo": "latest",
    "typescript": "latest"
  },
  "packageManager": "bun@1.1.38"
}
```

## Root tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist",
    "rootDir": "src",
    "allowJs": false,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "noEmit": false,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveConstEnums": true,
    "removeComments": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": false,
    "strict": true,
    "target": "esnext",
    "types": ["bun"]
  },
  "include": ["src"],
  "exclude": ["dist", "test", "node_modules", "site"]
}
```

## turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "typecheck": {
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

## bunfig.toml

```toml
[test]
root = "./test"
```

## .gitignore

```
# Logs
*.log

# Coverage
coverage/
*.lcov

# TypeScript
*.tsbuildinfo

# Dependencies
node_modules/

# Build
dist/
.next/
.turbo/

# Environment
.env
.env.local
.env*.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store

# Bun
bun.lockb

# Temp
tmp/
.cache/
```

## site/package.json (Next.js + Tailwind + shadcn)

```json
{
  "name": "{project-name}-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "{project-name}": "*",
    "next": "latest",
    "react": "^19",
    "react-dom": "^19",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "tailwindcss": "^4",
    "typescript": "latest"
  }
}
```

## site/next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

## site/postcss.config.ts

```typescript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## site/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "{project-name}": ["../dist/index.d.ts"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## site/components.json (shadcn config)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## site/src/lib/utils.ts

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## site/src/app/globals.css

```css
@import "tailwindcss";
```

## site/src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "{project-name}",
  description: "{description}",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## site/src/app/page.tsx

```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">{project - name}</h1>
      <p className="mt-4 text-gray-600">{description}</p>
    </main>
  );
}
```

## src/index.ts (Library entry)

```typescript
export const hello = (name: string): string => {
  return `Hello, ${name}!`;
};
```

## test/index.test.ts

```typescript
import { describe, expect, test } from "bun:test";
import { hello } from "../src/index";

describe("hello", () => {
  test("returns greeting", () => {
    expect(hello("World")).toBe("Hello, World!");
  });
});
```

## After Scaffolding

Run these commands:

```bash
cd {project-name}
bun install
bun run dev
```

To add shadcn components:

```bash
cd site
shadcn add button
shadcn add card
# etc.
```

## Notes

- Root package is the library (publishable to npm)
- `site/` is the demo/docs site (private, not published)
- Turbo handles workspace orchestration
- Library builds to `dist/`, site uses it via workspace link
- Tailwind v4 with new CSS-first config
- Next.js with Turbopack for fast dev
- shadcn/ui configured with new-york style, lucide icons
- Use `shadcn add <component>` after installing a reviewed pinned shadcn CLI
