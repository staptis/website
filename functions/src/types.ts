import { LANGUAGES } from "@/constants";
export type Language = (typeof LANGUAGES)[number];
export interface Env {
  EMAIL_SERVICE: "LOG" | "RESEND";
  STORAGE_SERVICE: "LOG" | "GOOGLE";
  RESEND_API_KEY: string;
  GOOGLE_CLIENT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_SHEET_ID: string;
  GOOGLE_SHEET_NAME: string;
}
