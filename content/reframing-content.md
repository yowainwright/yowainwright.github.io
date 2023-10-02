---
title: Reframing content responsively with Reframe.js
date: "2016-09-19"
path: "/reframing-content"
meta: Reframing content, one of the most important things to present well on a content
  site is embedded content.
categories:
- code
- js
- javascript
---

The most meaningful part of the webpage, the content, can be a largely unknown thing. Authors create content in one place & expect it to render well in another. Embedded content adds another level of complexity to this process.

Embedded content, like videos, images, podcasts & tweets often do not translate well to a fluid webpage - so we need to reframe them. This is what [Reframe.js](https://dollarshaveclub.github.io/reframe.js/) does. It wraps embedded content in an [intrinsic ratio](http://alistapart.com/article/creating-intrinsic-ratios-for-video) of the original embed but with fluid sizing so that the embedded content looks great at any size.

<p data-height="380" data-theme-id="0" data-slug-hash="qaaGYV" data-default-tab="result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/qaaGYV/">Intrinsic Ratio Animation</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Why Reframe.js?

Previous to writing this plugin, I used [FitVids](http://fitvidsjs.com/). FitVids is a great plugin for solving reframing videos. It's written by 2 of my idols, [Chris Coyier](http://chriscoyier.net/) & [Dave Ruppert](http://daverupert.com/). Fitvids _takes a chance_ that most of your content will be 1 of 5 `selectors`. If those assumptions are correct (& if you're using jQuery) - FitVids is golden. If not, there might need to be little extra code on top of the little extra code added that assumes your embedded content will be 1 of 5 `selectors`. The reason that Reframe.js was originally made was because [jQuery](http://jquery.com/) was not being used on a new product at [DSC](http://dollarshaveclub.com).

Reframe.js also:
1. doesn't assume your reframing just videos (by name at least),
2. offers a css mixin rather than inlining css which can make your dom (html) cleaner
3. & offers jQuery plugin that is written in such a way that if unused - it can be shaken out with [Tree shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.ccnp22e5f).
These things make the code lighter initially.

## Options

The one option supported by Reframe.js is the ability to add your own css class instead of the default css class `js-reframe`. This is so that the end result of using the library on a webpage is minimal - just 1 inline style added (for the intersic ratio).

Reframe.js's simplicity in both language & options is meant to make the plugin easy to understand & easy to write code to support your product's end goal.

## Plugin Breakdown

**CSS (aspect ratio)**

In this sass mixin, the default aspect ratio is 16:9 but we can override that to make the reframe a perfect ratio of the embed's original size.

```css

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

```

**JavaScript**

Wrap a selected element in a `div`.

```javascript

const frame = element // frame is the elmeent to be wrapped
const div = document.createElement('div');
frame.parentNode.insertBefore(div, frame);
frame.parentNode.removeChild(frame);
div.appendChild(frame);
```

Add padding to create an intrinsic ratio.

```javascript

// where the frame is the element & the div is the added wrapper element
const height = frame.offsetHeight;
const width = frame.offsetWidth;
const padding = height / width * 100;
div.style.paddingTop = padding + '%';

```

Make a plugin for jQuery or [Zepto](http://zeptojs.com/).

```javascript

if (window.$) {
  window.$.fn.extend({
    reframe: function reframeFunc(cName) {
      return reframe(this, cName);
    }
  });
}

```

Add a check to the top of the plugin which allows us to select the element to reframe with jquery _or_ plain js (Kudos to [Jacob Kelley](http://jakiestfu.com/) here).

```javascript

let frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
if (!('length' in frames)) {
  frames = [frames];
}

```

Here's the code you write.

```javascript

reframe('selector');

```

<p data-height="380" data-theme-id="0" data-slug-hash="Gjjbak" data-default-tab="css,result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/Gjjbak/">Reframe.js jQuery Demo</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## To Dos

Currently, I'm playing with the idea of removing the default padding of the ratio (56.25%) that's in the `css` because it is overwritten every time the plugin is called.
Also, I think I will be adding a docs folder for using the plugin & specific use cases that might come up.

## Summary

One of the fun challenges when writing code for content is to support creativity in a controlled way. Reframe.js is a great solve for making embedded content look great on your website. Initially, we didn't know if we would be using jQuery for our product at [DSC](https://www.dollarshaveclub.com/) so [FitVids](http://fitvidsjs.com/) was out of the question - which led me down the path of writing some new code. The end result was Reframe.js. Hope it works well for you if you use it.

I plan on writing more lightweight plugins to solve common content problems in the future. If you have questions or ideas in regards to [Reframe.js](https://github.com/dollarshaveclub/reframe.js) please contact me - links below.
