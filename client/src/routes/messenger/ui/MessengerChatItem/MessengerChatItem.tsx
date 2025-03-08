import { DirectMessagesChat } from '@/global_types';
import styles from './MessengerChatItem.module.scss';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';

type MessengerChatItemProps = {
  chat: DirectMessagesChat;
};

export const MessengerChatItem: React.FC<MessengerChatItemProps> = ({ chat }) => {
  return (
    <Link className={styles.root} href={`/messenger/${chat.user.id}`}>
      <div className={styles.preview}>
        <UserAvatar backgroundColor='var(--primary-color)' iconColor='var(--white-color)' imageSrc={chat.user.avatar?.display_url} />
        <div>
          <h1 style={{ marginBottom: '10px' }}>{chat.user.name}</h1>
          <p>{chat.lastMessage.content}</p>
        </div>
      </div>

      {chat.unreadMessages ? (
        <span className={styles.unreadMessagesCount}>{chat.unreadMessages}</span>
      ) : null}
    </Link>
  );
};
