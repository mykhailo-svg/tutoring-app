import {
  useState,
  useRef,
  DependencyList,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImage } from './helpers';

type ImageCropperRootProps = {
  imgSrc: string | null;
  scale?: number;
  rotate?: number;
  aspect?: number | undefined;
};

export type ImageCropperApi = {
  getImageBlob: () => Promise<Blob>;
};

export const ImageCropperRoot = forwardRef<ImageCropperApi, ImageCropperRootProps>(
  ({ scale = 1, rotate, aspect, imgSrc }, ref) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [croppedPixels, setCroppedPixels] = useState<Area>();

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedPixels(croppedAreaPixels);
    };

    useImperativeHandle(ref, () => ({
      getImageBlob: () => getCroppedImage(imgSrc, croppedPixels, 0) as any,
    }));

    return (
      <div style={{ position: 'relative', height: '300px', width: '300px' }}>
        {!!imgSrc && (
          <Cropper
            image={imgSrc}
            crop={crop}
            cropShape='round'
            zoom={zoom}
            cropSize={{ height: 150, width: 150 }}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
    );
  }
);
