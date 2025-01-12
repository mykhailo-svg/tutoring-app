import type { ReactNode } from 'react';
import styles from './Scrollable.module.scss';

type ScrollableProps = {
  children?: ReactNode;
};

export const Scrollable: React.FC<ScrollableProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
