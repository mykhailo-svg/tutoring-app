import Link from 'next/link';
import styles from './NavSidebar.module.scss';
import { useMemo } from 'react';
import { renderNavigationLinks } from './utils';
import classNames from 'classnames';
import { Logo } from '@/components/Logo';

type NavSidebarProps = {};

export const NavSidebar: React.FC<NavSidebarProps> = () => {
  const links = useMemo(() => renderNavigationLinks(), []);

  return (
    <aside className={styles.root}>
      <Logo />
      <nav className={styles.navigation}>
        {links.map((link) => (
          <Link
            className={classNames(styles.link, { [styles.linkActive]: link.id === 'dashboard' })}
            key={link.id}
            href={link.href}
          >
            {link.icon}
            <span> {link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
