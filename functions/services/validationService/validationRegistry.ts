import { IValidationRegistry } from "types/service";
import { LibValidationService } from "services/validationService/libValidationService";
import * as constants from "utils/constants";

export const validationRegistry: IValidationRegistry = {
  [constants.LIB_VALIDATION_SERVICE]: () => new LibValidationService(),
};
