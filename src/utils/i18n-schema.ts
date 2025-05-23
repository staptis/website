import { z } from "zod";

export const TranslationSchema = z.object({
  site: z.object({
    title: z.string(),
    description: z.string(),
  }),
  navigation: z.object({
    home: z.string(),
    about: z.string(),
    contact: z.string(),
  }),
  footer: z.object({
    privacy_policy: z.string(),
    terms_of_service: z.string(),
    all_rights_reserved: z.string(),
  }),
  contact: z.object({
    get_in_touch: z.string(),
    name: z.string(),
    email: z.string(),
    company_name: z.string(),
    send_message: z.string(),
    message_sent: z.string(),
    error_sending_message: z.string(),
  }),
});

export type Translation = z.infer<typeof TranslationSchema>;
