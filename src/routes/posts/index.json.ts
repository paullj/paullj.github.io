import { getDiscussions } from "$lib/getContent";
import type { RequestHandler } from "@sveltejs/kit";

const get: RequestHandler = async () => {
  const posts = await getDiscussions();
  return {
    body: {
      posts,
    },
    headers: {
      "Cache-Control": `max-age=0, s-max-age=${60}`,
    },
  };
};

export { get };
