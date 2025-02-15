import { useContext } from 'react';
import { RealtimeUpdatesContext } from './RealtimeUpdatesContext';

export const useRealtimeUpdates = () => {
  const context = useContext(RealtimeUpdatesContext);

  return context;
};
