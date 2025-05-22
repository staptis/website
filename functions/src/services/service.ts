import { LogEmailService } from "@/services/logEmailService";
import { LogStorageService } from "@/services/logStorageService";
import {
  IEmailService,
  IFormContact,
  IStorageService,
} from "@/services/serviceTypes";
import { Env, Language } from "@/types";
import { ResendEmailService } from "./resendEmailService";

export class Service {
  formStorageService: IStorageService;
  emailService: IEmailService;
  language: Language;

  constructor(language: Language, env: Env) {
    this.formStorageService = new LogStorageService();
    this.emailService = new ResendEmailService(env.RESEND_API_KEY);
    this.language = language;
  }

  async handleFormSubmission(data: IFormContact): Promise<void> {
    try {
      await this.formStorageService.storeContact(data);
      await this.emailService.sendEmail(data, this.language);
    } catch (error) {
      console.error("Error handling form submission:", error);
      throw new Error("Failed to handle form submission");
    }
  }
}
