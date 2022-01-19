import type { DSlatePlugin, Locale } from '../typing';

export default function mergeLocalteFromPlugins(
  locales: Record<string, Locale>,
  plugins: DSlatePlugin[],
) {
  const newLocales: Record<string, Locale> = { ...locales };
  for (const plugin of plugins) {
    if (!plugin.locale) continue;

    const localeNames = Object.keys(plugin.locale);
    for (const localeName of localeNames) {
      if (!newLocales[localeName]) {
        newLocales[localeName] = {
          locale: localeName,
        };
      }

      newLocales[localeName] = {
        ...newLocales[localeName],
        [plugin.type]: {
          ...(newLocales[localeName][plugin.type] ?? {}),
          ...plugin.locale[localeName],
        },
      };
    }
  }

  return newLocales;
}
