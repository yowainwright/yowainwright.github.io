import React from "react";
import Link from "next/link";

export const PostHeader = ({ title = "", path = "", date = "" }) => (
  <header>
    <h2>
      <Link href={path}>{title}</Link>
    </h2>
    <time>{date}</time>
  </header>
);

export default PostHeader;
