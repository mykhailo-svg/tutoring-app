import { PixelCrop } from 'react-image-crop';

export const getCroppedImageBlob = async (croppedImage: PixelCrop | undefined) => {
  if (!croppedImage) {
    throw new Error('Crop canvas does not exist');
  }

  const offscreen = new OffscreenCanvas(croppedImage.width, croppedImage.height);

  return offscreen.convertToBlob({
    type: 'image/png',
  });
};
