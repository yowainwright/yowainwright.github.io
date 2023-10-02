---
title: "A 'little deep' dive into Dependabot and Snyk Ingore Configs"
date: '2022-02-12'
path: '/snyk-dependabot-ignore-configs'
meta: "This article focuses on Snyk and Dependabots' ignore configs (ignores) from a DevX perspective."
categories:
  - code
  - yaml
  - security
---

Snyk and Dependabot are dependency management tools. At an initial glance, they do the same thing. They both submit pull requests to update a repository's dependencies. For this article, I will focus on each tool's config file and how the config file fits into developer workflow and developer experience (DevX). More specifically, I will focus on the `ignore` section of each dependency management tool's config file.

---

**Quick note:** I use and like both Snyk and Dependabot. My perspective on each of the products is my opinion. I am happy to learn where I'm wrong and don't feel like a power user. However, I do use both tools everyday.

---

## Context

Developer workflow and DevX are key parts of security and code maintenance. If a developer enjoys the DevX of some code or coding tools, they'll be loyal to it and make it do things no one ever expected—see JavaScript for reference (yes, a joke). However, if a developer doesn't enjoy the DevX of some code or coding tool, they'll look for reasons _and ways_ not to use it. DevX is key to explaining why I feel Dependabot's `dependabot.yml` is optimal to the `.snyk` file right now.

It could be said that the `dependabot.yml` and `.snyk` files are so different they're not comparable. I don't disagree. However, for both config files, I use one feature specifically for security and saving time. The `ignore` sections! The `ignore` section of both config file types is used to specify to the tool (Snyk or Dependabot) modules of code to `ignore`.

## Snyk Ignore

The `.snyk` ignore key is used along with the Snyk CLI. Ignores are used to ignore dependencies with anticipated security issues. This can be useful for a few reasons. First, `ignores` allow users to ignore dependencies that can't currently be updated. This can be useful when needing to do major updates to support a dependency's updates—think major version updates.  Second, `ignores` can help avoid Snyk misread security issues. For example, Snyk's CLI ignores Classic Yarn's (Yarn 1's) `resolutions` object within a `package.json` when assessing dependency security issues (2.15.22).

In the section below, there are a few code snippets to go along with my comments from the paragraphs above.
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
If there is already a `.snyk` file, the new ignore is appended to the existing file. From there, the implementing developer can specify an `expires` time as well as a `reason`.

## Dependabot Ignore

Dependabot doesn't have a CLI. Dependency updates are done using [cron jobs](https://en.wikipedia.org/wiki/Cron). Cron jobs can be set to run at specific times and intervals which are easily configurable via the `dependabot.yml` file. To edit dependabot ignores, just update the `dependabot.yml` file. Ignores are specific dependency. You can supply a specific version of a dependency or you can key off of a semver range of versions.

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

**Note:** in the `yaml` example above, dependencies are specified, versions are set, and an `update-types` is set to insure that dependencies are installed within a patch version release of the specified dependency.

## Comparisons

Snyk `ignores` can be set via Snyk's CLI whereas Dependabot requires editing the repository's `dependabot.yml`. Snyk's CLI specifies ignores to **Snyk specific** security checks whereas Dependabot's ignores are set for specific dependencies set by a repository's maintainers. Dependabot supports version specificity whereas Snyk sets ignores versioning to it's own issue set.

Snyk takes more control over dependency management and than Dependabot. It's ignores are specific to Snyk and dependency management is as well. This can get confusing in monorepos especially because when simply installing, by running `yarn` in example, security vulnerabilities can arise for dependency dependencies updates that were fixed in other Snyk Pull Requests. The devX of this experience in not good because it feels like there are pull requests and vulnerabilities that go back and forth according to Snyk's security reporting and corresponding pull requests. Furthermore, the `.snyk` file ignores are specific to Snyk which forces me to either run the Snyk CLI or go to [Snyk's site](https://snyk.io/). Furthermore, Snyk ignores require a time to be set. This a weirdly non-productive thing to have to consider and isn't easily supported by the CLI.

I feel although Dependabot requires manual `dependabot.yml` updates, specifying ignores to specific dependencies that are causing errors is much clearer DevX. Being able to control cron jobs is useful too—so the repository isn't bombarded with pull requests all of the time. Snyks CLI is useful. Being able to search for dependency issues is great but the weirdness of setting up `ignores`: copying the Snyk specific error id and manually adding a time immediately takes away from the Snyk CLI.

## Update—After Writing Most of this Article

After writing most of this article, I downloaded the Snyk VSCode Extension. The Snyk VSCode extension doesn't disappoint. It provides the same feedback as Snyk's CLI, but via dialogue messages in a `package.json` file. It takes a bit for the `package.json` file to display the dialogues but once they're displayed, they're very useful.

## Conclusions

Snyk provides useful interfaces for discovering security issues. I perceive Snyk's approach to require more context into _it's_ software than what I'd like. All of the issues it finds are pinned to Snyk issues.

In example, this is how Snyk writes it's security issues

```txt
SNYK-JS-BROWSERSLIST-1090194
```

Dependabot provides ways to update dependencies. It provides updates or the ability to ignore updates based on the repository's dependencies—no need to have context into another interface—like Snyk.

```yml
ignore:
  - dependency-name: eslint
    versions:
    - 7.32.0
```

I prefer Dependabot's approach because it requires less context and it's context relates specifically to the dependency used in the effected repository.

However, when considering how I work and how I update security vulnerabilities, Snyk's CLI and VSCode Plugin give me a way to make updates without needing to be aware of Github at all which does assist me in keep my work off the browser and in the code.

All of this to write, both tools are cool but I find Dependabot's devX to be a bit better. If Snyk's issues weren't specific to it's software, my opinion on which tool (Snyk or Dependabot) to choose for my personal projects would be harder to make.

---

**Further reading**

Get more information about Snyk's CLI and the `.snyk` ignore config [here](https://docs.snyk.io/features/snyk-cli/commands/ignore). Read much more about Dependabot's config [here](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates). Check out the Snyk VSCode plugin [here](https://docs.snyk.io/features/integrations/ide-tools/visual-studio-code-extension-for-snyk-code).

---

Please keep in mind, I'm just a user! I use both tools everyday. I love that Snyk is pushing security forward.
Please reach out if you have suggestions or to communicate something I'm wrong about in this post!

Happy Hacking!
