import { Language } from "types/language";
import { ProgramConfig } from "types/program";
import { FormParser } from "utils/formParser";
import { Services } from "services/services";
import {
  ValidationError,
  ConfigNotSetError,
  ServiceRequestError,
} from "utils/errors";
import { parseProgramConfig } from "utils/parseProgramConfig";

export async function onRequestPost(
  context: Parameters<PagesFunction<ProgramConfig>>[0],
) {
  const url = new URL(context.request.url);
  const language = url.searchParams.get("lang") as Language;
  const formData = await context.request.formData();
  const prospect = FormParser.parseProspect(formData);
  const captchaToken = FormParser.parseCaptchaToken(formData);
  try {
    const serviceConfig = parseProgramConfig(context.env);
    const services = new Services(serviceConfig);
    services.validationService.validateProspectData(prospect, language);
    await services.captchaService.verifyCaptchaToken(captchaToken);
    await services.storageService.storeProspect(prospect, language);
    await services.emailService.sendWelcomeEmailProspect(prospect, language);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation error:", error.field, error.message);
      return Response.redirect(`/${language}/contact`, 303);
    } else if (
      error instanceof ServiceRequestError ||
      error instanceof ConfigNotSetError
    ) {
      console.error("Service error:", error.name, error.message);
      return Response.redirect(`/${language}/contact-error`, 303);
    } else {
      console.error("Unexpected error:", error);
      return Response.redirect(`/500`, 500);
    }
  }

  return new Response(null, {
    status: 303,
    headers: { Location: `/${language}/contact/success` },
  });
}
