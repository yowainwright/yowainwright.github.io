---
title: Node Meetup, debugging with Yunong Xiao
date: "2016-03-28"
layout: post
readNext: "/"
path: "/node-meetup-debugging-with-yunong-xiao/"
meta: Node Meetup, debugging with Yunong Xiao
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
featured_image: null
categories:
- javascript
- code
---

On Friday, I had the opportunity to go to the first LA Node.js Meetup. It was great. The presenters did a great job. I wrote down notes the best I could but unfortunately there are a few gaps. 

The first presentor was a CodeSmith student. His name is Jaret Fowler & he can be found [here](//github.com/10000highfives). He started the project [Webflight](//webflight.io). Webflight's goal is to use BitTorrent in a peer-to-peer format to allow users to host the content of that site. This would mean that as users of the site increased so would the speed of that site.

## Cliff notes of Webflight

-  Way to share between browsers
-  Browser on a server
-  [Electron](//electron.atom.io/)
   -  [Chromium](//www.chromium.org/Home) + Node JS
   -  Browser, Render => Modules
-  Downsides
   -  V8 = node & electron
   -  Memory management
   -  misusing electron
   -  torrent version

The second presentor discussed Nodebots. He described why nodejs made building robotics easier (My lack of notes for his presentation has nothing to do with the quality of the presentation). 

The third presentor, [Yunong Xiao](//yunong.io/), discussed *node in production*; especially debugging it. He briefly summarized how the product is set up & then dug into how he & his team went into debugging issues using their node product.

## Cliff notes of Node in production

**Summary**
-  Website runs on node
-  Built with react
-  Dynamic asset manager

## Debugging

_lets work the problem & not guessing (Apollo 13)_

-  Runtime performance
   -  Restify
-  Runtime crashes
   -  stack trace
   -  flame graph
-  Memory leaks
   -  core dump
      -  postmortem
      -  debug
   -  restart app
