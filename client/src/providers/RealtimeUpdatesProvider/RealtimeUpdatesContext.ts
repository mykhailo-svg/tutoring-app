'use client';

import { noop } from 'lodash';
import { createContext } from 'react';
import { RealtimeUpdatesEventSubscriber } from './types';

type RealtimeUpdatesContextType = {
  websocket: null | WebSocket;
  subscribeEvent: RealtimeUpdatesEventSubscriber;
};

export const RealtimeUpdatesContext = createContext<RealtimeUpdatesContextType>({
  websocket: null,
  subscribeEvent: noop,
});
