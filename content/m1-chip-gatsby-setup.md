---
title: Setting update Gatsby Development on an M1 Mac Mini
date: '2021-06-01'
path: '/m1-chip-gatsby-setup/'
meta: A post providing context into setting up an M1 Mac for Gatsby development and 1 happy path to get up and running with Gatsby on a M1 Mac fast!
categories:
  - code
  - gatsby
  - javascript
---

Setting up a new M1 Chip Mac for JavaScript development is straightforward as of June 1st, 2021!
Previously, I'd read about the new M1 Chip [difficulties during setup and common apps that weren't supported](https://dev.to/alexandrudanpop/the-m1-mac-is-it-worth-it-for-devs-3fi5).

This post will troubleshoot minor issues I had setting up [Gatsby](https://www.gatsbyjs.com/) to develop, write and publish this post on my new M1 Chip Mac—specifically issues I had with Node and Sharp.

## Gatsby Dev Woes

After cloning a Gatsby repo, I attempted the setting Gatsby development to write this post as I'd done before.

```bash
nvm i && yarn && yarn develop
```

The chain of commands above led to a few errors in my terminal.

First, I observed that if I wasn't using Node 16, NVM seemed to endlessly try and install [Node 14](https://github.com/nvm-sh/nvm/issues/2350).
To solve this issue, I bumped the version of Node in my `.nvmrc` to `16` and everything worked fine.

Second, during NPM node module installation, I encountered errors with "pre-built or built binaries". [Sharp](https://www.npmjs.com/package/sharp) is one of the node modules which was causing the error. Sharp uses pre-built binaries to do image compression.
To solve the  "pre-built or built binaries" issues with Sharp, I Installed Homebrew and some Homebrew formulas. Then I removed some folders and re-build my Gatsby app which go everything running.
## Homebrew setup

_Maybe you haven't heard of [Homebrew](https://brew.sh/) or don't use it. If you have a particular reason not to use Homebrew setting up your M1 Chip Mac for Gatsby development might be a bit more [difficult](https://github.com/lovell/sharp/issues/2460)._

---

_Setting up Homebrew takes seconds. Read more about Homebrew [here](https://brew.sh/) to decide if you'd like to set it up on your computer._

---

After setting up Homebrew, formulas must be installed for Sharp or other packages to work. These Homebrew formulas are for using npm packages that require built binaries. A quick browser search can provide more detail but here are few links to save time and gain context: [Can't compile under Apple Silicon M1 arm64](https://github.com/lovell/sharp/issues/2460), [Mismatched x64 and ARM64 architectures on M1 Mac](https://github.com/lovell/sharp/issues/2588), [Can't install Sharp](https://stackoverflow.com/questions/54409953/cant-install-sharp/56108335). The following command installs the Homebrew formulas required for Sharp to work.

Specificallly, I believe I had to install [Vips](https://formulae.brew.sh/formula/vips):

```bash
brew install node vips
```

## Ship it

After installing the necessary Homebrew formulas for Sharp to work, I needed to clear cached Gatsby folders and build the application fresh.

To clear my Gatsby app, I ran:

```bash
rimraf node_modules .cache public
# or if you don't have rimraf globally installed
rm -rf node_modules .cache public
```

And then re-installed:

```bash
yarn
# or via npm
npm i
# or via my current fav
pnpm i
```

And then re-built my Gatsby app:

```bash
yarn start
```

## Final thoughts

M1 Macs are less expensive than Intel Macs because of [Computer Chip Shortages](https://www.theguardian.com/business/2021/mar/21/global-shortage-in-computer-chips-reaches-crisis-point), currently. I was concerned my MI Mac Mini would slow my development down because of bugs. Thankfully, I've had relatively no issues!

In this post, I hopefully provided some context into setting up an M1 Mac for Gatsby development and one _happy path_ to get up and running with Gatsby on an M1 Mac fast!
