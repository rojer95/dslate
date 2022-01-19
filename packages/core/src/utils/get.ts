import type { Locale } from '../typing';

/**
 * this method code from
 * https://github.com/ant-design/pro-components/blob/8e5fb7f1c0a027c68465406ed915d90f33267b07/packages/provider/src/index.tsx#L96
 */

export default function get(
  source: Locale,
  path: string,
  defaultValue?: string,
): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  let message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p];
    result = Object(result)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
}
