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
import { Slider } from '@/shared/ui/slider';
import { useProfileAvatarUpload } from '../../hooks';
import { User } from '@/global_types';

type ProfileEditAvatarImageProps = {
  onClose: () => void;
  active: boolean;
};

export const ProfileEditAvatarImage: React.FC<ProfileEditAvatarImageProps> = ({
  onClose,
  active,
}) => {
  const { data, setAuthState } = useAuth();
  console.log(data);

  const editAvatarModalToggler = useToggle();

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleImageSelect = useCallback(
    (files: FileList) => {
      getUploadedImagePreview(files[0], (previewUrl) => {
        setSelectedFile(previewUrl);
        editAvatarModalToggler.setActive();
      });
    },
    [setSelectedFile, editAvatarModalToggler.setActive]
  );

  const imageCropperApiRef = useRef<ImageCropperApi>(null);
  const fileSelectApiRef = useRef<SystemFileSelectApi>(null);

  const { uploadAvatar, isPending } = useProfileAvatarUpload();
  const handleFilePickerOpen = useCallback(() => {
    if (fileSelectApiRef.current) {
      fileSelectApiRef.current.openFileSelect();
    }
  }, []);

  const previewModalActions = useMemo<ModalActions>(
    () => ({
      primary: {
        onAction: handleFilePickerOpen,
        text: 'Edit',
        loading: isPending,
      },
      secondary: {
        onAction: onClose,
        text: 'Cancel',
      },
    }),
    [handleFilePickerOpen, onClose, isPending]
  );
  const editModalActions = useMemo<ModalActions>(
    () => ({
      primary: {
        onAction: async () => {
          if (imageCropperApiRef.current) {
            const blob = await imageCropperApiRef.current.getImageBlob();

            const uploadedImage = await uploadAvatar(blob);

            const uploadedImageData = await uploadedImage.json();
            editAvatarModalToggler.setNotActive();

            setSelectedFile(null);
            setAuthState((prevData) => ({
              user: { ...(prevData.user as User), avatar: uploadedImageData.data },
            }));
            onClose();
          }
        },
        text: 'Save',
        loading: isPending,
      },
      secondary: {
        onAction: editAvatarModalToggler.setActive,
        text: 'Cancel',
      },
    }),
    [editAvatarModalToggler.setNotActive, uploadAvatar, isPending]
  );

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

  const [zoom, setZoom] = useState(1);

  return (
    active && (
      <>
        <SystemFileSelect
          onError={handleFilePickerError}
          validation={imageSelectValidation}
          onSelect={handleImageSelect}
          ref={fileSelectApiRef}
        />

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
              <UserAvatar
                imageSrc={data?.user?.avatar.display_url}
                iconColor='var(--white-color)'
                size='huge'
                backgroundColor='var(--primary-color)'
                role={data.user?.role}
              />
            </div>
          </div>
        </Modal>

        <Modal
          actions={editModalActions}
          title='Profile photo'
          size='small'
          open={editAvatarModalToggler.isActive}
          onClose={editAvatarModalToggler.setNotActive}
          onOpen={editAvatarModalToggler.setActive}
        >
          <div className={styles.editAvatarModalInner}>
            <div className={styles.cropCanvas}>
              <ImageCropper.Root
                zoom={zoom}
                setZoom={setZoom}
                imgSrc={selectedFile}
                ref={imageCropperApiRef}
              />
            </div>
            <Slider min={1} max={10} onChange={setZoom} step={0.1} value={zoom} />
          </div>
        </Modal>
      </>
    )
  );
};
