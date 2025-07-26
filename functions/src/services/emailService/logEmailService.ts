import { IEmailService, IProspect } from "@/types";
import { Language } from "@/types";

export class LogEmailService implements IEmailService {
  name = "LogEmailService";
  constructor() {
    console.info("initializing " + this.name);
  }
  async sendWelcomeEmailProspect(
    data: IProspect,
    language: Language,
  ): Promise<void> {
    console.log("Sending email:", data, language);
  }
}
