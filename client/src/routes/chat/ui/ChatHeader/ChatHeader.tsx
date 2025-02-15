'use client';

import { Card } from '@/shared/ui/cards';
import styles from './ChatHeader.module.scss';
import { UserAvatar } from '@/components/UserAvatar';
import { useState } from 'react';

type ChatHeaderProps = { name: string; online?: boolean };

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, online }) => {
  const [isOnline, setIsOnline] = useState(online ?? false);

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
            <div></div> <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
