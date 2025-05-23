import { LANGUAGES } from "@/constants";
export type Language = (typeof LANGUAGES)[number];
export interface Env {
  EMAIL_SERVICE: "LOG" | "RESEND";
  STORAGE_SERVICE: "LOG" | "RESEND";
  RESEND_API_KEY: string;
}
