import remarkOembed from "remark-oembed";
import rehypeAutolink from "rehype-autolink-headings";
import rehypeFigure from "rehype-figure";
import remarkFootnotes from "remark-footnotes";
import remarkGithub from "remark-github";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypeSlug from "rehype-slug";

const config = {
  extensions: [".md", ".svx"],
  smartypants: true,
  rehypePlugins: [
    rehypeFigure,
    rehypeSlug,
    [rehypeAutolink, { behaviour: "wrap" }],
  ],
  remarkPlugins: [
    [remarkFootnotes, { inlineNotes: true }],
    remarkGithub,
    remarkA11yEmoji,
    [remarkOembed, { syncWidget: true }],
  ],
};

export default config;
