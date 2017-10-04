---
title: Clarifying my knowledge of Bind, Call, and Apply—after realizing I was missing important details about them
date: "2017-09-16"
layout: post
readNext: "/"
path: "/bind-call-apply/"
meta: Bind, Call, and Apply
featured_image: null
categories:
- note
- story
---

I recently realized that I didn't have a clear on JavaScript's `bind`. I also realized that I wasn't clear on `call` and `apply`. In this post, I will talk about `this` as a first argument to these methods. I will then dig into why they're different.

----

## What is this?

The `this` context is common thing to think I understand. Yet, I often realize that I have misunderstood the context of `this`. I put in a `debugger` or `console.log` something and realize that I have misunderstood the context of this.

----

## Bind

Binds the `this` context of a parent function

---

## Apply

Array like second argument

## Call

Separate arguments after the `this` context argument
