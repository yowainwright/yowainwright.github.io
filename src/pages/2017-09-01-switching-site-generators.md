---
title: Switching Static Site Generators
date: "2017-09-01"
layout: post
readNext: "/"
path: "/switching-site-generators/"
meta: Switching Site Generators, hiccups in between, and why I switched to Gatsby
featured_image: null
share_image: null
categories:
- note
- story
---

**Draft:** In June 2017, I decided to switch from [Jekyll](https://jekyllrb.com/), a site generator built with Ruby to another site generator. Preferably, I wanted to choose a tool where I could learn while getting setting up. I planned the project to take a week. The project inevitably took 2 months of _fun work_ time. This post describes site generator learnings that I had in the Summer of 2017.

----

-  **Site Generator:** A site generator is a tool that takes text, CSS styles, and UI JavaScript (maybe) to make a web page without the _need_ of a server or a hosted environment to input text.

## New is not easier than the old standard—sorta

After many advancements in JavaScript and front end tooling, I thought generating a blog from a site generator would be easier than ever. When I've looked for a new site generator I saw new site generators all of the time. 

With modern tooling, building a site generator that works for 1 developer is easier than ever. However, new complexity falls on site generator users. They now must sift throw hundreds of site generators to choose one that works for them. The magic sauce is still being stirred there it seems. 

## So, Why Switch then?

I made the decision to switch site generators because Jekyll, after adding everything that I wanted, was getting more complex than I wanted for me. Jekyll did not fail me at all! I was just making it work in a ways that it wasn't necessarily meant for—i.e. features, like service workers, were making my Jekyll more custom than what I wanted to do with Jekyll.

## Site Generator Options I thought over

I considered 3 site generator tools before finally using Gatsby which I'm now using to generate this blog.

-  **[Hugo](https://gohugo.io/):** Hugo is a site generator that is compiled with go. It compiles very fast and has a lot of built in featuring. I've heard from other engineers that I've worked with that it is super fast to learn and build with
-  **[Phenomic](https://phenomic.io/):** Phenomic is a site generator that is compiled with JavaScript. It claims it focuses on the speed for the generated sites customers. It was initially scoped to work for React, then the API changed and it is being built to support Vue and Angular, I guess.
-  **[Gatsby](https://www.gatsbyjs.org/):** Gatsby was the first larger site generator build for templating with React. It has a mature API and it provides several usable features to improve the developer and customer experience. 

## Choosing a JavaScript site generator

Eventually, I choose to go with Static site generator so I could focus on some new tech featuring. My first decision was to go with Phenomic because of the amount it took to get my site 90% transfered over. I ended up going with Gatsby in the end though.

## Over-simplified APIs and magic

Getting started with Phenomic in late 2016—early 2017, I found that the API made getting setup pretty great. It was using BEM along with CSS Modules which—I was familiar with BEM. The React Components, which I had not really used react were well thought out. All of this allowed me to get hacking. I started a few projects with Phenomic and was about to move Jeffry.in over. 

In June, the Phenomic team, decided to abstract out more of the API out which made the setup time even faster unless or until I wanted to understand or modify what was going on. This is probably beneficial for a lot of customer/users that just wanted a static site. However, to me, the product suddenly seemed like magic which concerns me because I like to understand how products I use work. Also, although the new API got me 95% transferred to Phenomic very fast, the last 5% seemed hidden. This made it hard for me to contribute to Phenomic and it made the product not fun to use.

#### Phenomic simplified API

```
{
  "phenomic": {
    "presets": [
      "@phenomic/preset-react-app"
    ]
  }
}
```

## Going with Gatsby

In late June, I made the decision to check Gatsby: more engineers are using it than Phenomic, there is a lot of documentation, and they have a ton of starter site generators. 

I followed the documentation to get started. It was very straight forward for the most part. Where there were issues, there were Github issue where people were actively talking about the issue 100% of the time. 

### Challenges getting started

After getting my blog setup using the [Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog) I realized that I had to really work on the core code—[everything](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/src/layouts/index.js) was was happening in React's `render` [method](https://facebook.github.io/react/docs/rendering-elements.html). I also had to figure out how to get `<head>` content working as I had it [before](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/src/templates/blog-post.js#L16). 

#### Initial Gatsby Starter `BlogIndex Class` in `index.js /page` code

```
class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      &lt;div&gt;
        &lt;Helmet title={get(this, 'props.data.site.siteMetadata.title')} /&gt;
        &lt;Bio /&gt;
        {posts.map(post =&gt; {
```

#### Updated Gatsby Starter `BlogIndex Class` in `index.jsx /page` code

```
class BlogIndex extends Component {
  constructor(props) {
    super(props)
    this.title = 'Jeffry.in'
    this.posts = get(this, 'props.data.allMarkdownRemark.edges')
  }

  generatePostHeader(title, path, date) {
    return (
      &lt;header className="post__header"&gt;
        &lt;h2 className="post__title"&gt;&lt;Link to={path}&gt;{title}&lt;/Link&gt;&lt;/h2&gt;
        &lt;time&gt;{date}&lt;/time&gt;
      &lt;/header&gt;
    )
  }
  // `generatePostHeader()` is then generated within the `render()` method

```


### Pluses getting started

I greatly enjoyed that Gatsby's starter blog uses [GraphQL](http://graphql.org/). 

#### Updated Gatsby Starter `graphql` query in `index.jsx /page` code

```
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date
            featured_image
            path
            meta
            title
          }
        }
      }
    }
  }
`
```

The Gatsby interface also makes adding plugins very easy as well. Once, I understood how [React Helmet](https://github.com/nfl/react-helmet) could be leveraged, I was able to quickly get my blog up and running.

#### Helmet in `Head` component

```
&lt;Helmet&gt;
  &lt;meta name="robots" content="index,follow" /&gt;
  &lt;meta property="og:locale" content="en_US" /&gt;
  // more head stuff
```

#### The `Head` component is updated in the blog template 

```
 &lt;Helmet title={`${post.frontmatter.title} | Jeffry.in`}&gt;
```

## Initial Observations after changing to Gatsby

With all of the features that I was hoping to provide customers when switching site generators, I think Gatsby fulfills those features. Gatsby also compiles pretty fast compared to Jekyll after some of the new features I added to provide a better experience for my customers. There are still features to add and bugs to fix but I'm now able to build new posts faster than what I could with Jekyll before switching.
