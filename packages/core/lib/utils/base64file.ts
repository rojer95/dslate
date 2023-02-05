import type { UploadFunc, UploadRequestOption } from "../typing";

export const base64file: UploadFunc = (option: UploadRequestOption) => {
  const reader: FileReader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      option.onSuccess?.({ url: reader.result as string });
    },
    false
  );
  reader.readAsDataURL(option.file);
};
