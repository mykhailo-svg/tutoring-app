import { useState, forwardRef, useImperativeHandle } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImage } from './helpers';
import { min, noop } from 'lodash';

type ImageCropperRootProps = {
  imgSrc: string | null;
  zoom: number;
  setZoom: (value: number) => void;
};

export type ImageCropperApi = {
  getImageBlob: () => Promise<Blob>;
};

export const ImageCropperRoot = forwardRef<ImageCropperApi, ImageCropperRootProps>(
  ({ zoom = 1, setZoom = noop, imgSrc }, ref) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [cropSize, setCropSize] = useState({ height: 400, width: 400 });

    const [croppedPixels, setCroppedPixels] = useState<Area>();

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedPixels(croppedAreaPixels);
    };

    useImperativeHandle(ref, () => ({
      getImageBlob: () => getCroppedImage(imgSrc, croppedPixels, 0) as any,
    }));

    return (
      imgSrc && (
        <Cropper
          onMediaLoaded={(size) => {
            const minValue = min(Object.values(size));

            if (minValue && minValue < cropSize.height) {
              setCropSize({ width: minValue, height: minValue });
            } else {
              setCropSize({ width: 400, height: 400 });
            }
          }}
          maxZoom={10}
          image={imgSrc}
          crop={crop}
          zoom={zoom}
          cropSize={cropSize}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )
    );
  }
);
