import { ResendEmailServiceConfig, IEmailRegistry } from "types/service";
import { MockEmailService } from "services/emailService/mockEmailService";
import { ResendEmailService } from "services/emailService/resendEmailService";
import * as constants from "utils/constants";

export const emailRegistry: IEmailRegistry = {
  [constants.MOCK_EMAIL_SERVICE]: () => new MockEmailService(),
  [constants.RESEND_EMAIL_SERVICE]: (config: ResendEmailServiceConfig) =>
    new ResendEmailService(config),
};
