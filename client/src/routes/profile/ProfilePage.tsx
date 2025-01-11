'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileGeneralData } from './ui';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  return <ProfileGeneralData name={user?.name} role={user?.role} email={user?.email} />;
};

export default ProfilePage;
