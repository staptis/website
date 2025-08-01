import { ICaptchaService } from "types/service";

export class MockCaptchaService implements ICaptchaService {
  async verifyCaptchaToken(): Promise<boolean> {
    return true;
  }
}
