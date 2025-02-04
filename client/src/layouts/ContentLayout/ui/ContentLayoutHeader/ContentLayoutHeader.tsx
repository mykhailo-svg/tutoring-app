'use client';

import { useCurrentPage } from '@/shared/hooks';
import styles from './ContentLayoutHeader.module.scss';
import { Logo, UserAuthQuickActions } from '@/components';
import { IoIosMenu as MenuIcon } from 'react-icons/io';

type ContentLayoutHeaderProps = { toggleMenu: () => void };

export const ContentLayoutHeader: React.FC<ContentLayoutHeaderProps> = ({ toggleMenu }) => {
  const { translatedName: pageTitle } = useCurrentPage();

  return (
    <header className={styles.root}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div onClick={toggleMenu} className={styles.burger}>
        <MenuIcon />
      </div>

      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.quickActions}>
        <UserAuthQuickActions />
      </div>
    </header>
  );
};
