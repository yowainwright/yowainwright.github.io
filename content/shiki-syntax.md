---
title: "Shiki Syntax Highlighting: More features for markdown for markdown"
date: 2025-08-31
path: content/shiki-syntax
description: "Comprehensive Shiki syntax highlighting with custom themes, diff notation, line highlighting, focus modes, error annotations, and interactive copy buttons."
tags: ["Shiki", "Syntax Highlighting"]
---

[Shiki](https://shiki.matsu.io/)'s been used on this site site for some time. But it was missing a few things Shiki provides that I wanted to implement including, language badges
## TL;DR

Jeffry.in is updated with slightly more advanced Shiki codeblocks, including:
- **Custom transformers** for titles, diffs, and tooltips
- **Enhanced CSS** with sticky line numbers and proper dark mode support
- **Simplified Giscus integration** using built-in themes
- **Performance optimizations** with Next.js dynamic imports

---

## Syntax Highlighting Overview

Let's start with a simple example. In code block below, you will "hopefully" observe, a title, the languages, a copy button and syntax highlighting.

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

Shiki supports numerous programming languages. Here are some examples. 
I've become accustom to being able to add earmarks, the language, and then seeing syntax for that language.
Shiki provides this sort of support out of the box. 

However, I wanted to add the language as a badge which was harder to do than expected. 
I found even though I could get that information from Shiki, I wasn't able to add it to headers as easily as I would have liked.
The reason for this is Shiki's transforms and what data is available and when...

### TypeScript with Type Annotations

```typescript
// [title: TypeScript Example]
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}

const service = new UserService();
```

But, with a little work, I was able to hack my way to things that I wanted.

### With Python Example

```python
# [title: Python Data Processing]
import pandas as pd
import numpy as np

def process_data(data):
    """Process and analyze data using pandas."""
    df = pd.DataFrame(data)
    
    # Calculate statistics
    mean_value = df['value'].mean()
    std_dev = df['value'].std()
    
    return {
        'mean': mean_value,
        'std': std_dev,
        'count': len(df)
    }

# Sample data
data = {
    'id': [1, 2, 3, 4, 5],
    'value': [10, 20, 15, 25, 30]
}

result = process_data(data)
print(f"Analysis complete: {result}")
```

### With CSS example

```css
/* [title: Modern CSS Styling] */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --spacing-unit: 1rem;
  --border-radius: 0.5rem;
}

.card {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

@container (min-width: 768px) {
  .card {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
```

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


## JSON Configuration (and no title)

```json
{
  "name": "shiki-demo",
  "version": "1.0.0",
  "description": "Showcasing Shiki syntax highlighting features",
  "themes": {
    "light": "custom-light",
    "dark": "custom-dark"
  },
  "transformers": [
    "notationDiff",
    "notationHighlight",
    "notationWordHighlight",
    "notationFocus",
    "notationErrorLevel",
    "metaHighlight",
    "metaWordHighlight",
    "colorizedBrackets",
    "twoslash",
    "copyButton",
    "title",
    "languageBadge"
  ]
}
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

Rewrote the code block styles for better structure and dark mode support:

```scss
// [title: styles/_code.scss - Enhanced Shiki Styles]
// Main container with proper overflow handling
.shiki {
  position: relative;
  display: block;
  margin: 2rem 0;
  border-radius: var(--code-border-radius);
  overflow-x: auto;
  overflow-y: hidden;
  
  // Dark mode background override
  .js-is-darkmode & {
    background: var(--code-bg) !important;
  }
}

// Table-based layout for proper line numbering
.shiki code {
  display: table;
  width: 100%;
  min-width: 100%;
  table-layout: fixed;
  counter-reset: step;
}

// Line numbers with sticky positioning
code .line {
  display: table-row;
  
  &::before {
    content: counter(step);
    counter-increment: step;
    display: table-cell;
    width: 2.5rem;
    position: sticky;
    left: 0;
    text-align: right;
    user-select: none;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
}

// Copy button positioning
.shiki-copy-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
  
  &[data-copied="true"] {
    background: rgba(34, 197, 94, 0.1);
    border-color: #22c55e;
  }
}
```

### 4. Giscus Theme Simplification

Switched from custom-hosted Giscus CSS themes to built-in theme names:

```diff
// [title: pages/[slug].tsx - Giscus Theme Update]
- const THEME_DARK = "https://yowainwright.imgix.net/jeffry.in.giscus.dark.css";
- const THEME_LIGHT = "https://yowainwright.imgix.net/jeffry.in.giscus.light.css";
+ const THEME_DARK = "dark";
+ const THEME_LIGHT = "light";
```

### 5. Dynamic Import Strategy

Replaced lazy loading with Next.js dynamic imports for better SSR handling:

```diff
// [title: pages/[slug].tsx - Dynamic Import Change]
- const GiscusComponent = lazy(() => 
-   import("@giscus/react")
-     .then(module => ({
-       default: module.default || module.Giscus || module
-     }))
- );

+ const GiscusComponent = dynamic(
+   () => import("@giscus/react"),
+   { 
+     ssr: false,
+     loading: () => <GiscusLoadingFallback />
+   }
+ );
```

## Conclusion

The enhanced Shiki implementation now provides:

1. **React-Based Interactivity** - Dynamic copy button mounting with proper state management
2. **Custom Transformers** - Title extraction, diff highlighting, and tooltip support
3. **Improved CSS Architecture** - Table-based layout for proper line numbering and sticky positioning
4. **Dark Mode Support** - Seamless theme switching with custom color overrides
5. **Performance Optimizations** - Efficient dynamic imports and debounced DOM observations

These improvements make code blocks more readable and functional across all devices and themes.

## CSS Implementation Details

Here's a look at some of the custom CSS that powers the Shiki integration:

```scss
// [title: Core Shiki Styles]
.shiki {
  border-radius: var(--code-border-radius);
  display: flex;
  margin: 2rem 0;
  position: relative;
  
  .js-is-darkmode & {
    background: var(--code-bg) !important;
  }
}

.shiki-copy-button {
  position: sticky;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &[data-copied="true"] {
    background: rgba(34, 197, 94, 0.1);
    border-color: #22c55e;
    
    .check-icon {
      display: block;
      color: #4ade80;
    }
  }
}

code .line:before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin: 0 0.5rem 0 1rem;
  display: inline-block;
  text-align: right;
  color: var(--code-line-number);
}
```

This comprehensive implementation ensures that code snippets are not just functional but also beautiful and user-friendly across all devices and themes.
