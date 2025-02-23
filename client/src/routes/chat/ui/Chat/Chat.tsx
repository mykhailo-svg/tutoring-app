'use client';

import styles from './Chat.module.scss';
import { ChatMessagesList } from '../ChatMessagesList';
import { ChatInput } from '../ChatInput';
import type { User } from '@/global_types';
import { useState } from 'react';

type ChatProps = {
  companion: User;
};

export const Chat: React.FC<ChatProps> = ({ companion }) => {
  const [messages, setMessages] = useState<{ name: string; value: string }[]>([]);

  return (
    <div className={styles.root}>
      <ChatMessagesList messages={messages} />
      <ChatInput setMessages={setMessages} companion={companion} />
    </div>
  );
};
