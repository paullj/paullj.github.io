import { GITHUB_USER, GITHUB_REPO } from "./siteConfig";
import { dev } from "$app/env";

import { request as requestWithoutAuth } from "@octokit/request";

import slugify from "slugify";
import { compile } from "mdsvex";
import oembed from "remark-oembed";

const publishedLabels = ["published"];
let posts = [];

const githubToken = process.env.GITHUB_TOKEN;

const request = process.env.GITHUB_TOKEN
  ? requestWithoutAuth.defaults({
      headers: {
        authorization: `token ${githubToken}`,
      },
    })
  : requestWithoutAuth;

const getComments = async (issueNumber) => {
  const results = await request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      issue_number: issueNumber,
    }
  );

  if (results.status === 200) {
    return results.data.map((comment) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { url, total_count, ...reactions } = comment.reactions;

      return {
        user: {
          name: comment.user.name,
          login: comment.user.login,
          author: comment.user.login === GITHUB_USER,
          avatar: comment.user.avatar_url,
          url: comment.user.url,
        },
        createdAt: new Date(comment.created_at),
        updatedAt: new Date(comment.updated_at),
        content: comment.body,
        totalReactions: total_count,
        reactions,
        url: comment.html_url,
      };
    });
  }
  throw new Error(results.status);
};

const getPosts = async () => {
  const results = await request(`GET /repos/{owner}/{repo}/issues`, {
    owner: GITHUB_USER,
    repo: GITHUB_REPO,
    state: "closed",
    creator: GITHUB_USER,
    labels: publishedLabels.join(","),
    per_page: 100,
  });

  if (results.status === 200) {
    const issues = results.data
      .map((issue) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { url, total_count, ...reactions } = issue.reactions;

        return {
          title: issue.title,
          slug: slugify(issue.title).toLowerCase(),
          url: issue.html_url,
          issueNumber: issue.number,
          publishedAt: new Date(issue.closed_at),
          createdAt: new Date(issue.created_at),
          updatedAt: new Date(issue.updated_at),
          totalReactions: total_count,
          totalComments: issue.comments,
          reactions,
          content: issue.body,
        };
      })
      .sort((a, b) => +b.publishedAt - +a.publishedAt);

    posts = issues;
  }

  return posts;
};

const getPost = async (slug: string) => {
  if (dev || !posts || posts.length === 0) {
    posts = await getPosts();
  }

  if (!posts.length) throw new Error("No posts!");

  const post = posts.find((post) => post.slug === slug);
  if (post) {
    const content = (
      await compile(post.content, {
        remarkPlugins: [[oembed, { syncWidget: true }]],
      })
    ).code;

    const comments = await getComments(post.issueNumber);
    const commentsPromises = comments.map((comment) =>
      compile(comment.content, {
        remarkPlugins: [
          // sanitize FIXME: this is taking out all html
        ],
      })
    );
    const commentsContent = await Promise.all(commentsPromises);

    return {
      ...post,
      content,
      comments: comments.map((comment, i) => ({
        ...comment,
        content: commentsContent[i].code,
      })),
    };
  }

  throw new Error(`Can't find post, '${slug}'`);
};

export { getPosts, getPost };
