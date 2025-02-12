import { Card } from '@/shared/ui/cards';
import styles from './ChatHeader.module.scss';
import { UserAvatar } from '@/components/UserAvatar';

type ChatHeaderProps = { name: string };

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
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
        <span className={styles.name}>{name}</span>
      </div>
    </Card>
  );
};
