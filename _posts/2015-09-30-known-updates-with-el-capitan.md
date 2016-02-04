---
layout: post
title:  "Known changes needed after updating to El Capitan OS"
date: 2015-09-30
author: Jeff Wainwright
meta: Known changes needed after updating to El Capitan OS
permalink: /known-updates-with-el-capitan-os/
categories:
- programming
- mac
- os
- general
- code
- third
type: code
featured_image: /assets/os.svg
---

Recently, I upgraded to El Capitan. Suddenly my local websites using vagrant weren't working & I had to reinstall some of my ruby gems like jekyll, what I use for this blog.
{: .first-paragraph }

Below are a short list of things that helped me get back up & running again. Hope it helps you too.

# 1. Vagrant
[Quickguide](https://davidturner.name/setting-up-vagrant-in-os-x-10-11-el-capitan/)

^ Follow the instructions in the link provided


# 2. Ruby
[Various Ruby Updates - this link is for Jekyll](https://github.com/jekyll/jekyll/issues/3984)

^ Several ruby gems (like Jekyll) may not work not work

Re-installed homebrew if you have to (copy/paste the line of code below into terminal)

{% highlight ruby %}
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{% endhighlight %}
{: .full-length-code-block }

Re-install ruby if you have to

{% highlight ruby %}
brew install ruby
{% endhighlight %}
{: .full-length-code-block }

Re-install your gems as needed

{% highlight ruby %}
gem install [gem name]
{% endhighlight %}
{: .full-length-code-block }

