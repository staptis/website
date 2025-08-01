import { Language } from "types/language";
import { IProspect } from "types/prospect";
import * as constants from "utils/constants";

export interface IStorageService {
  storeProspect(prospect: IProspect, language: Language): Promise<void>;
}

export interface IEmailService {
  sendWelcomeEmailProspect(
    prospect: IProspect,
    language: Language,
  ): Promise<void>;
}

export interface ICaptchaService {
  verifyCaptchaToken(token: string): Promise<boolean>;
}

export interface IValidationService {
  validateProspectData(prospect: IProspect, language: Language): boolean;
}

export interface IStorageRegistry {
  [constants.MOCK_STORAGE_SERVICE]: () => IStorageService;
  [constants.GOOGLE_STORAGE_SERVICE]: (
    config: GoogleStorageServiceConfig,
  ) => IStorageService;
}

export interface IEmailRegistry {
  [constants.MOCK_EMAIL_SERVICE]: () => IEmailService;
  [constants.RESEND_EMAIL_SERVICE]: (
    config: ResendEmailServiceConfig,
  ) => IEmailService;
}

export interface ICaptchaRegistry {
  [constants.MOCK_CAPTCHA_SERVICE]: () => ICaptchaService;
  [constants.TURNSTILE_CAPTCHA_SERVICE]: (
    config: TurnstileCaptchaServiceConfig,
  ) => ICaptchaService;
}

export interface IValidationRegistry {
  [constants.LIB_VALIDATION_SERVICE]: () => IValidationService;
}

export interface IServicesConfig {
  storageService: TStorageServiceConfig;
  emailService: TEmailServiceConfig;
  captchaService: TCaptchaServiceConfig;
  validationService: TValidationServiceConfig;
}

export type TStorageServiceConfig =
  | { [constants.MOCK_STORAGE_SERVICE]: null }
  | { [constants.GOOGLE_STORAGE_SERVICE]: GoogleStorageServiceConfig };

export type TEmailServiceConfig =
  | { [constants.MOCK_EMAIL_SERVICE]: null }
  | { [constants.RESEND_EMAIL_SERVICE]: ResendEmailServiceConfig };

export type TCaptchaServiceConfig =
  | { [constants.MOCK_CAPTCHA_SERVICE]: null }
  | { [constants.TURNSTILE_CAPTCHA_SERVICE]: TurnstileCaptchaServiceConfig };

export type TValidationServiceConfig = {
  [constants.LIB_VALIDATION_SERVICE]: null;
};

export interface ResendEmailServiceConfig {
  RESEND_API_KEY: string;
}

export interface GoogleStorageServiceConfig {
  GOOGLE_CLIENT_EMAIL: string;
  GOOGLE_PRIVATE_KEY_BASE64: string;
  GOOGLE_SHEET_ID: string;
  GOOGLE_SHEET_NAME: string;
}

export interface TurnstileCaptchaServiceConfig {
  TURNSTILE_SECRET_KEY: string;
}
