'use client';
import { useAuth } from '@/providers/AuthProvider';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const {
    data: { user },
    setAuthState,
    logout,
  } = useAuth();

  // useLayoutEffect(() => {
  //   if (!user) {
  //     redirect('/auth/login');
  //   }
  // }, []);

  return (
    <header>
      <button
        onClick={() => {
          // setAuthState(() => ({ user: null }));

          logout();
        }}
      >
        logout
      </button>
      {user?.name}
      {JSON.stringify(user ?? {})}
    </header>
  );
};
