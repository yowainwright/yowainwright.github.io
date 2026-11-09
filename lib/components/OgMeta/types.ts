export interface OgMetaProps {
  title?: string;
  description?: string;
  slug?: string;
  imagePath?: string;
  date?: string;
  tags?: string[];
  wordCount?: number;
}

export interface JsonLdInput {
  schemaType: "BlogPosting" | "AboutPage" | "ProfilePage";
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  isoDate: string;
  wordCount?: number;
}
