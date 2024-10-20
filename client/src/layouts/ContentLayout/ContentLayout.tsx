import { getApiEndpointUrl, APIEndpoints } from '@/api';
import { Header } from '@/components';
import { User } from '@/global_types';
import { AuthProvider } from '@/providers/AuthProvider';
import { createAuthHeaders } from '@/shared/helpers';
import { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
};

const getUser = async () => {
  try {
    const user = await fetch(getApiEndpointUrl(APIEndpoints.user.revealCurrent), {
      headers: createAuthHeaders(),
    });
    const data = await user.json();

    return data as User | null;
  } catch (error) {}

  return null;
};

export const ContentLayout: React.FC<ContentLayoutProps> = async ({ children }) => {
  const user = await getUser();

  return (
    <AuthProvider initialData={{ user }}>
      <Header /> hello{children}
    </AuthProvider>
  );
};
