import React, { useContext, useState, useEffect, Component } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getSinglePost, getAllPosts, markdownToHtml } from "../utils";
import { GlobalState } from "./_app";
import { Share } from "../components/Share";
import { useCodeBlocks } from "../hooks/useCodeBlocks";
import { useHeadingAnchors } from "../hooks/useHeadingAnchors";
import { useScrollDepth, useReadTime } from "../hooks/useAnalytics";
import { trackView } from "../lib/analytics-firebase";
import { InlineSource, SectionSources } from "../components/citations";
import { RiseAndFallChart, GlobalGrowthChart, WageStagnationChart, IndustrialRevolutionChart, SWEMetricsGrid } from "../components/swe-econ-25";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";

interface PostProps {
  content?: string;
  mdxSource?: MDXRemoteSerializeResult;
  slug: string;
  isMdx: boolean;
  wordCount: number;
  frontmatter: {
    date: string;
    title: string;
    meta?: string;
    description?: string;
    path: string;
  };
}

interface GiscusWrapperProps {
  isDarkMode: boolean;
}

const GiscusErrorFallback = () => (
  <div className="giscus-error">
    <p>Unable to load comments at this time.</p>
    <button onClick={() => window.location.reload()} className="giscus-error__retry">
      Retry
    </button>
  </div>
);

class ErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Giscus loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <GiscusErrorFallback />;
    }

    return this.props.children;
  }
}

const GiscusLoadingFallback = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(true), 200);
    return () => clearTimeout(timer);
  }, []);
  
  if (!showSkeleton) return null;
  
  return (
    <div className="giscus-loading">
      <div className="giscus-loading__skeleton">
        <div className="giscus-loading__header"></div>
        <div className="giscus-loading__body"></div>
      </div>
    </div>
  );
};

const GiscusComponent = dynamic(
  () => import("@giscus/react"),
  { 
    ssr: false,
    loading: () => <GiscusLoadingFallback />
  }
);

const GiscusWrapper = ({ isDarkMode }: GiscusWrapperProps) => {
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const theme = isDarkMode ? THEME_DARK : THEME_LIGHT;

  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem('jeffry-in-comments-autoload-enabled') === 'true';

    if (hasLoadedBefore) {
      setIsInView(true);
      return;
    }

    const handleLoadGiscus = () => setIsInView(true);
    window.addEventListener('load-giscus', handleLoadGiscus);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    const element = document.querySelector('.post__giscus');
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener('load-giscus', handleLoadGiscus);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      localStorage.setItem('jeffry-in-comments-autoload-enabled', 'true');
    }
  }, [isInView]);
  
  if (hasError) return <GiscusErrorFallback />;
  
  if (!isInView) {
    return (
      <div className="giscus-placeholder">
        <button
          onClick={() => setIsInView(true)}
          className="giscus-placeholder__button"
        >
          Load Comments
        </button>
      </div>
    );
  }
  
  return (
    <div className="giscus-container">
      <ErrorBoundary>
        <GiscusComponent
            repo="yowainwright/yowainwright.github.io"
            repoId="MDEwOlJlcG9zaXRvcnkxNzA5MTY4Mg=="
            category="General"
            categoryId="DIC_kwDOAQTMYs4COQJE"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            theme={theme}
            lang="en"
            inputPosition="top"
          />
      </ErrorBoundary>
    </div>
  );
};

const mdxComponents = {
  InlineSource,
  SectionSources,
  RiseAndFallChart,
  GlobalGrowthChart,
  WageStagnationChart,
  IndustrialRevolutionChart,
  SWEMetricsGrid,
};

const Post = ({ content, mdxSource, frontmatter, slug, isMdx, wordCount }: PostProps) => {
  const state = useContext(GlobalState);
  useCodeBlocks();
  useHeadingAnchors();
  useScrollDepth();
  const estimatedReadTime = useReadTime(wordCount);

  useEffect(() => {
    trackView(slug);
  }, [slug]);

  const description = frontmatter?.description || frontmatter?.meta || "";
  const title = frontmatter?.title || "";

  return (
    <>
      <Head>
        <title>{`${title} | Jeffry.in`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://jeffry.in/${slug}`} />
      </Head>
      <article className="post__article">
      <header className="post__header">
        <h1>{frontmatter?.title}</h1>
        <div className="post__meta">
          <DateText date={frontmatter?.date} slug={slug} />
          {estimatedReadTime > 0 && (
            <span className="post__read-time">{estimatedReadTime} min read</span>
          )}
        </div>
      </header>
      <section className="post__section">
        <div className="post__container">
          {isMdx && mdxSource ? (
            <div className="post__content">
              <MDXRemote {...mdxSource} components={mdxComponents} />
            </div>
          ) : (
            <div
              className="post__content"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            />
          )}
          <div className="post__giscus">
            <GiscusWrapper isDarkMode={state?.isDarkMode || false} />
          </div>
        </div>
        <aside className="aside">
          <div className="aside__meta">
            <header className="aside__header">
              <h3 className="aside__title">{frontmatter?.title}</h3>
            </header>
            <Share path={frontmatter?.path} slug={slug} />
          </div>
        </aside>
      </section>
    </article>
    </>
  );
};

export type DateTextProps = {
  date: string;
  slug: string;
};

export const DateText = ({ date, slug }: DateTextProps) => {
  const isExcludedDate = ["about", "resume"].includes(slug);
  if (isExcludedDate) return null;
  return <time className="post__time">{date}</time>;
};

export function getStaticPaths() {
  const paths = getAllPosts("content").map(({ slug }: any) => `/${slug}`);
  return {
    paths,
    fallback: false,
  };
}

interface StaticProps {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: StaticProps) => {
  const data = getSinglePost(params.slug, "content");
  const wordCount = (data.content || "").split(/\s+/).filter(Boolean).length;

  if (data.isMdx) {
    const mdxSource = await serialize(data.content || "");
    return {
      props: { ...data, mdxSource, content: null, wordCount },
    };
  }

  const content = await markdownToHtml(data.content || "");
  return {
    props: { ...data, content, mdxSource: null, wordCount },
  };
};

export default Post;
