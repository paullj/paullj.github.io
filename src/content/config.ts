import { z, defineCollection, reference } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const post = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(200).optional(),
      publishedAt: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedAt: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      coverImage: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      ogImage: z.string().optional(),
    }),
});

const project = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string().max(60),
    // description: z.string().min(50).max(160),
    repoUrl: z.string().url().optional(),
    websiteUrl: z.string().url().optional(),
    publishedAt: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedAt: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    draft: z.boolean().default(false),
    category: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    relatedPosts: z.array(reference("post")).default([]),
  }),
});

export const collections = { post, project };
