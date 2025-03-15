'use client';

import styles from './Chat.module.scss';
import { ChatMessagesList } from '../ChatMessagesList';
import { ChatInput } from '../ChatInput';
import type { DirectMessage, User } from '@/global_types';
import { useCallback, useEffect, useState } from 'react';
import { usePaginatedDirectMessages } from '../../hooks';

type ChatProps = {
  companion: User;
  initialMessages: any[];
};

export const Chat: React.FC<ChatProps> = ({ companion, initialMessages }) => {
  const [messages, setMessages] = useState<DirectMessage[]>(initialMessages ?? []);

  const { data: fetchedMessages, changeQueryingData } = usePaginatedDirectMessages(companion.id);

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

  return (
    <div className={styles.root}>
      <ChatMessagesList
        fetchNextMessages={fetchNextMessages}
        companion={companion}
        messages={messages}
      />
      <ChatInput setMessages={setMessages} companion={companion} />
    </div>
  );
};
