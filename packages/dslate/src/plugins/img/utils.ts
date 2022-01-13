import type { RcFile } from 'antd/lib/upload';
import type { UploadFunc } from '../../typing';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

export const promiseUploadFunc = (
  func: UploadFunc,
  options: UploadRequestOption,
  setPercent?: (p: number) => void,
) => {
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
};

export const file2base64: UploadFunc = (option: UploadRequestOption) => {
  const reader: FileReader = new FileReader();
  reader.addEventListener(
    'load',
    () => {
      option.onSuccess?.({ url: reader.result });
    },
    false,
  );
  reader.readAsDataURL(option.file as RcFile);
};
