---
title: "A 'little deep' dive into Dependabot and Snyk Ingore Configs"
date: '2022-02-12'
layout: post
readNext: '/'
path: '/snyk-dependabot-ignore-configs/'
meta: "This article focuses on Snyk and Dependabots' ignore configs (ignores) from a DevX perspective."
featured_image: null
post_type: technical
categories:
  - code
  - yaml
  - security
---

Snyk and Dependabot are dependency management tools. At an initial glance, they do the same thing. They both submit pull requests to updates a repository's dependencies. For this article, I will focus on each tool's config file and how the fit into a developers workflow (DevX). More specifically, I will focus on the `ignore` section of their config files.

---

**Quick note:** I use and like both Snyk and Dependabot. My perspective of the products is my opinion. I am happy to learn where I'm wrong and don't feel like a power user. However, I do use both tools everyday.

---

## Context

Developer workflow and developer experience are a key part of security and maintenance. If a developer enjoys the developer experience of some code, they'll be loyal to it and make it do things no one ever expected—see JavaScript for reference (yes, a joke). However, if a developer doesn't enjoy the developer experience, they'll look for reasons and ways not to use it. Developer experience is key to explaining why Dependabot's `dependabot.yml` is optimal to the `.snyk` file.

It could be said that the `dependabot.yml` and `.snyk` files are so different they're not comparable. I don't disagree. However, for both config files, I use one feature specfically for security and/or time saving. They're `ignore` sections. The `ignore` section of both config files is used to specify to the tool, Snyk or Dependabot, bits of code to `ignore`.

## Snyk Ignore

The `.snyk` `ignore` key is used along with the Snyk CLI. Ignores are used to ignore dependencies with anticipated security issues. This can be useful for a few reasons. First, Ignores allow users to ignore dependencies that can't currently be updated. This can be useful when needing to do major updates to support a dependency's updates—think major version updates.  Second, Ignores can help avoid Snyk misread security issues. For example, Snyk's CLI ignores Classic Yarn's (Yarn 1's) `resolutions` object when assessing dependency security issues (2.15.22).

### Snyk CLI

By running

```bash
snyk ignore --id=SNYK-JS-BROWSERSLIST-1090194
```

A file with`yaml`-like syntax is output

```yaml
# Snyk (https://snyk.io) policy file, patches or ignores known vulnerabilities.
version: v1.22.1
# ignores vulnerabilities until expiry date; change duration by modifying expiry date
ignore:
  SNYK-JS-BROWSERSLIST-1090194:
    - '*':
        reason: >-
          This will be captured within the root `package.json` resolutions
          object
        expires: 2022-02-23T22:40:13.244Z
        created: 2022-01-24T22:40:13.250Z
```
If there is already a `.snyk` file, the new ignore is appended to the existing file.

## Dependabot Ignore

Dependabot doesn't have a CLI. Dependency updates are done using [cron jobs](). Cron jobs can be set to run at specific times and intervals which are easily configurable via the `dependabot.yml` file. To edit ignores just update the `dependabot.yml` file. Ignores are specific dependency. You can supply specific version or you can  key off of a semver range.

```yaml
version: 2
updates:
- package-ecosystem: npm
  directory: "/"
  schedule:
    interval: weekly
    time: "13:00"
  open-pull-requests-limit: 2
  ignore:
      - dependency-name: eslint
        versions:
          - 7.32.0
        update-types: ["version-update:semver-patch"]
```

Note in the `yaml` example above, dependencies are specified, versions are set, and an `update-types` is set to insure that dependencies are installed within a [patch]() version release of the specified dependency.

## Comparisons

Snyk ignores can be set via Snyk's CLI whereas dependendabot requires editing the repository's `dependabot.yml`. Snyk's CLI specifies ignores to Snyk security checks whereas Dependabot's ignores are set for specific dependencies set by the repo's maintainers. Dependabot supports version specificity.

Snyk takes more control over dependency management and than Dependabot. It's ignores are specific to Snyk and dependency management is as well. This can get confusing in monorepos especially because when installing, security vulnerabilities can arise for dependency dependencies updates that were fixed in other Snyk Pull Requests. The devX of this experience in not good because it feels like there are pull requests and vulnerabilities that go back and forth according to Snyk's security reporting and corresponding pull requests. Furthermore, the `.snyk` file ignores are specific to Snyk which forces me to either run the Snyk CLI or go to [Snyk's site](). Furthermore, Snyk ignores require a time to be set. This a weirdly non-productive thing to have to consider and isn't easily supported by the CLI.

I feel although Dependabot requires manual `dependabot.yml` updates, specifying ignores to specific dependencies that are causing errors is much clearer DevX. Being able to control cron jobs is useful too—so the repository isn't bombarded with pull requests all of the time. Snyks CLI is useful. Being able to search for dependency issues is great but the weirdness of setting up `ignores`: copying the Snyk specific error id and manually adding a time immediately takes away from the Snyk CLI.
