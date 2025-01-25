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
import { noop } from 'lodash';

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
          maxZoom={10}
          image={imgSrc}
          crop={crop}
          cropShape='round'
          zoom={zoom}
          cropSize={{ height: 400, width: 400 }}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )
    );
  }
);
