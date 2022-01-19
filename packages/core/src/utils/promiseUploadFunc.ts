import type { UploadFunc } from '../typing';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

export default function promiseUploadFunc(
  func: UploadFunc,
  options: UploadRequestOption,
  setPercent?: (p: number) => void,
) {
  const { onProgress: RcOnProgress, onError, onSuccess } = options;
  return new Promise<{ url?: string }>((resolve, reject) => {
    func({
      ...options,
      onProgress: (e) => {
        RcOnProgress?.(e);
        setPercent?.(e?.percent ?? 0);
      },
      onError: (e) => {
        reject(e);
        onError?.(e);
        setPercent?.(-1);
      },
      onSuccess: (body) => {
        onSuccess?.(body);
        setPercent?.(0);
        resolve(body);
      },
    });
  });
}
