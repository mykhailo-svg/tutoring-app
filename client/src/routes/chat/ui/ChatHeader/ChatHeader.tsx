'use client';

import { Card } from '@/shared/ui/cards';
import styles from './ChatHeader.module.scss';
import { UserAvatar } from '@/components/UserAvatar';
import { useEffect, useState } from 'react';
import { REALTIME_UPDATES_EVENTS, useRealtimeUpdates } from '@/providers/RealtimeUpdatesProvider';

type ChatHeaderProps = { name: string; online?: boolean };

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, online }) => {
  const { subscribeEvent } = useRealtimeUpdates();
  const [isOnline, setIsOnline] = useState(online ?? false);

  useEffect(() => {
    subscribeEvent(
      REALTIME_UPDATES_EVENTS.USER_DISCONNECTED,
      (payload: any) => {
        console.log('subscribed event');
        setIsOnline(false);
        console.log(payload);
      },
      null
    );
  }, [subscribeEvent]);

  useEffect(() => {
    subscribeEvent(
      REALTIME_UPDATES_EVENTS.USER_CONNECTED,
      (payload: any) => {
        console.log('subscribed event');
        setIsOnline(true);
        console.log(payload);
      },
      null
    );
  }, [subscribeEvent]);

  return (
    <Card className={styles.root}>
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
    </Card>
  );
};
