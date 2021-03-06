import { GOATCOUNT_SUBDOMAIN } from "$lib/siteConfig";

const getViewCount = async (slug: string): Promise<number> => {
  return await fetch(
    `https://${GOATCOUNT_SUBDOMAIN}.goatcounter.com/counter/${encodeURIComponent(
      "/posts/" + slug
    )}.json`
  )
    .then((response) => response.json())
    .then(({ count_unique, count }) => Number.parseInt(count_unique as string))
    .catch(() => 0);
};

export default getViewCount;
