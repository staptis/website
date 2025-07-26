export class EnvironmentNotSetError extends Error {
  constructor(envName: string | string[]) {
    super(
      "Environment variable(s) not set: " +
        (Array.isArray(envName) ? envName.join(", ") : envName),
    );
    this.name = "EnvironmentNotSetError";
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
