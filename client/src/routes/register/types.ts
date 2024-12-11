import { USER_ROLE } from '@/global_types';

export type RegisterPageFields = {
  email: string;
  name: string;
  password: string;
  role: USER_ROLE;
};
