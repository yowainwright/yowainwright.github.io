import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Component,
} from "react";
import dynamic from "next/dynamic";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ArrowDown, ArrowUp, ArrowUpDown, Maximize2, X } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  getSinglePost,
  getAllPosts,
  markdownToHtml,
  getShikiRehypeOptions,
} from "../lib/server/markdown";
import { ensureArray } from "../lib/client/utils";
import { GlobalState } from "./_app";
import { Share } from "../lib/components/Share";
import { OgMeta } from "../lib/components/OgMeta";
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_DIR,
} from "../lib/components/OgMeta/constants";
import { useCodeBlocks } from "../lib/hooks/useCodeBlocks";
import { useHeadingAnchors } from "../lib/hooks/useHeadingAnchors";
import { useScrollDepth, useReadTime } from "../lib/hooks/useAnalytics";
import { withMermaidCharts } from "../lib/hooks/useMermaidCharts";
import { trackView } from "../lib/client/analytics";
import { InlineSource, SectionSources } from "../lib/components/citations";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";

const RiseAndFallChart = dynamic(
  () =>
    import("../lib/components/content/us-swe-economy-2025").then(
      (mod) => mod.RiseAndFallChart,
    ),
  { ssr: false },
);
const GlobalGrowthChart = dynamic(
  () =>
    import("../lib/components/content/us-swe-economy-2025").then(
      (mod) => mod.GlobalGrowthChart,
    ),
  { ssr: false },
);
const WageStagnationChart = dynamic(
  () =>
    import("../lib/components/content/us-swe-economy-2025").then(
      (mod) => mod.WageStagnationChart,
    ),
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
  () =>
    import("../lib/components/content/us-swe-economy-2025").then(
      (mod) => mod.SWEMetricsGrid,
    ),
  { ssr: false },
);
const TokenCostChart = dynamic(
  () =>
    import("../lib/components/content/expensive-ai").then(
      (mod) => mod.TokenCostChart,
    ),
  { ssr: false },
);
const AgentTaskCostChart = dynamic(
  () =>
    import("../lib/components/content/expensive-ai").then(
      (mod) => mod.AgentTaskCostChart,
    ),
  { ssr: false },
);
const ProjectCostComparisonChart = dynamic(
  () =>
    import("../lib/components/content/expensive-ai").then(
      (mod) => mod.ProjectCostComparisonChart,
    ),
  { ssr: false },
);
const TokenCostCalculator = dynamic(
  () =>
    import("../lib/components/content/expensive-ai").then(
      (mod) => mod.TokenCostCalculator,
    ),
  { ssr: false },
);
const PastoralistStudyCharts = dynamic(
  () =>
    import("../lib/components/content/why-pastoralist").then(
      (mod) => mod.PastoralistStudyCharts,
    ),
  { ssr: false },
);

interface PostProps {
  content?: string;
  mdxSource?: MDXRemoteSerializeResult;
  slug: string;
  isMdx: boolean;
  ogImagePath: string;
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

type PostContentBodyProps = {
  content?: string;
  isMdx: boolean;
  mdxSource?: MDXRemoteSerializeResult;
  setContentElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

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
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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

type PostTableRow = {
  cells: React.ReactNode[];
  sortValues: string[];
};

type PostTableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  "data-title"?: string;
};

type TableElementProps = {
  align?: React.CSSProperties["textAlign"];
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

type PostTableColumnMeta = {
  align?: React.CSSProperties["textAlign"];
};

const getChildElements = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child)) return [];

    if (child.type === React.Fragment) {
      return getChildElements(
        (child.props as TableElementProps | undefined)?.children,
      );
    }

    return [child];
  });

const isElementTag = (element: React.ReactElement, tagName: string) =>
  typeof element.type === "string" && element.type === tagName;

const getCellAlign = (props: TableElementProps) =>
  props.align || props.style?.textAlign;

const getJustifyContent = (align?: React.CSSProperties["textAlign"]) => {
  if (align === "right") return "flex-end";
  if (align === "center") return "center";
  return "flex-start";
};

const getNodeText = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(" ");
  }

  if (React.isValidElement(node)) {
    return getNodeText((node.props as TableElementProps).children);
  }

  return "";
};

const getRowCells = (row: React.ReactElement, cellTagNames: string[]) =>
  getChildElements((row.props as TableElementProps).children)
    .filter((cell) =>
      cellTagNames.some((tagName) => isElementTag(cell, tagName)),
    )
    .map((cell) => {
      const props = cell.props as TableElementProps;
      return {
        align: getCellAlign(props),
        content: props.children,
      };
    });

