---
title: Discussing Javascript Scope, let's keep it between us
date: "2013-06-20"
path: "/js-scope/"
meta: Discussing Javascript Scope & terms that are discussed when talking about it
categories:
  - javascript
  - code
---

Javascript **scope** is an essential for keeping & accessing information where we want it & using it when we want to.

## Discussing JS Scope through the mall example

If you've ever gone to a shopping mall & you're like me, you go to a mall for the multiple stores you'll have access too. You expect a mall to have stores for shoes, stores for electronics & potentially restaurants for food after you've become hungry from going to a bunch of stores.

Javascript scope can be viewed like a mall. We could say that the mall is _global_ or that it is the _global scope_ which means that you can access all that the mall has to offer. However, people, or me at least, don't go to a mall for to walk around in it's large amount of space, we go for stores with specific it's at specialized stores.

We can consider these specialized stores the _local scope_ which means that when we go to 'a shoe store' we have access to shoes there but not food & when we go to a restaurant, we have access to food but not shoes.

When we go into that shoe store, we're still at the mall & can get certain information from the mall - like that awesome mall music but we also have access to shoes (but not food). This idea is known as _Lexical Scope_. So Lexical Scope deals with where information can be accessed.

As we go around to these stores & purchase things, eating food & interacting with people at the mall while listening to that awesome mall music we're attaining 'stuff'. We're getting information from the music, perhaps purchasing goods from the store. We can think of that as the _Execution Context_. Execution Context is essentially, all of the stuff that we comes with & happens to us as we go there the mall. We keep the items that buy but, hopefully, forget some of the music that we listen to.

## Now, Scope, seriously

To understand **scope**, we need to know about variables & how we store information. **[Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)** store bits of information in the key words _var_, _**[let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)**_, or _**[const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)**_. Const store a read only bit of information which means the information can’t be re-assigned. I will not be discussing _const_ any more right now so forget I brought it up. _Let_ is very similar to _var_ to the point that I had to [find](http://stackoverflow.com/questions/762011/let-keyword-vs-var-keyword) the difference: var is scoped to the nearest function scope which let is enclosed to the nearest closing block.

Scope, in Javascript, refers to where stored information can be accessed.

**4 commonly talked about scopes are:**

- Lexical Scope
- Global Scope
- Local Scope
- Execution Context

## Lexical Scope

[Lexical](http://whatis.techtarget.com/definition/lexical-scoping-static-scoping) Scope refers to where a variables can be accessed within code blocks.

## Global Scope

**Global** Scope means that a variable was declared outside of a function so it can be accessed & modified throughout a program.

## Local Scope

Local Scope refers the a variable that was declared within a function which means mean that it can only be accessed within that function.

**example:**

```javascript

var globalVar = ‘This var is global’;
var myFunc = function() {
     var localVar = ‘This var is local’;
};
```

## Execution Context

Execution context is memory scope. It’s created as a program runs.

**A fun example which demonstrates scope:**

```javascript
var makeArray = function () {
  return [];
};
var array1 = makeArray();
var array2 = makeArray();

console.log(array1 === array2); // returns false
// it returns false b/c array1 & array2 are 2 different array objects
// they have 2 different execution contexts

console.log(array1 == array2); // also, returns false
// == still returns false because the do not refer to the same object
// http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3 (1.f.)
```

Javascript Scope, like a mall, is essential. It's great walking through the mall but you're not at Walmart. You want specialized items. You can walk around the mall & hear that mall music. That's The Global Scope. You don't want to go into a Footlocker to get shoes & walk out with a taco. You don't go to Taco Bell to get the new J's but if you could for the price of a taco - that'd be cool. Where you're able to go to purchase shoes or a taco - that's Lexical Scope. Anything that you buy or other interactions that happen as you go through the mall can be remembered as the execution context.
