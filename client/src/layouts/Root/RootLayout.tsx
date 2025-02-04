import { ReactQueryProvider } from '@/providers';
import { ReactNode } from 'react';
import styles from './RootLayout.module.scss';
import { AuthProvider } from '@/providers/AuthProvider';
import { createAuthHeaders } from '@/shared/helpers';
import { getApiEndpointUrl, APIEndpoints } from '@/api';
import { User } from '@/global_types';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '500', '600', '700', '800', '900'] });

type RootLayoutProps = {
  children: ReactNode;
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

export const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const user = await getUser();

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <ReactQueryProvider>
          <AuthProvider initialData={{ user, isAuthenticated: Boolean(user) }}>
            <main className={styles.container}>{children}</main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
