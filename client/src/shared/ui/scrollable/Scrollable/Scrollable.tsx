import {
  DOMAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import styles from './Scrollable.module.scss';
import classNames from 'classnames';
import { mergeRefs } from 'react-merge-refs';

type ScrollableProps = {
  children?: ReactNode;
  className?: string;
  onScrolledToTop?: () => void;
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
    if (!innerRef.current) {
      return;
    }

    const handleScroll = (ev: Event) => {
      if (!innerRef.current) {
        return;
      }

      if (typeof onScrolledToTop === 'function') {
        const scrollHeight = innerRef.current.scrollHeight - innerRef.current.clientHeight;

        const scrollY =
          getComputedStyle(innerRef.current).flexDirection === 'column-reverse'
            ? Math.abs(innerRef.current.scrollTop)
            : innerRef.current.scrollTop;

        const scrolledToTop = scrollY >= scrollHeight;

        if (scrolledToTop) {
          onScrolledToTop();
        }
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
