import { ReactQueryProvider } from '@/providers';
import { ReactNode } from 'react';
import styles from './RootLayout.module.scss';
import { AuthProvider } from '@/providers/AuthProvider';
import { createAuthHeaders } from '@/shared/helpers';
import { getApiEndpointUrl, APIEndpoints } from '@/api';
import { User } from '@/global_types';
import { Poppins } from 'next/font/google';
import { dir } from 'i18next';
import { LocalizationProvider } from '@/providers/LocalizationProvider';

const poppins = Poppins({ weight: ['400', '700', '800', '900'] });

const languages = ['en', 'de'];

type RootLayoutProps = {
  children: ReactNode;
  params: {
    lng: string;
  };
};

const getUser = async () => {
  try {
    const user = await fetch(getApiEndpointUrl(APIEndpoints.user.revealCurrent), {
      headers: await createAuthHeaders(),
      cache: 'no-cache',
    });
    const data = await user.json();

    return user.ok ? data : (null as User | null);
  } catch (error) {}

  return null;
};

export const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  const user = await getUser();

  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={poppins.className}>
        <ReactQueryProvider>
          <AuthProvider initialData={{ user }}>
            <LocalizationProvider language={lng}>
              <main className={styles.container}>{children}</main>
            </LocalizationProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
