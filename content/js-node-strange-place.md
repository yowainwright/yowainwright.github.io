---
title: "Quick Thought: Does it feel like JavaScript and Node are in a strange place?"
date: '2023-04-15'
layout: post
readNext: '/'
path: '/js-node-strange-place'
meta: "It feels sorta like JavaScript and Node are in a weird place. They've greatly improved but are we using them for things we shouldn't?"
featured_image: null
post_type: technical
categories:
  - Node
  - JavaScript
  - Standard Libraries
  - Testing
---


It feels like JavaScript and Node are in a strange place.

Getting the opportunity to work in other languages has caused me to think on this more. With JavaScript and Node, I enjoy the capability to work across the stack. And, with that capability, there's **always** powerful a JavaScript or Node tool for what I want to do. Node via NPM has built something awesome for creativity with package management!

However, after writing code in other languages, it feels like Node and JavaScript are in a "strange place".

---

## To give you an idea of what I mean, here are a few bullets that capture some of my thoughts!


- First off, [Typescript](https://www.typescriptlang.org/)! If types are needed, why not use a language with built-in type support and a formatter?
- Second, [more](https://github.com/evanw/esbuild) and [more](https://github.com/vercel/turbo) code is written in other languages to support JavaScript and Node limitations—like Typescript.
- Additionally, because of JavaScript's popularity and extensibility, it's a [security risk](https://socket.dev/) which should be considered.
- Finally, JavaScript and Node are expensive. Why are they expensive? Well, to do anything with them, you're moving [thousands of modules](https://www.npmjs.com/package/eslint?activeTab=dependencies) everywhere to [run them anywhere](https://twitter.com/Thomasorus/status/1568918571727601664?s=20). They both also will **consume _all of the memory_ if enabled** because JavaScript is [single threaded](https://medium.com/swlh/what-does-it-mean-by-javascript-is-single-threaded-language-f4130645d8a9).

> To do anything with [Javascript or Node], you're moving thousands of modules everywhere to run [JavaScript or Node] anywhere.

---

## Folks can hope for a better tomorrow


My hope is that JavaScript and Node can once again embrace their dynamic nature so we can avoid transpilation and all of the modules required to build things. It would be great if modules were assets, not requirements.

Typescript isn't bad but it isn't a solution. I feel it highlights problems that should be solved in JavaScript and/or Node apis. JavaScript should implement types. Node should do static checks ([like Go](https://go.dev/blog/gofmt)) and support [import maps](https://github.com/WICG/import-maps). The community should embrace Node's [testing module](https://nodejs.org/api/test.html).

These features would remove many reasons for transpilation, reduce security risks, and make JavaScript and Node more maintainable. If issues with modules and overall system performance aren't addressed, I can envision a world were the engineering community avoids JavaScript and Node for the wrong reasons. It's a long road ahead! I definitely don't know what will happen but I'm excited to see what the future holds!

---
