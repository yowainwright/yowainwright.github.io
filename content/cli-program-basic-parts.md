---
title: Understanding the basics parts of a CLI command
date: '2022-01-19'
layout: post
readNext: '/'
path: '/cli-program-basic-parts'
meta: "This brief article digs into the basics of most CLI commands including a summary of the commands's name, arguments, options, and actions."
featured_image: null
post_type: technical
categories:
  - code
  - javascript
---

Many people that have done semi-technical computer work have seen, used, or made a CLI command.

This post goes into the basics of most CLI commands.
I decided to write this post after realizing that thinking about the basics of a CLI command has helped me use and make them more effectively.

---

## Definition of a CLI program

By definition, a CLI (Command Line Interface) command is a program designed to run from a command line.
This means that the command is designed to be run in a terminal application and not in a web browser or GUI (graphical user interface) application.

I think of a CLI as short sentence of intructions written to be easy for a computer to understand but still readable for humans too.

## Parts of a CLI Command

CLIs use keyword/phrases/acronyms to define how the command is to be executed.
At the bare minimum, there's the CLI command name and the action the command runs.

CLI commands mainly consist of 3 parts.

1. The `name` of the CLI
2. THe `arguments` it takes
3. The `options` it takes

This is what it looks like to run a CLI command

```bash
<name> <argument> --<option> <optional-option-input> --<option>
# note: if an option is passed in without an option input, it will be interpreted as a boolean
```

The invisible but most important part of a CLI command is its action.
The CLI command action is a function that get invoked when a CLI command is executed.
Actions take in CLI command `arguments` and/or `options` as function arguments.

Let's explore the parts of a CLI command more below!

## Name

CLI commands always have a name! By entering in only a CLI's name, if a CLI is defined, it should execute.

```bash
$ <cli-name>
# ie => npm
# executes a log listing of npm commands
```

## Arguments

Arguments are keywords passed into a CLI to define how the CLI should be run.
Arguments are required parameters.

```bash
$ <cli-name> <cli-argument>
# ie => npm init
# prompts to setup a `package.json` file
```

## Options

Options are optional arguments that can be passed into a CLI.
Options are optional parameters.

```bash
$ <cli-name> <cli-argument> --<option> <optional-option-input>
# ie => npm install --save-dev lodash
# installs lodash as a dev dependency
```

```bash
$ <cli-name> <cli-argument> --<option>
# ie => npm install --frozen-lockfile
# installs the frozen lockfile
```

## Actions

Actions consist of the code that is executed when a CLI is run.
Actions are functions which take in the CLIs arguments and options which define how the CLI should be run.

Here's an example of CLI command with its action above it:

```typescript
!/usr/bin/env node
// ^ Used to specify how the file is to be executed

const { program } = require("commander");
const { version } = require("../package.json");
const { script } = require("./script");
import { Options } from "./types";

/**
 * action
 * @param {Options} options
 */
async function action(options: Options = {}) {
  const { config } = options;
  const urls = options?.urls || config?.urls || [];
  script({ urls });
}

program
  .version(version)
  .description("list all script tag srcs on a webpage from a given url")
  .option("-u, --urls [urls...]", "urls of script sources")
  .option("-c, --config <config>", "config file to use")
  .action(action)
  .parse(process.argv);
```

## Some nuances of CLI commands

While writing this blog post, I realized there were some subtle nuances that might be useful to clarify regarding CLI command arguments.

In example, with popular npm CLI:

```bash
$ npm install
# installs all dependencies
```

While

```bash
$ npm install lodash --save-dev
# installs lodash as a dev dependency
```

But

```bash
$ npm install lodash
# only installs all previously installed dependencies (not lodash!)
```

This is because the command above doesn't have the `--save-dev` or `--save` boolean argument to declare where the `lodash` dependency should be installed!
The CLI command, therefore, reads to the computer what it can read—aka `npm install`!

This is _really_ confusing but the general principle remains the same.

## Final thoughts

Taking the time to understand the basic parts of a CLI command is powerful thing keep in mind.
Most things done with code are accompanied by CLI commands to optimize their use.
By being able to leverage and understand CLI commands, users can traverse across many technical landscapes and programming language.

---

I've written several CLIs for various jobs. My most used open source CLI is [es-check](https://www.npmjs.com/package/es-check).
I still have a lot to learn so please reach out if you observe something I've written that could be improved.

Happy Hacking!
