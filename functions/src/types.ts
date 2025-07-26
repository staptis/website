export type Language = "en" | "nl" | "fr";

export interface IProspect {
  name: string;
  email: string;
  companyName?: string;
}

export interface IStorageService {
  storeProspect(data: IProspect, language: Language): Promise<void>;
}

export interface IEmailService {
  sendWelcomeEmailProspect(data: IProspect, language: Language): Promise<void>;
}

export interface ICaptchaService {
  verifyCaptchaToken(token: string): Promise<boolean>;
}
