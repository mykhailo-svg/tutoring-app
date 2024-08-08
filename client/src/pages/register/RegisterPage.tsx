"use client";
import { useUserRegister } from "./hooks/useUserRegister";

type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { registerUser } = useUserRegister();

  return (
    <div>
      <button onClick={registerUser}>register</button>
    </div>
  );
};
