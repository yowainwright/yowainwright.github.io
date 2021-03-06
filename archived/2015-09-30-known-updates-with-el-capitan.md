---
title: Known changes needed after updating to El Capitan OS
date: "2015-09-30"
layout: post
readNext: "/"
path: "/known-updates-with-el-capitan-os/"
meta: Known changes needed after updating to El Capitan OS
share_image: "https://yowainwright.imgix.net/icons/os.jpg"
featured_image: null
categories:
- os
- code
---

Recently, I upgraded to El Capitan. Suddenly my local websites using vagrant weren't working & I had to reinstall some of my ruby gems like jekyll, what I use for this blog.

Below are a short list of things that helped me get back up & running again. Hope it helps you too.

-  Vagrant
[Quick guide](https://davidturner.name/setting-up-vagrant-in-os-x-10-11-el-capitan/)

^ Follow the instructions in the link provided


-  Ruby
[Various Ruby Updates - this link is for Jekyll](https://github.com/jekyll/jekyll/issues/3984)

^ Several ruby gems (like Jekyll) may not work not work

Re-installed homebrew if you have to (copy/paste the line of code below into terminal)

```ruby
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Re-install ruby if you have to

```ruby
brew install ruby
```

Re-install your gems as needed

```ruby
gem install [gem name]
```

