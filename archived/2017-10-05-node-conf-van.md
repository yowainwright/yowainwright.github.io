---
title: Vancouver Node Conference, 2017—a summation
date: "2017-10-05"
layout: post
readNext: "/"
path: "/node-conf-vancouver-17/"
meta: Vancouver Node Conference, 2017 discussed current hot topics including [GraphQL](http://graphql.org/), serverless services, Web Assebly in the Browser—along with other announces like, Node become a V8 first class citizen
featured_image: null
categories:
- note
- story
---

ES6 tips, [GraphQL](http://graphql.org/), [Serverless](https://en.wikipedia.org/wiki/Serverless_computing), [Web Assembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) in the browser, and [V8](https://developers.google.com/v8/) owned the talk space at the Vancouver Node Conference host at the [Vancouver Convention Center](http://www.vancouverconventioncentre.com/).


----

## Vancouver Node Conference—the talks

Listed below are very high level quickly typed notes that were written during talks along with descriptions of key conference features that I did a little research on. This post should be looked at as quick thoughts before and after the conference.

---

### Compiler JS Notes (V8)

[V8](https://en.wikipedia.org/wiki/Chrome_V8) is a JavaScript Compiler for the Chrome Browser that compiles JavaScript to Machine Code that is run in the browser. Previously, V8 was built to compile JavaScript strictly for the chrome browser which meant that open source projects like Node that were dependent on V8 ran into issues with V8 updated. After time there was more acknowledgement and support but ultimately, Node support did not affect V8 Chrome timelines. Now, that has changed. Node is a first class citizen of V8. This means that V8 updates must fully support Node to be released.

There was more than 1 talk about V8.

----

#### V8 update run through
Note from the [Franzi Hinkelmann](https://twitter.com/fhinkel?lang=en) [talk](http://events.linuxfoundation.org/events/node-interactive/program/agenda)

-  V8 has no notion of the dom or the console.
-  Embedding V8 was difficult because it focused on Chrome
   -  V8 focused on Chrome before Node 8
-  New compiler pipeline for Node 8
-  V8 released every 6 weeks
-  Debugging
   -  deprecating old debugger
   -  now uses chrome inspector
-  Node is now a first class citizen in V8
   -  Breaks in node stop V8 releases
   -  Perf benchmarks beings worked on
-  VM—V8 can work in MS OS
   -  Node is on ChakraCore (Internet Explorer)

----

### Security

Security was a more quiet hot topic. NPM and Google speakers discussed spoke exclusively on security but it was mentioned in almost every talk.

#### Browser security

Browser security was discussed in talks. It an issue in development as well as in package management.

----

#### A quick run through of security issues in 2013 to now
Notes from [Nwokedi Idika](https://twitter.com/nwokedi?lang=en)'s [talk](http://events.linuxfoundation.org/events/node-interactive/program/agenda)

##### Web security issues (2013)
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

#### NPM Security Updates

[NPM](https://www.npmjs.com/)'s rapid growth has lead to learnings in both security and popularity support. NPM has been dealing with security problems in such areas as fake packages that perform malicious jobs. NPM is dealing with these issues in both their CLI and in there ability to search for malicious packages.

----

#### NPM has recently added new tooling to their CLI for more security
Notes from [C J Silverio](https://github.com/ceejbot)'s' [talk](http://events.linuxfoundation.org/events/node-interactive/program/agenda)

NPM's new security cli arguments

-  `npm token`
   -  `--read-only`
   -  `cidr-[ip range]`
   -  `npm token list`
     -  `npm token delete`
   -  `set twitter handle`
   -  `two factor auth`
   -  enable 2auth
- `npm ci`

### Node and JavaScript Talks

General node talks covered the node event loop, updates, and new features that landing recently and that are comings

####  Node Event Loop

The node event loop was discussed in regards to debugging and speed.

----

#### Common problems debugging node event loops (high level)
~ from the [Nathan White](https://github.com/nw) [talk](http://events.linuxfoundation.org/events/node-interactive/program/agenda)

-  CPU problems
   -  timeouts
   -  timeouts
   -  large JSON
   -  deeply needed templates
   -  monitor node event loop
      -  node event loop
      -  node gc profiling
      -  node headdump

#### New JavaScript features

JavaScript is now releases new versions yearly. Several talks discussed new JavaScript features in more detail.

#### New(er) JavaScript features

~ from the [Ethan Brown](https://twitter.com/ethanrbrown?lang=en) [talk](http://events.linuxfoundation.org/events/node-interactive/program/agenda)

-  [es6 computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
-  [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
-  [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
-  [immutability](https://www.sitepoint.com/immutability-javascript/)

#### Building node for ludicrous speed

Making web pages fast is always an important topic.

> Notes on how/why Fastify is the fastest

~ from the [Matteo Collina](https://github.com/mcollina) [talk](http://events.linuxfoundation.org/events/node-interactive/program/agenda)

- [Fastify](https://github.com/fastify/fastify)
   -  change up JSONStringify
      -  [Fast-json-stringify](https://github.com/fastify/fast-json-stringify)

---

# Incomplete!

#### Keynote topics

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
     -  support is happening

### Serverless

### Serverless + GraphQl

-  Serverless
   -  there are still servers
   -  deployment was difficult
   -  FE Stack
      -  node.js + preact, Lamda, Redis (10,000 max by default)
-  GraphQL
   -  started using GraphQL, because we did
   -  super easy for the front end
-  Faas
   -  cloud glue—instead of the name serverless
   -  lamda—can only run a certain number of functions at 1 time
-  Redis + GraphQL
   -  Gradius (GraphQL + Redis)
-  Bustle must've switched from Ember
-  GraphQL + Lamda

### Serverless

####  Using Arc.codes

-  Architect and how to use it

-  Node with Serverless
   -  makes background processing a breeze
   -  horizontal scaling/hight scale is easier than ever
   -  serverless brings in more developers
      -  it makes it easier

### GraphQL

### Serverless + GraphQl

-  Serverless
   -  there are still servers
   -  deployment was difficult
   -  FE Stack
      -  node.js + preact, Lamda, Redis (10,000 max by default)
-  GraphQL
   -  started using GraphQL, because we did
   -  super easy for the front end
-  Faas
   -  cloud glue—instead of the name serverless
   -  lamda—can only run a certain number of functions at 1 time
-  Redis + GraphQL
   -  Gradius (GraphQL + Redis)
-  Bustle must've switched from Ember
-  GraphQL + Lamda

### Regular Expressions

-  How people deal with Regular Expressions
-  Dealing white spaces with Regular Expressions
-  Where did Regular Expressions come from?
   -  Regular expressions came in the 1950s
-  common
   -  a|b (grouping)
   -  ? 0 or 1
   -  \* 1 or more
-  Chomsky hierarchy of grammars
   -  recursively enumerable
   -  type-0 grammar
      -  every computer is type-O grammar
   -  type-1 grammar
   -  type-2 grammar
-  can't parse html in the past because of nesting
   -  regular expressions can now parse html
   -  regular expression and regex