const parseMdxTable = (children: React.ReactNode) => {
  const tableChildren = getChildElements(children);
  const headerSection = tableChildren.find((child) =>
    isElementTag(child, "thead"),
  );
  const bodySections = tableChildren.filter((child) =>
    isElementTag(child, "tbody"),
  );

  const headerRow = headerSection
    ? getChildElements((headerSection.props as TableElementProps).children).find(
        (child) => isElementTag(child, "tr"),
      )
    : undefined;
  const headers = headerRow ? getRowCells(headerRow, ["th", "td"]) : [];
  const bodyRows = bodySections.flatMap((section) =>
    getChildElements((section.props as TableElementProps).children).filter(
      (child) => isElementTag(child, "tr"),
    ),
  );
  const rows = bodyRows.map((row) => ({
    cells: getRowCells(row, ["td", "th"]).map((cell) => cell.content),
    sortValues: getRowCells(row, ["td", "th"]).map((cell) =>
      getNodeText(cell.content).trim(),
    ),
  }));

  return { headers, rows };
};

const PostTable = ({
  className,
  ...props
}: PostTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { children, "data-title": tableTitle, ...tableProps } = props;
  const tableClassName = ["post__table", className].filter(Boolean).join(" ");
  const parsedTable = useMemo(
    () => parseMdxTable(children),
    [children],
  );
  const columns = useMemo<ColumnDef<PostTableRow>[]>(
    () =>
      parsedTable.headers.map((header, index) => ({
        id: `column-${index}`,
        accessorFn: (row) => row.sortValues[index] || "",
        header: () => header.content,
        cell: ({ row }) => row.original.cells[index] || null,
        meta: { align: header.align },
      })),
    [parsedTable.headers],
  );
  const table = useReactTable({
    data: parsedTable.rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const renderTable = () => (
    <table {...tableProps} className={tableClassName}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta as PostTableColumnMeta;

              return (
                <th key={header.id} style={{ textAlign: meta?.align }}>
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      className="post__table-sort"
                      style={{
                        justifyContent: getJustifyContent(meta?.align),
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      {header.column.getIsSorted() === "asc" ? (
                        <ArrowUp size={14} aria-hidden="true" />
                      ) : null}
                      {header.column.getIsSorted() === "desc" ? (
                        <ArrowDown size={14} aria-hidden="true" />
                      ) : null}
                      {header.column.getIsSorted() ? null : (
                        <ArrowUpDown size={14} aria-hidden="true" />
                      )}
                    </button>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as PostTableColumnMeta;

              return (
                <td key={cell.id} style={{ textAlign: meta?.align }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  useEffect(() => {
    if (!isExpanded) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      <div className="post__table-wrapper">
        <div className="post__table-chrome">
          {tableTitle ? (
            <div className="post__table-title">{tableTitle}</div>
          ) : null}
          <button
            type="button"
            className="post__table-expand"
            aria-label="View larger table"
            title="View larger table"
            onClick={() => setIsExpanded(true)}
          >
            <Maximize2 size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="post__table-scroll">{renderTable()}</div>
      </div>
      {isExpanded ? (
        <div
          className="post__table-dialog"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="post__table-dialog-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="post__table-dialog-header">
              {tableTitle ? (
                <div className="post__table-dialog-title">{tableTitle}</div>
              ) : null}
              <button
                type="button"
                className="post__table-dialog-close"
                aria-label="Close table"
                title="Close table"
                onClick={() => setIsExpanded(false)}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="post__table-dialog-scroll">
              <div className="post__table-scroll">{renderTable()}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
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
  PastoralistStudyCharts,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="post__code" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className="post__image" {...props} />
  ),
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

type MdxAstNode = {
  attributes?: Array<{
    name?: string;
    type?: string;
    value?: unknown;
  }>;
  children?: MdxAstNode[];
  data?: {
    hProperties?: Record<string, unknown>;
  };
  name?: string;
  type?: string;
  value?: string;
};

const getMdxAstText = (node: MdxAstNode): string => {
  if (typeof node.value === "string") return node.value;
  if (!node.children) return "";

  return node.children.map(getMdxAstText).join("");
};

const hasMdxClassName = (node: MdxAstNode, className: string) =>
  node.attributes?.some(
    (attribute) =>
      attribute.name === "className" &&
      typeof attribute.value === "string" &&
      attribute.value.split(/\s+/).includes(className),
  ) || false;

const isMdxTableTitle = (node: MdxAstNode) =>
  node.type === "mdxJsxFlowElement" &&
  node.name === "p" &&
  hasMdxClassName(node, "post__table-title");

function remarkMdxTableTitles() {
  return (tree: MdxAstNode) => {
    if (!tree.children) return;

    const children: MdxAstNode[] = [];
    let pendingTitleNode: MdxAstNode | null = null;
    let pendingTitle = "";

    tree.children.forEach((node) => {
      if (isMdxTableTitle(node)) {
        if (pendingTitleNode) {
          children.push(pendingTitleNode);
        }

        pendingTitleNode = node;
        pendingTitle = getMdxAstText(node).trim();
        return;
      }

      if (pendingTitleNode && node.type === "table") {
        node.data = {
          ...node.data,
          hProperties: {
            ...node.data?.hProperties,
            "data-title": pendingTitle,
          },
        };
        pendingTitleNode = null;
        pendingTitle = "";
        children.push(node);
        return;
      }

      if (pendingTitleNode) {
        children.push(pendingTitleNode);
        pendingTitleNode = null;
        pendingTitle = "";
      }

      children.push(node);
    });

    if (pendingTitleNode) {
      children.push(pendingTitleNode);
    }

    tree.children = children;
  };
}

const PostContentBody = React.memo(
  ({
    content,
    isMdx,
    mdxSource,
    setContentElement,
  }: PostContentBodyProps) =>
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
  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(
    null,
  );
  const codeBlockControls = useCodeBlocks(slug, contentElement);
  const headingAnchorControls = useHeadingAnchors(slug, contentElement);
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
              <span className="post__read-time">
                {estimatedReadTime} min read
              </span>
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
  const paths = getAllPosts("content").map(({ slug }) => `/${slug}`);
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
  const fs = await import("node:fs");
  const path = await import("node:path");
  const candidateOgImagePath = `${OG_IMAGE_DIR}/${params.slug}/1.png`;
  const candidatePublicPath = path.join(
    process.cwd(),
    "public",
    candidateOgImagePath.replace(/^\//, ""),
  );
  const ogImagePath = fs.existsSync(candidatePublicPath)
    ? candidateOgImagePath
    : DEFAULT_OG_IMAGE;
  const wordCount = (data.content || "").split(/\s+/).filter(Boolean).length;

  const sanitizedFrontmatter = {
    ...data.frontmatter,
    description: data.frontmatter.description || null,
    meta: data.frontmatter.meta || null,
    tags: ensureArray(data.frontmatter.tags),
  };

  if (data.isMdx) {
    const rehypeShiki = (await import("@shikijs/rehype")).default;
    const remarkGfm = (await import("remark-gfm")).default;
    const remarkMermaidjs = (await import("remark-mermaidjs")).default;
    const mdxSource = await serialize(data.content || "", {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMdxTableTitles,
          [
            remarkMermaidjs,
            {
              theme: "base",
              themeVariables: {
                primaryColor: "#f2f2f2",
                primaryTextColor: "#000000",
                primaryBorderColor: "#0000ff",
                lineColor: "#0000ff",
                secondaryColor: "#f9f9f9",
                tertiaryColor: "#ffffff",
                background: "#ffffff",
                mainBkg: "#f2f2f2",
                secondBkg: "#f9f9f9",
                tertiaryBkg: "#ffffff",
                nodeBorder: "#0000ff",
                clusterBkg: "#f9f9f9",
                clusterBorder: "#999999",
                defaultLinkColor: "#0000ff",
                titleColor: "#000000",
                edgeLabelBackground: "#ffffff",
              },
            },
          ],
        ],
        rehypePlugins: [
          [
            rehypeShiki,
            getShikiRehypeOptions(),
          ],
        ],
      },
    });
    return {
      props: {
        ...data,
        frontmatter: sanitizedFrontmatter,
        mdxSource,
        content: null,
        ogImagePath,
        wordCount,
      },
    };
  }

  const content = await markdownToHtml(data.content || "");
  return {
    props: {
      ...data,
      frontmatter: sanitizedFrontmatter,
      content,
      mdxSource: null,
      ogImagePath,
      wordCount,
    },
  };
};

export default withMermaidCharts(Post);
