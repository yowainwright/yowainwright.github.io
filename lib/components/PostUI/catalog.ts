import { JSONSchema } from "effect";
import { PostUISpecStructureSchema } from "./schema";

const POST_UI_COMPONENTS = [
  { type: "Stack", description: "Vertical layout for grouping related elements." },
  { type: "Text", description: "A paragraph of supporting post copy." },
  {
    type: "BarChart",
    description: "A chart whose non-empty labels and values arrays must have equal lengths.",
  },
  { type: "MetricGrid", description: "A responsive grid of key metrics and optional details." },
  { type: "Callout", description: "A highlighted takeaway with a semantic tone." },
  { type: "SourceList", description: "Links to the sources used by a chart or metric." },
] as const;

export interface PostUIPromptContext {
  content: string;
  data?: string;
  slug: string;
}

const formatComponent = ({ type, description }: (typeof POST_UI_COMPONENTS)[number]) =>
  `- ${type}: ${description}`;

const formatCatalog = () => POST_UI_COMPONENTS.map(formatComponent).join("\n");

const formatSchema = () => JSON.stringify(JSONSchema.make(PostUISpecStructureSchema), null, 2);

const formatPostData = (data: string | undefined) => {
  if (!data) return [];
  return ["", "Post data:", data];
};

export const buildPostUIPrompt = ({ content, data, slug }: PostUIPromptContext) => {
  const sections = [
    `Create a json-render UI spec for the blog post "${slug}".`,
    "Use only the available components. Return one JSON object and no prose.",
    "The JSON object must be a complete spec that can be saved directly in the specs directory.",
    "Every child key must exist in elements, and root must name an element.",
    "The element graph must not contain cycles.",
    "",
    "Available components:",
    formatCatalog(),
    "",
    "Effect-derived JSON Schema:",
    formatSchema(),
    "",
    "Post content:",
    content,
  ];

  return sections.concat(formatPostData(data)).join("\n");
};
