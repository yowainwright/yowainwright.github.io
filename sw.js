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
    "url": "webpack-runtime-6b2f2b8ceb19063bbd9e.js"
  },
  {
    "url": "app-63d7cad44e94698d8f50.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-5f3c85f6480ccece123e.js"
  },
  {
    "url": "index.html",
    "revision": "0e1e8b890632659c6ad742a36c8118cc"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "83ea9e6b1de5302a502992f66345fe80"
  },
  {
    "url": "0.714e789c58edc4d97d4f.css"
  },
  {
    "url": "component---src-pages-index-jsx.07d3acc5bc88f070b169.css"
  },
  {
    "url": "google-fonts/s/notoserif/v6/ga6Iaw1J5X9T9RW6j9bNfFcWaA.woff2",
    "revision": "f7fb9922ab0013f0ee2f11ca54ed6b88"
  },
  {
    "url": "google-fonts/s/notoseriftc/v1/XLY9IZb5bJNDGYxLBibeHZ0BvvMpXX5MTw.woff2",
    "revision": "c1cece1a4145a234bf5d95fb3a2349fc"
  },
  {
    "url": "google-fonts/s/notoseriftc/v1/XLYgIZb5bJNDGYxLBibeHZ0BtnAOSA.woff2",
    "revision": "f7296b651f59c9470cbc98fe8a796a74"
  },
  {
    "url": "google-fonts/s/oswald/v16/TK3hWkUHHAIjg75-6hwTus9C.woff2",
    "revision": "541a863959122f29c9961095cdcbb5c2"
  },
  {
    "url": "google-fonts/s/oswald/v16/TK3iWkUHHAIjg752GT8G.woff2",
    "revision": "f15aa285863274b4f6ed578caa76565e"
  },
  {
    "url": "google-fonts/s/playfairdisplay/v13/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
    "revision": "203179d16cd511feb9d8691f27926c3b"
  },
  {
    "url": "google-fonts/s/playfairdisplay/v13/nuFlD-vYSZviVYUb_rj3ij__anPXBb__lW4e5g.woff2",
    "revision": "4679353199d23f37e5aceb461a374027"
  },
  {
    "url": "google-fonts/s/playfairdisplay/v14/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
    "revision": "496b0ee7c32c16da8c6289fa8aae5268"
  },
  {
    "url": "google-fonts/s/playfairdisplay/v14/nuFlD-vYSZviVYUb_rj3ij__anPXBb__lW4e5g.woff2",
    "revision": "18cc8f34bd972a20d01df12408aeb0a0"
  },
  {
    "url": "component---src-pages-index-jsx-cc748ca57846adb91f62.js"
  },
  {
    "url": "0-22f7b71b6e9f27df6b93.js"
  },
  {
    "url": "static/d/415/path---index-6a9-NbpHjSqsehN4Sl22FewMdcCFxk.json",
    "revision": "b828a9e1bd511b86d00f99fb8b04189c"
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