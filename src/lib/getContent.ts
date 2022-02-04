import { GITHUB_USER, GITHUB_REPO } from "./siteConfig";
import { dev } from "$app/env";

import {
  graphql as graphqlWithoutAuth,
  GraphqlResponseError,
} from "@octokit/graphql";
import { compile } from "mdsvex";
import slugify from "slugify";
import oembed from "remark-oembed";
import autolink from "rehype-autolink-headings";
import figure from "rehype-figure";

import {
  getReadingTime,
  parseFrontmatter,
  removeTags,
  truncateDescription,
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
    const discussions = (results as any).repository.discussions.edges
      .map(({ node }) => {
        const { metadata, body } = parseFrontmatter(node.body);

        return {
          ...node,
          ...metadata,
          body,
          slug: slugify(node.title).toLowerCase(),
          category: node.category.name,
          comments: node.comments.totalCount,
          reactions: node.reactions.totalCount,
        };
      })
      .filter(({ category }) => dev || !category.includes("Draft"));

    posts = discussions;
    return discussions;
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
        rehypePlugins: [[figure, { className: "figure-caption" }], autolink],
        remarkPlugins: [[oembed, { syncWidget: true }]],
      });

      return {
        description: truncateDescription(removeTags(compiled.code)),
        ...post,
        content: compiled.code,
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
