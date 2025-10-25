---
title: "Shiki Syntax Highlighting: More features for markdown"
date: 2025-08-31
path: /shiki-syntax
meta: "Comprehensive Shiki syntax highlighting implementation with custom themes, diff notation, line highlighting, focus modes, error annotations, interactive copy buttons, and optimized Sass architecture using a scalable variable system."
tags: ["Shiki", "Syntax Highlighting", "Sass", "CSS", "Performance"]
---

[Shiki](https://shiki.matsu.io/)'s been used on this site for some time. ^^But it was missing several key features that Shiki provides out of the box, including language badges, custom transformers for enhanced metadata, and more granular control over code block styling.^^

## TL;DR

`https://jeffry.in` is updated with Shiki codeblocks, including:

- **Transformers for** for titles, diffs, and tooltips
- **Enhanced CSS** with sticky line numbers and proper dark mode support
- **Simplified Giscus integration** using built-in themes, and
- **Performance optimizations** with [Next.js](https://nextjs.org/) dynamic imports

---

## Syntax Highlighting Overview

Here's a simple example. In code block below, you'll observe, a title, the languages, a copy button and Shiki syntax highlighting.

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

Shiki supports multiple programming languages out of the box. However, I wanted to add the language as a badge which was harder than expected.
I found I could view that information from Shiki but I wasn't able to hoist it to code block headers as easily as I would have liked.
Shiki's transformer architecture transformers and executes at different stages of the rendering pipeline, and language metadata isn't always accessible in the pre-processing phase where it can be injected into header elements. `code()` and `preprocess()` hooks run at different times, and getting data to flow between them requires a little state management through the options object.

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

I was able to hack my way to the functionality I wanted. The key was creating a custom transformer that stores language information in the root node's data attributes during the `root()` phase, then injecting the badge element during the `pre()` phase when the parent container is available. This approach ensures the language badge appears in the header alongside titles and other metadata.^^

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

Rewrote the code block styles with:
- Table-based layout for proper line numbering
- Sticky positioning for line numbers during scroll
- Dark mode support with CSS custom properties
- Optimized Sass using scalable variable system (`$m-*` sizing, `$radius-*` for borders)

### 4. Giscus Theme & Dynamic Import Improvements

- Switched from custom-hosted CSS to built-in Giscus themes (`dark`/`light`)
- Replaced lazy loading with Next.js dynamic imports for better SSR handling
- Added proper loading states and error boundaries

## ^^Key Challenges and Lessons Learned^^

^^Throughout this implementation, several challenges emerged that required creative solutions:^^

^^**1. Transformer Execution Order** - Understanding when each transformer hook executes was crucial. The `preprocess()` hook runs before tokenization, `code()` during rendering, and `pre()` after the code block is assembled. Getting data to flow between these stages required careful use of the options object and node properties.^^

^^**2. React Hydration Issues** - Initially, server-rendered copy buttons would fail to hydrate properly in Next.js. The solution was to use placeholders during SSR and dynamically mount React components client-side using a MutationObserver to detect new code blocks.^^

^^**3. Sticky Positioning in Tables** - Achieving sticky line numbers while maintaining proper code alignment required switching from a flex layout to a table-based layout. This allowed line numbers to remain visible during horizontal scrolling while the code content scrolls naturally.^^

^^**4. Dark Mode Background Overrides** - Shiki applies inline background colors from its themes, which can override CSS custom properties. The solution was using `!important` flags specifically scoped to dark mode contexts, ensuring the theme background is properly overridden.^^

^^**5. Copy Button State Management** - Managing the copied state across multiple code blocks required generating unique IDs for each block and ensuring the React components properly tracked which block was just copied from. The `data-code-id` attribute system solved this cleanly.^^

## Conclusion

The enhanced Shiki implementation now provides:

1. **React-Based Interactivity** - Dynamic copy button mounting with proper state management
2. **Custom Transformers** - Title extraction, diff highlighting, and tooltip support
3. **Improved CSS Architecture** - Table-based layout for proper line numbering and sticky positioning
4. **Dark Mode Support** - Seamless theme switching with custom color overrides
5. **Performance Optimizations** - Efficient dynamic imports and debounced DOM observations

^^These improvements make code blocks more readable, functional, and interactive across all devices and themes. The combination of Shiki's powerful syntax highlighting engine with custom transformers and React-based interactivity creates a robust solution that handles everything from simple code snippets to complex examples with annotations, highlighting, and diff notation.^^

^^For developers looking to implement similar features, the key takeaways are:^^
^^- Invest time in understanding Shiki's transformer lifecycle - it's more flexible than it initially appears^^
^^- Use React's dynamic mounting capabilities for interactive elements that need state management^^
^^- Don't fight against inline styles - work with them using scoped overrides when necessary^^
^^- Test thoroughly across SSR and CSR scenarios to catch hydration mismatches early^^

^^The result is a code highlighting system that not only looks great but also provides the interactive features modern technical documentation demands.^^

This comprehensive implementation ensures that code snippets are not just functional but also beautiful and user-friendly across all devices and themes, with optimized Sass using a scalable variable system for maintainability.
