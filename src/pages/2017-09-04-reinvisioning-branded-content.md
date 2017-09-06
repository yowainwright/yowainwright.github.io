---
title: Reinvisioning branded content
date: "2017-09-04"
layout: post
readNext: "/"
path: "/branded-content/"
meta: Reinvisioning branded content at Dollar Shave Club
featured_image: null
share_image: null
categories:
- note
- story
---

**Draft:** Over a year ago, I was given the opportunity to work with a team to design and develop branded content for Dollar Shave Club. [Dollar Shave Club](https://www.dollarshaveclub.com) and it's affiliated company, [Mel](https://melmagazine.com/) had been producing high quality content along with beautiful art for approximately 2 years before under [Josh Schollmeyer](https://www.linkedin.com/in/jschollmeyer/). This post will summarize the experience and then go into more of my workspace—engineering.


To build a site that would be able to come close to the already set content, I was brought on under [Darshit Desai](https://www.linkedin.com/in/darshitdesai/) to work with him and other team members—[Erin Tag](https://www.linkedin.com/in/erin-taj-12596946/), Nick Lefty, [Donny Smith](https://www.linkedin.com/in/donnysmith/), [Justin Berg](https://www.linkedin.com/in/justin-berg-93722b2/), [Arvind Mishra](https://www.linkedin.com/in/arvindmishra1/), and [Melissa Williams](https://www.linkedin.com/in/melwilms/).


\* More images and updated to be added later for this post.

----

Branded content is not new conceptually. We were tasked with figuring out how to do it differently while creating something that was additive to the great content already being made at Dollar Shave Club. On top of that, our interface and to be normal so that writers could keep adding there content with ease.

## Sometimes it _is_ just Black and White

We spent time, refining out look and answering questions that would have to last for a long period to come. What would be our design style? Could we create something that would allow the experience of each article feel like it's own? How could we insure that our content seemed like the good read it was/is and not like _just branded content_?

After about 6 months of prototyping and developing designs we came to a few conclusions. We should have a simple palette of mainly blacks, greys, and whites to let imagery and articles stand out. We should being everything modularly so that we can more quickly add features. For the CMS for editing, we went with Wordpress so that writer would work with something that most were used to. The front end itself was separated using Wordpresses API. 

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


**Less Fonts:** We decreased the number of fonts used by computing some fonts using the `font-weight: bold` css property on fonts that were using a normal weight. 

#### Computing a bold font to save on fonts used

```

.font {
  font: a-font-family 400 1rem;
  &--bold {
    font-weight: bold;
  }
}

```

**Cleaning up css:**[Purify CSS](https://github.com/purifycss/purifycss) is used along with a config to makes that styles added via wordpress are there but nothing more. There are very few unused styles on the site. 

### Troubleshooting state css classes by adding a .config file for purify css

```
&lt;!-- now purify css knows not to remove it --&gt;
&lt;div class="some-state-class"&gt;&lt;/div&gt;
```

**JavaScript:** 4 open sourced utility plugins were written ([Reframe.js](https://github.com/dollarshaveclub/reframe.js), [Shave](https://github.com/dollarshaveclub/shave), [ScrollDir](https://github.com/dollarshaveclub/scrolldir), and [Stickbits](https://github.com/dollarshaveclub/stickybits)) while making this project along with jQuery but little else to ensure that the resulting JavaScript is lightweight.

## The site must be searchable 

To make the site more searchable, we made sure to use as much modern html as possible. We also used [schema.org](http://schema.org/).

#### Example of using semantic html and schema.org to clarify what objects are on the content site

```
&lt;article class="post post--card style-card-hover" itemscope itemType="http://schema.org/Article"&gt;
  &lt;a href="/{{url}}" data-track-label="posts image: {{title}}" itemprop="url"&gt;
    &lt;figure class="post__figure--card js-image-preload" itemscope itemtype="http://schema.org/ImageObject"&gt;
      &lt;img class="post__image post__image--card" title="{{title}}" src="{{media.small}}" alt="{{title}}" itemprop="contentURL" /&gt;
    &lt;/figure&gt;
  &lt;/a&gt;
  &lt;div class="post__content--card"&gt;
    &lt;a href="/{{url}}" data-track-label="posts title: {{title}}" itemprop="url"&gt;
      &lt;time class="text__date text--grey" itemprop="datePublished"&gt;{{formatted_date}}&lt;/time&gt;
      &lt;h3 class="post__title--medium post__title--card text__title--medium" itemprop="headline"&gt;
        &lt;span class="post__inline-text js-shave-card"&gt;{{title}}&lt;/span&gt;
      &lt;/h3&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/article&gt;
```

