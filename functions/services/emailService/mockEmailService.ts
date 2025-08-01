import { Language } from "types/language";
import { IProspect } from "types/prospect";
import { IEmailService } from "types/service";

export class MockEmailService implements IEmailService {
  async sendWelcomeEmailProspect(
    data: IProspect,
    language: Language,
  ): Promise<void> {
    console.log("Sending email:", data, language);
  }
}
