import { Language } from "@/types";
import { Env } from "@/services/types";
import { FormParser } from "@/utils/formParser";
import { Services } from "@/services/services";
import { Prospect } from "@/packages/prospect";
import { ValidationError } from "@/packages/errors";
import { EnvironmentNotSetError, ServiceRequestError } from "@/services/errors";
import { translations } from "@/translations";

export async function onRequestPost(
  context: Parameters<PagesFunction<Env>>[0],
) {
  const url = new URL(context.request.url);
  const language = url.searchParams.get("lang") as Language;
  const formData = await context.request.formData();
  const prospect = FormParser.parseProspect(formData);
  const captchaToken = FormParser.parseCaptchaToken(formData);
  try {
    Prospect.validate(prospect, language);
    const services = new Services(context.env);
    await services.captchaService.verifyCaptchaToken(captchaToken);
    await services.storageService.storeProspect(prospect, language);
    // ok if this fails silently
    context.waitUntil(
      services.emailService.sendWelcomeEmailProspect(prospect, language),
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation error:", error.field, error.message);
      return Response.redirect(`/${language}/contact`, 303);
    } else if (
      error instanceof ServiceRequestError ||
      error instanceof EnvironmentNotSetError
    ) {
      console.error("Service error:", error.name, error.message);
      return Response.redirect(`/${language}/contact-error`, 303);
    } else {
      console.error("Unexpected error:", error);
      return Response.redirect(`/500`, 303);
    }
  }

  return new Response(null, {
    status: 303,
    headers: { Location: `/${language}/contact/success` },
  });
}
