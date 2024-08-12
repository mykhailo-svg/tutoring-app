import { APIEndpoints, getApiEndpointUrl } from '@/api';
import axios from 'axios';

type RegisterUserRequestArgs = {
  email: string;
  password: string;
  name: string;
};

export const registerUserRequest = async (payload: RegisterUserRequestArgs) => {
  axios.get('http://localhost:5000/api', { withCredentials: true });

  //   return await newUser.json();
};
