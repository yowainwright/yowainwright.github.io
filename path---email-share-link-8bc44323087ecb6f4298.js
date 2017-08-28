webpackJsonp([0x6a544ca96aa06c00],{"./node_modules/json-loader/index.js!./.cache/json/email-share-link.json":function(a,n){a.exports={data:{site:{siteMetadata:{title:"Jeffry.in",author:"Jeff Wainwright"}},markdownRemark:{id:"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/2016-12-07-email-share-link.md absPath of file >>> MarkdownRemark",html:'<p>After an Apple Phone IOS update, there was an issue with email links on several content websites when customers would click the <strong>email share link</strong>. When clicking on the email share, customers were being shown an alert box. </p>\n<p>On desktop devices, there was no issue. </p>\n<p>After going through various debugging techniques, I noticed 2 things that may help other developers out:</p>\n<ul>\n<li>Make sure that there is no target attribute on the email share link. This is what initiates alerts on mobile devices.</li>\n<li>When debugging errors with email share links on Device Simulators, remember that similators like the IOS Simulator don’t have email clients installed initially.</li>\n</ul>\n<p>Here’s a code sample of something that works:</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>mailto:?subject<span class="token punctuation">=</span>{{articleTitle}}&amp;amp;body<span class="token punctuation">=</span>{{articleLink}}<span class="token punctuation">"</span></span> <span class="token attr-name">data-track-share</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Email<span class="token punctuation">"</span></span> <span class="token attr-name">data-track-slug</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{{articleLink}}<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>share__link share__link--mail js-share-mail js-share-event<span class="token punctuation">"</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Email<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Share<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>',frontmatter:{featured_image:null,meta:"Email share links are often disregarded as simple but there are a few challenges to be aware of",title:"Debugging email share links",date:"December 07, 2016"}}},pathContext:{path:"/email-share-link/"}}}});
//# sourceMappingURL=path---email-share-link-8bc44323087ecb6f4298.js.map