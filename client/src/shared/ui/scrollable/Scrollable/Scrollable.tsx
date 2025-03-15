import { MutableRefObject, useEffect, useMemo, useRef, type ReactNode } from 'react';
import styles from './Scrollable.module.scss';
import classNames from 'classnames';
import { mergeRefs } from 'react-merge-refs';

export type ScrollableOnScrolledToTop = {
  action: () => void;
};

type ScrollableProps = {
  children?: ReactNode;
  className?: string;
  onScrolledToTop?: ScrollableOnScrolledToTop;
  ref?: MutableRefObject<HTMLDivElement | null>;
};

export const Scrollable: React.FC<ScrollableProps> = ({
  children,
  className,
  ref,
  onScrolledToTop,
}) => {
  const classNm = useMemo(() => classNames(styles.root, className), [className]);

  const innerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!innerRef.current || !onScrolledToTop) {
      return;
    }

    const handleScroll = (ev: Event) => {
      if (!innerRef.current) {
        return;
      }

      const scrollHeight = innerRef.current.scrollHeight - innerRef.current.clientHeight;
      const scrollY =
        getComputedStyle(innerRef.current).flexDirection === 'column-reverse'
          ? Math.abs(innerRef.current.scrollTop)
          : innerRef.current.scrollTop;

      const scrolledToTop = scrollY >= scrollHeight;

      if (scrolledToTop) {
        onScrolledToTop.action();
      }
    };

    innerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      innerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [onScrolledToTop]);

  return (
    <div ref={mergeRefs([ref, innerRef])} className={classNm}>
      {children}
    </div>
  );
};
