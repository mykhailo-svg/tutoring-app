'use client';

import { ReactNode, useMemo } from 'react';
import {
  LocalizationProviderContext,
  LocalizationProviderContextType,
} from './LocalizationProviderContext';

type LocalizationProviderProps = {
  language: string;
  children: ReactNode;
};

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  language,
  children,
}) => {
  const context = useMemo<LocalizationProviderContextType>(
    () => ({ data: { language } }),
    [language]
  );

  return (
    <LocalizationProviderContext.Provider value={context}>
      {children}
    </LocalizationProviderContext.Provider>
  );
};
