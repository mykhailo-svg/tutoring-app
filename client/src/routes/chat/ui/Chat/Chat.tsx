import { Card } from '@/shared/ui/cards';
import styles from './Chat.module.scss';
import { ChatMessagesList } from '../ChatMessagesList';

type ChatProps = {};

export const Chat: React.FC<ChatProps> = () => {
  return (
    <div className={styles.root}>
      <ChatMessagesList />
    </div>
  );
};
