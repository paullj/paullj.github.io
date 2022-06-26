import { getDiscussion } from "$lib/getContent";
import type { RequestHandler } from "./__types/[slug]";

const get: RequestHandler = async ({ params }) => {
  const { slug } = params;

  try {
    const discussion = await getDiscussion(slug);
    return {
      body: {
        number: discussion.number,
        slug: discussion.slug,
        url: discussion.url,
        title: discussion.title,
        description: discussion.description,
        publishedAt: discussion.publishedAt,
        updatedAt: discussion.lastEditedAt,
        createdAt: discussion.createdAt,
        author: discussion.author,
        category: discussion.category,
        content: discussion.content,
        reactions: discussion.reactions,
        comments: discussion.comments,
        readingTime: discussion.readingTime,
        viewCount: discussion.viewCount,
      },
      headers: {
        "Cache-Control": `max-age=0, s-max-age=${60 * 60 * 24 * 7}`,
      },
    };
  } catch {
    return {
      status: 404,
      body: `Post /${slug} not found`,
    };
  }
};

export { get };
