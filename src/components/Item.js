import React from "react"

/*
  Item 📒
  ----
  The Item Component is a used within a section or page that contains multiple articles (otherwise called posts)
  The Item Component is very similar to the Article component but is not as fully featured
  Unlike the Article Component, the Item Component
  -  does not take in page `featured_image`
  -  does not take in a `description`
*/
class Item extends React.Component {
  render() {
    return (
      const title = get(post, "node.frontmatter.title") || post.node.path
      const date = get(post, "node.frontmatter.date ") || post.node.date
      const path = get(post, "node.frontmatter.path") || post.node.path
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

export default Item
