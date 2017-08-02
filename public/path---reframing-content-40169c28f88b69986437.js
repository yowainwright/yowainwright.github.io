webpackJsonp([30],{"./node_modules/json-loader/index.js!./.cache/json/reframing-content.json":function(e,t){e.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2016-09-19-reframing-content.md absPath of file >>> MarkdownRemark",html:'<p>The most meaningful part of the webpage, the content, can be a largely unknown thing. Authors create content in one place &#x26; expect it to render well in another. Embedded content adds another level of complexity to this process.\n{: .first-paragraph}</p>\n<p>Embedded content, like videos, images, podcasts &#x26; tweets often do not translate well to a fluid webpage - so we need to reframe them. This is what <a href="https://dollarshaveclub.github.io/reframe.js/">Reframe.js</a> does. It wraps embedded content in an <a href="http://alistapart.com/article/creating-intrinsic-ratios-for-video">intrinsic ratio</a> of the original embed but with fluid sizing so that the embedded content looks great at any size.</p>\n<p data-height="380" data-theme-id="0" data-slug-hash="qaaGYV" data-default-tab="result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/qaaGYV/">Intrinsic Ratio Animation</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>\n<script async src="//assets.codepen.io/assets/embed/ei.js"></script>\n<h2>Why Reframe.js?</h2>\n<p>Previous to writing this plugin, I used <a href="http://fitvidsjs.com/">FitVids</a>. FitVids is a great plugin for solving reframing videos. It\'s written by 2 of my idols, <a href="http://chriscoyier.net/">Chris Coyier</a> &#x26; <a href="http://daverupert.com/">Dave Ruppert</a>. Fitvids <em>takes a chance</em> that most of your content will be 1 of 5 <code>selectors</code>. If those assumptions are correct (&#x26; if you\'re using jQuery) - FitVids is golden. If not, there might need to be little extra code on top of the little extra code added that assumes your embedded content will be 1 of 5 <code>selectors</code>. The reason that Reframe.js was originally made was because <a href="http://jquery.com/">jQuery</a> was not being used on a new product at <a href="http://dollarshaveclub.com">DSC</a>.</p>\n<p>Reframe.js also:</p>\n<ol>\n<li>doesn\'t assume your reframing just videos (by name at least),</li>\n<li>offers a css mixin rather than inlining css which can make your dom (html) cleaner</li>\n<li>&#x26; offers jQuery plugin that is written in such a way that if unused - it can be shaken out with <a href="https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.ccnp22e5f">Tree shaking</a>.\nThese things make the code lighter initially.</li>\n</ol>\n<h2>Options</h2>\n<p>The one option supported by Reframe.js is the ability to add your own css class instead of the default css class <code>js-reframe</code>. This is so that the end result of using the library on a webpage is minimal - just 1 inline style added (for the intersic ratio).</p>\n<p>Reframe.js\'s simplicity in both language &#x26; options is meant to make the plugin easy to understand &#x26; easy to write code to support your product\'s end goal.</p>\n<h2>Plugin Breakdown</h2>\n<p><strong>CSS (aspect ratio)</strong></p>\n<p>In this sass mixin, the default aspect ratio is 16:9 but we can override that to make the reframe a perfect ratio of the embed\'s original size.</p>\n<p>{% highlight sass %}</p>\n<p>@mixin reframe($el: iframe, $paddingTop: 56.25%){\npadding-top: $paddingTop;\nposition: relative;\nwidth: 100%;</p>\n<h1>{$el} {</h1>\n<pre><code>height: 100%;\nleft: 0;\nposition: absolute;\ntop: 0;\nwidth: 100%;\n</code></pre>\n<p>  }\n}</p>\n<p>{% endhighlight %}</p>\n<p><strong>JavaScript</strong></p>\n<p>Wrap a selected element in a <code>div</code>.</p>\n<p>{% highlight javascript %}</p>\n<p>const frame = element // frame is the elmeent to be wrapped\nconst div = document.createElement(\'div\');\nframe.parentNode.insertBefore(div, frame);\nframe.parentNode.removeChild(frame);\ndiv.appendChild(frame);</p>\n<p>{% endhighlight %}</p>\n<p>Add padding to create an intrinsic ratio.</p>\n<p>{% highlight javascript %}</p>\n<p>// where the frame is the element &#x26; the div is the added wrapper element\nconst height = frame.offsetHeight;\nconst width = frame.offsetWidth;\nconst padding = height / width * 100;\ndiv.style.paddingTop = padding + \'%\';</p>\n<p>{% endhighlight %}</p>\n<p>Make a plugin for jQuery or <a href="http://zeptojs.com/">Zepto</a>.</p>\n<p>{% highlight javascript %}</p>\n<p>if (window.$) {\nwindow.$.fn.extend({\nreframe: function reframeFunc(cName) {\nreturn reframe(this, cName);\n}\n});\n}</p>\n<p>{% endhighlight %}</p>\n<p>Add a check to the top of the plugin which allows us to select the element to reframe with jquery <em>or</em> plain js (Kodos to <a href="http://jakiestfu.com/">Jacob Kelley</a> here).</p>\n<p>{% highlight javascript %}</p>\n<p>let frames = typeof target === \'string\' ? document.querySelectorAll(target) : target;\nif (!(\'length\' in frames)) {\nframes = [frames];\n}</p>\n<p>{% endhighlight %}</p>\n<p>Here\'s the code you write.</p>\n<p>{% highlight javascript %}</p>\n<p>reframe(\'selector\');</p>\n<p>{% endhighlight %}</p>\n<p data-height="380" data-theme-id="0" data-slug-hash="Gjjbak" data-default-tab="css,result" data-user="yowainwright" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yowainwright/pen/Gjjbak/">Reframe.js jQuery Demo</a> by Jeff Wainwright (<a href="http://codepen.io/yowainwright">@yowainwright</a>) on <a href="http://codepen.io">CodePen</a>.</p>\n<script async src="//assets.codepen.io/assets/embed/ei.js"></script>\n<h2>To Dos</h2>\n<p>Currently, I\'m playing with the idea of removing the default padding of the ratio (56.25%) that\'s in the <code>css</code> because it is overwritten everytime the plugin is called.\nAlso, I think I will be adding a docs folder for using the plugin &#x26; specific use cases that might come up.</p>\n<h2>Summary</h2>\n<p>One of the fun challenges when writing code for content is to support creativity in a controlled way. Reframe.js is a great solve for making embedded content look great on your website. Initially, we didn\'t know if we would be using jQuery for our product at <a href="https://www.dollarshaveclub.com/">DSC</a> so <a href="http://fitvidsjs.com/">FitVids</a> was out of the question - which led me down the path of writing some new code. The end result was Reframe.js. Hope it works well for you if you use it.</p>\n<p>I plan on writing more lightweight plugins to solve common content problems in the future. If you have questions or ideas in regards to <a href="https://github.com/dollarshaveclub/reframe.js">Reframe.js</a> please contact me - links below.</p>',frontmatter:{title:"Reframing content responsively with Reframe.js",date:"September 19, 2016"}}},pathContext:{path:"/reframing-content/"}}}});
//# sourceMappingURL=path---reframing-content-40169c28f88b69986437.js.map