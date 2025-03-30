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
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ChatInput.module.scss';
import { IoSend as SendIcon } from 'react-icons/io5';

type ChatInputProps = {
  companion: User;
  setMessages: Dispatch<SetStateAction<DirectMessage[]>>;

  setMessagesGotFromWebsockets: Dispatch<SetStateAction<number>>;
};

export const ChatInput: React.FC<ChatInputProps> = ({
  companion,
  setMessages,
  setMessagesGotFromWebsockets,
}) => {
  const { realtimeAction } = useRealtimeUpdates();

  const [message, setMessage] = useState('');

  const { data: authData } = useAuth();

  const handleSendMessage = useCallback(() => {
    realtimeAction(REALTIME_UPDATES_ACTIONS.SEND_MESSAGE, { message, to: companion.id });

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
        isRead: false,
      },
    ]);
  }, [realtimeAction, message, companion.id, setMessages, authData.user]);

  const canSendMessage = useMemo(() => message.trim().length > 0, [message]);

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (canSendMessage) {
            handleSendMessage();
            setMessagesGotFromWebsockets((prevValue) => prevValue + 1);
            setMessage('');
          }
        }}
      >
        <TextField
          placeholder='Write a message...'
          label=''
          value={message}
          onChange={setMessage}
        />
        <Button
          disabled={!canSendMessage}
          as='button'
          size='medium'
          type='submit'
          icon={<SendIcon />}
        />
      </form>
    </div>
  );
};
