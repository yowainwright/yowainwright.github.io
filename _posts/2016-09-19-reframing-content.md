---
layout: post
title:  Reframing content responsively with Reframe.js 
author: Jeff Wainwright
date: 2016-09-19
meta: Reframing content, one of the most important things to present well on a content site is embedded content.
permalink: /reframing-content/
categories: code js javascript
note: feature-image-aside
share_image: /assets/reframing-content/aspect-ratio.jpg
featured_image: /assets/js.svg
---

There are unique challenges for developers working with content. The reason: the most meaningful part of the webpage, the content, is a **largely unknown** thing. Content is created by an author that both expects it to convey their message but also the message of the site as a whole. A very important thing to present well on a content site is _embedded content_.

> The most meaningful part of the webpage, the content, [can be] a largely unknown thing

## Rendering unknown content

The reason why content is **largely unknown** is because the author puts images, text, embeds & other things somewhere & then that goes through a **process** that displays the content on a webpage. The process of rendering content to a webpage means that often things are added or removed in an attempt to make it stuff look awesome. To best support this **process**, a developer has to write code to be both hands off & aware.

## Reframing Content

When writing great content, authors use many tools to describe & captivate readers. Sometimes content that is great for conveying content does not translate well - so we need to **reframe** it. This is where **[reframe.js](https://dollarshaveclub.github.io/reframe.js/)** comes into play. Reframe.js, wraps embedded content in a perfect ratio of what it was originally there but at an appropriate width for the content. Specifically, this ratio is called an **[intrinsic ratio](http://alistapart.com/article/creating-intrinsic-ratios-for-video)**. 

<p data-height="380" data-theme-id="0" data-slug-hash="qaaGYV" data-default-tab="result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/qaaGYV/">Intrinsic Ratio Animation</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Videos, playlists, podcasts & are examples of things that are usually embedded content. Embedded content is written, writely so, to best commincate **it's** content well which often means it has a `fixed` height & width. [Reframe.js](https://github.com/dollarshaveclub/reframe.js) was written to address this issue of reframing embedded at the appropriate size for the content.

## Why

Previous to writing this plugin, I used [FitVids](http://fitvidsjs.com/). FitVids is a great plugin for solving reframing embedded content. It's written by 2 of my idols, [Chris Coyier](http://chriscoyier.net/) & [Dave Ruppert](http://daverupert.com/). The reason that **Reframe.js** was originally made was because it doesn't require [jQuery](http://jquery.com/). 
It also: 

1. doesn't assume your reframing just videos, 
2. offers a css mixin rather than inlining css which can make your dom (html) cleaner 
3. & the jquery plugin is written in such a way that if unused - it can be shaken out with [Tree shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.ccnp22e5f).

These things make the code lighter initially.

## Option-s-

The 1 option supported is the ability to add your own css class. This is so that the end result of using **reframe.js** on a webpage _can be_ next to 0 imprint on your webpage (1 inline style added for the intersic ratio). This makes reframe hands off & engineers can be hands on. The plugin **can** be used as jQuery plugin but if you enable tree shaking even that bit of code (5 lines) will be dropped in your build if you don't use **reframe.js** as a jQuery plugin. 

**Reframe.js's** simplicity in both language & options is meant to make the plugin easy to understand & easy to write code to support _**your**_ products end goal. 

## Plugin Breakdown

**CSS (aspect ratio)**

In this sass mixin, we're assuming that the aspect ratio is 16:9 but we can override it to make the perfect image ratio size.

{% highlight sass %}

@mixin reframe($el: iframe, $paddingTop: 56.25%){
  padding-top: $paddingTop;
  position: relative;
  width: 100%;
  #{$el} {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

{% endhighlight %}

**JavaScript**

Wrap a selected element in a `div`.

{% highlight javascript %}

const frame = element // frame is the elmeent to be wrapped
const div = document.createElement('div');
frame.parentNode.insertBefore(div, frame);
frame.parentNode.removeChild(frame);
div.appendChild(frame);

{% endhighlight %}

Add padding to create an intrinsic ratio.

{% highlight javascript %}

// where the frame is the element & the div is the added wrapper element
const height = frame.offsetHeight;
const width = frame.offsetWidth;
const padding = height / width * 100;
div.style.paddingTop = padding + '%';

{% endhighlight %}

Make a plugin for jQuery or zepto.

{% highlight javascript %}

if (window.$) {
  window.$.fn.extend({
    reframe: function reframeFunc(cName) {
      return reframe(this, cName);
    }
  });
}

{% endhighlight %}

Add a check to the top of the plugin which allows us to select the element to reframe with jquery _or_ vanilla js (Kodos to one of my mentors, [Jacob Kelly](http://jakiestfu.com/) especially here)

{% highlight javascript %}

let frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
if (!('length' in frames)) {
  frames = [frames];
}

{% endhighlight %}

Here's the code you write.

{% highlight javascript %}

reframe('selector');

{% endhighlight %}

<p data-height="380" data-theme-id="0" data-slug-hash="Gjjbak" data-default-tab="css,result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/Gjjbak/">Reframe.js jQuery Demo</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## To Dos

Currently, I'm playing with the idea of removing the default padding of the ratio because it should be overwritten everytime the plugin is called.
Also, I think I will be adding a docs folder for using the plugin & specific use cases that might come up.

## Summary

One of the fun challenges when write code for content is to support creativity in a controlled way. Reframe.js is a great solve for making embedded content look great on your website. Initially, we didn't know if we would be using jQuery for our product here at [DSC](https://www.dollarshaveclub.com/) so [FitVids](http://fitvidsjs.com/) was out of the question - which led me down the path of writing some new code. The end result was **reframe.js**. Hope it works well for you if you use it. I plan on writing more light weight plugins to solve common content problems in the future.

If you have questions or ideas in regards to [reframe.js](https://github.com/dollarshaveclub/reframe.js) please contact me [here](mailto:{{ site.email }}), on [twitter](https://twitter.com/yowainwright) or [github](https://github.com/yowainwright). 
