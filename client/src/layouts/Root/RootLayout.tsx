import { ReactQueryProvider } from '@/providers';
import { ReactNode } from 'react';
import favicon from '../../../public/favicon.ico';
import styles from './RootLayout.module.scss';
import { AuthProvider } from '@/providers/AuthProvider';
import { createAuthHeaders } from '@/shared/helpers';
import { getApiEndpointUrl, APIEndpoints } from '@/api';
import { User } from '@/global_types';
import { headers } from 'next/headers';

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
      <body>
        <ReactQueryProvider>
          <AuthProvider initialData={{ user }}>
            <main className={styles.container}>{children}</main>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
