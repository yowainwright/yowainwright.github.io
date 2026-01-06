export interface Post {
  slug: string;
  title: string;
  description: string;
  date: Date;
  url: string;
  content: string;
}

export interface JsonFeedItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  date_published: string;
  author: {
    name: string;
  };
}

export interface JsonFeed {
  version: string;
  title: string;
  home_page_url: string;
  feed_url: string;
  description: string;
  author: {
    name: string;
    url: string;
  };
  items: JsonFeedItem[];
}

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}
