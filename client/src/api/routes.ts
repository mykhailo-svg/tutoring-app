export const APIEndpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
  },
  user: {
    revealCurrent: '/user',
  },
};

export const getApiEndpointUrl = (endpoint: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};
