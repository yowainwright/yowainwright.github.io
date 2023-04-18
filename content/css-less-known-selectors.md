---
title: Less used & known CSS selectors, aka attribute selectors
date: "2014-10-29"
layout: post
readNext: "/"
path: "/css-less-known-selectors"
meta: Less known CSS selectors, aka attribute selectors
share_image: "https://yowainwright.imgix.net/icons/sass.jpg"
featured_image: null
post_index: 7
categories:
- css
- code
---

Having written CSS & SASS for years & using [BEM](//csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) it's a rarity that I find the need to use some of the selectors I'll list below but, every once in a while a situation comes up where I'm so thankful that they're there.

**Here are some attribute examples**

-  target:&nbsp;`[target="val"]`
-  value:&nbsp;`[target="val"]`

**Here's a reference table of selectors I'll mention in this post:**

| Selector | Example |
|----------|:-------------:|
| Begins with | `[attr^="val"]` |
| Ends with | `[attr$="val"]` |
| Contains (string) | `[attr*="val"]` |
| Contains (text) | `[title~="text"]` |

## Begins with

The **Begins with** css selector uses the `^` or carrot and will select an element that starts with the defined value.

**Example**
```html
<a href="#something">something</a>
<a href="#not-something"></a>
```


```css
a[href^="#something"] {
    background: red;
}
```

In the example above the first `<a>`, or anchor tag would have a red background & the second `<a>` would have no background.

## Ends with

The **ends width** css selector uses the `$` or dollar sign and will select an element that ends with the defined value.

**Example**

```html
<a href="#something-else">something</a>
<a href="#something"></a>
```

```css
a[href$="#else"] {
    background: blue;
}
```

In the example above the first `<a>`, or anchor tag would have a blue background & the second `<a>` would have no background.
This can be useful if your looking to select an something in a script library like [jQuery](http://jquery.com) where the begin of the class name is a standard naming convention.

## Contains (string)

The **Container (string)** css selector uses the `*` or star and will select an element that has the defined value in a string.

**Example**

```html
<a href="#something-in-here">something</a>
<a href="#something"></a>
```

```css
a[href*="here"] {
    background: yellow;
}
```

In the example above the first `<a>`, or anchor tag would have a yellow background & the second `<a>` would have no background. This can be useful if you're trying to select something that has been concatenated into a data attribute.

## Contains (text)

The **Container (text)** css selector uses the `~` or approx and will select an element that has the defined text in an attribute.

**Example**

```html
<a title="some special text">something</a>
<a title="text"></a>
```

```css
a[href~="text"] {
    background: yellow;
}
```

In the example above the first `<a>`, or anchor tag would have a green background & the second `<a>` would have no background.
This can be useful if you're trying to select something that has specific word in a title attribute.

## Summation

These selectors are powerful; especially when you have to select 3rd party content (content that may or may not be on a page).
