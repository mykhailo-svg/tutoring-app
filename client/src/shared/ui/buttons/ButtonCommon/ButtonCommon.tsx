import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

type ButtonCommonProps = {
  isLink: boolean;
  text: string;
};

type ButtonProps<T extends boolean> = T extends true
  ? ComponentPropsWithoutRef<'a'>
  : ComponentPropsWithoutRef<'button'>;

type CombinedButtonProps<T extends boolean> = ButtonCommonProps & ButtonProps<T>;

export function ButtonCommon<T extends boolean>({
  isLink,
  className,
  text,
  ...rest
}: CombinedButtonProps<T>) {
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
