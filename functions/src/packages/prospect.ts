import { Language, IProspect } from "@/types";
import { ValidationError } from "@/packages/errors";
import { translations } from "@/translations";

//translate error messages to the correct language
export class Prospect {
  static validate(prospect: IProspect, language: Language): boolean {
    if (!prospect.name) {
      throw new ValidationError(
        "name",
        translations[language].emptyNameValidationError,
      );
    }
    if (!prospect.email) {
      throw new ValidationError(
        "email",
        translations[language].emptyEmailValidationError,
      );
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(prospect.email);
    if (!isValidEmail) {
      throw new ValidationError(
        "email",
        translations[language].invalidEmailValidationError,
      );
    }

    return true;
  }
}
