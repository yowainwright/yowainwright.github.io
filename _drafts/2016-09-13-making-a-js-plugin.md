---
title: A-ha Moments Writing Simple JavaScript Plugins
date: 2015-02-09 00:00:00 Z
permalink: "/making-a-js-plugin/"
categories:
- code
- javascript
layout: post
author: Jeff Wainwright
meta: 
share_image: "/assets/icons/js.jpg"
---

I've made a few small JavaScript Open Source plugins—[reframe.js](https://dollarshaveclub.github.io/reframe.js/), [shave](https://dollarshaveclub.github.io/shave/) and, recently [scrolldir](https://github.com/dollarshaveclub/scrolldir)(built off of [Patrick Fisher's](https://github.com/pwfisher) [scroll-intent](https://github.com/pwfisher/scroll-intent.js)). While making them, I've had a few _a-ha_ moments. Plugins should be simple. Their functionality should be all that matters. Making them as usuable as possible is key. 

For starters, here's how I define [Plugins](https://jeffry.in/4-categories-js-projects/) within the JavaScript eco-system. 

## Plugins Should Be Simple

_JavaScript plugins should be simple_! It should be easy to setup plugins to do the thing that they are supposed to do. Between downloading and integration, plugins should take only several minutes to understand, implement and try out.

A simple plugin works within the functionality of larger JavaScript eco-systems. Featurization of a plugin should not extend far beyond the problem that the plugin solves and should probably just focus it's usability within a larger eco-system—not extended options.

In example, there is a current gap between thousands of awesome jQuery Plugins and the way that people are writing code today. This has led to people re-writing jQuery Plugins to be Plugins for Frameworks, like React or Ember. In other words, with the rapidness that JavaScript changes, plugins that are built for a Framework or Library can be a very hard thing for the community to keep up with. Plugins offer true utility when they can work and be used across other JavaScript projects with minimal effort.

To accomplish this with my plugins, I've written them in as plain of JavaScript as possible and try to offer the ability for other JavaScript projects to easily intergrate with them.

With these few lines of code, I've allowed for jQuery and Zepto to be used.

{% highlight javaScript %}

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.shave = function shavePlugin(maxHeight, opts) {
      shave(this, maxHeight, opts);
      return this;
    };
  }
}

{% endhighlight %}

A really cool thing about writing code this way is that all of the code be tree shaken if unneeded. As JavaScript Services like Webpack and Rollup become more advanced Plugins can be more modifiable to serve the user.

## The Functionality Is What Matters

A plugin's users should be able to understand its code but trust that it works. Featurization should not extend far beyond the problem. 

To understand this concept, I think of the [carousel](http://shouldiuseacarousel.com/). Carousel's whether hot or not are still implemented by many companies. When looking for a carousel, it is very easy to find carousel plugins that offer extensive tooling. It's cool to go through their demo pages but how much is each user going to use all of the carousel options? If the user cannot tree shake the unneeded options then the are forced to add code to support features that they do not use. This is bad!

So, when making or looking for plugins, I suggest trying to support a simple function and making that function's options support usability rather then features that may not be needed. If you'd like to offer featuring options, it should be important to make sure that unnused features can be removed or unincluded.

## Plugins Should Be Very Usable

Users of a JavaScript plugin should be able to require it, wrap it and treeshake it to make it truly only do what it is supposed to do! When making plugins, focus should on the extension of it wrather then its options. 

When providing options, I often use options as a way to remove any trace of the plugin itself. From there, I try to provide ways to make the plugin extendable. If the extension of an extendable bit of code reaches too far—it makes sense to write another plugin. This helps with the plugin's simplicity and functionality. 


## Why make these small plugins?

I've been making small plugins to support larger JavaScript projects or for simple use cases. I often look for opportunities to minimize my code by seeing if I can simplify what's out there or if I find a great jQuery plugin that I'd like to include in a project, I often find that with ES6 it's easy enough to just write, simplify it and include it. 





