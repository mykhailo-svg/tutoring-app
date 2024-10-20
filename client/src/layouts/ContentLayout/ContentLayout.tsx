import { Header } from '@/components';
import { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = async ({ children }) => {
  return (
    <>
      <Header /> hello{children}
    </>
  );
};
