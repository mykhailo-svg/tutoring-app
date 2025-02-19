import { getCurrentUserOnServer } from '@/api/actions/user/getCurrentUserOnServer';
import { redirect } from 'next/navigation';
import styles from './ChatPage.module.scss';
import { Chat, ChatHeader } from './ui';
import { getUserById } from '@/api/actions/user';
import { Card } from '@/shared/ui/cards';

type ChatPageProps = { params: Promise<{ userId: string }> };

export const ChatPage: React.FC<ChatPageProps> = async ({ params }) => {
  const userId = parseInt((await params).userId);

  if (!isFinite(userId)) {
    return redirect('/messenger');
  }

  const currentUser = await getCurrentUserOnServer();

  if (!currentUser || `${userId}` === `${currentUser.id}`) {
    return redirect('/messenger');
  }

  const companionUser = await getUserById(userId);

  if (!companionUser) {
    return redirect('/messenger');
  }

  return (
    <Card className={styles.root}>
      <ChatHeader
        online={companionUser.isOnline}
        name={companionUser.name}
        companionId={companionUser.id}
      />
      <div className={styles.chatContainer}>
        <Chat />
      </div>
    </Card>
  );
};
