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
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    async function onDownloadCropClick() {
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error('Crop canvas does not exist');
      }

      const offscreen = new OffscreenCanvas(completedCrop.width, completedCrop.height);
      const ctx = offscreen.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      ctx.drawImage(previewCanvas, 0, 0, 150, 150, 0, 0, offscreen.width, offscreen.height);

      const blob = await offscreen.convertToBlob({
        type: 'image/png',
      });

      return blob;
    }

    useImperativeHandle(ref, () => ({
      getImageBlob: onDownloadCropClick,
    }));

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
      if (aspect) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
      }
    }

    useDebounceEffect(
      async () => {
        if (
          completedCrop?.width &&
          completedCrop?.height &&
          imgRef.current &&
          previewCanvasRef.current
        ) {
          // We use canvasPreview as it's much faster than imgPreview.
          canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
        }
      },
      100,
      [completedCrop, scale, rotate]
    );

    return (
      <>
        {!!imgSrc && (
          <ReactCrop
            circularCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={150}
            minHeight={150}
            maxHeight={150}
            maxWidth={150}
          >
            <img
              ref={imgRef}
              alt='Crop me'
              src={imgSrc}
              style={{
                objectFit:"cover",
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                width: '300px',
                height: '300px',
                scale:6
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              display: 'none',
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </>
    );
  }
);

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const TO_RADIANS = Math.PI / 180;

async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as any);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
