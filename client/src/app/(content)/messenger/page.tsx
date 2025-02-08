'use client';

import { useEffect } from 'react';

const Messenger = () => {
  useEffect(() => {
    const websocket = new WebSocket('wss://echo.websocket.org/');

    websocket.onopen = () => {
      console.log('Ws connected...');
      websocket.send('Hello ws');
    };

    return () => {
      websocket.close();
    };
  }, []);

  return <>Messenger</>;
};

export default Messenger;
