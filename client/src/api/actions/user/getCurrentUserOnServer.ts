import { APIEndpoints, getApiEndpointUrl } from '@/api/routes';
import type { User } from '@/global_types';
import { createAuthHeaders } from '@/shared/helpers';

export const getCurrentUserOnServer = async () => {
  try {
    const user = await fetch(getApiEndpointUrl(APIEndpoints.user.revealCurrent), {
      headers: await createAuthHeaders(),
      cache: 'no-cache',
    });
    const data = await user.json();

    return user.ok ? data : (null as User | null);
  } catch (error) {}

  return null;
};
