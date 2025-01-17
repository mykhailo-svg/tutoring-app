import {
  type ChangeEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import type { SystemFileSelectValidation, SystemFileSelectApi } from './types';

type SystemFileSelectProps = {
  onSelect: (files: FileList) => void;
  validation?: SystemFileSelectValidation;
};

export const SystemFileSelect = forwardRef<SystemFileSelectApi, SystemFileSelectProps>(
  ({ onSelect, validation }, ref) => {
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

    const acceptableFiles = useMemo(() => {
      if (validation?.files) {
        return validation.files
          .map((file) =>
            file.extensions.map(
              (extension) => `${file.type}/${extension === 'all' ? '*' : extension}`
            )
          )
          .flat()
          .join(', ');
      }
      return undefined;
    }, [validation]);

    console.log(acceptableFiles);

    return (
      <input
        hidden
        onChange={handleSelect}
        accept={acceptableFiles}
        type='file'
        ref={filePickerRef}
      />
    );
  }
);
