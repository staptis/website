import type { ICaptchaService, IEmailService, IStorageService } from "@/types";
import type { Env } from "@/services/types";
import { LogStorageService } from "@/services/storageService/logStorageService";
import { GoogleStorageService } from "@/services/storageService/googleStorageService";
import { LogEmailService } from "@/services/emailService/logEmailService";
import { ResendEmailService } from "@/services/emailService/resendEmailService";
import { LogCaptchaService } from "@/services/captchaService/logCaptchaService";
import { TurnstileCaptchaService } from "@/services/captchaService/turnstileCaptchaService";
import { ServiceNotValid } from "./errors";

export class Services {
  storageService: IStorageService;
  emailService: IEmailService;
  captchaService: ICaptchaService;

  constructor(env: Env) {
    console.info("Initializing services");
    switch (env.STORAGE_SERVICE) {
      case "LOG":
        this.storageService = new LogStorageService();
        break;
      case "GOOGLE":
        this.storageService = new GoogleStorageService(env);
        break;
      default:
        throw new ServiceNotValid("STORAGE_SERVICE", env.STORAGE_SERVICE);
    }
    switch (env.EMAIL_SERVICE) {
      case "LOG":
        this.emailService = new LogEmailService();
        break;
      case "RESEND":
        this.emailService = new ResendEmailService(env);
        break;
      default:
        throw new ServiceNotValid("EMAIL_SERVICE", env.EMAIL_SERVICE);
    }
    switch (env.CAPTCHA_SERVICE) {
      case "LOG":
        this.captchaService = new LogCaptchaService();
        break;
      case "TURNSTILE":
        this.captchaService = new TurnstileCaptchaService(env);
        break;
      default:
        throw new ServiceNotValid("CAPTCHA_SERVICE", env.CAPTCHA_SERVICE);
    }
  }
}
