import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ShareProps } from "../types";
import { scheduleIdleTask } from "../client/idle";
import { PixelIcon } from "./PixelIcon";

const HeartButton = dynamic(() => import("./HeartButton").then((module) => module.HeartButton), {
  ssr: false,
});

const trackShare = async (slug: string) => {
  const analytics = await import("../client/analytics");
  await analytics.trackShare(slug);
};

const trackComment = async (slug: string) => {
  const analytics = await import("../client/analytics");
  await analytics.trackComment(slug);
};

const DeferredHeartButton = ({ slug }: { slug: string }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => scheduleIdleTask(() => setIsReady(true)), []);

  if (!isReady) {
    return (
      <button className="share__button heart-button" aria-label="Love this post">
        <span className="share__label">Love</span>
        <PixelIcon name="heart" size={2} />
      </button>
    );
  }

  return <HeartButton slug={slug} />;
};

export const Share = ({ path, url = "https://jeffry.in", slug }: ShareProps) => {
  const shareLinkText = "Share";
  const copied = "Copied!";
  const [copyText, setCopyText] = useState(shareLinkText);
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${url}${path}`;

  useEffect(() => {
    const shouldResetCopyText = !isCopied && copyText !== shareLinkText;
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (shouldResetCopyText) {
      setCopyText(shareLinkText);
    }
  }, [copyText, isCopied, setIsCopied, setCopyText, shareLinkText]);

  const onBtnClick = () => {
    copyToClipboard(shareUrl);
    setIsCopied(true);
    setCopyText(copied);
    if (slug) {
      void trackShare(slug);
    }
  };

  const onCommentClick = () => {
    window.dispatchEvent(new CustomEvent("load-giscus"));
    const giscusElement = document.querySelector(".post__giscus");
    if (giscusElement) {
      giscusElement.scrollIntoView({ behavior: "smooth" });
    }
    if (slug) {
      void trackComment(slug);
    }
  };

  return (
    <section className="share">
      <nav className="share__nav">
        <button className="share__button" onClick={onBtnClick}>
          <span className="share__label">{copyText}</span>
          <PixelIcon name="link" size={2} />
        </button>
        <button className="share__button" onClick={onCommentClick}>
          <span className="share__label">Comment</span>
          <PixelIcon name="comment" size={2} />
        </button>
        {slug && <DeferredHeartButton slug={slug} />}
      </nav>
    </section>
  );
};

export const copyToClipboard = async (str: string): Promise<boolean> => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(str);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};
