import React, { useContext, useState, useEffect, lazy, Suspense, Component } from "react";
import Head from "next/head";
import { getSinglePost, getAllPosts, markdownToHtml } from "../utils";
import { GlobalState } from "./_app";
import { Share } from "../components/Share";
import { useCodeBlocks } from "../hooks/useCodeBlocks";

const THEME_DARK = "https://yowainwright.imgix.net/jeffry.in.giscus.dark.css";
const THEME_LIGHT = "https://yowainwright.imgix.net/jeffry.in.giscus.light.css";

interface PostProps {
  content: string;
  slug: string;
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

// Lazy load Giscus component with proper error handling
let GiscusComponent: any;

if (typeof window !== 'undefined') {
  GiscusComponent = lazy(() => 
    import("@giscus/react")
      .then(module => ({
        default: module.default || module.Giscus || module
      }))
      .catch(err => {
        console.error('Failed to load Giscus:', err);
        return { default: GiscusErrorFallback };
      })
  );
} else {
  // Server-side fallback
  GiscusComponent = () => null;
}

const GiscusWrapper = ({ isDarkMode }: GiscusWrapperProps) => {
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const theme = isDarkMode ? THEME_DARK : THEME_LIGHT;
  
  useEffect(() => {
    const userWantsAutoLoadComments = localStorage.getItem('jeffry-in-comments-autoload-enabled');
    const lastCommentViewedPath = localStorage.getItem('jeffry-in-last-comment-viewed-path');
    const currentPath = window.location.pathname;
    
    const shouldAutoLoad = userWantsAutoLoadComments === 'true' && 
                          lastCommentViewedPath === currentPath;
    
    if (shouldAutoLoad) {
      setIsInView(true);
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      
      const element = document.querySelector('.post__giscus');
      if (element) observer.observe(element);
      
      return () => observer.disconnect();
    }
  }, []);
  
  useEffect(() => {
    if (isInView) {
      localStorage.setItem('jeffry-in-comments-autoload-enabled', 'true');
      localStorage.setItem('jeffry-in-last-comment-viewed-path', window.location.pathname);
      localStorage.setItem('jeffry-in-comments-last-loaded-timestamp', Date.now().toString());
    }
  }, [isInView]);
  
  if (hasError) return <GiscusErrorFallback />;
  
  if (!isInView) {
    return (
      <div className="giscus-placeholder">
        <button 
          onClick={() => {
            setIsInView(true);
            localStorage.setItem('jeffry-in-comments-autoload-enabled', 'true');
            localStorage.setItem('jeffry-in-last-comment-viewed-path', window.location.pathname);
          }}
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
        <Suspense fallback={<GiscusLoadingFallback />}>
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
            loading="lazy"
            inputPosition="top"
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const Post = ({ content, frontmatter, slug }: PostProps) => {
  const state = useContext(GlobalState);
  useCodeBlocks();
  
  const description = frontmatter?.description || frontmatter?.meta || "";
  const title = frontmatter?.title || "";
  
  return (
    <>
      <Head>
        <title>{title} | Jeffry.in</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://jeffry.in/${slug}`} />
      </Head>
      <article className="post__article">
      <header className="post__header">
        <h1>{frontmatter?.title}</h1>
        <DateText date={frontmatter?.date} slug={slug} />
      </header>
      <section className="post__section">
        <div className="post__container">
          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="post__giscus">
            <GiscusWrapper isDarkMode={state?.isDarkMode || false} />
          </div>
        </div>
        <aside className="aside">
          <div className="aside__meta">
            <header className="aside__header">
              <h3 className="aside__title">{frontmatter?.title}</h3>
            </header>
            <Share path={frontmatter?.path} />
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
  const content = await markdownToHtml(data.content || "");
  return {
    props: { ...data, content },
  };
};

export default Post;
