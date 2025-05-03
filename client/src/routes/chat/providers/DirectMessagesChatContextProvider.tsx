'use client';

import { type ReactNode, useMemo, useRef, useState } from 'react';
import { DirectMessagesChatContext } from './DirectMessagesChatContext';

type DirectMessagesChatContextProviderProps = {
  children: ReactNode;
};

export const DirectMessagesChatContextProvider: React.FC<
  DirectMessagesChatContextProviderProps
> = ({ children }) => {
  const contextValue = useMemo<Parameters<typeof DirectMessagesChatContext.Provider>[0]['value']>(
    () => ({}),
    []
  );

  return (
    <DirectMessagesChatContext.Provider value={contextValue}>
      {children}
    </DirectMessagesChatContext.Provider>
  );
};
