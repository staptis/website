import { Language } from "@/types";

export interface IFormContact {
  name: string;
  email: string;
  companyName?: string;
}

export interface IStorageService {
  storeContact(data: IFormContact): Promise<boolean>;
}

export interface IEmailService {
  sendEmail(data: IFormContact, language: Language): Promise<void>;
}
