import { LanguageLevel } from '@/global_types';
import { useState } from 'react';

export const useProfileState = () => {
  const [profileData, setProfileData] = useState<ProfileDataState>({ languages: {} });

  return { profileData };
};

export type ProfileDataState = {
  languages: Record<string, LanguageLevel>;
};
