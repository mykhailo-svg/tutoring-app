'use client';

import { noop } from 'lodash';
import { createContext } from 'react';
import {
  RealtimeUpdatesAction,
  RealtimeUpdatesEventSubscriber,
  RealtimeUpdatesEventSubscriptionRemover,
} from './types';

type RealtimeUpdatesContextType = {
  websocket: null | WebSocket;
  subscribeEvent: RealtimeUpdatesEventSubscriber;
  unsubscribeEvent: RealtimeUpdatesEventSubscriptionRemover;
  realtimeAction: RealtimeUpdatesAction;
  websocketInitialized: boolean;
};

export const RealtimeUpdatesContext = createContext<RealtimeUpdatesContextType>({
  websocket: null,
  websocketInitialized: false,
  subscribeEvent: noop,
  unsubscribeEvent: noop,
  realtimeAction: noop,
});
