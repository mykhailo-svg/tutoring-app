'use client';

import { APIEndpoints, axiosClient, getApiEndpointUrl } from '@/api';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './MessengerChatsList.module.scss';
import { MessengerChatItem } from '../MessengerChatItem';
import type { GetDirectMessengerChatsResponse } from '../../types';
import { TextField } from '@/shared/ui/inputs';
import { Scrollable } from '@/shared/ui/scrollable/Scrollable';
import { usePaginatedDirectChats } from '../../hooks';
import { REALTIME_UPDATES_EVENTS, useRealtimeUpdates } from '@/providers/RealtimeUpdatesProvider';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import EmptyStateIllustration from '../../../../shared/assets/chatsEmptyStateIcon.svg';

type MessengerChatsListProps = {
  initialChats: GetDirectMessengerChatsResponse | undefined;
};

export const MessengerChatsList: React.FC<MessengerChatsListProps> = ({ initialChats = [] }) => {
  const realtimeSubscriptionEventsIdsRef = useRef({
    messageReceived: nanoid(),
  });

  const { data: fetchedChats, changeQueryingData } = usePaginatedDirectChats();

  const [chats, setChats] = useState<GetDirectMessengerChatsResponse>(initialChats);

  const { subscribeEvent, unsubscribeEvent } = useRealtimeUpdates();

  useEffect(() => {
    const messageReceivedSubscription = subscribeEvent(
      REALTIME_UPDATES_EVENTS.MESSAGE,
      ({ payload }) => {
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
      },
      realtimeSubscriptionEventsIdsRef.current.messageReceived
    );

    if (messageReceivedSubscription?.id) {
      realtimeSubscriptionEventsIdsRef.current.messageReceived = messageReceivedSubscription.id;
    }

    return () => {
      unsubscribeEvent(
        REALTIME_UPDATES_EVENTS.MESSAGE,
        realtimeSubscriptionEventsIdsRef.current.messageReceived
      );
    };
  }, [chats]);

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
      {chats.length > 0 ? (
        <>
          <div className={styles.search}>
            <TextField size='small' onChange={fonSearchChange} label='' placeholder='Search' />
          </div>
          <Scrollable className={styles.listScrollable}>
            <List chats={chats} />
          </Scrollable>
        </>
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

[
  {
    unreadMessages: 1,
    user: {
      id: 45,
      name: 'Companion 2',
      email: 'admin@pgadmin.com',
      password: '$2b$10$aD7p8GF6wnHNhOGGMvIUbey8J82b1opA1EX9i3Wek4uutRah9nuGq',
      isEmailVerified: false,
      role: 'STUDENT',
      avatar: null,
      interests: null,
      spokenLanguagesData: null,
    },
    lastMessage: {
      id: 257,
      content: 'dsfsdf',
      isRead: false,
      createdAt: '2025-03-30T11:30:16.052Z',
    },
  },
];

// const a = [
//   {
//     unreadMessages: 4,
//     user: {
//       id: 45,
//       name: 'Companion 2',
//       email: 'admin@pgadmin.com',
//       password: '$2b$10$aD7p8GF6wnHNhOGGMvIUbey8J82b1opA1EX9i3Wek4uutRah9nuGq',
//       isEmailVerified: false,
//       role: 'STUDENT',
//       avatar: null,
//       interests: null,
//       spokenLanguagesData: null,
//     },
//     lastMessage: {
//       id: 260,
//       content: 'sdf',
//       isRead: false,
//       createdAt: '2025-03-30T11:32:12.477Z',
//     },
//   },
//   {
//     unreadMessages: 3,
//     user: {
//       id: 45,
//       name: 'Companion 2',
//       email: 'admin@pgadmin.com',
//       password: '$2b$10$aD7p8GF6wnHNhOGGMvIUbey8J82b1opA1EX9i3Wek4uutRah9nuGq',
//       isEmailVerified: false,
//       role: 'STUDENT',
//       avatar: null,
//       interests: null,
//       spokenLanguagesData: null,
//     },
//     lastMessage: {
//       id: 259,
//       content: 'sdfsdf',
//       isRead: false,
//       createdAt: '2025-03-30T11:32:11.244Z',
//     },
//   },
//   {
//     unreadMessages: 2,
//     user: {
//       id: 45,
//       name: 'Companion 2',
//       email: 'admin@pgadmin.com',
//       password: '$2b$10$aD7p8GF6wnHNhOGGMvIUbey8J82b1opA1EX9i3Wek4uutRah9nuGq',
//       isEmailVerified: false,
//       role: 'STUDENT',
//       avatar: null,
//       interests: null,
//       spokenLanguagesData: null,
//     },
//     lastMessage: {
//       id: 258,
//       content: 'asdads',
//       isRead: false,
//       createdAt: '2025-03-30T11:30:59.558Z',
//     },
//   },
//   {
//     user: {
//       id: 45,
//       content: 'dsfsdf',
//       name: 'Companion 2',
//       avatar: null,
//     },
//     lastMessage: {
//       content: 'dsfsdf',
//     },
//     unreadMessages: 1,
//   },
// ][
//   {
//     user: {
//       id: 45,
//       content: 'sdf',
//       name: 'Companion 2',
//       avatar: null,
//     },
//     lastMessage: {
//       content: 'sdf',
//     },
//     unreadMessages: 4,
//   }
// ];
