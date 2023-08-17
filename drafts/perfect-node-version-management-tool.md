---
title: "Quick Thought: N vs NVM, which to use? It depends¨—but N provides a killer feature for team alignment"
date: "2023-08-03"
layout: post
readNext: "/"
path: "/n-vs-nvm"
meta: N and NVM are tools people often reach for to manage node versions. Both are great tools but for team alignment, N seems to provide a better experience you should try out!
featured_image: null
post_index: 18
categories:
- code
- js
- javascript
- node
---

Ensuring that the correct version of Node is being used can save a lot of time. Inversely, a Node mismatch can loose a lot of time. There are several ways to enforce the correct version of Node is being used. This quick post mainly discusses two options for enforcing the correct version of Node—[nvm](https://github.com/nvm-sh/nvm) and [n](https://github.com/tj/n). Both work and both have pros and cons but what are they? Well, lets dig into this and some ways to use them.

## NVM, Node Version Manager

[NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) is a node version manager that is installs "[per-user, and invoked per-shell](https://github.com/nvm-sh/nvm#about)". This is great for putting the user in the driver seat allowing them to manage multiple versions of node and install the current version of node per project by just running `nvm install` in the project directory. It is usually installed via curl, wget, or brew (unofficially).

## N, Interactive Node Manager

[N](https://github.com/tj/n) is another node version manager. It can be installed like NVM but also as a [NPM package](https://www.npmjs.com/package/n). N can install versions very similarly to NVM, you can run `n install <version>` but it can also install a version of node based on configuration file like NVM but running `n install auto`.

## Comparing NVM and N

> So, why are we talking about these tools?

Well, in my experience engineers often reach for NVM to manage node versions. NVM is a great tool but for team alignment, it isn't optimal for a core workflow engineers perform often in a workspace—installing differing node version across projects. Why? Well NVM is a per shell tool. This can be very inconvenient when traversing projects.





## What We Should Probably Always Be Using

Using something like DevContainers, Docker, Nix, or Tilt

## Conclusion
