import classNames from 'classnames';
import { ComponentPropsWithoutRef, useMemo } from 'react';

type ButtonTagType = 'button' | 'a';

type ButtonProps<T extends ButtonTagType> = T extends 'a'
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type ButtonCommonProps<T extends ButtonTagType> = {
  as: T;
  text: string;
} & ButtonProps<T>;

export function ButtonCommon<T extends ButtonTagType>({
  className,
  text,
  as,
  ...rest
}: ButtonCommonProps<T>) {
  const Tag = useMemo(() => as as ButtonTagType, [as]);

  return (
    <Tag className={classNames(className)} {...(rest as any)}>
      {text}
    </Tag>
  );
}
