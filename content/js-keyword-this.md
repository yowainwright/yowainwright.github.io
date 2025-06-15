---
title: Javascript's keyword this; THIS is what I'm talking about!
date: "2015-01-10"
path: "/js-keyword-this/"
meta:
  This post goes into Javascript's keyword this, how it is defined & why it is
  misunderstood
categories:
  - javascript
  - code
---

The _**this**_ keyword in Javascript is something that has often confused me, especial which object it is attached to. I've realized trying to explain it a few times that it's difficult to explain.

The _this_ keyword is a parameter that gets bound to an object. That parameter this is determined by how a function of method is called. It behaves almost exactly like a normal parameter.

Here’s a list of what the keyword this is **not** bound to:

- the object created literal
- the function object it appears in
- a new function it appears in
- a object that has a function of the property
- the objects execution context

Key’s to figuring out what the key work This will be bound to

- This gets bound to the object left of the dot (period, ‘.’)
- If the keyword new is used to create a new object This gets bound to that new object
- If there is not dot & no keyword this will get bound to the global object
- When using the .call() method another argument is passed in & This takes that value

The 4 ways this is initiated:

- In a function.

```javascript
function funcName() {}
```

- In a method

```javascript
var obj = {
  funcName: function () {},
};
```

- As a constructor

```javascript
function myFunc(name) {
  this.name = name;
}

var newMyFunc = new myFunc("Jeff");
document.write(myFunc.name);
```

- Using **.call();** or **.apply();** methods

```javascript
function juggle() {
  var result = 0;
  for (var n = 0; n < arguments.length; n++) {
    result += arguments[n];
  }
  this.result = result;
}

var ninja1 = {};
var ninja2 = {};

juggle.apply(ninja1, [1, 2, 3, 4]);
juggle.call(ninja2, 5, 6, 7, 8);
```

**example:**

```javascript
var fn = function (one, two) {
  log(one, two);
};

var r = {},
  g = {},
  b = {};

r.method = fn; // This gets bound to r
r.method(g, b); // This gets bound to r
fn(g, b); // This gets bound to the global object
fn.call(r, g, b); // This gets bound to r
```

After looking at the _this_ key word in a bunch of ways, the best way to describe the _this_ parameter is to say that it is a powerful tool to reference the object that your working with. The only thing to make sure of if you're confused about what 'this' is put it in a `console.log()` so `console.log(this);`.
