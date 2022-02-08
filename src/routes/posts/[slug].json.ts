import { getDiscussion } from "$lib/getContent";
import type { RequestHandler } from "@sveltejs/kit";

const get: RequestHandler = async ({ params }) => {
  const { slug } = params;

  try {
    const post = await getDiscussion(slug);
    return {
      body: {
        number: post.number,
        slug: post.slug,
        url: post.url,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
        lastEditedAt: post.lastEditedAt,
        createdAt: post.createdAt,
        author: post.author,
        category: post.category,
        content: post.content,
        reactions: post.reactions,
        comments: post.comments,
        readingTime: post.readingTime,
      },
      headers: {
        "Cache-Control": `max-age=0, s-max-age=${60 * 60 * 24 * 7}`,
      },
    };
  } catch (err) {
    return {
      status: 404,
      body: err.message,
    };
  }
};

export { get };
