"use client";

import React from "react";

type CitationLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const getTextContent = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return String(children);
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }

  if (React.isValidElement(children)) {
    return getTextContent((children.props as { children?: React.ReactNode }).children);
  }

  return "";
};

export const isCitationLink = (children: React.ReactNode) =>
  /^\d+$/.test(getTextContent(children).trim());

export const CitationLink = ({
  children,
  className,
  href,
  rel,
  target,
  ...props
}: CitationLinkProps) => {
  const plainLink = (
    <a href={href} rel={rel} target={target} className={className} {...props}>
      {children}
    </a>
  );

  if (!href) return plainLink;

  const isCitation = isCitationLink(children);
  if (!isCitation) return plainLink;

  const citationNumber = getTextContent(children).trim();

  return (
    <sup className="citation">
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={["citation__link", className].filter(Boolean).join(" ")}
        {...props}
      >
        [{citationNumber}]
      </a>
    </sup>
  );
};
