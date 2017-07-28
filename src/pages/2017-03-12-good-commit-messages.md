---
title: AWW—A Formula For Writing Git Commits
date: "2017-03-12"
layout: post
readNext: "/"
path: "/formula-for-commits/"
meta: This post describes AWW, a formula for writing meaningful commit messages with git.
share_image: https://yowainwright.imgix.net/icons/os.jpg
featured_image: null
categories:
- code
- terminal
---

For software engineers, it is easy to reach agreement that good commit messages are important. It equally easy to reach agreement that most commit messages are not good. In this post, AWW, a formula  for writing basic meaningful commit messages, will be discussed.

## 3 Things Meaningful Commit Messages Should Have

-  **action**: this word is a verb that describes what the commit does
-  **what**: word(s) that describe what the _action_ is relative to
-  **where**: word(s) that describe _where_ the _action_ is happening to _what_ 

This is called **AWW** which sounds cute so I like it.

Here's a git terminal example:

```bash
  git commit -m 'changes `dataObj.id` in the `dataObj`'
```

In the example above:
-  **action** is the word 'changes'
-  **what** is `dataObj.id`
-  **where** is 'in the `dataObj`'

## Why make a formula?

Git messages are important. They seem simple to write in discussion. Yet, when changing multiple files or things in a file, the meaning of changes can be lost easily. Following the AWW formula helps composing meaning when committing. 
