import {
  EMAIL_SERVICES,
  STORAGE_SERVICES,
  CAPTCHA_SERVICES,
} from "utils/constants";

export interface ProgramConfig {
  EMAIL_SERVICE?: (typeof EMAIL_SERVICES)[number];
  STORAGE_SERVICE?: (typeof STORAGE_SERVICES)[number];
  CAPTCHA_SERVICE?: (typeof CAPTCHA_SERVICES)[number];
  RESEND_API_KEY?: string;
  GOOGLE_CLIENT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY_BASE64?: string;
  GOOGLE_SHEET_ID?: string;
  GOOGLE_SHEET_NAME?: string;
  TURNSTILE_SECRET_KEY?: string;
}
