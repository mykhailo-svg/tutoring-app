'use client';

import { Card } from '@/shared/ui/cards';
import styles from './ChatHeader.module.scss';
import { UserAvatar } from '@/components/UserAvatar';
import { useEffect, useRef, useState } from 'react';
import { REALTIME_UPDATES_EVENTS, useRealtimeUpdates } from '@/providers/RealtimeUpdatesProvider';
import { User } from '@/global_types';

type ChatHeaderProps = { name: string; online?: boolean; companionId?: User['id'] };

type SubscriptionsIds = Record<'userConnected' | 'userDisconnected', null | string>;

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, online, companionId }) => {
  const { subscribeEvent, unsubscribeEvent } = useRealtimeUpdates();
  const [isOnline, setIsOnline] = useState(online ?? false);

  const realTimeSubscriptionsIdsRef = useRef<SubscriptionsIds>({
    userConnected: null,
    userDisconnected: null,
  });

  useEffect(() => {
    const userDisconnectedEventId = subscribeEvent(
      REALTIME_UPDATES_EVENTS.USER_DISCONNECTED,
      (payload) => {
        console.log(payload);

        if (payload?.payload?.userId === companionId) {
          setIsOnline(false);
        }
      },
      realTimeSubscriptionsIdsRef.current.userDisconnected
    );

    const userConnectedEventId = subscribeEvent(
      REALTIME_UPDATES_EVENTS.USER_CONNECTED,
      (payload) => {
        if (payload?.payload?.userId === companionId) {
          setIsOnline(true);
        }
      },
      realTimeSubscriptionsIdsRef.current.userConnected
    );

    if (userDisconnectedEventId?.id) {
      realTimeSubscriptionsIdsRef.current.userDisconnected = userDisconnectedEventId.id;
    }

    if (userConnectedEventId?.id) {
      realTimeSubscriptionsIdsRef.current.userConnected = userConnectedEventId?.id;
    }

    return () => {
      if (realTimeSubscriptionsIdsRef.current.userConnected) {
        unsubscribeEvent(
          REALTIME_UPDATES_EVENTS.USER_CONNECTED,
          realTimeSubscriptionsIdsRef.current.userConnected
        );
      }
      if (realTimeSubscriptionsIdsRef.current.userDisconnected) {
        unsubscribeEvent(
          REALTIME_UPDATES_EVENTS.USER_DISCONNECTED,
          realTimeSubscriptionsIdsRef.current.userDisconnected
        );
      }
    };
  }, [subscribeEvent, unsubscribeEvent, setIsOnline, companionId]);

  return (
    <div className={styles.root}>
      <div className={styles.preview}>
        <div className={styles.avatar}>
          <UserAvatar
            size='thumbnail'
            backgroundColor='var(--primary-color)'
            iconColor='var(--white-color)'
          />
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>

          <div className={styles.status}>
            <div style={!isOnline ? { background: 'var(--grey-color)' } : {}}></div>{' '}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
