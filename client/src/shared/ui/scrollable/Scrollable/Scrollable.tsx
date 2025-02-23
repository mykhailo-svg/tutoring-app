import { useMemo, type ReactNode } from 'react';
import styles from './Scrollable.module.scss';
import classNames from 'classnames';

type ScrollableProps = {
  children?: ReactNode;
  className?: string;
};

export const Scrollable: React.FC<ScrollableProps> = ({ children, className }) => {
  const classNm = useMemo(() => classNames(styles.root, className), [className]);

  return <div className={classNm}>{children}</div>;
};
