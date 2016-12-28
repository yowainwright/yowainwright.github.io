---
title: HTML is easy and that's why we all write it wrong
date: 2016-09-30 00:00:00 Z
permalink: "/html-is-easy/"
categories:
- html
- code
layout: post
meta: This post digs into html in order to sell the importance of understanding it
  and being open to how much more many can learn about it.
share_image: "/assets/icons/os.jpg"
---

Many many many engineers seem to have gone the route of bulldozing right past _deep html_ learning 🚜 and **_it makes sense_**! We're given jobs where quizzes and interview questions demand answers that have nothing to do with important day to day tasks like: _can you write valid html?_ It is easy to imagmine many developers might even feel insulted if asked that question. 

> We're given jobs where quizzes and interview questions demand answers that have nothing to do with important day to day tasks like: _can you write valid html?_

_Before ranting more about writing `html`, it's important to note this is a thought piece that it is a hope that valid and the subject semantic html can be expanded on more techinally in later articles.🤓

## Semantic HTML? _Of course!_

[Semantic html](https://en.wikipedia.org/wiki/Semantic_HTML) is often an assumed part of writing webpages. When asking about semantic HTML webpges, it is common to hear things like, _of course it's semantic_. Although, commentary like this can portray confidence, which it should, from seasoned engineers. It is also a close door response to a constantly evolving pattern and how patterns should be enforced within constantly evolving development patterns.

## Valid HTML? _Duh_

Beyond Semantic HTML is the issue of valid HTML. With the advancement of browsers, the desire to have website appear to be applications and new feature requests it becames very easy to forget about whether the html engineers are writing is actually valid. 

-  [Google Search](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.google.com%2F) doesn't render valid html according to W3C spec.
-  Neither does [Facebook](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.facebook.com%2F)

Does this mean that the webpages there rendering aren't valid and absolutely semantic to their customers? Absolutely not. Customers are very satisfied. However, most websides are Google and Facebook. 

This causes natural wonder as to what can be done for the mom and pop websites to provide rich experiences that can be shared accross platforms. It seems that a real focus on valide `html` would be of huge benefit in regards to syndication and page rendering for scenerios that pages worked on by smaller teams might not be able to test. 

## Back in the day

5 years ago making websites as a profession, everything that was done had to pass the [w3c test](https://validator.w3.org/). HTML validations test were even looked at as a tool to find unclosed element `<tags>` and fix layout issues. It was a standard thing to ask in job applications and put on resumes. Sure, there where a lot of `divs` but we could make a webpage render in Internet Explorer 6 _as expected_!

## Test everything but not html

As firefox became more popular, html5 elements became more supported and jQuery allowed engineers to do things without much thought as to what html was doing on a webpage. The iPhone came and Apps took a front seat. Everyone wanted an App and webpages to look like Apps so wether a webpage was valid or not didn't really seem to matter.

## The Rub

Now, years later, we know people don't go to many [webpages](https://www.quora.com/How-many-webpages-does-an-average-user-visit-per-day) and they don't use many [apps](http://fortune.com/2015/09/24/apps-smartphone-facebook/) so webpages have to be consumable for websites people _do_ go, usable for when people do get them and fast for when they _are_ viewed.

## Better Opportunities in HTML?

**High quality html is:**
-  Consumable
-  Usable
-  Fast

There are other opportunities to bullet proof awesome html.

**Usability**, I know I wrote it above but I just don't feel like a drove it home. 😄 Html has patterns built into it that make content accessible in many formats. For people with disabilities to people using standard keys to go through a webpage - if html is done well people can navigate through your web experience better.

**CSS for free**, what? Yup, those css styles that most stylesheets override are there for a reason. I'm not fully sure, but I think that the more we right correct `html` the more we can inherit from those browser provided styles.

**Meaningful markup across teams**, we write css classes to define what things are but what if we knew our `html` tags and `attributes` is such a way that that we didn't depend on css classes. Rules could be set based on html semantics.

## Tools

**Here are a few tools that can be used to write better html:**
-  [html validator](https://validator.w3.org/)
-  [htmllint](https://github.com/htmllint/htmllint)
-  [linter-htmlhint](https://github.com/AtomLinter/linter-htmlhint)
