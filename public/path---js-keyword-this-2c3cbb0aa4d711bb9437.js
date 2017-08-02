webpackJsonp([42],{"./node_modules/json-loader/index.js!./.cache/json/js-keyword-this.json":function(e,t){e.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2015-01-10-js-keyword-this.md absPath of file >>> MarkdownRemark",html:'<p>The <em><strong>this</strong></em> keyword in Javascript is something that has often confused me, especial which object it is attached to. I\'ve realized trying to explain it a few times that it\'s difficult to explain.</p>\n<p>The <em>this</em> keyword is a parameter that gets bound to an object. That parameter this is determined by how a function of method is called. It behaves almost exactly like a normal parameter.</p>\n<p>Here’s a list of what the keyword this is <strong>not</strong> bound to:</p>\n<ul>\n<li>the object created literal</li>\n<li>the function object it appears in</li>\n<li>a new function it appears in</li>\n<li>a object that has a function of the property</li>\n<li>the objects execution context</li>\n</ul>\n<p>Key’s to figuring out what the key work This will be bound to</p>\n<ul>\n<li>This gets bound to the object left of the dot (period, ‘.’)</li>\n<li>If the keyword new is used to create a new object This gets bound to that new object</li>\n<li>If there is not dot &#x26; no keyword this will get bound to the global object</li>\n<li>When using the .call() method another argument is passed in &#x26; This takes that value</li>\n</ul>\n<p>The 4 ways this is initiated:</p>\n<ul>\n<li>In a function.</li>\n</ul>\n<pre><code class="language-javascript">function funcName() {};\n</code></pre>\n<ul>\n<li>In a method</li>\n</ul>\n<pre><code class="language-javascript">var obj = {\n     funcName : function() {}\n}\n</code></pre>\n<ul>\n<li>As a constructor</li>\n</ul>\n<pre><code class="language-javascript">function myFunc(name) {\n  this.name = name;\n};\nvar newMyFunc = new myFunc(‘Jeff\');\ndocument.write(newMyFunc.name);\n</code></pre>\n<ul>\n<li>Using <strong>.call();</strong> or <strong>.apply();</strong> methods</li>\n</ul>\n<pre><code class="language-javascript">function juggle() {\n  var result = 0;\n  for (var n = 0; n &#x3C; arguments.length; n++) {\n   result += arguments[n];\n  }\n  this.result = result;\n};\n\nvar ninja1 = {};\nvar ninja2 = {};\n\njuggle.apply(ninja1, [1, 2, 3, 4]);\njuggle.call(ninja2, 5, 6, 7, 8);\n</code></pre>\n<p><strong>example:</strong></p>\n<pre><code class="language-javascript">var fn = function(one, two) {\n    log(one, two);\n};\n\nvar r = {},\n    g = {},\n    b = {};\n\nr.method = fn; // This gets bound to r\nr.method(g, b); // This gets bound to r\nfn(g, b); // This gets bound to the global object\nfn.call(r, g, b); // This gets bound to r\n</code></pre>\n<p>After looking at the <em>this</em> key word in a bunch of ways, the best way to describe the <em>this</em> parameter is to say that it is a powerful tool to reference the object that your working with. The only thing to make sure of if you\'re confused about what \'this\' is put it in a <code>console.log()</code> so <code>console.log(this);</code>.</p>',frontmatter:{title:"Javascript's keyword this; THIS is what I'm talking about!",date:"January 10, 2015"}}},pathContext:{path:"/js-keyword-this/"}}}});
//# sourceMappingURL=path---js-keyword-this-2c3cbb0aa4d711bb9437.js.map