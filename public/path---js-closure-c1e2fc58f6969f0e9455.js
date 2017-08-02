webpackJsonp([43],{"./node_modules/json-loader/index.js!./.cache/json/js-closure.json":function(e,n){e.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2014-10-15-js-closure.md absPath of file >>> MarkdownRemark",html:"<p>Javascript Closures are bundles of code or inner functions that have access to outer functions &#x26; variables. IT IS THAT SIMPLE! But, understanding why they’re so important quickly become pretty complex.</p>\n<h2>JavaScript Closure by Example</h2>\n<p>The first thing that comes to mind when I try to think of an example to explain Javascript Closures is the process of microwaving. When we put something, food preferably, in a microwave, we're expecting something tasty to come out after a few minutes. Well, maybe not tasty but definitely different.</p>\n<p>We can think of a Javascript Closure like a microwave. There's an outer function, a chunk of re-usable code, which is represented by a microwave &#x26; an inner function which we could think of as the 'thingy' that cooks the food. </p>\n<p>We don't want whatever is cooking that food, to cook us, so we put the food in the microwave (outer function) &#x26; then the actual 'thingy' that cooks the food (inner function). That encapsulated process that cooks the food is what &#x26; why we use a function.</p>\n<p>Closures are important because:</p>\n<ul>\n<li>They can create private variables</li>\n<li>They have access to functions &#x26; variables of a higher scope</li>\n<li>They’re useful with time interval functions</li>\n</ul>\n<h2>Gettin' more serious about Closures</h2>\n<p>Javascript Closure is created when an inner function is made accessible from outside of it’s parent function. This is commonly done by returning the inner function. So like when you put food into the microwave &#x26; then get it out.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-javascript\">// What are Closures?\nvar closureFunction = 'Closer are functions ';\nvar rememberWhat = 'that remember ';\nvar theirEnvironment = 'the environment there were created in. ';\n\nvar aVar = closureFunction;\nvar bVar = rememberWhat;\nvar cVar = theirEnvironment;\n\n// let's make some sentences tat describe closure\nvar varA = aVar;\nvar anArray = [];\nvar outerFunction = function() {\n  var varB = bVar;\n  anArray.push( function() {\n    var varC = cVar;\n   document.write(varA + varB + varC);\n  });\n};\nouterFunction();\nanArray[0]();\n\nvar varA = 'Private variables ';\nvar bVar = 'can be accessed ';\nvar cVar = 'with closure. ';\nouterFunction();\n//anArray[0](); //Uncomment &#x26; look at the sentence (not good - that is not correct)\nanArray[1]();\n</code></pre>\n<p>View the <a href=\"//codepen.io/yowainwright/pen/d9926371f494ac0809bb8805d73575d8\">live code</a> sample.</p>\n<p><strong>&#x26; another super basic dive into Javascript closure:</strong></p>\n<pre><code class=\"language-javascript\">var myFunc = function() {\n  var myOtherFunc = function() {\n    document.write('This is a closure');\n  }\n  return myOtherFunc();\n};\nmyFunc();\n</code></pre>\n<p><a href=\"//codepen.io/yowainwright/pen/19d990da9c7cf57945e588461b0bb1f7\">Click here</a> to view the live code sample.</p>\n<pre><code class=\"language-javascript\">var myFunc = function() {\n  var myOtherFunc = function() {\n    document.write('This is a closure. ');\n  }\n  return myOtherFunc();\n};\n\nvar i = 0;\nsetInterval(function() {\n  i += 1;\n  if (i &#x3C; 5) {\n    myFunc();\n  }\n}, 1000);\n</code></pre>\n<p>You can view &#x26; play with the code about by going to the <a href=\"//codepen.io/yowainwright/pen/6d2d1f7e8ae56ea51f5082e1058421e3\">link here</a>.</p>",frontmatter:{title:"Javascript Closure all wrapped up & why",date:"October 15, 2014"}}},pathContext:{path:"/js-closure/"}}}});
//# sourceMappingURL=path---js-closure-c1e2fc58f6969f0e9455.js.map