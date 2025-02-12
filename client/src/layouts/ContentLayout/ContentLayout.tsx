import { ReactNode } from 'react';
import styles from './ContentLayout.module.scss';
import { ContentLayoutInner } from './ui';
import { RealtimeUpdatesProvider } from '@/providers/RealtimeUpdatesProvider';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = async ({ children }) => {
  return (
    <RealtimeUpdatesProvider>
      <div className={styles.root}>
        <ContentLayoutInner>{children}</ContentLayoutInner>
      </div>
    </RealtimeUpdatesProvider>
  );
};
