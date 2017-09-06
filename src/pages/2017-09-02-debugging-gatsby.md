---
title: Debugging Gatsby while getting started
date: "2017-09-02"
layout: post
readNext: "/"
path: "/debugging-gatsby/"
meta: Tips for Debugging Gatsby when Getting Started
featured_image: null
share_image: null
categories:
- note
- story
---

**Draft:** After switching from Jekyll to Gatsby, here are some tips I wish I would have had gettings setup.

## Having problems building?

Build problems usually reveal issues with developer code. Sometimes its an issue with Gatsby caching. You can try:

```
nvm install

rm -rf .cache node_modules public 

npm i

gatsby build
```

or:
```
nvm install

rm -rf .cache node_modules public 

# sometimes it IS `npm i` vs `yarn`
yarn

gatsby build
```

## HTML is not rendering within Markdown files?

Sometimes adding `html` within markdown is a plus and these changes can look fine in development.

One potential reason for issues are Gatsby Remark Plugins, like [Gatsby-Remark-Images](https://www.gatsbyjs.org/packages/gatsby-remark-images/). 

My initial somewhat hacky fix is removing some of the Gatsby Remark Plugins. This is because I prefer to fix image css issues myself. There may be a better fix though.


## Deploying

When deploying Gatsby, assets need to be copied over.

Within `package.json`, add:

```
"pre-deploy": "cp CNAME public; cp *.html public; cp README.md public && cp -rf ./assets ./public",
"deploy": "npm run pre-deploy && gatsby build && gh-pages -d public --branch master",
```

`pre-deploy` makes sure that basic information that is not within the `/public` folder is added so that images are available in `assets`.
