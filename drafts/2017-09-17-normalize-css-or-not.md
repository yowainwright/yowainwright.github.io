---
title: Normalize.css, or not? Here are some considerations
date: "2017-09-17"
layout: post
readNext: "/"
path: "/narmalize-css-or-not/"
meta: Normalizing CSS has been a default part of front-end projects for years. This post questions that and provides some points on why normalizing css may not be needed.
featured_image: null
categories:
- note
- css
---

For years, normalizing CSS was a starting part of building a new product. For the past few years I've become more adverse to adding common Normalization CSS files but never really clarified why. In this post I will go into what CSS normalization is, why it would be used, and why it might not be needed.  

[CSS Normalization](https://necolas.github.io/normalize.css/) is a concept of defining CSS property values so that a web pages styles behave and look consistent across web browsers, like Internet Explorer, Fire Fox, Safari, and Chrome **before** adding styles to the CSS. that gained moment back in 2012 by [Nicolas Gallagher](https://twitter.com/necolas) and [Jon Neal](https://twitter.com/jon_neal). 

## What does this do for web projects?
-  makes basic element styles the same across web browsers before more styles are added. 
-  defines a standard to start with when working on a new project
-  makes your outputted `.css` bigger
-  provides basic support against random design notes from your grand mother who uses Internet Explorer and want to view all of the table layouts you're making

## What does this _not_ do for web projects?

-  does not prevent other cross browser hacks that are added to the CSS Cascade after normalization
-  does not define usable styles for your project—it is not a CSS framework
-  does not provide browser hacks to normalization your CSS
-  does not protect a project's CSS from un-normalizing itself
-  does not love your like your grandmother does and will not accept that you are defining overriding styles until you trump its styles or use something like [purify CSS](https://github.com/purifycss/purifycss)

## Why would someone use Normalization?

CSS Normalization gives developers a safe starting point and which to know if there are browser quirks—they made the quirks. This is because all CSS elements should look the same across all browsers. For projects where an element inventory is not looked after regularly or, perhaps if there are very very few styles, CSS Normalize can guarantee normality of elements pre-styling.

## Why I have not used CSS Normalization for a long time?

-  **CSS Normalization is additive:** Browsers come baked with a small set of CSS styles that declare how elements should look within their browser. Over the last years, normalization of elements between browsers is much better. CSS Normalization styles are styles added to insure that syles are the same across browsers. 



