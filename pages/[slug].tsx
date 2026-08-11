import React, { useContext, useState, useEffect, Component } from "react";
import dynamic from "next/dynamic";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { GlobalState } from "./_app";
import { Share } from "../lib/components/Share";
import { OgMeta } from "../lib/components/OgMeta";
import { useCodeBlocks } from "../lib/hooks/useCodeBlocks";
import { useHeadingAnchors } from "../lib/hooks/useHeadingAnchors";
import { useScrollDepth, useReadTime } from "../lib/hooks/useAnalytics";
import { scheduleIdleTask } from "../lib/client/idle";
import { CitationLink, InlineSource, SectionSources } from "../lib/components/citations";
import {
  buildPostStaticPaths,
  buildPostStaticProps,
  type PostPageProps,
} from "../lib/server/post-page";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";

const RiseAndFallChart = dynamic(
  () => import("../lib/components/content/us-swe-economy-2025").then((mod) => mod.RiseAndFallChart),
  { ssr: false },
);
const GlobalGrowthChart = dynamic(
  () =>
    import("../lib/components/content/us-swe-economy-2025").then((mod) => mod.GlobalGrowthChart),
  { ssr: false },
);
const WageStagnationChart = dynamic(
  () =>
    import("../lib/components/content/us-swe-economy-2025").then((mod) => mod.WageStagnationChart),
  { ssr: false },
);
const IndustrialRevolutionChart = dynamic(
  () =>
    import("../lib/components/content/us-swe-economy-2025").then(
      (mod) => mod.IndustrialRevolutionChart,
    ),
  { ssr: false },
);
const SWEMetricsGrid = dynamic(
  () => import("../lib/components/content/us-swe-economy-2025").then((mod) => mod.SWEMetricsGrid),
  { ssr: false },
);
const TokenCostChart = dynamic(
  () => import("../lib/components/content/expensive-ai").then((mod) => mod.TokenCostChart),
  { ssr: false },
);
const AgentTaskCostChart = dynamic(
  () => import("../lib/components/content/expensive-ai").then((mod) => mod.AgentTaskCostChart),
  { ssr: false },
);
const ProjectCostComparisonChart = dynamic(
  () =>
    import("../lib/components/content/expensive-ai").then((mod) => mod.ProjectCostComparisonChart),
  { ssr: false },
);
const TokenCostCalculator = dynamic(
  () => import("../lib/components/content/expensive-ai").then((mod) => mod.TokenCostCalculator),
  { ssr: false },
);
const PastoralistStudyCharts = dynamic(
  () =>
    import("../lib/components/content/why-pastoralist").then((mod) => mod.PastoralistStudyCharts),
  { ssr: false },
);
const PostTable = dynamic(() => import("../lib/components/PostTable"));

type PostProps = PostPageProps;

interface GiscusWrapperProps {
  isDarkMode: boolean;
}

type PostContentBodyProps = {
  content?: string | null;
  isMdx: boolean;
  mdxSource?: MDXRemoteSerializeResult | null;
  setContentElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const trackPostView = async (slug: string) => {
  const analytics = await import("../lib/client/analytics");
  await analytics.trackView(slug);
};

const deferPostView = (slug: string) => scheduleIdleTask(() => void trackPostView(slug));

const observeStickyAside = () => {
  const aside = document.querySelector(".aside");
  const postHeader = document.querySelector(".post__header");
  const isMissingStickyElement = !aside || !postHeader;
  if (isMissingStickyElement) return;

  const updateStickyState: IntersectionObserverCallback = ([entry]) => {
    if (!entry) return;
    aside.classList.toggle("is-sticky", !entry.isIntersecting);
  };
  const observer = new IntersectionObserver(updateStickyState, {
    rootMargin: "-100px 0px 0px",
  });
  observer.observe(postHeader);
  return () => observer.disconnect();
};

const GiscusErrorFallback = () => (
  <div className="giscus-error">
    <p>Unable to load comments at this time.</p>
    <button onClick={() => window.location.reload()} className="giscus-error__retry">
      Retry
    </button>
  </div>
);

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    import("@sentry/nextjs").then((Sentry) => {
      Sentry.captureException(error, {
        extra: { componentStack: errorInfo.componentStack },
      });
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
    const hasLoadedBefore = localStorage.getItem("jeffry-in-comments-autoload-enabled") === "true";

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
        <button onClick={() => setIsInView(true)} className="giscus-placeholder__button">
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

const PostImage = ({
  className,
  decoding,
  loading,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const imageClassName = ["post__image", className].filter(Boolean).join(" ");
  const decodingMode = decoding || "async";
  const loadingMode = loading || "lazy";

  return (
    <img {...props} className={imageClassName} decoding={decodingMode} loading={loadingMode} />
  );
};

const mdxComponents = {
  a: CitationLink,
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
  PastoralistStudyCharts,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="post__code" {...props} />,
  img: PostImage,
  table: PostTable,
  figure: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <figure {...props}>
      {typeof children === "string" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: children.replace(/<img /g, '<img class="post__image" '),
          }}
        />
      ) : (
        children
      )}
    </figure>
  ),
};

const PostContentBody = React.memo(
  ({ content, isMdx, mdxSource, setContentElement }: PostContentBodyProps) =>
    isMdx && mdxSource ? (
      <div className="post__content" ref={setContentElement}>
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </div>
    ) : (
      <div
        className="post__content"
        ref={setContentElement}
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    ),
);
PostContentBody.displayName = "PostContentBody";

const Post = ({
  content,
  mdxSource,
  frontmatter,
  slug,
  isMdx,
  ogImagePath,
  wordCount,
}: PostProps) => {
  const state = useContext(GlobalState);
  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null);
  const codeBlockControls = useCodeBlocks(slug, contentElement);
  const headingAnchorControls = useHeadingAnchors(slug, contentElement);
  useScrollDepth();
  const estimatedReadTime = useReadTime(wordCount);

  useEffect(() => deferPostView(slug), [slug]);
  useEffect(observeStickyAside, []);

  const description = frontmatter?.description || frontmatter?.meta || "";
  const title = frontmatter?.title || "";

  return (
    <>
      <OgMeta
        title={title}
        description={description}
        slug={slug}
        imagePath={ogImagePath}
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
              <span className="post__read-time">{estimatedReadTime} min read</span>
            )}
          </div>
        </header>
        <section className="post__section">
          <div className="post__container">
            <PostContentBody
              content={content}
              isMdx={isMdx}
              mdxSource={mdxSource}
              setContentElement={setContentElement}
            />
            {codeBlockControls}
            {headingAnchorControls}
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
  return buildPostStaticPaths("content");
}

interface StaticProps {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: StaticProps) => {
  return buildPostStaticProps(params.slug, "content");
};

export default Post;
