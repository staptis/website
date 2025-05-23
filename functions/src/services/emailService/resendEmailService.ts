import type { IEmailService, IFormContact } from "@/services/serviceTypes";
import welcomeEmail from "@/emailTemplates/welcomeEmail/welcomeEmailTemplate";
import { Env, Language } from "@/types";

export class ResendEmailService implements IEmailService {
  language: Language;
  apiKey: string;
  constructor(env: Env, language: Language) {
    if (!env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY env is required");
    }
    this.language = language;
    this.apiKey = env.RESEND_API_KEY as string;
  }
  async sendEmail(data: IFormContact): Promise<void> {
    const { name, email, companyName } = data;

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "no-reply@staptis.com",
          to: [email],
          subject: "Thanks for contacting us",
          html: welcomeEmail({ language: this.language, name }),
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
