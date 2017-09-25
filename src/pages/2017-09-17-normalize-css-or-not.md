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

#### A quick example of how

In this code, browser 1 will have a preset h1 defined `font-size` of `3rem`

```css
elementExample {
  font-size: 3rem;
}
```

Browser 2 will have a preset h1 defined `font-size` of `2.5rem`

```css
elementExample {
  font-size: 2.5rem;
}
```

When `normalize.css` is included at the top of a CSS project, it will ensure all `elements`'s have a font size `2rem` until overridden. 

```css
elementExample {
  font-size: 2em;
}
```


As long as the `font-size` is not changed, the `font-size` will be consistent across all browsers.

```css
elementExample {
  text-style: italic;
}
```

## Why I have not used CSS Normalization for a long time?

#### 1. `Normalize.css` is additive

Browsers provide CSS. `Normalize.css` adds duplicate CSS rules or overrides CSS rules provided by the browser.

In this code, by default, the `font-size` is `3rem`.

```css
elementExample {
  font-size: 3rem;
}
```

`Normalize.css` re-declares the `font-size` is as `3rem`.

```css
elementExample {
  font-size: 3rem;
}
```


Then if the `font-size` is declares for the actual project, `elementExamples`'s CSS has already been re-defined 3 times.

```css
elementExample {
  font-size: 3rem;
}
```


#### 2. Projects will override the `Normalize.css` CSS

Browsers come with CSS styles baked in that declare how HTML elements should look. Older browsers need a lot of normalization help. Newer browsers don't CSS Normalization styles are styles added to insure that styles are the same across browsers. 


In this code, by default, the `font-size` is `3rem`.

```css
elementExample {
  font-size: 3rem;
}
```

`normalize.css` will change the `font-size` to `2.5rem`.

```css
elementExample {
  font-size: 2.5rem;
}
```

Then, if the developer defines `font-size` again, withough much CSS, `elementExamples`'s CSS has already been defined and overruled 3 times.

```css
elementExample {
  font-size: 2em;
}
````


#### 3. If there is a slim element Inventory, styles will be added for elements that aren't used

`Normalize.css` provides CSS that normalizes CSS for all elements.

If a project only uses 3 elements and normalize CSS provides 6 element styles, then there will be CSS rules defined for 2 extra elements.


In this code, there are 3 defined styles

```css
elementExample1 {
  display: block;
}
elementExample2 {
  display: inline-block;
}
elementExample3 {
  display: inline;
}

```


The project only uses `elementExample`
```html
<elementExample1></elementExample1>
```

`Normalize.css` styles added for `elementExample2` and `elementExample3` will be unused.

The project only uses `elementExample`
```html
<elementExample1></elementExample1>
```

## Conclusion

`Normalize.css` is a great tool that was relied on for a long time. Now, it is still an important source for defining CSS style standards. It may not need to be included in now. 










