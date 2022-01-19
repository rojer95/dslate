import type { RcFile } from 'antd/lib/upload';
import type { UploadFunc } from '@dslate/core';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

export const base64file: UploadFunc = (option: UploadRequestOption) => {
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
