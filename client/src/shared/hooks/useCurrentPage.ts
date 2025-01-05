import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '../constants/routes';

const PAGE_TITLES: Record<string, string> = {
  [APP_ROUTES.home]: 'Home',
  [APP_ROUTES.profile]: 'Profile',
};

export const useCurrentPage = () => {
  const pathname = usePathname();

  return { pathname, translatedName: PAGE_TITLES[pathname] ?? pathname };
};
