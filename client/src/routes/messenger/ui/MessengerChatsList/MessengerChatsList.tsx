'use client';

import { axiosClient, getApiEndpointUrl } from '@/api';
import { useState, useEffect, useCallback } from 'react';
import styles from './MessengerChatsList.module.scss';
import { MessengerChatItem } from '../MessengerChatItem';
import type { GetDirectMessengerChatsResponse } from '../../types';
import { TextField } from '@/shared/ui/inputs';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import { usePaginatedDirectChats } from '../../hooks';

type MessengerChatsListProps = {
  initialChats: GetDirectMessengerChatsResponse | undefined;
};

export const MessengerChatsList: React.FC<MessengerChatsListProps> = ({ initialChats = [] }) => {
  const { data: fetchedChats, changeQueryingData } = usePaginatedDirectChats();

  const [chats, setChats] = useState<GetDirectMessengerChatsResponse>(initialChats);

  useEffect(() => {
    if (fetchedChats) {
      setChats(fetchedChats);
    }
  }, [fetchedChats, setChats]);

  const fonSearchChange = useCallback(
    (search: string) => {
      changeQueryingData((prevData) => ({ filters: { ...prevData.filters, search } }));
    },
    [changeQueryingData]
  );

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <TextField size='small' onChange={fonSearchChange} label='' placeholder='Search' />
      </div>
      <Scrollable className={styles.listScrollable}>
        {' '}
        <List chats={chats} />
      </Scrollable>
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
