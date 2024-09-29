import classNames from 'classnames';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import styles from './ButtonCommon.module.scss';
import { CommonButtonVariant } from './types';
import { COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS } from './constants';

type HTMLTagType = 'button' | 'a';

type HTMLElementProps<T extends HTMLTagType> = T extends 'a'
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type ButtonCommonProps<T extends HTMLTagType> = {
  as: T;
  text: string;
  loading?: boolean;
  variant?: CommonButtonVariant;
} & HTMLElementProps<T>;

export function ButtonCommon<T extends HTMLTagType>({
  className,
  text,
  variant = 'primary',
  as,
  ...rest
}: ButtonCommonProps<T>) {
  const Tag = useMemo(() => as as HTMLTagType, [as]);

  return (
    <Tag
      className={classNames(
        styles.root,
        className,
        COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS[variant]
      )}
      {...(rest as any)}
    >
      {text}
    </Tag>
  );
}
