---
layout: post
title:  Javascript Closure all wrapped up & why
date: 2014-10-15
meta: Understanding Javascript Closure & what it does
note: feature-image-aside
categories:
- code
- javascript
permalink: /js-closure/
share_image: /assets/icons/js.jpg
featured_image: /assets/js.svg
redirect_from:
  - personal-site/js-keyword-this/
---

Javascript Closures are bundles of code or inner functions that have access to outer functions & variables. IT IS THAT SIMPLE! But, understanding why they’re so important quickly become pretty complex.

## JavaScript Closure by Example

The first thing that comes to mind when I try to think of an example to explain Javascript Closures is the process of microwaving. When we put something, food preferably, in a microwave, we're expecting something tasty to come out after a few minutes. Well, maybe not tasty but definitely different.

We can think of a Javascript Closure like a microwave. There's an outer function, a chunk of re-usable code, which is represented by a microwave & an inner function which we could think of as the 'thingy' that cooks the food. 

We don't want whatever is cooking that food, to cook us, so we put the food in the microwave (outer function) & then the actual 'thingy' that cooks the food (inner function). That encapsulated process that cooks the food is what & why we use a function.

Closures are important because:
- They can create private variables
- They have access to functions & variables of a higher scope
- They’re useful with time interval functions

## Gettin' more serious about Closures

Javascript Closure is created when an inner function is made accessible from outside of it’s parent function. This is commonly done by returning the inner function. So like when you put food into the microwave & then get it out.

**Examples**
{% highlight javascript %}
// What are Closures?
var closureFunction = 'Closer are functions ';
var rememberWhat = 'that remember ';
var theirEnvironment = 'the environment there were created in. ';

var aVar = closureFunction;
var bVar = rememberWhat;
var cVar = theirEnvironment;

// let's make some sentences tat describe closure
var varA = aVar;
var anArray = [];
var outerFunction = function() {
  var varB = bVar;
  anArray.push( function() {
    var varC = cVar;
   document.write(varA + varB + varC);
  });
};
outerFunction();
anArray[0]();

var varA = 'Private variables ';
var bVar = 'can be accessed ';
var cVar = 'with closure. ';
outerFunction();
//anArray[0](); //Uncomment & look at the sentence (not good - that is not correct)
anArray[1]();
{% endhighlight %}
View the [live code](//codepen.io/yowainwright/pen/d9926371f494ac0809bb8805d73575d8) sample.

**& another super basic dive into Javascript closure:**
{% highlight javascript %}
var myFunc = function() {
  var myOtherFunc = function() {
    document.write('This is a closure');
  }
  return myOtherFunc();
};
myFunc();
{% endhighlight %}
[Click here](//codepen.io/yowainwright/pen/19d990da9c7cf57945e588461b0bb1f7) to view the live code sample.

{% highlight javascript %}
var myFunc = function() {
  var myOtherFunc = function() {
    document.write('This is a closure. ');
  }
  return myOtherFunc();
};

var i = 0;
setInterval(function() {
  i += 1;
  if (i < 5) {
    myFunc();
  }
}, 1000);
{% endhighlight %}
You can view & play with the code about by going to the [link here](//codepen.io/yowainwright/pen/6d2d1f7e8ae56ea51f5082e1058421e3).
