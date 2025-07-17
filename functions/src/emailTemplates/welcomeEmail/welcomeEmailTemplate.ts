import { Language } from "@/types";
import { template } from "@/utils/template";
import welcomeEmailHtml from "@/emailTemplates/welcomeEmail/welcomeEmailHtml";

interface IWelcomeEmailTemplates {
  language: Language;
  name: string;
}
export default function welcomeEmail(data: IWelcomeEmailTemplates) {
  const { language, name } = data;
  return template(welcomeEmailHtml, { name, ...translations[language] });
}

const translations = {
  en: {
    title: "Thanks for contacting us",
    subTitle: "We’ll be in touch soon.",
    body: "Thanks for reaching out to us at Staptis. We’ve received your message and we’ll get back to you as soon as possible.",
    subBody: "If it’s urgent, feel free to reply directly to this email.",
    footer: "The Staptis Team",
  },
  nl: {
    title: "Bedankt voor uw bericht",
    subTitle: "We nemen snel contact met u op.",
    body: "Bedankt voor uw bericht aan Staptis. We hebben uw bericht ontvangen en zullen zo snel mogelijk reageren.",
    subBody: "Als het dringend is, kunt u direct op deze e-mail antwoorden.",
    footer: "Het Staptis Team",
  },
  fr: {
    title: "Merci de nous avoir contactés",
    subTitle: "Nous vous répondrons bientôt.",
    body: "Merci de nous avoir contactés chez Staptis. Nous avons bien reçu votre message et nous vous répondrons dès que possible.",
    subBody:
      "Si c'est urgent, n'hésitez pas à répondre directement à cet e-mail.",
    footer: "L'équipe Staptis",
  },
};
