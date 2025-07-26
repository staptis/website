import { IProspect } from "@/types";

export class FormParser {
  static parseProspect(formData: FormData): IProspect {
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const companyName = formData.get("companyName").toString();

    return {
      name,
      email,
      companyName,
    };
  }
  static parseCaptchaToken(formData: FormData): string {
    return formData.get("cf-turnstile-response")?.toString() || "";
  }
}
