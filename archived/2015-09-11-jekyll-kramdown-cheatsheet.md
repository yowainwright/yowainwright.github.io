---
title: Jekyll Kramdown Syntax Cheatsheet
date: "2015-09-11"
layout: post
readNext: "/"
path: "/kramdown-syntax-cheatsheet/"
meta: Kramdown Syntax Cheatsheet
share_image: "https://yowainwright.imgix.net/icons/markdown.jpg"
featured_image: null
categories:
- code
---

Using [markdown](http://daringfireball.net/projects/markdown/) is a quick way to set up a _semi-formatted_ post or page. It can really bring a page to life quickly &amp; help to visually define the layout of text. This site is built with [jekyll](http://jekyllrb.com) so I'm using [kramdown](http://kramdown.gettalong.org/), a version of markdown.

## Below is a useful cheatsheet, mainly for me.

```html
**Bold**
```

**Bold**

```html
_Italics_
```

_Italics_

```html
`Monospaced`
```

`Monospaced`

```html
> Quoted text
```

> Quoted text

```html
[link](http://makandra.com/)
```

[link](http://makandra.com/)

```html
![image alt text](//placekitten.com/g/900/600)
```

![image alt text](//placekitten.com/g/900/600)

If you want to enforce a line break,\\
you need to use two backslashes.

```html
# Headline
```

# Headline
Lorem ipsum...

Horizontal Rule Below

------------------------

Code

wrap a code block with '```'

```html
def foo
  "hello!"
end
```

Unordered List

```html
\* Unordered List Item
```

* Unordered List Item 1
* Unordered List Item 2

Ordered List

1. Ordered List Item 1
2. Ordered List Item 2

HTML

<p class="html-example">This text is wrapped by a div with an html class</p>
