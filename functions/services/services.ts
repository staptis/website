import type {
  ICaptchaService,
  IEmailService,
  IStorageService,
  IServicesConfig,
  IValidationService,
} from "types/service";
import { ServiceNotValid } from "utils/errors";
import { storageRegistry } from "services/storageService/storageRegistry";
import { emailRegistry } from "services/emailService/emailRegistry";
import { captchaRegistry } from "services/captchaService/captchaRegistry";
import { validationRegistry } from "services/validationService/validationRegistry";

export class Services {
  storageService: IStorageService;
  emailService: IEmailService;
  captchaService: ICaptchaService;
  validationService: IValidationService;

  constructor(config: IServicesConfig) {
    this.storageService = ServiceFactory.create(
      "storageService",
      config.storageService,
      storageRegistry,
    );
    this.emailService = ServiceFactory.create(
      "emailService",
      config.emailService,
      emailRegistry,
    );
    this.captchaService = ServiceFactory.create(
      "captchaService",
      config.captchaService,
      captchaRegistry,
    );
    this.validationService = ServiceFactory.create(
      "validationService",
      config.validationService,
      validationRegistry,
    );
  }
}

class ServiceFactory {
  static create<
    K extends keyof IServicesConfig,
    V extends IServicesConfig[K],
    T extends keyof V,
    S,
  >(service: K, serviceObj: V, registry: Record<T, (config: V[T]) => S>): S {
    const type = Object.keys(serviceObj)[0] as T;
    const config = serviceObj[type] as V[T];
    console.info(
      `Initializing service ${String(service)}, with type ${String(type)}`,
    );
    const factory = registry[type];
    if (!factory) {
      throw new ServiceNotValid(String(service), String(type));
    }
    return factory(config);
  }
}
