---
title: Updating Git Tags That Have Been Pushed
date: 2017-03-14 00:00:00 Z
permalink: "/git-tag-update/"
categories:
- code
- os
layout: post
meta: This post instructs how to update git tags after they've been pushed
share_image: https://yowainwright.imgix.net/icons/os.jpg
---

[Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) are used for establishing versions of products. They usually use [Semver Versioning](http://semver.org/). 

Because tags oftem specify specific changes in code, sometimes updates need to be added to specific tags. This update can be made in a few simple steps.

Establish tags
{% highlight terminal %}
git tag
{% endhighlight %}

Delete tag
{% highlight terminal %}
git push origin :refs/tags/[tag version]
{% endhighlight %}

Finally, re-create the tag by following your initial steps for setting up git tags. 

