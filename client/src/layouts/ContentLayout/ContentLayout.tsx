import { Header } from '@/components';
import { ReactNode } from 'react';
import styles from './ContentLayout.module.scss';
import { NavSidebar } from './ui/NavSidebar/NavSidebar';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = async ({ children }) => {
  return (
    <div className={styles.root}>
      <NavSidebar />
      <div className={styles.content}>content</div>
    </div>
  );
};
