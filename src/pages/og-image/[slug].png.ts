import type { APIContext, GetStaticPaths } from "astro";
import { getEntryBySlug } from "astro:content";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site-config";
import { getAllPosts, getFormattedDate } from "@/utils";

import JetBrainsMono from "@/assets/JetBrainsMono-Regular.ttf";
import JetBrainsMonoBold from "@/assets/JetBrainsMono-Bold.ttf";

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "JetBrains Mono",
      data: Buffer.from(JetBrainsMono),
      weight: 400,
      style: "normal",
    },
    {
      name: "JetBrains Mono",
      data: Buffer.from(JetBrainsMonoBold),
      weight: 700,
      style: "normal",
    },
  ],
};

const markup = (title: string, pubDate: string) =>
  html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
			<div tw="flex items-center">
				<p tw="ml-3 font-semibold">${siteConfig.title}</p>
			</div>
			<p>by ${siteConfig.author}</p>
		</div>
	</div>`;

export async function GET({ params: { slug } }: APIContext) {
  const post = await getEntryBySlug("post", slug!);
  const title = post?.data.title ?? siteConfig.title;
  const postDate = getFormattedDate(post?.data.updatedAt ?? post?.data.publishedAt ?? Date.now(), {
    weekday: "long",
    month: "long",
  });
  const svg = await satori(markup(title, postDate), ogOptions);
  const png = new Resvg(svg).render().asPng();
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return posts.filter(({ data }) => !data.ogImage).map(({ slug }) => ({ params: { slug } }));
};
