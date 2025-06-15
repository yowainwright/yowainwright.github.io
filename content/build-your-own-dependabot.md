---
title: "Quick Tutorial: Build A Basic Dependency Manager Like Dependabot In 5 Minutes"
date: "2022-12-23"
path: "/build-your-own-dependabot"
meta: "This document goes over building the basics of your own dependency manager, like dependabot, for JavaScript ot Typescript using package managers and Github actions."
categories:
  - dependabot
---

Scope:_ This project focuses purely on JavaScript \_and, sure, Typescript 😎_ but the same patterns could be applied to other languages and/or systems.

---

## Preface, AKA The Problem

_Dependabot is great! Why did I learn how I could replace it?_

---

Over the past 2 years, my beloved tool for updating dependencies seems to be focused on other features, like [security alerts](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates), or has abandoned features I used every day, like it's [Github app](https://docs.github.com/en/developers/apps) and [app](https://web.archive.org/web/20201112034046/http://dependabot.com/) interfaces. At the very least, it hasn't provided easy ways to update dependencies for 2 features which are fairly standard for JavaScript development—[pnpm](https://github.com/dependabot/dependabot-core/issues/1736) and [monorepos](https://github.com/dependabot/dependabot-core/issues/4993).

## Wait! What is Dependabot?

_Well, first off. This post is written from the context of code, using [Git](https://git-scm.com/), and using code libraries which excel the capability of code. If this is not clear or of interest to you, stop reading now!_

---

Dependabot is tool for managing coding project dependencies that are maintained in a git service. Mainly Github. This is important for security and keeping code up to date! Dependabot does this using [release, cron, or other events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) which are performed by git management tools (Github for this post). When a git management tool event triggers Dependabot to update dependencies, Dependabot does this specked to a [yml file configuration](https://github.com/yowainwright/mini-cookies/blob/master/.github/dependabot.yml), where is runs update commands and will create an [update pull request](https://github.com/yowainwright/mini-cookies/pull/95) if there are updates.

## How Can We Make Our Own Dependabot?

In the paragraph above, I mentioned how Dependabot works. It perfects tasks based on git management events. The cool thing is we can use those events too—just like Dependabot.

### 1. Create an action that is triggered by a Git event

To build our own Dependabot in 5 mins, let's use cron and a github action like so:

```yml
name: update dependencies

on:
  schedule:
    # This will run at 5am on Monday's
    - cron: "0 5 * * 1"
    # The cron reference below is for every 5 minutes (useful for debugging)
    # - cron: '*/5 * * * *'
```

_Cool. Now we are using a Github Action to run a cron job in a time range that we control!_

### 2. Run a script to update our dependencies

Next up, we'll want to update our dependencies. For this I'm using pnpm—but npm and yarn work the same. _Use what you like!_

> ### All JavaScript package managers have update commands that can be run to update dependencies!

```yml
  ...
  steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2.2.2
        with:
          version: latest
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm update
```

### 3. Finally, we should create a pull request with our updates

Lastly, we'll want to create a PR with our updates. For this, the fastest way is using [Peter Evans](https://github.com/peter-evans) [Create Pull Request Action](https://github.com/peter-evans/create-pull-request).

> You could build this yourself using the Github API. You can also replicate this functionality using the [GH cli](https://cli.github.com/) but that will take a bit more than 5 minutes.

```yml
    ...
    - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
            token: ${{ secrets.PR_CREATE_TOKEN }}
            commit-message: Update dependencies
            title: "[dependencies]  update dependencies"
            body: |
              ## Dependency updates
              Auto-generated using [create-pull-request][2]
              [1]: https://github.com/<org/user name>/<repo name>
              [2]: https://github.com/peter-evans/create-pull-request
            branch: update-dependencies
```

---

Quick note: You'll notice there is a required token in order to be able to create a pull request. That might be another post but [here's a link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for now!

---

### Here's a summary (aka all the yml)

```yml
name: update dependencies

on:
  schedule:
    - cron: "0 5 * * 1"
    # - cron: '*/5 * * * *'

jobs:
  udpate-deps:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2.2.2
        with:
          version: latest
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "pnpm"
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm update
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          token: ${{ secrets.PR_CREATE_TOKEN }}
          commit-message: Update dependencies
          title: "update dependencies"
          body: |
            ## Dependency updates
            [1]: https://github.com/<org/user name>/<repo name>
            [2]: https://github.com/peter-evans/create-pull-request
          branch: update-dependencies
```

---

_This post is in progress! More to come!_
