import { LANGUAGES } from "@/constants";
export type Language = (typeof LANGUAGES)[number];
export interface Env {
  RESEND_API_KEY: string;
}
