import { DirectMessagesChat } from '@/global_types';
import styles from './MessengerChatItem.module.scss';

type MessengerChatItemProps = {
  chat: DirectMessagesChat;
};

export const MessengerChatItem: React.FC<MessengerChatItemProps> = ({ chat }) => {
  return (
    <a className={styles.root} href={`/messenger/${chat.user.id}`}>
      <div className={styles.preview}>
        <h1 style={{ marginBottom: '10px' }}>{chat.user.name}</h1>
        <p>{chat.lastMessage.content}</p>
      </div>

      {chat.unreadMessages ? (
        <span className={styles.unreadMessagesCount}>{chat.unreadMessages}</span>
      ) : null}
    </a>
  );
};
