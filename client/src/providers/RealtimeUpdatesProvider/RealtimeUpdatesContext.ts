import { createContext } from 'react';

type RealtimeUpdatesContextType = { websocket: null | WebSocket };

export const RealtimeUpdatesContext = createContext<RealtimeUpdatesContextType>({
  websocket: null,
});
