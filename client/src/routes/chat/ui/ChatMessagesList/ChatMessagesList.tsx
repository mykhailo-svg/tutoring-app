import { Card } from '@/shared/ui/cards';
import styles from './ChatMessagesList.module.scss';

type ChatMessagesListProps = {};

export const ChatMessagesList: React.FC<ChatMessagesListProps> = () => {
  return (
    <Card shadow='none' className={styles.root}>
      Messages
    </Card>
  );
};
