---
title: Understanding the basics parts of a CLI program
date: '2022-01-19'
layout: post
readNext: '/'
path: '/cli-program-basic-parts/'
meta: "This brief article digs into the basics of most CLI programs including a summary of the program's name, arguments, options, and actions."
featured_image: null
post_type: technical
categories:
  - code
  - javascript
---

Many people that have done semi-technical computer work have seen, used, or made a CLI program. 

This post goes into the basics of most CLI programs I've seen. I decided to write this post after realizing that thinking about the basics of a CLI program has helped me use and make them more effectively—something I do every day.

## Definition of a CLI program

By definition, a CLI program (Command Line Interface Program) is a program designed to be run from a command line. 
This means that the program is designed to be run in a terminal application and not in a web browser or gui (graphical user interface) application.

## Parts of a CLI program

CLI programs generally contain 1 to 4 parts or keyword/phrases/acronyms to defined how the program is to be executed. 

1. The `name` of the program
2. The `arguments` the program takes
3. The `options` the program takes
4. The `actions` the program executes

```
<name> <argument> --<option> <optional-option-input> --<option>
# note: if an option is passed in without an option input, it will be interpreted as a boolean
```

## Name

CLI programs always have a name! By entering in only a cli program's name, if a CLI is defined, it should execute some response.

```sh
$ <cli-name>
# ie => npm
# logs a list of npm commands
```

## Arguments

Arguments are key words passed into a CLI program to define how the CLI program should be run. Arguments are a required parameters.

```sh
$ <cli-name> <cli-argument>
# ie => npm init
# prompts to setup a `package.json` file
```

## Options

Options are optional arguments that can be passed into a CLI program. Options are optional parameters.

```sh
$ <cli-name> <cli-argument> --<option> <optional-option-input>
# ie => npm install --save-dev lodash
# installs lodash as a dev dependency
```

```sh
$ <cli-name> <cli-argument> --<option>
# ie => npm install --frozen-lockfile
# installs the frozen lockfile
```

## Actions

Actions consist of the code that is executed when a CLI program is run. Actions are generally functions which take in the CLI programs arguments and options which define how the CLI program should be run.

Here's an example of program with a corresponding action:

```typescript
**
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

## Some nuances of CLI programs

While writing this blog post, I realized there were some subtle nuances I should clarify regarding arguments which can have optional inputs, etc. 

In example, with npm:

```sh
$ npm install
# installs all dependencies
```

While

```sh
$ npm install lodash --save-dev
# installs lodash as a dev dependency
```

But 

```sh
$ npm install lodash
# only installs all previously installed dependencies
```

Because it doesn't have the `--save-dev` or `--save` modifier to declare where the dependencies should be installed!

This can be really confusing but the general principle remains the same. 

## Final thoughts

Taking the time to understand the basic parts of CLI programs can be a powerful tool for anything technical. I imagine that anything done with code, has a CLI tools to optimize it's use at some level. By being able to write and leverage CLI program users can traverse across any technical landscape and/program language quickly and easily which some basic capability. 

---

I've written several CLI programs for various jobs. This is my most used open source CLI program, [es-check](https://www.npmjs.com/package/es-check). I still have a lot to learn so please reach out if you observe something I've written is incorrect or could be communicated better.

Happy Hacking!
