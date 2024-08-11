import classNames from 'classnames';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import styles from './ButtonCommon.module.scss';

type HTMLTagType = 'button' | 'a';

type HTMLElementProps<T extends HTMLTagType> = T extends 'a'
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type ButtonCommonProps<T extends HTMLTagType> = {
  as: T;
  text: string;
  loading?: boolean;
} & HTMLElementProps<T>;

export function ButtonCommon<T extends HTMLTagType>({
  className,
  text,
  as,
  ...rest
}: ButtonCommonProps<T>) {
  const Tag = useMemo(() => as as HTMLTagType, [as]);

  return (
    <Tag className={classNames(styles.root, className)} {...(rest as any)}>
      {text}
    </Tag>
  );
}
