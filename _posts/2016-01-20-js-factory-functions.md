---
layout: post
title:  Javascript Factory Functions
date: 2016-01-20
author: Jeff Wainwright
meta: Javascript Factory Functions
categories: javascript code
type: code
permalink: /js-factory-functions/
featured_image: /assets/js.svg
redirect_from:
  - personal-site/js-factory-functions/
---

The factory function pattern is a way to create an object which can make information private but avoid the awkwardness of having the key work _this_ not bound to the function initiation.
{: .first-paragraph }

This is a bare bones post that I plan on updating further. Perhaps the references will help for now.

Here's a great video on [factory functions](//www.youtube.com/watch?v=ImwrezYhw4w) by Mattias Petter Johansson. He posts a lot of great videos for free about fundamental parts of JavaScript which are pretty fun to watch.

Here's an example of the JavaScript Factory Pattern:

{% highlight javascript %}
var CarSeat = function( options ) {
  this.color = options.color || 'gray';
  this.material = options.material || 'leather';
  this.isReclinable = options.isReclinable || true;
};
console.log( CarSeat );

var CarPartFactory = function() {};
CarPartFactory.prototype.createPart = function createCarPart( options ) {
  var parentClass = null;
  if( options.partType === 'seat' ) {
    parentClass = CarSeat;
  }
  if ( parentClass === null ) {
    return false;
  }
  return new parentClass( options );
};
console.log( CarPartFactory.prototype.createPart );

var myPartFactory = new CarPartFactory();
console.log( myPartFactory );

var seat = myPartFactory.createPart( {
  partType : 'seat',
  material : 'leather',
  color : 'blue',
  isReclinable : false
} );
console.log( seat );
document.write( seat.color );

{% endhighlight %}

That code references a [post](//carldanley.com/js-factory-pattern/) about the factory pattern by Carl Danley.




