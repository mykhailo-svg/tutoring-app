import { USER_ROLE } from '@/global_types';

const TRANSLATIONS: Record<USER_ROLE, string> = {
  [USER_ROLE.OWNER]: 'Teacher',
  [USER_ROLE.STUDENT]: 'Student',
};

export const translateUserRole = (role: USER_ROLE | undefined | null) =>
  role && TRANSLATIONS[role] ? TRANSLATIONS[role] : 'User';
