import { MouseEventHandler, ReactNode } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { CardShadow } from './types';
import { CARD_SHADOW_CLASS_MAP } from './constants';

type CardProps = {
  children?: ReactNode;
  hover?: boolean;
  active?: boolean;
  shadow?: CardShadow;
  onClick?: MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  shadow = 'medium',
  children,
  onClick,
  hover,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.root, CARD_SHADOW_CLASS_MAP[shadow], {
        [styles.hoverable]: hover,
        [styles.active]: active,
      })}
    >
      {children}
    </div>
  );
};
