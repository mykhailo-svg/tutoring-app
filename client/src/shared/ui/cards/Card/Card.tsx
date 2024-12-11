import { MouseEventHandler, ReactNode } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';

type CardProps = {
  children?: ReactNode;
  hover?: boolean;
  active?: boolean;
  onClick?: MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({ children, onClick, hover, active }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.root, { [styles.hoverable]: hover, [styles.active]: active })}
    >
      {children}
    </div>
  );
};
