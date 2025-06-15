export type NavItemProps = {
  alias: string;
  componentName?: string;
  name: string;
  path: string;
};

export type IconProps = {
  isDarkMode: boolean;
};

export type NavListProps = {
  componentName: string;
  navItems: NavItemProps[];
};

export type ShareProps = {
  path: string;
  url?: string;
};

export type SocialItem = {
  alias: string;
  name: string;
  path: string;
  small: boolean;
};

export type SocialListProps = {
  items?: SocialItem[];
};
