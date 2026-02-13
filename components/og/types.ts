import { ExtractedContent } from "../../scripts/generate-og/types";

export interface OgImageProps {
  title: string;
  slug: string;
  type?: string;
  content?: ExtractedContent;
}
