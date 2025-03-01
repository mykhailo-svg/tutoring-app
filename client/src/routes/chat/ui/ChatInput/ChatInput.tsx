'use client';

import { DirectMessage, User } from '@/global_types';
import { useAuth } from '@/providers/AuthProvider';
import {
  REALTIME_UPDATES_ACTIONS,
  REALTIME_UPDATES_EVENTS,
  useRealtimeUpdates,
} from '@/providers/RealtimeUpdatesProvider';
import { Button } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/inputs';
import { isNull } from 'lodash';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type ChatInputProps = {
  companion: User;
  setMessages: Dispatch<SetStateAction<DirectMessage[]>>;
};

export const ChatInput: React.FC<ChatInputProps> = ({ companion, setMessages }) => {
  const { action, subscribeEvent } = useRealtimeUpdates();

  const [message, setMessage] = useState('');

  const { data: authData } = useAuth();

  const handleSendMessage = useCallback(() => {
    action(REALTIME_UPDATES_ACTIONS.SEND_MESSAGE, { message, to: companion.id });

    if (!authData.user) {
      return;
    }

    setMessages((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        recipient: companion.id,
        //@ts-ignore
        sender: authData.user.id,
        content: message,
        createdAt: new Date().toISOString(),
      },
    ]);
  }, [action, message, companion.id, setMessages, authData.user]);

  useEffect(() => {
    subscribeEvent(
      REALTIME_UPDATES_EVENTS.MESSAGE,
      (payload) => {
        console.log(payload.payload.message);

        if (authData && !isNull(authData.user)) {
          setMessages((prevState) => [
            ...prevState,
            {
              id: prevState.length + 1,
              sender: companion.id,
              //@ts-ignore
              recipient: authData.user.id,
              content: payload.payload.message,
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      },
      null
    );
  }, [companion.name, authData.user]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
          setMessage('');
        }}
      >
        <TextField label='' value={message} onChange={setMessage} />
      </form>
      <Button as='button' onClick={handleSendMessage} text='Send' />
    </div>
  );
};
