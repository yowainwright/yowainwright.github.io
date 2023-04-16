---
title: Glide Carousel, a easy to use slider for Semantic UI
date: "2014-04-23"
layout: post
readNext: "/"
path: "/glide-carousel/"
meta: This is a demo on how to use the Glide Carousel with Semantic UI
post_index: 4
categories:
- javascript
- code
---

This carousel was originally done for a bootstrap project. I quickly implemented it using [Glide JS](http://jedrzejchalubek.com/glide/) which fits in nicely with [Semantic UI](http://semantic-ui.com/) (the framework I use on this site). This post describes my implementation.

Many people don't like carousels and I _somewhat_ agree. Image carousels like the on above can be somewhat intruding to the content and are very often untouched or swiped through by users. However, with a mobile first User Interface a carousel can be designed to act more as a swipe and can introduce an interesting way to present content.

Good imagery with clean verbiage can get a user to go through a carousel or can used to create a _side swipe_ as demonstrated here. Notice how in my _Reference Rolex_ a user can swipe or click from the side to view new content rather than to continue to scroll down. This, from my perspective, becomes most effective and relevant for users on a mobile view where swiping is more standard.

**The CSS used**
```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.12.0/css/semantic.min.css"/>
```

**The JS used**
```html

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.12.0/javascript<ntic.min.js"></script>
<script src="http://cdn.jsdelivr.net/jquery.glide/1.0.6/jquery.glide.min.js"></script>

```

**The html**

The HTML for the first 2 slides

```html

<div class="slider slider1">
  <div class="slides">
    <div class="slide-item item1">
    </div>
    <div class="slide-item item2"> 
    </div>
    <div class="slide-item item3">
    </div>
    <div class="slide-item item4">
    </div>
  </div>
</div>

```

**The JS added locally**

Just call glide to run in your local JS
```javascript
$('.slider').glide();
```

Note: my JS for glide is slightly different but this is all you need.

<div class="code-sample">
    <p styles="min-height: 300px;" data-height="268" data-theme-id="0" data-slug-hash="71fdafe5e8fdae857086e9be2bd928ba" data-default-tab="result" data-user="yowainwright" class='codepen'>See the Pen <a href='http://codepen.io/yowainwright/pen/71fdafe5e8fdae857086e9be2bd928ba/'>71fdafe5e8fdae857086e9be2bd928ba</a> by Jeff Wainwright (<a href='http://codepen.io/yowainwright'>@yowainwright</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
	<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>
