import { ICaptchaService } from "@/types";

export class LogCaptchaService implements ICaptchaService {
  name = "LogCaptchaService";
  constructor() {
    console.info("initializing " + this.name);
  }
  async verifyCaptchaToken(): Promise<boolean> {
    return true;
  }
}
