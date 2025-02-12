'use client';

import { useMemo, type ReactNode } from 'react';
import { RealtimeUpdatesContext } from './RealtimeUpdatesContext';

type RealtimeUpdatesProviderProps = {
  children: ReactNode;
};

export const RealtimeUpdatesProvider: React.FC<RealtimeUpdatesProviderProps> = ({ children }) => {
  const contextData = useMemo<Parameters<typeof RealtimeUpdatesContext.Provider>[0]['value']>(
    () => ({}),
    []
  );

  return (
    <RealtimeUpdatesContext.Provider value={contextData}>
      {children}
    </RealtimeUpdatesContext.Provider>
  );
};
