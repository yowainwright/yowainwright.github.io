---
title: A-ha Moments Writing Simple JavaScript Plugins
date: "2017-03-09"
layout: post
readNext: "/"
path: "/making-a-js-plugin"
meta: Moments writing JavaScript Plugins
share_image: "https://yowainwright.imgix.net/icons/icons/js.jpg"
featured_image: null
post_index: 33
categories:
- code
- javascript
---

I've made a few small JavaScript Open Source plugins—[reframe.js](https://dollarshaveclub.github.io/reframe.js/), [shave](https://dollarshaveclub.github.io/shave/) and, recently [scrolldir](https://github.com/dollarshaveclub/scrolldir)(built off of [Patrick Fisher's](https://github.com/pwfisher) [scroll-intent](https://github.com/pwfisher/scroll-intent.js)). While making them, I've had a few _a-ha_ moments.

## A-ha Moments 💭
**Plugins should be simple.** Their functionality should be all that matters. Making them as useable as possible is key.

**Open source and 'Plugins'** are loosely defined in the Open Source community—which I hope will change. Here's how I define [Plugins](https://jeffry.in/4-categories-js-projects/) within the JavaScript ecosystem. There was heavy debate, even with my friends about that post—which I think pointed to the fact that _plugins are loosely defined_.

## Plugins Should Be Simple 💁

JavaScript plugins should be simple! It should be easy to setup plugins to do the thing that they are supposed to do. Between downloading and integration, plugins should take only several minutes to understand, implement and try out.

A simple plugin works within the functionality of larger JavaScript ecosystems. Featurization of a plugin should not extend far beyond the problem that the plugin solves and should probably just focus it's usability within a larger ecosystem—not extended options.

In example, there is a current gap between thousands of awesome jQuery Plugins and the way that people are writing code today. Now people are re-writing jQuery Plugins to be Plugins for Frameworks, like React and Ember. In other words, with the rapidness that JavaScript changes, plugins that are built for a Framework or Library can be a very hard thing for the community to keep up with. Plugins offer true utility when they can work and be used across other JavaScript projects with minimal effort.

To accomplish this with the plugins I've worked on, I try to write them in as plain of JavaScript as possible and try to offer the ability for other JavaScript projects to easily integrate with them.

With these few lines of code, I've allowed for jQuery and Zepto to be used for Reframe.js and Shave.

```javaScript

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.shave = function shavePlugin(maxHeight, opts) {
      shave(this, maxHeight, opts);
      return this;
    };
  }
}

```

A really cool thing about writing code this way is that all of the code be tree shaken if unneeded. As JavaScript Services like Webpack and Rollup become more advanced Plugins can be more modifiable to serve the user of the plugin.

## Functionality Is What Matters 📈

A plugin's users should be able to understand its code but trust that it works. Featurization should not extend far beyond the problem that the plugin solves.

To understand this concept, I think of [carousels](http://shouldiuseacarousel.com/). Carousel's whether hot or not are still implemented by many companies. When looking for a carousel, it is very easy to find carousel plugins that offer extensive tooling. It's cool to go through their demo pages but how much is each user going to use all of the carousel options? If the user cannot tree shake the unneeded options then they are forced to add code to support features that they do not use. This should be improved!

So, when making or looking for plugins, I suggest trying to support a simple function and making that function's options support usability of that function rather then features that may not be needed. If you like to offer featuring options, it should be important to make sure that unused features can be removed or unincluded by treeshaking or in a build step of the plugin.

## Plugins Should Be Usable 🛠

Users of a JavaScript plugin should be able to require it, wrap it and treeshake it to make it truly only do what it is supposed to do! When making plugins, focus should on the extension of it rather then its options.

When providing options, I often use options as a way to remove any trace of the plugin itself. From there, I may try to provide ways to make the plugin extendable. If the extension of an extendable bit of code reaches too far—it makes sense to write another plugin. This helps with the plugin's simplicity and functionality.

## Why make small plugins?
I've been making small plugins to support larger JavaScript projects or for simple use. I look for opportunities to minimize my code by seeing if I can simplify what's out there or if I find a great jQuery plugin and simplify it with ES6.

## In Conclusion, Make Plugins! 🚀

In conclusion, I try to make plugins. Maybe at some point I'll discover a reason to make a framework or library but for right now, plugins that consist of a few simple functions are very usable and extendable. I'm learning a lot for how I can build plugins to be smaller and more usable.
