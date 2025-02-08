'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileEditableGeneralData, ProfileGeneralData } from './ui';
import { useToggle } from '@/shared/hooks';
import { ProfileEditAvatarImage } from './ui/ProfileEditAvatarImage';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  const avatarModalToggler = useToggle();

  return (
    <div className={styles.root}>
      <ProfileEditAvatarImage
        active={avatarModalToggler.isActive}
        onClose={avatarModalToggler.setNotActive}
      />

      <ProfileGeneralData
        avatarImage={user?.avatar?.display_url}
        onAvatarClick={avatarModalToggler.toggle}
        name={user?.name}
        role={user?.role}
        email={user?.email}
      />

      <ProfileEditableGeneralData />
    </div>
  );
};

export default ProfilePage;
