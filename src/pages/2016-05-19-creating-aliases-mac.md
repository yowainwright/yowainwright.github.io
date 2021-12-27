---
title: Creating Aliases on a Mac
date: "2016-05-19"
layout: post
readNext: "/"
path: "/creating-aliases/"
meta: Creating Aliases on a Mac is an easy thing to do & can save a lot of time
share_image: "https://yowainwright.imgix.net/icons/os.jpg"
featured_image: null
post_index: 14
categories:
- code
- terminal
---

Creating Aliases on a Mac is an easy thing to do & can save a lot of time. When working in Terminal or another command line app, you may want to set up an alias to make your workflows easier.

To do this you'll want to set up a `.bash_profile`:

-  Run `vi ~/.bash_profile` in your command line app of choice, or [text editor of choice] ~/.bash_profile
-  This will open up your `bash profile` in `vi` or your `text editor` to be edited

If you'd like to use a text editor but don't have one that opens instead of `vi` checkout this [post](//help.github.com/articles/associating-text-editors-with-git/)

Here's a look at part of my `.bash_profile`:
```bash

# -------
# mySQL
# -------
export PATH=/usr/local/mysql/bin:$PATH

# -------
# host setups
# -------
alias hosts="sublime /etc/hosts"
alias vhosts="sublime /etc/apache2/vhosts"

```
