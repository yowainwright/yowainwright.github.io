---
layout: post
title:  CSS Margins, Max Widths or Maybe Not Margins
author: Jeff Wainwright
date: 2016-07-31
meta: Using css calc max widths to set content widths is better than adding margins, for devices especially
permalink: /css-max-widths-instead-of-margins/
categories: code css sass
note: feature-image-aside
share_image: /assets/icons/sass.jpg
featured_image: /assets/sass.svg
---

I used to (& I'm not the only one) write css margins properties on containers of html elements. If you're not aware _containers_ are technical terms when talking about html & css that are used to describe html elements that contain other html elements. I try to avoid this pattern now by placing a `max width` on individual elements. In this post I'll describe in detail what I used to do, the solution I used more recently & what I'm doing now. 
{: .first-paragraph }

## The old way, setting margins on wrapper elements

{% highlight sass %}
	// Old way
	// don't worry about the margins on content elements 
	p {
		// Note 
		// there is no width set
		margin: 0;
	}
	// set margins to the left & right of the wrapper element
	.wrapper {
		// margins are set in this example on the left, right, top & bottom
		// max width is set here too
		margin: 1rem;
		max-width: 50rem;
	}
	@media (min-width: 50rem) {
		// center the wrapper if the width is greater than 50rem
		.wrapper {
			margin-left: auto;
			margin-right: auto;
		}
	}
{% endhighlight %}

In this method of setting margins & widths on content, a wrapper element is used to set the `width` of the content & the margins that are set on the left & right of the content. The positives of this approach are that content width & margins can be set on one wrapper element. The negatives are that content becomes less dynamic visually because different elements within a content block can't have different widths.

## The last _current_ way, setting different margins on different content elements

{% highlight sass %}
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
	.wrapper {
		// no margins in this example on the left, right, top & bottom
		// no max width set on this example
	}
{% endhighlight %}

In this method, a wrapper element plays no role in setting the width of content within a viewport. Elements within a content block are contained by margins & max widths. Max widths may or may not be set on elements but this method often requires the use 2 margin rules on different viewports & setting a width or max width on larger viewports. 

## The _current_ current way, setting the margin, then changing the max-width based on viewport size 

{% highlight sass %}
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
	.wrapper {
		// no margins in this example on the left, right, top & bottom
		// no max width set on this example
	}
{% endhighlight %}

The _new_ new method I'm enjoying is setting the margin once & reseting the width of elements if needed by using css calc. This ensures that block elements are always centered & the widths are defined within content are defined as needed.


