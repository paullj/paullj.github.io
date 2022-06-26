import { getDiscussions } from "$lib/getContent";
import type { RequestHandler } from "./__types/index";

const get: RequestHandler = async () => {
  const discussions = await getDiscussions();

  if (discussions) {
    const posts = discussions.map((discussion) => ({
      title: discussion.title,
      slug: discussion.slug,
      reactions: discussion.reactions,
      comments: discussion.comments,
      category: discussion.category,
      viewCount: discussion.viewCount,
      createdAt: discussion.createdAt,
      publishedAt: discussion.publishedAt,
      updatedAt: discussion.lastEditedAt,
    }));

    return {
      body: {
        posts,
      },
      headers: {
        "Cache-Control": `max-age=0, s-max-age=${60 * 60 * 24 * 7}`,
      },
    };
  }

  return {
    status: 404,
    error: "Posts not found!",
  };
};

export { get };
