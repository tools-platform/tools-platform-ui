export const defaultLocale = "es" as const;

export const supportedLocales = ["es", "en", "hi"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, { label: Record<Locale, string>; nativeLabel: string }> = {
  es: {
    label: {
      es: "Español",
      en: "Spanish",
      hi: "स्पेनिश"
    },
    nativeLabel: "Español"
  },
  en: {
    label: {
      es: "Inglés",
      en: "English",
      hi: "अंग्रेज़ी"
    },
    nativeLabel: "English"
  },
  hi: {
    label: {
      es: "Hindi",
      en: "Hindi",
      hi: "हिन्दी"
    },
    nativeLabel: "हिन्दी"
  }
};

export function isSupportedLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}
