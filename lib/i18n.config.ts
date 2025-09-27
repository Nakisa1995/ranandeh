export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localePrefix = 'always'; // همیشه /en یا /fa در URL
