export const defaultFileUpload = (file: File) => {
  return new Promise((resolve) => {
    const reader: FileReader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result);
      },
      false,
    );
    reader.readAsDataURL(file);
  });
};
