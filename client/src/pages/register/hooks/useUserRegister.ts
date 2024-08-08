import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { registerUserRequest } from "../api";

type UseUserRegisterArgs = {};

export const useUserRegister = () => {
  const { mutate: registerRequest } = useMutation({
    mutationFn: registerUserRequest,
  });

  const registerUser = useCallback(() => {
    registerRequest({});
  }, [registerRequest]);

  return { registerUser };
};
