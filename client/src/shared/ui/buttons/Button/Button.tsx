import classNames from 'classnames';
import { ComponentPropsWithoutRef, ReactNode, useMemo } from 'react';
import styles from './Button.module.scss';
import { ButtonDisclosure, CommonButtonSize, CommonButtonVariant } from './types';
import {
  BUTTON_DISCLOSURES,
  COMMON_BUTTON_SIZE_CLASS_MAP,
  COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS,
} from './constants';
import { Spinner } from '../../loaders';
import Link from 'next/link';

type HTMLTagType = 'button' | 'a';

type HTMLElementProps<T extends HTMLTagType> = T extends 'a'
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type ButtonProps<T extends HTMLTagType> = {
  as?: T;
  text?: string;
  loading?: boolean;
  variant?: CommonButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: CommonButtonSize;
  icon?: ReactNode;
  disclosure?: ButtonDisclosure;
} & HTMLElementProps<T>;

export function Button<T extends HTMLTagType>({
  className,
  text,
  loading = false,
  disabled = false,
  size = 'large',
  variant = 'primary',
  icon,
  as,
  fullWidth,
  disclosure,
  ...rest
}: ButtonProps<T>) {
  const Tag = useMemo(() => (as === 'a' ? Link : (as as HTMLTagType)), [as]);

  const mergedClassName = useMemo(
    () =>
      classNames(
        styles.root,
        className,
        COMMON_BUTTON_SIZE_CLASS_MAP[size],
        COMMON_BUTTON_VARIANTS_CLASSES_DEFINITIONS[variant],
        {
          [styles.disabled]: disabled || loading,
          [styles.fullWidth]: fullWidth,
        }
      ),
    [disabled, loading, className, variant, fullWidth, size]
  );

  return (
    <Tag className={mergedClassName} {...(rest as any)}>
      {icon}
      {text}
      {loading ? <Spinner /> : null}
      {disclosure && <div className={styles.disclosure}>{BUTTON_DISCLOSURES[disclosure]}</div>}
    </Tag>
  );
}
