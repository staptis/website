import { LogEmailService } from "@/services/emailService/logEmailService";
import { LogStorageService } from "@/services/storageService/logStorageService";
import {
  IEmailService,
  IFormContact,
  IStorageService,
} from "@/services/serviceTypes";
import { Env, Language } from "@/types";
import { ResendEmailService } from "@/services/emailService/resendEmailService";
import { GoogleStorageService } from "./storageService/googleStorageService";

export class Service {
  formStorageService: IStorageService;
  emailService: IEmailService;
  language: Language;

  constructor(env: Env, language: Language) {
    this.language = language;
    switch (env.STORAGE_SERVICE) {
      case "LOG":
        this.formStorageService = new LogStorageService();
        break;
      case "GOOGLE":
        this.formStorageService = new GoogleStorageService(env);
        break;
      default:
        this.formStorageService = new LogStorageService();
    }
    switch (env.EMAIL_SERVICE) {
      case "LOG":
        this.emailService = new LogEmailService();
        break;
      case "RESEND":
        this.emailService = new ResendEmailService(env);
        break;
      default:
        this.emailService = new LogEmailService();
    }
  }

  async handleFormSubmission(data: IFormContact): Promise<void> {
    try {
      const isStored = await this.formStorageService.storeContact(data);
      if (isStored) {
        await this.emailService.sendEmail(data, this.language);
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      throw new Error("Failed to handle form submission");
    }
  }
}
