import React, { useEffect, useState } from "react";
import { ShareProps } from "../types";
import { HeartButton } from "./HeartButton";
import { PixelLink } from "./PixelLink";
import { PixelComment } from "./PixelComment";
import { trackShare, trackComment } from "../lib/analytics-firebase";

export const Share = ({ path, url = "https://jeffry.in", slug }: ShareProps) => {
  const shareLinkText = "Share";
  const copied = "Copied!";
  const [copyText, setCopyText] = useState(shareLinkText);
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${url}${path}`;

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isCopied && copyText !== shareLinkText) {
      setCopyText(shareLinkText);
    }
  }, [copyText, isCopied, setIsCopied, setCopyText, shareLinkText]);

  const onBtnClick = () => {
    copyToClipboard(shareUrl);
    setIsCopied(true);
    setCopyText(copied);
    if (slug) {
      trackShare(slug);
    }
  };

  const onCommentClick = () => {
    window.dispatchEvent(new CustomEvent('load-giscus'));
    const giscusElement = document.querySelector('.post__giscus');
    if (giscusElement) {
      giscusElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (slug) {
      trackComment(slug);
    }
  };

  return (
    <section className="share">
      <nav className="share__nav">
        <button className="share__button" onClick={onBtnClick}>
          <span className="share__label">{copyText}</span>
          <PixelLink size={2} />
        </button>
        <button className="share__button" onClick={onCommentClick}>
          <span className="share__label">Comment</span>
          <PixelComment size={2} />
        </button>
        {slug && <HeartButton slug={slug} />}
      </nav>
    </section>
  );
};

export const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
