import React, { useContext, useState, useEffect, Component } from "react";
import dynamic from "next/dynamic";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getSinglePost, getAllPosts, markdownToHtml } from "../utils";
import { GlobalState } from "./_app";
import { Share } from "../components/Share";
import { OgMeta } from "../components/OgMeta";
import { useCodeBlocks } from "../hooks/useCodeBlocks";
import { useHeadingAnchors } from "../hooks/useHeadingAnchors";
import { useScrollDepth, useReadTime } from "../hooks/useAnalytics";
import { withMermaidCharts } from "../hooks/useMermaidCharts";
import { trackView } from "../lib/analytics-firebase";
import { InlineSource, SectionSources } from "../components/citations";
import {
  RiseAndFallChart,
  GlobalGrowthChart,
  WageStagnationChart,
  IndustrialRevolutionChart,
  SWEMetricsGrid,
} from "../components/swe-econ-25";
import {
  TokenCostChart,
  AgentTaskCostChart,
  ProjectCostComparisonChart,
  TokenCostCalculator,
} from "../components/ai-cost-charts";

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
    tags?: string[];
  };
}

interface GiscusWrapperProps {
  isDarkMode: boolean;
}

const GiscusErrorFallback = () => (
  <div className="giscus-error">
    <p>Unable to load comments at this time.</p>
    <button
      onClick={() => window.location.reload()}
      className="giscus-error__retry"
    >
      Retry
    </button>
  </div>
);

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    import("@sentry/nextjs").then((Sentry) => {
      Sentry.captureException(error, { extra: errorInfo });
    });
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

const GiscusComponent = dynamic(() => import("@giscus/react"), {
  ssr: false,
  loading: () => <GiscusLoadingFallback />,
});

const GiscusWrapper = ({ isDarkMode }: GiscusWrapperProps) => {
  const [hasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const theme = isDarkMode ? THEME_DARK : THEME_LIGHT;

  useEffect(() => {
    const hasLoadedBefore =
      localStorage.getItem("jeffry-in-comments-autoload-enabled") === "true";

    if (hasLoadedBefore) {
      setIsInView(true);
      return;
    }

    const handleLoadGiscus = () => setIsInView(true);
    window.addEventListener("load-giscus", handleLoadGiscus);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    const element = document.querySelector(".post__giscus");
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("load-giscus", handleLoadGiscus);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      localStorage.setItem("jeffry-in-comments-autoload-enabled", "true");
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
  TokenCostChart,
  AgentTaskCostChart,
  ProjectCostComparisonChart,
  TokenCostCalculator,
};

const Post = ({
  content,
  mdxSource,
  frontmatter,
  slug,
  isMdx,
  wordCount,
}: PostProps) => {
  const state = useContext(GlobalState);
  useCodeBlocks();
  useHeadingAnchors();
  useScrollDepth();
  const estimatedReadTime = useReadTime(wordCount);

  useEffect(() => {
    trackView(slug);
  }, [slug]);

  useEffect(() => {
    const aside = document.querySelector(".aside");
    const postSection = document.querySelector(".post__section");
    if (!aside || !postSection) return;

    const handleScroll = () => {
      const sectionTop = postSection.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        aside.classList.add("is-sticky");
      } else {
        aside.classList.remove("is-sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const description = frontmatter?.description || frontmatter?.meta || "";
  const title = frontmatter?.title || "";

  return (
    <>
      <OgMeta
        title={title}
        description={description}
        slug={slug}
        date={frontmatter?.date || ""}
        tags={frontmatter?.tags}
        wordCount={wordCount}
      />
      <article className="post__article">
        <header className="post__header">
          <h1>{frontmatter?.title}</h1>
          <div className="post__meta">
            <DateText date={frontmatter?.date} slug={slug} />
            {estimatedReadTime > 0 && (
              <span className="post__read-time">
                {estimatedReadTime} min read
              </span>
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
                dangerouslySetInnerHTML={{ __html: content || "" }}
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
    const remarkMermaidjs = (await import('remark-mermaidjs')).default;
    const mdxSource = await serialize(data.content || "", {
      mdxOptions: {
        remarkPlugins: [
          [remarkMermaidjs, {
            theme: 'base',
            themeVariables: {
              primaryColor: '#f2f2f2',
              primaryTextColor: '#000000',
              primaryBorderColor: '#0000ff',
              lineColor: '#0000ff',
              secondaryColor: '#f9f9f9',
              tertiaryColor: '#ffffff',
              background: '#ffffff',
              mainBkg: '#f2f2f2',
              secondBkg: '#f9f9f9',
              tertiaryBkg: '#ffffff',
              nodeBorder: '#0000ff',
              clusterBkg: '#f9f9f9',
              clusterBorder: '#999999',
              defaultLinkColor: '#0000ff',
              titleColor: '#000000',
              edgeLabelBackground: '#ffffff'
            }
          }]
        ],
        rehypePlugins: [],
      },
    });
    return {
      props: { ...data, mdxSource, content: null, wordCount },
    };
  }

  const content = await markdownToHtml(data.content || "");
  return {
    props: { ...data, content, mdxSource: null, wordCount },
  };
};

export default withMermaidCharts(Post);
