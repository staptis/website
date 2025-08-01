import { IProspect } from "types/prospect";
import { IValidationService } from "types/service";
import { Language } from "types/language";
import { ValidationError } from "utils/errors";
import { translations } from "utils/translations";

export class LibValidationService implements IValidationService {
  validateProspectData(prospect: IProspect, language: Language): boolean {
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
