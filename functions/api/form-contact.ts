import { Service } from "@/services/service";
import { Env, Language } from "@/types";
import { parseFormData } from "@/utils/form";

export async function onRequestPost(
  context: Parameters<PagesFunction<Env>>[0],
) {
  const url = new URL(context.request.url);
  const language = url.searchParams.get("lang") as Language;

  const formData = parseFormData(await context.request.formData());
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  if (!isValidEmail) {
    return Response.redirect(`/${language}/contact-error`, 303);
  }
  const services = new Service(context.env, language);
  context.waitUntil(services.handleFormSubmission(formData));

  return new Response(null, {
    status: 303,
    headers: { Location: `/${language}/contact-success` },
  });
}
