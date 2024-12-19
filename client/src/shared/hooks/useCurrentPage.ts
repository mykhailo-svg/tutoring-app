import { usePathname } from 'next/navigation';

export const useCurrentPage = () => {
  const pathname = usePathname();

  return { pathname };
};
