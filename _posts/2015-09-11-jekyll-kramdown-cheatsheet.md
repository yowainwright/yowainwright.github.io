---
title: Jekyll Kramdown Syntax Cheatsheet
date: 2015-09-11 16:33:51 Z
permalink: "/kramdown-syntax-cheatsheet/"
categories:
- jekyll
- markdown
- code
layout: post
meta: Kramdown Syntax Cheatsheet
type: code
share_image: "/assets/icons/markdown.jpg"
---

Using [markdown](http://daringfireball.net/projects/markdown/) is a quick way to set up a _semi-formatted_ post or page. It can really bring a page to life quickly &amp; help to visually define the layout of text. This site is built with [jekyll](http://jekyllrb.com) so I'm using [kramdown](http://kramdown.gettalong.org/), a version of markdown.
{: .first-paragraph}

## Below is a useful cheatsheet, mainly for me.

{% highlight html %}
**Bold**
{% endhighlight %}

**Bold**

{% highlight html %}
_Italics_
{% endhighlight %}

_Italics_

{% highlight html %}
`Monospaced`
{% endhighlight %}

`Monospaced`

{% highlight html %}
> Quoted text
{% endhighlight %}

> Quoted text

{% highlight html %}
[link](http://makandra.com/)
{% endhighlight %}

[link](http://makandra.com/)

{% highlight html %}
![image alt text](//placekitten.com/g/900/600)
{% endhighlight %}

![image alt text](//placekitten.com/g/900/600)

If you want to enforce a line break,\\
you need to use two backslashes.

{% highlight html %}
# Headline
{% endhighlight %}

# Headline
Lorem ipsum...

Horizontal Rule Below

------------------------

Code

wrap a code block with '```'

{% highlight html %}
def foo
  "hello!"
end
{% endhighlight %}

Unordered List

{% highlight html %}
\* Unordered List Item
{% endhighlight %}

* Unordered List Item 1
* Unordered List Item 2

Ordered List

1. Ordered List Item 1
2. Ordered List Item 2

HTML

<p class="html-example">This text is wrapped by a div with an html class</p>
