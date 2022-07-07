import type { DSlatePlugin, Locale } from '../typing';

export const mergeLocalteFromPlugins = (locales: Locale[], plugins: DSlatePlugin[]) => {
  const newLocales: Locale[] = [...locales];

  for (const plugin of plugins) {
    if (!plugin.locale) continue;

    for (const { locale, ...languages } of plugin.locale) {
      const target = newLocales.find((i) => i.locale === locale);
      if (target) {
        const preLanguages = { ...(target[plugin.type] || {}) };
        // 合并规则 ConfigProvider 优于 插件的语言包
        target[plugin.type] = {
          ...languages,
          ...preLanguages,
        };
      } else {
        newLocales.push({
          locale,
          [plugin.type]: {
            ...languages,
          },
        });
      }
    }
  }

  return newLocales;
};
