'use client';

import { APIEndpoints, axiosClient } from '@/api';
import { useState, useEffect, useCallback } from 'react';
import styles from './MessengerChatsList.module.scss';
import { MessengerChatItem } from '../MessengerChatItem';
import type { GetDirectMessengerChatsResponse } from '../../types';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import { usePaginatedDirectChats } from '../../hooks';
import { REALTIME_UPDATES_EVENTS, useRealtimeUpdates } from '@/providers/RealtimeUpdatesProvider';
import Image from 'next/image';
import EmptyStateIllustration from '../../../../shared/assets/chatsEmptyStateIcon.svg';

type MessengerChatsListProps = {
  initialChats: GetDirectMessengerChatsResponse | undefined;
};

export const MessengerChatsList: React.FC<MessengerChatsListProps> = ({ initialChats = [] }) => {
  const { data: fetchedChats, fetchNext } = usePaginatedDirectChats();

  const [chats, setChats] = useState<GetDirectMessengerChatsResponse>(initialChats);

  const { subscribeEvent, unsubscribeEvent } = useRealtimeUpdates();

  useEffect(() => {
    const onMessageReceived = ({ payload }: any) => {
      let chatIndexToUpdate: null | number = null;

      for (let chatIndex = 0; chatIndex < chats.length; chatIndex++) {
        const chat = chats[chatIndex];

        const initiatorChat = chat.user.id === payload.initiator;

        if (initiatorChat) {
          chatIndexToUpdate = chatIndex;

          break;
        }
      }

      if (typeof chatIndexToUpdate === 'number') {
        setChats((prevChats) => {
          const nexChats: typeof prevChats = JSON.parse(JSON.stringify(prevChats));

          nexChats[chatIndexToUpdate].unreadMessages =
            (prevChats[chatIndexToUpdate].unreadMessages ?? 0) + 1;
          nexChats[chatIndexToUpdate].lastMessage = { content: payload.message };

          return nexChats;
        });
      } else {
        const addChat = async () => {
          const newChat = await axiosClient.get(
            APIEndpoints.directMessages.getChatWithUser(payload.initiator)
          );

          if (newChat.data) {
            setChats((prevChats) => [newChat.data, ...prevChats]);
          }
        };

        addChat();
      }
    };

    subscribeEvent(REALTIME_UPDATES_EVENTS.MESSAGE, onMessageReceived);

    return () => {
      unsubscribeEvent(REALTIME_UPDATES_EVENTS.MESSAGE, onMessageReceived as any);
    };
  }, [chats]);

  useEffect(() => {
    if (fetchedChats?.length) {
      setChats((prevChats) => {
        const currentChatsIds = prevChats.map((chat) => chat.user.id);
        return [
          ...prevChats,
          ...fetchedChats.filter((chat) => currentChatsIds.indexOf(chat.user.id) === -1),
        ];
      });
    }
  }, [fetchedChats, setChats]);

  const handleScrollToBottom = useCallback(() => {
    fetchNext();
  }, [fetchNext]);

  return (
    <div className={styles.root}>
      {chats.length > 0 ? (
        <Scrollable
          onScrolledToTop={{ action: handleScrollToBottom }}
          className={styles.listScrollable}
        >
          <List chats={chats} />
        </Scrollable>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyImageContainer}>
            <Image alt='emptyState' src={EmptyStateIllustration} />
          </div>
          <p className={styles.emptyTitle}>No active chats found</p>
        </div>
      )}
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
        <MessengerChatItem chat={chat} key={chat.user.id} />
      ))}
    </div>
  );
}
