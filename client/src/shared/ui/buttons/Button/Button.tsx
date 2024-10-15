import classNames from 'classnames';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import styles from './Button.module.scss';
import { CommonButtonVariant } from './types';
import { COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS } from './constants';
import { Spinner } from '../../loaders';
import Link from 'next/link';

type HTMLTagType = 'button' | 'a';

type HTMLElementProps<T extends HTMLTagType> = T extends 'a'
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type ButtonProps<T extends HTMLTagType> = {
  as: T;
  text: string;
  loading?: boolean;
  variant?: CommonButtonVariant;
  disabled?: boolean;
} & HTMLElementProps<T>;

export function Button<T extends HTMLTagType>({
  className,
  text,
  loading = false,
  disabled = false,
  variant = 'primary',
  as,
  ...rest
}: ButtonProps<T>) {
  const Tag = useMemo(() => (as === 'a' ? Link : (as as HTMLTagType)), [as]);

  return (
    <Tag
      className={classNames(
        styles.root,
        className,
        COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS[variant],
        { [styles.disabled]: disabled || loading }
      )}
      {...(rest as any)}
    >
      {text}
      {loading ? <Spinner /> : null}
    </Tag>
  );
}
