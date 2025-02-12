import { User } from '@/global_types';

export const APIEndpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  user: {
    revealCurrent: '/user',
    uploadAvatarImage: '/user/upload',
    updateUserGeneralData: '/user',
    getById: (id: User['id']) => `/user/${id}`,
  },
};

export const getApiEndpointUrl = (endpoint: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};
