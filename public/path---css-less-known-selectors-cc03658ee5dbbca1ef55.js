webpackJsonp([56],{"./node_modules/json-loader/index.js!./.cache/json/css-less-known-selectors.json":function(n,a){n.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2014-10-29-css-lesser-known-selectors/index.md absPath of file >>> MarkdownRemark",html:'<p>Having written CSS &#x26; SASS for years &#x26; using <a href="//csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/">BEM</a> it’s a rarity that I find the need to use some of the selectors I’ll list below but, every once in a while a situation comes up where I’m so thankful that they’re there.</p>\n<p><strong>Here are some attribute examples</strong></p>\n<ul>\n<li>target: <code>[target="val"]</code></li>\n<li>value: <code>[target="val"]</code></li>\n</ul>\n<p><strong>Here’s a reference table of selectors I’ll mention in this post:</strong></p>\n<table>\n<thead>\n<tr>\n<th>Selector</th>\n<th align="center">Example</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Begins with</td>\n<td align="center"><code>[attr^="val"]</code></td>\n</tr>\n<tr>\n<td>Ends with</td>\n<td align="center"><code>[attr$="val"]</code></td>\n</tr>\n<tr>\n<td>Contains (string)</td>\n<td align="center"><code>[attr*="val"]</code></td>\n</tr>\n<tr>\n<td>Contains (text)</td>\n<td align="center"><code>[title~="text"]</code></td>\n</tr>\n</tbody>\n</table>\n<h2>Begins with</h2>\n<p>The <strong>Begins with</strong> css selector uses the <code>^</code> or carrot and will select an element that starts with the defined value.</p>\n<p><strong>Example</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#something<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>something<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#not-something<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">a[href^="#something"]</span> <span class="token punctuation">{</span>\n    <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the example above the first <code>&#x3C;a></code>, or anchor tag would have a red background &#x26; the second <code>&#x3C;a></code> would have no background.</p>\n<h2>Ends with</h2>\n<p>The <strong>ends width</strong> css selector uses the <code>$</code> or dollar sign and will select an element that ends with the defined value.</p>\n<p><strong>Example</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#something-else<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>something<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#something<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">a[href$="#else"]</span> <span class="token punctuation">{</span>\n    <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the example above the first <code>&#x3C;a></code>, or anchor tag would have a blue background &#x26; the second <code>&#x3C;a></code> would have no background.\nThis can be useful if your looking to select an something in a script library like <a href="http://jquery.com">jQuery</a> where the begin of the classname is a standard naming convention.</p>\n<h2>Contains (string)</h2>\n<p>The <strong>Container (string)</strong> css selector uses the <code>*</code> or star and will select an element that has the defined value in a string.</p>\n<p><strong>Example</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#something-in-here<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>something<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#something<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">a[href*="here"]</span> <span class="token punctuation">{</span>\n    <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the example above the first <code>&#x3C;a></code>, or anchor tag would have a yellow background &#x26; the second <code>&#x3C;a></code> would have no background. This can be useful if you’re trying to select something that has been concatenated into a data attribute.</p>\n<h2>Contains (text)</h2>\n<p>The <strong>Container (text)</strong> css selector uses the <code>~</code> or approx and will select an element that has the defined text in an attribute.</p>\n<p><strong>Example</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>some special text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>something<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">a[href~="text"]</span> <span class="token punctuation">{</span>\n    <span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>In the example above the first <code>&#x3C;a></code>, or anchor tag would have a green background &#x26; the second <code>&#x3C;a></code> would have no background.\nThis can be useful if you’re trying to select something that has specific word in a title attribute.</p>\n<h2>Summation</h2>\n<p>These selectors are powerful; especially when you have to select 3rd party content (content that may or may not be on a page).</p>',frontmatter:{title:"Less used & known CSS selectors, aka attribute selectors",date:"October 29, 2014"}}},pathContext:{path:"/css-less-known-selectors/"}}}});
//# sourceMappingURL=path---css-less-known-selectors-cc03658ee5dbbca1ef55.js.map