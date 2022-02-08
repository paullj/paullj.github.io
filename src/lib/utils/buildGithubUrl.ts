import { dev } from "$app/env";
import { SITE_URL } from "$lib/siteConfig";

const buildGithubUrl = (posts, values, defaultBuildUrl) => {
  if (values.type === "issue") {
    const post = posts.find(
      (post) => post.number === Number.parseInt(values.no)
    );
    if (post) {
      return `${dev ? "http://localhost:3000" : SITE_URL}/posts/${post.slug}`;
    }
  }
  return defaultBuildUrl(values);
};
export default buildGithubUrl;
