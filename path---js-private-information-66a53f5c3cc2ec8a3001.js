webpackJsonp([0xac8aed34f4ac3000],{"./node_modules/json-loader/index.js!./.cache/json/js-private-information.json":function(n,s){n.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2015-01-22-js-private-variables.md absPath of file >>> MarkdownRemark",html:'<p>Creating private information, meaning variables, properties/property values, function, methods in JavaScript is an important concept for storing information that can’t be overwritten.</p>\n<h2>What does <em>private</em> mean?</h2>\n<p><a href="//javascript.crockford.com/private.html">Private</a> means that only the current function (<em>class</em>) will have access to the variables (<em>properties/ property values</em>), functions (<em>methods</em>) within it. This is very important to make sure that your code is not overwritten.</p>\n<h2><em>Public</em> vs <em>Private</em></h2>\n<ul>\n<li>Public variables or functions can be added to, modified, or deleted.</li>\n<li>Private variables or functions can’t be changed.</li>\n</ul>\n<h2>A recent code challenge</h2>\n<p>This concept is still pretty new to me so my boss gave me the task of writting some functions that would iterate on a number so that:</p>\n<ul>\n<li>there would be 3 functions that would be aware of each other &#x26; each function would add 1.</li>\n<li>there would then be a global variable that would be declared that would call 1 of the functions</li>\n<li>then there would be another parent function that would call the 2nd original function</li>\n<li>within that parent function there would be another child function that would call the 3rd function &#x26; log the value for the 3 orginal functions</li>\n<li>within that parent function, after the child function - the child function would be called twice.</li>\n<li>after then closing of the parent function, the parent function would be called three times</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> aHero <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> num<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> aDeed <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> num<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> aFoil <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> num<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> log <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'#logArea\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'&lt;div>\'</span> <span class="token operator">+</span> text <span class="token operator">+</span> <span class="token string">\'&lt;/div>\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> hero <span class="token operator">=</span> <span class="token function">aHero</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> newSaga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> foil <span class="token operator">=</span> <span class="token function">aFoil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> saga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> deed <span class="token operator">=</span> <span class="token function">aDeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">log</span><span class="token punctuation">(</span>hero <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> deed <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> foil<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p><strong>Which renders the result of:</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token number">1</span> <span class="token number">3</span> <span class="token number">2</span>\n<span class="token number">1</span> <span class="token number">4</span> <span class="token number">2</span>\n<span class="token number">1</span> <span class="token number">6</span> <span class="token number">5</span>\n<span class="token number">1</span> <span class="token number">7</span> <span class="token number">5</span>\n</code></pre>\n      </div>\n<p>After a little understand of the concept for the above task, I was able to render the result fairly easily. Then my boss threw in what he called a wrinkle. He put in a check that sets <code>num</code> to be the letter <code>a</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> theNumber <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> aHero <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> theNumber<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> aDeed <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> theNumber<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> aFoil <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> theNumber<span class="token operator">++</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> log <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'#logArea\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'&lt;div>\'</span> <span class="token operator">+</span> text <span class="token operator">+</span> <span class="token string">\'&lt;/div>\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> hero <span class="token operator">=</span> <span class="token function">aHero</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> newSaga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> foil <span class="token operator">=</span> <span class="token function">aFoil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> saga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  \t<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token keyword">typeof</span> num <span class="token operator">!==</span> <span class="token string">\'undefined\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      num <span class="token operator">=</span> <span class="token string">\'a\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">var</span> deed <span class="token operator">=</span> <span class="token function">aDeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">log</span><span class="token punctuation">(</span>hero <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> deed <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> foil<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p><strong>The code abe renders this result:</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token number">NaN</span> <span class="token number">NaN</span> <span class="token number">NaN</span>\n<span class="token number">NaN</span> <span class="token number">NaN</span> <span class="token number">NaN</span>\n<span class="token number">NaN</span> <span class="token number">NaN</span> <span class="token number">NaN</span>\n<span class="token number">NaN</span> <span class="token number">NaN</span> <span class="token number">NaN</span>\n<span class="token number">NaN</span> <span class="token number">NaN</span> <span class="token number">NaN</span>\n</code></pre>\n      </div>\n<p>My boss then asked me to, without changing anything inside of the parent, <code>NewSaga()</code> function, render the original result which was honestly very challenging for me.</p>\n<p>This is what I came up with with some help.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> incrementProvider <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> addTheNumber <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> result <span class="token operator">=</span> num<span class="token punctuation">;</span>\n    num <span class="token operator">=</span> num <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> addTheNumber<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> theNumber <span class="token operator">=</span> <span class="token function">incrementProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> aHero <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">theNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> aDeed <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">theNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> aFoil <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">theNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> log <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'#logArea\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'&lt;div>\'</span> <span class="token operator">+</span> text <span class="token operator">+</span> <span class="token string">\'&lt;/div>\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> hero <span class="token operator">=</span> <span class="token function">aHero</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> newSaga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> foil <span class="token operator">=</span> <span class="token function">aFoil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> saga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token keyword">typeof</span> num <span class="token operator">!==</span> <span class="token string">\'undefined\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      num <span class="token operator">=</span> <span class="token string">\'a\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">var</span> deed <span class="token operator">=</span> <span class="token function">aDeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">log</span><span class="token punctuation">(</span>hero <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> deed <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> foil<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Live <a href="//codepen.io/yowainwright/pen/14c4a193a20462b0b7c23a8b3128bc2d">code</a></p>\n<p><strong>And this is what my boss came up with:</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> GeneratorClass <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> inside <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> numberGenerator <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>inside<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>numberGenerator<span class="token punctuation">:</span> numberGenerator<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> generator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GeneratorClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> aHero <span class="token operator">=</span> generator<span class="token punctuation">.</span>numberGenerator<span class="token punctuation">;</span>\n<span class="token keyword">var</span> aDeed <span class="token operator">=</span> generator<span class="token punctuation">.</span>numberGenerator<span class="token punctuation">;</span>\n<span class="token keyword">var</span> aFoil <span class="token operator">=</span> generator<span class="token punctuation">.</span>numberGenerator<span class="token punctuation">;</span>\n\n<span class="token comment" spellcheck="true">//var aHero = (new GeneratorClass()).numberGenerator;</span>\n<span class="token comment" spellcheck="true">//var aDeed = (new GeneratorClass()).numberGenerator;</span>\n<span class="token comment" spellcheck="true">//var aFoil = (new GeneratorClass()).numberGenerator;</span>\n\n<span class="token keyword">var</span> log <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'#logArea\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'&lt;div>\'</span> <span class="token operator">+</span> text <span class="token operator">+</span> <span class="token string">\'&lt;/div>\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> hero <span class="token operator">=</span> <span class="token function">aHero</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> newSaga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> foil <span class="token operator">=</span> <span class="token function">aFoil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> saga <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token keyword">typeof</span> num <span class="token operator">!==</span> <span class="token string">\'undefined\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      num <span class="token operator">=</span> <span class="token string">\'a\'</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">var</span> deed <span class="token operator">=</span> <span class="token function">aDeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">log</span><span class="token punctuation">(</span>hero <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> deed <span class="token operator">+</span> <span class="token string">\' \'</span> <span class="token operator">+</span> foil<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">saga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">newSaga</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Live <a href="http://codepen.io/scottlaplante/pen/RryKEe">code</a></p>\n<p>Both examples render the same result but my boss’s code is much cleaner I think.</p>\n<p>This project was given to me after doing Udacity’s <a href="//www.udacity.com/course/object-oriented-javascript--ud015">OOP JavaScript class</a>. It’s been interesting after reviewing the class with my boss how much I thought I understood versus how much I actually do in practice.</p>\n<p>Welp, back to coding …</p>',frontmatter:{featured_image:null,meta:"Creating a private information in JavaScript to be used in future functions",title:"Creating private information in JavaScript",date:"January 22, 2015"}}},pathContext:{path:"/js-private-information/"}}}});
//# sourceMappingURL=path---js-private-information-66a53f5c3cc2ec8a3001.js.map