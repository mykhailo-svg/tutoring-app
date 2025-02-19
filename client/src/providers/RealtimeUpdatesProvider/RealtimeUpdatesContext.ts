'use client';

import { noop } from 'lodash';
import { createContext } from 'react';
import { RealtimeUpdatesEventSubscriber, RealtimeUpdatesEventSubscriptionRemover } from './types';

type RealtimeUpdatesContextType = {
  websocket: null | WebSocket;
  subscribeEvent: RealtimeUpdatesEventSubscriber;
  unsubscribeEvent: RealtimeUpdatesEventSubscriptionRemover;
};

export const RealtimeUpdatesContext = createContext<RealtimeUpdatesContextType>({
  websocket: null,
  subscribeEvent: noop,
  unsubscribeEvent: noop,
});
