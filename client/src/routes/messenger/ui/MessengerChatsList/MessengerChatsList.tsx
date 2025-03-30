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
import { DirectMessagesChat, User } from '@/global_types';
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

  const { subscribeEvent } = useRealtimeUpdates();

  useEffect(() => {
    console.log('hi');
  }, []);

  useEffect(() => {
    const messageReceivedSubscription = subscribeEvent(
      REALTIME_UPDATES_EVENTS.MESSAGE,
      ({ payload }) => {
        setChats((prevChats) => {
          const nexChats = JSON.parse(JSON.stringify(prevChats));

          nexChats[0].unreadMessages = prevChats[0].unreadMessages + 1;

          return nexChats;
        });

        // console.log('message');

        // const chatExists = false;

        // for (let chatIndex = 0; chatIndex < chats.length; chatIndex++) {
        //   const chat = chats[chatIndex];
        //   if (chat.user.id === payload.initiator) {
        //     setChats((prevChats) => {
        //       if (prevChats[chatIndex]) {
        //         const nextChatsState = [...prevChats];

        //         prevChats[chatIndex].unreadMessages =
        //           (prevChats[chatIndex].unreadMessages ?? 0) + 1;
        //         prevChats[chatIndex].lastMessage = { content: payload.message };

        //         return nextChatsState;
        //       }

        //       return prevChats;
        //     });

        //     break;
        //   }
        // }

        // if (chatExists) {
        //   return;
        // }

        // const addChat = async () => {
        //   const newChat = await axiosClient.get(
        //     APIEndpoints.directMessages.getChatWithUser(payload.initiator)
        //   );

        //   if (newChat.data) {
        //     setChats((prevChats) => [newChat.data, ...prevChats]);
        //   }
        // };

        // addChat();
      },
      realtimeSubscriptionEventsIdsRef.current.messageReceived
    );

    if (messageReceivedSubscription?.id) {
      realtimeSubscriptionEventsIdsRef.current.messageReceived = messageReceivedSubscription.id;
    }
  }, []);

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
        <MessengerChatItem chat={chat} key={chat.id} />
      ))}
    </div>
  );
}
