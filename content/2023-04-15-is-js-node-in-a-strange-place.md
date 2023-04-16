---
title: "Quick Thought: Does it feel like JavaScript and Node are in a strange place?"
date: '2023-04-15'
layout: post
readNext: '/'
path: '/js-node-strange-place/'
meta: "It feels sorta like JavaScript and Node are in a weird place. They've greatly improved but are we using them for things we shouldn't?"
featured_image: null
post_type: technical
categories:
  - Node
  - JavaScript
  - Standard Libraries
  - Testing
---


It feels like JavaScript and Node are in a strange place. Getting the opportunity to work in other languages has caused me to think on this more. With JavaScript and Node, I enjoy the capability to work across the stack. And, with that capability, there's always powerful tool for what I want to do. Node via NPM has really built something awesome for creativity with package management! However, after writing code in other languages, it feels like Node and JavaScript are in a strange place.

---

## To give you an idea of what I mean, here are a few bullets that capture some of my thoughts!



- First off, [Typescript](https://www.typescriptlang.org/)! If types are needed, why not use a language with built-in support and formatter?
- Second, [more](https://github.com/evanw/esbuild) and [more](https://github.com/vercel/turbo) code is written in other languages to support the limitations of JavaScript—like Typescript.
- Additionally, because of JavaScript's popularity and extensibility, using it is a [security risk](https://socket.dev/) which should be considered.
- Finally, JavaScript and Node are expensive. Why are they expensive? Well, to do anything with them, you're moving [thousands of modules](https://www.npmjs.com/package/eslint?activeTab=dependencies) everywhere to [run them anywhere](https://twitter.com/Thomasorus/status/1568918571727601664?s=20). They both also will **consume all of the memory if enabled** because JavaScript is [single threaded](https://medium.com/swlh/what-does-it-mean-by-javascript-is-single-threaded-language-f4130645d8a9).

---

## Folks can hope


My hope JavaScript and Node can once again embrace their dynamic so we can avoid transpilation and all of the modules required to build things. Typescript isn't bad but it isn't a solution. I feel it highlights problems to be solved in JavaScript and Node. JavaScript should implement types similar to Python's implementation. Node should do static checks ([like Go](https://go.dev/blog/gofmt)) and [import maps](https://github.com/WICG/import-maps). The community should embrace Node's [testing module](https://nodejs.org/api/test.html). These features would remove many transpilation issues, reduce security risks, and make JavaScript and Node more maintainable for everyone. Otherwise, I can envision a world were the engineering community does avoid JavaScript and Node for the wrong reasons.

---
