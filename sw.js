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

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

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
    "url": "webpack-runtime-9c1f9231ef42379a95e4.js"
  },
  {
    "url": "app-f4569c2c7e1766225725.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-89fe4c225f8ad3bd20a6.js"
  },
  {
    "url": "index.html",
    "revision": "0bd3338d8bfa703803e5a2e511154882"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "d35cca7358a7ff7bd9ef55d34be33c02"
  },
  {
    "url": "0.714e789c58edc4d97d4f.css"
  },
  {
    "url": "component---src-pages-index-jsx.447afb9821705fabad67.css"
  },
  {
    "url": "component---src-pages-index-jsx-5f1fe1534bcd56c3b23c.js"
  },
  {
    "url": "0-e4d6f948d9fa2fe0c67f.js"
  },
  {
    "url": "static/d/401/path---index-6a9-JLjj2UQcNZYsktgibX6egCEzR14.json",
    "revision": "7c31d8a213df31decb016a93f8346c7a"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
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