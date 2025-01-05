import { ReactNode } from 'react';
import styles from './ContentLayout.module.scss';
import { NavSidebar, ContentLayoutHeader, ContentLayoutInner } from './ui';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = async ({ children }) => {
  return (
    <div className={styles.root}>
      <ContentLayoutInner>{children}</ContentLayoutInner>
    </div>
  );
};
