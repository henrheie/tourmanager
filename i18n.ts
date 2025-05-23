import { createTranslator } from 'next-intl';

export const locales = ['nb', 'en'] as const;
export type Locale = (typeof locales)[number];

export function getTranslator(locale: Locale) {
  return createTranslator({ locale, messages: {} });
}
