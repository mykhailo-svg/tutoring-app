import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '../constants/routes';
import { useMemo } from 'react';

const PAGE_TITLES: Record<string, string> = {
  [APP_ROUTES.home]: 'Home',
  [APP_ROUTES.profile]: 'Profile',
  [APP_ROUTES.messenger.root]: 'Messenger',
};

export const useCurrentPage = () => {
  const pathname = usePathname();

  const rootPathName = useMemo(() => {
    return `/${pathname.split('/')[1]}`;
  }, [pathname]);

  return { pathname, translatedName: PAGE_TITLES[rootPathName] ?? rootPathName };
};
