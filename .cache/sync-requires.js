// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---cache-dev-404-page-js": preferDefault(require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/dev-404-page.js")),
  "page-component---src-templates-blog-post-js": preferDefault(require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/templates/blog-post.js")),
  "page-component---src-pages-index-js": preferDefault(require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/pages/index.js"))
}

exports.json = {
  "dev-404-page.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/dev-404-page.json"),
  "youre-an-ortiz.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/youre-an-ortiz.json"),
  "js-scope.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/js-scope.json"),
  "art-lived.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/art-lived.json"),
  "happy-birthday.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/happy-birthday.json"),
  "glide-carousel.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/glide-carousel.json"),
  "js-closure.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/js-closure.json"),
  "css-less-known-selectors.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/css-less-known-selectors.json"),
  "js-argument-key-word.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/js-argument-key-word.json"),
  "index.json": require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/.cache/json/index.json")
}

exports.layouts = {
  "index": preferDefault(require("/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/src/layouts/index"))
}