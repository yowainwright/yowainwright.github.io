---
title: All about Sticky Navs & what happens to them on devices
date: "2016-07-24"
path: "/device-stickybits-on-scroll"
meta:
  Creating a sticky nav that works while scrolling is a difficult issue that must
  be solved, many sites navigations are set to fixed position
categories:
  - javascript
  - code
---

Although navigations stuck to the top of browser windows are sometimes scrutinized, their relevance on webpages cannot easily be overlooked. Recently, I was challenged to make some sticky items that were fairly complex so I decided to write a plugin that would work for me & my use cases called [Sticky Bits](https://github.com/yowainwright/sticky-bits).

> `*position: fixed` is a css rule for sticky navigation which positions `html elements` at a fixed point on the page.

Sticky Navigation in my purview became more relevant with an implementation of [scrollspy](http://v4-alpha.getbootstrap.com/components/scrollspy/) by bootstrap years ago. It seemed that providing users with visual queues became expected by users or by companies to provide location & extra navigation to users on webpages. `Triggers` that set a navigation's position to stick & change vary throughout many web experiences so I'm only going to focus on a few things that I've seen.

### Browser sticky navigation

_Sticky navigation:_ This is when a navigation is sticky to the top of a webpage from the start. This is typically done when setting an element to `position: fixed` & then either setting adding a `margin-top` to the next sibling element that is equal to the height of the fixed navigation or adding an `element` that wraps the sticky nav & then has a height that is set to the height of the fixed navigation.

<figure>
	<a href="https://www.dollarshaveclub.com/blades">
	<img src="https://yowainwright.imgix.net/device-scrolling/dsc-fixed-nav.jpg?w=800&h=800&fit=crop&crop=focalpoint&auto=format" alt="Sticky navigation" />
	</a>
</figure>

_Static then fixed navigation:_ This is when a navigation appears to be static & then a when a customer scrolls to where the top of the browser window meets the top of the sticky element - the element appears to snap to the top of the browser window. This is done by typically wrapping the sticky navigation in an element that is set to the height of the navigation. Using a Javascript `.onscroll` event - the browser scroll event tracks for when `window.scrollY` is greater that the sticky navigation element's `.offsetTop`. This is typically a very expensive javascript call as it is done continually throughout the process of a customer's scroll. This is why functions like [throttling](https://remysharp.com/2010/07/21/throttling-function-calls), [debouncing](https://davidwalsh.name/javascript-debounce-function) & [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) are often used to help. This is still an issue as delays in the sticky navigation can easily occur.

<figure>
	<a href="https://medium.com/">
	<img src="https://yowainwright.imgix.net/device-scrolling/Medium.jpg?w=800&h=800&fit=crop&crop=focalpoint&auto=format" alt="Static then fixed navigation" />
	</a>
</figure>

_Fixed navigation with a scroll stop:_ This is when a navigation is sticky & then at a certain point the sticky nav stops. This is often done by setting a navigation to fixed & then when element reaches a scroll `stopping point`, the navigation is set with a `position` of `absolute` with a `top` position that equals the _height of the stopping offset_.

<figure>
<a href="http://www.billboard.com/">
	<img src="https://yowainwright.imgix.net/device-scrolling/billboard.jpg?w=800&h=800&fit=crop&crop=focalpoint&auto=format" alt="Fixed navigation with a scroll stop" />
	</a>
</figure>

_Scrolled distance queue navigation:_ This is when a navigation is set to fixed & has some sort of visual queue that lets a user know how far they've scrolled. This is often done by returning a scrolled distance relative to a total window scroll. This is done by first storing scroll in a variable & then returning it out of a function.

<figure>
	<a href="http://www.hollywoodreporter.com/features/beverly-hills-1-billion-vineyard-819299">
	<img src="https://yowainwright.imgix.net/device-scrolling/thr.jpg?w=800&h=800&fit=crop&crop=focalpoint&auto=format" alt="Scrolled distance queue navigation" />
	</a>
</figure>

```javascript
var scrollPosition = 0;

var scrollDistance = function () {
  var newScrollPosition = window.scrollY;
  if (
    newScrollPosition > scrollPosition &&
    newScrollPosition > somethingToMeasure
  ) {
    // Something to do
  } else if (newScrollPosition < scrollPosition) {
    // Something else to do
  }
  return (scrollPosition = newScrollPosition);
};
return window.addOnScroll(scrollDistance);
```

## Device Fixed Position & Sticky Bits

Device sticky items are [very undependable](http://bradfrost.com/blog/mobile/fixed-position/) as many devices don't support `fixed positioning` or only partially support it which often creates a weird lag when a customer is scrolls a page.

> Device sticky items are very undependable as many devices don't support `fixed positioning`

<figure>
	<a href="http://leafo.net/sticky-kit/">
	<img src="https://yowainwright.imgix.net/device-scrolling/leafo.jpg?w=800&h=800&fit=crop&crop=focalpoint&auto=format" alt="Device sticky items" />
	</a>
</figure>

It seems that fixed position was more supported by IOS a few years ago but support has lagged as Apple has defined fixed positioning as [different because of an unchangeable size for a browser window](https://developer.apple.com/library/ios/technotes/tn2010/tn2262/_index.html#//apple_ref/doc/uid/DTS40009577-CH1-SAFARI_ON_IPAD_READINESS_CHECKLIST-4__MODIFY_CODE_THAT_RELIES_ON_CSS_FIXED_POSITIONING). [More...](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html)

It was after trying very hard to come up with a solution for fixed position support that I decided to see if making `absolute positioning` work like fixed position could be a solution. It was then that I came on to this [post](https://coderwall.com/p/8rz_7g/how-to-emulate-position-fixed-using-absolute-positioning) which uses css to essentially hijack window scrolling from the window so that elements positioned absolutely can behave in a way similarly to what we'd expect with fixed position.

```css
html {
  position: absolute;
  height: 100%;
  overflow: hidden;
}

body {
  height: 100%;
  overflow: auto;
}

.fixed {
  position: absolute;
}
```

I've been writing a plugin to accept standard web fixed position patterns as well as device fixed position patterns called [Sticky Bits](https://github.com/yowainwright/sticky-bits).

Here's a demo of the absolute position solution:

<p data-height="265" data-theme-id="0" data-slug-hash="Bzxmpw" data-default-tab="js,result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/Bzxmpw/">Bzxmpw</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
