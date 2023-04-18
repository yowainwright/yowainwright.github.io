---
title: Javascript for loop & the argument key word
date: "2014-12-02"
layout: post
readNext: "/"
path: "/js-argument-key-word"
meta: Javascript for loop & the argument key word defined & why it is misunderstood
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
featured_image: null
post_index: 8
categories:
- javascript
- code
---

Today, I was assigned the task of printing logs to the page instead of to the `console` if there was a certain string appended to the url so that the our Q/A engineer could get that data into his program.

My task was manageable, but before committing my pull request my boss & I went over the debug program (called `debug.js`). The process of describing what's happening in a program I find highly beneficial. As I was talking through the program I noticed the `[argument](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)` key word.

The `argument` key word is an object that stores the arguments passed into a function within the scope of that function.

```javascript
var passArguments = function() {
  return document.write(arguments.length);
};
passArguments(1, 2, 3, 4, 5);
// result: the document prints out 5
```

Live [Code](//codepen.io/yowainwright/pen/2f64d380b74302b396927d297828cd3a)

For the program that I was working on today, the program takes the first argument of the function `passArguments` as stores it in a variable set as category. Then it loops through the other arguments & strong them in the logs array.

```javascript
var passArguments = function() {
	var category = arguments[0];
	logs = new Array( arguments.length - 1 );
	for (var i = 0, j = logs.length; i < j; i++) {
	  logs[i] = arguments[i+1];
	}
	document.write(category + ' : ' + '[' + logs + ']' );
};
passArguments('Categories', '1', '2', '3', '4', '5');
```

Live [Code](//codepen.io/yowainwright/pen/6b24e79b8dcd00668619acd396dd4b46)

While my boss & I were going over the program, he wrote out the code similarly to how a browser compiles it.

```javascript
arguments = ['ga', 'info a', 'info b', 'info c']
arguments = ['ga', 'info a', 'info b', 'info c']

category = 'ga';
logs = [ , , ]

for loop
start at: 0
go to: 3

for loop 1( i = 0)
logs[0] = 'info a'
logs = [ 'info a', , ]

for loop 2 (i = 1)
logs = [ 'info a', 'info b', ]

for loop 3
logs = [ 'info a', 'info b', 'info c']

end for loop
```
