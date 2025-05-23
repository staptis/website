import { IEmailService, IFormContact } from "@/services/serviceTypes";
import { Language } from "@/types";

export class LogEmailService implements IEmailService {
  async sendEmail(data: IFormContact, language: Language): Promise<void> {
    console.log("Sending email:", data, language);
  }
}
