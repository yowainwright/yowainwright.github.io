---
layout: post
title:  "HTML is easy and that's why we all write it wrong"
date: 2016-09-30
meta: In this post, I'll dig into html in order to sell the importance of understanding it
permalink: /html-is-easy/
note: no-featured-image
categories: story general second
share_image: /assets/icons/os.jpg
featured_image: /assets/os.svg
---

Most developers seem to have gone the route of bulldozing right past _deep html_ learning 🚜. It makes sense. We're given jobs where quizzes and interview questions demand answers that have nothing to do with - can you write valid html? If developers were asked that question, I imagine some might even feel insulted.

[Semantic html](https://en.wikipedia.org/wiki/Semantic_HTML) is often an assumed part of writing webpages - like, 'of course the webpges are semantic' or 'is that even a issue with modern webpages?'

I'm not the only one.

-   [Google Search](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.google.com%2F) doesn't render valid html.
-   Neither does [Facebook](https://validator.w3.org/nu/?doc=https%3A%2F%2Fwww.facebook.com%2F)

Most developers seem to have gone the route of bulldozing right past _deep html_ learning 🚜. It makes sense. We're given jobs where quizzes and interview questions demand answers that have nothing to do with - can you write valid html? If developers were asked that question, I imagine some might even feel insulted.

Furthermore, within our jobs we're often given tasks from designs or user experiences which may ask us to break the standard html patterns. We work in browsers that will render a page that looks awesome anyway - so what's the whoop? It seems in the everyday developer environment Html doesn't _really_ matter. It's all about other things. 🤔

## How did html degradation happen?

When I started making websites as a profession, everything I did had to pass the [w3c test](https://validator.w3.org/). I remember using this tool to find unclosed element `<tags>` and fix layout issues. It was a standard thing to ask in job applications and put on a resume. Sure, there where a lot of `divs` but I could make a webpage render in Internet Explorer 6 _as expected_!

Then firefox became more popular, html5 elements became more supported and jQuery allowed us to do things without much thought as to what html was doing on a webpage. The iPhone came and Apps to a front seat. Everyone wanted an App and webpages to look like Apps so wether a webpage was valid or not didn't really seem to matter.

## The Rub

Now, years later, we know people don't go to many [webpages](https://www.quora.com/How-many-webpages-does-an-average-user-visit-per-day) and they don't use many [apps](http://fortune.com/2015/09/24/apps-smartphone-facebook/) so webpages have to be consumable for websites people _do_ go, usable for when people do get them and fast for when they _are_ viewed.

At this point I'm thinking, 'markup is maybe second most important part of a webpage' (behind content).

## What are some opportunities in better html?

Beyond the basics of high quality html,
-   Consumable
-   Usable
-   Fast

There are other opportunities to bullet proof awesome html.

**Usability**, I know I wrote it above but I just don't feel like a drove it home. 😄 Html has patterns built into it that make content accessible in many formats. For people with disabilities to people using standard keys to go through a webpage - if html is done well people can navigate through your web experience better.

**CSS for free**, what? Yup, those css styles that most stylesheets override are there for a reason. I'm not fully sure, but I think that the more we right correct `html` the more we can inherit from those browser provided styles.

**Meaningful markup across teams**, we write css classes to define what things are but what if we knew our `html` tags and `attributes` is such a way that that we didn't depend on css classes. Rules could be set based on html semantics.

## Rant

Well, there are some - most tools have fallen aside to other tools for linting & checking if this are done well. What I'm saying is, there should be better tools for checking, understanding & writing html!

> There should be better tools for checking, understanding & writing html!

Think about how you use your phone or other tools on the internet. I'm gonna go out on a limb (but I don't think it's wrong) - the majority of what you consume is text, images & media & in a very plain way!

Developers and people of the like should be thinking this way, 'we need tools that get our text, images & media in consumer hands'. Valid, semantic html would seem to be a great way to do that.

## Tools

-   [html validator](https://validator.w3.org/)
-   [htmllint](https://github.com/htmllint/htmllint)
-   [linter-htmlhint](https://github.com/AtomLinter/linter-htmlhint)
