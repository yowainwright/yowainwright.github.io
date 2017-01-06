---
title: Arrow Function Notes  After Watching ES6 For Everyone
date: 2017-01-06 00:00:00 Z
permalink: "/arrow-functions/"
categories:
- html
- code
layout: post
meta: This post reviews some things I learned from Wes Bos's ES6 for everyone.
share_image: "/assets/icons/js.jpg"
---

Notes about Arrow Functions after watching [ES6 For Everyone](https://es6.io/) by [Wes Bos](http://wesbos.com/). Arrow functions are simplier way to write functions in JavaScript. 

## Arrow Function Illuminations:

1. `This` will be undefined.
2. Your can remove even more code cruft that is usually done with Arrow Functions (no mustache brackets needed).
3. Arguments which are objects will not work in arrow functions

## Deeper Dive

When writing a function normal `this` can be bound to things (like elements in example). With arrow functions, _this_ (pun intended) is not the case.

### This Is Undefined

**ES5 Function**

{% highlight javascript %}

var clickFunction = function clickFunc() {
  console.log(this);
  // This would be the selected element
};
var button1 = document.getElementById('button-1');
button1.addEventListener('click', clickFunction, false);

{% endhighlight %}

**ES6 Arrow Function**

{% highlight javascript %}

document.getElementById('elem').addEventListener('click', () => {
  console.log(this);
  // `this` would be undefined
});

{% endhighlight %}

### Remove Even More Cruft With Arrow Functions

Arrow functions can be even more minimal but most people add certain things like `mustaches` for legibility.

**Standard Way of Writing an Arrow Function**

{% highlight javascript %}

const button2 = document.getElementById('button-2');
button2.addEventListener('click', () => {
  console.log('Normal arrow function');
});

{% endhighlight %}

**More Minimal Way An Arrow Function Can Be Written**

{% highlight javascript %}

const button3 = document.getElementById('button-3');
button3.addEventListener('click', () => console.log('arrow function with less cruft'));

{% endhighlight %}

### Objects cannot be used in arrow functions

Arrow functions can use arguments——as long as they're not objects.

**Standard Way of Writing an Arrow Function**

{% highlight javascript %}

const button4 = document.getElementById('button-4');
const anObj = {
  name: 'Objecto'
};
button4.addEventListener('click', (anObj) => {
  console.log(anObj);
});

{% endhighlight %}


## Arrow Function Notes Conclusion

Play with the examples above on [CodePen](http://codepen.io/yowainwright/pen/5e5d740b1388b400fc1cc0717f5a29f8).

What the `this` key word will be bound to and how minimal arrow functions can be is well documented. ES6 For Everyone gives clear examples of that make it much clearer though.

~Thank you Wes Bos!!!
