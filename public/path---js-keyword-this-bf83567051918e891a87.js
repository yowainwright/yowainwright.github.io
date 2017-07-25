webpackJsonp([42],{"./node_modules/json-loader/index.js!./.cache/json/js-keyword-this.json":function(n,s){n.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2015-01-10-js-keyword-this/index.md absPath of file >>> MarkdownRemark",html:'<p>The <em><strong>this</strong></em> keyword in Javascript is something that has often confused me, especial which object it is attached to. I’ve realized trying to explain it a few times that it’s difficult to explain.</p>\n<p>The <em>this</em> keyword is a parameter that gets bound to an object. That parameter this is determined by how a function of method is called. It behaves almost exactly like a normal parameter.</p>\n<p>Here’s a list of what the keyword this is <strong>not</strong> bound to:</p>\n<ul>\n<li>the object created literal</li>\n<li>the function object it appears in</li>\n<li>a new function it appears in</li>\n<li>a object that has a function of the property</li>\n<li>the objects execution context</li>\n</ul>\n<p>Key’s to figuring out what the key work This will be bound to</p>\n<ul>\n<li>This gets bound to the object left of the dot (period, ‘.’)</li>\n<li>If the keyword new is used to create a new object This gets bound to that new object</li>\n<li>If there is not dot &#x26; no keyword this will get bound to the global object</li>\n<li>When using the .call() method another argument is passed in &#x26; This takes that value</li>\n</ul>\n<p>The 4 ways this is initiated:</p>\n<ul>\n<li>In a function.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">funcName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<ul>\n<li>In a method</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n     funcName <span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<ul>\n<li>As a constructor</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myFunc</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> newMyFunc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">myFunc</span><span class="token punctuation">(</span>‘Jeff\'<span class="token punctuation">)</span><span class="token punctuation">;</span>\ndocument<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>newMyFunc<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<ul>\n<li>Using <strong>.call();</strong> or <strong>.apply();</strong> methods</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">juggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> n <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> n<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   result <span class="token operator">+</span><span class="token operator">=</span> arguments<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> result<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ninja1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> ninja2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\njuggle<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>ninja1<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\njuggle<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ninja2<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p><strong>example:</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> fn <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>one<span class="token punctuation">,</span> two<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">log</span><span class="token punctuation">(</span>one<span class="token punctuation">,</span> two<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> r <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    g <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n    b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\nr<span class="token punctuation">.</span>method <span class="token operator">=</span> fn<span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// This gets bound to r</span>\nr<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// This gets bound to r</span>\n<span class="token function">fn</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// This gets bound to the global object</span>\nfn<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> g<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// This gets bound to r</span>\n</code></pre>\n      </div>\n<p>After looking at the <em>this</em> key word in a bunch of ways, the best way to describe the <em>this</em> parameter is to say that it is a powerful tool to reference the object that your working with. The only thing to make sure of if you’re confused about what ‘this’ is put it in a <code>console.log()</code> so <code>console.log(this);</code>.</p>',frontmatter:{title:"Javascript's keyword this; THIS is what I'm talking about!",date:"January 10, 2015"}}},pathContext:{path:"/js-keyword-this/"}}}});
//# sourceMappingURL=path---js-keyword-this-bf83567051918e891a87.js.map