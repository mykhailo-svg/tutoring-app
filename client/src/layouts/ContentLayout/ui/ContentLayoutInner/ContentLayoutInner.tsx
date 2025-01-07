'use client';
import type { ReactNode } from 'react';
import { ContentLayoutHeader } from '../ContentLayoutHeader';
import { NavSidebar } from '../NavSidebar';
import styles from './ContentLayoutInner.module.scss';
import { useToggle } from '@/shared/hooks';
import { useTranslation } from '@/app/i18n/client';

type ContentLayoutInnerProps = { children?: ReactNode };

export const ContentLayoutInner: React.FC<ContentLayoutInnerProps> = ({ children }) => {
  const mobileMenuToggler = useToggle(false);

  const { t } = useTranslation('translation', '');

  return (
    <>
      <NavSidebar
        mobileMenuActive={mobileMenuToggler.isActive}
        closeMenu={mobileMenuToggler.setNotActive}
        openMenu={mobileMenuToggler.setActive}
      />
      <div className={styles.content}>
        <ContentLayoutHeader toggleMenu={mobileMenuToggler.toggle} />
        <div className={styles.inner}>content{children}</div>
      </div>
    </>
  );
};
