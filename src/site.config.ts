import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Paul Lavender-Jones",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "paullj",
  // Meta property used as the default description meta property
  description: "A personal website where I write about things I find interesting",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "en-GB",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_GB",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-GB",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  // Posts to display per page
  postsPerPage: 10,
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about/",
  },
  {
    title: "Blog",
    path: "/posts/",
  },
];

/**
  Uses https://github.com/natemoo-re/astro-icon#readme
  Find icons @ https://icones.js.org/
*/
export const socialLinks: Array<{
  name: string;
  friendlyName: string;
  link: string;
  isWebmention?: string;
}> = [
  {
    name: "teenyicons:github-outline",
    friendlyName: "Github",
    link: "https://github.com/paullj",
  },
  {
    name: "teenyicons:linkedin-outline",
    friendlyName: "LinkedIn",
    link: "https://www.linkedin.com/in/paul-lavender-jones/",
  },
  {
    name: "teenyicons:envelope-outline",
    friendlyName: "email",
    link: "mailto:paul@lavender-jones.com",
  },
];
