'use client';
import { useAuth } from '@/providers/AuthProvider';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const {
    data: { user },
    setAuthState,
  } = useAuth();

  return (
    <header>
      <button
        onClick={() => {
          setAuthState(() => ({ user: null }));
        }}
      >
        logout
      </button>
      {user?.name}
      {JSON.stringify(user ?? {})}
    </header>
  );
};
