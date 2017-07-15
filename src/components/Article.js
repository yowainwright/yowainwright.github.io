import React from "react"

/*
  Article 📒
  ----
  The Article Component is a used within a section or page that contains multiple articles (otherwise called posts)

*/
class Article extends React.Component {
  render() {
    return (
      const title = get(post, "node.frontmatter.title") || post.node.path
      const date = get(post, "node.frontmatter.date ") || post.node.date
      const path = get(post, "node.frontmatter.path") || post.node.path
      const image = get(post, "node.frontmatter.featured_image") || null
      const description = get(post, "node.frontmatter.description") || post.node.description
      <article class="post--article">
        ~
        {" "}
        <header class="post__header">
          ~
          {" "}
          <h2 class="post__title">
            ~
            {" "}
            <Link
              to={path}
            >
              {title}
            </Link>
          </h2>
          ~
          {" "}
          <time>{date}</time>
        </header>
        ~
        {" "}
        if (image) {
          <figure itemtype="http://schema.org/ImageObject">
            ~
            {" "}
            <Link to={path}>
              ~
              {" "}
              <img src="https://yowainwright.imgix.net{image}?w=1000&amp;h=1000&amp;fit=crop&amp;crop=focalpoint&amp;auto=format" alt="{title}" itemprop="contentURL">
            </Link>
          </figure>
        }
        ~
        {" "}
        <p>
          ~
          {" "}
          {description}
        </p>
        ~
        {" "}
        <hr>
      </article>
    )
  }
}

export default Article
