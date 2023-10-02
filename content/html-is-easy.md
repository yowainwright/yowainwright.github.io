---
title: 'Rant: HTML is easy and that''s why we all write it wrong!'
date: "2016-09-30"
path: "/html-is-easy"
meta: Rant post  about potential gains from understanding and being more thoughtful
  when writing html.
categories:
- html
- code
- rant
---

This post is a _rant_ attempting to express what seems to be a growing issue: lack of deep thought behind writing HTML for webpages—that will go to production! 🤓 Yes, more time is spent writing that animation, that slider, that app like experience than prioritizing what would probably ensure that customers come to webpages and have a better experience: semantic valid html.

## Write HTML like a Bulldozer&nbsp;🚜

Developers bulldoze right past truly thinking about HTML. It makes sense! Complex tasks where benefits of thoughtful HTML are just not considered. Not only that, project goals are iterative—they are grown upon and updated in steps. Questions like, _is the HTML valid?_ or _is the HTML semantic?_ are _never_ asked. This small issue then grows on _a_ webpage as new features are added and other websites follow a similar pattern. The world and developers think it's fine because browsers have improved and the webpage looks fine—but is it?

> Questions like, _is the HTML valid?_ or _is the HTML semantic?_ are never asked.

## What is Semantic HTML beside something we _used_ to care about?

Developers, product managers, maybe the whole world at this point assumes _it is easy to write [Semantic html](https://en.wikipedia.org/wiki/Semantic_HTML)_. We should not! Semantic HTML makes webpage content more legible to browsers, search engines, other developers, and is _much_ easier to maintain. Yet, when looking at source code on _many_ webpages, it is easy to find html that could be semantically improved.

## Of course my HTML is valid

Beyond Semantic HTML, valid HTML is an issue! With browser advancements, checking whether html webpages validate just doesn't happen.

-  [Google Search](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.google.com%2F) doesn't render valid html according to W3C spec.
-  Neither does [Facebook](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.facebook.com%2F)

Validation may not be an issue for Google and Facebook because there usership maybe be so large. However, most websites are _not_ Google or Facebook. This is where the point of valid html is _still_ be a very important thing to consider! 💭

## Why might this rant matter? &hellip;Or are am I just screaming in the wind (again)?

Companies looking to grow their audience through webpages should always look to provide rich experiences that can be shared across the most possible platforms in the easiest way. Valid and semantic html would definitely make that easier and with less long run effort.

## Writing HTML back in the day vs. now

Years ago when writing html for webpages, everything that was done had to pass the [w3c test](https://validator.w3.org/). HTML validation tests were even looked at as a tool to find unclosed element tags and fix layout issues. Sure, there where a lot of `divs` but we could make a webpage render in Internet Explorer 6 _as expected_!

> Sure, there where a lot of `divs` but we could make a webpage render in Internet Explorer 6 _as expected_!

As browsers became better, HTML5 elements became more supported, and jQuery allowing easy Dom manipulation HTML testing and review seemed to become more and more of an after thought. Then, the iPhone came and Apps took a front seat. Everyone wanted an App and webpages to look like Apps so whether a webpage's HTML was valid or not didn't matter.

Now, years later, we know people don't go to many [webpages](https://www.quora.com/How-many-webpages-does-an-average-user-visit-per-day) and they don't use many [apps](http://fortune.com/2015/09/24/apps-smartphone-facebook/) so webpages have to be consumable for websites people _do_ go, usable for when people do get them, and fast for when they _are_ viewed.

## Better Opportunities in HTML?

**High quality html is:**

-  **Consumable:** when webpages are consumed by third party services like Medium and Facebook instant articles, high quality HTML is _probably_ much more consumable.
-  **Usable:** thoughtful HTML is much more usable for people with special needs and people in general.
-  **Fast:** browsers can probably render thoughtful HTML better.

## Tools that might help us

**Here are a few tools that can be used to write better html:**

-  [html validator](https://validator.w3.org/)
-  [htmllint](https://github.com/htmllint/htmllint)
-  [linter-htmlhint](https://github.com/AtomLinter/linter-htmlhint)

## My fingers are tired so here's the wrap-up

With tools like [AMP](https://www.ampproject.org/), it may not ever be necessary but even then the matter of creating common ways of writing html is important—even more so with HTML5 and it's new elements and attributes that come along with it.
