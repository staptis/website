import { Language } from "@/types";
import welcomeEmailEnglish from "@/emailTemplates/welcomeEmail/welcomeEmailEnglish";

interface IWelcomeEmailTemplates {
  language: Language;
  name: string;
}
export default function welcomeEmail(data: IWelcomeEmailTemplates) {
  const { language, name } = data;
  let emailTemplates = welcomeEmailEnglish;
  if (language === "en") {
    emailTemplates = welcomeEmailEnglish;
  } else if (language === "nl") {
    emailTemplates = welcomeEmailEnglish;
  } else if (language === "fr") {
    emailTemplates = welcomeEmailEnglish;
  }
  return emailTemplates.replace("{{name}}", name);
}
