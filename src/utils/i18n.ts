import { TranslationSchema, type Translation } from "@/utils/i18n-schema";
import enRaw from "@/translations/en.json";
import nlRaw from "@/translations/nl.json";
import frRaw from "@/translations/fr.json";

export const LANGUAGES = ["en", "nl", "fr"] as const;
type Language = (typeof LANGUAGES)[number];

// ✅ Validate English (source of truth)
const en = TranslationSchema.parse(enRaw);

// ❗ No schema check for other languages
const nl = nlRaw as unknown as Partial<Translation>;
const fr = frRaw as unknown as Partial<Translation>;

const translations: Record<Language, Partial<Translation>> = {
  en,
  nl,
  fr,
};

type NestedKeys<T> = T extends object
  ? { [K in keyof T]: `${K & string}${"" | `.${NestedKeys<T[K]>}`}` }[keyof T]
  : never;

export function t(
  lang: Language,
  key: NestedKeys<Translation>,
  variables?: Record<string, string>,
): string {
  const fallback = en;
  const locale = translations[lang] ?? fallback;

  const value = resolveKey(key, locale) ?? resolveKey(key, fallback);
  if (typeof value !== "string") return key;

  return interpolate(value, variables);
}

function resolveKey(key: string, obj: any): string | undefined {
  return key.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

function interpolate(template: string, vars?: Record<string, string>): string {
  if (!vars) return template;
  return template.replace(
    /{{(.*?)}}/g,
    (_, varName) => vars[varName.trim()] ?? "",
  );
}

export function getLangFromPath(pathname: string): Language {
  const parts = pathname.split("/");
  const lang = parts[1];
  return LANGUAGES.includes(lang as Language) ? (lang as Language) : "en"; // fallback to 'en'
}

export function resolveRelativePath(pathname: string): string {
  // Match the language part at the start of the pathname
  const matchedLang = pathname.split("/")[1]; // Get the first part of the path

  // If the matched language is supported, remove it
  if (LANGUAGES.includes(matchedLang as Language)) {
    return pathname.replace(`/${matchedLang}`, ""); // Remove the language part
  }

  // If no match, just return the pathname as is
  return pathname;
}

export function addLanguagePrefix(pathname: string, lang: Language): string {
  // If the language is supported and the pathname doesn't already start with a language, prepend it
  if (LANGUAGES.includes(lang) && !pathname.startsWith(`/${lang}`)) {
    return `/${lang}${pathname}`;
  }

  // If the path already starts with the language prefix, just return it as is
  return pathname;
}
