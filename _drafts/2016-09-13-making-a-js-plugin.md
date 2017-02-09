---
title: A-ha Moments Writing Simple JavaScript Plugins
date: 2016-09-13 00:00:00 Z
permalink: "/making-a-js-plugin/"
categories:
- code
- javascript
layout: post
author: Jeff Wainwright
meta: 
share_image: "/assets/icons/js.jpg"
---

I've made a few small JavaScript Open Source plugins ([reframe.js](https://dollarshaveclub.github.io/reframe.js/) and [shave](https://dollarshaveclub.github.io/shave/)). While making them, I've had a few _a-ha_ moments. Plugins should be simple. Their functionality should be all that matters. Making them as usuable as possible is key. 

For starters, here's how I group JavaScript Open Source Projects. 

-  Plugins
-  Libraries
-  Frameworks
-  Services

**Plugins:** are a small usable functions. They do 1 thing should be usable across a wide spectrum of Frameworks, Libraries and services. 

**Libraries:** are groups of utilities. Libraries are projects like [jQuery](http://jquery.com/) or [LoDash](https://lodash.com/). They create ways for their users to more easily do things like manipulate html.

**Frameworks:** are projects like [Angular](https://angular.io/docs/js/latest/), [Ember](http://emberjs.com/), or [React](https://facebook.github.io/react/). They establish patterns for writing entire systems of code.

**Services:** are things like task runners ([Webpack](http://webpack.github.io/) or [Babel](http://babeljs.io/)). These sorts of tools make it easier to compile things like Frameworks or Libraries. 

## Plugins Should Be Simple

_Plugins should be simple_ means plugins should easily do the thing that they are supposed to do. It should take very little time from the user finding the plugin to them being able to integrate it.

A simple plugin works within the functionality of larger eco-systems. Featurization of a plugin should not extend far beyond the problem that the plugin solves and should probably just focus it's usability within a larger eco-system.

In example, there is a major gap between thousands of awesome jQuery Plugins and the way that people are writing code today—often in other eco-systems like React. This has led to people re-writing jQuery Plugins to be React Plugins. In other words, with the rapidness that JavaScript changes, plugins that are built for a framework or libraray can be a very hard thing for the community to keep up with. Plugins offer true utility when they can work and be used across other Libraries, Frameworks or Services with minimal effort.

To accomplish this with my plugins, I've written them in as plain of JavaScript as possible and try to offer the ability for plugins to easily intergrate with them.

With these few lines of code, I've allowed for jQuery and 

## The Functionality Is What Matters

A plugin's users should be able to understand its code but trust that it works. Featurization should not extend far beyond the problem

## Plugins Should Be Very Usable

They should be able to require it, wrap it, treeshake parts of it to make it truly only does what it is supposed to do. When making plugins, it is very easy to featurize it into library-dom but a well written plugin should accommodate it's users being able to do that. 


## Why make these small plugins?







