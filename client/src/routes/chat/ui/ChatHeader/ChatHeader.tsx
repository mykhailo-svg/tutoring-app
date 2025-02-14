'use client';

import { Card } from '@/shared/ui/cards';
import styles from './ChatHeader.module.scss';
import { UserAvatar } from '@/components/UserAvatar';
import { useState } from 'react';

type ChatHeaderProps = { name: string };

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
  const [isOnline, setIsOnline] = useState(true);

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
            <div></div> <span>Online</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
