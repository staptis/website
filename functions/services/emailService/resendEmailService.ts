import { ServiceRequestError } from "utils/errors";
import { welcomeEmail } from "services/emailService/emailTemplates/welcomeEmail/welcomeEmailTemplate";
import { IEmailService, ResendEmailServiceConfig } from "types/service";
import { IProspect } from "types/prospect";
import { Language } from "types/language";

export class ResendEmailService implements IEmailService {
  name = "ResendEmailService";
  #apiKey: string;
  constructor(config: ResendEmailServiceConfig) {
    this.#apiKey = config.RESEND_API_KEY;
  }
  async sendWelcomeEmailProspect(
    data: IProspect,
    language: Language,
  ): Promise<void> {
    const { name, email } = data;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "no-reply@staptis.com",
        to: [email],
        subject: "Thanks for contacting us",
        html: welcomeEmail({ language, name }),
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new ServiceRequestError(
        this.name,
        `Failed to send email: ${response.status} - ${text}`,
      );
    }
  }
}
