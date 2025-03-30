'use client';

import styles from './ChatHeader.module.scss';
import { UserAvatar } from '@/components/UserAvatar';
import { useEffect, useState } from 'react';
import { REALTIME_UPDATES_EVENTS, useRealtimeUpdates } from '@/providers/RealtimeUpdatesProvider';
import { User } from '@/global_types';

type ChatHeaderProps = { name: string; online?: boolean; companionId?: User['id'] };

type SubscriptionsIds = Record<'userConnected' | 'userDisconnected', null | string>;

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, online, companionId }) => {
  const { subscribeEvent, unsubscribeEvent } = useRealtimeUpdates();
  const [isOnline, setIsOnline] = useState(online ?? false);

  useEffect(() => {
    const onUserDisconnected = (payload: any) => {
      if (payload?.payload?.userId === companionId) {
        setIsOnline(false);
      }
    };

    const onUserConnected = (payload: any) => {
      if (payload?.payload?.userId === companionId) {
        setIsOnline(true);
      }
    };

    subscribeEvent(REALTIME_UPDATES_EVENTS.USER_DISCONNECTED, onUserDisconnected);
    subscribeEvent(REALTIME_UPDATES_EVENTS.USER_CONNECTED, onUserConnected);

    return () => {
      unsubscribeEvent(REALTIME_UPDATES_EVENTS.USER_CONNECTED, onUserConnected as any);

      unsubscribeEvent(REALTIME_UPDATES_EVENTS.USER_DISCONNECTED, onUserDisconnected as any);
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
