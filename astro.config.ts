import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import embeds from "astro-embed/integration";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

// Remark plugins
import remarkDirective from "remark-directive";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeMermaid from "rehype-mermaid";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/plugins/remark-reading-time";
import { remarkAdmonitions } from "./src/plugins/remark-admonitions";

import expressiveCode from "astro-expressive-code";

const expressiveCodeOptions: AstroExpressiveCodeOptions = {
  styleOverrides: {
    borderRadius: "4px",
    codeFontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
    uiFontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
    uiFontSize: "0.75rem",
    codeFontSize: "0.75rem",
    codeLineHeight: "1.25rem",
    codePaddingInline: "1rem",
    frames: {
      frameBoxShadowCssValue: "none",
      editorActiveTabIndicatorTopColor: "transparent",
      editorTabBarBorderBottomColor: "transparent",
      tooltipSuccessBackground: "#047857",
    },
    uiLineHeight: "inherit",
  },
  themeCssSelector(theme, { styleVariants }) {
    // If one dark and one light theme are available
    // generate theme CSS selectors compatible with cactus-theme dark mode switch
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
    }
    // return default selector
    return `[data-theme="${theme.name}"]`;
  },
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ["dracula", "github-light"],
  useThemedScrollbars: false,
};

// https://astro.build/config
export default defineConfig({
  // ! Please remember to replace the following site property with your own domain
  site: "https://paullj.github.io",
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkDirective, remarkAdmonitions],
    rehypePlugins: [
      rehypeMermaid,
      [rehypeExternalLinks, { target: "_blank", rel: ["nofollow, noopener, noreferrer"] }],
    ],
    remarkRehype: { footnoteLabelProperties: { className: [""] } },
  },
  integrations: [
    embeds(),
    expressiveCode(expressiveCodeOptions),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
  ],
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  vite: {
    plugins: [rawFonts([".ttf"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

function rawFonts(ext: Array<string>) {
  return {
    name: "vite-plugin-raw-fonts",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
