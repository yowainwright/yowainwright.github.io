import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Component,
} from "react";
import dynamic from "next/dynamic";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { ArrowDown, ArrowUp, ArrowUpDown, Maximize2, X } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type Header,
  type HeaderGroup,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import { GlobalState } from "./_app";
import { Share } from "../lib/components/Share";
import { OgMeta } from "../lib/components/OgMeta";
import { useCodeBlocks } from "../lib/hooks/useCodeBlocks";
import { useHeadingAnchors } from "../lib/hooks/useHeadingAnchors";
import { useScrollDepth, useReadTime } from "../lib/hooks/useAnalytics";
import { withMermaidCharts } from "../lib/hooks/useMermaidCharts";
import { trackView } from "../lib/client/analytics";
import {
  CitationLink,
  InlineSource,
  SectionSources,
} from "../lib/components/citations";
import {
  buildPostStaticPaths,
  buildPostStaticProps,
  type PostPageProps,
} from "../lib/server/post-page";

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

type PostProps = PostPageProps;

interface GiscusWrapperProps {
  isDarkMode: boolean;
}

type PostContentBodyProps = {
  content?: string | null;
  isMdx: boolean;
  mdxSource?: MDXRemoteSerializeResult | null;
  setContentElement: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
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
  const isTextNode = typeof node === "string";
  const isNumericNode = typeof node === "number";
  const isPrimitiveNode = isTextNode || isNumericNode;

  if (isPrimitiveNode) {
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
  getChildElements((row.props as TableElementProps).children).reduce<
    Array<{ align: React.CSSProperties["textAlign"]; content: React.ReactNode }>
  >((cells, cell) => {
    const tagName = typeof cell.type === "string" ? cell.type : "";
    const hasMatchingTagName = cellTagNames.includes(tagName);
    if (!hasMatchingTagName) return cells;

    const props = cell.props as TableElementProps;
    return cells.concat({
      align: getCellAlign(props),
      content: props.children,
    });
  }, []);

const appendTableSectionRows = (
  rows: React.ReactElement[],
  sectionRows: React.ReactElement[],
) => rows.concat(sectionRows);

const getTableSectionRows = (section: React.ReactElement) =>
  getChildElements((section.props as TableElementProps).children).filter(
    (child) => isElementTag(child, "tr"),
  );

const getBodyRows = (bodySections: React.ReactElement[]) =>
  bodySections
    .map(getTableSectionRows)
    .reduce<React.ReactElement[]>(appendTableSectionRows, []);

const getSortValue = (cell: { content: React.ReactNode }) =>
  getNodeText(cell.content).trim();

const parseMdxTableRow = (row: React.ReactElement) => {
  const rowCells = getRowCells(row, ["td", "th"]);

  return {
    cells: rowCells.map((cell) => cell.content),
    sortValues: rowCells.map(getSortValue),
  };
};

const parseMdxTable = (children: React.ReactNode) => {
  const tableChildren = getChildElements(children);
  const headerSection = tableChildren.find((child) =>
    isElementTag(child, "thead"),
  );
  const bodySections = tableChildren.filter((child) =>
    isElementTag(child, "tbody"),
  );

  const headerRow = headerSection
    ? getChildElements(
        (headerSection.props as TableElementProps).children,
      ).find((child) => isElementTag(child, "tr"))
    : undefined;
  const headers = headerRow ? getRowCells(headerRow, ["th", "td"]) : [];
  const bodyRows = getBodyRows(bodySections);
  const rows = bodyRows.map(parseMdxTableRow);

  return { headers, rows };
};

const PostTable = ({ className, ...props }: PostTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { children, "data-title": tableTitle, ...tableProps } = props;
  const tableClassName = ["post__table", className].filter(Boolean).join(" ");
  const parsedTable = useMemo(() => parseMdxTable(children), [children]);
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

  const renderSortIcon = (header: Header<PostTableRow, unknown>) => {
    const isAscending = header.column.getIsSorted() === "asc";
    if (isAscending) return <ArrowUp size={14} aria-hidden="true" />;

    const isDescending = header.column.getIsSorted() === "desc";
    if (isDescending) return <ArrowDown size={14} aria-hidden="true" />;

    const isSorted = !!header.column.getIsSorted();
    if (isSorted) return null;

    return <ArrowUpDown size={14} aria-hidden="true" />;
  };

  const renderHeaderCell = (header: Header<PostTableRow, unknown>) => {
    const meta = header.column.columnDef.meta as PostTableColumnMeta;

    if (header.isPlaceholder) {
      return <th key={header.id} style={{ textAlign: meta?.align }} />;
    }

    return (
      <th key={header.id} style={{ textAlign: meta?.align }}>
        <button
          type="button"
          className="post__table-sort"
          style={{
            justifyContent: getJustifyContent(meta?.align),
          }}
          onClick={header.column.getToggleSortingHandler()}
        >
          <span>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
          {renderSortIcon(header)}
        </button>
      </th>
    );
  };

  const renderHeaderGroup = (headerGroup: HeaderGroup<PostTableRow>) => (
    <tr key={headerGroup.id}>{headerGroup.headers.map(renderHeaderCell)}</tr>
  );

  const renderBodyCell = (cell: Cell<PostTableRow, unknown>) => {
    const meta = cell.column.columnDef.meta as PostTableColumnMeta;

    return (
      <td key={cell.id} style={{ textAlign: meta?.align }}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    );
  };

  const renderBodyRow = (row: Row<PostTableRow>) => (
    <tr key={row.id}>{row.getVisibleCells().map(renderBodyCell)}</tr>
  );

  const renderTable = () => (
    <table {...tableProps} className={tableClassName}>
      <thead>{table.getHeaderGroups().map(renderHeaderGroup)}</thead>
      <tbody>{table.getRowModel().rows.map(renderBodyRow)}</tbody>
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

  const tableTitleElement = tableTitle ? (
    <h3 className="post__table-title">{tableTitle}</h3>
  ) : null;

  const renderExpandedDialog = () => {
    if (!isExpanded) return null;

    return (
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
            {tableTitleElement}
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
    );
  };

  return (
    <>
      <div className="post__table-wrapper">
        <div className="post__table-chrome">
          {tableTitleElement}
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
      {renderExpandedDialog()}
    </>
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
    if (!aside) return;
    if (!postSection) return;

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

export default withMermaidCharts(Post);
