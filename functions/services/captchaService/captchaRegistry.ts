import { ICaptchaRegistry } from "types/service";
import { MockCaptchaService } from "services/captchaService/mockCaptchaService";
import { TurnstileCaptchaService } from "services/captchaService/turnstileCaptchaService";
import * as constants from "utils/constants";

export const captchaRegistry: ICaptchaRegistry = {
  [constants.MOCK_CAPTCHA_SERVICE]: () => new MockCaptchaService(),
  [constants.TURNSTILE_CAPTCHA_SERVICE]: (config) =>
    new TurnstileCaptchaService(config),
};
