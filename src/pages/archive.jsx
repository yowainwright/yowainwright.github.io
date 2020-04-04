import React, { Component } from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { SquarePost } from "../components/post/square";

export const Archive = props => {
  const posts = get(this, "props.data.allMarkdownRemark.edges");
  const title = "Archive | Jeffry.in";

  return (
    <Layout>
      <main className="main">
        <Helmet title={title}>
          <meta
            name="twitter:description"
            property="og:description"
            content="A full list of blog posts written by Jeffry Wainwright, a human person who enjoys building software, open source, being outside, and trying to live life with purpose."
          />
          <link
            rel="canonical"
            href="https://jeffry.in/archive/"
            itemProp="url"
          />
          <meta
            name="twitter:url"
            property="og:url"
            content="https://jeffry.in/archive/"
          />
          <meta name="twitter:title" property="og:title" content={`${title}`} />
        </Helmet>
        <div className="posts--squares">
          {posts.map((post, i) => {
            const pNode = post.node;
            const path = get(post, "node.frontmatter.path") || pNode.path;
            if (path === "/404/" || path === "/about" || path === "/about/")
              return null;
            const title = get(post, "node.frontmatter.title") || pNode.title;
            const date = get(post, "node.frontmatter.date") || pNode.date;
            return <SquarePost date={date} path={path} title={title} key={i} />;
          })}
        </div>
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ArchiveQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YY")
            path
            meta
            title
          }
        }
      }
    }
  }
`;
