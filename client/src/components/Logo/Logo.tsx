import Image from 'next/image';
import LogoImage from '@/shared/assets/logo.svg';
import styles from './Logo.module.scss';
import Link from 'next/link';
import { APP_ROUTES } from '@/shared/constants/routes';

type LogoProps = {};

export const Logo: React.FC<LogoProps> = () => {
  return (
    <Link href={APP_ROUTES.home} className={styles.root}>
      <Image width={50} height={50} alt='logo' src={LogoImage} />
      <span>Tutorlify</span>
    </Link>
  );
};
