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
  action: RealtimeUpdatesAction;
};

export const RealtimeUpdatesContext = createContext<RealtimeUpdatesContextType>({
  websocket: null,
  subscribeEvent: noop,
  unsubscribeEvent: noop,
  action: noop,
});
