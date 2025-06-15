---
title: Reenvisioning branded content at Dollar Shave Club
date: "2017-09-04"
path: "/branded-content"
meta: "Reenvisioning branded content at Dollar Shave Club."
categories:
  - note
  - story
---

Over a year ago, I was given the opportunity to work with a team to design and develop branded content for Dollar Shave Club. [Dollar Shave Club](https://www.dollarshaveclub.com) and its affiliated company, [Mel](https://melmagazine.com/) had been producing high-quality content along with beautiful art for approximately two years before under [Josh Schollmeyer](https://www.linkedin.com/in/jschollmeyer/). This post will summarize the experience of my team and then go into more of my area of expertise—engineering.

To build a site that would be able to come close to the already set content, I was brought on under [Darshit Desai](https://www.linkedin.com/in/darshitdesai/) to work with him and other team members—[Erin Tag](https://www.linkedin.com/in/erin-taj-12596946/), Nick Lefty, [Donny Smith](https://www.linkedin.com/in/donnysmith/), [Justin Berg](https://www.linkedin.com/in/justin-berg-93722b2/), [Arvind Mishra](https://www.linkedin.com/in/arvindmishra1/), and [Melissa Williams](https://www.linkedin.com/in/melwilms/).

---

Branded content is not new conceptually. We were tasked with figuring out how to do it differently while creating something that was additive to the great content already being made at Dollar Shave Club. On top of that, our interface and to be normal so that writers could keep adding their content with ease.

## Sometimes it _is_ just Black and White

We spent time, refining outlook and answering questions that would have to last for a long period to come. What would be our design style? Could we create something that would allow the experience of each article feel like its own? How could we ensure that our content seemed like the good read it was/is and not like _just branded content_?

After about six months of prototyping and developing designs, we came to a few conclusions. We should have a simple palette of mainly blacks, greys, and whites to let imagery and articles stand out. We should be everything modularly so that we can more quickly add features. For the CMS for editing, we went with Wordpress so that writer would work with something that most were used to. The front end itself was separated using [Wordpress's API](https://wordpress.org/plugins/rest-api/).

## The site must be fast

**Images Matter:** UX, design and engineering negotiated and came up with optimal image sizing and a standard ratio (16:9). Having a standard ratio allowed us to know image sizes and provide image placeholders before the image would load.

#### With the [Imagesloaded Library](https://github.com/desandro/imagesloaded), images can be added as they're available

```
require('imagesLoaded')

export default function () {
  const loadImages = function loadImagesFunc() {
    document.querySelectorAll('.js-image-preload').forEach((el) => {
      // animate the image render after it's loaded
      el.imagesLoaded().progress(() => {
        el.classList.add('js-image-loaded')
        setTimeout(() => {
          el.classList.remove('js-image-preload')
        }, 250)
      })
    })
  }
  // render load images when the document is ready
  // or when an ajax request is complete
  document.addEventListener('DOMContentLoaded', () => {
    loadImages()
  })
}

```

**Less Fonts:** We decreased the number of fonts used by computing some fonts using the `font-weight: bold` CSS property on fonts that were using a normal weight.

#### Computing a bold font to save on fonts used

```css
.font {
  font: a-font-family 400 1rem;
  &--bold {
    font-weight: bold;
  }
}
```

**Cleaning up CSS:**[Purify CSS](https://github.com/purifycss/purifycss) is used along with a config to makes that styles added via WordPress are there but nothing more. There are very few unused styles on the site.

### Troubleshooting state CSS classes by adding a .config file for purifying CSS

```html
<!-- now purify css knows not to remove it -->
<div class="some-state-class"></div>
```

**JavaScript:** 4 open sourced utility plugins were written ([Reframe.js](https://github.com/dollarshaveclub/reframe.js), [Shave](https://github.com/dollarshaveclub/shave), [ScrollDir](https://github.com/dollarshaveclub/scrolldir), and [Stickbits](https://github.com/dollarshaveclub/stickybits)) while making this project along with jQuery but little else to ensure that the resulting JavaScript is lightweight.

## The site must be searchable

To make the site more searchable, we made sure to use as much modern HTML as possible. We also used [schema.org](http://schema.org/).

#### Example of using semantic HTML and schema.org to clarify what objects are on the content site

```html
<article
  class="post post--card style-card-hover"
  itemscope
  itemType="http://schema.org/Article"
>
  <a href="/{{url}}" data-track-label="posts image: {{title}}" itemprop="url">
    <figure
      class="post__figure--card js-image-preload"
      itemscope
      itemtype="http://schema.org/ImageObject"
    >
      <img
        class="post__image post__image--card"
        title="{{title}}"
        src="{{media.small}}"
        alt="{{title}}"
        itemprop="contentURL"
      />
    </figure>
  </a>
  <div class="post__content--card">
    <a href="/{{url}}" data-track-label="posts title: {{title}}" itemprop="url">
      <time class="text__date text--grey" itemprop="datePublished"
        >{{formatted_date}}</time
      >
      <h3
        class="post__title--medium post__title--card text__title--medium"
        itemprop="headline"
      >
        <span class="post__inline-text js-shave-card">{{title}}</span>
      </h3>
    </a>
  </div>
</article>
```

Check out the final product [here](https://content.dollarshaveclub.com).
