'use client';

import { getI18nOptions } from '@/app/i18n/config';
import { createContext } from 'react';

export type LocalizationProviderContextType = { data: { language: string } };

export const LocalizationProviderContext = createContext<LocalizationProviderContextType>({
  data: { language: getI18nOptions().fallbackLng },
});
