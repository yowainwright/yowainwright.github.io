---
title: "Shiki Syntax Highlighting: More features for markdown"
date: 2025-08-31
path: /shiki-syntax
meta: "Comprehensive Shiki syntax highlighting implementation with custom themes, diff notation, line highlighting, focus modes, error annotations, interactive copy buttons, and optimized Sass architecture using a scalable variable system."
tags: ["Shiki", "Syntax Highlighting", "Sass", "CSS", "Performance"]
---

[Shiki](https://shiki.matsu.io/)'s been used on this blog for some time. But it was missing several features that Shiki provides, including language badges, custom transformers for enhanced metadata, and more granular control over code block styling.

## TL;DR

`https://jeffry.in` is updated with Shiki codeblocks, including:

- **Shiki Transformers** for titles, diffs, and tooltips
- **Simplified Giscus integration** using built-in themes
- **Performance optimizations** with [Next.js](https://nextjs.org/) dynamic imports

---

## Syntax Highlighting Overview

Here's a simple example. In the code block below, observe a title, the language badge, a copy button, and Shiki syntax highlighting.

```javascript
// [title: Basic JavaScript Example]
const greeting = "Hello, Shiki!";
const numbers = [1, 2, 3, 4, 5];

function calculateSum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

console.log(greeting);
console.log(`Sum: ${calculateSum(numbers)}`);
```

## Language Support

Shiki supports multiple programming languages. However, I wanted to add the language as a badge which was harder than I had expected.
I found I could view language information from Shiki but I wasn't able to hoist it to code block headers.
Shiki's architecture transforms and executes at different stages of the code rendering pipeline, and language metadata isn't always accessible in the pre-processing phase where it can be injected into header elements. `code()` and `preprocess()` hooks run at different times, and getting data to flow between them requires a little state management through the options object. See below.

```typescript
// [title: utils.ts - Language Badge Transformer]
function transformerLanguageBadge() {
  return {
    name: 'language-badge',
    root(node) {
      // Store language from options in root data attribute
      const lang = this.options.lang || 'text';
      node.properties['data-language'] = lang;
    },
    pre(node) {
      // Hoist the language from options to create badge in header
      const lang = this.options.lang || 'text';

      // Find or create header
      let header = node.children.find(
        (child) => child.type === 'element' &&
                   child.properties?.className?.includes('code-header')
      );

      if (!header) {
        header = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['code-header'] },
          children: [],
        };
        node.children.unshift(header);
      }

      // Add language badge to header
      header.children.push({
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['language-badge'],
          'data-language': lang
        },
        children: [{ type: 'text', value: lang.toUpperCase() }],
      });
    }
  };
}
```

I created a custom transformer that stores language information in the root node's data attributes during the `root()` phase, then injects the badge element during the `pre()` phase when the parent container is available. This approach ensures the language badge appears in the header alongside titles and other metadata.

## Advanced Features

### Diff Notation

Show additions and deletions in code:

```diff
// [title: Code Changes]
function calculateTotal(items) {
  let total = 0;
- for (let i = 0; i < items.length; i++) {
-   total += items[i].price;
- }
+ total = items.reduce((sum, item) => sum + item.price, 0);
  return total;
}
```

### Line Highlighting

Highlight specific lines to draw attention:

```javascript {3-5,8}
// [title: Important Lines]
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,           // These lines are highlighted
  retryAttempts: 3,        // to show important config
  enableLogging: true,     // values
  
  headers: {
    'Content-Type': 'application/json',  // This line too!
  }
};
```

### Word Highlighting

Highlight specific words or patterns:

```javascript
// [title: Security Considerations]
const password = "secret123"; // [!code word:password]
const apiKey = process.env.API_KEY; // [!code word:API_KEY]

function authenticate(user, pass) { // [!code word:authenticate]
  // Never store passwords in plain text
  const hashedPassword = hash(pass);
  return validateCredentials(user, hashedPassword);
}
```

### Focus Lines

Focus on specific sections while dimming others:

```javascript
// [title: Focus Example]
// [!code focus:5]
function processUserData(userData) {
  // Validation
  if (!userData || !userData.email) {
    throw new Error('Invalid user data');
  }
  
  // This is the important part to focus on
  const normalizedEmail = userData.email.toLowerCase().trim();
  const username = normalizedEmail.split('@')[0];
  
  // Save to database
  return saveUser({
    ...userData,
    email: normalizedEmail,
    username
  });
}
```

### Error Level Annotations

Show warnings and errors in code:

```javascript
// [title: Error Handling]
function divideNumbers(a, b) {
  if (b === 0) { // [!code error]
    throw new Error('Division by zero!'); // [!code error]
  }
  
  if (typeof a !== 'number' || typeof b !== 'number') { // [!code warning]
    console.warn('Non-numeric input detected'); // [!code warning]
  }
  
  return a / b;
}
```


## Long Code with Horizontal Scrolling

Here's an example with long lines to demonstrate the copy button staying visible:

```javascript
// [title: Long Lines Example]
const veryLongConfigurationObject = { apiEndpoint: "https://api.example.com/v1/users", timeout: 5000, retryAttempts: 3, headers: { "Content-Type": "application/json", "Authorization": "Bearer token_goes_here" }, options: { enableCache: true, cacheTimeout: 3600, enableLogging: true, logLevel: "debug" } };

const anotherLongLine = "This is a very long string that extends far beyond the typical viewport width to demonstrate how the syntax highlighting handles horizontal scrolling while keeping the copy button accessible and visible at all times.";
```

## Implementation Details: What Changed

### 1. React-Based Copy Button with Dynamic Mounting

Replaced the inline SVG copy button with a React component that gets dynamically mounted:

```typescript
// [title: hooks/useCodeBlocks.tsx - Dynamic Copy Button Mounting]
export function useCodeBlocks() {
  const rootsRef = useRef<Map<HTMLElement, Root>>(new Map());
  
  const mountCopyButtons = useCallback(() => {
    const placeholders = document.querySelectorAll('.copy-button-placeholder');
    
    placeholders.forEach((placeholder) => {
      const element = placeholder as HTMLElement;
      const codeId = element.getAttribute('data-code-id');
      
      if (!codeId || rootsRef.current.has(element)) return;
      
      const root = createRoot(element);
      root.render(<CopyButton codeId={codeId} />);
      rootsRef.current.set(element, root);
    });
  }, []);
  
  // MutationObserver watches for new code blocks added dynamically
  // ... observer setup code
}
```

```tsx
// [title: components/CopyButton.tsx - React Copy Component]
export default function CopyButton({ codeId }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.querySelector(`#${codeId} code`);
    if (!codeElement) return;
    
    const code = codeElement.textContent || '';
    await navigator.clipboard.writeText(code);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="shiki-copy-button" onClick={handleCopy}>
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
```

### 2. Custom Transformers for Enhanced Features

Created custom Shiki transformers to handle titles and diff lines:

```javascript
// [title: utils.ts - Custom Title Transformer]
function transformerTitle() {
  return {
    name: 'title',
    preprocess(code, options) {
      // Extract title from comments like: // [title: My Title]
      if (!code.includes('[title:')) return code;
      
      const lines = code.split('\n');
      const firstLine = lines[0];
      const titleStart = firstLine.indexOf('[title:');
      const titleEnd = firstLine.indexOf(']', titleStart);
      
      if (titleStart !== -1 && titleEnd > titleStart) {
        const title = firstLine.slice(titleStart + 7, titleEnd).trim();
        options.meta = { ...options.meta, title };
        return lines.slice(1).join('\n'); // Remove title line from code
      }
      return code;
    }
  };
}
```

```javascript
// [title: utils.ts - Diff Lines Transformer]
function transformerDiffLines() {
  return {
    name: 'diff-lines',
    code(node) {
      node.children?.forEach((line) => {
        const firstText = getFirstText(line.children[0]);
        
        if (firstText.startsWith('+')) {
          // Add classes for additions
          line.properties.class.push('diff', 'add');
        } else if (firstText.startsWith('-')) {
          // Add classes for deletions  
          line.properties.class.push('diff', 'remove');
        }
      });
    }
  };
}
```

### 3. Improved CSS Architecture

Rewrote the code block styles with:
- Table-based layout for proper line numbering
- Sticky positioning for line numbers during scroll
- Dark mode support with CSS custom properties
- Optimized Sass using scalable variable system (`$m-*` sizing, `$radius-*` for borders)

### 4. Giscus Theme & Dynamic Import Improvements

- Switched from custom-hosted CSS to built-in Giscus themes (`dark`/`light`)
- Replaced lazy loading with Next.js dynamic imports for better SSR handling
- Added proper loading states and error boundaries

## Conclusion

A few challenges came up during this implementation:

**Transformer Execution Order** - Understanding when each transformer hook executes was crucial. The `preprocess()` hook runs before tokenization, `code()` during rendering, and `pre()` after the code block is assembled. Getting data to flow between these stages required careful use of the options object and node properties.

**React Hydration Issues** - Server-rendered copy buttons failed to hydrate properly in Next.js. I solved this by using placeholders during SSR and dynamically mounting React components client-side with a MutationObserver to detect new code blocks.

**Sticky Positioning in Tables** - Achieving sticky line numbers while maintaining proper code alignment required switching from a flex layout to a table-based layout. This keeps line numbers visible during horizontal scrolling while the code content scrolls naturally.

**Copy Button State Management** - Managing the copied state across multiple code blocks required generating unique IDs for each block and ensuring the React components tracked which block was just copied from. The `data-code-id` attribute system solved this cleanly.
