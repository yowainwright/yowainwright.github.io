---
title: Vancouver Node Conference, 2017—a summation
date: "2017-10-05"
layout: post
readNext: "/"
path: "/node-conf-vancouver-17/"
meta: Vancouver Node Conference, 2017 discussed current hot topics include GraphQL, Serverless, Web Assebly in the Browser and Speed benchmarks—along with other announces like, Node become a V8 first class citizen
featured_image: null
categories:
- note
- story
---

The Vancouver Node Conference was well hosted. Serverless, GraphQL, ES6 tips,and V8 owned the talk space. Yet, there were other talks which were informative.

## Vancouver Node Conference—the talks

Listed below is are general bulleted notes of talks that I listened too during Node Conference in Vancouver.

**Be warned:** each list item is thoughless typing in nature. Read later summations on the website for deeper-dives into key points that were discussed in the conference.

### JS Good Intentions

-  Good INtuen Kim Crayton

### Compiler JS Notes (V8)

> Quick run through of compilation

-  V8 has no notion of the dom or the console.
-  Embedding V8 is difficult. It focused on Chrome
   -  V8 focused on Chrome before Node 8
-  New compiler pipeline for Node 8
-  V8 released every 6 weeks

-  Debugging
   -  deprecating old debugger
   -  now use chrome inspector
-  Node is now a first class citizen in V8
   -  Breaks in node stop V8 releases
   -  Perf benchmarks beings worked on
-  VM
   -  Node is on ChakraCore (Internet Explorer)

### NPM Security Updates

> What NPM does to ensure their code is safe

-  `npm token`
   -  `--read-only`
   -  `cidr-[ip range]`
   -  `npm token list`
     -  `npm token delete`
   -  `set twitter handle`
   -  `two factor auth`
   -  enable 2auth
- `npm ci`

### Node security testing

-  Web security issues (2013)
   -  sql injections
   -  cross site scripting (XSS)
   -  broken auth
   -  insecure direct object reference
   -  functionality abuse
   -  security definition
      -  specifying security definitions

-  Scraping
   -  Collecting content from one of more web pages
-  Account Creation
   -  Creating a ton of accounts for misuse
-  Carding
   -  Testing out stolen credit cards
-  Credential Stuffing
   -  Test accounts

### Node Event Loop

-  CPU problems
   -  timeouts
   -  fstimeouts
   -  large JSON
   -  deeply needed templates
   -  monitor node event loop
      -  node event loop
      -  node gc profiling
      -  node headdump

### JS updates

-  es6 computed property names
-  async/await
-  promises
-  imutability

### Building node for ludicrious speed

- [Fastify](https://github.com/fastify/fastify)
   -  change up JSONStringify
      -  [Fast-json-stringify](https://github.com/fastify/fast-json-stringify)

### Serverless + GraphQl

-  Serverless
   -  there are still servers
   -  deployment was difficult
   -  FE Stack
      -  node.js + preact, Lamda, Redis (10,000 max by default)
-  GraphQL
   -  started using GraphQL, because we did
   -  just super easy for the front end
-  Faas
   -  cloud glue—instead of the name serverless
   -  lamda—can only run a certain number of functions at 1 time
-  Redis + GraphQL
   -  Gradius (GraphQL + Redis)
-  Bustle must've switched from Ember
-  GraphQL + Lamda

### Serverless

-  Node with Serverless
   -  makes background processing a breeze
   -  horizontal scaling/hight scale is easier than ever
   -  serverless brings in more developers
      -  it makes it easier

### Regular Expressions

-  How people deal with Regular Expressions
-  Dealing white spaces with Regular Expressions
-  Where did Regular Expressions come from?
   -  Regular expressiong came in the 1950s
-  common
   -  a|b (grouping)
   -  ? 0 or 1
   -  \* 1 or more
-  Chomsky higherarchy of grammars
   -  recursively enumerable
   -  type-0 grammar
      -  every computer is type-O grammar
   -  type-1 grammar
   -  type-2 grammar
-  can't parse html in the past because of nesting
   -  regular expressions can now parse html
   -  regular expression and regex

###  Using Arc.codes

-  Architect and how to use it

### Keynote

-  James Snell
   -  Async Hooks
     -  Hooks into aysnc hooks
   -  Perf Hooks
     -  Node specific performance metrics
   -  Better Debugging
   -  Promisify
     -  New implementations of promises
   -  Error Handling
     -  Specific messages
   -  Better informations of Failures
     -  In logs, etc
   -  Workers
     -  Standard API
   -  HTTP/2
     -  support is happenning

-  Miles Borins
   -  Historical Timelines

-  Justin Beckwith
   -  History of Justin Beckwith
      -  Started with Flash
      -  Socket.io with node
      -  Express
      -  Backbone.js
   -  History of Google and Node
      -  2015—more node for the company that created GO?
      -  BitQuery
      -  TypeScript
      -  Starting small
         -  App Engine
         -  Node JS Foundation
         -  Supporting V8

-  Sarah Novotny
-  Anna Henningsen
   -  Whos working in node?
   -  What is being worked on?
-  Kris Borchers
   -  JS Foundation information
-  Rachel White
   -

---

## Other notes

-  Look into Choo
