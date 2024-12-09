import { base64file, blobfile } from '.';
import type { UploadFunc, UploadRequestOption } from '../typing';

export const promiseUploadFunc = (
  options: UploadRequestOption,
  customUploadRequest?: UploadFunc,
  setPercent?: (p: number) => void,
  defaultType: 'dataurl' | 'bloburl' | false = 'dataurl',
) => {
  const { onProgress, onError, onSuccess } = options;
  return new Promise<{ url?: string }>((resolve, reject) => {
    setPercent?.(1);
    const args = {
      ...options,
      onProgress: (e: { percent?: number }) => {
        onProgress?.(e);
        setPercent?.(e?.percent ?? 0);
      },
      onError: (e: Error, body?: any) => {
        reject(e);
        onError?.(e, body);
        setPercent?.(-1);
      },
      onSuccess: (body: any) => {
        onSuccess?.(body);
        setPercent?.(0);
        resolve(body);
      },
    };

    if (customUploadRequest) {
      customUploadRequest(args);
    } else {
      console.log('defaultType', defaultType);

      if (defaultType === 'dataurl') {
        base64file(args);
        return;
      }
      if (defaultType === 'bloburl') {
        blobfile(args);
        return;
      }
      alert('not support upload function');
      reject('not support upload function');
      onError?.(new Error('not support upload function'));
      setPercent?.(-1);
    }
  });
};
