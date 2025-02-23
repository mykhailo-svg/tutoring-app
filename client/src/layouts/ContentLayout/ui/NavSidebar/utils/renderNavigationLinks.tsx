import type { ReactNode } from 'react';
import { IoHomeSharp as HomeIcon } from 'react-icons/io5';
import { FaUser as ProfileIcon } from 'react-icons/fa';

type Link = { href: string; id: string; title: string; icon: ReactNode };

export const renderNavigationLinks = (): Link[] => {
  return [
    { href: '/', title: 'Dashboard', id: 'dashboard', icon: <HomeIcon /> },
    { href: '/profile', title: 'Profile', id: 'profile', icon: <ProfileIcon /> },
    { href: '/messenger', title: 'Messenger', id: 'profile', icon: <ProfileIcon /> },
  ];
};
