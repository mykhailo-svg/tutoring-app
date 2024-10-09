import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginUser } from '../api/loginUser';

export const useLogin = () => {
  const {
    mutate: loginRequest,
    isError,
    error,
    isPending,
    data,
  } = useMutation<
    Awaited<ReturnType<typeof loginUser>>,
    AxiosError,
    Parameters<typeof loginUser>[0]
  >({
    mutationFn: loginUser,
  });

  return { loginRequest };
};
