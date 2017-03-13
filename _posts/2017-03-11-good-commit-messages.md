---
title: Writing Good Git Commits Formula
date: 2017-03-12 00:00:00 Z
permalink: "/good-commits/"
categories:
- code
- terminal
layout: post
meta: This post discusses writing good and meaningful commit messages with git.
share_image: https://yowainwright.imgix.net/icons/os.jpg
---

It is easy to reach agreement that we should write good commit messages. It equally as easy to reach agreement that most commit messages are not good. In this post, I will discuss a formula (AWW) for writing basic meaningful commit messages.

## Basic meaningful commit messages usually have 3 things

-  **action**: this word is a verb that describes what the commit does
-  **what**: word(s) that describe what the _action_ is relative to
-  **where**: words(s) that describe _where_ the _action_ is happening to _what_ 

This could be called **AWW** which sounds cute so I like it.

Here's a git terminal example:

{% highlight terminal %}
  git commit -m 'changes `dataObj.id` in the dataObj'
{% endhighlight %}

In the example above:
-  **action** is the word 'changes'
-  **what** is `dataObj.id`
-  **where** is 'in the dataObj'

## Why make a formula?

Git messages are important. They seem simple to write in discussion, yet, when changing multipe files or things in a file, the meaning of changes can be lost easily. Following the AWW formula helps composing meaning when committing. 
