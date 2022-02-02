import { GITHUB_USER, GITHUB_REPO } from "./siteConfig";
import { dev } from "$app/env";

import {
  graphql as graphqlWithoutAuth,
  GraphqlResponseError,
} from "@octokit/graphql";

import slugify from "slugify";
import { compile } from "mdsvex";
import oembed from "remark-oembed";
import { getReadingTime } from "./utils/getReadingTime";

let posts = [];

const githubToken = process.env.GITHUB_TOKEN;

const graphql = process.env.GITHUB_TOKEN
  ? graphqlWithoutAuth.defaults({
      headers: {
        authorization: `token ${githubToken}`,
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
                  publishedAt
                  category {
                    name
                  }
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
      .map(({ node }) => ({
        ...node,
        slug: slugify(node.title).toLowerCase(),
        category: node.category.name,
        comments: node.comments.totalCount,
        reactions: node.reactions.totalCount,
      }))
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
      const results = (await graphql(
        `
          query getDiscussion($owner: String!, $repo: String!, $number: Int!) {
            repository(owner: $owner, name: $repo) {
              discussion(number: $number) {
                body
                url
                author {
                  avatarUrl(size: 100)
                  login
                  url
                }
              }
            }
          }
        `,
        {
          owner: GITHUB_USER,
          repo: GITHUB_REPO,
          number: post.number,
        }
      )) as any;

      const content = (
        await compile(results.repository.discussion.body, {
          remarkPlugins: [[oembed, { syncWidget: true }]],
        })
      ).code;

      return {
        ...post,
        content,
        url: results.repository.discussion.url,
        author: results.repository.discussion.author,
        readingTime: getReadingTime(results.repository.discussion.body),
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
