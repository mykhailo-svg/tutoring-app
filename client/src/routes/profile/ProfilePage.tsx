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
import { ProfileEditAvatarImage } from './ui/ProfileEditAvatarImage';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  const avatarModalToggler = useToggle();

  return (
    <>
      {avatarModalToggler.isActive && (
        <ProfileEditAvatarImage onClose={avatarModalToggler.setNotActive} />
      )}

      <ProfileGeneralData
        onAvatarClick={avatarModalToggler.toggle}
        name={user?.name}
        role={user?.role}
        email={user?.email}
      />
    </>
  );
};

export default ProfilePage;
