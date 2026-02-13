export interface PostConfig {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  date?: string;
}

export interface PostPath {
  from: string;
  to: string;
}
