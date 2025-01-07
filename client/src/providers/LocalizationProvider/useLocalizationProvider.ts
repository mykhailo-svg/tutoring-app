import { useContext } from 'react';
import { LocalizationProviderContext } from './LocalizationProviderContext';

export const useLocalizationProvider = () => {
  const context = useContext(LocalizationProviderContext);

  return context;
};
