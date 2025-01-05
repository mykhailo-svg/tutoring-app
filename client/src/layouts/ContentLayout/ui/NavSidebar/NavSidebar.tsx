'use client';

import Link from 'next/link';
import styles from './NavSidebar.module.scss';
import { useMemo } from 'react';
import { renderNavigationLinks } from './utils';
import classNames from 'classnames';
import { useCurrentPage } from '@/shared/hooks';
import { Logo } from '@/components';
import { IoIosCloseCircle as CloseIcon } from 'react-icons/io';

type NavSidebarProps = {
  mobileMenuActive: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const NavSidebar: React.FC<NavSidebarProps> = ({ mobileMenuActive, closeMenu }) => {
  const links = useMemo(() => renderNavigationLinks(), []);

  const { pathname } = useCurrentPage();

  const rootClassName = useMemo(
    () => classNames(styles.root, { [styles.mobileNotActive]: !mobileMenuActive }),
    [mobileMenuActive]
  );

  return (
    <aside className={rootClassName}>
      <div className={styles.menu}>
        <div onClick={closeMenu} className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.close}>
          <CloseIcon onClick={closeMenu} />
        </div>
      </div>

      <nav className={styles.navigation}>
        {links.map((link) => (
          <Link
            onClick={closeMenu}
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
