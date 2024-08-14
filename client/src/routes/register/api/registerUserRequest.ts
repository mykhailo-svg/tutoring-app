import { APIEndpoints, getApiEndpointUrl } from '@/api';
import axios from 'axios';

type RegisterUserRequestArgs = {
  email: string;
  password: string;
  name: string;
};

export const registerUserRequest = async (payload: RegisterUserRequestArgs) => {
  await axios.get('http://localhost:5000/api', { withCredentials: true });

  await axios.post(getApiEndpointUrl(APIEndpoints.auth.register), payload, {
    withCredentials: true,
  });
  //   return await newUser.json();
};
