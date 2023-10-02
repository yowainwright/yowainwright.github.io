---
title: TypeScript Init—Getting A Test Driven TypeScript Repository Setup
date: '2018-05-02'
path: '/getting-setup-with-ts'
meta: This post documents getting setup with TypeScript—just beyond the Gettings Started TypeScript Tutorials. In this Post I will go through setting up a Test Driven TypeScript project.
categories:
  - note
  - story
---

The Engineering Team at Dollar Shave Club is excited about [TypeScript](https://github.com/Microsoft/TypeScript). I'm excited too. When I started writing this post, I was not familiar with TypeScript beyond conversations and TypeScript's [getting started tutorials](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html). In this post, I documented getting a TypeScript repository setup to compile, lint, and test TypeScript. While writing this post, I built a [Linked List](https://github.com/yowainwright/datastructures-ts/tree/master/packages/linked-list) in TypeScript.

## Tool Decisions

For this TypeScript exercise, I tried to use the same tools I'd use to build a plain old open source JavaScript repository—except in TypeScript.

In the table below I broke down the tools I tried to build my first Test Drive Development TypeScript repository.

| Category     | Initial    | Final            | Reason                                                                                                                                                          |
| ------------ | ---------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build        | Rollup     | TypeScript (TSC) | Rollup worked with minimal effort. I am user TSC because it means 1 less layer of abstraction.                                                                  |
| Type Checker | TypeScript | TypeScript       | TypeScript works well. The feedback in VS Code is immediate and offers clear messaging.                                                                         |
| Testing      | TS-Jest    | TS-Jest          | I was concerned about using TS-Jest because the documentation between it and Jest seemed confusing but it worked. I'm familiar with Jest so the switch was easy |
| Linting      | TS-Lint    | TS-Lint          | TS-Lint works well in VS Code. As far as the CLI, I'm still not clear if TS-Lint is working.                                                                    |

### Why I used TypeScript's Compiler?

I initially setup TypeScript with Rollup. Rollup was compiling fine. It seemed like another layer of abstraction. To simplify the amount of configuration, I decided to use TypeScript's compiler.

### TS compiler options

Listed below are some options for compiling TypeScript:

- [TSC](https://www.typescriptlang.org/docs/handbook/compiler-options.html)—TypeScript's Compiler
- [Webpack using TS-loader](https://github.com/TypeStrong/ts-loader)—Webpack's abstraction of TS compilation
- [Rollup](https://rollupjs.org/guide/en#typescript-declarations)—Rollup compiles TS automatically

### Jest Testing and Linting—in TypeScript

The Dollar Shave Club team uses [Jest](https://facebook.github.io/jest/) for unit testing. Dollar Shave Club's standard is for TypeScript projects is to test with [TS-Jest](https://github.com/kulshekhar/ts-jest). Using TS-Jest initially seemed scary but worked without problems. First I added the standard `expect(1).toBe(1)` test to ensure that my paths to unit tests were correct. Then I followed up with another quick test to ensure that my `.ts` files were imported correctly. From there, I added tests as I would writing Jest.

For linting, I used [TS-Lint](https://palantir.github.io/tslint/) which extends [ESLint](https://eslint.org/). This took little time. I imported TS-Lint, added some configuration and a npm script—that was it. From there I was getting TypeScript Linting Feedback.

I added [JSDocs](http://usejsdoc.org/) so that I could make sure to document what the heck I was doing.

### Setting up tests with TS Jest

Listed below are steps to get [ts-jest](https://github.com/kulshekhar/ts-jest) up and running:

### Tests are working and I'm still alive

```javascript
import { Node } from '../Node'
expect(1).toBe(1)
```

### Files are importing correctly

```javascript
import { Node } from '../Node'

test('Jest is working, Node is imported', () => {
  expect(typeof Node).toBe('function')
})
```

### Define the testing interface

```javascript
declare function test (msg: string, test: Function)
declare function expect (result: any)

import { Node } from '../Node'

test('Jest is working, Node is imported', () => {
  expect(typeof Node).toBe('function')
})

```

### JSDocs

Listed below are general comment examples for [JSDocs](http://usejsdoc.org/)

```javascript

  ...
  /**
   * @param {value} value
   * adds a new node to the beginning of the linkedList
   */
  addFirstNode (value: T) {
    this.headNode = this.headNode
      ? new Node(this.headNode.getNodeValue())
      : new Node(value)
    this.nodeCount = this.nodeCount + 1
  }
  ...

```

## Problems I had getting started with TypeScript

I knew there were benefits to be had because some of my team had taken on TypeScript full on. That stated, I did have some frustrations getting setup. I don't know if I would have pushed through the few hours of frustration for myself had I not had teammate support. I'd like to think I would have.

### Here are some problems I had getting started

Listed below are problems I had getting started with TypeScript:

- I had problems reading the TypeScript messages in VSCode
- I had errors issues with imports in my tests (I spent a lot of time being frustrated here)
- Sometimes I have to refresh VSCode after I've made minor changes to see if errors are actual errors

### Here are some problems with solutions

My tests globals are undefined and TypeScript barks at that.

```javascript

declare function test (msg: string, test: Function)
declare function expect (result: any)

// or create a setupJest.js file

```

### I can't read VSCode errors.

> Try running TSlint => the messaging is similar. The usage of node's [chalk](https://github.com/chalk/chalk) in the commandline can help highlight issues.

### How do I "tsconfig.json"?

> Try something like this:

```json
{
  "compilerOptions": {
    "outDir": "dist/components",
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "es2016.array.include", "es2017", "dom"],
    "declaration": true,
    "allowJs": false,
    "sourceMap": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "allowSyntheticDefaultImports": true,
    "types": ["jest", "node"]
  },
  "exclude": ["**/__tests__/", "**/*.js"],
  "include": ["**/*.ts"]
}
```

### How do I "tsconfig.jest.json"?

> Try something like this:

```json
// from package.json
"devDependencies": {
    "@types/jest": "^22.2.3",
    "jest": "^22.4.3",
    ...
  },
  "jest": {
    "transform": {
      "^.+\\.ts?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$",
    "moduleFileExtensions": [
      "ts"
    ]
  },

```

### How do I [ts lint](https://github.com/palantir/tslint)?

```json
{
  "extends": ["tslint-config-dollarshaveclub"],
  "rules": {
    "no-unnecessary-type-assertion": false,
    "trailing-comma": false,
    "semicolon": [true, "never"]
  }
}
```

### How do I compile my ts?

```json

 ...
 "scripts": {
    "build": "npm run build:ts",
    "build:ts": "tsc",
  ...

```

### I do React. What does TS with React look like?

```javascript

import React, { StatelessComponent } from 'react'
import classNames from 'classnames'

interface Crumb {
  active?: boolean
  empty?: boolean
  label: string
  link?: string

interface BreadcrumbsProps extends Readonly<{
  crumbs: Crumb[],
  className?: string
  style?: object
}> { }

const Breadcrumb: StatelessComponent<Crumb> = ({
  active = false,
  empty = false,
  label,
  link = false,
}) => {
  const crumbClasses = classNames(
    'ui-breadcrumbs-small__crumb',
    'ui-text--md',
    'ui-color--paper-darkest',
    { 'ui-breadcrumbs-small__crumb--active': active },
  )
  return empty
    ? (<li className={crumbClasses}>&nbsp;</li>)
    : (
      <li className={crumbClasses}>
        {link ? <a href={link} className='ui-link ui-link--inherit-color'>{label}</a> : <span>{label}</span>}
      </li>
    )
}

const BreadcrumbsSmall: StatelessComponent<BreadcrumbsProps> = ({
  crumbs,
  className,
  style,
}) => {
  const inputLabelClass = classNames(
    'ui-breadcrumbs-small',
    'ui-list--plain',
    { [className as string]: !!className },
  )
  return (
    <ul className={inputLabelClass} style={style}>
      {crumbs.map(({ active, empty, label, link }, index) => <Breadcrumb active={active} empty={empty} label={label} link={link} key={index} />)}
    </ul>
  )
}

export default BreadcrumbsSmall

```

### I want to export/import Plain Old JavaScript. Can I do that?

```javascript

export default function stickybits(
  target: string | Element | Element[],
  options?: StickyBits.Options,
): StickyBits

export interface StickyBits {
  cleanup: () => void
}

export namespace StickyBits {
  export interface Options {
    customStickyChangeNumber?: number | null
    noStyles?: boolean
    stickyBitStickyOffset?: number
    parentClass?: string
    scrollEl?: Element
    stickyClass?: string
    stuckClass?: string
    stickyChangeClass?: string
    useStickyClasses?: boolean
    verticalPosition?: 'top' | 'bottom'
  }
}

```

### I want to work on a project that imports and exports TS or JS

> Try something like this:

### tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": ".",
    "target": "exnext",
    "lib": ["es6", "es2016.array.include", "es2017", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "rootDir": "."
  }
}
```

### package.json

```json

...
"scripts": {
  "build": "<your js build> && tsc",
  ...
}
...

```

The solutions above are/were provided by me. I'm am newer to TypeScript. Use with caution but without fear or blame.

## Conclusion: Why I will be using Types as much as possible

I'm not a rocket scientist—far from it. When writing code, I want feedback as quickly as possible as much as possible. After learning how continuous integration, linting and test driven development could help me improve, wanting more support from tools like TypeScript is a no brainer. TypeScript, I've found has not only helped me define Types but it also helps me break down code—making it simpler.
