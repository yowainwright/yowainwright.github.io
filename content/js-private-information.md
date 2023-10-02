---
title: Creating private information in JavaScript
date: "2015-01-22"
path: "/js-private-information"
meta: Creating a private information in JavaScript to be used in future functions
categories:
- code
- javascript
- objects
---

Creating private information, meaning variables, properties/property values, function, methods in JavaScript is an important concept for storing information that can't be overwritten.

## What does _private_ mean?

[Private](//javascript.crockford.com/private.html) means that only the current function (_class_) will have access to the variables (_properties/ property values_), functions (_methods_) within it. This is very important to make sure that your code is not overwritten.

## _Public_ vs _Private_

- Public variables or functions can be added to, modified, or deleted.
- Private variables or functions can't be changed.

## A recent code challenge

This concept is still pretty new to me so my boss gave me the task of writing some functions that would iterate on a number so that:

-  there would be 3 functions that would be aware of each other & each function would add 1.
-  there would then be a global variable that would be declared that would call 1 of the functions
-  then there would be another parent function that would call the 2nd original function
-  within that parent function there would be another child function that would call the 3rd function & log the value for the 3 original functions
-  within that parent function, after the child function - the child function would be called twice.
-  after then closing of the parent function, the parent function would be called three times

```javascript

var num = 1;

var aHero = function() {
  return num++;
};
var aDeed = function() {
  return num++;
};

var aFoil = function() {
  return num++;
};

var log = function(text) {
  $('#logArea').append('<div>' + text + '</div>');
}

var hero = aHero();
var newSaga = function() {
  var foil = aFoil();
  var saga = function() {
    var deed = aDeed();
    log(hero + ' ' + deed + ' ' + foil);
  }
  saga();
  saga();
};
newSaga();
newSaga();
```

**Which renders the result of:**

```javascript
1 3 2
1 4 2
1 6 5
1 7 5
```

After a little understand of the concept for the above task, I was able to render the result fairly easily. Then my boss threw in what he called a wrinkle. He put in a check that sets `num` to be the letter `a`.

```javascript
var theNumber = 1;

var aHero = function() {
  return theNumber++;
};
var aDeed = function() {
  return theNumber++;
};

var aFoil = function() {
  return theNumber++;
};

var log = function(text) {
  $('#logArea').append('<div>' + text + '</div>');
}

var hero = aHero();
var newSaga = function() {
  var foil = aFoil();
  var saga = function() {
  	if( typeof num !== 'undefined') {
      num = 'a';
    }
    var deed = aDeed();
    log(hero + ' ' + deed + ' ' + foil);
  }
  saga();
  saga();
};
newSaga();
newSaga();
```

**The code abe renders this result:**

```javascript
NaN NaN NaN
NaN NaN NaN
NaN NaN NaN
NaN NaN NaN
NaN NaN NaN
```

My boss then asked me to, without changing anything inside of the parent, `NewSaga()` function, render the original result which was honestly very challenging for me.

This is what I came up with with some help.

```javascript
var incrementProvider = function() {
  var num = 1;
  var addTheNumber = function() {
    var result = num;
    num = num + 1;
    return result;
  };
  return addTheNumber;
};

var theNumber = incrementProvider();

var aHero = function() {
  return theNumber();
};
var aDeed = function() {
  return theNumber();
};

var aFoil = function() {
  return theNumber();
};

var log = function(text) {
  $('#logArea').append('<div>' + text + '</div>');
}

var hero = aHero();
var newSaga = function() {
  var foil = aFoil();
  var saga = function() {
    if( typeof num !== 'undefined') {
      num = 'a';
    }
    var deed = aDeed();
    log(hero + ' ' + deed + ' ' + foil);
  }
  saga();
  saga();
};
newSaga();
newSaga();
```

Live [code](//codepen.io/yowainwright/pen/14c4a193a20462b0b7c23a8b3128bc2d)

**And this is what my boss came up with:**

```javascript
var GeneratorClass = function() {
  var inside = 1;
  var numberGenerator = function() {
    return (inside++).toString();
  }
  return {numberGenerator: numberGenerator};
};

var generator = new GeneratorClass();
var aHero = generator.numberGenerator;
var aDeed = generator.numberGenerator;
var aFoil = generator.numberGenerator;

//var aHero = (new GeneratorClass()).numberGenerator;
//var aDeed = (new GeneratorClass()).numberGenerator;
//var aFoil = (new GeneratorClass()).numberGenerator;

var log = function(text) {
  $('#logArea').append('<div>' + text + '</div>');
}

var hero = aHero();
var newSaga = function() {
  var foil = aFoil();
  var saga = function() {
    if( typeof num !== 'undefined') {
      num = 'a';
    }
    var deed = aDeed();
    log(hero + ' ' + deed + ' ' + foil);
  }
  saga();
  saga();
};
newSaga();
newSaga();
```

Live [code](http://codepen.io/scottlaplante/pen/RryKEe)

Both examples render the same result but my boss's code is much cleaner I think.

This project was given to me after doing Udacity's [OOP JavaScript class](//www.udacity.com/course/object-oriented-javascript--ud015). It's been interesting after reviewing the class with my boss how much I thought I understood versus how much I actually do in practice.

Welp, back to coding ...
