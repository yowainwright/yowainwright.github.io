---
layout: simple
title:  "Lesser Known Advanced Selectors"
categories: css, code
permalink: lesser-known-css-selectors
unique: lesser-known-css-selectors
metadescription: Lesser Known Advanced CSS Selectors discusses some powerful under utilized CSS selectors that are well supported.
scripts: <script type="text/javascript">var addthis_config = {"data_track_addressbar":true};</script>
 <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4ee43114077ff9ad"></script>
---
# Lesser Known Advanced Selectors *Since CSS 2.1*
@(Sample notebook)[Code|Code Snippets|CSS]

>Have to say: I haven't used the before, after and contains selector(s) much. Thanks [Team Treehouse](http://teamtreehouse.com/library/css-foundations/advanced-selectors/substring-matching-attribute-selectors-2) for re-openning my mind to them!

I've been writing CSS & SASS for years but never, or rarely, leveraged the power of a lot of these selectors.

**Here are the bits needed to make this css declaration**
- attribute: [`attr`|target="val"]
- target: [attr|`target`="val"]
- value: [attr|target="`val`"]

**Here's a reference table of the Advanced Selectors I'm discussing in this post:**

| Selector | Example |
|----------|:-------------:|
| Begins with | `[attr^="val"]` |
| Ends with | `[attr$="val"]` |
| Contains (string) | `[attr*="val"]` |
| Contains (text) | `[title~="text"]` |

### Begins with

The **Begins with** css selector uses the `^` or carrot and will select an element that starts with the defined value.

#### Example
`html`
```html
    <a href="#something">something</a>
    <a href="#not-something"></a>
```
`css`
```css
    a[href^="#something"] {
        background: red;
    }
```

In the example above the first `<a>`, or anchor tag would have a red background & the second `<a>` would have no background.

### Ends with

The **ends width** css selector uses the `$` or dollar sign and will select an element that ends with the defined value.

#### Example
`html`
```html
    <a href="#something-else">something</a>
    <a href="#something"></a>
```
`css`
```css
    a[href$="#else"] {
        background: blue;
    }
```

In the example above the first `a`, or anchor tag would have a blue background & the second `a` would have no background.
This can be useful if your looking to select an something in a script library like [jQuery](http://jquery.com) where the begin of the classname is a standard naming convention.

### Contains (string)

The **Container (string)** css selector uses the `*` or star and will select an element that has the defined value in a string.

#### Example
`html`
```html
    <a href="#something-in-here">something</a>
    <a href="#something"></a>
```
`css`
```css
    a[href*="here"] {
        background: yellow;
    }
```

In the example above the first `a`, or anchor tag would have a yellow background & the second `a` would have no background. This can be useful if you're trying to select something that has been concatenated into a data attribute.

### Contains (text)

The **Container (text)** css selector uses the `~` or approx and will select an element that has the defined text in an attribute.

#### Example
`html`
```html
    <a title="some special text">something</a>
    <a title="text"></a>
```
`css`
```css
    a[href~="text"] {
        background: yellow;
    }
```

In the example above the first `a`, or anchor tag would have a green background & the second `a` would have no background.
This can be useful if you're trying to select something that has specific word in a title attribute.
### Summation

These selects are extemely power less documented and used ways to style html with css. 
