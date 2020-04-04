import React, { Component } from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { BasicPost } from '../components/post/basic';

export const PostsRow = ({ posts }) =>
  posts.map(({ node: { frontmatter } }, i) => {
    if (i > 7) return;
    const { date, meta, path, title } = frontmatter;
    if (['/404/', '/about', '/about/'].includes(path)) return;
    return (
      <BasicPost
        key={i}
        date={date}
        description={meta}
        path={path}
        title={title}
      />
    );
  });

export default class BlogIndex extends Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const title = 'Jeffry.in';
    const description =
      'Jeffry.in is the blog of Jeffry Wainwright, an engineer living in California.';
    return (
      <Layout>
        <main className="main">
          <Helmet title={title}>
            <meta
              name="twitter:description"
              property="og:description"
              content={description}
            />
            <link rel="canonical" href="https://jeffry.in" itemProp="url" />
            <meta
              name="twitter:url"
              property="og:url"
              content="https://jeffry.in"
            />
            <meta name="twitter:title" property="og:title" content={title} />
          </Helmet>
          <div className="posts--basic">
            <PostsRow posts={posts} />
          </div>
        </main>
      </Layout>
    );
  }
}

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
            date(formatString: "MMMM DD, YYYY")
            featured_image
            path
            meta
            title
          }
        }
      }
    }
  }
`;
