webpackJsonp([0x2f862360472da800],{"./node_modules/json-loader/index.js!./.cache/json/destructing-function-opts.json":function(n,a){n.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2017-03-12-working-with-opts-es6.md absPath of file >>> MarkdownRemark",html:'<p>Open source plugin code can become confusing. After writing a few open source plugins, I’ve realized that readability is very important to get help and make code better. One area where readability becomes confusing is options code. In this short post, I will go over options code in JavaScript Plugins and how it can be improved.\n{: .first-paragraph}</p>\n<h2>What are options?</h2>\n<blockquote>\n<p>Options, in JavaScript, are arguements passed in a function to replace default properties values.</p>\n</blockquote>\n<p>Options, in JavaScript, are arguements passed in a function to replace default properties values. In example, sometimes a plugin will have a default css class that it is associated with. Plugins will often allow users to change this default css class. </p>\n<p>Here an example of how options look in JavaScript from ES5:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">someFunction</span><span class="token punctuation">(</span>opts<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> defaults <span class="token operator">=</span> <span class="token punctuation">{</span>\n    el<span class="token punctuation">:</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span>\n    win<span class="token punctuation">:</span> window<span class="token punctuation">,</span>\n    attribute<span class="token punctuation">:</span> <span class="token string">\'data-some-attr\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> el <span class="token operator">=</span> opts <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>el <span class="token operator">||</span> defaults<span class="token punctuation">.</span>el<span class="token punctuation">;</span>\n  <span class="token keyword">var</span> win <span class="token operator">=</span> opts <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>win <span class="token operator">||</span> defaults<span class="token punctuation">.</span>win<span class="token punctuation">;</span>\n  <span class="token keyword">var</span> attribute <span class="token operator">=</span> opts <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>attribute <span class="token operator">||</span> defaults<span class="token punctuation">.</span>attribute<span class="token punctuation">;</span>\n  <span class="token comment" spellcheck="true">// for exampe perposes</span>\n  <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    element<span class="token punctuation">:</span> el<span class="token punctuation">,</span>\n    document<span class="token punctuation">:</span> win<span class="token punctuation">,</span>\n    attr<span class="token punctuation">:</span> attribute\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>And here’s how it can be changed when it is initiated:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">someFunction</span><span class="token punctuation">(</span><span class="token punctuation">{</span>attribute<span class="token punctuation">:</span> <span class="token string">\'data-attr\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>The <em>log</em> will now looking something like: </p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>  Object<span class="token punctuation">:</span> attr<span class="token punctuation">:</span> <span class="token string">"data-attr"</span><span class="token punctuation">,</span> document<span class="token punctuation">:</span> Window<span class="token punctuation">,</span> element<span class="token punctuation">:</span> html\n</code></pre>\n      </div>\n<h2>Defined Options Is Confusing</h2>\n<p>The <code>options</code> code above is confusing! I mean, what the heck is going on here?</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> el <span class="token operator">=</span> opts <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>el <span class="token operator">||</span> defaults<span class="token punctuation">.</span>el<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This code needs an <code>el</code> property. It says, define the <code>el</code> property from <code>opts</code> (passed in from a function) or get the default <code>el</code> value. That’s a lot of work to make sure that a property has a value.</p>\n<h2>Option Readability Can Be Improved With ES6</h2>\n<p>ES6, with function destructuring allows us to make options code more readable.</p>\n<p>With ES6, we can write this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">someFunction</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  el <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span>\n  win <span class="token operator">=</span> window<span class="token punctuation">,</span>\n  attribute <span class="token operator">=</span> <span class="token string">\'data-some-attr\'</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    element<span class="token punctuation">:</span> el<span class="token punctuation">,</span>\n    document<span class="token punctuation">:</span> win<span class="token punctuation">,</span>\n    attr<span class="token punctuation">:</span> attribute\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>And then add any custom opts with:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">someFunction</span><span class="token punctuation">(</span><span class="token punctuation">{</span>attribute<span class="token punctuation">:</span> <span class="token string">\'data-attr\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This trims down the reference to a poperty value to 2 times versus 3!</p>\n<h2>Conclusion</h2>\n<p>With ES6 function destructuring, options code is much cleaner and easier to read. As a result Open Source Plugins that use this feature are easier to improve and understand.</p>',frontmatter:{featured_image:null,meta:"This post explains how to use ES6 function destructuring for more readable JavaScript Plugin Options.",title:"Using ES6 Function Destructuring with JavaScript Plugin Options",date:"March 12, 2017"}}},pathContext:{path:"/destructing-function-opts/"}}}});
//# sourceMappingURL=path---destructing-function-opts-1b7262d9cba7d8aff150.js.map