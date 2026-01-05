export interface OgMetaProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  author?: string;
  twitterHandle?: string;
  tags?: string[];
  wordCount?: number;
  modifiedDate?: string;
}

export interface JsonLdBlogPosting {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  publisher: {
    "@type": string;
    name: string;
    url: string;
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  keywords?: string;
  wordCount?: number;
  articleSection?: string;
  inLanguage?: string;
}
