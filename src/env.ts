import { z } from "zod";

const envSchema = z.object({
  PUBLIC_URL: z.string().default("https://staptis.com"),
});

export const env = envSchema.parse(process.env);
