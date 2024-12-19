import { ReactNode } from 'react';
import styles from './ContentLayout.module.scss';
import { NavSidebar, ContentLayoutHeader } from './ui';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = async ({ children }) => {
  return (
    <div className={styles.root}>
      <NavSidebar />
      <div className={styles.content}>
        <ContentLayoutHeader />
        <div className={styles.inner}>content{children}</div>
      </div>
    </div>
  );
};
