'use client';

import { Button } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/inputs';
import { useCallback, useEffect, useRef, useState } from 'react';
import cookies from 'js-cookie';
import { COOKIES_NAME } from '@/global_types';

const Messenger = () => {
  const websocketRef = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<string[]>([]);

  console.log(messages);

  // useEffect(() => {
  //   const websocket = new WebSocket(
  //     `ws://localhost:5000?accessToken=${cookies.get(COOKIES_NAME.ACCESS_TOKEN)}`
  //   );

  //   websocket.onopen = () => {
  //     console.log('Ws connected...');
  //     websocket.send(JSON.stringify({ event: 'newMessage', data: 'Hello' }));
  //   };

  //   websocket.onmessage = (event) => {
  //     setMessages((prevData) => [...prevData, event.data]);

  //     console.log(event.data);

  //     console.log('Received message:', event.data);
  //   };

  //   websocket.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   websocket.onclose = () => {
  //     console.log('WebSocket disconnected');
  //   };

  //   websocketRef.current = websocket;
  //   return () => {
  //     websocket.close();
  //   };
  // }, []);

  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    if (websocketRef.current) {
      websocketRef.current.send(JSON.stringify({ event: 'newMessage', data: text }));
    }
  }, [text]);

  return (
    <>
      <TextField label='' onChange={setText} value={text} />

      <Button onClick={handleSend} as='button' text='send' size='medium' />

      {messages.map((message) => (
        <div>{message}</div>
      ))}
    </>
  );
};

export default Messenger;
