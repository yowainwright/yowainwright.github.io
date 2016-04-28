---
layout: post
title:  "Punch Static Sites: My experience getting setup"
date: 2016-04-26
author: Jeff Wainwright
meta: "Punch Static Sites: My experience getting setup"
permalink: /punch-setup/
categories: javascript code
type: code
featured_image: /assets/js.svg
redirect_from:
  - /punch-static-sites/
---

Getting started with [Punch](//laktek.github.io/punch/) is very easy. After adding the [npm plugin](//www.npmjs.com/package/punch), setting up the initial static site takes a few minutes. The CLI commands are super straight forward & the site re-builds super fast.
{: .first-paragraph }

<figure class="figure figure--full">
	<a href="//laktek.github.io/punch/" title="This picture is copied from the Punch website - go there to read more about punch">
		{% include media/picture.html pictureClass="picture__secondary" imageSM="/assets/punch-static-sites/punch.png" imageTitle="This picture is copied from the Punch website - go there to read more about punch" %}
	</a>
	<figcaption class="figure__caption">
		<p><a href="//laktek.github.io/punch/">This picture is copied from the Punch website - go there to read more about punch</a></p>
	</figcaption>
</figure>

## Setup

In terminal run:

1. `npm install -g punch` Install punch global

2. `punch setup [my awesome site name]` *site setup

3. `cd mysite` 

4. `punch s` starts your local server

5. Press `ctrl + c` to stop your local server

* If you have already have a directory setup, just run `punch setup` in _that_ directory


## An aside: Why Punch?

Here are 2 big benefits for choosing punch specifically over other static site generators.

1. *Quick setup*: you really can be up & running in a few minutes

2. *Prototyping*: you can quickly do templating for platform cms sites where you can use dummy [json](//www.json.org/). This is great in a situation where multiple CMS's are on the table that use [mustache](//mustache.github.io/mustache.5).html)

## More information

- Here's a link to the [wiki](//github.com/laktek/punch/wiki), &

- Another link to the [homepage](//laktek.github.io/punch/)



