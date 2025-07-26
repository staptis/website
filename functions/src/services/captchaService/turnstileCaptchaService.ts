import { ICaptchaService } from "@/types";
import { Env } from "@/services/types";
import { EnvironmentNotSetError, ServiceRequestError } from "@/services/errors";

export class TurnstileCaptchaService implements ICaptchaService {
  name = "TurnstileCaptchaService";
  #secretKey: string;
  constructor(env: Env) {
    console.info("initializing " + this.name);
    if (!env.TURNSTILE_SECRET_KEY) {
      throw new EnvironmentNotSetError("TURNSTILE_SECRET_KEY");
    }
    this.#secretKey = env.TURNSTILE_SECRET_KEY;
  }
  async verifyCaptchaToken(captchaToken: string): Promise<boolean> {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: this.#secretKey,
          response: captchaToken,
        }),
      },
    );
    if (!response.ok) {
      const text = await response.text();
      throw new ServiceRequestError(
        this.name,
        `Failed to verify captcha: ${response.status} - ${text}`,
      );
    }
    return true;
  }
}
