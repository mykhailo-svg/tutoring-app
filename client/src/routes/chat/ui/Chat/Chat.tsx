'use client';

import styles from './Chat.module.scss';
import { ChatMessagesList } from '../ChatMessagesList';
import { ChatInput } from '../ChatInput';
import type { DirectMessage, User } from '@/global_types';
import { useState } from 'react';

type ChatProps = {
  companion: User;
  initialMessages: any[];
};

export const Chat: React.FC<ChatProps> = ({ companion, initialMessages }) => {
  const [messages, setMessages] = useState<DirectMessage[]>(initialMessages ?? []);

  return (
    <div className={styles.root}>
      <ChatMessagesList companion={companion} messages={messages} />
      <ChatInput setMessages={setMessages} companion={companion} />
    </div>
  );
};
