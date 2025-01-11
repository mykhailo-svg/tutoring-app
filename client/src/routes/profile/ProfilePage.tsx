'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileGeneralData } from './ui';
import { useToggle } from '@/shared/hooks';
import { Modal } from '@/shared/ui/modals/Modal';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  const editGeneralDataModalToggler = useToggle();

  return (
    <>
      <Modal
        title='Edit general data'
        open={editGeneralDataModalToggler.isActive}
        onClose={editGeneralDataModalToggler.setNotActive}
        onOpen={editGeneralDataModalToggler.setActive}
      />
      <ProfileGeneralData
        onGeneralDataEdit={editGeneralDataModalToggler.toggle}
        name={user?.name}
        role={user?.role}
        email={user?.email}
      />
    </>
  );
};

export default ProfilePage;
