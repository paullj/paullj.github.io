import { getDiscussions } from "$lib/getContent";
import type { RequestHandler } from "@sveltejs/kit";

const get: RequestHandler = async () => {
  const posts = (await getDiscussions()).map(
    ({ title, slug, publishedAt, reactions, comments, category }) => ({
      title,
      slug,
      publishedAt,
      reactions,
      comments,
      category,
    })
  );

  return {
    body: {
      posts,
    },
    headers: {
      "Cache-Control": `max-age=0, s-max-age=${60 * 10}`,
    },
  };
};

export { get };
