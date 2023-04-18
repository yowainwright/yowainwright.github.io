---
title: Creating beautiful layouts by setting element widths with calc
date: "2016-07-31"
layout: post
readNext: "/"
path: "/css-pretty-widths-with-calc"
meta: Use css calc values to set the width of elements within content blocks & create
  beautiful layouts, for devices especially
share_image: "https://yowainwright.imgix.net/icons/sass.jpg"
featured_image: null
post_index: 17
categories:
- code
- css
- sass
---

I used to (& I'm not the only one) write css margins properties on containers of html elements to contain their widths on small viewports. If you're not aware, _container_ is technical term when talking about html & css that is used to describe an html element that "contains" other html elements. I try to avoid the pattern (of containing elements) by placing a `max width` on individual elements within a content area. In this post I'll describe in detail what I used to do, the solution I used more recently & what I'm doing now. 

First, to go into more detail if I've already confused you _(sorry)_, I'll more clearly describe what I see as the problem. When creating content blocks for webpages, widths are set so that the reader line length doesn't get to long. For smaller browser views, like on mobile devices, space to the left & right of content areas are set so that text doesn't extend the full width of the browser width or, worse yet - extend out of the browser so that the text can't be read. 

> When creating content blocks for webpages, widths are set so that the reader line length doesn't get to long. For smaller browser views, like on mobile devices, space to the left & right of content areas are set so that text doesn't extend the full width of the browser

## The 3 approaches

- Using containers to set the width of content.

- Setting margins on elements within a content area.

- Setting the margins once & setting elements widths as desired 


## The old way, using containers to set the width of content

```css
	// Old way
	// don't worry about the margins on content elements 
	p {
		// Note 
		// there is no width set
		margin: 0;
	}
	// set margins to the left & right of the wrapper element
	.container {
		// margins are set in this example on the left, right, top & bottom
		// max width is set here too
		margin: 1rem;
		max-width: 50rem;
	}
	@media (min-width: 50rem) {
		// center the wrapper if the width is greater than 50rem
		.container {
			margin-left: auto;
			margin-right: auto;
		}
	}
```

In this method of setting margins & widths on content, a container element is used to set the `width` of the content & the margins that are set on the left & right of the content. The positives of this approach are that content width & margins can be set on one wrapper element. The negatives with this approach are - what if you have an image, or another element that you'd like to have a different width - you might set a negative margin & exaggerate the width like, `margin: 0 -1rem 0 1rem, width: calc(100% + 2rem);`. This is already bad & then what if the containing element has a `oveflow: hidden` property set. Ugh, you're going to get into crazy town & fast. 

## The _last current_ way, setting different margins on different content elements

```css
	// The last current way
	p {
		margin: 1rem 1rem 0;
	}
	img {
		margin: 1rem 0;
	}
	@media (min-width: 750px) {
		p,
		img {
			margin-left: auto;
			margin-right: auto;
		}
	}
	// set margins to the left & right of the wrapper element
	.container {
		// no margins in this example on the left, right, top & bottom
		// no max width set on this example
	}
```

In this method, a container element plays no role in setting the width of content within a viewport. Elements within a content block are contained by margins & max widths. Max widths may or may not be set on elements but this method often requires the use 2 margin rules on different viewports & setting a width or max width on larger viewports. The margins will almost always go something like be `1rem` to the _left_ & _right_ on small viewports but be set to `auto` on large viewports. With this approach there is almost always that in between moment where to content gets really wide or is positioning on the left of browser because the left & right margins haven't been set to `auto` yet. 

## The _current_ current way, setting the margins once & setting elements widths as desired 

```css
	// The new new way
	p,
	img {
		margin: 1rem auto 0;
		max-width: calc(100% - 2rem);
	}
	img {
		margin: 1rem  auto 0;
		max-width: 100% !important;
	}
	@media (min-width: 750px) {
		p {
			max-width: 50rem;
		}
	}
	// set margins to the left & right of the wrapper element
	.container {
		// no margins in this example on the left, right, top & bottom
		// no max width set on this example
	}
```

Finally, my preferred approach is to set the margins of properties only once & resetting the preferred width of elements based on the viewport size. I do this with calc. It works great. So for a mobile view I have the width set to `calc(100% - 2rem)` which tells the browser make this element 100% of the viewport width with a margin of 1 on either side. You'll find in this approach that the content is always centered & that elements with of 100% can be centered as well.

I hope you've found this post to be informative. Please comment below if you disagree, feel I could've been more clear or have other opinions. 

~Thanks


