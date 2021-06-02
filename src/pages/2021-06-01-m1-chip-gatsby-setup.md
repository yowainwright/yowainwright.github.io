---
title: Setting update Gatsby Development on a M1 Mac Mini 
date: '2021-06-01'
layout: post
readNext: '/'
path: '/m1-chip-gatsby-setup/'
meta: .
featured_image: null
post_type: technical
categories:
  - code
  - gatsby
  - javascript
---

Setting up a new M1  Chip Mac for JavaScript Development is straightforward as I writing this, June 1st, 2021.
Previously, I'd researched the new M1 Chip and heard about [difficulties during setup and comman apps that weren't supported](https://dev.to/alexandrudanpop/the-m1-mac-is-it-worth-it-for-devs-3fi5).
This post will troubleshoot minor issues I had setting up [Gatsby](https://www.gatsbyjs.com/) local development on an M1 Chip Mac—specifically issues with Node and Sharp. 

## Gatsby Dev Whoas

After cloning a Gatsby repo, I attempted the setting everything up as I'd done before. 

```sh
nvm i && yarn && yarn develop
```

The chain of commands above led to a few errors in my terminal. 

First, I observed that if I wasn't using Node 16, NVM seemed to endlessly try and install [Node 14](https://github.com/nvm-sh/nvm/issues/2350).
To solve this issue, I bumped the version of of node in my `.nvmrc` and was past this issue. 

Second, during node packages installations I encountered a few errors having to do with "pre-built or built binaries". To not go down on rabbit hole on what these are, they're most simpily programs or data used to do someting. In the case of the npm node modules, [sharp](https://www.npmjs.com/package/sharp), it uses pre-built binaries to do image compression. 
To solve this issue, I'll take a step back to write, "Install Homebrew"! Then I'll fast follow to a quick "rim raf" solution that should get you up and running!

## Homebrew setup

_Maybe you haven't heard of [Homebrew](https://brew.sh/) or don't use it. If you have a particular reason not to use Homebrew setting up your M1 Chip Mac for Gatsby development might be a bit more [difficult](https://github.com/lovell/sharp/issues/2460)._

---

_Setting up Homebrew takes seconds. Read more about Homebrew [here](https://brew.sh/) to decide if you'd like to set it up on your computer._

---

After setting up Homebrew, for Gatsby development, a few more brews must be installed. These Homebrew formulae installs are for npm packages that require built binaries. A quick browser search can provide more detail but here are few links to save time and gain context: [Can't compile under Apple Silicon M1 arm64](https://github.com/lovell/sharp/issues/2460), [Mismatched x64 and ARM64 architectures on M1 Mac](https://github.com/lovell/sharp/issues/2588), [Can't install Sharp](https://stackoverflow.com/questions/54409953/cant-install-sharp/56108335) . Specifically, I dealt with Gatsby M1 Chip Mac Gatsby setup issues with `sharp` and `node-sass`. The following command tasks care of the Homebrew "formulae" that need to be installed for Gatsby development. 

Assuming you don't have node and vips installed run:

```sh
brew install node vips
```

## Ship it

After insuring the necessary Homebrew formulae are installed, you might be disappointed (as I was) to find local Gatsby development is still not up and running. 
Relax, there is one more quick thing to do. Clear your cached items and build your application fresh. 

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

Currently with [Computer Chip Shortages](https://www.theguardian.com/business/2021/mar/21/global-shortage-in-computer-chips-reaches-crisis-point), M1 Macs are, currently, less expensive than Intel Macs. I was concerned if I jumped too fast on an MI Mac, my development would be slowed fixing issues. I wanted to save money so I took the risk. Thankfully so far, I haven't found my new M1 Mac to slow down my development much. 

In this post, I hopefully provided some context into setting up a M1 Mac for Gatsby development and 1 happy path to get up and running with Gatsby on a M1 Mac fast!


