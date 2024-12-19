import { Popover } from '@/shared/ui/popovers';
import styles from './ContentLayoutHeader.module.scss';

type ContentLayoutHeaderProps = {};

export const ContentLayoutHeader: React.FC<ContentLayoutHeaderProps> = () => {
  return (
    <header className={styles.root}>
      <Popover activator={<div>click</div>} >hello</Popover>
    </header>
  );
};
