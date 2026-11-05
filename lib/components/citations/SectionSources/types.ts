export type Source = {
  url: string;
  title: string;
  description?: string;
  author?: string;
  publication?: string;
  date?: string;
};

export interface SectionSourcesProps {
  sources: Source[] | string;
  title?: string;
}
