---
title: Understanding Javascript Objects - static objects to classes
date: "2014-12-20"
path: "/js-objects"
meta: Understanding JavaScript Objects, from static objects to classes
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
categories:
- code
- javascript
---

JavaScript [Objects](//developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) are used to store information called properties with values AND code blocks that do stuff (functions) which are called methods.

In this post I'm going to explore JavaScript Objects from a simple object to a bit more complex object which can be called a [class](//developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) (although JavaScript didn't officially have classes until [ECMA6](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes))

The classic JavaScript Object example that I've seen across the internet is the car seen [here](//www.udacity.com/course/viewer#!/c-ud015/l-2794468538) & [here](//www.w3schools.com/js/js_objects.asp) Which is a pretty good one but I think it's important to note that an object can be anything.

## JavaScript Objects

Re-iterating a bit, JavaScript Objects are used to store information & re-usable blocks of code. So, getting started with a Car Object - I'll create basic care properties & values with a method to define the properties & functions of a car.

## 1. Writing a basic object

```javascript
var car = {
  color: 'white',
  tires: '4',
  doors: '4',
  increaseSpeed: function(speed) {
    return speed++;
  }
}
console.log(car);
```
Live [code](http://codepen.io/yowainwright/pen/11d907a2ace3de3939a17e9ac3b5367f/)

There's are some issues with this code. One is, what would happen if you wanted to write a new car object with different properties? Another is, what would happen to our object if some used the same variable name?

```javascript
var car = {
  color: 'white',
  increaseSpeed: function(speed) {
    var newSpeed = speed + 1;
    return newSpeed;
  }
}

var van = {
  color: 'blue',
  increaseSpeed: function(speed) {
    var newSpeed = speed + 1;
    return newSpeed;
  }
}
// man, we're writing a lot of code for 2 objects which are basically the same.
console.log(car, van);
var car = 0;
console.log(car);
// & crap, now setting the variable car to 0 - we just overwrote the object.
```

Live [code](//codepen.io/yowainwright/pen/6880faa269c6a2efc627943fccdb9085).

From the last example above, we can see that writing out all of those objects like that would be difficult. Also, we can see that we can/could just re-assign the variable which defines the object & the entire object would be re-defined.

## 2. Prototype Chains

After seeing a basic Javascript Object & seeing where it can fail & where it can become very repetitious we can begin to understand why more complex objects are more important.
1. We should always try to keep our code [DRY](//code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161) (not repeating).
2. We should try to not have our code be rewritable.

Prototype Chains, deal with the first issue - keep things DRY.

## Generally be aware of these things while reading this post or building objects

**Object.create** is used to copy another object
- After Object.create is used, if an object DOES NOT have a property it will go to the original object to see if that object has the property.
- the copied properties are inherited 1 time

The **Object Prototype** has various helper functions that are inherited from Object. What this means is, built into the browser, JS has methods that are automatically attached to an object when it is created.

The **Object Constructor** is not the _Object Prototype_. An _Object constructor_ is the object that the an instance of an Object was instantiated from; basically the object constructor is GOD to the an instance of an object.

**array prototype** has various helper functions & is associated with an array
- delegates to the object prototype

```javascript
var car = {
  color: 'white',
  increaseSpeed: function(speed) {
    var newSpeed = speed + 1;
    return newSpeed;
  }
}

var van = Object.create(car);

van.back = 'You can sleep in the back of this thing!';
console.log(van.color, van.back);
```

View it [live](//codepen.io/yowainwright/pen/1665f351bf708ff50d0d797a086bfe3d).

In the example above we create a static object and then copy it using **Object.create()**. That Object has access to helper functions, or methods, that are part of the Javascript Prototype. When an Object Prototype is created the instance of that creation is that Object's Object Constructor. The Object Constructor points to what instantiated that Object.

That's confusing so here's an example to demonstrate.

```javascript
var AConstructor = function(name) {
  this.name = name;
}

var newConstructor = new AConstructor('The Constructor');
document.write('newConstructor.constructor is ' + newConstructor.constructor);
```

Live [code](//codepen.io/yowainwright/pen/cd51d0d430c6dd567cd42670d4429565).

So, in summary of Prototype Chains - they save us some time by allowing us to copy Objects & there properties but the still do not resolve the first issue - the original Object can be overwritten if it is assigned to a new value.

## 3. Object Decorator Pattern

The Object Decorator takes in an object & adds properties or methods to it. It's common to use adjectives (see below for reference, note the name _descriptive_).

```javascript
var descriptive = function(obj, num) {
  obj.num = num;
  obj.descriptiveCount = function() {
    obj.num++;
  };
  return obj;
}
```

**Important Note:** Notice in the example above that _obj_ is used where we could seemingly use the key word _this_. The reason why _obj_ was used is because of the _execution context_. If _this_ was used we would keep recreating the function descriptiveCount every time a new instance of the _descriptive_ object.

## 4. Functional Classes

A simple summation of a JavaScript Class is a function that can create similar Objects.

The difference between a _Decorator_ & a _Class_ is that a _Class_ _**builds**_ the Object where a _Decorator_ accepts the object.

```javascript
// Decorator
var descriptive = function(obj, num) {
  obj.descriptiveCount = function() {
    obj.num++;
  };
  return obj;
}

// Class
var AClass = function(num) {
  // Note on the line below that the class is being created within the function
  var obj = {num: num}
  obj.addOne = function() {
    obj.num++;
  }
  return obj;
}
```

-  Classes are written with a Capital first letter
-  They are written with Constructor Functions. Constructor Functions are functions that create a _class_.
-  A Class contains all of the things that we would like to build (properties, methods)
-  Objects that get returned from a class are _instances_.

```javascript
var AClass = function(num) {
  var obj = {num: num};
  obj.methods = AClass.methods;
  // Note, extends could be added here to replace the line above like:
  // extends(obj, AClass.methods);
  return obj;
}
AClass.methods = {
  addOne : function() {
    this.num++;
  }
}
```

-  The example above demonstrates how to add a method to a class without duplicating the method within the execution context every times a new instance is created.
-  **Note**: we could use extends to extend the methods of the _AClass (from the example above)_ or a _Class_ but this is not provided natively in JavaScript.

## 5. Prototyped Classes

Prototypal Classes can be used instead of _extends_ or (from the last example above) _obj.methods = AClass.methods;_ to store all methods of a _class_.

Prototypal Classes, or the Prototypal Pattern are best used for sharing methods in a way that doesn't inflate the execution context.

```javascript
var AClass = function(num) {
  var obj = Object.create(AClass.prototype);
  obj.num = num;
  return obj;
}
AClass.prototype.addOne = function() {
  this.num++;
}
// Note: AClass.prototype.constructor (all prototypes hav a constructor property)
var aNewClass = AClass(1);
aNewClass.addOne();
```

## 6. Pseudo-classical Classes

The difference between Pseudo-classical Classes & Prototypal Classes is that the _new_ key word to instansiate a new object so we no longer need to return the Object or use _Object.create()_. See the example below for reference.

```javascript
var AClass = function(num) {
  // var obj = Object.create(AClass.prototype);
  this.num = num;
  // return obj;
  // by using the new key word below we can comment out (remove in most situations) the 2 lines of code above
}
AClass.prototype.addOne = function() {
  this.num++;
}
var aNewClass = new AClass(1);
aNewClass.addOne();
```

## 7. Super-Classes & Sub-Classes

_**Sub-Classes**_ & _**Super-Classes**_ give the power for objects to share classes but be different.

```javascript
  var Car = function() {
    var obj = {loc: loc};
    obj.move = function() {
      obj.loc++;
    }
    return obj;
  };
  var Van = function(loc) {
    var obj = Car(loc);
    obj.grab = function(){

    };
    return obj;
  }
  var Cop = function(loc) {
    var obj = Car(loc);
    obj.call = function() {

    };
    return obj;
  }
  var amy = Van(1);
  amy.move();
  var cal = Cop(2);
  cop.call();
```

## 8. Super-Class, Sub-Class & Pseudo Classical Sub-Classes

```javascript
  var Car = function(loc) {
       this.loc = loc;
  };
  Car.prototype.move = function() {
       this.loc++;
  };
  var Van = function(loc) {
       Car.call(this, loc);
  };
  Van.prototype = Object.create(Car.prototype);
  Van.prototype.constructor = Van.constructor;
  Van.prototype.grab = function() {};

  // Calls
  var OtherCar = new Car(6);
  OtherCar.move();

  var VarCar2 = new Van(8);
  console.log(VanCar2.loc);
  VarCar2.move();
```

As I was preparing through this post I was gathering information from various sources but was mainly following the instruction of [UdaCity's JS OOP Course](//www.udacity.com/course/object-oriented-javascript--ud015).
