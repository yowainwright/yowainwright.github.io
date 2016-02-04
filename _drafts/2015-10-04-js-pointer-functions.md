---
layout: post
title:  Javascript Pointer Functions
date: 2012-10-21
author: Jeff Wainwright
meta: Javascript Point Functions
permalink: /javascript-pointer-functions/
meta: Designer & programmer workflows on OSX to increase productivity
categories: javascript code
type: code
featured_image: /assets/js.svg
---

# JavaScript Pointer Functions

A few weeks ago ...


{% highlight javascript %}
	window.addOnScroll = function( newThingToDo ) {
	  var oldThingToDo = window.onscroll;
	  window.onscroll = function() {
	    if( oldThingToDo ) oldThingToDo();
	    newThingToDo();
	  }
	}
	window.addOnScroll( function() { console.log('thing1'); } );
	window.addOnScroll( function() { console.log('thing2'); } );
{% endhighlight %}