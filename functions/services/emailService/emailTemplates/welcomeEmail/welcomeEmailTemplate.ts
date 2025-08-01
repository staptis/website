import { Language } from "types/language";
import welcomeEmailHtml from "services/emailService/emailTemplates/welcomeEmail/welcomeEmailHtml";
import { translations } from "utils/translations";

interface IWelcomeEmailTemplates {
  language: Language;
  name: string;
}
export function welcomeEmail(data: IWelcomeEmailTemplates) {
  const { language, name } = data;
  return template(welcomeEmailHtml, {
    name,
    ...translations[language].welcomeEmail,
  });
}

function template(html: string, data: Record<string, string>): string {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return data[key] ?? "";
  });
}
