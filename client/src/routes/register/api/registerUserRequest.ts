import { APIEndpoints, axiosClient } from '@/api';
import { User } from '@/global_types';

type RegisterUserRequestArgs = {
  email: string;
  password: string;
  name: string;
};

type RegisterUserResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export const registerUserRequest = async (payload: RegisterUserRequestArgs) => {
  const newUser = await axiosClient.post<RegisterUserResponse>(
    APIEndpoints.auth.register,
    payload,
    {
      withCredentials: true,
    }
  );

  return newUser;
};
