---
title: Making a CSS Font Partial
date: "2017-09-14"
layout: post
readNext: "/"
path: "/css-font-partial"
meta: Making a maintainable CSS font partial.
featured_image: null
post_index: 54
categories:
- sass
- css
---

Fonts and text styles are often managed along with other default styles by developers. Here is one way to create a font CSS partial using [BEM—Block Element Modifier](http://getbem.com/).

---

In the paragraphs below, a process for declaring font styles and defining them to specific elements optimally will be defined.

## Define Font Partial

To clearly declare font styles, defining variables is important. In the code block below font family variables are defined using [Sass](http://sass-lang.com/) but this is similar to other CSS processes.

```sass
// declare fonts families
$serif: 'Georgia', serif;
$sansserif: 'Helvetica Neue', Helvetica, Arial, sans;
$condensed: 'Impact';
// declare fonts
$text-large: normal 1.125rem/1.44 $sansserif;
$text: normal .9375rem/1.33 $serif;
$text-small: normal .875rem/1.43 $serif;
```

After general font styles are declared, css is written to modify them efficiently with cascade awareness. In the CSS block below, `.text` is the **block**. `__title` and `__cite` are **elements** that extend from the `.text` block. **Modifiers** are used to define `condensed` and `large` font modifications.

```sass
.text {
  // `text` is the block
  font: $text;
  &--condensed {
    // `condensed` modifies the `text` block
    font-family: $condensed;
  }
  &--uppercase {
    text-transform: uppercase;
  }
  &__title {
    // `title` is an element of the `text` block
    font: $text-large;
    &--large {
      // the `large` modifier can modify the `title` element
      font-size: 2rem;
    }
  }
  &__cite {
    // the `` modifier can modify the `title` block
    font: $text-small;
  }
}
```

Write CSS as done above is purposeful. All styles are clearly nested within the `.text` block. This process provided the sense of cascade without causing the cascade to suffer as a result. Each selector compiles to 1 CSS class.

The compiles CSS looks like this (unminified)

```sass
.text {
  font: $text;
}
.text--condensed {
    font-family: $condensed;
}
.text--uppercase {
  text-transform: uppercase;
}
.text__title {
  font: $text-large;
}
.text__title--large {
  font-size: 2rem;
}
.text__cite {
  font: $text-small;
}
```

Within HTML, styles can be applied like this

```sass
<article>
  <header>
    <h2 class="text__title text__title--large"></h2>
    <p class="text__cite text--condensed">Cite</p>
  </header>
  <p class="text">Text</p>
</article>

```

The code above is descriptive and does not mess with CSS specificity. Important things to consider when using BEM are **block** naming, defining succinct **elements**, and CSS class character length. More details for those topics are outside of the scope of this post but can help writing text CSS.
