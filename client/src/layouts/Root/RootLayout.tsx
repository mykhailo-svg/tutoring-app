import { ReactQueryProvider } from '@/providers';
import { ReactNode } from 'react';
import favicon from '../../../public/favicon.ico';
import styles from './RootLayout.module.scss';

type RootLayoutProps = {
  children: ReactNode;
};
export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href={favicon.src} sizes='any' />
      </head>
      <body>
        <ReactQueryProvider>
          <main className={styles.container}>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
