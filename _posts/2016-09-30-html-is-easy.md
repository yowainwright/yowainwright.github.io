---
title: HTML is easy and that's why we all write it wrong
date: 2016-09-30 00:00:00 Z
permalink: "/html-is-easy/"
categories:
- html
- code
layout: post
meta: This post digs into html in order to sell the importance of understanding it
  and being open to how much more can be learned about it.
share_image: "/assets/icons/os.jpg"
---

It seems that many developers seem to have gone the route of bulldozing truly thinking about HTML 🚜 _which makes sense_**! We're given complex tasks where the benefits of quality HTML are not considered in my recent experience. Questions like, _is the HTML valid?_ or _is the HTML semantic?_ are never asked. 

Before ranting more about HTML, please note - this is a _thought_ post! It's an attempt to feel thoughts before digging deeply into results from technical discovery. 🤓

## Semantic HTML? 

[Semantic html](https://en.wikipedia.org/wiki/Semantic_HTML) is often an assumed part of writing webpages. Yet, it is not uncommon when looking at webpages (pages, I've written too) to find html that could be improved semantically. Tools, like CSS and Search Engines could _probably_ greatly benefit from semantically thoughtful html. Ensuring that this thoughtfulness is added to webpages, in my experience from reading, writing and working with developers and product teams is not considered.

## Valid HTML? 

Beyond Semantic HTML, valid HTML also seems to be an issue. With browser advancements, checking whether html is actually valid doesn't happen. 

-  [Google Search](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.google.com%2F) doesn't render valid html according to W3C spec.
-  Neither does [Facebook](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.facebook.com%2F)

Does this mean that the webpages they're rendering aren't valid and absolutely semantic to their customers? Absolutely not. Customers are very satisfied (I think). However, most websites are **not** Google and Facebook. This is where the point of valid html could _still_ be a very important thing to consider. 💭

Websites looking to grow their audience should always look to provide rich experiences that can be shared across the most possible platforms in the easiest way. Valid and semantic html would definitely (probably) make that easier and with less long run effort. 

## Writing HTML back in the day

Years ago when making webpages professionally, everything that was done had to pass the [w3c test](https://validator.w3.org/). HTML validation tests were even looked at as a tool to find unclosed element tags and fix layout issues. Sure, there where a lot of `divs` but we could make a webpage render in Internet Explorer 6 _as expected_!

As browsers became better, HTML5 elements became more supported, and jQuery allowing easy Dom manipulation HTML testing and review seemed to become more and more of an after thought. Then, the iPhone came and Apps took a front seat. Everyone wanted an App and webpages to look like Apps so whether a webpage's HTML was valid or not didn't matter.

Now, years later, we know people don't go to many [webpages](https://www.quora.com/How-many-webpages-does-an-average-user-visit-per-day) and they don't use many [apps](http://fortune.com/2015/09/24/apps-smartphone-facebook/) so webpages have to be consumable for websites people _do_ go, usable for when people do get them, and fast for when they _are_ viewed.

## Better Opportunities in HTML?

**High quality html is:**

-  **Consumable:** when webpages are consumed by third party services like Medium and Facebook instant articles, high quality HTML is _probably_ much more consumable.
-  **Usable:** thoughtful HTML is much more usable for people with special needs and people in general.
-  **Fast:** browsers can probably render thoughtful HTML better. 

## Tools

**Here are a few tools that can be used to write better html:**

-  [html validator](https://validator.w3.org/)
-  [htmllint](https://github.com/htmllint/htmllint)
-  [linter-htmlhint](https://github.com/AtomLinter/linter-htmlhint)

## Conclusion

These thoughts have not yet been analyzed or tested. With tools like [AMP](https://www.ampproject.org/), it may not ever be necessary but even then the matter of create common ways of writing html is important - even more so with HTML5 and it's new elements and attributes that come along with it.



