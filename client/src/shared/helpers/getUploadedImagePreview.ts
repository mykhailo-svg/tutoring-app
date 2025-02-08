export const getUploadedImagePreview = (file: File, onFinish: (src: string) => void) => {
  const fileReader = new FileReader();

  fileReader.onload = (ev) => {
    if (typeof fileReader.result === 'string') {
      onFinish(fileReader.result);
    }
  };

  fileReader.readAsDataURL(file);
};
