import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import embeds from "astro-embed/integration";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/utils/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  // ! Please remember to replace the following site property with your own domain
  site: "https://paullj.github.io",
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["nofollow, noopener, noreferrer"] }],
    ],
    remarkRehype: { footnoteLabelProperties: { className: [""] } },
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  integrations: [
    embeds(),
    mdx({}),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
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
