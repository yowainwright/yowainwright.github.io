---
title: How To Execute Node Commands To Test With Jest
date: '2021-01-19'
path: '/jest-exec-test'
meta: This post is a quick summary of running node script execution tests with Jest.
categories:
  - code
  - typescript
  - javascript
---

This post is a quick summary of running [Node](https://nodejs.org/en/) [script execution](https://webplatform.github.io/docs/tutorials/your_first_look_at_javascript/#:~:text=To%20execute%20JavaScript%20in%20a,element%20with%20a%20src%20attribute.) tests with [Jest](https://jestjs.io/). This post will be written with [TypeScript](https://www.typescriptlang.org/) code snippets but I hope everything will still be clear if you're using plain JavaScript. Brief summaries of script execution, CLIs, Jest, and typescript are written below.

## Why This Post Is Written

When writing tests for a Command Line Interface ([CLI](https://en.wikipedia.org/wiki/Command-line_interface)), I googled for a clear path to writing CLI test in Jest and didn't find much! To some writing CLI tests may be obvious and therefore no pattern needs to be reviewed or copied. Good for you! However, for me at least, I like to be able to read about a common pattern that works and copy that pattern. This makes code and conversations about code easier! This sentiment is turning into a whole other can-of-worms. So how about some code, shall we? That **is** why you're here, I assume.

## A sample test to copy

```typescript
import fs from 'fs'
import { exec } from 'child_process'
import { someScript } from './some-script'

describe('<someScript>', () => {
  it('<does something>', async (done) => {
    const script = `${<someScript>} ${config} ${dest}`
    await exec(script, () => {
      const result = fs.readdirSync(dest)
      expect(result).toEqual(<actual>)
      done()
    })
  })
})
```

Now that a copy/paste snippet has been added, I feel better. How about you?

## Monorepo Utilities

Here's the project I'm working [on]() which led me to writing this post. [Monorepo Utilities]() is group of tools to help developers more easily develop within a monorepo echo system. For each tool, a CLI program is added. I feel these tools can really help developers think less when using Monorepos. Please give the repo a star!

## Techinary summary

Hopeing the summary below clarifies technical terms used in this post!

- **Script Execution** is the execution of some code. This when programming is often done in a terminal but scripts can be executed in many other ways!
- **Command Line Interface CLI** is an interface which is used to run commands. Commands for the purpose of this post **are** scripts.
- **Jest** is popular open source testing library for JavaScript and Typescript.
- **TypeScript** is typed version of JavaScript which is used to descriptively describe and support the writing and reading of JavaScript code.

Hopefully this summary supports you in getting started writing script execution tests using jest! I'm happy to provide more insight if needed!

## Project Setup

In the summary below, how I setup a CLI to be written in TypeScript and tested using Jest is described.

## Installation

First install the necessary dependencies. For my project, I'm using [Sade](https://github.com/lukeed/sade) by [Luke Edwards](https://github.com/lukeed) for my CLI.

## Install Commands

```bash
# install a new node version, node 14+ hopefully
nvm i
# yarn is expected, npm can be used,
# install dependencies
yarn add sade -S
# installl devDependencies
yarn add ts-node typescript jest ts-jest @types/node @types/jest @types/sade -D
```

## Configuration setup

The configurations below a generalized for clarity (hopefully)!

## Package.json

```json
"bin": {
  "<someScript>": "./dist/index.js"
},
"scripts": {
  "build": "tsc",
  "test": "jest --maxWorkers=4 --collectCoverage=true --testTimeout=10000"
},
"jest": {
  "name": "<someScript>",
  "projects": [
    "<rootDir>/*"
  ],
  "resetMocks": true,
  "rootDir": "./",
  "roots": [
    "<rootDir>/src"
  ],
  "testEnvironment": "node",
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  }
}
```

## Tsconfig.json

```json
{
  "compilerOptions": {
    "allowJs": false,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "esModuleInterop": true,
    "checkJs": false,
    "lib": ["esnext", "dom", "es6", "dom.iterable"],
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6"
  },
  "exclude": ["dist", "**/*.test.ts", "packages/*/dist/**", "*.js"]
}
```

### Files

The files below display a CLI file using Sade and a corresponding test.

```typescript
// src/index.ts
#!/usr/bin/env node

import sade from 'sade'
import { <someScript> } from './some-script'
import pkg = require('../package.json')

/**
 * <someScript>
 * @description a function
 * --------------------------------
 * @summary function
 * This function does...
 */

const prog = sade('some-script')

prog
  .version(pkg.version)
  .command('run <config> <dest>')
  .describe("<does something")
  .example('run package.json dist')
  .action((config, dest) => installDependencies({ config, debug: true, dest, process }))

prog.parse(process.argv)

export { <someScript> }
```

```typescript
import fs from 'fs'
import { exec } from 'child_process'
import { someScript } from './some-script'

describe('<someScript>', () => {
  it('<does something>', async (done) => {
    const script = `${<someScript>} ${config} ${dest}`
    await exec(script, () => {
      const result = fs.readdirSync(dest)
      expect(result).toEqual(<actual>)
      done()
    })
  })
})
```
