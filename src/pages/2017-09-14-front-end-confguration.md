---
title: Front End Configuration for Prototyping
date: "2017-09-14"
layout: post
readNext: "/"
path: "/frontend-prototype-configuration/"
meta: This posts digs into front end configuration for the purposes of prototyping
featured_image: null
share_image: null
categories:
- note
- story
---

Front end configuration has become an important part of front end development. Speeding up configuration for prototyping purposes can be very important to learning about what is being prototyped. Approximately a [decade ago](#history), front end development consisted of `HTML`, `CSS`, and `JavaScript`. Front end development is often a lot more [complex](#current) now. It includes linting, bundling, transpiling, and testing. When prototyping, it is important to get up and run as [fast as possible](#configuration). This post will document changes in front end development between then and now. It will then go into potential ways to get up and running for prototyping purposes as quickly as possible.

---

<h2 id="history">Front end configuration 10 years ago</h2>

Front end development consisted of `<html>`, `.css`, and `.js`. `.css` and `.js` files were added via `<script>` or `<link>` tags individually. 

```html

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <link href="main.css" />
    <link href="ie.css" />
    <link href="print.css" />
  </head>
  <body>
    <div>Everything was a div</div>
    <script src="jquery.js"></script>
    <script src="main.js"></script>
  </body>
</html>

```

That was it. `HTML`, `CSS`, and `JavaScript` APIs had a lot less to them. The difficulty was that APIs were more minimal and browser quirks were more critical.

<h2 id="current">Front end configuration now</h2>

Front end development is a lot different today. Code itself if much easier to digest. `HTML`, `CSS`, and `JavaScript` APIs are more mature. Browser quirks are much less mission critical. 

Despite the greatly improved simplicity in the main front end APIs, the directory structure of a front end repository is much more complex.

-  dist/
-  src/
   -  components/
   -  layouts/
   -  pages/
   -  styles/
   -  templates/
-  test/
   -  acceptance/
   -  unit/
   -  `.babelrc` another one
   -  `.eslint.js` another one
-  `.babelrc`
-  `.circleci`
-  `.editorconfig`
-  `.eslintignore`
-  `.eslint.js`
-  `manifest.json`
-  `.nvmrc`
-  `package.json`
-  `package-lock.json`
-  `some-config.js`
-  `maybe-even-another-config.js`
-  `rollup.config.js`
-  `yarn.lock`


Code itself is less complex and very modular. The steps to publish that code the browser if fair more complex. 

<h2 id="configuration">Speed up front end configuration for prototyping</h2>






