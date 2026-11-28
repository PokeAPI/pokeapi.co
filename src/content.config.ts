import {defineCollection} from "astro:content";
import {docsLoader} from "@astrojs/starlight/loaders";
import {docsSchema} from "@astrojs/starlight/schema";
import {z} from "astro/zod";

const authorSchema = z.union([
  z.string(),
  z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    url: z.string().optional(),
    avatar: z.string().optional(),
  }),
]);

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        keywords: z.union([z.string(), z.array(z.string())]).optional(),
        publishDate: z.string().or(z.date()).optional(),
        authors: z.union([authorSchema, z.array(authorSchema)]).optional(),
      }),
    }),
  }),
};
