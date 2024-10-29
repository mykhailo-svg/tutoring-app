'use client';
import { useAuth } from '@/providers/AuthProvider';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const {
    data: { user },
    logout,
  } = useAuth();

  return (
    <header>
      <button onClick={logout}>logout</button>
      {user?.name}
      {JSON.stringify(user ?? {})}
    </header>
  );
};
