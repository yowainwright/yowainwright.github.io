---
title: A-ha Moments Writing Simple JavaScript Plugins
date: 2015-02-09 00:00:00 Z
permalink: "/making-a-js-plugin/"
categories:
- code
- javascript
layout: post
author: Jeff Wainwright
meta: 
share_image: "/assets/icons/js.jpg"
---

Writing Strings and String Template in ES6 are so much cleaner that writing strings before and very powerful. Where some ES6 featuring can get ugly at build time, I've found that ES6 strings are very powerful. 

Strings with dynamic data used to be structured something like this:
{% highlight javaScript %}

var someData = 'this is some data' + someVar + 'some other data';

{% endhighlight %}

With ES6, we can write strings much more cleanly:
{% highlight javaScript %}

const someData = `this is some data ${someVar} some other data`;

{% endhighlight %}

To me this is much more clear and I've found when transpiling code, the end result is as expected _most_ every time. After wa

## But wait, there's more

After watching [ES6 for Everyone](//es6.io/) by [Wes Bos](//wesbos.com/) I received some other things.

###  Template Tagging 

{% highlight javaScript %}
  function name(stings, ...values) {
    let str = ''; 
    strings.forEach((string, i) => {
      str += string + (values[i] || '');
    });
  }

  const fullName = name`Hi, my name is ${firstName} ${lastName}`;
  console.log(fullName);
{% endhighlight %}









