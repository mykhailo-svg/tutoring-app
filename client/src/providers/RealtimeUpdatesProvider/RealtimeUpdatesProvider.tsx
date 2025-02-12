'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { RealtimeUpdatesContext } from './RealtimeUpdatesContext';
import cookies from 'js-cookie';
import { COOKIES_NAME } from '@/global_types';

type RealtimeUpdatesProviderProps = {
  children: ReactNode;
};

export const RealtimeUpdatesProvider: React.FC<RealtimeUpdatesProviderProps> = ({ children }) => {
  const [websocketInstance, setWebsocketInstance] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const websocket = new WebSocket(
      `ws://localhost:5000?accessToken=${cookies.get(COOKIES_NAME.ACCESS_TOKEN)}`
    );

    websocket.onopen = () => {
      console.log('Ws connected...');
      websocket.send(JSON.stringify({ event: 'newMessage', data: 'Hello' }));
    };

    websocket.onmessage = (event) => {
      setMessages((prevData) => [...prevData, event.data]);

      console.log(event.data);

      console.log('Received message:', event.data);
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

  const contextData = useMemo<Parameters<typeof RealtimeUpdatesContext.Provider>[0]['value']>(
    () => ({ websocket: websocketInstance }),
    [websocketInstance]
  );

  return (
    <RealtimeUpdatesContext.Provider value={contextData}>
      {children}
    </RealtimeUpdatesContext.Provider>
  );
};
