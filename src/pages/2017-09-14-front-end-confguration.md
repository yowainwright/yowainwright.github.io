---
title: Front End Configuration for Prototyping
date: "2017-09-14"
layout: post
readNext: "/"
path: "/frontend-prototype-configuration/"
meta: This posts digs into front end configuration for the purposes of prototyping.
featured_image: null
share_image: null
categories:
- javascript
---

Front end configuration has become an important part of front end development. Speeding up configuration for prototyping purposes can be very important to learning about what is being prototyped. Approximately a [decade ago](#history), front end development consisted of `HTML`, `CSS`, and `JavaScript`. Front end development is often a lot more [complex](#current) now. It includes linting, bundling, transpiling, and testing. When prototyping, it is important to get up and run as [fast as possible](#configuration). This post will document changes in front end development between then and now. It will briefly describe a current observed pain point. It will then provide potential ways to get up and running for prototyping purposes as quickly as possible.

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

```html

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
     -  .babelrc
     -  .eslint.js
  -  .babelrc
  -  .circleci
  -  .editorconfig
  -  .eslintignore
  -  .eslint.js
  -  .nvmrc
  -  manifest.json
  -  package.json
  -  package-lock.json
  -  some-config.js
  -  maybe-even-another-config.js
  -  rollup.config.js
  -  yarn.lock
  
```


Code itself is less complex and very modular. The steps to publish that code the browser if fair more complex. 

<h2 id="configuration">Front end configuration notes</h2>

Specific configuration for production products is in important. However, when prototyping configuration should be fast and easy so developers can focus on the tool they are trying to prototype for. When developers prototype, the tool that is focused on first is usually the view layer. The developer will decide to build a [React App](https://facebook.github.io/react/) and use `[create-react-app](https://github.com/facebookincubator/create-react-app)` or the same for [Vue](https://vuejs.org/). These sort of products are great for speed, seeing what the view layer tool can do and hopeufully getting a general understand of what the view layer does. However, when developers must stray away from the app generator, there can be a lot of confusion and rewriting. To avoid this, developers can install JavaScript tooling minimally. 

<figure>
  <img src="https://yowainwright.imgix.net/configuration/quick-configuration.png" alt="Quick Configuration" />
  <figcaption>Create React App, Yeoman, Codekit make configuration fast</figcaption>
</figure> 

<figure>
  <img src="https://yowainwright.imgix.net/configuration/configuration-problem.png" alt="Configuration Prototype" />
  <figcaption>Problems with quick configuration are when quick configuration must be changed and then everything must be changed</figcaption>
</figure> 

### Simple configuration for prototyping

To develop a simple configuration so developers can focus on the view layer that will define there project descide what is the prototype. Prototyping a React app is not using Create React App. Must of the work is provided provided well. However, if used without a deeper awareness of what the tool does, developers may not have awareness of the bundled, compiled, and transpiled product.

<figure>
  <img src="https://yowainwright.imgix.net/configuration/prototype-configuration.png" alt="Configuration Prototype" />
  <figcaption>To setup configuration for prototyping, simplifying the build can help</figcaption>
</figure> 

The steps below are high level, focusing only on configuration.

**Note:** The following steps can be done with an text editor or differently with varying shells. This post is about configuration so the focus is doing this with as few of tools as possible. Therefore, the post will document the how-to's with Nano.

### Linting

[Linting](https://eslint.org/) communicates how a prototype's JavaScript should be written. For this tool, it is recommended to intall the defaults that are standard with the view layer.

If a React App is being prototyped

```shell
npm i eslint eslint-plugin-react --save-dev
```

Define linting configuration

```shell
echo '{ "plugins": [ "react" ] }' > .eslintrc
```

#### Setup JavaScript linting

A corresponding script can be added to the prototype's `package.json` file
```shell
nano package.json
```

Within `scripts {object}`
```shell
"lint": "node_modules/eslint/bin/eslint.js . ./src/*.js"
```

**Note:** this command assumed there is a `src/` directory and doesn't assume other directories might need linting. Change the script above accordingly to suite your needs.

### Babel

[Babel](https://babeljs.io/) can sometimes do all of the bundling. This post will go into how to setup both simply.

Install Babel (global install)
```javascript
npm i babel-cli babel-core babel-preset-es2015 -g
```

Set up Babel configuration
```javascript
echo '{ "presets": [ "es2015" ] }' > .babelrc
```

### Setup JavaScript transpilation with only Babel

A corresponding script can be added to the prototype's `package.json` file
```shell
nano package.json
```

If bundling is needed, within `scripts {object}`. Move on to [bundling](#bundling).
```shell
"transpile": "babel js src -d tmp"
```

If bundling is **not** needed, within `scripts {object}`. Move on to [testing](#test).
```shell
"transpile": "babel js src -d dist"
```

<h3 id="bundling">Bundling</h3>

With [Rollup](https://rollupjs.org/) version `0.50.0`, JavaScript projects can be bundled with no configuration file making setup very fast and thoughtless.

Install Rollup
```shell
npm i -g rollup
```

### Setup Rollup bundling

```shell
nano package.json
```

Within `scripts {object}`
```shell
"bundling": "npm run transpile && rollup ./tmp/*.js --o ./dist/*.js --f umd"
```

<h3 id="test">Testing</h3>

Testing is a important to defining a prototype's value and discovery.

Install [Jest](https://facebook.github.io/jest/). 
```shell
npm i jest --save-dev && nano package.json
```

Create a test script
```shell
"test": "jest"
```

After making a npm test script, make a `test.[a file].js` file that matches a `[a file].js` to be tested. 

### Conclusion

Front end development has changed a lot in the last years. Cleaner code comes with more configuration. Magic configuration or going into the weed about setting up perfect configuration can lead to highly beneficial results. For prototyping, simplifying the build process can really help learn and understand how the project might be built.

I hope the information and steps above help.










