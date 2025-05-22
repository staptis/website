import type { IEmailService, IFormContact } from "@/services/serviceTypes";
import welcomeEmail from "@/services/emailTemplates/welcomeEmail";

export class ResendEmailService implements IEmailService {
  apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
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
          html: welcomeEmail.replace("{{name}}", name),
        }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
