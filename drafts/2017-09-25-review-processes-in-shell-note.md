---
title: Quick tip—Find Running Processes Quickly in a Shell
date: "2017-10-07"
layout: post
readNext: "/"
path: "/find-running-processes/"
meta: Qick tip to find running processes in a shell to delete or view them
featured_image: null
categories:
- note
- tip
---

Listed below is one way to find running processes with a shell. This is useful when debugging.

Example command for finding running `ruby` processes.
```sh
ps aux | grep -i ruby
```

Breaking down that command

```sh
# display processes
ps
# flag => all processes
aux
# isolate search of processes
grep -i
# the process we're isolating
ruby
```


