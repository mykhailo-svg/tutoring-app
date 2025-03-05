'use client';

import { APIEndpoints, axiosClient, getApiEndpointUrl } from '@/api';
import { TextField } from '@/shared/ui/inputs';
import { reverse } from 'lodash';
import { useEffect, useState } from 'react';

const Messenger = () => {
  const [text, setText] = useState('');

  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const setState = async () => {
      const chats = await axiosClient.get(getApiEndpointUrl('/direct-message'));

      setChats(chats.data);
    };

    setState();
  }, []);

  return (
    <>
      <TextField label='' onChange={setText} value={text} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {chats.map((chat) => (
          <a
            href={`/messenger/${chat.user.id}`}
            style={{ background: 'grey', padding: '10px' }}
          >
            <h1 style={{ marginBottom: '10px' }}>{chat.user.name}</h1>
            <p>{chat.lastMessage.content}</p>
          </a>
        ))}
      </div>
    </>
  );
};

export default Messenger;
