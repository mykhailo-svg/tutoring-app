'use client';

import { User } from '@/global_types';
import {
  REALTIME_UPDATES_ACTIONS,
  REALTIME_UPDATES_EVENTS,
  useRealtimeUpdates,
} from '@/providers/RealtimeUpdatesProvider';
import { Button } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/inputs';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type ChatInputProps = {
  companion: User;
  setMessages: Dispatch<
    SetStateAction<
      {
        name: string;
        value: string;
      }[]
    >
  >;
};

export const ChatInput: React.FC<ChatInputProps> = ({ companion, setMessages }) => {
  const { action, subscribeEvent } = useRealtimeUpdates();

  const [message, setMessage] = useState('');

  const handleSendMessage = useCallback(() => {
    action(REALTIME_UPDATES_ACTIONS.SEND_MESSAGE, { message, to: companion.id });

    setMessages((prevState) => [...prevState, { name: 'Me', value: message }]);
  }, [action, message, companion.id, setMessages]);

  useEffect(() => {
    subscribeEvent(
      REALTIME_UPDATES_EVENTS.MESSAGE,
      (payload) => {
        console.log(payload.payload.message);

        setMessages((prevState) => [
          ...prevState,
          { name: companion.name, value: payload.payload.message },
        ]);
      },
      null
    );
  }, [companion.name]);

  return (
    <div>
      <TextField label='' value={message} onChange={setMessage} />
      <Button as='button' onClick={handleSendMessage} text='Send' />
    </div>
  );
};
