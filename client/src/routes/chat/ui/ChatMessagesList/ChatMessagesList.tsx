import { Card } from '@/shared/ui/cards';
import styles from './ChatMessagesList.module.scss';

type ChatMessagesListProps = { messages: { name: string; value: string }[] };

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({ messages }) => {
  return (
    <Card shadow='none' className={styles.root}>
      <div>
        {messages.map((message) => (
          <div>
            <span>{message.name}: </span>
            {message.value}
          </div>
        ))}
      </div>
    </Card>
  );
};
