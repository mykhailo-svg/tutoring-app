import Image from 'next/image';
import LogoImage from '@/shared/assets/logo.svg';
import styles from './Logo.module.scss';

type LogoProps = {};

export const Logo: React.FC<LogoProps> = () => {
  return (
    <div className={styles.root}>
      <Image width={50} height={50} alt='logo' src={LogoImage} />
      <span>Tutorlify</span>
    </div>
  );
};
