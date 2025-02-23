import { MouseEventHandler, ReactNode, useMemo } from 'react';
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
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  shadow = 'medium',
  children,
  onClick,
  hover,
  active,
  className: customClassName,
}) => {
  const rootClassName = useMemo(
    () =>
      classNames(styles.root, customClassName, CARD_SHADOW_CLASS_MAP[shadow], {
        [styles.hoverable]: hover,
        [styles.active]: active,
      }),
    [hover, active, customClassName]
  );

  return (
    <div onClick={onClick} className={rootClassName}>
      {children}
    </div>
  );
};
