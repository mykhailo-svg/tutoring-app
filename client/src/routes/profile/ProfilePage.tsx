'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileGeneralData } from './ui';
import { useToggle } from '@/shared/hooks';
import { Modal } from '@/shared/ui/modals/Modal';
import { Button } from '@/shared/ui/buttons';
import { ChangeEvent, useRef, useState } from 'react';
import { ImageCropper } from '@/components/ImageCropper';
import { ImageCropperApi } from '@/components/ImageCropper/ImageCropperRoot';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  const editAvatarModalToggler = useToggle();

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const openFilePicker = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (ev) => {
        if (typeof fileReader.result === 'string') {
          setSelectedFile(fileReader.result);
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  const imageCropperApiRef = useRef<ImageCropperApi>(null);

  return (
    <>
      <Modal
        title='Profile photo'
        open={editAvatarModalToggler.isActive}
        onClose={editAvatarModalToggler.setNotActive}
        onOpen={editAvatarModalToggler.setActive}
      >
        <div style={{ padding: '20px' }}>
          <ImageCropper.Root imgSrc={selectedFile} ref={imageCropperApiRef} />
          <input hidden onChange={handleImageSelect} type='file' ref={filePickerRef} />

          <Button
            as='button'
            onClick={openFilePicker}
            variant='primary'
            size='medium'
            text='Pick image'
          />
          <Button
            as='button'
            onClick={async () => {
              if (imageCropperApiRef.current) {
                const blob = await imageCropperApiRef.current.getImageBlob();

                const formData = new FormData();

                formData.append('file', blob);

                fetch('http://localhost:5000/api/user/upload', {
                  body: formData,
                  method: 'POST',
                });
              }
            }}
            variant='primary'
            size='medium'
            text='Upload image'
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
