---
title: Arrow Function Notes After Watching ES6 For Everyone, Continued
date: "2017-03-03"
layout: post
readNext: "/"
path: "/arrow-functions-cont"
meta: This post reviews some things about arrow functions that I learned from Wes
  Bos's ES6 for everyone.
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
featured_image: null
post_index: 31
categories:
- html
- code
- javascript
---

Note post: this short post continued from my 1st [Arrow Functions Post](https://jeffry.in/arrow-functions/) after trying out some more things with Arrow Functions with [Dan Benson](https://www.linkedin.com/in/dansbenson/).

Arrow Functions can be even simpler (sometimes)! 💪 In the example below, the params `()` around arguments are not needed so there omitted as are the mustaches `{}` around the returned function.

```javascript

const button = document.getElementById('button');
button.addEventListener('click', e => console.log(e, 'here'));

```

Here's a Codepen for [fun](http://codepen.io/yowainwright/pen/ac6ec21ee8bc9a4ec8dbdfbe56778626) purposes.
