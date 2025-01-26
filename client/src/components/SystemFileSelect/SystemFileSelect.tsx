import {
  type ChangeEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SystemFileSelectValidation, SystemFileSelectApi } from './types';

type SystemFileSelectProps = {
  onSelect: (files: FileList) => void;
  onError: () => void;
  validation?: SystemFileSelectValidation;
};

export const SystemFileSelect = forwardRef<SystemFileSelectApi, SystemFileSelectProps>(
  ({ onSelect, validation, onError }, ref) => {
    const filePickerRef = useRef<HTMLInputElement | null>(null);
    const [key, setKey] = useState('0');
    const openFileSelect = useCallback(() => {
      if (filePickerRef.current) {
        filePickerRef.current.click();
      }
    }, []);

    const handleSelect = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const resetValue = () => {
          event.target.value = '';
        };

        const files = event.target.files ?? ([] as any as FileList);

        for (const file of files) {
          let validated = true;

          const sizeInKb = file.size / 1024;

          const validSize =
            (!validation?.sizeInKB?.min || sizeInKb > validation?.sizeInKB?.min) &&
            (!validation?.sizeInKB?.max || sizeInKb < validation.sizeInKB.max);

          if (!validSize) {
            validated = false;
          }

          if (!validated) {
            onError();
            event.target.value = '';
            return;
          }
        }

        onSelect(files);

        resetValue();
      },
      [onSelect, onError, validation?.sizeInKB]
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
