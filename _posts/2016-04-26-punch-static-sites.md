---
title: 'Punch Static Sites: My experience getting setup'
date: 2016-04-26 00:00:00 Z
permalink: "/punch-setup/"
categories:
- javascript
- code
layout: post
meta: 'Punch Static Sites: My experience getting setup'
type: code
note: feature-image-aside
share_image: "/assets/icons/js.jpg"
featured_image: "/assets/js.svg"
redirect_from:
- "/punch-static-sites/"
---

Getting started with [Punch](//laktek.github.io/punch/) is very easy. After adding the [npm plugin](//www.npmjs.com/package/punch), setting up the initial static site takes a few minutes. The CLI commands are super straight forward & the site re-builds super fast.

## Setup

In terminal run:

- `npm install -g punch` Install punch global
- `punch setup [my awesome site name]` *site setup
- `cd mysite` 
- `punch s` starts your local server
- Press `ctrl + c` to stop your local server

* If you have already have a directory setup, just run `punch setup` in _that_ directory

## An aside: Why Punch?

Here are 2 big benefits for choosing punch specifically over other static site generators.

- *Quick setup*: you really can be up & running in a few minutes
- *Prototyping*: you can quickly do templating for platform cms sites where you can use dummy [json](//www.json.org/). This is great in a situation where multiple CMS's are on the table that use [mustache](//mustache.github.io/mustache.5).html)

## More information

- Here's a link to the [wiki](//github.com/laktek/punch/wiki), &
- Another link to the [homepage](//laktek.github.io/punch/)



