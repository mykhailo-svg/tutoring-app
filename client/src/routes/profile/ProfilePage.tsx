'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileGeneralData } from './ui';
import { useToggle } from '@/shared/hooks';
import { Modal, type ModalActions } from '@/shared/ui/modals/Modal';
import { Button } from '@/shared/ui/buttons';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ImageCropper } from '@/components/ImageCropper';
import { ImageCropperApi } from '@/components/ImageCropper/ImageCropperRoot';
import {
  SystemFileSelect,
  SystemFileSelectApi,
  SystemFileSelectValidation,
} from '@/components/SystemFileSelect';
import { getUploadedImagePreview } from '@/shared/helpers/getUploadedImagePreview';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  const editAvatarModalToggler = useToggle();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const imageCropperApiRef = useRef<ImageCropperApi>(null);
  const fileSelectApiRef = useRef<SystemFileSelectApi>(null);

  const modalActions = useMemo<ModalActions>(
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
        onAction: editAvatarModalToggler.setNotActive,
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

  const imageSelectValidation = useMemo<SystemFileSelectValidation>(
    () => ({
      files: [{ type: 'image', extensions: ['png', 'jpeg', 'jpg'] }],
    }),
    []
  );

  return (
    <>
      <Modal
        title='Profile photo'
        open={editAvatarModalToggler.isActive}
        onClose={editAvatarModalToggler.setNotActive}
        onOpen={editAvatarModalToggler.setActive}
        actions={modalActions}
      >
        <div style={{ padding: '20px' }}>
          <SystemFileSelect
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
      <ProfileGeneralData
        onAvatarClick={editAvatarModalToggler.toggle}
        name={user?.name}
        role={user?.role}
        email={user?.email}
      />
    </>
  );
};

export default ProfilePage;
