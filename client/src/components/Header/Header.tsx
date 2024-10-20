'use client';
import { useAuth } from '@/providers/AuthProvider';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const {
    authData: { user },
  } = useAuth();

  return <header>{JSON.stringify(user ?? {})}</header>;
};
