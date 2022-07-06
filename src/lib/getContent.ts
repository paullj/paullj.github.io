import { GITHUB_USER, GITHUB_REPO } from "$lib/siteConfig";
import { dev } from "$app/env";

import {
  graphql as graphqlWithoutAuth,
  GraphqlResponseError,
} from "@octokit/graphql";
import { compile } from "mdsvex";
import slugify from "slugify";
import remarkOembed from "remark-oembed";
import rehypeAutolink from "rehype-autolink-headings";
import rehypeFigure from "rehype-figure";
import remarkFootnotes from "remark-footnotes";
import remarkGithub from "remark-github";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

import {
  getReadingTime,
  parseFrontmatter,
  removeTags,
  truncateDescription,
  getViewCount,
} from "./utils";

let posts = [];

const graphql = process.env.GITHUB_TOKEN
  ? graphqlWithoutAuth.defaults({
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })
  : graphqlWithoutAuth;

const getDiscussions = async () => {
  try {
    const results = await graphql(
      `
        query getDiscussions($owner: String!, $repo: String!, $num: Int = 10) {
          repository(owner: $owner, name: $repo) {
            discussions(first: $num, categoryId: null) {
              edges {
                node {
                  number
                  title
                  url
                  publishedAt
                  createdAt
                  lastEditedAt
                  author {
                    avatarUrl(size: 100)
                    login
                    url
                  }
                  category {
                    name
                  }
                  body
                  comments {
                    totalCount
                  }
                  reactions {
                    totalCount
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner: GITHUB_USER,
        repo: GITHUB_REPO,
      }
    );
    const discussions = (results as any).repository.discussions.edges.map(
      async ({ node }) => {
        const { metadata, body } = parseFrontmatter(node.body);
        const slug = slugify(node.title, { lower: true });
        const viewCount = await getViewCount(slug);

        return {
          ...node,
          slug,
          ...metadata,
          body,
          viewCount,
          category: node.category.name,
          comments: node.comments.totalCount,
          reactions: node.reactions.totalCount,
        };
      }
    );

    posts = (await Promise.all(discussions)).filter(
      ({ category }) => dev || !category.includes("Draft")
    );

    return posts;
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      console.log("Request failed:", error.request);
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};

const getDiscussion = async (slug: string) => {
  if (dev || !posts || posts.length === 0) {
    posts = await getDiscussions();
  }

  if (!posts.length) throw new Error("No posts!");

  const post = posts.find((post) => post.slug === slug);
  if (post) {
    try {
      const compiled = await compile(post.body, {
        rehypePlugins: [
          rehypeFigure,
          rehypeSlug,
          [
            rehypeAutolink,
            {
              behaviour: "wrap",
              properties: { className: "heading" },
            },
          ],
          rehypeExternalLinks,
        ],
        remarkPlugins: [
          [remarkGithub, { repository: `${GITHUB_USER}/${GITHUB_REPO}` }],
          [remarkOembed, { asyncImg: true, syncWidget: true }],
          [remarkFootnotes, { inlineNotes: true }],
          remarkA11yEmoji,
        ],
      });

      // FIXME: Some of the worst hacky code I have ever written.
      // FIXME: Find a way to not have to inject css and delete svelte markup from the html
      let content = compiled.code
        // https://github.com/pngwn/MDsveX/issues/392
        .replace(/>{@html `<code class="language-/g, '><code class="language-')
        .replace(/<\/code>`}<\/pre>/g, "</code></pre>");

      // regex matches youtube iframes
      const findDimmensionsRegex =
        /(remark-oembed-you-tube.+?<iframe\s).*?width="(\d+?)"\s.*?height="(\d+?)"/g;

      let diff = 0;
      [...compiled.code.matchAll(findDimmensionsRegex)]
        // gets widths and heights of each video
        .map(({ "1": inject, "2": width, "3": height, index }) => ({
          index: index + inject.length,
          width: parseInt(width),
          height: parseInt(height),
        }))
        // and adds a css variable for the aspect ratio of each video
        .forEach(({ index, width, height }) => {
          const cssInjection = `style="--aspect-ratio: ${width / height}" `;
          content =
            content.slice(0, index + diff) +
            cssInjection +
            content.slice(index + diff);
          diff += cssInjection.length;
        });

      return {
        description: truncateDescription(removeTags(compiled.code)),
        ...post,
        content,
        readingTime: getReadingTime(post.body),
      };
    } catch (error) {
      if (error instanceof GraphqlResponseError) {
        console.log(error.response);
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
  }
  throw new Error(`Can't find post, '${slug}'`);
};

export { getDiscussions, getDiscussion };
