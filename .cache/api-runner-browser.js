var plugins = [{
      plugin: require('/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"GTM-NRFFQ9"},
    },{
      plugin: require('/Users/jwainwright/Dropbox/me/git-docs/yowainwright.github.io/node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
"use strict";

// During bootstrap, we write requires at top of this file which looks
// basically like:
// var plugins = [
//   require('/path/to/plugin1/gatsby-browser.js'),
//   require('/path/to/plugin2/gatsby-browser.js'),
// ]

module.exports = function (api, args, defaultReturn) {
  // Run each plugin in series.
  var results = plugins.map(function (plugin) {
    if (plugin.plugin[api]) {
      var result = plugin.plugin[api](args, plugin.options);
      return result;
    }
  }

  // Filter out undefined results.
  );results = results.filter(function (result) {
    return typeof result !== "undefined";
  });

  if (results.length > 0) {
    return results;
  } else if (defaultReturn) {
    return [defaultReturn];
  } else {
    return [];
  }
};
//# sourceMappingURL=api-runner-browser.js.map