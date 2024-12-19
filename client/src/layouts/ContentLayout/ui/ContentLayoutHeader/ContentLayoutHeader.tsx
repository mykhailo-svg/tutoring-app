import styles from './ContentLayoutHeader.module.scss';

type ContentLayoutHeaderProps = {};

export const ContentLayoutHeader: React.FC<ContentLayoutHeaderProps> = () => {
  return <header className={styles.root}>header</header>;
};
