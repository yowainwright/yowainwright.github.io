---
title: Using ES6 Function Destructuring with JavaScript Plugin Options
date: "2017-03-12"
path: "/destructing-function-opts"
meta: This post explains how to use ES6 function destructuring for more readable JavaScript
  Plugin Options.
categories:
- html
- code
- javascript
---

Open source plugin code can become confusing. After writing a few open source plugins, I've realized that readability is very important to get help and make code better. One area where readability becomes confusing is options code. In this short post, I will go over options code in JavaScript Plugins and how it can be improved.

## What are options?

> Options, in JavaScript, are arguments passed in a function to replace default properties values.

Options, in JavaScript, are arguments passed in a function to replace default properties values. In example, sometimes a plugin will have a default CSS class that it is associated with. Plugins will often allow users to change this default CSS class.

Here an example of how options look in JavaScript from ES5:

```javaScript
function someFunction(opts) {
  var defaults = {
    el: document.documentElement,
    win: window,
    attribute: 'data-some-attr'
  };
  var el = opts && opts.el || defaults.el;
  var win = opts && opts.win || defaults.win;
  var attribute = opts && opts.attribute || defaults.attribute;
  // for exampe perposes
  return console.log({
    element: el,
    document: win,
    attr: attribute
  });
};
```

And here's how it can be changed when it is initiated:

```javaScript
someFunction({attribute: 'data-attr'});
```

The _log_ will now look something like:

```javaScript
  Object: attr: "data-attr", document: Window, element: html
```

## Defined Options Is Confusing

The `options` code above is confusing! I mean, what the heck is going on here?
```javaScript
var el = opts && opts.el || defaults.el;
```

This code needs an `el` property. It says, defines the `el` property from `opts` (passed in from a function) or get the default `el` value. That's a lot of work to make sure that a property has a value.

## Option Readability Can Be Improved With ES6

ES6, with function destructuring, allows us to make options code more readable.

With ES6, we can write this:

```javaScript
function someFunction({
  el = document.documentElement,
  win = window,
  attribute = 'data-some-attr' } = {}) {
  return console.log({
    element: el,
    document: win,
    attr: attribute
  });
};
```

And then add any custom opts with:

```javaScript
someFunction({attribute: 'data-attr'});
```

This trims down the reference to a property value to 2 times versus 3!

## Conclusion

With ES6 function destructuring, options code is much cleaner and easier to read. As a result, Open Source Plugins that use this feature are easier to improve and understand.
