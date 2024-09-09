export type SiteConfig = {
  author: string;
  title: string;
  description: string;
  lang: string;
  ogLocale: string;
  date: {
    locale: string;
    options: Intl.DateTimeFormatOptions;
  };
  postsPerPage: number;
};

export type PaginationLink = {
  url: string;
  text?: string;
  srLabel?: string;
};

export type SiteMeta = {
  title: string;
  description?: string;
  ogImage?: string;
  articleDate?: string;
};

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";
