export interface OgMetaProps {
  title?: string;
  description?: string;
  slug?: string;
  date?: string;
  tags?: string[];
  wordCount?: number;
}

export interface OgMetaTagProps {
  property: string;
  content?: string;
}

export interface NameMetaTagProps {
  name: string;
  content?: string;
}

export interface JsonLdInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  isoDate: string;
  wordCount?: number;
}
