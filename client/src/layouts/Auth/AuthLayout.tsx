import { ReactNode } from 'react';
import styles from './AuthLayout.module.scss';

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.row}>{children}</div>
      </div>
    </div>
  );
};
