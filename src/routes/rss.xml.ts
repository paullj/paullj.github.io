import RSS from "rss";
import { SITE_TITLE, SITE_URL } from "$lib/siteConfig";
import { getDiscussions } from "$lib/getContent";
import type { RequestHandler } from "@sveltejs/kit";

const get: RequestHandler = async () => {
  const feed = new RSS({
    title: SITE_TITLE + " RSS Feed",
    site_url: SITE_URL,
    feed_url: SITE_URL + "/rss.xml",
  });

  const discussions = await getDiscussions();

  discussions.forEach((discussion) => {
    feed.item({
      title: discussion.title,
      url: SITE_URL + `/posts/${discussion.slug}`,
      date: discussion.publishedAt,
      description: discussion.description,
    });
  });

  return {
    body: feed.xml({ indent: true }),
    headers: {
      "Cache-Control": `max-age=0, s-max-age=${600}`,
      "Content-Type": "application/rss+xml",
    },
  };
};
