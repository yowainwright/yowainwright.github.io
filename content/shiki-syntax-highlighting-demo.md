---
title: "Shiki Syntax Highlighting: A Complete Feature Showcase"
date: 2025-08-31
path: content/shiki-syntax-highlighting-demo
description: "Exploring all the powerful features of Shiki syntax highlighting with custom themes, transformers, and interactive elements"
tags: ["Development", "Shiki", "Syntax Highlighting", "Web Development"]
---

Welcome to a comprehensive showcase of our Shiki syntax highlighting implementation! This post demonstrates all the features we've integrated, from basic syntax highlighting to advanced transformers and interactive elements.

## Basic Syntax Highlighting

Let's start with a simple example showing our custom light/dark theme support:

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

Shiki supports numerous programming languages. Here are some examples:

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

### Python

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

### CSS with Modern Features

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

## Notation Transformers

### Diff Notation

Show additions and deletions in code:

```javascript
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
  
  // This is the important part we're focusing on
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

## Colorized Brackets

Our implementation includes colorized brackets for better code readability:

```javascript
// [title: Nested Structure with Colorized Brackets]
const complexData = {
  users: [
    {
      id: 1,
      name: "Alice",
      permissions: {
        read: true,
        write: false,
        admin: false,
        settings: {
          notifications: {
            email: true,
            push: false,
            sms: false
          }
        }
      }
    },
    {
      id: 2,
      name: "Bob",
      permissions: {
        read: true,
        write: true,
        admin: true,
        settings: {
          notifications: {
            email: false,
            push: true,
            sms: true
          }
        }
      }
    }
  ]
};
```

## TwoSlash Integration

For TypeScript files, we support TwoSlash for type information:

```typescript twoslash
// [title: TypeScript with TwoSlash]
interface Point {
  x: number;
  y: number;
}

function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

const origin = { x: 0, y: 0 };
const point = { x: 3, y: 4 };

const dist = distance(origin, point);
//    ^? const dist: number
```

## Long Code with Horizontal Scrolling

Here's an example with long lines to demonstrate the copy button staying visible:

```javascript
// [title: Long Lines Example]
const veryLongConfigurationObject = { apiEndpoint: "https://api.example.com/v1/users", timeout: 5000, retryAttempts: 3, headers: { "Content-Type": "application/json", "Authorization": "Bearer token_goes_here" }, options: { enableCache: true, cacheTimeout: 3600, enableLogging: true, logLevel: "debug" } };

const anotherLongLine = "This is a very long string that extends far beyond the typical viewport width to demonstrate how our syntax highlighting handles horizontal scrolling while keeping the copy button accessible and visible at all times.";
```

## Custom Styling Features

### Line Numbers

All code blocks include line numbers for easy reference:

```javascript
// [title: Line Numbers Example]
function fibonacci(n) {
  if (n <= 1) return n;
  
  const fib = [0, 1];
  
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  
  return fib[n];
}
```

### Copy Button

Every code block features a copy button that:
- Stays visible during horizontal scroll
- Shows visual feedback when clicked
- Copies the entire code content
- Works seamlessly in light and dark modes

## Shell Commands

```bash
# [title: Setup Commands]
# Install dependencies
npm install @shikijs/rehype @shikijs/transformers @shikijs/twoslash

# Build the project
npm run build

# Start development server
npm run dev

# Run tests
npm test --coverage
```

## JSON Configuration

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

## Markdown in Code Comments

```javascript
// [title: Documentation in Comments]
/**
 * Calculate the area of a circle
 * 
 * Formula: A = π × r²
 * 
 * @param {number} radius - The radius of the circle
 * @returns {number} The area of the circle
 * 
 * @example
 * const area = calculateCircleArea(5);
 * console.log(area); // 78.54
 */
function calculateCircleArea(radius) {
  return Math.PI * Math.pow(radius, 2);
}
```

## React Component Example

```jsx
// [title: React Component with Hooks]
import React, { useState, useEffect } from 'react';

const DataFetcher = ({ endpoint, renderData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  return <div className="data-container">{renderData(data)}</div>;
};

export default DataFetcher;
```

## Performance Considerations

```javascript
// [title: Optimized Code]
// Use memoization for expensive calculations
const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key); // [!code ++]
    }
    
    const result = fn(...args);
    cache.set(key, result); // [!code ++]
    return result;
  };
};

// Example usage
const expensiveOperation = memoize((n) => {
  console.log('Computing...');
  return n * n * n;
});
```

## Conclusion

Our Shiki implementation provides:

1. **Rich Syntax Highlighting** - Support for 100+ languages with custom themes
2. **Interactive Elements** - Copy button, line numbers, and language badges
3. **Advanced Transformers** - Diff notation, line highlighting, word highlighting, and more
4. **Dark Mode Support** - Seamless theme switching with custom color schemes
5. **Accessibility** - Semantic HTML, ARIA labels, and keyboard navigation
6. **Performance** - Optimized rendering with minimal runtime overhead

The combination of these features creates a superior code reading experience that enhances comprehension and makes technical content more engaging and accessible.

## CSS Implementation Details

Here's a look at some of the custom CSS that powers our Shiki integration:

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