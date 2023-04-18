---
title: Template Strings and Template Tagging After Watching ES6 For Everyone
date: "2015-02-09"
layout: post
readNext: "/"
path: "/js-template-strings"
meta: This post summarizes my notes on template strings and template tagging after
  watching Wes Bos's ES6 For Everyone
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
featured_image: null
post_index: 11
categories:
- code
- javascript
---

Writing Strings and String Template in ES6 are so much cleaner that writing strings before and very powerful. Where some ES6 featuring can get ugly at build time, I've found that ES6 strings are very powerful.

Strings with dynamic data used to be structured something like this:

```javascript

var someData = 'this is some data' + someVar + 'some other data';

```

With ES6, we can write strings much more cleanly:

```javaScript

const someData = `this is some data ${someVar} some other data`;

```

To me this is much more clear and I've found when transpiling code, the end result is as expected _most_ every time.

## But wait, there's more

After watching [ES6 for Everyone](//es6.io/) by [Wes Bos](//wesbos.com/) I learned more about template tagging.

###  Template Tagging

Template tagging makes template strings more dynamic.

The example below iterates over a string and an undefined number of values (using the [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) operator) within a string until the the string is a static value.

```javaScript

function addCustomName(stings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
}

const fullName = addCustomName`Hi, my name is ${firstName} ${lastName}`;
console.log(fullName);

```

## ES6 Templates Notes Conclusion

After watching ES6 for everyone, the course re-affirmed information about Template Strings and Tagging. The course's careful description and examples of template tagging offered a much clearer its utility. ~Thanks
