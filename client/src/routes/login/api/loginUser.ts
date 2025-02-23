import { APIEndpoints, axiosClient } from '@/api';

type LoginUserArgs = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginUserArgs) => {
  const loginResponse = await axiosClient.post(APIEndpoints.auth.login, data);

  return loginResponse;
};
