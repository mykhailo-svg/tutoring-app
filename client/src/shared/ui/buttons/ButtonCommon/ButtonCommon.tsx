import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

type ButtonProps<T extends boolean> = T extends true
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type ButtonCommonProps<T extends boolean> = {
  isLink: T;
  text: string;
} & ButtonProps<T>;

export function ButtonCommon<T extends boolean>({
  isLink,
  className,
  text,
  ...rest
}: ButtonCommonProps<T>) {
  if (isLink) {
    return (
      <a className={classNames(className)} {...(rest as ComponentPropsWithoutRef<'a'>)}>
        {text}
      </a>
    );
  } else {
    return (
      <button className={classNames(className)} {...(rest as ComponentPropsWithoutRef<'button'>)}>
        {text}
      </button>
    );
  }
}
