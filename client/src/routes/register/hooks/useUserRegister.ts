import { useMutation } from '@tanstack/react-query';
import { registerUserRequest } from '../api';

export const useUserRegister = () => {
  const { mutate: registerRequest } = useMutation({
    mutationFn: registerUserRequest,
  });

  return { registerRequest };
};
