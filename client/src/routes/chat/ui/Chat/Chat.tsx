'use client';

import styles from './Chat.module.scss';
import { ChatMessagesList } from '../ChatMessagesList';
import { ChatInput } from '../ChatInput';
import type { DirectMessage, User } from '@/global_types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePaginatedDirectMessages } from '../../hooks';
import { useDirectMessagesChat } from '../../providers';
import { REALTIME_UPDATES_EVENTS, useRealtimeUpdates } from '@/providers/RealtimeUpdatesProvider';

type ChatProps = {
  companion: User;
  initialMessages: any[];
};

export const Chat: React.FC<ChatProps> = ({ companion, initialMessages }) => {
  const [messages, setMessages] = useState<DirectMessage[]>(initialMessages ?? []);

  const {
    data: fetchedMessages,
    changeQueryingData,
    setMessagesGotFromWebsockets,
  } = usePaginatedDirectMessages(companion.id);

  useEffect(() => {
    if (fetchedMessages) {
      console.log(fetchedMessages);

      setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
    }
  }, [fetchedMessages]);

  const fetchNextMessages = useCallback(() => {
    changeQueryingData((prevState) => ({
      paginationData: {
        ...prevState.paginationData,
        page: (prevState.paginationData.page ?? 0) + 1,
      },
    }));
  }, [changeQueryingData]);

  const { subscribeEvent } = useRealtimeUpdates();

  useEffect(() => {
    subscribeEvent(
      REALTIME_UPDATES_EVENTS.READ_MESSAGES,
      (data) => {
        if (data.payload.initiator === companion.id) {
          setMessages((prevMessages) =>
            prevMessages.map((message) => ({ ...message, isRead: true }))
          );
        }
      },
      null
    );
  }, [companion.id]);

  return (
    <div className={styles.root}>
      <ChatMessagesList
        fetchNextMessages={fetchNextMessages}
        companion={companion}
        messages={messages}
      />
      <ChatInput
        setMessagesGotFromWebsockets={setMessagesGotFromWebsockets}
        setMessages={setMessages}
        companion={companion}
      />
    </div>
  );
};
