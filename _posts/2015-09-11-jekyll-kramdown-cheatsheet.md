---
layout: post
title:  "Jekyll Kramdown Syntax Cheatsheet"
date: 2015-09-11 16:33:51
meta: Kramdown Syntax Cheatsheet
permalink: /kramdown-syntax-cheatsheet/
categories: jekyll kramdown markdown code
note: feature-image-aside
type: code
share_image: /assets/icons/markdown.jpg
featured_image: /assets/md.svg
---

Using [markdown](http://daringfireball.net/projects/markdown/) is a quick way to set up a _semi-formatted_ post or page. It can really bring a page to life quickly &amp; help to visually define the layout of text. This site is built with [jekyll](http://jekyllrb.com) so I'm using [kramdown](http://kramdown.gettalong.org/), a version of markdown.
{: .first-paragraph }

## Below is a useful cheatsheet, mainly for me.

{% highlight markdown %}
**Bold**
{% endhighlight %}

**Bold**

{% highlight markdown %}
_Italics_
{% endhighlight %}

_Italics_

{% highlight markdown %}
`Monospaced`
{% endhighlight %}

`Monospaced`

{% highlight markdown %}
> Quoted text
{% endhighlight %}

> Quoted text

{% highlight markdown %}
[link](http://makandra.com/)
{% endhighlight %}

[link](http://makandra.com/)

{% highlight markdown %}
![image alt text](//placekitten.com/g/900/600)
{% endhighlight %}

![image alt text](//placekitten.com/g/900/600)

If you want to enforce a line break,\\
you need to use two backslashes.

{% highlight markdown %}
# Headline
{% endhighlight %}

# Headline
Lorem ipsum...

Horizontal Rule Below

------------------------


Code

wrap a code block with '```'

{% highlight markdown %}
def foo
  "hello!"
end
{% endhighlight %}

Unordered List

{% highlight markdown %}
\* Unordered List Item
{% endhighlight %}

* Unordered List Item 1
* Unordered List Item 2

Ordered List

1. Ordered List Item 1
2. Ordered List Item 2

HTML

<p class="html-example">This text is wrapped by a div with an html class</p>
