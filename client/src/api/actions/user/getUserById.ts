import { APIEndpoints, getApiEndpointUrl } from '@/api/routes';
import { User } from '@/global_types';

export const getUserById = async (userId: User['id']): Promise<User | null> => {
  const user = await fetch(getApiEndpointUrl(APIEndpoints.user.getById(userId)));

  return user.status === 200 ? user.json() : null;
};
