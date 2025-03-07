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
import { nanoid } from 'nanoid';
import { set } from 'lodash';

type RealtimeUpdatesProviderProps = {
  children: ReactNode;
};

export const RealtimeUpdatesProvider: React.FC<RealtimeUpdatesProviderProps> = ({ children }) => {
  const [websocketInstance, setWebsocketInstance] = useState<null | WebSocket>(null);

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
      console.log('Ws connected...');
    };

    websocket.onmessage = (event) => {
      console.log('Received message:', event.data);

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
      console.log('WebSocket disconnected');
    };

    setWebsocketInstance(websocket);

    return () => {
      websocket.close();
    };
  }, [setWebsocketInstance]);

  const subscribeEvent: RealtimeUpdatesEventSubscriber = useCallback((event, handler, id) => {
    const handlerId = id ?? nanoid();
    set(eventSubscriptionsRef.current, `${event}.${handlerId}`, handler);
  }, []);

  const unsubscribeEvent: RealtimeUpdatesEventSubscriptionRemover = useCallback(
    (event, eventId) => {
      if (eventSubscriptionsRef.current[event] && eventSubscriptionsRef.current[event][eventId]) {
        delete eventSubscriptionsRef.current[event][eventId];
      }
    },
    []
  );

  const action: RealtimeUpdatesAction = useCallback(
    (actionType, payload) => {
      if (websocketInstance) {
        websocketInstance.send(JSON.stringify({ action: actionType, payload }));
      }
    },
    [websocketInstance]
  );

  const contextData = useMemo<Parameters<typeof RealtimeUpdatesContext.Provider>[0]['value']>(
    () => ({ websocket: websocketInstance, subscribeEvent, unsubscribeEvent, action }),
    [websocketInstance, subscribeEvent, unsubscribeEvent, action]
  );

  return (
    <RealtimeUpdatesContext.Provider value={contextData}>
      {children}
    </RealtimeUpdatesContext.Provider>
  );
};
