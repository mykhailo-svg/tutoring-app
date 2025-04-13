'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { RealtimeUpdatesContext } from './RealtimeUpdatesContext';
import cookies from 'js-cookie';
import { COOKIES_NAME } from '@/global_types';
import {
  REALTIME_UPDATES_EVENTS,
  RealtimeUpdatesAction,
  RealtimeUpdatesEventHandler,
  RealtimeUpdatesEventSubscriber,
  RealtimeUpdatesEventSubscriptionRemover,
} from './types';

type RealtimeUpdatesProviderProps = {
  children: ReactNode;
};

export const RealtimeUpdatesProvider: React.FC<RealtimeUpdatesProviderProps> = ({ children }) => {
  const [websocketInstance, setWebsocketInstance] = useState<null | WebSocket>(null);

  const [websocketInitialized, setWebsocketInitialized] = useState(false);

  const eventSubscriptionsRef = useRef<
    Partial<
      Record<
        (typeof REALTIME_UPDATES_EVENTS)[keyof typeof REALTIME_UPDATES_EVENTS],
        Record<string, RealtimeUpdatesEventHandler>
      >
    >
  >({});

  useEffect(() => {
    const websocket = new WebSocket(
      `ws://localhost:5000?accessToken=${cookies.get(COOKIES_NAME.ACCESS_TOKEN)}`
    );

    websocket.onopen = () => {
      setWebsocketInitialized(true);
    };

    websocket.onmessage = (event) => {
      const type = JSON.parse(event.data).type;

      const targetHandlers: RealtimeUpdatesEventHandler[] = Object.values(
        eventSubscriptionsRef.current[type as keyof typeof eventSubscriptionsRef.current] ?? {}
      );

      for (const handler of targetHandlers) {
        handler(JSON.parse(event.data));
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      setWebsocketInitialized(false);
    };

    setWebsocketInstance(websocket);

    return () => {
      websocket.close();
    };
  }, [setWebsocketInstance, setWebsocketInitialized]);

  const subscribeEvent: RealtimeUpdatesEventSubscriber = useCallback((event, handler) => {
    if (!eventSubscriptionsRef.current[event]) {
      eventSubscriptionsRef.current[event] = {};
    }

    eventSubscriptionsRef.current[event][handler as any] = handler;
  }, []);

  const unsubscribeEvent: RealtimeUpdatesEventSubscriptionRemover = useCallback(
    (event, handler) => {
      if (eventSubscriptionsRef.current[event]) {
        delete eventSubscriptionsRef.current[event][handler as any];
      }
    },
    []
  );

  const realtimeAction: RealtimeUpdatesAction = useCallback(
    (actionType, payload) => {
      if (websocketInstance) {
        websocketInstance.send(JSON.stringify({ action: actionType, payload }));
      }
    },
    [websocketInstance]
  );

  const contextData = useMemo<Parameters<typeof RealtimeUpdatesContext.Provider>[0]['value']>(
    () => ({
      websocketInitialized,
      websocket: websocketInstance,
      subscribeEvent,
      unsubscribeEvent,
      realtimeAction,
    }),
    [websocketInstance, websocketInitialized, subscribeEvent, unsubscribeEvent, realtimeAction]
  );

  return (
    <RealtimeUpdatesContext.Provider value={contextData}>
      {children}
    </RealtimeUpdatesContext.Provider>
  );
};
