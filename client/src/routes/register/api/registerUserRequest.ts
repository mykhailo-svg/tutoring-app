import { APIEndpoints, getApiEndpointUrl } from '@/api';

type RegisterUserRequestArgs = {
  email: string;
  password: string;
  name: string;
};

export const registerUserRequest = async (payload: RegisterUserRequestArgs) => {
  const newUser = await fetch(getApiEndpointUrl(APIEndpoints.auth.register), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  //   return await newUser.json();
};
