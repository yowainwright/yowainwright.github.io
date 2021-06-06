---
title: Setting update Gatsby Development on an M1 Mac Mini 
date: '2021-06-01'
layout: post
readNext: '/'
path: '/m1-chip-gatsby-setup/'
meta: A post providing context into setting up an M1 Mac for Gatsby development and 1 happy path to get up and running with Gatsby on a M1 Mac fast!
featured_image: null
post_type: technical
categories:
  - code
  - gatsby
  - javascript
---

Setting up a new M1  Chip Mac for JavaScript Development is straightforward as I write this, June 1st, 2021.
Previously, I'd researched the new M1 Chip and heard about [difficulties during setup and common apps that weren't supported](https://dev.to/alexandrudanpop/the-m1-mac-is-it-worth-it-for-devs-3fi5).
This post will troubleshoot minor issues I had setting up [Gatsby](https://www.gatsbyjs.com/) local development on an M1 Chip Mac—specifically issues with Node and Sharp. 

## Gatsby Dev Woes

After cloning a Gatsby repo, I attempted the setting everything up as I'd done before. 

```sh
nvm i && yarn && yarn develop
```

The chain of commands above led to a few errors in my terminal. 

First, I observed that if I wasn't using Node 16, NVM seemed to endlessly try and install [Node 14](https://github.com/nvm-sh/nvm/issues/2350).
To solve this issue, I bumped the version of Node in my `.nvmrc` and was past this issue. 

Second, during NPM Node Modules installations I encountered a few errors with "pre-built or built binaries". To not go down on rabbit hole on what "pre-built or built binaries" are, they're programs or data used to do something. In the case of the NPM Node Modules, [Sharp](https://www.npmjs.com/package/sharp) in example uses pre-built binaries to do image compression. 
To solve the  "pre-built or built binaries" issues, I "Install Homebrew"! Then I remove some folders and re-install them. This should get you up and running. should get you up and running!

## Homebrew setup

_Maybe you haven't heard of [Homebrew](https://brew.sh/) or don't use it. If you have a particular reason not to use Homebrew setting up your M1 Chip Mac for Gatsby development might be a bit more [difficult](https://github.com/lovell/sharp/issues/2460)._

---

_Setting up Homebrew takes seconds. Read more about Homebrew [here](https://brew.sh/) to decide if you'd like to set it up on your computer._

---

After setting up Homebrew, a few more formulas must be installed for Gatsby to work. These Homebrew formulas are for using npm packages that require built binaries. A quick browser search can provide more detail but here are few links to save time and gain context: [Can't compile under Apple Silicon M1 arm64](https://github.com/lovell/sharp/issues/2460), [Mismatched x64 and ARM64 architectures on M1 Mac](https://github.com/lovell/sharp/issues/2588), [Can't install Sharp](https://stackoverflow.com/questions/54409953/cant-install-sharp/56108335) . Specifically, I dealt with Gatsby M1 Chip Mac Gatsby setup issues with  the [**Sharp**]() and [**Node-sass**]() npm packages. The following command install the Homebrew formulas required for Gatsby development. 

Assuming you don't have [Node]() and [Vips]() installed run:

```sh
brew install node vips
```

## Ship it

After installing necessary Homebrew formulas for Gatsby, you may need to do one more step to get Gatsby up and running—clear your Gatsby folder's cached items and build your application fresh. 

Clear your Gatsby app

```sh
rimraf node_modules .cache public
# or if you don't have rimraf globally installed
rm -rf node_modules .cache public
```

Install your dependencies

```sh
yarn
# or via npm
npm i
# or via my current fav
pnpm i
```

Finally, run your application

```sh
yarn start
```

## Final thoughts

M1 Macs are less expensive than Intel Macs because of [Computer Chip Shortages](https://www.theguardian.com/business/2021/mar/21/global-shortage-in-computer-chips-reaches-crisis-point), currently. I was concerned my MI Mac Mini would slow my development because of bugs but I wanted to save money. Thankfully, I haven't found my new M1 Mac has slowed down my development. 

In this post, I hopefully provided some context into setting up a M1 Mac for Gatsby development and one _happy path_ to get up and running with Gatsby on a M1 Mac fast!


