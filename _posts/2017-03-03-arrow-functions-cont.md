---
title: Arrow Function Notes After Watching ES6 For Everyone, Continued
date: 2017-03-03 00:00:00 Z
permalink: "/arrow-functions-cont/"
categories:
- html
- code
- javascript
layout: post
meta: This post reviews some things about arrow functions that I learned from Wes
  Bos's ES6 for everyone.
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
---

Note post: this short post continued from my 1st [Arrow Functions Post](https://jeffry.in/arrow-functions/) after trying out some more things with Arrow Functions with [Dan Benson](https://www.linkedin.com/in/dansbenson/).

Arrow Functions can be even simplier (sometimes)! 💪 In the example below, the parans `()` around arguments are not needed so there ommitted as are the mustaches `{}` around the returned function.

{% highlight javascript %}

  const button = document.getElementById('button');
  button.addEventListener('click', e => console.log(e, 'here'));

{% endhighlight %}

Here's a Codepen for [fun](http://codepen.io/yowainwright/pen/ac6ec21ee8bc9a4ec8dbdfbe56778626) purposes.
