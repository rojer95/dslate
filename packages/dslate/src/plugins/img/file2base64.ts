import type { RcFile } from 'antd/lib/upload';
import type { UploadFunc } from '../../typing';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

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
