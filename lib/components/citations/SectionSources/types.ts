export type Source = {
  url: string;
  title: string;
  author?: string;
  publication?: string;
  date?: string;
};

export interface SectionSourcesProps {
  sources: Source[];
  title?: string;
}
