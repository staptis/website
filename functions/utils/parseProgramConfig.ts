import { ConfigNotSetError, ConfigValueError } from "utils/errors";
import { ProgramConfig } from "types/program";
import {
  IServicesConfig,
  TCaptchaServiceConfig,
  TEmailServiceConfig,
  TStorageServiceConfig,
} from "types/service";
import * as constants from "utils/constants";

export function parseProgramConfig(program: ProgramConfig): IServicesConfig {
  return {
    storageService: parseProgramStorageConfig(program),
    emailService: parseProgramEmailConfig(program),
    captchaService: parseProgramCaptchaConfig(program),
    validationService: { [constants.LIB_VALIDATION_SERVICE]: null },
  };
}

function parseProgramStorageConfig(
  program: ProgramConfig,
): TStorageServiceConfig {
  if (!program.STORAGE_SERVICE) {
    throw new ConfigNotSetError("STORAGE_SERVICE");
  }
  if (program.STORAGE_SERVICE === constants.MOCK_STORAGE_SERVICE) {
    return { [constants.MOCK_STORAGE_SERVICE]: null };
  } else if (program.STORAGE_SERVICE === constants.GOOGLE_STORAGE_SERVICE) {
    if (!program.GOOGLE_CLIENT_EMAIL) {
      throw new ConfigNotSetError("GOOGLE_CLIENT_EMAIL");
    }
    if (!program.GOOGLE_PRIVATE_KEY_BASE64) {
      throw new ConfigNotSetError("GOOGLE_PRIVATE_KEY_BASE64");
    }
    if (!program.GOOGLE_SHEET_ID) {
      throw new ConfigNotSetError("GOOGLE_SHEET_ID");
    }
    if (!program.GOOGLE_SHEET_NAME) {
      throw new ConfigNotSetError("GOOGLE_SHEET_NAME");
    }
    return {
      [constants.GOOGLE_STORAGE_SERVICE]: {
        GOOGLE_CLIENT_EMAIL: program.GOOGLE_CLIENT_EMAIL,
        GOOGLE_PRIVATE_KEY_BASE64: program.GOOGLE_PRIVATE_KEY_BASE64,
        GOOGLE_SHEET_ID: program.GOOGLE_SHEET_ID,
        GOOGLE_SHEET_NAME: program.GOOGLE_SHEET_NAME,
      },
    };
  }
  throw new ConfigValueError(
    `Unknown storage service: ${program.STORAGE_SERVICE}`,
  );
}

function parseProgramEmailConfig(program: ProgramConfig): TEmailServiceConfig {
  if (!program.EMAIL_SERVICE) {
    throw new ConfigNotSetError("EMAIL_SERVICE");
  }
  if (program.EMAIL_SERVICE === constants.MOCK_EMAIL_SERVICE) {
    return { [constants.MOCK_EMAIL_SERVICE]: null };
  } else if (program.EMAIL_SERVICE === constants.RESEND_EMAIL_SERVICE) {
    if (!program.RESEND_API_KEY) {
      throw new ConfigNotSetError("RESEND_API_KEY");
    }
    return {
      [constants.RESEND_EMAIL_SERVICE]: {
        RESEND_API_KEY: program.RESEND_API_KEY,
      },
    };
  }
  throw new ConfigValueError(`Unknown email service: ${program.EMAIL_SERVICE}`);
}

function parseProgramCaptchaConfig(
  program: ProgramConfig,
): TCaptchaServiceConfig {
  if (!program.CAPTCHA_SERVICE) {
    throw new ConfigNotSetError("CAPTCHA_SERVICE");
  }
  if (program.CAPTCHA_SERVICE === constants.MOCK_CAPTCHA_SERVICE) {
    return { [constants.MOCK_CAPTCHA_SERVICE]: null };
  } else if (program.CAPTCHA_SERVICE === constants.TURNSTILE_CAPTCHA_SERVICE) {
    if (!program.TURNSTILE_SECRET_KEY) {
      throw new ConfigNotSetError("TURNSTILE_SECRET_KEY");
    }
    return {
      [constants.TURNSTILE_CAPTCHA_SERVICE]: {
        TURNSTILE_SECRET_KEY: program.TURNSTILE_SECRET_KEY,
      },
    };
  }
  throw new ConfigValueError(
    `Unknown captcha service: ${program.CAPTCHA_SERVICE}`,
  );
}
