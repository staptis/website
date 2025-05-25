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
  cta: z.object({
    demo: z.string(),
    contact_us: z.string(),
  }),
  homepage: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    problem: z.object({
      title: z.string(),
      description: z.string(),
      bullet1: z.object({
        title: z.string(),
        description: z.string(),
      }),
      bullet2: z.object({
        title: z.string(),
        description: z.string(),
      }),
      bullet3: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    how_it_works: z.object({
      title: z.string(),
      step1: z.object({
        title: z.string(),
        description: z.string(),
      }),
      step2: z.object({
        title: z.string(),
        description: z.string(),
      }),
      step3: z.object({
        title: z.string(),
        description: z.string(),
      }),
      step4: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    audience: z.object({
      title: z.string(),
      gps: z.string(),
      specialists: z.string(),
      clinics: z.string(),
    }),
  }),
});

export type Translation = z.infer<typeof TranslationSchema>;
