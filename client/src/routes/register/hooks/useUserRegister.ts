import { useMutation } from '@tanstack/react-query';
import { registerUserRequest } from '../api';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useMemo } from 'react';

export const useUserRegister = () => {
  const {
    mutate: registerRequest,
    isError,
    error,
    isPending,
    data,
  } = useMutation<
    Awaited<ReturnType<typeof registerUserRequest>>,
    AxiosError,
    Parameters<typeof registerUserRequest>[0]
  >({
    mutationFn: registerUserRequest,
  });

  const translatedErrorCode = useMemo(() => {
    if (error) {
      const errorCode = error.response?.status;

      return {
        userAlreadyExists: errorCode === StatusCodes.CONFLICT,
      };
    }
    return {};
  }, [error]);

  return {
    registerRequest,
    isError,
    data,
    error: { ...error, translatedErrorCode },
    isLoading: isPending,
  };
};
