---
title: TypeScript Init—Just beyond Getting Started
date: "2018-05-02"
layout: post
readNext: "/"
path: "/just-getting-started-with-ts/"
meta: This post documents getting starts with TypeScript—just beyond the Gettings Started Tut. In this Post I will go through and document the Linked List Data Structure in TypeScript.
featured_image: null
categories:
- note
- story
---

The Engineering Team at Dollar Shave Club is pretty excited about TypeScript. I'm excited too. I am not familar with TypeScript yet beyond conversations and "getting started" tutorials. In this post, I will document learning TypeScript while building a Linked List.

## Get My Shiny New TypeScript Project Setup

For my setup, I am trying build everything as close to what I'd use to build a plain old JavaScript Open Source Modules. I am specific about the Open Source Modules part because I use different tools depending on what I am doing.

### My Setup

In the table below, I've listed the Tool Category, what I started using initially, what I ended up using, and the reason I went the direction that I did.

|Tool Category| Initial | Final | Reason |
|---|---|---|---|
| Build | Rollup | TypeScript (TSC) | Rollup worked with minimal effort. I am user TSC because it means 1 less layer of abstraction. |
| Type Checker | TypeScript | TypeScript | TypeScript works well. The feedback in VS Code is immediate and offers clear messaging. |
| Testing | TS-Jest | TS-Jest | I was concerned about using TS-Jest because the documnetation is not very clear for me starting out...but somehow it worked. I'm familiar with Jest so that was good. |
| Linting | TS-Lint | TS-Lint | TS-Lint works well in VS Code. As far as the CLI, I'm still not clear if TS-Lint is working. |

### Why I used TypeScript TS Compiler?

I initially setup TypeScript with Rollup. Rollup was compiling fine. However, it seemed like another layer of abstracting while I was learning—so I decided to use TypeScript's compiler.

### Configuration tools I used

The Dollar Shave Club team used Jest. When working with TypeScript, the clearest path seemed to be TS-Jest—(what Dollar Shave Club uses for TypeScript projects) so I tried it out. It turned out to be very easy to get working. I started out by added a stardard, 

### Problems I had getting started with TypeScript

### Conclusion: Why I really like using Types
