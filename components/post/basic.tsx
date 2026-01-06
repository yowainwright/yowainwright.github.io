import React from "react";
import PostHeader from "./header";
import Link from "next/link";

interface BasicPostProps {
  date?: string;
  description?: string;
  path?: string;
  title?: string;
}

export const BasicPost = ({
  date = "",
  description = "",
  path = "",
  title = "",
}: BasicPostProps) => (
  <article className="post--article">
    <PostHeader title={title} path={path} date={date} />
    <p>
      {description}&nbsp;
      <Link className="post__link--read-more" href={path}>
        &rarr;
      </Link>
    </p>
  </article>
);

export default BasicPost;
