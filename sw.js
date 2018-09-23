/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-2e62a64b295c0049a556.js"
  },
  {
    "url": "app-dfc7222ef9bdc34ddc34.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-ae9c7b2e225c2234450a.js"
  },
  {
    "url": "index.html",
    "revision": "fa7d371a69190cab30a5b26d59fe37c6"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "38128681a368efd611f757bd968fc472"
  },
  {
    "url": "0.cdffb421ef0d536e6d77.css"
  },
  {
    "url": "component---src-pages-index-jsx.4225e65691ef03ae6a9b.css"
  },
  {
    "url": "component---src-pages-index-jsx-7da65b23fd729d427382.js"
  },
  {
    "url": "0-053e2e88eaf606baa047.js"
  },
  {
    "url": "static/d/173/path---index-6a9-PAnFAsBxXc7E5tu1zqxWioIIBQ.json",
    "revision": "e210ab8a7dfeb5ff31fa554ed8206165"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.json",
    "revision": "4914d7669e829af0507892c32a814568"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "26e8734c90b26e934e6dc45e1f326488"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});