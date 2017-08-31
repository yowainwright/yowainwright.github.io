webpackJsonp([15178676390636814000],{

/***/ "./.cache/api-runner-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.apiRunner = apiRunner;
	exports.apiRunnerAsync = apiRunnerAsync;
	var plugins = [{
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-google-analytics/gatsby-browser.js"),
	  options: { "plugins": [], "trackingId": "GTM-NRFFQ9" }
	}, {
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-offline/gatsby-browser.js"),
	  options: { "plugins": [] }
	}];
	// During bootstrap, we write requires at top of this file which looks
	// basically like:
	// var plugins = [
	//   require('/path/to/plugin1/gatsby-browser.js'),
	//   require('/path/to/plugin2/gatsby-browser.js'),
	// ]
	
	function apiRunner(api, args, defaultReturn) {
	  var results = plugins.map(function (plugin) {
	    if (plugin.plugin[api]) {
	      var result = plugin.plugin[api](args, plugin.options);
	      return result;
	    }
	  });
	
	  // Filter out undefined results.
	  results = results.filter(function (result) {
	    return typeof result !== "undefined";
	  });
	
	  if (results.length > 0) {
	    return results;
	  } else if (defaultReturn) {
	    return [defaultReturn];
	  } else {
	    return [];
	  }
	}
	
	function apiRunnerAsync(api, args, defaultReturn) {
	  return plugins.reduce(function (previous, next) {
	    return next.plugin[api] ? previous.then(function () {
	      return next.plugin[api](args, next.options);
	    }) : previous;
	  }, Promise.resolve());
	}

/***/ }),

