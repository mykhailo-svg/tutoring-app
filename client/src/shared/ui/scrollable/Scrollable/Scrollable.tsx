import { MutableRefObject, useMemo, type ReactNode } from 'react';
import styles from './Scrollable.module.scss';
import classNames from 'classnames';

type ScrollableProps = {
  children?: ReactNode;
  className?: string;
  ref: MutableRefObject<HTMLDivElement | null>;
};

export const Scrollable: React.FC<ScrollableProps> = ({ children, className, ref }) => {
  const classNm = useMemo(() => classNames(styles.root, className), [className]);

  return (
    <div ref={ref} className={classNm}>
      {children}
    </div>
  );
};
