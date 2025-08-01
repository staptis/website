export class ValidationError extends Error {
  field: string;
  constructor(message: string, field: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

export class ConfigNotSetError extends Error {
  constructor(envName: string | string[]) {
    super(
      "Config  not set: " +
        (Array.isArray(envName) ? envName.join(", ") : envName),
    );
    this.name = "ConfigNotSetError";
  }
}

export class ConfigValueError extends Error {
  constructor(envName: string | string[]) {
    super(
      "Incorrect config(s): " +
        (Array.isArray(envName) ? envName.join(", ") : envName),
    );
    this.name = "ConfigValueError";
  }
}

export class ServiceRequestError extends Error {
  constructor(serviceName: string, message: string) {
    super(`Fetch request occurred in ${serviceName}: ${message}`);
    this.name = "ServiceRequestError";
  }
}

export class ServiceNotValid extends Error {
  constructor(serviceType: string, serviceName: string) {
    super(`Service name for type ${serviceType} is not valid: ${serviceName}`);
    this.name = "ServiceNotValid";
  }
}
