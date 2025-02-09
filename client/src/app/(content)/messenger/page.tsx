'use client';

import { useEffect } from 'react';

const Messenger = () => {
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:5000');

    websocket.onopen = () => {
      console.log('Ws connected...');
      websocket.send(JSON.stringify({ event: 'newMessage', data: 'Hello' }));
    };

    websocket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
    };
    return () => {
      websocket.close();
    };
  }, []);

  return <>Messenger</>;
};

export default Messenger;
