import { IEmailService, IFormContact } from "@/services/serviceTypes";
import { Language } from "@/types";

export class LogEmailService implements IEmailService {
  constructor() {
    console.log("LogEmailService initialized");
  }
  async sendEmail(data: IFormContact, language: Language): Promise<void> {
    console.log("Sending email:", data, language);
  }
}
