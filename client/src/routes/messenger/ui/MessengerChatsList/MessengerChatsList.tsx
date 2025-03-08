'use client';

import { axiosClient, getApiEndpointUrl } from '@/api';
import { useState, useEffect } from 'react';
import styles from './MessengerChatsList.module.scss';
import { MessengerChatItem } from '../MessengerChatItem';
import type { GetDirectMessengerChatsResponse } from '../../types';
import { TextField } from '@/shared/ui/inputs';

type MessengerChatsListProps = {
  initialChats: GetDirectMessengerChatsResponse | undefined;
};

export const MessengerChatsList: React.FC<MessengerChatsListProps> = ({ initialChats = [] }) => {
  const [chats, setChats] = useState<GetDirectMessengerChatsResponse>(initialChats);

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <TextField label='' placeholder='Search' />
      </div>
      <List chats={chats} />
    </div>
  );
};

type ListProps = {
  chats: GetDirectMessengerChatsResponse;
};

function List({ chats }: ListProps) {
  return (
    <div className={styles.list}>
      {chats.map((chat) => (
        <MessengerChatItem chat={chat} key={chat.id} />
      ))}
    </div>
  );
}
