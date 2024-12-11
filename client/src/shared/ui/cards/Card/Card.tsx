import { ReactNode } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';

type CardProps = { children?: ReactNode; hover?: boolean; active?: boolean };

export const Card: React.FC<CardProps> = ({ children, hover, active }) => {
  return (
    <div
      className={classNames(styles.root, { [styles.hoverable]: hover, [styles.active]: active })}
    >
      {children}
    </div>
  );
};
