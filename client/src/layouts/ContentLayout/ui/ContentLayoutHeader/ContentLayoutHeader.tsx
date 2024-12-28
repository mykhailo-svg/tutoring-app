'use client';

import { useCurrentPage } from '@/shared/hooks';
import styles from './ContentLayoutHeader.module.scss';
import { Logo, UserAuthQuickActions } from '@/components';

type ContentLayoutHeaderProps = {};

export const ContentLayoutHeader: React.FC<ContentLayoutHeaderProps> = () => {
  const { translatedName: pageTitle } = useCurrentPage();

  return (
    <header className={styles.root}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <h1 className={styles.title}>{pageTitle}</h1>
      <UserAuthQuickActions />
    </header>
  );
};
