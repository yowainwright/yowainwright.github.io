webpackJsonp([55],{"./node_modules/json-loader/index.js!./.cache/json/css-pretty-widths-with-calc.json":function(e,t){e.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2016-07-31-css-content-margins/index.md absPath of file >>> MarkdownRemark",html:"<p>I used to (&#x26; I’m not the only one) write css margins properties on containers of html elements to contain their widths on small viewports. If you’re not aware, <em>container</em> is technical term when talking about html &#x26; css that is used to describe an html element that “contains” other html elements. I try to avoid the pattern (of containing elements) by placing a <code>max width</code> on individual elements within a content area. In this post I’ll describe in detail what I used to do, the solution I used more recently &#x26; what I’m doing now.\n{: .first-paragraph}</p>\n<p>First, to go into more detail if I’ve already confused you <em>(sorry)</em>, I’ll more clearly describe what I see as the problem. When creating content blocks for webpages, widths are set so that the reader line length doesn’t get to long. For smaller browser views, like on mobile devices, space to the left &#x26; right of content areas are set so that text doesn’t extend the full width of the browser width or, worse yet - extend out of the browser so that the text can’t be read. </p>\n<blockquote>\n<p>When creating content blocks for webpages, widths are set so that the reader line length doesn’t get to long. For smaller browser views, like on mobile devices, space to the left &#x26; right of content areas are set so that text doesn’t extend the full width of the browser</p>\n</blockquote>\n<h2>The 3 approaches</h2>\n<ul>\n<li>\n<p>Using containers to set the width of content.</p>\n</li>\n<li>\n<p>Setting margins on elements within a content area.</p>\n</li>\n<li>\n<p>Setting the margins once &#x26; setting elements widths as desired </p>\n</li>\n</ul>\n<h2>The old way, using containers to set the width of content</h2>\n<p>{% highlight sass %}\n// Old way\n// don’t worry about the margins on content elements\np {\n// Note\n// there is no width set\nmargin: 0;\n}\n// set margins to the left &#x26; right of the wrapper element\n.container {\n// margins are set in this example on the left, right, top &#x26; bottom\n// max width is set here too\nmargin: 1rem;\nmax-width: 50rem;\n}\n@media (min-width: 50rem) {\n// center the wrapper if the width is greater than 50rem\n.container {\nmargin-left: auto;\nmargin-right: auto;\n}\n}\n{% endhighlight %}</p>\n<p>In this method of setting margins &#x26; widths on content, a container element is used to set the <code>width</code> of the content &#x26; the margins that are set on the left &#x26; right of the content. The positives of this approach are that content width &#x26; margins can be set on one wrapper element. The negatives with this approach are - what if you have an image, or another element that you’d like to have a different width - you might set a negative margin &#x26; exaggerate the width like, <code>margin: 0 -1rem 0 1rem, width: calc(100% + 2rem);</code>. This is already bad &#x26; then what if the containing element has a <code>oveflow: hidden</code> property set. Ugh, you’re going to get into crazy town &#x26; fast. </p>\n<h2>The <em>last current</em> way, setting different margins on different content elements</h2>\n<p>{% highlight sass %}\n// The last current way\np {\nmargin: 1rem 1rem 0;\n}\nimg {\nmargin: 1rem 0;\n}\n@media (min-width: 750px) {\np,\nimg {\nmargin-left: auto;\nmargin-right: auto;\n}\n}\n// set margins to the left &#x26; right of the wrapper element\n.container {\n// no margins in this example on the left, right, top &#x26; bottom\n// no max width set on this example\n}\n{% endhighlight %}</p>\n<p>In this method, a container element plays no role in setting the width of content within a viewport. Elements within a content block are contained by margins &#x26; max widths. Max widths may or may not be set on elements but this method often requires the use 2 margin rules on different viewports &#x26; setting a width or max width on larger viewports. The margins will almost always go something like be <code>1rem</code> to the <em>left</em> &#x26; <em>right</em> on small viewports but be set to <code>auto</code> on large viewports. With this approach there is almost always that in between moment where to content gets really wide or is positioning on the left of browser because the left &#x26; right margins haven’t been set to <code>auto</code> yet. </p>\n<h2>The <em>current</em> current way, setting the margins once &#x26; setting elements widths as desired</h2>\n<p>{% highlight sass %}\n// The new new way\np,\nimg {\nmargin: 1rem auto 0;\nmax-width: calc(100% - 2rem);\n}\nimg {\nmargin: 1rem  auto 0;\nmax-width: 100% !important;\n}\n@media (min-width: 750px) {\np {\nmax-width: 50rem;\n}\n}\n// set margins to the left &#x26; right of the wrapper element\n.container {\n// no margins in this example on the left, right, top &#x26; bottom\n// no max width set on this example\n}\n{% endhighlight %}</p>\n<p>Finally, my perferred approach is to set the margins of properties only once &#x26; resetting the preferred width of elements based on the viewport size. I do this with calc. It works great. So for a mobile view I have the width set to <code>calc(100% - 2rem)</code> which tells the browser make this element 100% of the viewport width with a margin of 1 on either side. You’ll find in this approach that the content is always centered &#x26; that elements with of 100% can be centered as well.</p>\n<p>I hope you’ve found this post to be informative. Please comment below if you disagree, feel I could’ve been more clear or have other opinions. </p>\n<p>~Thanks</p>",frontmatter:{title:"Creating beautiful layouts by setting element widths with calc",date:"July 31, 2016"}}},pathContext:{path:"/css-pretty-widths-with-calc/"}}}});
//# sourceMappingURL=path---css-pretty-widths-with-calc-2963269be3e2077e7065.js.map