/***/ "./.cache/async-requires.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _exports$json;
	
	// prefer default export if available
	var preferDefault = function preferDefault(m) {
	  return m && m.default || m;
	};
	
	exports.components = {
	  "component---node-modules-gatsby-plugin-offline-app-shell-js": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---node-modules-gatsby-plugin-offline-app-shell-js!./node_modules/gatsby-plugin-offline/app-shell.js"),
	  "component---src-templates-blog-post-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-blog-post-jsx!./src/templates/blog-post.jsx"),
	  "component---src-pages-archive-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-archive-jsx!./src/pages/archive.jsx"),
	  "component---src-pages-index-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-index-jsx!./src/pages/index.jsx")
	};
	
	exports.json = (_exports$json = {
	  "layout-index.json": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"),
	  "offline-plugin-app-shell-fallback.json": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---offline-plugin-app-shell-fallback!./.cache/json/offline-plugin-app-shell-fallback.json")
	}, _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["youre-an-ortiz.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---youre-an-ortiz!./.cache/json/youre-an-ortiz.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["art-lived.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---art-lived!./.cache/json/art-lived.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["js-scope.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-scope!./.cache/json/js-scope.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["glide-carousel.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---glide-carousel!./.cache/json/glide-carousel.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["happy-birthday.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---happy-birthday!./.cache/json/happy-birthday.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["js-closure.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-closure!./.cache/json/js-closure.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["js-argument-key-word.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-argument-key-word!./.cache/json/js-argument-key-word.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["css-less-known-selectors.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---css-less-known-selectors!./.cache/json/css-less-known-selectors.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["js-keyword-this.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-keyword-this!./.cache/json/js-keyword-this.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["js-private-information.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-private-information!./.cache/json/js-private-information.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["kramdown-syntax-cheatsheet.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---kramdown-syntax-cheatsheet!./.cache/json/kramdown-syntax-cheatsheet.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["js-objects.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-objects!./.cache/json/js-objects.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["known-updates-with-el-capitan-os.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---known-updates-with-el-capitan-os!./.cache/json/known-updates-with-el-capitan-os.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["making-a-js-plugin.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---making-a-js-plugin!./.cache/json/making-a-js-plugin.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["glendora-mountain-road.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---glendora-mountain-road!./.cache/json/glendora-mountain-road.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["things-change-william-kentridge.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---things-change-william-kentridge!./.cache/json/things-change-william-kentridge.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["node-meetup-debugging-with-yunong-xiao.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---node-meetup-debugging-with-yunong-xiao!./.cache/json/node-meetup-debugging-with-yunong-xiao.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["punch-setup.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---punch-setup!./.cache/json/punch-setup.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["making-echo-app.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---making-echo-app!./.cache/json/making-echo-app.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["creating-aliases.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---creating-aliases!./.cache/json/creating-aliases.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["white-rock-lake.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---white-rock-lake!./.cache/json/white-rock-lake.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["css-pretty-widths-with-calc.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---css-pretty-widths-with-calc!./.cache/json/css-pretty-widths-with-calc.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["reframing-content.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---reframing-content!./.cache/json/reframing-content.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["html-is-easy.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---html-is-easy!./.cache/json/html-is-easy.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["email-share-link.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---email-share-link!./.cache/json/email-share-link.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["arrow-functions.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---arrow-functions!./.cache/json/arrow-functions.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["device-sticky-bits-on-scroll.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---device-sticky-bits-on-scroll!./.cache/json/device-sticky-bits-on-scroll.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-2-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-2-17!./.cache/json/week-2-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-1-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-1-17!./.cache/json/week-1-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["4-categories-js-projects.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---4-categories-js-projects!./.cache/json/4-categories-js-projects.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["switching-back-to-sublime.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---switching-back-to-sublime!./.cache/json/switching-back-to-sublime.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-4-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-4-17!./.cache/json/week-4-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-5-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-5-17!./.cache/json/week-5-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-3-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-3-17!./.cache/json/week-3-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-6-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-6-17!./.cache/json/week-6-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-7-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-7-17!./.cache/json/week-7-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["losing-a-friend.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---losing-a-friend!./.cache/json/losing-a-friend.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-8-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-8-17!./.cache/json/week-8-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["arrow-functions-cont.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---arrow-functions-cont!./.cache/json/arrow-functions-cont.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["formula-for-commits.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---formula-for-commits!./.cache/json/formula-for-commits.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-9-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-9-17!./.cache/json/week-9-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["git-tag-update.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---git-tag-update!./.cache/json/git-tag-update.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-11-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-11-17!./.cache/json/week-11-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-10-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-10-17!./.cache/json/week-10-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["destructing-function-opts.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---destructing-function-opts!./.cache/json/destructing-function-opts.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-12-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-12-17!./.cache/json/week-12-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-13-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-13-17!./.cache/json/week-13-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-14-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-14-17!./.cache/json/week-14-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-15-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-15-17!./.cache/json/week-15-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-16-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-16-17!./.cache/json/week-16-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-18-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-18-17!./.cache/json/week-18-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-19-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-19-17!./.cache/json/week-19-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-20-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-20-17!./.cache/json/week-20-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["week-17-17.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-17-17!./.cache/json/week-17-17.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["turning-37.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---turning-37!./.cache/json/turning-37.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["surfing-face.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---surfing-face!./.cache/json/surfing-face.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["about.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---about!./.cache/json/about.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["archive.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---archive!./.cache/json/archive.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---index!./.cache/json/index.json"), _exports$json);
	
	exports.layouts = {
	  "component---src-layouts-index-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-layouts-index-jsx!./.cache/layouts/index.js")
	};

/***/ }),

/***/ "./.cache/component-renderer.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _loader = __webpack_require__("./.cache/loader.js");
	
	var _loader2 = _interopRequireDefault(_loader);
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DefaultLayout = function DefaultLayout(_ref) {
	  var children = _ref.children;
	  return _react2.default.createElement(
	    "div",
	    null,
	    children()
	  );
	};
	
	// Pass pathname in as prop.
	// component will try fetching resources. If they exist,
	// will just render, else will render null.
	
	var ComponentRenderer = function (_React$Component) {
	  _inherits(ComponentRenderer, _React$Component);
	
	  function ComponentRenderer(props) {
	    _classCallCheck(this, ComponentRenderer);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this));
	
	    _this.state = {
	      location: props.location,
	      pageResources: _loader2.default.getResourcesForPathname(props.location.pathname)
	    };
	    return _this;
	  }
	
	  ComponentRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    if (this.state.location.pathname !== nextProps.location.pathname) {
	      var pageResources = _loader2.default.getResourcesForPathname(nextProps.location.pathname);
	      if (!pageResources) {
	        // Page resources won't be set in cases where the browser back button
	        // or forward button is pushed as we can't wait as normal for resources
	        // to load before changing the page.
	        _loader2.default.getResourcesForPathname(nextProps.location.pathname, function (pageResources) {
	          _this2.setState({
	            location: nextProps.location,
	            pageResources: pageResources
	          });
	        });
	      } else {
	        this.setState({
	          location: nextProps.location,
	          pageResources: pageResources
	        });
	      }
	    }
	  };
	
	  ComponentRenderer.prototype.componentDidMount = function componentDidMount() {
	    var _this3 = this;
	
	    // Listen to events so when our page gets updated, we can transition.
	    // This is only useful on delayed transitions as the page will get rendered
	    // without the necessary page resources and then re-render once those come in.
	    _emitter2.default.on("onPostLoadPageResources", function (e) {
	      if (e.page.path === _loader2.default.getPage(_this3.state.location.pathname).path) {
	        _this3.setState({ pageResources: e.pageResources });
	      }
	    });
	  };
	
	  ComponentRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    // Check if the component or json have changed.
	    if (!this.state.pageResources || nextState.pageResources) {
	      return true;
	    }
	    if (this.state.pageResources.component !== nextState.pageResources.component) {
	      return true;
	    }
	    if (this.state.pageResources.json !== nextState.pageResources.json) {
	      return true;
	    }
	    // Check if location has changed on a page using internal routing
	    // via matchPath configuration.
	    if (this.state.location.key !== nextState.location.key && nextState.pageResources.page && nextState.pageResources.page.matchPath) {
	      return true;
	    }
	    return false;
	  };
	
	  ComponentRenderer.prototype.render = function render() {
	    if (this.props.page) {
	      if (this.state.pageResources) {
	        return (0, _react.createElement)(this.state.pageResources.component, _extends({
	          key: this.props.location.pathname
	        }, this.props, this.state.pageResources.json));
	      } else {
	        return null;
	      }
	    } else if (this.props.layout) {
	      return (0, _react.createElement)(this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : DefaultLayout, _extends({
	        key: this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : "DefaultLayout"
	      }, this.props));
	    } else {
	      return null;
	    }
	  };
	
	  return ComponentRenderer;
	}(_react2.default.Component);
	
	ComponentRenderer.propTypes = {
	  page: _propTypes2.default.bool,
	  layout: _propTypes2.default.bool,
	  location: _propTypes2.default.object
	};
	
	exports.default = ComponentRenderer;
	module.exports = exports["default"];

/***/ }),

/***/ "./.cache/emitter.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _mitt = __webpack_require__("./node_modules/mitt/dist/mitt.js");
	
	var _mitt2 = _interopRequireDefault(_mitt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emitter = (0, _mitt2.default)();
	module.exports = emitter;

/***/ }),

/***/ "./.cache/find-page.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/index.js");
	
	var pageCache = {}; // TODO add tests especially for handling prefixed links.
	
	
	module.exports = function (pages) {
	  var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	  return function (pathname) {
	    // Remove the pathPrefix from the pathname.
	    var trimmedPathname = pathname.slice(pathPrefix.length);
	
	    // Remove any hashfragment
	    if (trimmedPathname.split("#").length > 1) {
	      trimmedPathname = trimmedPathname.split("#").slice(0, -1).join("");
	    }
	
	    if (pageCache[trimmedPathname]) {
	      return pageCache[trimmedPathname];
	    }
	
	    var foundPage = void 0;
	    // Array.prototype.find is not supported in IE so we use this somewhat odd
	    // work around.
	    pages.some(function (page) {
	      if (page.matchPath) {
	        // Try both the path and matchPath
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, { path: page.path }) || (0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.matchPath
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	      } else {
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.path,
	          exact: true
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	      }
	
	      return false;
	    });
	
	    return foundPage;
	  };
	};

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---4-categories-js-projects!./.cache/json/4-categories-js-projects.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(12135956978728096000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/4-categories-js-projects.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---about!./.cache/json/about.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(17953591736895156000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/about.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---archive!./.cache/json/archive.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(15205666288078348000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/archive.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---arrow-functions-cont!./.cache/json/arrow-functions-cont.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(14790994158758275000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/arrow-functions-cont.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---arrow-functions!./.cache/json/arrow-functions.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(15678511233021016000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/arrow-functions.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---art-lived!./.cache/json/art-lived.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8524623025417343000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/art-lived.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---creating-aliases!./.cache/json/creating-aliases.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(17914784594496141000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/creating-aliases.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---css-less-known-selectors!./.cache/json/css-less-known-selectors.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(11772493511283614000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/css-less-known-selectors.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---css-pretty-widths-with-calc!./.cache/json/css-pretty-widths-with-calc.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(3729258439147086000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/css-pretty-widths-with-calc.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---destructing-function-opts!./.cache/json/destructing-function-opts.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(3424463463079848000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/destructing-function-opts.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---device-sticky-bits-on-scroll!./.cache/json/device-sticky-bits-on-scroll.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8708455045571228000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/device-sticky-bits-on-scroll.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---email-share-link!./.cache/json/email-share-link.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(7661833156586139000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/email-share-link.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---formula-for-commits!./.cache/json/formula-for-commits.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(12492631637980130000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/formula-for-commits.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---git-tag-update!./.cache/json/git-tag-update.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(11791099324639370000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/git-tag-update.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---glendora-mountain-road!./.cache/json/glendora-mountain-road.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(9740408070150545000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/glendora-mountain-road.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---glide-carousel!./.cache/json/glide-carousel.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(17588806988400654000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/glide-carousel.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---happy-birthday!./.cache/json/happy-birthday.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(6816374263968824000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/happy-birthday.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---html-is-easy!./.cache/json/html-is-easy.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(777916637660672400, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/html-is-easy.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---index!./.cache/json/index.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(9347362237655822000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/index.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-argument-key-word!./.cache/json/js-argument-key-word.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(16010242896440087000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/js-argument-key-word.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-closure!./.cache/json/js-closure.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(9180032664351171000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/js-closure.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-keyword-this!./.cache/json/js-keyword-this.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(5279761347396318000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/js-keyword-this.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-objects!./.cache/json/js-objects.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(10024868110885425000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/js-objects.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-private-information!./.cache/json/js-private-information.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(12433010533008683000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/js-private-information.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---js-scope!./.cache/json/js-scope.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8653006248160733000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/js-scope.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---known-updates-with-el-capitan-os!./.cache/json/known-updates-with-el-capitan-os.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(11248857800790467000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/known-updates-with-el-capitan-os.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---kramdown-syntax-cheatsheet!./.cache/json/kramdown-syntax-cheatsheet.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(15442998642197942000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/kramdown-syntax-cheatsheet.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(3954140758598355500, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/layout-index.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---losing-a-friend!./.cache/json/losing-a-friend.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(506693633033748160, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/losing-a-friend.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---making-a-js-plugin!./.cache/json/making-a-js-plugin.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(5185691062635674000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/making-a-js-plugin.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---making-echo-app!./.cache/json/making-echo-app.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(16845890361850366000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/making-echo-app.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---node-meetup-debugging-with-yunong-xiao!./.cache/json/node-meetup-debugging-with-yunong-xiao.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(18152320302545897000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/node-meetup-debugging-with-yunong-xiao.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---offline-plugin-app-shell-fallback!./.cache/json/offline-plugin-app-shell-fallback.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13784418321228782000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/offline-plugin-app-shell-fallback.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---punch-setup!./.cache/json/punch-setup.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(16519237209683171000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/punch-setup.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---reframing-content!./.cache/json/reframing-content.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(15419573053262825000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/reframing-content.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---surfing-face!./.cache/json/surfing-face.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(5586831787413586000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/surfing-face.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---switching-back-to-sublime!./.cache/json/switching-back-to-sublime.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8234626769067235000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/switching-back-to-sublime.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---things-change-william-kentridge!./.cache/json/things-change-william-kentridge.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13079692941103018000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/things-change-william-kentridge.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---turning-37!./.cache/json/turning-37.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(17238388838063395000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/turning-37.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-1-17!./.cache/json/week-1-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(2001531924450503000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-1-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-10-17!./.cache/json/week-10-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(15391130989482615000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-10-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-11-17!./.cache/json/week-11-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13272549485616507000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-11-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-12-17!./.cache/json/week-12-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13237181559389678000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-12-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-13-17!./.cache/json/week-13-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(831648166980929900, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-13-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-14-17!./.cache/json/week-14-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(2379170787621854700, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-14-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-15-17!./.cache/json/week-15-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8898974808720069000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-15-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-16-17!./.cache/json/week-16-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(12337820478143445000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-16-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-17-17!./.cache/json/week-17-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(3783124200147830000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-17-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-18-17!./.cache/json/week-18-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(9555449982332563000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-18-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-19-17!./.cache/json/week-19-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(2649141309346861600, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-19-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-2-17!./.cache/json/week-2-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(6693579779825403000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-2-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-20-17!./.cache/json/week-20-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(6331911882939216000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-20-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-3-17!./.cache/json/week-3-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(464384552572335740, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-3-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-4-17!./.cache/json/week-4-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(2893607716324995600, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-4-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-5-17!./.cache/json/week-5-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8112560942070410000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-5-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-6-17!./.cache/json/week-6-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(1345518941292047000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-6-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-7-17!./.cache/json/week-7-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(14724841435918780000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-7-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-8-17!./.cache/json/week-8-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(10242283536425760000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-8-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---week-9-17!./.cache/json/week-9-17.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(3041348058795219500, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/week-9-17.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---white-rock-lake!./.cache/json/white-rock-lake.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(1748257759073992700, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/white-rock-lake.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---youre-an-ortiz!./.cache/json/youre-an-ortiz.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(11004054716350083000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/youre-an-ortiz.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-layouts-index-jsx!./.cache/layouts/index.js":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(5217438866945042000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"presets\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-es2015/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-1/lib/index.js\",[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./.cache/layouts/index.js") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./.cache/loader.js":
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _findPage = __webpack_require__("./.cache/find-page.js");
	
	var _findPage2 = _interopRequireDefault(_findPage);
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findPage = void 0;
	
	var syncRequires = {};
	var asyncRequires = {};
	var pathScriptsCache = {};
	var resourceStrCache = {};
	var resourceCache = {};
	var pages = [];
	// Note we're not actively using the path data atm. There
	// could be future optimizations however around trying to ensure
	// we load all resources for likely-to-be-visited paths.
	var pathArray = [];
	var pathCount = {};
	var resourcesArray = [];
	var resourcesCount = {};
	var preferDefault = function preferDefault(m) {
	  return m && m.default || m;
	};
	var prefetcher = void 0;
	var inInitialRender = true;
	
	// Prefetcher logic
	if (true) {
	  prefetcher = __webpack_require__("./.cache/prefetcher.js")({
	    getNextQueuedResources: function getNextQueuedResources() {
	      return resourcesArray.slice(-1)[0];
	    },
	    createResourceDownload: function createResourceDownload(resourceName) {
	      fetchResource(resourceName, function () {
	        resourcesArray = resourcesArray.filter(function (r) {
	          return r !== resourceName;
	        });
	        prefetcher.onResourcedFinished(resourceName);
	      });
	    }
	  });
	  _emitter2.default.on("onPreLoadPageResources", function (e) {
	    prefetcher.onPreLoadPageResources(e);
	  });
	  _emitter2.default.on("onPostLoadPageResources", function (e) {
	    prefetcher.onPostLoadPageResources(e);
	  });
	}
	
	var sortResourcesByCount = function sortResourcesByCount(a, b) {
	  if (resourcesCount[a] > resourcesCount[b]) {
	    return 1;
	  } else if (resourcesCount[a] < resourcesCount[b]) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	
	var sortPagesByCount = function sortPagesByCount(a, b) {
	  if (pathCount[a] > pathCount[b]) {
	    return 1;
	  } else if (pathCount[a] < pathCount[b]) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	
	var fetchResource = function fetchResource(resourceName) {
	  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
	  if (resourceStrCache[resourceName]) {
	    process.nextTick(function () {
	      cb(null, resourceStrCache[resourceName]);
	    });
	  } else {
	    // Find resource
	    var resourceFunction = resourceName.slice(0, 12) === "component---" ? asyncRequires.components[resourceName] || asyncRequires.layouts[resourceName] : asyncRequires.json[resourceName];
	
	    // Download the resource
	    resourceFunction(function (err, executeChunk) {
	      resourceStrCache[resourceName] = executeChunk;
	      cb(err, executeChunk);
	    });
	  }
	};
	
	var getResourceModule = function getResourceModule(resourceName, cb) {
	  if (resourceCache[resourceName]) {
	    process.nextTick(function () {
	      cb(null, resourceCache[resourceName]);
	    });
	  } else {
	    fetchResource(resourceName, function (err, executeChunk) {
	      if (err) {
	        cb(err);
	      } else {
	        var _module = preferDefault(executeChunk());
	        resourceCache[resourceName] = _module;
	        cb(err, _module);
	      }
	    });
	  }
	};
	
	var mountOrder = 1;
	var queue = {
	  empty: function empty() {
	    pathArray = [];
	    pathCount = {};
	    resourcesCount = {};
	    resourcesArray = [];
	    pages = [];
	  },
	  addPagesArray: function addPagesArray(newPages) {
	    pages = newPages;
	    var pathPrefix = "";
	    if (false) {
	      pathPrefix = __PATH_PREFIX__;
	    }
	    findPage = (0, _findPage2.default)(newPages, pathPrefix);
	  },
	  addDevRequires: function addDevRequires(devRequires) {
	    syncRequires = devRequires;
	  },
	  addProdRequires: function addProdRequires(prodRequires) {
	    asyncRequires = prodRequires;
	  },
	  dequeue: function dequeue(path) {
	    return pathArray.pop();
	  },
	  enqueue: function enqueue(path) {
	    // Check page exists.
	    if (!pages.some(function (p) {
	      return p.path === path;
	    })) {
	      return false;
	    }
	
	    var mountOrderBoost = 1 / mountOrder;
	    mountOrder += 1;
	    // console.log(
	    // `enqueue "${path}", mountOrder: "${mountOrder}, mountOrderBoost: ${mountOrderBoost}`
	    // )
	
	    // Add to path counts.
	    if (!pathCount[path]) {
	      pathCount[path] = 1;
	    } else {
	      pathCount[path] += 1;
	    }
	
	    // Add path to queue.
	    if (!queue.has(path)) {
	      pathArray.unshift(path);
	    }
	
	    // Sort pages by pathCount
	    pathArray.sort(sortPagesByCount);
	
	    // Add resources to queue.
	    var page = findPage(path);
	    if (page.jsonName) {
	      if (!resourcesCount[page.jsonName]) {
	        resourcesCount[page.jsonName] = 1 + mountOrderBoost;
	      } else {
	        resourcesCount[page.jsonName] += 1 + mountOrderBoost;
	      }
	
	      // Before adding, checking that the JSON resource isn't either
	      // already queued or been downloading.
	      if (resourcesArray.indexOf(page.jsonName) === -1 && !resourceStrCache[page.jsonName]) {
	        resourcesArray.unshift(page.jsonName);
	      }
	    }
	    if (page.componentChunkName) {
	      if (!resourcesCount[page.componentChunkName]) {
	        resourcesCount[page.componentChunkName] = 1 + mountOrderBoost;
	      } else {
	        resourcesCount[page.componentChunkName] += 1 + mountOrderBoost;
	      }
	
	      // Before adding, checking that the component resource isn't either
	      // already queued or been downloading.
	      if (resourcesArray.indexOf(page.componentChunkName) === -1 && !resourceStrCache[page.jsonName]) {
	        resourcesArray.unshift(page.componentChunkName);
	      }
	    }
	
	    // Sort resources by resourcesCount.
	    resourcesArray.sort(sortResourcesByCount);
	    if (true) {
	      prefetcher.onNewResourcesAdded();
	    }
	
	    return true;
	  },
	  getResources: function getResources() {
	    return {
	      resourcesArray: resourcesArray,
	      resourcesCount: resourcesCount
	    };
	  },
	  getPages: function getPages() {
	    return {
	      pathArray: pathArray,
	      pathCount: pathCount
	    };
	  },
	  getPage: function getPage(pathname) {
	    return findPage(pathname);
	  },
	  has: function has(path) {
	    return pathArray.some(function (p) {
	      return p === path;
	    });
	  },
	  getResourcesForPathname: function getResourcesForPathname(path) {
	    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
	    if (inInitialRender && navigator && navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated") {
	      // If we're loading from a service worker (it's already activated on
	      // this initial render) and we can't find a page, there's a good chance
	      // we're on a new page that this (now old) service worker doesn't know
	      // about so we'll unregister it and reload.
	      if (!findPage(path)) {
	        navigator.serviceWorker.getRegistrations().then(function (registrations) {
	          for (var _iterator = registrations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }
	
	            var registration = _ref;
	
	            registration.unregister();
	          }
	          window.location.reload();
	        });
	      }
	    }
	    inInitialRender = false;
	    // In development we know the code is loaded already
	    // so we just return with it immediately.
	    if (false) {
	      var page = findPage(path);
	      if (!page) return;
	      var pageResources = {
	        component: syncRequires.components[page.componentChunkName],
	        json: syncRequires.json[page.jsonName],
	        layout: syncRequires.layouts[page.layoutComponentChunkName],
	        page: page
	      };
	      cb(pageResources);
	      return pageResources;
	      // Production code path
	    } else {
	      var _page = findPage(path);
	
	      if (!_page) {
	        console.log("A page wasn't found for \"" + path + "\"");
	        return;
	      }
	
	      // Use the path from the page so the pathScriptsCache uses
	      // the normalized path.
	      path = _page.path;
	
	      // Check if it's in the cache already.
	      if (pathScriptsCache[path]) {
	        process.nextTick(function () {
	          cb(pathScriptsCache[path]);
	          _emitter2.default.emit("onPostLoadPageResources", {
	            page: _page,
	            pageResources: pathScriptsCache[path]
	          });
	        });
	        return pathScriptsCache[path];
	      }
	
	      _emitter2.default.emit("onPreLoadPageResources", { path: path });
	      // Nope, we need to load resource(s)
	      var component = void 0;
	      var json = void 0;
	      var layout = void 0;
	      // Load the component/json/layout and parallel and call this
	      // function when they're done loading. When both are loaded,
	      // we move on.
	      var done = function done() {
	        if (component && json && (!_page.layoutComponentChunkName || layout)) {
	          pathScriptsCache[path] = { component: component, json: json, layout: layout };
	          var _pageResources = { component: component, json: json, layout: layout };
	          cb(_pageResources);
	          _emitter2.default.emit("onPostLoadPageResources", {
	            page: _page,
	            pageResources: _pageResources
	          });
	        }
	      };
	      getResourceModule(_page.componentChunkName, function (err, c) {
	        if (err) {
	          console.log("Loading the component for " + _page.path + " failed");
	        }
	        component = c;
	        done();
	      });
	      getResourceModule(_page.jsonName, function (err, j) {
	        if (err) {
	          console.log("Loading the JSON for " + _page.path + " failed");
	        }
	        json = j;
	        done();
	      });
	
	      _page.layoutComponentChunkName && getResourceModule(_page.layoutComponentChunkName, function (err, l) {
	        if (err) {
	          console.log("Loading the Layout for " + _page.path + " failed");
	        }
	        layout = l;
	        done();
	      });
	
	      return undefined;
	    }
	  },
	  peek: function peek(path) {
	    return pathArray.slice(-1)[0];
	  },
	  length: function length() {
	    return pathArray.length;
	  },
	  indexOf: function indexOf(path) {
	    return pathArray.length - pathArray.indexOf(path) - 1;
	  }
	};
	
	module.exports = queue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./.cache/pages.json":
/***/ (function(module, exports) {

	module.exports = [{"componentChunkName":"component---node-modules-gatsby-plugin-offline-app-shell-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"offline-plugin-app-shell-fallback.json","path":"/offline-plugin-app-shell-fallback/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"youre-an-ortiz.json","path":"/youre-an-ortiz/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"art-lived.json","path":"/art-lived/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"js-scope.json","path":"/js-scope/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"glide-carousel.json","path":"/glide-carousel/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"happy-birthday.json","path":"/happy-birthday/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"js-closure.json","path":"/js-closure/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"js-argument-key-word.json","path":"/js-argument-key-word/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"css-less-known-selectors.json","path":"/css-less-known-selectors/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"js-keyword-this.json","path":"/js-keyword-this/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"js-private-information.json","path":"/js-private-information/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"kramdown-syntax-cheatsheet.json","path":"/kramdown-syntax-cheatsheet/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"js-objects.json","path":"/js-objects/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"known-updates-with-el-capitan-os.json","path":"/known-updates-with-el-capitan-os/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"making-a-js-plugin.json","path":"/making-a-js-plugin/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"glendora-mountain-road.json","path":"/glendora-mountain-road/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"things-change-william-kentridge.json","path":"/things-change-william-kentridge/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"node-meetup-debugging-with-yunong-xiao.json","path":"/node-meetup-debugging-with-yunong-xiao/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"punch-setup.json","path":"/punch-setup/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"making-echo-app.json","path":"/making-echo-app/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"creating-aliases.json","path":"/creating-aliases/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"white-rock-lake.json","path":"/white-rock-lake/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"css-pretty-widths-with-calc.json","path":"/css-pretty-widths-with-calc/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"reframing-content.json","path":"/reframing-content/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"html-is-easy.json","path":"/html-is-easy/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"email-share-link.json","path":"/email-share-link/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"arrow-functions.json","path":"/arrow-functions/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"device-sticky-bits-on-scroll.json","path":"/device-sticky-bits-on-scroll/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-2-17.json","path":"/week-2-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-1-17.json","path":"/week-1-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"4-categories-js-projects.json","path":"/4-categories-js-projects/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"switching-back-to-sublime.json","path":"/switching-back-to-sublime/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-4-17.json","path":"/week-4-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-5-17.json","path":"/week-5-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-3-17.json","path":"/week-3-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-6-17.json","path":"/week-6-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-7-17.json","path":"/week-7-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"losing-a-friend.json","path":"/losing-a-friend/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-8-17.json","path":"/week-8-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"arrow-functions-cont.json","path":"/arrow-functions-cont/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"formula-for-commits.json","path":"/formula-for-commits/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-9-17.json","path":"/week-9-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"git-tag-update.json","path":"/git-tag-update/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-11-17.json","path":"/week-11-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-10-17.json","path":"/week-10-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"destructing-function-opts.json","path":"/destructing-function-opts/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-12-17.json","path":"/week-12-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-13-17.json","path":"/week-13-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-14-17.json","path":"/week-14-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-15-17.json","path":"/week-15-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-16-17.json","path":"/week-16-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-18-17.json","path":"/week-18-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-19-17.json","path":"/week-19-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-20-17.json","path":"/week-20-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"week-17-17.json","path":"/week-17-17/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"turning-37.json","path":"/turning-37/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"surfing-face.json","path":"/surfing-face/"},{"componentChunkName":"component---src-templates-blog-post-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"about.json","path":"/about"},{"componentChunkName":"component---src-pages-archive-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"archive.json","path":"/archive/"},{"componentChunkName":"component---src-pages-index-jsx","layout":"index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"index.json","path":"/"}]

/***/ }),

/***/ "./.cache/prefetcher.js":
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (_ref) {
	  var getNextQueuedResources = _ref.getNextQueuedResources,
	      createResourceDownload = _ref.createResourceDownload;
	
	  var pagesLoading = [];
	  var resourcesDownloading = [];
	
	  // Do things
	  var startResourceDownloading = function startResourceDownloading() {
	    var nextResource = getNextQueuedResources();
	    if (nextResource) {
	      resourcesDownloading.push(nextResource);
	      createResourceDownload(nextResource);
	    }
	  };
	
	  var reducer = function reducer(action) {
	    switch (action.type) {
	      case "RESOURCE_FINISHED":
	        resourcesDownloading = resourcesDownloading.filter(function (r) {
	          return r !== action.payload;
	        });
	        break;
	      case "ON_PRE_LOAD_PAGE_RESOURCES":
	        pagesLoading.push(action.payload.path);
	        break;
	      case "ON_POST_LOAD_PAGE_RESOURCES":
	        pagesLoading = pagesLoading.filter(function (p) {
	          return p !== action.payload.page.path;
	        });
	        break;
	      case "ON_NEW_RESOURCES_ADDED":
	        break;
	    }
	
	    // Take actions.
	    // Wait for event loop queue to finish.
	    setTimeout(function () {
	      if (resourcesDownloading.length === 0 && pagesLoading.length === 0) {
	        // Start another resource downloading.
	        startResourceDownloading();
	      }
	    }, 0);
	  };
	
	  return {
	    onResourcedFinished: function onResourcedFinished(event) {
	      // Tell prefetcher that the resource finished downloading
	      // so it can grab the next one.
	      reducer({ type: "RESOURCE_FINISHED", payload: event });
	    },
	    onPreLoadPageResources: function onPreLoadPageResources(event) {
	      // Tell prefetcher a page load has started so it should stop
	      // loading anything new
	      reducer({ type: "ON_PRE_LOAD_PAGE_RESOURCES", payload: event });
	    },
	    onPostLoadPageResources: function onPostLoadPageResources(event) {
	      // Tell prefetcher a page load has finished so it should start
	      // loading resources again.
	      reducer({ type: "ON_POST_LOAD_PAGE_RESOURCES", payload: event });
	    },
	    onNewResourcesAdded: function onNewResourcesAdded() {
	      // Tell prefetcher that more resources to be downloaded have
	      // been added.
	      reducer({ type: "ON_NEW_RESOURCES_ADDED" });
	    },
	    getState: function getState() {
	      return { pagesLoading: pagesLoading, resourcesDownloading: resourcesDownloading };
	    },
	    empty: function empty() {
	      pagesLoading = [];
	      resourcesDownloading = [];
	    }
	  };
	};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _apiRunnerBrowser = __webpack_require__("./.cache/api-runner-browser.js");
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/index.js");
	
	var _reactRouterScroll = __webpack_require__("./node_modules/react-router-scroll/lib/index.js");
	
	var _createBrowserHistory = __webpack_require__("./node_modules/history/createBrowserHistory.js");
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _domready = __webpack_require__("./node_modules/domready/ready.js");
	
	var _domready2 = _interopRequireDefault(_domready);
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _pages = __webpack_require__("./.cache/pages.json");
	
	var _pages2 = _interopRequireDefault(_pages);
	
	var _componentRenderer = __webpack_require__("./.cache/component-renderer.js");
	
	var _componentRenderer2 = _interopRequireDefault(_componentRenderer);
	
	var _asyncRequires = __webpack_require__("./.cache/async-requires.js");
	
	var _asyncRequires2 = _interopRequireDefault(_asyncRequires);
	
	var _loader = __webpack_require__("./.cache/loader.js");
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (true) {
	  __webpack_require__("./node_modules/core-js/modules/es6.promise.js");
	}
	
	window.___emitter = _emitter2.default;
	
	_loader2.default.addPagesArray(_pages2.default);
	_loader2.default.addProdRequires(_asyncRequires2.default);
	window.asyncRequires = _asyncRequires2.default;
	window.___loader = _loader2.default;
	window.matchPath = _reactRouterDom.matchPath;
	
	// Let the site/plugins run code very early.
	(0, _apiRunnerBrowser.apiRunnerAsync)("onClientEntry").then(function () {
	  // Let plugins register a service worker. The plugin just needs
	  // to return true.
	  if ((0, _apiRunnerBrowser.apiRunner)("registerServiceWorker").length > 0) {
	    __webpack_require__("./.cache/register-service-worker.js");
	  }
	
	  var navigateTo = function navigateTo(pathname) {
	    // If we're already at this path, do nothing.
	    if (window.location.pathname === pathname) {
	      return;
	    }
	
	    // Listen to loading events. If page resources load before
	    // a second, navigate immediately.
	    function eventHandler(e) {
	      if (e.page.path === _loader2.default.getPage(pathname).path) {
	        _emitter2.default.off("onPostLoadPageResources", eventHandler);
	        clearTimeout(timeoutId);
	        window.___history.push(pathname);
	      }
	    }
	
	    // Start a timer to wait for a second before transitioning and showing a
	    // loader in case resources aren't around yet.
	    var timeoutId = setTimeout(function () {
	      _emitter2.default.off("onPostLoadPageResources", eventHandler);
	      _emitter2.default.emit("onDelayedLoadPageResources", { pathname: pathname });
	      window.___history.push(pathname);
	    }, 1000);
	
	    if (_loader2.default.getResourcesForPathname(pathname)) {
	      // The resources are already loaded so off we go.
	      clearTimeout(timeoutId);
	      window.___history.push(pathname);
	    } else {
	      // They're not loaded yet so let's add a listener for when
	      // they finish loading.
	      _emitter2.default.on("onPostLoadPageResources", eventHandler);
	    }
	  };
	
	  // window.___loadScriptsForPath = loadScriptsForPath
	  window.___navigateTo = navigateTo;
	
	  var history = (0, _createBrowserHistory2.default)();
	
	  // Call onRouteUpdate on the initial page load.
	  (0, _apiRunnerBrowser.apiRunner)("onRouteUpdate", {
	    location: history.location,
	    action: history.action
	  });
	
	  function attachToHistory(history) {
	    if (!window.___history) {
	      window.___history = history;
	
	      history.listen(function (location, action) {
	        (0, _apiRunnerBrowser.apiRunner)("onRouteUpdate", { location: location, action: action });
	      });
	    }
	  }
	
	  function shouldUpdateScroll(prevRouterProps, _ref) {
	    var pathname = _ref.location.pathname;
	
	    var results = (0, _apiRunnerBrowser.apiRunner)("shouldUpdateScroll", {
	      prevRouterProps: prevRouterProps,
	      pathname: pathname
	    });
	    if (results.length > 0) {
	      return results[0];
	    }
	
	    if (prevRouterProps) {
	      var oldPathname = prevRouterProps.location.pathname;
	
	      if (oldPathname === pathname) {
	        return false;
	      }
	    }
	    return true;
	  }
	
	  var AltRouter = (0, _apiRunnerBrowser.apiRunner)("replaceRouterComponent", { history: history })[0];
	  var DefaultRouter = function DefaultRouter(_ref2) {
	    var children = _ref2.children;
	    return _react2.default.createElement(
	      _reactRouterDom.BrowserRouter,
	      { history: history },
	      children
	    );
	  };
	
	  _loader2.default.getResourcesForPathname(window.location.pathname, function () {
	    var Root = function Root() {
	      return (0, _react.createElement)(AltRouter ? AltRouter : DefaultRouter, null, (0, _react.createElement)(_reactRouterScroll.ScrollContext, { shouldUpdateScroll: shouldUpdateScroll }, (0, _react.createElement)((0, _reactRouterDom.withRouter)(_componentRenderer2.default), {
	        layout: true,
	        children: function children(layoutProps) {
	          return (0, _react.createElement)(_reactRouterDom.Route, {
	            render: function render(routeProps) {
	              attachToHistory(routeProps.history);
	              var props = layoutProps ? layoutProps : routeProps;
	
	              if (_loader2.default.getPage(props.location.pathname)) {
	                return (0, _react.createElement)(_componentRenderer2.default, _extends({
	                  page: true
	                }, props));
	              } else {
	                return (0, _react.createElement)(_componentRenderer2.default, {
	                  location: { page: true, pathname: "/404.html" }
	                });
	              }
	            }
	          });
	        }
	      })));
	    };
	
	    var NewRoot = (0, _apiRunnerBrowser.apiRunner)("wrapRootComponent", { Root: Root }, Root)[0];
	    (0, _domready2.default)(function () {
	      return _reactDom2.default.render(_react2.default.createElement(NewRoot, null), typeof window !== "undefined" ? document.getElementById("___gatsby") : void 0, function () {
	        (0, _apiRunnerBrowser.apiRunner)("onInitialClientRender");
	      });
	    });
	  });
	});

/***/ }),

/***/ "./.cache/register-service-worker.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pathPrefix = "/";
	if ((undefined)) {
	  pathPrefix = ("/yowainwright.github.io") + "/";
	}
	
	if ("serviceWorker" in navigator) {
	  navigator.serviceWorker.register(pathPrefix + "sw.js").then(function (reg) {
	    reg.addEventListener("updatefound", function () {
	      // The updatefound event implies that reg.installing is set; see
	      // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
	      var installingWorker = reg.installing;
	      console.log("installingWorker", installingWorker);
	      installingWorker.addEventListener("statechange", function () {
	        switch (installingWorker.state) {
	          case "installed":
	            if (navigator.serviceWorker.controller) {
	              // At this point, the old content will have been purged and the fresh content will
	              // have been added to the cache.
	              // We reload immediately so the user sees the new content.
	              // This could/should be made configurable in the future.
	              window.location.reload();
	            } else {
	              // At this point, everything has been precached.
	              // It's the perfect time to display a "Content is cached for offline use." message.
	              console.log("Content is now available offline!");
	              _emitter2.default.emit("sw:installed");
	            }
	            break;
	
	          case "redundant":
	            console.error("The installing service worker became redundant.");
	            break;
	        }
	      });
	    });
	  }).catch(function (e) {
	    console.error("Error during service worker registration:", e);
	  });
	}

/***/ }),

/***/ "./node_modules/domready/ready.js":
/***/ (function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {
	
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	
	}('domready', function () {
	
	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
	
	
	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })
	
	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }
	
	});


/***/ }),

/***/ "./node_modules/gatsby-plugin-google-analytics/gatsby-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.onRouteUpdate = function (_ref) {
	  var location = _ref.location;
	
	  // Don't track while developing.
	  if (("production") === "production" && typeof ga === "function") {
	    ga("set", "page", (location || {}).pathname);
	    ga("send", "pageview");
	  }
	};

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---node-modules-gatsby-plugin-offline-app-shell-js!./node_modules/gatsby-plugin-offline/app-shell.js":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(6502461027731969000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/gatsby-plugin-offline/app-shell.js") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby-plugin-offline/gatsby-browser.js":
/***/ (function(module, exports) {

	"use strict";
	
	exports.registerServiceWorker = function () {
	  return true;
	};

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	patch();
	
	function patch() {
	  var head = document.querySelector(`head`);
	  var ensure = __webpack_require__.e;
	  var chunks = __webpack_require__.s;
	  var failures;
	
	  __webpack_require__.e = function (chunkId, callback) {
	    var loaded = false;
	    var immediate = true;
	
	    var handler = function handler(error) {
	      if (!callback) return;
	
	      callback(__webpack_require__, error);
	      callback = null;
	    };
	
	    if (!chunks && failures && failures[chunkId]) {
	      handler(true);
	      return;
	    }
	
	    ensure(chunkId, function () {
	      if (loaded) return;
	      loaded = true;
	
	      if (immediate) {
	        // webpack fires callback immediately if chunk was already loaded
	        // IE also fires callback immediately if script was already
	        // in a cache (AppCache counts too)
	        setTimeout(function () {
	          handler();
	        });
	      } else {
	        handler();
	      }
	    });
	
	    // This is |true| if chunk is already loaded and does not need onError call.
	    // This happens because in such case ensure() is performed in sync way
	    if (loaded) {
	      return;
	    }
	
	    immediate = false;
	
	    onError(function () {
	      if (loaded) return;
	      loaded = true;
	
	      if (chunks) {
	        chunks[chunkId] = void 0;
	      } else {
	        failures || (failures = {});
	        failures[chunkId] = true;
	      }
	
	      handler(true);
	    });
	  };
	
	  function onError(callback) {
	    var script = head.lastChild;
	
	    if (script.tagName !== `SCRIPT`) {
	      if (typeof console !== `undefined` && console.warn) {
	        console.warn(`Script is not a script`, script);
	      }
	
	      return;
	    }
	
	    script.onload = script.onerror = function () {
	      script.onload = script.onerror = null;
	      setTimeout(callback, 0);
	    };
	  }
	}
	//# sourceMappingURL=patch.js.map

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/index.js":
/***/ (function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};
	
	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);
	
	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }
	
	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {
	
	                }
	            }
	        }
	    }
	
	    return targetComponent;
	};


/***/ }),

/***/ "./node_modules/mitt/dist/mitt.js":
/***/ (function(module, exports) {

	function n(n){return n=n||Object.create(null),{on:function(t,o){(n[t]||(n[t]=[])).push(o)},off:function(t,o){n[t]&&n[t].splice(n[t].indexOf(o)>>>0,1)},emit:function(t,o){(n[t]||[]).map(function(n){n(o)}),(n["*"]||[]).map(function(n){n(t,o)})}}}module.exports=n;
	//# sourceMappingURL=mitt.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-archive-jsx!./src/pages/archive.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(4170873936669641700, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"presets\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-es2015/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-1/lib/index.js\",[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./src/pages/archive.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-index-jsx!./src/pages/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13994203391546835000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"presets\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-es2015/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-1/lib/index.js\",[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./src/pages/index.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-blog-post-jsx!./src/templates/blog-post.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13342267768353247000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"presets\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-es2015/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-1/lib/index.js\",[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./src/templates/blog-post.jsx") })
	        }
	      });
	     }
	    

/***/ })

});
//# sourceMappingURL=app-3436f566028be1d3562e.js.map