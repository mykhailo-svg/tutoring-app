import { type ChangeEvent, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import type { SystemFileSelectApi } from './types';

type SystemFileSelectProps = { onSelect: (files: FileList) => void };

export const SystemFileSelect = forwardRef<SystemFileSelectApi, SystemFileSelectProps>(
  ({ onSelect }, ref) => {
    const filePickerRef = useRef<HTMLInputElement | null>(null);

    const openFileSelect = useCallback(() => {
      if (filePickerRef.current) {
        filePickerRef.current.click();
      }

      console.log('select');
    }, []);

    const handleSelect = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onSelect(event.target.files ?? ([] as any as FileList));

        console.log(event.target.files);
      },
      [onSelect]
    );

    useImperativeHandle(ref, () => ({
      openFileSelect,
    }));

    return <input hidden onChange={handleSelect} type='file' ref={filePickerRef} />;
  }
);
