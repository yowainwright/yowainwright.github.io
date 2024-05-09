---
title: 'Lightweight Intelligent Completion in Zsh'
date: '2024-05-05'
path: '/lightweight-intelligent-completion-in-zsh/'
meta: 'This post provides some quick tips on how to get intelligent completion in Zsh without the bloat.'
categories:
  - code
  - zsh
  - terminal
  - bash
---


Over the last few years, exciting user interface ideas have come on the scene for terminals like [Fig](https://github.com/withfig/fig) and [Warp](https://github.com/warpdotdev/Warp). These tools provide great initial development experiences. However, after dealing with high memory usage which slows down other areas of software engineering workflows, I found myself asking, 'Is there a way I can get similar functionality without the bloat?'

## TL;DR

There is! By using a few zsh plugins, you can get a lightweight intelligent completion setup. Read more to consider if this setup might benefit your workflow if you use a mac and zsh.

## Brief Overview of Tools

Warp and Fig, and now [Amazon Q Developer](https://aws.amazon.com/codewhisperer/), provide intelligent completion in your terminal by providing suggestions and completion based on current context. Warp, provides a terminal experience redefined with incorporated ai, autocomplete and fresh UI. Fig is more traditional out of the box with _some_ similar features. However, I found these tools to increase memory usage [significantly](https://github.com/warpdotdev/Warp/issues/2611).

## Why I chose the approach I did

Between terminal experiences the use lots of memory and infrastructure processes that run on my machine that do the same, it's important for me to consider how I allocate CPU and memory. Perhaps I could go into more detail on this in a later post. However, for now, here's a quick overview of how I set up my terminal to provide intelligent completion without the bloat.

## How I set it up

I removed fig and warp and installed the following plugins.

---

- [zoxide](https://github.com/ajeetdsouza/zoxide): a fast path history tool,
- [fzf](https://github.com/junegunn/fzf): a favorite terminal fuzzy finder, [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions): auto-suggestions based on terminal commands
- [fzf-tab](https://github.com/Aloxaf/fzf-tab): a tab/dropdown-like developer experience which feels similar to fig and warp:
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting): a tool that highlights commands as you type them

---

fzf-tab is the star of the show on for this functionality. Setting it up took some work for me.

I had to configuration the ui which is mostly (if not all copy/pasted from the docs):

```bash
  zstyle ':fzf-tab:complete:cd:*' fzf-preview 'eza -1 --color=always $realpath'
  zstyle ':fzf-tab:complete:git-(add|diff|restore):*' fzf-preview 'git diff $word | delta'
  zstyle ':fzf-tab:complete:git-log:*' fzf-preview 'git log --color=always $word'
  zstyle ':fzf-tab:complete:git-help:*' fzf-preview 'git help $word | bat -plman --color=always'
  zstyle ':fzf-tab:complete:git-show:*' fzf-preview 'case "$group" in "commit tag") git show --color=always $word ;; *) git show --color=always $word | delta ;; esac'
  zstyle ':fzf-tab:complete:git-checkout:*' fzf-preview 'case "$group" in "modified file") git diff $word | delta ;; "recent commit object name") git show --color=always $word | delta ;; *) git log --color=always $word ;; esac'
  zstyle ':completion:*:git-checkout:*' sort false
  zstyle ':completion:*:descriptions' format '[%d]'
  zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
  zstyle ':completion:*' menu no
  zstyle ':fzf-tab:complete:cd:*' fzf-preview 'eza -1 --color=always $realpath'
  zstyle ':fzf-tab:*' switch-group '<' '>'
  zstyle ':completion:*' list-max-items 20
```

I also added more configuration as recommended in the docs with [fzf-tab-source](https://github.com/Freed-Wu/fzf-tab-source):

```bash
  eval "$(zoxide init zsh)"
  source  $ZSH_CUSTOM/plugins/fzf-tab-source/fzf-tab-source.plugin.zsh
  enable-fzf-tab
```

## Conclusion

With these plugins, I have a lightweight intelligent completion setup that doesn't slow down my machine. It didn't take long to setup and the results have been great.

<figure class="width--content">
  <img src="https://yowainwright.imgix.net/lightweight-intelligent-completion-in-zsh/fzf-tab" alt="fzf tab in practice" />
</figure>
