'use client';

import Link from 'next/link';
import styles from './NavSidebar.module.scss';
import { useMemo } from 'react';
import { renderNavigationLinks } from './utils';
import classNames from 'classnames';
import { Logo } from '@/components/Logo';
import { useCurrentPage } from '@/shared/hooks';

type NavSidebarProps = {};

export const NavSidebar: React.FC<NavSidebarProps> = () => {
  const links = useMemo(() => renderNavigationLinks(), []);

  const { pathname } = useCurrentPage();

  return (
    <aside className={styles.root}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <nav className={styles.navigation}>
        {links.map((link) => (
          <Link
            className={classNames(styles.link, { [styles.linkActive]: link.href === pathname })}
            key={link.id}
            href={link.href}
          >
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
