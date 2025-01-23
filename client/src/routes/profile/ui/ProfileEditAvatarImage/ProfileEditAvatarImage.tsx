import { ImageCropper } from '@/components/ImageCropper';
import { ImageCropperApi } from '@/components/ImageCropper/ImageCropperRoot';
import {
  SystemFileSelect,
  SystemFileSelectApi,
  SystemFileSelectValidation,
} from '@/components/SystemFileSelect';
import { getUploadedImagePreview } from '@/shared/helpers/getUploadedImagePreview';
import { useToggle } from '@/shared/hooks';
import { Button } from '@/shared/ui/buttons';
import { Modal, ModalActions } from '@/shared/ui/modals/Modal';
import { useState, useRef, useMemo, useCallback } from 'react';
import { noop } from 'lodash';
import { UserAvatar } from '@/components/UserAvatar';
import { useAuth } from '@/providers/AuthProvider';
import styles from './ProfileEditAvatarImage.module.scss';

type ProfileEditAvatarImageProps = {
  onClose: () => void;
};

export const ProfileEditAvatarImage: React.FC<ProfileEditAvatarImageProps> = ({ onClose }) => {
  const { data } = useAuth();

  const editAvatarModalToggler = useToggle();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const imageCropperApiRef = useRef<ImageCropperApi>(null);
  const fileSelectApiRef = useRef<SystemFileSelectApi>(null);

  const previewModalActions = useMemo<ModalActions>(
    () => ({
      primary: {
        onAction: editAvatarModalToggler.setActive,
        text: 'Edit',
      },
      secondary: {
        onAction: onClose,
        text: 'Cancel',
      },
    }),
    [editAvatarModalToggler.setActive, onClose]
  );
  const editModalActions = useMemo<ModalActions>(
    () => ({
      primary: {
        onAction: async () => {
          if (imageCropperApiRef.current) {
            const blob = await imageCropperApiRef.current.getImageBlob();

            const formData = new FormData();

            formData.append('file', blob);

            fetch('http://localhost:5000/api/user/upload', {
              body: formData,
              method: 'POST',
            });
          }
        },
        text: 'Save',
      },
      secondary: {
        onAction: editAvatarModalToggler.setActive,
        text: 'Cancel',
      },
    }),
    [editAvatarModalToggler.setNotActive]
  );

  const handleFilePickerOpen = useCallback(() => {
    if (fileSelectApiRef.current) {
      fileSelectApiRef.current.openFileSelect();
    }
  }, []);

  const handleFilePickerError = useCallback(() => {
    console.log('error');
  }, []);

  const imageSelectValidation = useMemo<SystemFileSelectValidation>(
    () => ({
      files: [{ type: 'image', extensions: ['png', 'jpeg', 'jpg'] }],
      sizeInKB: { max: 5000 },
    }),
    []
  );

  return (
    <>
      <Modal
        title='Profile photo'
        open
        onClose={onClose}
        onOpen={noop}
        size='small'
        actions={previewModalActions}
      >
        <div className={styles.previewContent}>
          <div className={styles.previewAvatar}>
            <UserAvatar iconColor='var(--white-color)' size='huge' role={data.user?.role} />
          </div>
        </div>
      </Modal>

      <Modal
        title='Profile photo'
        open={editAvatarModalToggler.isActive}
        onClose={editAvatarModalToggler.setNotActive}
        onOpen={editAvatarModalToggler.setActive}
      >
        <div style={{ padding: '20px' }}>
          <SystemFileSelect
            onError={handleFilePickerError}
            validation={imageSelectValidation}
            onSelect={(files) => {
              getUploadedImagePreview(files[0], setSelectedFile);
            }}
            ref={fileSelectApiRef}
          />

          <ImageCropper.Root imgSrc={selectedFile} ref={imageCropperApiRef} />

          <Button
            as='button'
            onClick={handleFilePickerOpen}
            variant='primary'
            size='medium'
            text='Pick image'
          />
        </div>
      </Modal>
    </>
  );
};
