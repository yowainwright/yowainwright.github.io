import React from "react";
import Link from "next/link";

interface PostHeaderProps {
  title?: string;
  path?: string;
  date?: string;
}

export const PostHeader = ({
  title = "",
  path = "",
  date = "",
}: PostHeaderProps) => (
  <header>
    <h2>
      <Link href={path}>{title}</Link>
    </h2>
    <time dateTime={date}>{date}</time>
  </header>
);

export default PostHeader;
