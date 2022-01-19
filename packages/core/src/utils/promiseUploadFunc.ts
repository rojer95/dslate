import type { UploadFunc } from '../typing';
import type {
  UploadProgressEvent,
  UploadRequestError,
  UploadRequestOption,
} from 'rc-upload/lib/interface';
import { base64file } from '.';

export const promiseUploadFunc = (
  options: UploadRequestOption,
  func?: UploadFunc,
  setPercent?: (p: number) => void,
) => {
  const { onProgress: RcOnProgress, onError, onSuccess } = options;
  return new Promise<{ url?: string }>((resolve, reject) => {
    const args = {
      ...options,
      onProgress: (e: UploadProgressEvent) => {
        RcOnProgress?.(e);
        setPercent?.(e?.percent ?? 0);
      },
      onError: (e: UploadRequestError | ProgressEvent<EventTarget>) => {
        reject(e);
        onError?.(e);
        setPercent?.(-1);
      },
      onSuccess: (body: any) => {
        onSuccess?.(body);
        setPercent?.(0);
        resolve(body);
      },
    };
    if (func) {
      func(args);
    } else {
      base64file(args);
    }
  });
};
